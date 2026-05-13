"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { candidates, statusLabels, type CandidateStatus } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const statusColors: Record<CandidateStatus, "success" | "warning" | "default"> = {
  new: "default", review: "default", interview: "warning",
  offer: "success", hired: "success", rejected: "default",
}

function ProfileContent() {
  const params = useSearchParams()
  const c = candidates.find(c => c.id === params.get("id"))

  if (!c) return (
    <div className="text-center py-20 text-muted-foreground">
      Кандидат не найден
      <br />
      <Link href="/candidates" className="text-foreground underline mt-2 block">Назад к списку</Link>
    </div>
  )

  return (
    <div className="max-w-2xl space-y-8">
      <Link href="/candidates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Назад к кандидатам
      </Link>
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-medium shrink-0">
          {c.photo}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">{c.name}</h1>
          <p className="text-muted-foreground">{c.role}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
            <Badge variant="outline">{c.experience}</Badge>
            <Badge variant="outline">{c.location}</Badge>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-3xl font-bold">{c.match}%</div>
          <div className="text-xs text-muted-foreground">совпадение</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Зарплата", value: `$${c.salary.toLocaleString()}/мес` },
          { label: "Email", value: c.email },
          { label: "Локация", value: c.location },
          { label: "Опыт", value: c.experience },
        ].map(i => (
          <div key={i.label} className="p-4 rounded-xl border bg-card">
            <div className="text-xs text-muted-foreground">{i.label}</div>
            <div className="font-medium mt-1">{i.value}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-sm font-medium mb-3">Навыки</h2>
        <div className="flex gap-2 flex-wrap">
          {c.skills.map(s => <Badge key={s} variant="outline" className="py-1 px-3">{s}</Badge>)}
        </div>
      </div>
      <div className="flex gap-3">
        <Button>Пригласить на собеседование</Button>
        <Button variant="outline">Отправить оффер</Button>
      </div>
    </div>
  )
}

export default function Profile() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted-foreground">Загрузка...</div>}>
      <ProfileContent />
    </Suspense>
  )
}
