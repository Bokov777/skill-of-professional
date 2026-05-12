import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Skill of <span className="text-blue-500">Professional</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Платформа для подбора и оценки профессиональных навыков
          </p>
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Button size="lg">Начать подбор</Button>
          <Button size="lg" variant="outline">Узнать больше</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          <Card>
            <CardHeader><CardTitle>📋 Поиск</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Интеллектуальный поиск кандидатов по навыкам и опыту
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>📊 Оценка</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Автоматизированная проверка профессиональных компетенций
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>🤝 Подбор</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Персональные рекомендации на основе анализа навыков
            </CardContent>
          </Card>
        </div>

        <footer className="pt-16 text-xs text-muted-foreground">
          Next.js + Tailwind CSS + shadcn/ui
        </footer>
      </div>
    </div>
  )
}
