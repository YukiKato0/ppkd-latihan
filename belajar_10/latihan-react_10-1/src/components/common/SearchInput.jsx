import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput({ value, onChange, placeholder = "Cari...", className = "" }) {
  return (
    <div className={`relative flex-1 max-w-sm ${className}`}>
      <Search className="absolute right-3 top-1.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-5!"
      />
    </div>
  )
}