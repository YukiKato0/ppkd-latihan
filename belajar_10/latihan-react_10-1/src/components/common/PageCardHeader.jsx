import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function PageCardHeader({ title, description, actionLabel, onAction }) {
  return (
    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" /> {actionLabel}
        </Button>
      )}
    </CardHeader>
  )
}