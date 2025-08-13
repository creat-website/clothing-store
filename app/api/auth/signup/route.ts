import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { role, name, email, password } = await request.json();
    if (!role || !name || !email || !password) {
      return NextResponse.json({ error: "Role, name, email and password are required" }, { status: 400 });
    }

    // Demo only: echo back a fake user id
    return NextResponse.json({ id: "user_demo", role, name, email });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


