import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { supabaseAdmin } from "../../lib/server/supabase";

function getIk() {
  const pub = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const priv = process.env.IMAGEKIT_PRIVATE_KEY;
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (!pub || !priv || !endpoint) return null;
  return new ImageKit({
    publicKey: pub,
    privateKey: priv,
    urlEndpoint: endpoint,
  });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const amountStr = form.get("amount")?.toString().trim();
    const utr = form.get("utr")?.toString().replace(/\s+/g, "");
    const notes = form.get("notes")?.toString().trim() || "";
    const file = form.get("receipt");

    if (!name || !email || !phone || !amountStr || !utr) {
      return NextResponse.json(
        { error: "Name, email, phone, donation amount, and UPI UTR reference number are required." },
        { status: 400 }
      );
    }

    if (!/^\d{12}$/.test(utr)) {
      return NextResponse.json(
        { error: "UPI Reference / UTR must be exactly 12 digits." },
        { status: 400 }
      );
    }

    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid donation amount." }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Please upload your payment receipt or screenshot." }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Receipt image/document size must be under 10 MB." },
        { status: 400 }
      );
    }

    const sb = supabaseAdmin();

    // Reject duplicate UTRs before spending an upload.
    const { data: existing } = await sb.from("donations").select("id").eq("utr_number", utr).maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: "This UTR has already been submitted. If this is a mistake, please contact the office." },
        { status: 409 }
      );
    }

    const ik = getIk();
    if (!ik) {
      console.error("ImageKit is not configured; cannot store donation receipt.");
      return NextResponse.json(
        { error: "Receipt upload is temporarily unavailable. Please try again later or contact the office." },
        { status: 503 }
      );
    }

    let receiptUrl = "";
    let receiptFileId: string | null = null;
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const cleanName = `donation_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const res = await ik.upload({ file: buffer, fileName: cleanName, folder: "/mlat/donations" });
      receiptUrl = res.url;
      receiptFileId = res.fileId;
    } catch (uploadErr) {
      console.error("ImageKit upload error:", uploadErr);
      return NextResponse.json(
        { error: "Could not upload your receipt. Please try again." },
        { status: 502 }
      );
    }

    const { data, error } = await sb
      .from("donations")
      .insert({
        donor_name: name,
        email,
        phone,
        amount,
        utr_number: utr,
        receipt_url: receiptUrl,
        receipt_file_id: receiptFileId,
        mode: "UPI",
        status: "Pending",
        notes,
      })
      .select("id, amount, utr_number, status")
      .single();

    if (error) {
      console.error("Supabase donations insert error:", error);
      // Don't leave an orphaned receipt behind.
      if (receiptFileId) ik.deleteFile(receiptFileId).catch(() => {});
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This UTR has already been submitted. If this is a mistake, please contact the office." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "We could not record your donation. Please try again or contact the office." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, donation: data });
  } catch (err: unknown) {
    console.error("Donate route error:", err);
    const msg = err instanceof Error ? err.message : "Internal error occurred";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
