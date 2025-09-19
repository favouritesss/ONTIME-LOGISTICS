// app/api/admin/create-admin/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const email = "admin@ontime.local"; // choose your email
    const password = "admin123";        // choose your password

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: passwordHash,
        role: "admin",
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Admin user created successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
