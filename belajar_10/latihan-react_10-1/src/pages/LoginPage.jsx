import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle, Loader2, Store } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/common/PasswordInput"

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || "Email atau password yang Anda masukkan salah.")
      }

      localStorage.setItem("token", result.data.token)
      navigate("/dashboard")
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kesalahan pada server. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 p-4 font-sans antialiased">
      {/* Visual Effect: Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%, rgba(120,119,198,0.25), rgba(255,255,255,0))]" />

      <Card className="relative z-10 w-full max-w-md border-slate-800 bg-slate-900/80 text-slate-100 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-2">
          {/* Logo / Badge Aplikasi */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/50 text-white border border-primary/20 shadow-inner">
            <Store className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Selamat Datang</CardTitle>
            <CardDescription className="text-slate-400">
              Masukkan kredensial Anda untuk mengakses dashboard
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {/* Pesan Error UI */}
          {errorMessage && (
            <Alert variant="destructive" className="mb-4 bg-red-950/50 border-red-800 text-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} method="POST" className="space-y-4">
            {/* Input Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-300">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="pl-9 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-300">
                  Password
                </Label>
                <a
                  href="#forgot"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Lupa password?
                </a>
              </div>
              <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Checkbox Ingat Saya */}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, rememberMe: Boolean(checked) }))
                }
                className="border-slate-700 data-[state=checked]:bg-primary"
              />
              <Label htmlFor="rememberMe" className="text-xs font-medium text-slate-400 cursor-pointer">
                Ingat saya di perangkat ini
              </Label>
            </div>

            {/* Tombol Submit */}
            <Button type="submit" className="w-full h-10 font-semibold shadow-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}