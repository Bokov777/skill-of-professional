export type CandidateStatus = "new" | "review" | "interview" | "offer" | "hired" | "rejected"

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
}

export const statusLabels: Record<CandidateStatus, string> = {
  new: "Новый",
  review: "На рассмотрении",
  interview: "Собеседование",
  offer: "Оффер",
  hired: "Нанят",
  rejected: "Отказ",
}

export const candidates: Candidate[] = [
  { id: "1", name: "Анна Кузнецова", role: "Product Manager", photo: "AK", skills: ["Product Strategy", "Agile", "Analytics"], experience: "6 лет", salary: 3500, location: "Москва", status: "interview", email: "anna@example.com", match: 94 },
  { id: "2", name: "Максим Орлов", role: "Senior Frontend Developer", photo: "МО", skills: ["React", "TypeScript", "Next.js"], experience: "5 лет", salary: 4000, location: "СПб", status: "new", email: "max@example.com", match: 91 },
  { id: "3", name: "Елена Соколова", role: "UX/UI Designer", photo: "ЕС", skills: ["Figma", "User Research", "Prototyping"], experience: "4 года", salary: 2800, location: "Казань", status: "review", email: "elena@example.com", match: 88 },
  { id: "4", name: "Дмитрий Волков", role: "Backend Developer", photo: "ДВ", skills: ["Go", "PostgreSQL", "Kubernetes"], experience: "7 лет", salary: 5000, location: "Москва", status: "offer", email: "dmitry@example.com", match: 96 },
  { id: "5", name: "Ольга Белова", role: "HR Manager", photo: "ОБ", skills: ["Recruiting", "Onboarding", "HR Analytics"], experience: "5 лет", salary: 2500, location: "Новосибирск", status: "new", email: "olga@example.com", match: 85 },
  { id: "6", name: "Иван Петров", role: "Data Scientist", photo: "ИП", skills: ["Python", "ML", "TensorFlow"], experience: "3 года", salary: 3200, location: "Москва", status: "rejected", email: "ivan@example.com", match: 72 },
]
