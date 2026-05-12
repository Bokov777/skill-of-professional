export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <span className="text-sm font-medium tracking-tight">Skill of Professional</span>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Начать
        </a>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95]">
            Подбор персонала.
            <br />
            <span className="text-muted-foreground">По-новому.</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
            AI-платформа для поиска, оценки и найма профессионалов.
          </p>

          <div className="pt-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Попробовать
            </a>
          </div>
        </div>

        {/* Features — минимум, без карточек */}
        <div className="mt-24 sm:mt-32 w-full max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl">🎯</div>
            <div className="text-sm font-medium">Точный поиск</div>
            <div className="text-xs text-muted-foreground">По навыкам и опыту</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">⚡</div>
            <div className="text-sm font-medium">AI-оценка</div>
            <div className="text-xs text-muted-foreground">Автоматический скрининг</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🤝</div>
            <div className="text-sm font-medium">Рекомендации</div>
            <div className="text-xs text-muted-foreground">На основе данных</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-muted-foreground">
        Skill of Professional
      </footer>
    </div>
  )
}
