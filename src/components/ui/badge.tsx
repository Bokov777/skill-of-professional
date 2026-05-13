import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "success" | "warning" }>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "outline" && "border text-muted-foreground",
        variant === "success" && "bg-green-500/10 text-green-500",
        variant === "warning" && "bg-yellow-500/10 text-yellow-500",
        className
      )}
      {...props}
    />
  )
)
Badge.displayName = "Badge"

export { Badge }
