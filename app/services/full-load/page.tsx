"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Truck, Package, Clock, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"

export default function FullLoadPage() {
  const features = [
    {
      icon: Truck,
      title: "Dedicated Fleet",
      description: "Modern vehicles equipped for full, part, and consolidated loads",
    },
    {
      icon: Package,
      title: "Flexible Capacity",
      description: "Handle shipments of any size with our versatile transport solutions",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Reliable scheduling and on-time delivery across the UK and Ireland",
    },
    {
      icon: Shield,
      title: "Secure Transport",
      description: "Professional handling and secure transport for all your goods",
    },
  ]

  const benefits = [
    "Cost-effective for large shipments",
    "Direct delivery without stops",
    "Flexible scheduling options",
    "Real-time tracking available",
    "Professional loading/unloading",
    "Insurance coverage included",
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="services" />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-teal-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/freight-transportation-and-logistics-operations.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/80"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Full Load <span className="text-orange-400">Services</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pretty">
                Dedicated transport solutions for full, part, and consolidated loads across the UK and Ireland
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Load Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our dedicated fleet of vehicles operates nationally throughout the UK delivering both full, part, and
                consolidated loads. Whether you need to transport a single pallet or fill an entire truck, we have the
                right solution for your business.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With flexible scheduling and professional handling, we ensure your goods arrive safely and on time,
                every time. Our experienced drivers and modern fleet guarantee reliable service you can count on.
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
                src="/modern-logistics-trucks-and-transportation-vehicle.jpg"
                alt="Full Load Services"
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
            <p className="text-xl text-gray-600">Everything you need for reliable full load transport</p>
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

      {/* CTA Section */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship Your Full Load?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a personalized quote for your full load transport needs. Our team is ready to provide you with
            competitive pricing and reliable service.
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
