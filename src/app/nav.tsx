"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/dashboard", label: "Дашборд", icon: "📊" },
  { href: "/candidates", label: "Кандидаты", icon: "👥" },
]

export function Nav({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isLanding = path === "/"

  if (isLanding) return <>{children}</>

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r shrink-0 hidden md:flex flex-col p-4 gap-1">
        <Link href="/" className="text-sm font-medium tracking-tight mb-6 px-3 py-2">
          Skill of Professional
        </Link>
        {NAV.map(n => (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              path.startsWith(n.href)
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{n.icon}</span>
            {n.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6 max-w-6xl">{children}</main>
    </div>
  )
}
