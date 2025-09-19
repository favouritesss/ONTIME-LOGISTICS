import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTrackingNumber } from "@/lib/tracking";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const count = await prisma.shipment.count();
    const tracking = generateTrackingNumber("ONTIME", count + 1);

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber: tracking,
        senderName: body.senderName || "Sender",
        senderAddress: body.senderAddress || "",
        recipientName: body.recipientName || "Recipient",
        recipientAddress: body.recipientAddress || "",
        origin: body.origin || "",
        destination: body.destination || "",
        weight: body.weight ? Number(body.weight) : null,
        declaredValue: body.declaredValue ? Number(body.declaredValue) : null,
        serviceLevel: body.serviceLevel || "STANDARD",
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, shipment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
