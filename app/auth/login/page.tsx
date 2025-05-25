"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, Briefcase } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // HANDLE LOGIN FORM SUBMISSION
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Successfully logged in!")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT SIDE - HERO CONTENT */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InterviewPro
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">Manage Your Career Journey</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Track interviews, organize tasks, and land your dream job with our comprehensive management platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <h3 className="font-semibold text-gray-900">Interview Tracking</h3>
                <p className="text-sm text-gray-600">Keep track of all your interviews and their status</p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <h3 className="font-semibold text-gray-900">Task Management</h3>
                <p className="text-sm text-gray-600">Organize preparation tasks and follow-ups</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md glass-card shadow-2xl border-0">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">Sign in to your account to continue</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
