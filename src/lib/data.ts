export type CandidateStatus = "new" | "review" | "interview" | "offer" | "hired" | "rejected"

export interface TestResult {
  platform: string
  name: string
  score: number
  maxScore: number
  date: string
  status: "passed" | "failed" | "pending"
}

export interface Candidate {
  id: string
  name: string
  role: string
  photo: string
  skills: string[]
  experience: string
  salary: number
  location: string
  status: CandidateStatus
  email: string
  match: number
  tests: TestResult[]
}

export const statusLabels: Record<CandidateStatus, string> = {
  new: "Новый",
  review: "На рассмотрении",
  interview: "Собеседование",
  offer: "Оффер",
  hired: "Нанят",
  rejected: "Отказ",
}

export const statusColors: Record<CandidateStatus, "success" | "warning" | "default"> = {
  new: "default",
  review: "default",
  interview: "warning",
  offer: "success",
  hired: "success",
  rejected: "default",
}

export const statusOrder: CandidateStatus[] = ["new", "review", "interview", "offer", "hired"]

export const candidates: Candidate[] = [
  {
    id: "1", name: "Анна Кузнецова", role: "Product Manager", photo: "AK",
    skills: ["Product Strategy", "Agile", "Analytics"], experience: "6 лет", salary: 3500,
    location: "Москва", status: "interview", email: "anna@example.com", match: 94,
    tests: [
      { platform: "TestGorilla", name: "Product Management", score: 88, maxScore: 100, date: "2026-05-01", status: "passed" },
      { platform: "TestGorilla", name: "Cognitive Ability", score: 92, maxScore: 100, date: "2026-05-01", status: "passed" },
      { platform: "iMocha", name: "Agile & Scrum", score: 75, maxScore: 100, date: "2026-05-05", status: "passed" },
    ]
  },
  {
    id: "2", name: "Максим Орлов", role: "Senior Frontend Developer", photo: "МО",
    skills: ["React", "TypeScript", "Next.js"], experience: "5 лет", salary: 4000,
    location: "СПб", status: "new", email: "max@example.com", match: 91,
    tests: [
      { platform: "HackerRank", name: "React Fundamentals", score: 95, maxScore: 100, date: "2026-05-08", status: "passed" },
    ]
  },
  {
    id: "3", name: "Елена Соколова", role: "UX/UI Designer", photo: "ЕС",
    skills: ["Figma", "User Research", "Prototyping"], experience: "4 года", salary: 2800,
    location: "Казань", status: "review", email: "elena@example.com", match: 88,
    tests: [
      { platform: "TestGorilla", name: "UX Design", score: 70, maxScore: 100, date: "2026-05-10", status: "passed" },
      { platform: "iMocha", name: "Design Thinking", score: 85, maxScore: 100, date: "2026-05-10", status: "passed" },
    ]
  },
  {
    id: "4", name: "Дмитрий Волков", role: "Backend Developer", photo: "ДВ",
    skills: ["Go", "PostgreSQL", "Kubernetes"], experience: "7 лет", salary: 5000,
    location: "Москва", status: "offer", email: "dmitry@example.com", match: 96,
    tests: [
      { platform: "Codility", name: "Algorithms", score: 98, maxScore: 100, date: "2026-04-28", status: "passed" },
      { platform: "CodeSignal", name: "Back-end", score: 90, maxScore: 100, date: "2026-04-28", status: "passed" },
      { platform: "iMocha", name: "Golang Advanced", score: 85, maxScore: 100, date: "2026-05-02", status: "passed" },
    ]
  },
  {
    id: "5", name: "Ольга Белова", role: "HR Manager", photo: "ОБ",
    skills: ["Recruiting", "Onboarding", "HR Analytics"], experience: "5 лет", salary: 2500,
    location: "Новосибирск", status: "new", email: "olga@example.com", match: 85,
    tests: [
      { platform: "TestGorilla", name: "HR Fundamentals", score: 90, maxScore: 100, date: "2026-05-09", status: "passed" },
    ]
  },
  {
    id: "6", name: "Иван Петров", role: "Data Scientist", photo: "ИП",
    skills: ["Python", "ML", "TensorFlow"], experience: "3 года", salary: 3200,
    location: "Москва", status: "rejected", email: "ivan@example.com", match: 72,
    tests: [
      { platform: "HackerRank", name: "Python", score: 45, maxScore: 100, date: "2026-05-06", status: "failed" },
    ]
  },
]
