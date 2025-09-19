"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PDFTrackingDocument from "@/components/pdf-tracking-document"
import dynamic from "next/dynamic"
import {
  Search,
  Package,
  Truck,
  Plane,
  Ship,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  Map,
  Navigation,
  MapPin,
  Mail,
} from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"
import ScrollToTop from "@/components/scroll-to-top"

const TrackingMap = dynamic(() => import("@/components/tracking-map"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
})

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showMap, setShowMap] = useState(false)

  const searchParams = useSearchParams()

  const mockTrackingData = {
    ONT123456789: {
      trackingNumber: "ONT123456789",
      status: "In Transit",
      statusColor: "bg-blue-500",
      service: "Air Freight Express",
      origin: "London, UK",
      destination: "New York, USA",
      estimatedDelivery: "2024-01-15",
      weight: "2.5 kg",
      dimensions: "30x20x15 cm",
      sender: "ABC Electronics Ltd",
      recipient: "Tech Solutions Inc",
      currentLocation: "Frankfurt, Germany",
      progress: 60,
      invoiceAvailable: true,
      coordinates: {
        origin: [51.5074, -0.1278], // London
        destination: [40.7128, -74.006], // New York
        current: [50.1109, 8.6821], // Frankfurt
        route: [
          { lat: 51.5074, lng: -0.1278, name: "London, UK" },
          { lat: 51.47, lng: -0.4543, name: "London Heathrow Airport" },
          { lat: 50.1109, lng: 8.6821, name: "Frankfurt, Germany" },
          { lat: 40.6413, lng: -73.7781, name: "New York JFK Airport" },
          { lat: 40.7128, lng: -74.006, name: "New York, USA" },
        ],
      },
      events: [
        {
          date: "2024-01-10",
          time: "14:30",
          location: "London, UK",
          status: "Package Picked Up",
          description: "Package collected from sender",
          icon: Package,
          completed: true,
          coordinates: [51.5074, -0.1278],
        },
        {
          date: "2024-01-10",
          time: "18:45",
          location: "London Heathrow Airport",
          status: "Departed Origin",
          description: "Package departed from origin facility",
          icon: Plane,
          completed: true,
          coordinates: [51.47, -0.4543],
        },
        {
          date: "2024-01-11",
          time: "08:15",
          location: "Frankfurt, Germany",
          status: "In Transit",
          description: "Package in transit at sorting facility",
          icon: Truck,
          completed: true,
          coordinates: [50.1109, 8.6821],
        },
        {
          date: "2024-01-14",
          time: "Expected",
          location: "New York JFK Airport",
          status: "Arriving at Destination",
          description: "Package arriving at destination facility",
          icon: Plane,
          completed: false,
          coordinates: [40.6413, -73.7781],
        },
        {
          date: "2024-01-15",
          time: "Expected",
          location: "New York, USA",
          status: "Out for Delivery",
          description: "Package out for final delivery",
          icon: Truck,
          completed: false,
          coordinates: [40.7128, -74.006],
        },
      ],
    },
    ONT987654321: {
      trackingNumber: "ONT987654321",
      status: "Delivered",
      statusColor: "bg-green-500",
      service: "Ocean Freight Standard",
      origin: "Shanghai, China",
      destination: "Hamburg, Germany",
      estimatedDelivery: "2024-01-08",
      actualDelivery: "2024-01-08",
      weight: "150 kg",
      dimensions: "100x80x60 cm",
      sender: "Manufacturing Co Ltd",
      recipient: "European Distributors GmbH",
      currentLocation: "Hamburg, Germany",
      progress: 100,
      invoiceAvailable: true,
      coordinates: {
        origin: [31.2304, 121.4737], // Shanghai
        destination: [53.5511, 9.9937], // Hamburg
        current: [53.5511, 9.9937], // Hamburg (delivered)
        route: [
          { lat: 31.2304, lng: 121.4737, name: "Shanghai, China" },
          { lat: 31.2304, lng: 121.4737, name: "Shanghai Port" },
          { lat: 53.5511, lng: 9.9937, name: "Hamburg Port" },
          { lat: 53.5511, lng: 9.9937, name: "Hamburg, Germany" },
        ],
      },
      events: [
        {
          date: "2023-12-15",
          time: "10:00",
          location: "Shanghai, China",
          status: "Package Picked Up",
          description: "Package collected from sender",
          icon: Package,
          completed: true,
          coordinates: [31.2304, 121.4737],
        },
        {
          date: "2023-12-16",
          time: "14:30",
          location: "Shanghai Port",
          status: "Departed Origin Port",
          description: "Container loaded on vessel",
          icon: Ship,
          completed: true,
          coordinates: [31.2304, 121.4737],
        },
        {
          date: "2024-01-05",
          time: "09:15",
          location: "Hamburg Port",
          status: "Arrived at Destination Port",
          description: "Container arrived and cleared customs",
          icon: Ship,
          completed: true,
          coordinates: [53.5511, 9.9937],
        },
        {
          date: "2024-01-08",
          time: "11:30",
          location: "Hamburg, Germany",
          status: "Delivered",
          description: "Package successfully delivered to recipient",
          icon: CheckCircle,
          completed: true,
          coordinates: [53.5511, 9.9937],
        },
      ],
    },
  }

  useEffect(() => {
    const urlTrackingNumber = searchParams.get("number")
    if (urlTrackingNumber) {
      setTrackingNumber(urlTrackingNumber)
      // Auto-trigger search after a short delay
      setTimeout(() => {
        handleTrackWithNumber(urlTrackingNumber)
      }, 500)
    }
  }, [searchParams])

  const handleTrackWithNumber = async (numberToTrack: string) => {
    if (!numberToTrack.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = mockTrackingData[numberToTrack as keyof typeof mockTrackingData]
    setTrackingResult(result || null)
    setIsLoading(false)

    if (result) {
      setShowMap(true)
    }
  }

  const handleTrack = async () => {
    await handleTrackWithNumber(trackingNumber)
  }

  const downloadInvoice = () => {
    const trackingData = {
      trackingNumber: trackingResult.trackingNumber,
      senderName: trackingResult.sender,
      senderAddress: trackingResult.origin,
      recipientName: trackingResult.recipient,
      recipientPhone: "606 205 6013",
      recipientAddress: trackingResult.destination,
      destinationOffice: trackingResult.destination,
      orderId: "220",
      bookingMode: "ToPay",
      shippingCost: "USD 3000",
      clearanceCost: "USD 5800",
      totalCost: "USD 8800",
      status: "On Hold",
      description: "Your Package has been registered successfully !!",
    }

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

ONTIME LOGISTICS COMPANY

Tracking Number: ${trackingData.trackingNumber}
Express Cargo Way Courier Logistics Company
Address: Canada, USA, UK, Asia and Europe
Email: support@ontime-logistics.com
Company Website: https://ontime-logistics.com

═══════════════════════════════════════════════════════════════

FROM (SENDER)
${trackingData.senderName}
Address: ${trackingData.senderAddress}
Origin Office: ${trackingData.senderAddress}

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
Stamp Duty: ONTIME LOGISTICS

For your convenience we have ONTIME Logistics
several payment methods that are reliable, fast, and secure.

AMOUNT DUE:
SHIPPING COST:     ${trackingData.shippingCost}
CLEARANCE COST:    ${trackingData.clearanceCost}
TOTAL AMOUNT:      ${trackingData.totalCost}

═══════════════════════════════════════════════════════════════

[ONTIME LOGO]                    [OFFICIAL STAMP]
                                 ONTIME LOGISTICS
                                 AUTHORIZED
                                 ${currentDate}

═══════════════════════════════════════════════════════════════

This is a certified true copy of the original tracking document.
For verification, please visit: https://ontime-logistics.com/track

Customer Service: support@ontime-logistics.com
24/7 Hotline: +44 20 1234 5678

═══════════════════════════════════════════════════════════════
© 2025 ONTIME Logistics. All Rights Reserved.
    `

    const element = document.createElement("a")
    const file = new Blob([pdfContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `ONTIME_Tracking_${trackingData.trackingNumber}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return CheckCircle
      case "in transit":
        return Truck
      case "processing":
        return Clock
      default:
        return Package
    }
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="track" />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-teal-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/hands-using-tablet-device-for-package-tracking-wit.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/80"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white">
                Track Your <span className="text-orange-400">Shipment</span>
              </h1>
              <p className="text-lg md:text-xl text-pretty text-white mb-8">
                Get real-time updates on your package location
              </p>
              <p className="text-base md:text-lg text-white/90 mb-12">
                Enter your tracking number to see current status and estimated delivery
              </p>

              {/* Track Your Package Section */}
              <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Track Your Package</h2>
                <p className="text-white/90 mb-6">
                  Enter your tracking number below to get real-time updates on your shipment's location, status, and
                  estimated delivery time.
                </p>

                {/* Tracking Form */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Enter tracking number (e.g., ONT123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70"
                    onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                  />
                  <Button
                    onClick={handleTrack}
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Tracking...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        <span>Track Package</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-white/70 text-sm mt-2">You can enter up to tracking numbers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingResult && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
              <PDFTrackingDocument
                trackingData={{
                  trackingNumber: trackingResult.trackingNumber,
                  senderName: trackingResult.sender,
                  senderAddress: trackingResult.origin,
                  recipientName: trackingResult.recipient,
                  recipientPhone: "606 205 6013",
                  recipientAddress: trackingResult.destination,
                  destinationOffice: trackingResult.destination,
                  orderId: "220",
                  bookingMode: "ToPay",
                  shippingCost: "USD 3000",
                  clearanceCost: "USD 5800",
                  totalCost: "USD 8800",
                  status: "On Hold",
                  description: "Your Package has been registered successfully !!",
                }}
              />
            </div>

            {showMap && trackingResult.coordinates && (
              <Card className="bg-white shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Package Route & Location</h3>
                    <p className="text-gray-600">Interactive map showing your package's journey</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-teal-600" />
                    <span className="text-sm font-medium text-gray-700">Live Tracking</span>
                  </div>
                </div>
                <TrackingMap
                  origin={trackingResult.coordinates.origin}
                  destination={trackingResult.coordinates.destination}
                  currentLocation={trackingResult.coordinates.current}
                  route={trackingResult.coordinates.route}
                  events={trackingResult.events}
                  trackingNumber={trackingResult.trackingNumber}
                />
              </Card>
            )}

            {/* Shipment Overview */}
            <Card className="bg-white shadow-lg p-8 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Shipment Details</h2>
                  <p className="text-lg text-gray-600">Tracking Number: {trackingResult.trackingNumber}</p>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                  <Badge className={`${trackingResult.statusColor} text-white px-4 py-2 text-lg`}>
                    {trackingResult.status}
                  </Badge>
                  {trackingResult.invoiceAvailable && (
                    <Button
                      onClick={downloadInvoice}
                      variant="outline"
                      className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
                  <span className="text-sm font-medium text-gray-700">{trackingResult.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${trackingResult.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Shipment Info Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Service Type</h4>
                  <p className="text-gray-600">{trackingResult.service}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Origin</h4>
                  <p className="text-gray-600">{trackingResult.origin}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Destination</h4>
                  <p className="text-gray-600">{trackingResult.destination}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {trackingResult.actualDelivery ? "Delivered On" : "Est. Delivery"}
                  </h4>
                  <p className="text-gray-600">{trackingResult.actualDelivery || trackingResult.estimatedDelivery}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Weight</h4>
                  <p className="text-gray-600">{trackingResult.weight}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dimensions</h4>
                  <p className="text-gray-600">{trackingResult.dimensions}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Current Location</h4>
                  <p className="text-gray-600">{trackingResult.currentLocation}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sender</h4>
                  <p className="text-gray-600">{trackingResult.sender}</p>
                </div>
              </div>
            </Card>

            {/* Tracking Timeline */}
            <Card className="bg-white shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tracking History</h3>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {trackingResult.events.map((event: any, index: number) => {
                    const IconComponent = event.icon
                    return (
                      <div key={index} className="relative flex items-start space-x-4">
                        <div
                          className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                            event.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <IconComponent className={`h-6 w-6 ${event.completed ? "text-white" : "text-gray-600"}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Card
                            className={`p-4 ${event.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h4 className={`font-semibold ${event.completed ? "text-green-800" : "text-gray-700"}`}>
                                {event.status}
                              </h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{event.date}</span>
                                </span>
                                <span>{event.time}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <p className="text-sm text-gray-500 flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </p>
                          </Card>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* No Results */}
      {trackingResult === null && trackingNumber && !isLoading && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Card className="bg-white shadow-lg p-8 max-w-2xl mx-auto">
              <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tracking Number Not Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any shipment with tracking number "{trackingNumber}". Please check the number and try
                again.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Try these sample tracking numbers:</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" onClick={() => setTrackingNumber("ONT123456789")} className="text-sm">
                    ONT123456789 (In Transit)
                  </Button>
                  <Button variant="outline" onClick={() => setTrackingNumber("ONT987654321")} className="text-sm">
                    ONT987654321 (Delivered)
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Tracking Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tracking Features</h2>
            <p className="text-xl text-gray-600">
              Advanced tracking capabilities to keep you informed every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Tracking</h3>
              <p className="text-gray-600">
                Follow your package in real-time with our interactive map and detailed status updates throughout the
                delivery process.
              </p>
            </Card>

            <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Alerts</h3>
              <p className="text-gray-600">
                Set up SMS or email notifications to stay updated with your package status and receive delivery
                confirmations.
              </p>
            </Card>

            <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
              <Package className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Options</h3>
              <p className="text-gray-600">
                Customize delivery preferences, reschedule deliveries, or redirect packages to meet your availability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Support */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-xl">
              Our customer support team is available 24/7 to help with your delivery questions, concerns, and special
              requests. We're here to ensure your shipping experience is smooth and worry-free.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <span className="text-sm">24/7 Customer Support</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <span className="text-sm">Expert Logistics Assistance</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <span className="text-sm">Secure Package Handling</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <span className="text-sm">Email Support</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 mr-4">Contact Us</Button>
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-800 px-8 py-3 bg-transparent"
            >
              Customer Support
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common tracking and delivery questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="p-6">
              <button onClick={() => toggleFaq(0)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-gray-900">How do I track my package?</h3>
                {expandedFaq === 0 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedFaq === 0 && (
                <p className="text-gray-600 mt-3">
                  You can track your package by entering your tracking number in the search field above. Your tracking
                  number is provided in your shipping confirmation email or receipt.
                </p>
              )}
            </Card>

            <Card className="p-6">
              <button onClick={() => toggleFaq(1)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-gray-900">What if my package is delayed?</h3>
                {expandedFaq === 1 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedFaq === 1 && (
                <p className="text-gray-600 mt-3">
                  Contact our 24/7 customer support team for assistance with delayed packages and updated delivery
                  estimates. We'll work to resolve any issues quickly.
                </p>
              )}
            </Card>

            <Card className="p-6">
              <button onClick={() => toggleFaq(2)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-gray-900">Can I change my delivery address?</h3>
                {expandedFaq === 2 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedFaq === 2 && (
                <p className="text-gray-600 mt-3">
                  Yes, you can redirect your package to a different address through our customer service or online
                  portal before it's out for delivery.
                </p>
              )}
            </Card>

            <Card className="p-6">
              <button onClick={() => toggleFaq(3)} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-semibold text-gray-900">How accurate are the delivery estimates?</h3>
                {expandedFaq === 3 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedFaq === 3 && (
                <p className="text-gray-600 mt-3">
                  Our delivery estimates are highly accurate, updated in real-time based on current logistics conditions
                  and package location.
                </p>
              )}
            </Card>
          </div>
        </div>
      </section>

      <SharedFooter />
      <ScrollToTop />
    </div>
  )
}
