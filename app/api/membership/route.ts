import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { supabaseAdmin } from "../../lib/server/supabase";
import { MEMBERSHIP_PLANS, type MembershipType } from "../../lib/membership";

function getIk() {
  const pub = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const priv = process.env.IMAGEKIT_PRIVATE_KEY;
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (!pub || !priv || !endpoint) return null;
  return new ImageKit({ publicKey: pub, privateKey: priv, urlEndpoint: endpoint });
}

const DUPLICATE_UTR = "This UTR has already been submitted. If this is a mistake, please contact the office.";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const get = (k: string) => form.get(k)?.toString().trim() || "";

    const type = get("membership_type") as MembershipType;
    const plan = MEMBERSHIP_PLANS[type];
    if (!plan) return NextResponse.json({ error: "Please choose a membership type." }, { status: 400 });

    const full_name = get("full_name");
    const email = get("email");
    const phone = get("phone");
    const city = get("city");
    const state = get("state");
    if (!full_name || !email || !phone || !city || !state) {
      return NextResponse.json(
        { error: "Name, email, mobile, city and state are required." },
        { status: 400 }
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (get("declaration") !== "yes") {
      return NextResponse.json({ error: "Please accept the declaration to continue." }, { status: 400 });
    }

    const photo = form.get("photo");
    const hasPhoto = photo instanceof File && photo.size > 0;
    if (hasPhoto) {
      if (!photo.type.startsWith("image/")) {
        return NextResponse.json({ error: "Photo must be an image file (JPG, PNG or WEBP)." }, { status: 400 });
      }
      if (photo.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Photo size must be under 5 MB." }, { status: 400 });
      }
    }

    // The fee always comes from the plan, never from the client.
    const fee = plan.fee;
    const sb = supabaseAdmin();

    let utr: string | null = null;
    let receiptUrl = "";
    let receiptFileId: string | null = null;
    let ik: ImageKit | null = null;

    if (fee > 0) {
      utr = get("utr").replace(/\s+/g, "");
      if (!/^\d{12}$/.test(utr)) {
        return NextResponse.json({ error: "UPI Reference / UTR must be exactly 12 digits." }, { status: 400 });
      }
      const file = form.get("receipt");
      if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: "Please upload your payment receipt or screenshot." }, { status: 400 });
      }
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Receipt size must be under 10 MB." }, { status: 400 });
      }

      const { data: existing } = await sb.from("members").select("id").eq("utr_number", utr).maybeSingle();
      if (existing) return NextResponse.json({ error: DUPLICATE_UTR }, { status: 409 });

      ik = getIk();
      if (!ik) {
        console.error("ImageKit is not configured; cannot store membership receipt.");
        return NextResponse.json(
          { error: "Receipt upload is temporarily unavailable. Please try again later or contact the office." },
          { status: 503 }
        );
      }
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const cleanName = `member_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const res = await ik.upload({ file: buffer, fileName: cleanName, folder: "/mlat/memberships" });
        receiptUrl = res.url;
        receiptFileId = res.fileId;
      } catch (uploadErr) {
        console.error("ImageKit upload error:", uploadErr);
        return NextResponse.json({ error: "Could not upload your receipt. Please try again." }, { status: 502 });
      }
    }

    let photoUrl = "";
    let photoFileId: string | null = null;
    if (hasPhoto) {
      ik = ik ?? getIk();
      if (!ik) {
        console.error("ImageKit is not configured; cannot store member photo.");
        return NextResponse.json(
          { error: "Photo upload is temporarily unavailable. Please try again later or skip the photo." },
          { status: 503 }
        );
      }
      try {
        const buffer = Buffer.from(await photo.arrayBuffer());
        const cleanName = `member_photo_${Date.now()}_${photo.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const res = await ik.upload({ file: buffer, fileName: cleanName, folder: "/mlat/memberships/photos" });
        photoUrl = res.url;
        photoFileId = res.fileId;
      } catch (uploadErr) {
        console.error("ImageKit photo upload error:", uploadErr);
        if (receiptFileId) ik.deleteFile(receiptFileId).catch(() => {});
        return NextResponse.json({ error: "Could not upload your photo. Please try again." }, { status: 502 });
      }
    }

    const { data, error } = await sb
      .from("members")
      .insert({
        membership_type: type,
        full_name,
        guardian_name: get("guardian_name"),
        dob: get("dob") || null,
        email,
        phone,
        address: get("address"),
        city,
        state,
        pincode: get("pincode"),
        occupation: get("occupation"),
        id_proof_type: get("id_proof_type"),
        id_proof_number: get("id_proof_number"),
        interest: get("interest"),
        fee,
        utr_number: utr,
        receipt_url: receiptUrl,
        receipt_file_id: receiptFileId,
        photo_url: photoUrl,
        photo_file_id: photoFileId,
        status: "Pending",
      })
      .select("id, membership_type, fee, status")
      .single();

    if (error) {
      console.error("Supabase members insert error:", error);
      if (ik) {
        if (receiptFileId) ik.deleteFile(receiptFileId).catch(() => {});
        if (photoFileId) ik.deleteFile(photoFileId).catch(() => {});
      }
      if (error.code === "23505") return NextResponse.json({ error: DUPLICATE_UTR }, { status: 409 });
      return NextResponse.json(
        { error: "We could not record your application. Please try again or contact the office." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, member: data });
  } catch (err: unknown) {
    console.error("Membership route error:", err);
    const msg = err instanceof Error ? err.message : "Internal error occurred";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
