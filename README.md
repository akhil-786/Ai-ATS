# 🤖 Ai-ATS — AI-Powered Resume Analyzer & Job Recommendation System

**Ai-ATS** is an intelligent, end-to-end resume analysis and job recommendation system powered by **Gemini AI**, **Genkit**, and **Next.js 15**.  
It analyzes resumes using AI to extract skills, compute ATS scores, and provide tailored job recommendations — all within a modern, fast web UI.

---

## 🌟 Features

### 🎯 Resume Intelligence
- Upload a PDF resume and let Gemini AI extract skills and key data points.
- Instantly receive an **ATS compatibility report** with an AI-generated analysis.

### 💼 AI-Powered Job Recommendations
- Automatically matches your skills with relevant job openings.
- Each job includes title, company name, match percentage, and apply link.

### 📊 Interactive Dashboard
- View AI-generated insights and job suggestions.
- Track ATS scores visually with charts.
- Access different pages: **Reports**, **Jobs**, **Saved**, and **Settings**.

### 🧠 Powered by Google Genkit + Gemini
- Uses **Google Genkit** flows for schema-safe AI orchestration.
- Gemini AI handles text analysis and semantic skill extraction.

### ⚡ Built with Next.js 15 + Turbopack
- Modern SSR/ISR rendering and blazing-fast local development.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | Next.js 15.3.3 (Turbopack) |
| **Language** | TypeScript |
| **AI Layer** | Google Genkit + Gemini API |
| **Styling** | Tailwind CSS |
| **Data** | Firebase Firestore + Firebase Auth |
| **Validation** | Zod |
| **Charts** | Recharts |
| **Deployment** | Vercel / Firebase Hosting |

---

## 📁 Project Structure

```
Ai-ATS-main/
├── src/
│   ├── ai/
│   │   ├── genkit.ts
│   │   └── flows/
│   │       ├── analyze-resume-and-generate-ats-report.ts
│   │       └── recommend-jobs-based-on-resume-skills.ts
│   ├── app/
│   │   ├── page.tsx                 # Landing page with resume upload
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # Dashboard home
│   │   │   ├── jobs/page.tsx        # Job recommendations
│   │   │   ├── reports/page.tsx     # ATS analysis reports
│   │   │   ├── saved/page.tsx       # Saved jobs
│   │   │   └── settings/page.tsx    # User settings
│   ├── components/
│   │   ├── features/                # Resume uploader, job cards, ATS report
│   │   ├── charts/                  # Score visualizations
│   │   ├── auth/                    # Auth modal, Firebase listener
│   │   └── landing/                 # Hero section & branding
│   └── app/globals.css              # Tailwind base styles
│
├── docs/                            # Design and backend blueprints
├── firestore.rules                   # Firebase security rules
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/akhil-786/Ai-ATS.git
cd Ai-ATS-main
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Add Environment Variables
Create a `.env.local` file in the root with the following values:

```bash
GOOGLE_GENKIT_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## ▶️ Running the Project

### Development
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 🧠 AI Flow Summary

### 1. `analyze-resume-and-generate-ats-report.ts`
- Accepts resume text.
- Uses Gemini AI to extract job-related keywords, achievements, and structure.
- Generates an ATS score and improvement suggestions.

### 2. `recommend-jobs-based-on-resume-skills.ts`
- Takes extracted skills.
- Calls `getJobsFromJobBoard` to match relevant roles.
- Returns a schema-validated array of jobs with match scores.

Example AI Output:
```json
[
  {
    "jobTitle": "Frontend Developer",
    "companyName": "WebCo",
    "matchPercentage": 95,
    "jobDescription": "Build responsive web apps using React and TypeScript.",
    "applyLink": "https://example.com/frontend"
  }
]
```

---

## 🧭 Roadmap

- ✅ Resume Upload & Parsing  
- ✅ ATS Report Generation  
- ✅ Job Recommendation Flow  
- 🚧 Integration with Live Job APIs (LinkedIn / Indeed)  
- 🚧 Enhanced Resume Scoring Model  
- 🚧 Export ATS Report as PDF  

---

## 📜 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

---

## 👨‍💻 Author

**Akhil Nakka**  
[🔗 GitHub Profile](https://github.com/akhil-786)


**Demo**  
[🔗 Website](https://ai-ats-eight.vercel.app)

---

> © 2025 Ai-ATS - Akhil
