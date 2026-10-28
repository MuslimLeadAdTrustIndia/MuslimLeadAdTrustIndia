import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { requireAdmin } from "../../../lib/server/adminCrud";

function ik() {
  return new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  });
}

/** Upload: multipart form with `file`. Returns { url, fileId }. */
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Only images up to 8 MB allowed." }, { status: 400 });
  }
  try {
    const res = await ik().upload({
      file: Buffer.from(await file.arrayBuffer()),
      fileName: file.name,
      folder: "/mlat",
    });
    return NextResponse.json({ url: res.url, fileId: res.fileId });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 500 });
  }
}

/** Delete from ImageKit: ?fileId=... */
export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const fileId = new URL(req.url).searchParams.get("fileId");
  if (!fileId) return NextResponse.json({ error: "fileId required" }, { status: 400 });
  try {
    await ik().deleteFile(fileId);
  } catch {}
  return NextResponse.json({ ok: true });
}
