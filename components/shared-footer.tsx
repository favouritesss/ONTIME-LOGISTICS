import { Facebook, Twitter, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SharedFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/ontime-logo.jpg" alt="ONTIME Logo" width={32} height={32} className="rounded-lg" />
              <div className="text-2xl font-bold">
                <Link href="/">
                  ON<span className="text-orange-400">TIME</span>
                </Link>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Leading logistics and freight forwarding company providing reliable shipping solutions worldwide.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-orange-400" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-orange-400" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-orange-400" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services" className="hover:text-orange-400">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400">
                  Ocean Freight
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400">
                  Road Transport
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400">
                  Warehousing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400">
                  Customs Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-orange-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-orange-400">
                  Track Package
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@ontime-logistics.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Logistics Ave, Birmingham, UK</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+44 20 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ONTIME Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
