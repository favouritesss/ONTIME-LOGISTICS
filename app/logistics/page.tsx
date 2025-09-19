"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function LogisticsPage() {
  const services = [
    {
      title: "Contract distribution",
      description: "Reliable distribution services tailored to your business needs",
    },
    {
      title: "Ad-hoc transport",
      description: "Flexible transport solutions for urgent deliveries",
    },
    {
      title: "Groupage",
      description: "Cost-effective shared transport for smaller shipments",
    },
    {
      title: "Tail-lift deliveries",
      description: "Specialized equipment for heavy or bulky items",
    },
    {
      title: "Double-deck trailers",
      description: "Maximize capacity with our double-deck trailer fleet",
    },
    {
      title: "Reverse logistics",
      description: "Efficient return and recycling logistics solutions",
    },
    {
      title: "Curtain-sided vehicles",
      description: "Versatile loading options for various cargo types",
    },
    {
      title: "Next day delivery",
      description: "Fast, reliable next-day delivery services",
    },
    {
      title: "Timed deliveries",
      description: "Precise delivery scheduling to meet your requirements",
    },
    {
      title: "AM deliveries",
      description: "Early morning delivery options for time-sensitive cargo",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="logistics" />

      {/* Hero Section */}
      <section className="relative h-[600px] bg-teal-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/modern-warehouse-logistics-facility-with-yellow-st.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-teal-800/60"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Transport & <span className="text-orange-400">Logistics</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-pretty">
                Take the complexity out of customs Freight Solutions with customs brokerage services
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded">
                  DISCOVER OUR SERVICES
                </Button>
                <Link href="/track">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-teal-800 px-8 py-3 text-lg rounded bg-transparent"
                  >
                    TRACK SHIPMENT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UK & Ireland Transport Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">
                Reliable UK & Ireland Transport Logistics Since 2009
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-pretty leading-relaxed">
                Because we understand that your top priority is to get your goods to your customers on time and in full,
                we offer a full spectrum of transport logistics solutions to ensure you have the flexibility to send
                different sizes of consignment without having to find a new provider.
              </p>
              <p className="text-lg text-gray-600 mb-8 text-pretty leading-relaxed">
                With so many options available you can rest assured that we will be able to deliver your consignment,
                regardless of its size. And if there's ever a time where you need some advice on choosing the right
                solution, our transport team, who have more than 120 years' experience.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">120+</div>
                  <div className="text-gray-600">Expert Team</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Warehouse Operations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Logistics Team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Transport Fleet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Expert Support</span>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <img
                src="/modern-logistics-trucks-and-transportation-vehicle.jpg"
                alt="UK & Ireland Transport"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute top-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-800">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ONTIME Services Include:</h2>
            <p className="text-xl text-gray-600">Comprehensive logistics solutions for all your transport needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500/10 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded">
              Contact us today!
            </Button>
            <p className="text-gray-600 mt-4">Contact us today for your airfreight requirements</p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="mt-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                CLICK HERE TO CONTACT US!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Full Load Services */}
            <div className="text-center">
              <div className="relative mb-6">
                <img
                  src="/freight-transportation-and-logistics-operations.jpg"
                  alt="Full Load Services"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-teal-800/20 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Load Services</h3>
              <h4 className="text-lg font-semibold text-orange-500 mb-4">Full, Part, and Consolidated Loads</h4>
              <p className="text-gray-600 mb-6">
                Our dedicated fleet of vehicles operates nationally throughout the UK delivering both full, part, and
                consolidated loads.
              </p>
              <Link href="/services/full-load">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Palletforce Equipment */}
            <div className="text-center">
              <div className="relative mb-6">
                <img
                  src="/packaged-goods-and-containers-in-warehouse.jpg"
                  alt="Palletforce Equipment"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-teal-800/20 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Palletforce Equipment</h3>
              <h4 className="text-lg font-semibold text-orange-500 mb-4">Palletforce Equipment</h4>
              <p className="text-gray-600 mb-6">
                Sending smaller consignments of less than 10 pallets used to be expensive business, but we have a
                solution for you.
              </p>
              <Link href="/services/palletforce">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* European Transport */}
            <div className="text-center">
              <div className="relative mb-6">
                <img
                  src="/shipping-containers-at-port-with-cranes.jpg"
                  alt="European Transport"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-teal-800/20 rounded-lg"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">European Transport</h3>
              <h4 className="text-lg font-semibold text-orange-500 mb-4">European Transport Logistics</h4>
              <p className="text-gray-600 mb-6">
                In addition to our UK services, through our trusted and fully-vetted network of partners, we offer a
                full import and export service.
              </p>
              <Link href="/services/european-transport">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship with ONTIME?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with our comprehensive logistics solutions today. Our expert team is ready to handle your
            shipping needs with precision and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>

      <SharedFooter />
      <ScrollToTop />
    </div>
  )
}
