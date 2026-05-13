import type { Metadata } from "next"
import "./globals.css"
import { Nav } from "./nav"

export const metadata: Metadata = {
  title: "Skill of Professional",
  description: "AI-платформа для подбора персонала",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <Nav>{children}</Nav>
      </body>
    </html>
  )
}
