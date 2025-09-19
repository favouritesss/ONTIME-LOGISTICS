"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Globe, Ship, Plane, FileText, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"

export default function EuropeanTransportPage() {
  const features = [
    {
      icon: Globe,
      title: "European Network",
      description: "Extensive network of trusted partners across Continental Europe",
    },
    {
      icon: FileText,
      title: "Customs Clearance",
      description: "Full import and export documentation and customs handling",
    },
    {
      icon: Ship,
      title: "Multi-Modal Transport",
      description: "Road, sea, and air freight options for optimal routing",
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Expert handling of EU regulations and trade requirements",
    },
  ]

  const benefits = [
    "Door-to-door European delivery",
    "Customs clearance included",
    "Multi-modal transport options",
    "Trusted partner network",
    "Real-time tracking",
    "Competitive European rates",
  ]

  const countries = [
    "Germany",
    "France",
    "Netherlands",
    "Belgium",
    "Spain",
    "Italy",
    "Poland",
    "Czech Republic",
    "Austria",
    "Switzerland",
    "Denmark",
    "Sweden",
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="services" />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-teal-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/shipping-containers-at-port-with-cranes.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/80"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                European <span className="text-orange-400">Transport</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pretty">
                Comprehensive import and export services across Continental Europe
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">European Logistics Excellence</h2>
              <p className="text-lg text-gray-600 mb-6">
                In addition to our UK services, through our trusted and fully-vetted network of partners, we offer a
                full import and export service across Continental Europe. Our European transport solutions provide
                seamless connectivity between the UK and major European markets.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From customs clearance to final delivery, we handle every aspect of your European shipments with
                expertise and care. Our established partnerships ensure reliable service and competitive rates
                throughout Europe.
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
                src="/european-freight-train-crossing-bridge.jpg"
                alt="European Transport"
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
            <p className="text-xl text-gray-600">Complete European transport and logistics solutions</p>
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

      {/* Countries Served */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Countries We Serve</h2>
            <p className="text-xl text-gray-600">Extensive coverage across Continental Europe</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country, index) => (
              <Card key={index} className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center space-x-2">
                  <Globe className="h-5 w-5 text-orange-500" />
                  <span className="font-medium text-gray-900">{country}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Don't see your destination? We can arrange transport to most European locations.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                Contact Us for More Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transport Options</h2>
            <p className="text-xl text-gray-600">Choose the best method for your European shipments</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Air Freight</h3>
              <p className="text-gray-600 mb-6">Fast delivery for urgent shipments across Europe</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">1-3 day delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">High-value goods</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Temperature controlled</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-white p-8 text-center border-2 border-orange-200">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Ship className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Road Freight</h3>
              <p className="text-gray-600 mb-6">Cost-effective door-to-door European delivery</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">3-7 day delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Full and part loads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Flexible scheduling</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-white p-8 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Ship className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sea Freight</h3>
              <p className="text-gray-600 mb-6">Economical option for large volume shipments</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">7-14 day delivery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Container loads</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Best value rates</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Expand Your European Reach</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take your business across Europe with our comprehensive transport and logistics solutions. Get competitive
            rates and reliable service for all your European shipments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded flex items-center space-x-2">
                <span>Get European Quote</span>
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
