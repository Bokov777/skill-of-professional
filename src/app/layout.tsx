import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Skill of Professional",
  description: "HR platform for professional skills assessment",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  )
}
