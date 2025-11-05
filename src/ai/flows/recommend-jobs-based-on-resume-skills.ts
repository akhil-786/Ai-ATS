'use server';

/**
 * @fileOverview
 * Genkit + Gemini AI flow that recommends job openings
 * based on skills extracted from a user’s resume.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/* ---------------------- Input Schema ---------------------- */
const RecommendJobsBasedOnResumeSkillsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume from which skills will be extracted.'),
});

export type RecommendJobsBasedOnResumeSkillsInput = z.infer<
  typeof RecommendJobsBasedOnResumeSkillsInputSchema
>;

/* ---------------------- Job Recommendation Schema ---------------------- */
const JobRecommendationSchema = z.object({
  jobTitle: z.string().describe('The title of the job.'),
  companyName: z.string().describe('The name of the company offering the job.'),
  matchPercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('The percentage match of the resume to the job requirements.'),
  jobDescription: z.string().describe('A short description of the job.'),
  applyLink: z.string().url().describe('The link to apply for the job.'),
});

const RecommendJobsBasedOnResumeSkillsOutputSchema = z.array(JobRecommendationSchema);

export type RecommendJobsBasedOnResumeSkillsOutput = z.infer<
  typeof RecommendJobsBasedOnResumeSkillsOutputSchema
>;

/* ---------------------- Job Board Tool ---------------------- */
const JobBoardFilterInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills extracted from the resume.'),
});

const getJobsFromJobBoard = ai.defineTool(
  {
    name: 'getJobsFromJobBoard',
    description:
      'Filters a job board (e.g., LinkedIn) based on skills. Returns jobs that best match the provided skill set.',
    inputSchema: JobBoardFilterInputSchema,
    outputSchema: RecommendJobsBasedOnResumeSkillsOutputSchema,
  },
  async (input) => {
    // Simulated job listings — replace with real API call or dataset later.
    return [
      {
        jobTitle: 'Frontend Developer',
        companyName: 'WebCo',
        matchPercentage: 95,
        jobDescription: 'Build beautiful and responsive web interfaces.',
        applyLink: 'https://example.com/frontend',
      },
      {
        jobTitle: 'Backend Engineer',
        companyName: 'DataCorp',
        matchPercentage: 88,
        jobDescription: 'Design and maintain scalable server-side applications.',
        applyLink: 'https://example.com/backend',
      },
      {
        jobTitle: 'Full-Stack Developer',
        companyName: 'Innovate LLC',
        matchPercentage: 82,
        jobDescription: 'Work across the entire stack to deliver new features.',
        applyLink: 'https://example.com/fullstack',
      },
      {
        jobTitle: 'UX/UI Designer',
        companyName: 'Creative Inc.',
        matchPercentage: 75,
        jobDescription: 'Craft intuitive and delightful user experiences.',
        applyLink: 'https://example.com/designer',
      },
    ];
  }
);

/* ---------------------- AI Prompt ---------------------- */
const extractSkillsAndRecommendJobsPrompt = ai.definePrompt({
  name: 'extractSkillsAndRecommendJobsPrompt',
  input: { schema: RecommendJobsBasedOnResumeSkillsInputSchema },
  output: { schema: RecommendJobsBasedOnResumeSkillsOutputSchema },
  tools: [getJobsFromJobBoard],
  prompt: `
You are an AI career assistant.

Analyze the following resume text and extract the key skills, technologies, and experience areas.
Use the getJobsFromJobBoard tool to find job openings that match these skills.

⚠️ IMPORTANT:
Return ONLY a valid JSON array of job recommendations.
Each item MUST include: jobTitle, companyName, matchPercentage, jobDescription, and applyLink.
No explanations or extra text outside the array.

Resume Text:
{{{resumeText}}}
`,
});

/* ---------------------- AI Flow ---------------------- */
const recommendJobsBasedOnResumeSkillsFlow = ai.defineFlow(
  {
    name: 'recommendJobsBasedOnResumeSkillsFlow',
    inputSchema: RecommendJobsBasedOnResumeSkillsInputSchema,
    outputSchema: RecommendJobsBasedOnResumeSkillsOutputSchema,
  },
  async (input) => {
    try {
      const response = await extractSkillsAndRecommendJobsPrompt(input);
      const output = response.output();

      // ✅ Ensure the output is an array
      if (!Array.isArray(output)) {
        console.warn('AI returned invalid or null output. Using fallback jobs.');
        return [
          {
            jobTitle: 'Frontend Developer',
            companyName: 'WebCo',
            matchPercentage: 95,
            jobDescription: 'Build beautiful and responsive web interfaces.',
            applyLink: 'https://example.com/frontend',
          },
          {
            jobTitle: 'Backend Engineer',
            companyName: 'DataCorp',
            matchPercentage: 88,
            jobDescription: 'Design and maintain scalable server-side applications.',
            applyLink: 'https://example.com/backend',
          },
        ];
      }

      return output;
    } catch (err) {
      console.error('Error in recommendJobsBasedOnResumeSkillsFlow:', err);
      // Return fallback jobs if AI or parsing fails
      return [
        {
          jobTitle: 'AI Engineer',
          companyName: 'NextGen Labs',
          matchPercentage: 80,
          jobDescription: 'Build and deploy AI-powered applications.',
          applyLink: 'https://example.com/aiengineer',
        },
      ];
    }
  }
);

/* ---------------------- Export ---------------------- */
export async function recommendJobsBasedOnResumeSkills(
  input: RecommendJobsBasedOnResumeSkillsInput
): Promise<RecommendJobsBasedOnResumeSkillsOutput> {
  return recommendJobsBasedOnResumeSkillsFlow(input);
}
