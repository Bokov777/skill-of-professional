export interface TestPlatform {
  id: string
  name: string
  description: string
  url: string
  freeTier: boolean
  hasApi: boolean
  categories: string[]
  skills: number
  apiType: string
  notes: string
}

export const testPlatforms: TestPlatform[] = [
  {
    id: "testgorilla",
    name: "TestGorilla",
    description: "400+ тестов: технические, когнитивные, личностные. Есть бесплатный план навсегда.",
    url: "https://testgorilla.com",
    freeTier: true,
    hasApi: true,
    categories: ["tech", "cognitive", "personality", "language"],
    skills: 400,
    apiType: "REST (Business plan)",
    notes: "Лучший старт: бесплатно 10 тестов, API на Business плане"
  },
  {
    id: "coderpad",
    name: "CoderPad",
    description: "Live coding интервью, 99+ языков, коллаборативная IDE.",
    url: "https://coderpad.io",
    freeTier: true,
    hasApi: true,
    categories: ["coding", "technical"],
    skills: 99,
    apiType: "REST (платные тарифы)",
    notes: "Для технических собеседований в реальном времени"
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    description: "Кодинг-челленджи, 40+ языков, большое сообщество разработчиков.",
    url: "https://hackerrank.com",
    freeTier: false,
    hasApi: false,
    categories: ["coding", "algorithms"],
    skills: 50,
    apiType: "Нет публичного API",
    notes: "Большой банк задач, антиплагиат, но без API"
  },
  {
    id: "codesignal",
    name: "CodeSignal",
    description: "Автоматизированное скоринг-тестирование с метрикой Coding Score.",
    url: "https://codesignal.com",
    freeTier: false,
    hasApi: true,
    categories: ["coding", "technical"],
    skills: 40,
    apiType: "GraphQL + REST (Enterprise)",
    notes: "Стандарт отрасли для технического скрининга"
  },
  {
    id: "codility",
    name: "Codility",
    description: "Глубокое тестирование алгоритмов, code playback, античитинг.",
    url: "https://codility.com",
    freeTier: false,
    hasApi: true,
    categories: ["coding", "algorithms"],
    skills: 30,
    apiType: "REST (Enterprise)",
    notes: "Фокус на алгоритмическое мышление, дорогой"
  },
  {
    id: "imocha",
    name: "iMocha",
    description: "2500+ навыков, AI-прокторинг, API Explorer для интеграции.",
    url: "https://imocha.io",
    freeTier: true,
    hasApi: true,
    categories: ["tech", "cognitive", "language", "domain"],
    skills: 2500,
    apiType: "REST (Enterprise, песочница)",
    notes: "Самый большой каталог, API-first подход"
  },
  {
    id: "xobin",
    name: "Xobin",
    description: "3400+ тестов, AI-прокторинг, интеграция с ATS.",
    url: "https://xobin.com",
    freeTier: false,
    hasApi: true,
    categories: ["tech", "coding", "cognitive", "domain"],
    skills: 3400,
    apiType: "REST + Webhook",
    notes: "Огромный каталог, AI-интервью"
  },
  {
    id: "aloooba",
    name: "Alooba",
    description: "API-first платформа с кастомными сценариями тестирования.",
    url: "https://alooba.com",
    freeTier: false,
    hasApi: true,
    categories: ["data", "engineering", "api"],
    skills: 200,
    apiType: "REST (встроенный)",
    notes: "API-first дизайн, сильная аналитика"
  },
  {
    id: "x0pa",
    name: "X0PA AI",
    description: "AI-оценка с REST API, webhook, SSO.",
    url: "https://x0pa.com",
    freeTier: false,
    hasApi: true,
    categories: ["tech", "cognitive", "domain"],
    skills: 500,
    apiType: "REST + Webhook + SSO",
    notes: "AI-powered scoring, enterprise-ready"
  },
  {
    id: "mercer_mettl",
    name: "Mercer Mettl",
    description: "Прокторинг высокого уровня, сертификация, аналитика.",
    url: "https://mettl.com",
    freeTier: false,
    hasApi: true,
    categories: ["coding", "cognitive", "domain", "certification"],
    skills: 1000,
    apiType: "REST (Enterprise)",
    notes: "Для высоконагруженных сертификаций"
  },
  {
    id: "coderbyte",
    name: "Coderbyte",
    description: "Кодинг-задачи + обучающая платформа.",
    url: "https://coderbyte.com",
    freeTier: false,
    hasApi: false,
    categories: ["coding", "learning"],
    skills: 300,
    apiType: "Нет API",
    notes: "Хорош для обучения, не для интеграции"
  },
]
