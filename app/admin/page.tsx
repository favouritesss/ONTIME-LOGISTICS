"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Plus, Search, Truck, BarChart3, Download, LogOut, User, FileText, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import InvoiceGenerator from "@/components/invoice-generator"
import ShipmentManagement from "@/components/shipment-management"

const mockPackages = [
  {
    id: "TRK001234567",
    sender: "John Smith",
    senderAddress: "123 Main St, New York, NY 10001",
    senderPhone: "+1 (555) 123-4567",
    recipient: "Jane Doe",
    recipientAddress: "456 Oak Ave, Los Angeles, CA 90210",
    recipientPhone: "+1 (555) 987-6543",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    status: "In Transit",
    created: "2024-01-15",
    estimatedDelivery: "2024-01-20",
    weight: 2.5,
    dimensions: "12x8x6 inches",
    serviceType: "Express",
    cost: "$45.99",
    description: "Electronics - Smartphone case",
    driverId: "D002",
    priority: "high" as const,
    declaredValue: 500,
    serviceLevel: "Premium",
    updates: [
      {
        id: "U001",
        timestamp: "2024-01-15T09:00:00Z",
        status: "Package Created",
        location: "New York, NY",
        description: "Package created and ready for pickup",
        updatedBy: "System",
      },
      {
        id: "U002",
        timestamp: "2024-01-15T14:30:00Z",
        status: "Picked Up",
        location: "New York, NY",
        description: "Package picked up by driver",
        updatedBy: "Sarah Transport",
      },
      {
        id: "U003",
        timestamp: "2024-01-16T08:15:00Z",
        status: "In Transit",
        location: "Philadelphia, PA",
        description: "Package in transit to destination",
        updatedBy: "Sarah Transport",
      },
    ],
  },
  {
    id: "TRK987654321",
    sender: "Amazon Warehouse",
    senderAddress: "410 Terry Ave N, Seattle, WA 98109",
    senderPhone: "+1 (206) 266-1000",
    recipient: "Mike Johnson",
    recipientAddress: "789 Pine St, Portland, OR 97205",
    recipientPhone: "+1 (503) 555-0123",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    status: "Delivered",
    created: "2024-01-16",
    estimatedDelivery: "2024-01-18",
    weight: 1.2,
    dimensions: "10x6x4 inches",
    serviceType: "Standard",
    cost: "$12.99",
    description: "Books - Programming manual",
    driverId: "D001",
    priority: "medium" as const,
    declaredValue: 100,
    serviceLevel: "Standard",
    updates: [
      {
        id: "U004",
        timestamp: "2024-01-16T10:00:00Z",
        status: "Package Created",
        location: "Seattle, WA",
        description: "Package created and ready for pickup",
        updatedBy: "System",
      },
      {
        id: "U005",
        timestamp: "2024-01-16T15:00:00Z",
        status: "Picked Up",
        location: "Seattle, WA",
        description: "Package picked up by driver",
        updatedBy: "John Driver",
      },
      {
        id: "U006",
        timestamp: "2024-01-18T11:30:00Z",
        status: "Delivered",
        location: "Portland, OR",
        description: "Package delivered successfully",
        updatedBy: "John Driver",
      },
    ],
  },
  {
    id: "TRK555666777",
    sender: "Best Buy",
    senderAddress: "7601 Penn Ave S, Richfield, MN 55423",
    senderPhone: "+1 (612) 291-1000",
    recipient: "Sarah Wilson",
    recipientAddress: "321 Elm St, Detroit, MI 48201",
    recipientPhone: "+1 (313) 555-7890",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    status: "Pending",
    created: "2024-01-18",
    estimatedDelivery: "2024-01-22",
    weight: 5.8,
    dimensions: "16x12x8 inches",
    serviceType: "Standard",
    cost: "$28.50",
    description: "Electronics - Wireless headphones",
    priority: "low" as const,
    declaredValue: 200,
    serviceLevel: "Standard",
    updates: [
      {
        id: "U007",
        timestamp: "2024-01-18T09:00:00Z",
        status: "Package Created",
        location: "Chicago, IL",
        description: "Package created and awaiting pickup",
        updatedBy: "System",
      },
    ],
  },
]

export default function AdminPage() {
  const [packages, setPackages] = useState(mockPackages)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false)
  const [selectedPackageForInvoice, setSelectedPackageForInvoice] = useState<any>(null)
  const [adminUser, setAdminUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [newPackage, setNewPackage] = useState({
    sender: "",
    senderAddress: "",
    senderPhone: "",
    recipient: "",
    recipientAddress: "",
    recipientPhone: "",
    origin: "",
    destination: "",
    status: "Pending",
    weight: "",
    dimensions: "",
    serviceType: "Standard",
    cost: "",
    description: "",
  })

  // login form state (shown when not authenticated)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  // ----- client-only auth helpers (local fallback) -----
  const readLocalUser = () => {
    try {
      const s = localStorage.getItem("adminUser")
      return s ? JSON.parse(s) : null
    } catch {
      return null
    }
  }

  const isLocallyAuthenticated = () => {
    try {
      const t = localStorage.getItem("adminToken")
      const flag = localStorage.getItem("isAdminAuthenticated")
      return !!t || flag === "true"
    } catch {
      return false
    }
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
      localStorage.removeItem("isAdminAuthenticated")
    } catch (e) {
      console.warn("logout error", e)
    }
    setAdminUser(null)
    setIsLoggedIn(false)
    // keep user on /admin (login form) — or navigate to home: router.replace("/")
    router.replace("/admin")
  }

  useEffect(() => {
    // run only on client
    const checkAuth = () => {
      try {
        if (!isLocallyAuthenticated()) {
          setIsLoggedIn(false)
          setIsLoading(false)
          return
        }
        const user = readLocalUser()
        setAdminUser(user || { name: "Admin User", email: "admin@example.com", role: "admin" })
        setIsLoggedIn(true)
        setIsLoading(false)
      } catch (err) {
        console.error("auth check failed", err)
        setIsLoggedIn(false)
        setIsLoading(false)
      }
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ----- handle login (tries real backend, falls back to mock) -----
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError("")

    // Try contacting backend login endpoint if available
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      if (res.ok) {
        const data = await res.json()
        // Expect token and user in response; fallback to simple shape if not present
        const token = data.token || data.accessToken || "mock-jwt-token"
        const user = data.user || data.admin || { name: loginEmail.split("@")[0] || "Admin User", email: loginEmail, role: "admin" }

        try {
          localStorage.setItem("adminToken", token)
          localStorage.setItem("adminUser", JSON.stringify(user))
          localStorage.setItem("isAdminAuthenticated", "true")
        } catch (err) {
          console.warn("localStorage write failed", err)
        }

        setAdminUser(user)
        setIsLoggedIn(true)
        setLoginLoading(false)
        router.replace("/admin")
        return
      } else {
        // if backend returns error, show it but still allow fallback
        const errData = await res.json().catch(() => null)
        setLoginError((errData && errData.error) || "Login failed (server). Falling back to mock login.")
      }
    } catch (err) {
      // network or endpoint not present; we will fallback to mock
      console.warn("login fetch failed (backend may not exist):", err)
      setLoginError("Backend not available — using local demo login.")
    }

    // Fallback mock-login (client-side only)
    try {
      const demoUser = { name: loginEmail ? loginEmail.split("@")[0] : "Admin User", email: loginEmail || "admin@example.com", role: "admin" }
      localStorage.setItem("adminToken", "mock-jwt-token")
      localStorage.setItem("adminUser", JSON.stringify(demoUser))
      localStorage.setItem("isAdminAuthenticated", "true")
      setAdminUser(demoUser)
      setIsLoggedIn(true)
      setLoginLoading(false)
      router.replace("/admin")
    } catch (err) {
      console.error("fallback login failed", err)
      setLoginError("Unable to complete login")
      setLoginLoading(false)
    }
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-teal-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  // If not logged in -> show login screen (inline)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Package className="h-8 w-8 text-teal-600" />
                <CardTitle>Admin Portal</CardTitle>
              </div>
              <CardDescription>Sign in to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && <div className="text-sm text-red-600">{loginError}</div>}
                <div>
                  <Label htmlFor="loginEmail">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loginLoading}>
                  {loginLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-sm text-gray-500 text-center mt-2">
                  This page uses a local demo login if your backend `/api/auth/login` isn't available.
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600">
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ---------- Dashboard functionality (only rendered when logged in) ----------
  const handleUpdateShipment = (shipmentId: string, updates: any) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === shipmentId ? { ...pkg, ...updates } : pkg)))
  }

  const handleAddUpdate = (shipmentId: string, update: any) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === shipmentId
          ? {
              ...pkg,
              updates: [...(pkg.updates || []), { ...update, id: `U${Date.now()}` }],
            }
          : pkg,
      ),
    )
  }

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateTrackingNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substr(2, 3).toUpperCase()
    return `TRK${timestamp}${random}`
  }

  const handleCreatePackage = () => {
    const trackingNumber = generateTrackingNumber()
    const today = new Date().toISOString().split("T")[0]
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const numericWeight =
      typeof newPackage.weight === "string" ? parseFloat(newPackage.weight) || 0 : (newPackage.weight as number)

    const packageData = {
      id: trackingNumber,
      ...newPackage,
      weight: numericWeight,
      created: today,
      estimatedDelivery,
      priority: "medium" as const,
      driverId: "D000",
      declaredValue: 0,
      serviceLevel: "Standard",
      updates: [
        {
          id: `U${Date.now()}`,
          timestamp: new Date().toISOString(),
          status: "Package Created",
          location: newPackage.origin,
          description: "Package created and ready for pickup",
          updatedBy: "Admin",
        },
      ],
    }

    setPackages([...packages, packageData])
    setNewPackage({
      sender: "",
      senderAddress: "",
      senderPhone: "",
      recipient: "",
      recipientAddress: "",
      recipientPhone: "",
      origin: "",
      destination: "",
      status: "Pending",
      weight: "",
      dimensions: "",
      serviceType: "Standard",
      cost: "",
      description: "",
    })
    setIsCreateDialogOpen(false)
  }

  const generateInvoice = (pkg: any) => {
    const invoiceContent = `
ONTIME COURIER SERVICES
Invoice & Shipping Label
================================

TRACKING NUMBER: ${pkg.id}
DATE CREATED: ${pkg.created}
ESTIMATED DELIVERY: ${pkg.estimatedDelivery}
SERVICE TYPE: ${pkg.serviceType}

SENDER INFORMATION:
Name: ${pkg.sender}
Address: ${pkg.senderAddress}
Phone: ${pkg.senderPhone}

RECIPIENT INFORMATION:
Name: ${pkg.recipient}
Address: ${pkg.recipientAddress}
Phone: ${pkg.recipientPhone}

PACKAGE DETAILS:
Description: ${pkg.description}
Weight: ${pkg.weight}
Dimensions: ${pkg.dimensions}
Status: ${pkg.status}

SHIPPING COST: ${pkg.cost}

ROUTE: ${pkg.origin} → ${pkg.destination}

================================
Thank you for choosing ONTIME!
For support: support@ontime-delivery.com
Track online: www.ontime-delivery.com/track
================================
    `

    const blob = new Blob([invoiceContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ONTIME_Invoice_${pkg.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleGenerateInvoice = (pkg: any) => {
    setSelectedPackageForInvoice(pkg)
    setIsInvoiceDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "in transit":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const stats = {
    total: packages.length,
    pending: packages.filter((p) => p.status === "Pending").length,
    inTransit: packages.filter((p) => p.status === "In Transit").length,
    delivered: packages.filter((p) => p.status === "Delivered").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-teal-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                ON<span className="text-orange-500">TIME</span> Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, {adminUser?.name || "Admin"}</span>
              </div>
              <nav className="flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-teal-600 font-medium">
                  Track Package
                </Link>
                <Link href="/admin" className="text-teal-600 font-medium">
                  Admin
                </Link>
              </nav>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Comprehensive shipment and package management system</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Packages</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.inTransit}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different management views */}
        <Tabs defaultValue="shipments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shipments">Advanced Shipment Management</TabsTrigger>
            <TabsTrigger value="packages">Basic Package Management</TabsTrigger>
            <TabsTrigger value="invoices">Invoice Management</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments">
            <ShipmentManagement
              shipments={packages}
              onUpdateShipment={handleUpdateShipment}
              onAddUpdate={handleAddUpdate}
            />
          </TabsContent>

          <TabsContent value="invoices">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-teal-600" />
                    <span>Invoice Management</span>
                  </CardTitle>
                  <CardDescription>Generate and manage professional invoices for shipments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                          <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
                        </div>
                        <FileText className="h-6 w-6 text-teal-600" />
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                          <p className="text-2xl font-bold text-green-600">{Math.floor(packages.length * 0.7)}</p>
                        </div>
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Outstanding</p>
                          <p className="text-2xl font-bold text-orange-600">{Math.ceil(packages.length * 0.3)}</p>
                        </div>
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packages.map((pkg) => (
                        <TableRow key={pkg.id}>
                          <TableCell className="font-mono font-medium">{pkg.id}</TableCell>
                          <TableCell>{pkg.sender}</TableCell>
                          <TableCell>{pkg.serviceType}</TableCell>
                          <TableCell className="font-medium">{pkg.cost}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGenerateInvoice(pkg)}
                                title="Generate Invoice"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => generateInvoice(pkg)}
                                title="Download Simple Invoice"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-4 w-4" />
                    <span>Create Package</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Package</DialogTitle>
                    <DialogDescription>Add a new package to the tracking system</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Sender Information</h3>
                      <div>
                        <Label htmlFor="sender">Sender Name</Label>
                        <Input
                          id="sender"
                          value={newPackage.sender}
                          onChange={(e) => setNewPackage({ ...newPackage, sender: e.target.value })}
                          placeholder="Sender name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="senderAddress">Sender Address</Label>
                        <Textarea
                          id="senderAddress"
                          value={newPackage.senderAddress}
                          onChange={(e) => setNewPackage({ ...newPackage, senderAddress: e.target.value })}
                          placeholder="Full sender address"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="senderPhone">Sender Phone</Label>
                        <Input
                          id="senderPhone"
                          value={newPackage.senderPhone}
                          onChange={(e) => setNewPackage({ ...newPackage, senderPhone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="origin">Origin City</Label>
                        <Input
                          id="origin"
                          value={newPackage.origin}
                          onChange={(e) => setNewPackage({ ...newPackage, origin: e.target.value })}
                          placeholder="Origin city, state"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Recipient Information</h3>
                      <div>
                        <Label htmlFor="recipient">Recipient Name</Label>
                        <Input
                          id="recipient"
                          value={newPackage.recipient}
                          onChange={(e) => setNewPackage({ ...newPackage, recipient: e.target.value })}
                          placeholder="Recipient name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="recipientAddress">Recipient Address</Label>
                        <Textarea
                          id="recipientAddress"
                          value={newPackage.recipientAddress}
                          onChange={(e) => setNewPackage({ ...newPackage, recipientAddress: e.target.value })}
                          placeholder="Full recipient address"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="recipientPhone">Recipient Phone</Label>
                        <Input
                          id="recipientPhone"
                          value={newPackage.recipientPhone}
                          onChange={(e) => setNewPackage({ ...newPackage, recipientPhone: e.target.value })}
                          placeholder="+1 (555) 987-6543"
                        />
                      </div>
                      <div>
                        <Label htmlFor="destination">Destination City</Label>
                        <Input
                          id="destination"
                          value={newPackage.destination}
                          onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
                          placeholder="Destination city, state"
                        />
                      </div>
                    </div>

                    <div className="col-span-2 space-y-4">
                      <h3 className="font-semibold text-lg">Package Details</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="weight">Weight</Label>
                          <Input
                            id="weight"
                            value={newPackage.weight}
                            onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
                            placeholder="2.5 lbs"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dimensions">Dimensions</Label>
                          <Input
                            id="dimensions"
                            value={newPackage.dimensions}
                            onChange={(e) => setNewPackage({ ...newPackage, dimensions: e.target.value })}
                            placeholder="12x8x6 inches"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cost">Shipping Cost</Label>
                          <Input
                            id="cost"
                            value={newPackage.cost}
                            onChange={(e) => setNewPackage({ ...newPackage, cost: e.target.value })}
                            placeholder="$25.99"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="serviceType">Service Type</Label>
                          <Select
                            value={newPackage.serviceType}
                            onValueChange={(value) => setNewPackage({ ...newPackage, serviceType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Standard">Standard</SelectItem>
                              <SelectItem value="Express">Express</SelectItem>
                              <SelectItem value="Overnight">Overnight</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={newPackage.status}
                            onValueChange={(value) => setNewPackage({ ...newPackage, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Transit">In Transit</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Package Description</Label>
                        <Textarea
                          id="description"
                          value={newPackage.description}
                          onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                          placeholder="Electronics - Smartphone case"
                          rows={2}
                        />
                      </div>
                      <Button onClick={handleCreatePackage} className="w-full bg-teal-600 hover:bg-teal-700">
                        Create Package
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Packages Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Packages</CardTitle>
                <CardDescription>Basic package management and tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPackages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-mono font-medium">{pkg.id}</TableCell>
                        <TableCell>{pkg.sender}</TableCell>
                        <TableCell>{pkg.recipient}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {pkg.origin} → {pkg.destination}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
                        </TableCell>
                        <TableCell>{pkg.serviceType}</TableCell>
                        <TableCell className="font-medium">{pkg.cost}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateInvoice(pkg)}
                              title="Download Invoice"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Professional Invoice Generator Dialog */}
      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Professional Invoice Generator</DialogTitle>
            <DialogDescription>
              Generate a professional invoice for tracking #{selectedPackageForInvoice?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedPackageForInvoice && (
            <InvoiceGenerator
              {...({
                shipmentId: selectedPackageForInvoice.id,
                onInvoiceGenerated: (invoice: any) => {
                  console.log("Invoice generated:", invoice)
                  setIsInvoiceDialogOpen(false)
                },
              } as any)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}