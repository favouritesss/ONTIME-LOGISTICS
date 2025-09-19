import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { setCookie } from "cookies-next";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    setCookie("ont_session", JSON.stringify({ userId: user.id, email: user.email }), { req: req as any, res: undefined, maxAge: 60*60*24 });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email }});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
