"use client"

import { PGlite } from "@electric-sql/pglite"

let db: PGlite | null = null

export async function getDb(): Promise<PGlite> {
  if (db) return db

  db = new PGlite()

  // Схема
  await db.exec(`
    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT,
      photo TEXT,
      skills TEXT,         -- json array
      experience TEXT,
      salary INTEGER,
      location TEXT,
      status TEXT DEFAULT 'new',
      email TEXT,
      match_pct INTEGER
    );

    CREATE TABLE IF NOT EXISTS tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id TEXT REFERENCES candidates(id),
      platform TEXT,
      name TEXT,
      score INTEGER,
      max_score INTEGER DEFAULT 100,
      date TEXT,
      status TEXT DEFAULT 'pending'
    );

    CREATE TABLE IF NOT EXISTS platforms (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      url TEXT,
      free_tier INTEGER DEFAULT 0,
      has_api INTEGER DEFAULT 0,
      categories TEXT,
      skills_count INTEGER,
      api_type TEXT,
      notes TEXT
    );
  `)

  return db
}

export async function seedData() {
  const d = await getDb()

  // Проверяем есть ли уже данные
  const r: any = await d.query("SELECT count(*) as cnt FROM candidates")
  if (r.rows[0].cnt > 0) return

  // Candidates
  await d.exec(`
    INSERT INTO candidates VALUES
    ('1','Анна Кузнецова','Product Manager','AK','["Product Strategy","Agile","Analytics"]','6 лет',3500,'Москва','interview','anna@example.com',94),
    ('2','Максим Орлов','Senior Frontend Developer','МО','["React","TypeScript","Next.js"]','5 лет',4000,'СПб','new','max@example.com',91),
    ('3','Елена Соколова','UX/UI Designer','ЕС','["Figma","User Research","Prototyping"]','4 года',2800,'Казань','review','elena@example.com',88),
    ('4','Дмитрий Волков','Backend Developer','ДВ','["Go","PostgreSQL","Kubernetes"]','7 лет',5000,'Москва','offer','dmitry@example.com',96),
    ('5','Ольга Белова','HR Manager','ОБ','["Recruiting","Onboarding","HR Analytics"]','5 лет',2500,'Новосибирск','new','olga@example.com',85),
    ('6','Иван Петров','Data Scientist','ИП','["Python","ML","TensorFlow"]','3 года',3200,'Москва','rejected','ivan@example.com',72)
  `)

  // Tests
  await d.exec(`
    INSERT INTO tests (candidate_id, platform, name, score, max_score, date, status) VALUES
    ('1','TestGorilla','Product Management',88,100,'2026-05-01','passed'),
    ('1','TestGorilla','Cognitive Ability',92,100,'2026-05-01','passed'),
    ('1','iMocha','Agile & Scrum',75,100,'2026-05-05','passed'),
    ('2','HackerRank','React Fundamentals',95,100,'2026-05-08','passed'),
    ('3','TestGorilla','UX Design',70,100,'2026-05-10','passed'),
    ('3','iMocha','Design Thinking',85,100,'2026-05-10','passed'),
    ('4','Codility','Algorithms',98,100,'2026-04-28','passed'),
    ('4','CodeSignal','Back-end',90,100,'2026-04-28','passed'),
    ('4','iMocha','Golang Advanced',85,100,'2026-05-02','passed'),
    ('5','TestGorilla','HR Fundamentals',90,100,'2026-05-09','passed'),
    ('6','HackerRank','Python',45,100,'2026-05-06','failed')
  `)

  // Platforms
  await d.exec(`
    INSERT INTO platforms VALUES
    ('testgorilla','TestGorilla','400+ тестов: технические, когнитивные, личностные','https://testgorilla.com',1,1,'["tech","cognitive","personality","language"]',400,'REST (Business plan)','Бесплатно 10 тестов'),
    ('coderpad','CoderPad','Live coding интервью, 99+ языков','https://coderpad.io',1,1,'["coding","technical"]',99,'REST (платные)',''),
    ('hackerrank','HackerRank','Кодинг-челленджи, 40+ языков','https://hackerrank.com',0,0,'["coding","algorithms"]',50,'Нет API',''),
    ('codesignal','CodeSignal','Автоматизированное скоринг-тестирование','https://codesignal.com',0,1,'["coding","technical"]',40,'GraphQL+REST (Enterprise)',''),
    ('codility','Codility','Глубокое тестирование алгоритмов, античитинг','https://codility.com',0,1,'["coding","algorithms"]',30,'REST (Enterprise)',''),
    ('imocha','iMocha','2500+ навыков, AI-прокторинг','https://imocha.io',1,1,'["tech","cognitive","language","domain"]',2500,'REST (Enterprise)','API-first'),
    ('xobin','Xobin','3400+ тестов, AI-прокторинг, ATS','https://xobin.com',0,1,'["tech","coding","cognitive","domain"]',3400,'REST+Webhook',''),
    ('aloooba','Alooba','API-first, кастомные сценарии','https://alooba.com',0,1,'["data","engineering","api"]',200,'REST',''),
    ('x0pa','X0PA AI','AI-оценка, REST API, webhook, SSO','https://x0pa.com',0,1,'["tech","cognitive","domain"]',500,'REST+Webhook+SSO',''),
    ('mettl','Mercer Mettl','Прокторинг, сертификация, аналитика','https://mettl.com',0,1,'["coding","cognitive","domain","certification"]',1000,'REST (Enterprise)',''),
    ('coderbyte','Coderbyte','Кодинг-задачи + обучение','https://coderbyte.com',0,0,'["coding","learning"]',300,'Нет API','')
  `)
}

export async function query(sql: string, params?: any[]): Promise<any> {
  const d = await getDb()
  return d.query(sql, params)
}
