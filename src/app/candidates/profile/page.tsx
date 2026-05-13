"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { candidates, statusLabels, statusColors } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
    <div className="max-w-3xl space-y-8">
      <Link href="/candidates" className="text-sm text-muted-foreground hover:text-foreground">
        ← Назад к кандидатам
      </Link>

      {/* Шапка */}
      <div className="flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-medium shrink-0">{c.photo}</div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">{c.name}</h1>
          <p className="text-muted-foreground">{c.role} · {c.match}% совпадение</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
            <Badge variant="outline">{c.experience}</Badge>
            <Badge variant="outline">{c.location}</Badge>
          </div>
        </div>
      </div>

      {/* Инфо */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

      {/* Навыки */}
      <div>
        <h2 className="text-sm font-medium mb-3">Навыки</h2>
        <div className="flex gap-2 flex-wrap">
          {c.skills.map(s => <Badge key={s} variant="outline" className="py-1.5 px-3">{s}</Badge>)}
        </div>
      </div>

      {/* Результаты тестов */}
      <div>
        <h2 className="text-sm font-medium mb-3">Результаты тестов</h2>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium">Платформа</th>
                <th className="text-left p-3 font-medium">Тест</th>
                <th className="text-left p-3 font-medium">Результат</th>
                <th className="text-left p-3 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {c.tests.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">Нет пройденных тестов</td></tr>
              ) : c.tests.map((t, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="p-3 text-muted-foreground">{t.platform}</td>
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(t.score / t.maxScore) * 100}%`,
                            background: t.status === "passed" ? "#22c55e" : t.status === "failed" ? "#ef4444" : "#eab308"
                          }}
                        />
                      </div>
                      <span className={t.status === "passed" ? "text-green-500" : t.status === "failed" ? "text-red-500" : ""}>
                        {t.score}/{t.maxScore}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Действия */}
      <div className="flex gap-3">
        <Button>Пригласить на собеседование</Button>
        <Button variant="outline">Назначить тест</Button>
      </div>
    </div>
  )
}

export default function Profile() {
  return <Suspense><ProfileContent /></Suspense>
}
