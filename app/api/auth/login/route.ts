import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { role, email, password } = await request.json();
    if (!role || !email || !password) {
      return NextResponse.json({ error: "Role, email and password are required" }, { status: 400 });
    }

    // Demo only: accept any non-empty credentials
    return NextResponse.json({ ok: true, role });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


