"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { query } from "@/lib/db"

const statusLabels: Record<string, string> = {
  new: "Новый", review: "На рассмотрении", interview: "Собеседование",
  offer: "Оффер", hired: "Нанят", rejected: "Отказ",
}
const statusColors: Record<string, "success" | "warning" | "default"> = {
  new: "default", review: "default", interview: "warning", offer: "success", hired: "success", rejected: "default",
}

export default function Dashboard() {
  const [stats, setStats] = useState<any[]>([])
  const [recent, setRecent] = useState<any[]>([])
  const [avgScore, setAvgScore] = useState(0)

  useEffect(() => {
    query(`SELECT status, count(*) as cnt FROM candidates GROUP BY status`).then(r => setStats(r.rows))
    query(`SELECT c.*, (SELECT avg(score*1.0/max_score)*100 FROM tests WHERE candidate_id=c.id) as avg_score FROM candidates c ORDER BY rowid`).then(r => setRecent(r.rows))
    query(`SELECT avg(score*1.0/max_score)*100 as avg FROM tests`).then(r => { const row: any = r.rows[0]; setAvgScore(Math.round(row?.avg || 0)); })
  }, [])

  const total = recent.length
  const getCount = (s: string) => stats.find(r => r.status === s)?.cnt || 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-sm text-muted-foreground mt-1">Статистика найма · SQL</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Всего", value: total },
          { label: "Новые", value: getCount("new") },
          { label: "Собеседования", value: getCount("interview") },
          { label: "Офферы", value: getCount("offer") },
          { label: "Нанято", value: getCount("hired") },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border bg-card">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-xl border bg-card">
        <div className="text-xs text-muted-foreground mb-2">Средний результат тестов</div>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">{avgScore}%</div>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${avgScore}%` }} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium mb-3">Кандидаты</h2>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium">Имя</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Статус</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Совпадение</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c: any) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-3">
                    <Link href={`/candidates/profile?id=${c.id}`} className="font-medium hover:text-foreground/80">{c.name}</Link>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                  </td>
                  <td className="p-3 hidden md:table-cell">{c.match_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
