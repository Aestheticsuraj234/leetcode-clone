```md
# 🧠 CodeQuest – LeetCode Clone with Online Judge

CodeQuest is a full-stack coding platform inspired by LeetCode. It allows users to solve programming problems with real-time code execution using Judge0. The project is built with **Next.js 15**, **TypeScript**, **Prisma**, **MongoDB**, and a self-hosted **Judge0 Docker instance**.

---

## 🚀 Features

- 🧩 Problem management (title, description, constraints, examples, tags, difficulty)
- 🖥️ Built-in code editor with syntax highlighting and language selection
- ⚙️ Code execution via Judge0 (Docker hosted)
- 🧪 Public & hidden test cases
- 💡 Hints and Editorial support
- ✅ User problem submission & completion tracking
- 🔐 Authentication system (e.g. NextAuth or custom)
- 🌐 REST or GraphQL API powered by Next.js App Router
- 🗂️ Admin-friendly schema for easy question creation

---

## 📦 Tech Stack

| Tech        | Description                            |
|-------------|----------------------------------------|
| Next.js 15  | React-based full-stack framework       |
| TypeScript  | Strong typing for scalability          |
| Prisma      | Elegant ORM for database access        |
| MongoDB     | NoSQL database to store questions & users |
| Judge0      | Open-source code execution engine      |
| TailwindCSS | Styling with utility-first classes     |
| Docker      | For local Judge0 instance              |

---

## 🧱 Database Schema (via Prisma)

```ts
model Problem {
  id            String   @id @default(uuid())
  title         String
  description   String
  difficulty    String
  tags          String[]
  completed     Boolean  @default(false)
  userId        String
  example       String
  constraints   String
  codeSnippet   String
  testCases     String
  hints         String
  editorial     String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  problemSolved String[] @default([])
}
```

---

## 🧪 Example Problem

```json
{
  "title": "Longest Substring Without Repeating Characters",
  "description": "Given a string s, find the length of the longest substring without duplicate characters.",
  "difficulty": "MEDIUM",
  "tags": ["hash-table", "string", "sliding-window"],
  "example": {
    "input": "s = \"abcabcbb\"",
    "output": "3",
    "explanation": "The answer is \"abc\", with the length of 3."
  },
  "constraints": "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
  "testCases": {
    "public": [{ "input": "s = \"abcabcbb\"", "output": "3" }],
    "hidden": [{ "input": "s = \"bbbbb\"", "output": "1" }]
  }
}
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/codequest.git
cd codequest

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Add your MongoDB URI and other secrets

# 4. Migrate database (Prisma)
npx prisma migrate dev

# 5. Run the app
npm run dev
```

---

## 🧑‍💻 Local Judge0 Setup (Docker)

```bash
# Clone Judge0 API
git clone https://github.com/judge0/api.git
cd api

# Start with Docker Compose
docker compose up -d
```

Update the `JUDGE0_API_URL` in your `.env.local` to point to your Docker container (e.g., `http://localhost:2358`).

---

## 📌 To-Do / Upcoming Features

- ✅ MVP with question solving and test case evaluation
- 🔒 Add full user auth & dashboard
- 📈 Leaderboard & solution analytics
- 🧠 Code explanation generator (AI-based)
- 🛡️ Submission plagiarism check
- 🧰 Admin panel for problem management

