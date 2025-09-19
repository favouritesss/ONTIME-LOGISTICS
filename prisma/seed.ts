import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@ontime.local" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@ontime.local",
      password: passwordHash,
      role: "admin",
    },
  });

  // Sample shipment
  await prisma.shipment.create({
    data: {
      trackingNumber:
        "ONTIME-" +
        new Date().toISOString().slice(0, 10).replace(/-/g, "") +
        "-000001-7",
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
          invoiceNumber: "INV-2025-0001",
          amount: 75.0,
          tax: 15.0,
          currency: "GBP",
        },
      },
    },
  });

  console.log("Seed finished successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
