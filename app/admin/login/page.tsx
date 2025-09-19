"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Eye, EyeOff, Lock, Mail, Shield, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loginAdmin, setAdminSession } from "@/lib/auth"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showTwoFA, setShowTwoFA] = useState(false)
  const [twoFACode, setTwoFACode] = useState("")
  const router = useRouter()

  // Demo 2FA code
  const MOCK_2FA_CODE = "123456"

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // ✅ Use fake login helper (replace with real API later)
    const ok = loginAdmin(email, password)
    if (ok) {
      setShowTwoFA(true)
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  // Handle 2FA verification
  const handleTwoFAVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 500)) // simulate delay

    if (twoFACode === MOCK_2FA_CODE) {
      // ✅ Set session properly using helper
      setAdminSession("mock-jwt-token", {
        email,
        name: "Admin User",
        role: "admin",
      })

      console.log("Redirecting to /admin...") // debug
      setIsLoading(false)
      router.push("/admin")
    } else {
      setError("Invalid 2FA code")
      setIsLoading(false)
    }
  }

  const resetLogin = () => {
    setShowTwoFA(false)
    setTwoFACode("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Package className="h-10 w-10 text-teal-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              ON<span className="text-orange-500">TIME</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-gray-600">Secure access to courier management system</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <CardTitle className="text-xl">{showTwoFA ? "Two-Factor Authentication" : "Sign In"}</CardTitle>
            </div>
            <CardDescription>
              {showTwoFA
                ? "Enter the 6-digit code from your authenticator app"
                : "Enter your credentials to access the admin dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!showTwoFA ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleTwoFAVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twofa">Authentication Code</Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={twoFACode} onChange={(value: string) => setTwoFACode(value)}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Demo code: <span className="font-mono font-semibold">{MOCK_2FA_CODE}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify & Sign In"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full bg-transparent" onClick={resetLogin}>
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-teal-600">
            ← Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  )
}
