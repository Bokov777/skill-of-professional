import { candidates, statusLabels, type CandidateStatus } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Dashboard() {
  const total = candidates.length
  const newC = candidates.filter(c => c.status === "new").length
  const interview = candidates.filter(c => c.status === "interview").length
  const offer = candidates.filter(c => c.status === "offer").length

  const statusColors: Record<CandidateStatus, "success" | "warning" | "default"> = {
    new: "default", review: "default", interview: "warning",
    offer: "success", hired: "success", rejected: "default",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-sm text-muted-foreground mt-1">Общая статистика</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Всего кандидатов", value: total },
          { label: "Новые", value: newC },
          { label: "Собеседования", value: interview },
          { label: "Офферы", value: offer },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-xl border bg-card">
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="text-3xl font-bold mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent candidates */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Последние кандидаты</h2>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium">Имя</th>
                <th className="text-left p-4 font-medium">Роль</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Навыки</th>
                <th className="text-left p-4 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {candidates.slice(0, 5).map(c => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <Link href={`/candidates/profile?id=${c.id}`} className="hover:text-foreground/80">
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.match}% совпадение</div>
                    </Link>
                  </td>
                  <td className="p-4 text-muted-foreground">{c.role}</td>
                  <td className="p-4 hidden sm:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {c.skills.map(s => (
                        <Badge key={s} variant="outline">{s}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
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
