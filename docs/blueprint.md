# **App Name**: CareerAI

## Core Features:

- Resume Upload and Storage: Securely upload resumes to Firebase Storage.
- ATS Analysis via Gemini: Analyze resume content against ATS standards using Gemini AI to provide an ATS score, identify key skills, and pinpoint weaknesses.  The analysis should use a tool to extract resume details such as education and experience to influence its recommendations.
- ATS Report Card: Visually display the ATS score as a circular chart, list key skills and weaknesses, and provide actionable suggestions for improvement.
- Job Recommendations via Gemini: Recommend relevant jobs based on extracted skills from the resume, leveraging Gemini AI for matching and suggestions. The recommendations should use a tool to filter job boards such as Linkedin.
- Job Recommendations Display: Show job recommendations in a grid view, highlighting the match percentage, company name, and an 'Apply Now' call to action.
- User Authentication: Implement user authentication using Firebase Auth, supporting Google and Email login methods.
- Dashboard: Provide an authenticated user dashboard with saved resumes, past ATS scores, job matches, and AI insights.

## Style Guidelines:

- Primary color: Deep blue (#2563EB) to convey trust and professionalism. 
- Background color: Light blue (#D5DEEF) to create a soft and inviting neumorphic effect. 
- Accent color: Emerald green (#10B981) for call-to-action elements and highlights.
- Body font: 'Inter' sans-serif for a modern, readable style.
- Headline font: 'Poppins' sans-serif to provide geometric, high-impact headlines.
- Utilize a consistent set of icons from 21st.dev that complements the neumorphic design, with subtle glassmorphism effects.
- Employ a mobile-first, responsive layout using Tailwind CSS and ShadCN components to ensure seamless viewing on all devices.
- Implement Framer Motion for smooth fade and slide transitions to enhance user experience during navigation and content loading.