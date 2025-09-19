import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function randomTrackingNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ONTIME-${date}-${rand}`;
}

function randomInvoiceNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `INV-${year}-${rand}`;
}

async function main() {
  console.log("🌱 Seeding database...");

  // --- Ensure admin user exists ---
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    10
  );

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@ontime.local" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@ontime.local",
      password: passwordHash,
      role: "admin",
    },
  });

  // --- Ensure at least one sample shipment exists ---
  await prisma.shipment.upsert({
    where: { trackingNumber: "ONTIME-SAMPLE-0001" },
    update: {},
    create: {
      trackingNumber: "ONTIME-SAMPLE-0001",
      senderName: "ACME Corp",
      senderAddress: "100 Warehouse St, London, UK",
      recipientName: "John Doe",
      recipientAddress: "200 Market Ave, Dublin, IE",
      origin: "London, UK",
      destination: "Dublin, IE",
      weight: 12.5,
      declaredValue: 250.0,
      serviceLevel: "EXPRESS",
      events: {
        create: [
          {
            statusCode: "PICKED_UP",
            description: "Picked up from warehouse",
            city: "London",
            country: "UK",
            lat: 51.5074,
            lon: -0.1278,
          },
          {
            statusCode: "IN_TRANSIT",
            description: "Air transit",
            city: "Manchester",
            country: "UK",
            lat: 53.4808,
            lon: -2.2426,
          },
        ],
      },
      invoice: {
        create: {
          invoiceNumber: "INV-SAMPLE-0001",
          amount: 75.0,
          tax: 15.0,
          currency: "GBP",
        },
      },
    },
  });

  // --- Add 3 random new shipments every run ---
  for (let i = 0; i < 3; i++) {
    await prisma.shipment.create({
      data: {
        trackingNumber: randomTrackingNumber(),
        senderName: "Global Sender Ltd",
        senderAddress: "1 Main Street, Berlin, DE",
        recipientName: "Jane Smith",
        recipientAddress: "55 Central Ave, Paris, FR",
        origin: "Berlin, DE",
        destination: "Paris, FR",
        weight: Math.random() * 20 + 1,
        declaredValue: Math.random() * 500 + 50,
        serviceLevel: Math.random() > 0.5 ? "STANDARD" : "EXPRESS",
        events: {
          create: [
            {
              statusCode: "PICKED_UP",
              description: "Package picked up from sender",
              city: "Berlin",
              country: "DE",
              lat: 52.52,
              lon: 13.405,
            },
          ],
        },
        invoice: {
          create: {
            invoiceNumber: randomInvoiceNumber(),
            amount: Math.random() * 200 + 50,
            tax: 15.0,
            currency: "EUR",
          },
        },
      },
    });
  }

  console.log("✅ Seed finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
