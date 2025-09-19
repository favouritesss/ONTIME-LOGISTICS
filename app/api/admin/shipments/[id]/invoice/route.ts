import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import PDFDocument from "pdfkit";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: { events: true, invoice: true }
    });
    if (!shipment) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers = [];
    doc.on("data", (b) => buffers.push(b));
    doc.on("end", () => {});

    doc.fontSize(20).text("ONTIME Logistics", { align: "left" });
    doc.fontSize(10).text("Invoice", { align: "right" });
    doc.moveDown();

    const invoice = shipment.invoice;
    doc.fontSize(12).text(`Invoice #: ${invoice?.invoiceNumber || "N/A"}`);
    doc.text(`Date: ${invoice?.issuedAt?.toISOString().slice(0,10) || new Date().toISOString().slice(0,10)}`);
    doc.moveDown();

    doc.text(`Sender: ${shipment.senderName}`);
    doc.text(`${shipment.senderAddress}`);
    doc.moveDown();
    doc.text(`Recipient: ${shipment.recipientName}`);
    doc.text(`${shipment.recipientAddress}`);
    doc.moveDown();

    doc.text(`Tracking #: ${shipment.trackingNumber}`);
    doc.text(`Service: ${shipment.serviceLevel}`);
    doc.text(`Origin: ${shipment.origin}`);
    doc.text(`Destination: ${shipment.destination}`);
    doc.moveDown();

    doc.text(`Amount: ${invoice?.amount?.toFixed(2) || "0.00"}`);
    doc.text(`Tax: ${invoice?.tax?.toFixed(2) || "0.00"}`);
    const total = (invoice?.amount || 0) + (invoice?.tax || 0);
    doc.text(`Total: ${total.toFixed(2)}`);
    doc.end();

    const pdf = Buffer.concat(buffers);

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${shipment.trackingNumber}.pdf"`
      }
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
