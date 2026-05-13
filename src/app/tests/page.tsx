"use client"

import { useState } from "react"
import { testPlatforms } from "@/lib/assessments"
import { searchTests } from "@/lib/test-search"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const categories = [...new Set(testPlatforms.flatMap(p => p.categories))]

export default function Tests() {
  const [skill, setSkill] = useState("")
  const [category, setCategory] = useState("")
  const [freeOnly, setFreeOnly] = useState(false)
  const [apiOnly, setApiOnly] = useState(false)

  const results = searchTests({
    skill: skill || undefined,
    category: category || undefined,
    free: freeOnly || undefined,
    hasApi: apiOnly || undefined,
  })

  const filtered = results.length > 0 ? results : testPlatforms.map(p => ({ platform: p, match: 50, reasons: [] }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Платформы тестов</h1>
        <p className="text-sm text-muted-foreground mt-1">{testPlatforms.length} платформ для оценки навыков</p>
      </div>

      {/* Поиск */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Поиск по навыку (React, Python...)"
          className="max-w-xs"
          value={skill}
          onChange={e => setSkill(e.target.value)}
        />
        <select
          className="h-10 rounded-lg border bg-background px-3 text-sm max-w-[180px]"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Все категории</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} className="rounded" />
          Бесплатные
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={apiOnly} onChange={e => setApiOnly(e.target.checked)} className="rounded" />
          С API
        </label>
      </div>

      {/* Результаты */}
      <div className="grid gap-4">
        {filtered.map(({ platform: p, match, reasons }) => (
          <div key={p.id} className="p-5 rounded-xl border bg-card">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{p.name}</h3>
                  {p.freeTier && <Badge variant="success">Free</Badge>}
                  {p.hasApi && <Badge variant="warning">API</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                <div className="flex gap-1 flex-wrap mt-2">
                  {p.categories.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
                </div>
                {reasons.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-2">✓ {reasons.join(" · ")}</div>
                )}
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold">{match}%</div>
                <div className="text-xs text-muted-foreground">совпадение</div>
                <a href={p.url} target="_blank" className="text-xs text-foreground underline mt-1 block">открыть →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
