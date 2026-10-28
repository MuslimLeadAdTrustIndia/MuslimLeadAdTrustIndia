import { NextResponse } from "next/server";
import { supabasePublic } from "../../lib/server/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const sb = supabasePublic();
    const { data, error } = await sb
      .from("leads")
      .insert({
        name: String(name).trim(),
        email: String(email).trim(),
        phone: String(phone || "Not provided").trim(),
        message: String(message).trim(),
        status: "New",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, lead: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
