"use client"

import { useState } from "react"
import { candidates, statusLabels, type CandidateStatus } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import Link from "next/link"

const statusOptions = [
  { label: "Все статусы", value: "" },
  ...Object.entries(statusLabels).map(([k, v]) => ({ label: v, value: k })),
]

export default function Candidates() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [skill, setSkill] = useState("")

  const allSkills = [...new Set(candidates.flatMap(c => c.skills))]

  const filtered = candidates.filter(c => {
    const byName = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
    const byStatus = !status || c.status === status
    const bySkill = !skill || c.skills.includes(skill)
    return byName && byStatus && bySkill
  })

  const statusColors: Record<CandidateStatus, "success" | "warning" | "default"> = {
    new: "default", review: "default", interview: "warning",
    offer: "success", hired: "success", rejected: "default",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Кандидаты</h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} из {candidates.length}</p>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Поиск по имени или роли..."
          className="max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select options={statusOptions} placeholder="Все статусы" value={status} onChange={e => setStatus(e.target.value)} className="max-w-[180px]" />
        <Select
          options={allSkills.map(s => ({ label: s, value: s }))}
          placeholder="Все навыки"
          value={skill}
          onChange={e => setSkill(e.target.value)}
          className="max-w-[180px]"
        />
      </div>

      {/* Список */}
      <div className="grid gap-3">
        {filtered.map(c => (
          <Link key={c.id} href={`/candidates/profile?id=${c.id}`}>
            <div className="p-5 rounded-xl border bg-card hover:bg-muted/20 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
                  {c.photo}
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                <span className="text-sm text-muted-foreground">{c.match}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
