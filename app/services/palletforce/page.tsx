"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Shield, ArrowRight, Calculator } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"

export default function PalletforcePage() {
  const features = [
    {
      icon: Package,
      title: "Small Consignments",
      description: "Perfect for shipments of less than 10 pallets with cost-effective pricing",
    },
    {
      icon: Calculator,
      title: "Competitive Rates",
      description: "Affordable pricing that makes small shipments economically viable",
    },
    {
      icon: Truck,
      title: "Shared Transport",
      description: "Efficient groupage service that reduces costs through shared vehicle space",
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Professional palletized handling with full tracking and insurance",
    },
  ]

  const benefits = [
    "Cost-effective for small shipments",
    "Next-day delivery available",
    "Full tracking and monitoring",
    "Professional pallet handling",
    "Nationwide UK coverage",
    "Flexible collection times",
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="services" />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-teal-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/packaged-goods-and-containers-in-warehouse.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/80"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Palletforce <span className="text-orange-400">Equipment</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pretty">
                Cost-effective pallet delivery service for smaller consignments across the UK
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded">
                    Get Quote
                  </Button>
                </Link>
                <Link href="/track">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-teal-800 px-8 py-3 text-lg rounded bg-transparent"
                  >
                    Track Shipment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Affordable Pallet Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Sending smaller consignments of less than 10 pallets used to be expensive business, but we have a
                solution for you. Our Palletforce network provides cost-effective delivery options that make small
                shipments economically viable.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Through our partnership with the Palletforce network, we can offer competitive rates for pallet
                deliveries across the UK, with next-day delivery options and full tracking capabilities.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <img
                src="/warehouse-worker-operating-forklift-with-pallets.jpg"
                alt="Palletforce Equipment"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Features</h2>
            <p className="text-xl text-gray-600">Efficient pallet delivery solutions for your business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Competitive Pricing</h2>
            <p className="text-xl text-gray-600">Affordable rates that make small shipments cost-effective</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 text-center border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1-3 Pallets</h3>
              <p className="text-gray-600 mb-6">Perfect for small businesses and occasional shipments</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Next-day delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Full tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Insurance included</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" className="w-full bg-transparent">
                  Get Quote
                </Button>
              </Link>
            </Card>

            <Card className="bg-orange-50 p-8 text-center border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4-7 Pallets</h3>
              <p className="text-gray-600 mb-6">Most popular option for regular business shipments</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Priority handling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Flexible collection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Dedicated support</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Quote</Button>
              </Link>
            </Card>

            <Card className="bg-white p-8 text-center border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">8-10 Pallets</h3>
              <p className="text-gray-600 mb-6">Maximum efficiency for larger small consignments</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Best value rates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Express options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Account management</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" className="w-full bg-transparent">
                  Get Quote
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Saving on Pallet Deliveries</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let small shipment costs hold your business back. Get competitive rates for your pallet deliveries
            with our Palletforce network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded flex items-center space-x-2">
                <span>Get Quote Now</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-800 px-8 py-3 text-lg rounded bg-transparent"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
