import { candidates, statusLabels, statusColors, platforms } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Dashboard() {
  const total = candidates.length
  const getCnt = (s: string) => candidates.filter(c => c.status === s).length
  const avgScore = Math.round(candidates.filter(c => c.tests.length > 0).reduce((s, c) => {
    return s + c.tests.reduce((a, t) => a + (t.score / t.maxScore) * 100, 0) / c.tests.length
  }, 0) / Math.max(1, candidates.filter(c => c.tests.length > 0).length))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-sm text-muted-foreground mt-1">{platforms.length} платформ тестов</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Всего", value: total },
          { label: "Новые", value: getCnt("new") },
          { label: "Собеседования", value: getCnt("interview") },
          { label: "Офферы", value: getCnt("offer") },
          { label: "Нанято", value: getCnt("hired") },
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
                <th className="text-left p-3 font-medium">Совпадение</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-3">
                    <Link href={`/candidates/profile?id=${c.id}`} className="font-medium">{c.name}</Link>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </td>
                  <td className="p-3 hidden sm:table-cell"><Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge></td>
                  <td className="p-3">{c.match}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
