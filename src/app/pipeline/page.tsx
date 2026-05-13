"use client"

import { useState } from "react"
import Link from "next/link"
import { candidates, statusLabels, statusColors, statusOrder, type CandidateStatus } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export default function Pipeline() {
  const [dragging, setDragging] = useState<string | null>(null)

  const columns = statusOrder.map(status => ({
    status,
    label: statusLabels[status],
    items: candidates.filter(c => c.status === status),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Процесс найма</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {candidates.filter(c => c.status !== "rejected").length} активных · {candidates.filter(c => c.status === "hired").length} нанято
        </p>
      </div>

      {/* Канбан-доска */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 min-h-[60vh]">
        {columns.map(col => (
          <div
            key={col.status}
            className={`rounded-xl border bg-card/50 p-3 space-y-3 ${
              dragging ? "ring-2 ring-foreground/10" : ""
            }`}
          >
            {/* Заголовок колонки */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Badge variant={statusColors[col.status]}>{col.label}</Badge>
                <span className="text-xs text-muted-foreground">{col.items.length}</span>
              </div>
            </div>

            {/* Карточки */}
            <div className="space-y-2">
              {col.items.map(c => (
                <Link
                  key={c.id}
                  href={`/candidates/profile?id=${c.id}`}
                  className="block p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                      {c.photo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.role}</div>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">{c.match}%</div>
                  </div>

                  {/* Прогресс тестов */}
                  {c.tests.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${(c.tests.filter(t => t.status === "passed").length / c.tests.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {c.tests.filter(t => t.status === "passed").length}/{c.tests.length}
                      </span>
                    </div>
                  )}
                </Link>
              ))}

              {col.items.length === 0 && (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  Нет кандидатов
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
