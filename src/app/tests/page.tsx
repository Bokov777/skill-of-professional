"use client"

import { useState } from "react"
import { platforms } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const categories = [...new Set(platforms.flatMap(p => p.categories))]

export default function Tests() {
  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("")
  const [freeOnly, setFreeOnly] = useState(false)
  const [apiOnly, setApiOnly] = useState(false)

  const filtered = platforms.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false
    if (cat && !p.categories.includes(cat)) return false
    if (freeOnly && !p.freeTier) return false
    if (apiOnly && !p.hasApi) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Платформы тестов</h1>
        <p className="text-sm text-muted-foreground mt-1">{platforms.length} платформ</p>
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <Input placeholder="Поиск..." className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="h-10 rounded-lg border bg-background px-3 text-sm" value={cat} onChange={e => setCat(e.target.value)}>
          <option value="">Все категории</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(!freeOnly)} />Free</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={apiOnly} onChange={e => setApiOnly(!apiOnly)} />API</label>
      </div>
      <div className="grid gap-3">
        {filtered.map(p => (
          <div key={p.id} className="p-5 rounded-xl border bg-card flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{p.name}</h3>
                {p.freeTier && <Badge variant="success">Free</Badge>}
                {p.hasApi && <Badge variant="warning">API</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
              <div className="flex gap-1 flex-wrap mt-2">{p.categories.map(c => <Badge key={c} variant="outline">{c}</Badge>)}</div>
            </div>
            <a href={p.url} target="_blank" className="shrink-0 text-sm underline text-muted-foreground hover:text-foreground">открыть →</a>
          </div>
        ))}
      </div>
    </div>
  )
}
