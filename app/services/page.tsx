"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plane, Ship, Truck, Package, Globe, Clock, Shield, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import ScrollToTop from "@/components/scroll-to-top"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"

export default function ServicesPage() {
  const services = [
    {
      icon: Plane,
      title: "Full Load Services",
      description: "Complete truckload solutions for large shipments with dedicated vehicles and priority handling.",
      features: ["Dedicated vehicle", "Priority handling", "Direct delivery", "Real-time tracking"],
      image: "/cargo-airplane-being-loaded-with-freight-container.jpg",
      link: "/services/full-load",
    },
    {
      icon: Ship,
      title: "Palletforce Equipment",
      description: "Professional pallet handling and specialized equipment for secure cargo transportation.",
      features: ["Pallet handling", "Specialized equipment", "Secure loading", "Professional service"],
      image: "/shipping-containers-at-port-with-cranes.jpg",
      link: "/services/palletforce",
    },
    {
      icon: Truck,
      title: "European Transport",
      description: "Comprehensive European road transport services connecting major cities across the continent.",
      features: ["European coverage", "Cross-border expertise", "Customs handling", "Multi-modal options"],
      image: "/modern-logistics-trucks-and-transportation-vehicle.jpg",
      link: "/services/european-transport",
    },
    {
      icon: Package,
      title: "Warehousing & Distribution",
      description: "Secure storage and efficient distribution solutions for your inventory management needs.",
      features: ["Climate controlled", "Inventory management", "Pick & pack", "Order fulfillment"],
      image: "/packaged-goods-and-containers-in-warehouse.jpg",
      link: "/services",
    },
    {
      icon: Globe,
      title: "Customs Clearance",
      description: "Expert customs brokerage services to ensure smooth international trade operations.",
      features: ["Documentation support", "Duty optimization", "Compliance management", "Trade consulting"],
      image: "/freight-transportation-and-logistics-operations.jpg",
      link: "/services",
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive insurance coverage to protect your valuable shipments during transit.",
      features: ["All-risk coverage", "Marine insurance", "Cargo protection", "Claims support"],
      image: "/retail-logistics-and-distribution-center.jpg",
      link: "/services",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-teal-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/modern-warehouse-logistics-facility-with-yellow-st.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/80"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
                Our <span className="text-orange-400">Services</span>
              </h1>
              <p className="text-lg md:text-xl text-pretty text-white">
                Comprehensive logistics solutions tailored to meet your business needs across air, sea, and land
                transportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Logistics Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From air freight to warehousing, we provide end-to-end logistics services to keep your business moving
              forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <service.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.link}>
                  <Button
                    variant="outline"
                    className="w-full border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <section key={index} className={`py-16 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <service.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">{service.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={service.link}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3">Get Quote</Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white px-6 py-3 bg-transparent"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose ONTIME?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              With years of experience and a commitment to excellence, we deliver logistics solutions you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-300">Round-the-clock customer service and shipment monitoring</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Network</h3>
              <p className="text-gray-300">Worldwide coverage with local expertise in every market</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
              <p className="text-gray-300">Advanced security measures and insurance coverage</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Team</h3>
              <p className="text-gray-300">Experienced professionals dedicated to your success</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a customized logistics solution that meets your specific business requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded">
                Request Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white px-8 py-3 text-lg rounded bg-transparent"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SharedFooter />

      {/* Scroll To Top Component */}
      <ScrollToTop />
    </div>
  )
}
