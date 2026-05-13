// Skill поиска тестов — ищет по внешним платформам и возвращает подходящие
import { testPlatforms, type TestPlatform } from "./assessments"

export interface SearchQuery {
  skill?: string           // конкретный навык (React, Python, SQL)
  category?: string        // категория (coding, cognitive, language)
  free?: boolean           // только бесплатные
  hasApi?: boolean         // только с API
  maxResults?: number
}

export interface SearchResult {
  platform: TestPlatform
  match: number            // % совпадения
  reasons: string[]        // почему подходит
}

export function searchTests(query: SearchQuery): SearchResult[] {
  let results = testPlatforms.map(p => {
    let match = 0
    const reasons: string[] = []

    // По категории
    if (query.category && p.categories.includes(query.category)) {
      match += 30
      reasons.push(`Есть категория "${query.category}"`)
    }

    // По навыку (ищем по описанию и названию)
    if (query.skill) {
      const s = query.skill.toLowerCase()
      if (p.name.toLowerCase().includes(s)) match += 20
      if (p.description.toLowerCase().includes(s)) match += 15
      if (p.categories.some(c => c.includes(s))) match += 10
    }

    // По фильтрам
    if (query.free && p.freeTier) {
      match += 20
      reasons.push("Бесплатный тариф")
    } else if (query.free && !p.freeTier) {
      match = 0 // отсекаем платные если нужны только бесплатные
    }

    if (query.hasApi && p.hasApi) {
      match += 15
      reasons.push(`Есть API: ${p.apiType}`)
    } else if (query.hasApi && !p.hasApi) {
      match = 0
    }

    return { platform: p, match, reasons }
  })

  // Сортируем по совпадению
  results.sort((a, b) => b.match - a.match)

  // Отсекаем нулевые
  results = results.filter(r => r.match > 0)

  return results.slice(0, query.maxResults || 10)
}
