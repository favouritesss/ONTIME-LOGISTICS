"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SharedHeaderProps {
  currentPage?: string
}

export default function SharedHeader({ currentPage = "" }: SharedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex justify-between items-center py-2 text-sm border-b border-teal-700">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">support@ontime-logistics.com</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Follow us:</span>
            <Facebook className="h-4 w-4 cursor-pointer hover:text-orange-400" />
            <Twitter className="h-4 w-4 cursor-pointer hover:text-orange-400" />
            <Linkedin className="h-4 w-4 cursor-pointer hover:text-orange-400" />
          </div>
        </div>

        {/* Main header */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Image src="/ontime-logo.jpg" alt="ONTIME Logo" width={40} height={40} className="rounded-lg" />
            <div className="text-xl md:text-2xl font-bold">
              <Link href="/">
                ON<span className="text-orange-400">TIME</span>
              </Link>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-orange-400 transition-colors ${currentPage === "home" ? "text-orange-400 font-semibold" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`hover:text-orange-400 transition-colors ${currentPage === "services" ? "text-orange-400 font-semibold" : ""}`}
            >
              Services
            </Link>
            <Link
              href="/logistics"
              className={`hover:text-orange-400 transition-colors ${currentPage === "logistics" ? "text-orange-400 font-semibold" : ""}`}
            >
              Logistics
            </Link>
            <Link
              href="/about"
              className={`hover:text-orange-400 transition-colors ${currentPage === "about" ? "text-orange-400 font-semibold" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-orange-400 transition-colors ${currentPage === "contact" ? "text-orange-400 font-semibold" : ""}`}
            >
              Contact
            </Link>
            <Link href="/track">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">TRACK</Button>
            </Link>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-teal-700 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-teal-700 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`hover:text-orange-400 transition-colors py-2 ${currentPage === "home" ? "text-orange-400 font-semibold" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={`hover:text-orange-400 transition-colors py-2 ${currentPage === "services" ? "text-orange-400 font-semibold" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/logistics"
                className={`hover:text-orange-400 transition-colors py-2 ${currentPage === "logistics" ? "text-orange-400 font-semibold" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Logistics
              </Link>
              <Link
                href="/about"
                className={`hover:text-orange-400 transition-colors py-2 ${currentPage === "about" ? "text-orange-400 font-semibold" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`hover:text-orange-400 transition-colors py-2 ${currentPage === "contact" ? "text-orange-400 font-semibold" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href="/track" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full mt-4">
                  TRACK NOW
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
