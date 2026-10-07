import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PasswordInput({ id = "password", name = "password", value, onChange, placeholder = "*********", required = false }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex gap-2">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  )
}