import { candidates, statusLabels, statusColors, type CandidateStatus } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Dashboard() {
  const total = candidates.length
  const newC = candidates.filter(c => c.status === "new").length
  const interview = candidates.filter(c => c.status === "interview").length
  const offer = candidates.filter(c => c.status === "offer").length
  const hired = candidates.filter(c => c.status === "hired").length
  const avgScore = candidates.filter(c => c.tests.length > 0).reduce((sum, c) => {
    const avg = c.tests.reduce((s, t) => s + (t.score / t.maxScore) * 100, 0) / c.tests.length
    return sum + avg
  }, 0) / Math.max(1, candidates.filter(c => c.tests.length > 0).length)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-sm text-muted-foreground mt-1">Общая статистика найма</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Всего", value: total },
          { label: "Новые", value: newC },
          { label: "Собеседования", value: interview },
          { label: "Офферы", value: offer },
          { label: "Нанято", value: hired },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border bg-card">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Средний балл тестов */}
      <div className="p-5 rounded-xl border bg-card">
        <div className="text-xs text-muted-foreground mb-2">Средний результат тестов</div>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">{avgScore.toFixed(0)}%</div>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${avgScore}%` }} />
          </div>
        </div>
      </div>

      {/* Последние кандидаты */}
      <div>
        <h2 className="text-sm font-medium mb-3">Последние кандидаты</h2>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium">Кандидат</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Статус</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Тесты</th>
                <th className="text-left p-3 font-medium">Совпадение</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <Link href={`/candidates/profile?id=${c.id}`} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">{c.photo}</div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.role}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <span className="text-muted-foreground">
                      {c.tests.filter(t => t.status === "passed").length}/{c.tests.length} пройдено
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium">{c.match}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
