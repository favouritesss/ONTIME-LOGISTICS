import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { trackingNumber: string } }) {
  try {
    const trackingNumber = params.trackingNumber;
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        events: { orderBy: { scannedAt: "desc" } },
        invoice: true
      }
    });
    if (!shipment) return NextResponse.json({ found: false }, { status: 404 });
    return NextResponse.json({ found: true, shipment });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
