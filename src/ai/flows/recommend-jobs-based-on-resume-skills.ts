'use server';
/**
 * @fileOverview This file implements a Genkit flow that recommends job openings based on the skills extracted from a resume using Gemini AI.
 *
 * - recommendJobsBasedOnResumeSkills - A function that takes resume text as input, extracts skills, and recommends relevant jobs.
 * - RecommendJobsBasedOnResumeSkillsInput - The input type for the recommendJobsBasedOnResumeSkills function, which is the resume as text.
 * - RecommendJobsBasedOnResumeSkillsOutput - The return type for the recommendJobsBasedOnResumeSkills function, which is a list of job recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendJobsBasedOnResumeSkillsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume from which skills will be extracted.'),
});
export type RecommendJobsBasedOnResumeSkillsInput = z.infer<
  typeof RecommendJobsBasedOnResumeSkillsInputSchema
>;

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

const RecommendJobsBasedOnResumeSkillsOutputSchema = z.array(
  JobRecommendationSchema
);

export type RecommendJobsBasedOnResumeSkillsOutput = z.infer<
  typeof RecommendJobsBasedOnResumeSkillsOutputSchema
>;

export async function recommendJobsBasedOnResumeSkills(
  input: RecommendJobsBasedOnResumeSkillsInput
): Promise<RecommendJobsBasedOnResumeSkillsOutput> {
  return recommendJobsBasedOnResumeSkillsFlow(input);
}

const JobBoardFilterInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of skills extracted from the resume.'),
});

const getJobsFromJobBoard = ai.defineTool({
  name: 'getJobsFromJobBoard',
  description: 'This tool filters a job board such as Linkedin based on skills.  It returns a list of jobs that match the skills.',
  inputSchema: JobBoardFilterInputSchema,
  outputSchema: RecommendJobsBasedOnResumeSkillsOutputSchema,
}, async (input) => {
  // TODO: Implement the logic to fetch job recommendations from a job board API
  // based on the extracted skills.
  // This is a placeholder implementation.
  return [];
});

const extractSkillsAndRecommendJobsPrompt = ai.definePrompt({
  name: 'extractSkillsAndRecommendJobsPrompt',
  input: {schema: RecommendJobsBasedOnResumeSkillsInputSchema},
  output: {schema: RecommendJobsBasedOnResumeSkillsOutputSchema},
  tools: [getJobsFromJobBoard],
  prompt: `You are an AI career assistant. Your task is to analyze a resume and recommend relevant job openings.

  Analyze the resume text provided and extract the key skills and technologies mentioned.  Use the getJobsFromJobBoard tool to find the jobs.

  Resume Text: {{{resumeText}}}
  `,
});

const recommendJobsBasedOnResumeSkillsFlow = ai.defineFlow(
  {
    name: 'recommendJobsBasedOnResumeSkillsFlow',
    inputSchema: RecommendJobsBasedOnResumeSkillsInputSchema,
    outputSchema: RecommendJobsBasedOnResumeSkillsOutputSchema,
  },
  async input => {
    const {output} = await extractSkillsAndRecommendJobsPrompt(input);
    return output!;
  }
);
