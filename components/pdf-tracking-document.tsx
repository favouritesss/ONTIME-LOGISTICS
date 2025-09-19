"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface TrackingData {
  trackingNumber: string
  senderName: string
  senderAddress: string
  recipientName: string
  recipientPhone: string
  recipientAddress: string
  destinationOffice: string
  orderId: string
  bookingMode: string
  shippingCost: string
  clearanceCost: string
  totalCost: string
  status: string
  description: string
}

interface PDFTrackingDocumentProps {
  trackingData: TrackingData
}

export default function PDFTrackingDocument({ trackingData }: PDFTrackingDocumentProps) {
  const generatePDF = () => {
    const currentDate = new Date().toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    const pdfContent = `
CERTIFIED TRUE COPY
═══════════════════════════════════════════════════════════════

ONTIME DELIVERY COURIER LOGISTICS COMPANY

Tracking Number: ${trackingData.trackingNumber}
ONTIME Courier Logistics Company
Address: Canada, USA, UK, Asia and Europe
Email: contact-us@ontime-delivery.com
Company Website: https://ontime-delivery.com

═══════════════════════════════════════════════════════════════

FROM (SENDER)
${trackingData.senderName}
Address: ${trackingData.senderAddress}
Origin Office: ${trackingData.senderAddress.split(",").pop()?.trim()}

TO (CONSIGNEE)
${trackingData.recipientName}
Phone: ${trackingData.recipientPhone}
Address: ${trackingData.recipientAddress}
Destination Office: ${trackingData.destinationOffice}

═══════════════════════════════════════════════════════════════

Order ID: ${trackingData.orderId}
Booking Mode: ${trackingData.bookingMode}
Shipment Cost: ${trackingData.shippingCost}
Tracking Number: ${trackingData.trackingNumber}

═══════════════════════════════════════════════════════════════

PACKAGE DETAILS
═══════════════════════════════════════════════════════════════
Qty | Product | Status      | Description                    | Shipping Cost | Clearance Cost | Total Cost
1   | Parcel  | ${trackingData.status.padEnd(11)} | ${trackingData.description.padEnd(30)} | ${trackingData.shippingCost.padEnd(13)} | ${trackingData.clearanceCost.padEnd(14)} | ${trackingData.totalCost}

═══════════════════════════════════════════════════════════════

PAYMENT METHODS & OFFICIAL STAMP
═══════════════════════════════════════════════════════════════

Official Stamp: ${currentDate}
Stamp Duty: ONTIME DELIVERY

For your convenience we have ONTIME Delivery Courier
several payment methods that are reliable, fast, and secure.

AMOUNT DUE:
SHIPPING COST:     ${trackingData.shippingCost}
CLEARANCE COST:    ${trackingData.clearanceCost}
TOTAL AMOUNT:      ${trackingData.totalCost}

═══════════════════════════════════════════════════════════════

[ONTIME LOGO]                    [OFFICIAL STAMP]
                                 ONTIME DELIVERY
                                 AUTHORIZED
                                 ${currentDate}

═══════════════════════════════════════════════════════════════

This is a certified true copy of the original tracking document.
For verification, please visit: https://ontime-delivery.com/track

Customer Service: support@ontime-delivery.com
24/7 Hotline: +44 20 1234 5678

═══════════════════════════════════════════════════════════════
© 2025 ONTIME Delivery. All Rights Reserved.
    `

    const element = document.createElement("a")
    const file = new Blob([pdfContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `ONTIME_Tracking_${trackingData.trackingNumber}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="bg-white border rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src="/ontime-logo.jpg" alt="ONTIME Logo" className="h-8 w-8 rounded-full" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              ON<span className="text-orange-500">TIME</span> Tracking Document
            </h3>
            <p className="text-sm text-gray-600">Certified True Copy</p>
          </div>
        </div>
        <Button onClick={generatePDF} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">FROM (SENDER)</h4>
            <p className="text-sm text-gray-600">{trackingData.senderName}</p>
            <p className="text-sm text-gray-600">{trackingData.senderAddress}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">TO (CONSIGNEE)</h4>
            <p className="text-sm text-gray-600">{trackingData.recipientName}</p>
            <p className="text-sm text-gray-600">Phone: {trackingData.recipientPhone}</p>
            <p className="text-sm text-gray-600">{trackingData.recipientAddress}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold">Order ID:</span> {trackingData.orderId}
            </div>
            <div>
              <span className="font-semibold">Booking Mode:</span> {trackingData.bookingMode}
            </div>
            <div>
              <span className="font-semibold">Status:</span>
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                {trackingData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <h5 className="font-semibold mb-2">Package Details</h5>
          <div className="text-sm">
            <p>
              <span className="font-semibold">Description:</span> {trackingData.description}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <span className="font-semibold">Shipping Cost:</span> {trackingData.shippingCost}
              </div>
              <div>
                <span className="font-semibold">Clearance Cost:</span> {trackingData.clearanceCost}
              </div>
              <div>
                <span className="font-semibold">Total Cost:</span> {trackingData.totalCost}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-teal-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img src="/ontime-logo.jpg" alt="ONTIME Logo" className="h-6 w-6 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-teal-800">Official Stamp</p>
              <p className="text-xs text-teal-600">ONTIME DELIVERY AUTHORIZED</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-teal-800">Tracking: {trackingData.trackingNumber}</p>
            <p className="text-xs text-teal-600">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
