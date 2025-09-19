import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const shipmentId = Number(params.id);
    const ev = await prisma.shipmentEvent.create({
      data: {
        shipmentId,
        statusCode: body.statusCode || "UPDATE",
        description: body.description || "",
        facilityCode: body.facilityCode || null,
        city: body.city || null,
        country: body.country || null,
        lat: body.lat ? Number(body.lat) : null,
        lon: body.lon ? Number(body.lon) : null,
        scannedAt: body.scannedAt ? new Date(body.scannedAt) : undefined
      }
    });

    await prisma.shipment.update({
      where: { id: shipmentId },
      data: { status: body.statusCode || undefined }
    });

    return NextResponse.json({ success: true, event: ev });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
