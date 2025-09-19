"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Clock, Send, MessageSquare, FileText, Truck, MapPin } from "lucide-react"
import SharedHeader from "@/components/shared-header"
import SharedFooter from "@/components/shared-footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you within 24 hours.")

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+44 20 1234 5678", "+44 20 1234 5679"],
      description: "Call us for immediate assistance",
    },
    {
      icon: MessageSquare,
      title: "Email",
      details: ["support@ontime-logistics.com", "sales@ontime-logistics.com"],
      description: "Send us an email anytime",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Logistics Avenue", "Birmingham, B1 2AB, UK"],
      description: "Visit our headquarters",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      description: "24/7 emergency support available",
    },
  ]

  const quickActions = [
    {
      icon: MessageSquare,
      title: "General Inquiry",
      description: "Questions about our services or company",
      action: "Contact Us",
    },
    {
      icon: FileText,
      title: "Request Quote",
      description: "Get pricing for your shipping needs",
      action: "Get Quote",
    },
    {
      icon: Truck,
      title: "Track Shipment",
      description: "Check the status of your package",
      action: "Track Now",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SharedHeader currentPage="contact" />

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
                Contact <span className="text-orange-400">Us</span>
              </h1>
              <p className="text-lg md:text-xl text-pretty text-white">
                Get in touch with our logistics experts. We're here to help with all your shipping and freight needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
            <p className="text-xl text-gray-600">Choose the option that best fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <action.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                <p className="text-gray-600 mb-6">{action.description}</p>
                <Button className="bg-teal-800 hover:bg-teal-900 text-white w-full">{action.action}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <Card className="bg-white p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="w-full"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="air-freight">Air Freight</SelectItem>
                        <SelectItem value="ocean-freight">Ocean Freight</SelectItem>
                        <SelectItem value="road-transport">Road Transport</SelectItem>
                        <SelectItem value="warehousing">Warehousing</SelectItem>
                        <SelectItem value="customs-clearance">Customs Clearance</SelectItem>
                        <SelectItem value="cargo-insurance">Cargo Insurance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="w-full"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="w-full h-32"
                      placeholder="Please provide details about your shipping requirements, timeline, and any specific questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg rounded flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-white p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                        <info.icon className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-700 font-medium">
                            {detail}
                          </p>
                        ))}
                        <p className="text-gray-600 text-sm mt-2">{info.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="bg-gray-100 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">Interactive Map</p>
                    <p className="text-sm">123 Logistics Avenue, Birmingham, UK</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What are your shipping rates?</h3>
              <p className="text-gray-600">
                Our rates vary based on destination, weight, dimensions, and service type. Contact us for a personalized
                quote tailored to your specific shipping needs.
              </p>
            </Card>

            <Card className="bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">How can I track my shipment?</h3>
              <p className="text-gray-600">
                Use our online tracking system with your tracking number, or contact our customer service team for
                real-time updates on your shipment status.
              </p>
            </Card>

            <Card className="bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Do you handle customs clearance?</h3>
              <p className="text-gray-600">
                Yes, we provide comprehensive customs clearance services including documentation, duty optimization, and
                compliance management for international shipments.
              </p>
            </Card>

            <Card className="bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What insurance options are available?</h3>
              <p className="text-gray-600">
                We offer various cargo insurance options including all-risk coverage, marine insurance, and specialized
                protection for high-value or sensitive shipments.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  )
}
