"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Mail, Package, Truck } from "lucide-react"

interface TrackingEvent {
  time: string
  status: string
  location: string
  description: string
  icon: React.ReactNode
}

interface TrackingResult {
  trackingNumber: string
  status: string
  estimatedDelivery: string
  origin: string
  destination: string
  weight: string
  serviceLevel: string
  events: TrackingEvent[]
}

interface TrackShipmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TrackShipmentModal({ isOpen, onClose }: TrackShipmentModalProps) {
  const [trackingNumbers, setTrackingNumbers] = useState("")
  const [trackingResults, setTrackingResults] = useState<TrackingResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock tracking data for demonstration
  const mockTrackingData: TrackingResult = {
    trackingNumber: "RMF123456789",
    status: "In Transit",
    estimatedDelivery: "December 18, 2024",
    origin: "London, UK",
    destination: "Birmingham, UK",
    weight: "2.5 kg",
    serviceLevel: "Express Delivery",
    events: [
      {
        time: "2024-12-16 14:30",
        status: "Package picked up",
        location: "London Distribution Center",
        description: "Package collected from sender",
        icon: <Package className="h-4 w-4" />,
      },
      {
        time: "2024-12-16 18:45",
        status: "In transit",
        location: "London Hub",
        description: "Package processed at sorting facility",
        icon: <Truck className="h-4 w-4" />,
      },
      {
        time: "2024-12-17 08:15",
        status: "In transit",
        location: "Birmingham Hub",
        description: "Package arrived at destination hub",
        icon: <Truck className="h-4 w-4" />,
      },
      {
        time: "2024-12-17 12:00",
        status: "Out for delivery",
        location: "Birmingham Local Depot",
        description: "Package loaded for final delivery",
        icon: <Truck className="h-4 w-4" />,
      },
    ],
  }

  const handleTrack = async () => {
    if (!trackingNumbers.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const numbers = trackingNumbers.split(/[,\s]+/).filter((n) => n.trim())
      const results = numbers.map((number) => ({
        ...mockTrackingData,
        trackingNumber: number.trim(),
      }))
      setTrackingResults(results)
      setIsLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "out for delivery":
        return "bg-blue-100 text-blue-800"
      case "in transit":
        return "bg-yellow-100 text-yellow-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-deep-blue">Track Your Shipment</h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Get real-time updates on your package location</p>
        </div>

        <div className="p-6">
          {/* Tracking Input */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Enter your tracking number to see current status and estimated delivery
            </h3>
            <div className="flex gap-4">
              <Input
                placeholder="Enter tracking number (e.g., RMF123456789)"
                value={trackingNumbers}
                onChange={(e) => setTrackingNumbers(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
              />
              <Button onClick={handleTrack} disabled={isLoading} className="bg-coral hover:bg-coral/90 text-white px-6">
                {isLoading ? "Tracking..." : "Track Package"}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              You can enter up to 10 tracking numbers separated by commas or spaces
            </p>
          </div>

          {/* Tracking Results */}
          {trackingResults.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tracking Results</h3>
              {trackingResults.map((result, index) => (
                <Card key={index} className="p-6 mb-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left side - Package Info */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold">Tracking: {result.trackingNumber}</h4>
                        <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-600">Expected Delivery</p>
                          <p className="font-semibold">{result.estimatedDelivery}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Service Level</p>
                          <p className="font-semibold">{result.serviceLevel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Origin</p>
                          <p className="font-semibold">{result.origin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Destination</p>
                          <p className="font-semibold">{result.destination}</p>
                        </div>
                      </div>

                      {/* Map Placeholder */}
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Interactive map showing package route</p>
                        <p className="text-sm text-gray-500">Last known location: Birmingham Hub</p>
                      </div>
                    </div>

                    {/* Right side - Timeline */}
                    <div>
                      <h5 className="font-semibold mb-4">Package Journey</h5>
                      <div className="space-y-4">
                        {result.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-start space-x-3">
                            <div className="bg-coral/10 rounded-full p-2 flex-shrink-0">{event.icon}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{event.status}</p>
                                <p className="text-sm text-gray-500">{event.time}</p>
                              </div>
                              <p className="text-sm text-gray-600">{event.location}</p>
                              <p className="text-sm text-gray-500">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Tracking Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-coral" />
              </div>
              <h4 className="font-semibold mb-2">Live Tracking</h4>
              <p className="text-sm text-gray-600">
                Follow your package in real-time with our interactive map and detailed status updates throughout the
                delivery process.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-coral" />
              </div>
              <h4 className="font-semibold mb-2">Delivery Alerts</h4>
              <p className="text-sm text-gray-600">
                Set up SMS or email notifications to stay updated with your package status and receive delivery
                confirmations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-coral" />
              </div>
              <h4 className="font-semibold mb-2">Delivery Options</h4>
              <p className="text-sm text-gray-600">
                Customize delivery preferences, reschedule deliveries, or redirect packages to meet your availability.
              </p>
            </div>
          </div>

          {/* Customer Support */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-2">Need Assistance?</h4>
            <p className="text-gray-600 mb-4">
              Our customer support team is available 24/7 to help with your delivery questions, concerns, and special
              requests. We're here to ensure your shipping experience is smooth and worry-free.
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-white px-3 py-1 rounded-full text-sm">24/7 Customer Support</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm">Expert Logistics Assistance</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm">Secure Package Handling</span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-coral text-coral hover:bg-coral hover:text-white bg-transparent"
              >
                Email Support
              </Button>
              <Button className="bg-coral hover:bg-coral/90 text-white">Contact Us</Button>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="font-semibold mb-4">Frequently Asked Questions</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium mb-2">How do I track my package?</h5>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your tracking number in the field above to get real-time updates on your shipment's location and
                  status.
                </p>

                <h5 className="font-medium mb-2">What if my package is delayed?</h5>
                <p className="text-sm text-gray-600">
                  Contact our 24/7 customer support team for assistance with delayed packages and updated delivery
                  estimates.
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Can I change my delivery address?</h5>
                <p className="text-sm text-gray-600 mb-4">
                  Yes, you can redirect your package to a different address through our customer service or online
                  portal before it's out for delivery.
                </p>

                <h5 className="font-medium mb-2">How accurate are the delivery estimates?</h5>
                <p className="text-sm text-gray-600">
                  Our delivery estimates are highly accurate, updated in real-time based on current logistics conditions
                  and package location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
