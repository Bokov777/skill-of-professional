"use client"

import { useEffect, useState, createContext, useContext } from "react"
import { getDb, seedData } from "@/lib/db"
import type { PGlite } from "@electric-sql/pglite"

const DbContext = createContext<PGlite | null>(null)

export function useDb() { return useContext(DbContext) }

export function DbProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    getDb().then(async (d) => {
      await seedData()
      setReady(true)
    }).catch(console.error)
  }, [])

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
      Загрузка базы данных...
    </div>
  )

  return <>{children}</>
}
