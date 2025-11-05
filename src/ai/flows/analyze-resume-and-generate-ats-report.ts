'use server';
/**
 * @fileOverview Analyzes a resume and generates an ATS report using Gemini AI.
 *
 * - analyzeResumeAndGenerateAtsReport - A function that handles the resume analysis and ATS report generation process.
 * - AnalyzeResumeAndGenerateAtsReportInput - The input type for the analyzeResumeAndGenerateAtsReport function.
 * - AnalyzeResumeAndGenerateAtsReportOutput - The return type for the analyzeResumeAndGenerateAtsReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeAndGenerateAtsReportInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume file as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type AnalyzeResumeAndGenerateAtsReportInput = z.infer<typeof AnalyzeResumeAndGenerateAtsReportInputSchema>;

const AnalyzeResumeAndGenerateAtsReportOutputSchema = z.object({
  atsScore: z.number().describe('The ATS score of the resume.'),
  keySkills: z.array(z.string()).describe('Key skills identified in the resume.'),
  weaknesses: z.array(z.string()).describe('Weaknesses identified in the resume.'),
  suggestions: z.array(z.string()).describe('Suggestions for improving the resume.'),
});
export type AnalyzeResumeAndGenerateAtsReportOutput = z.infer<typeof AnalyzeResumeAndGenerateAtsReportOutputSchema>;

async function analyzeResumeAndGenerateAtsReport(
  input: AnalyzeResumeAndGenerateAtsReportInput
): Promise<AnalyzeResumeAndGenerateAtsReportOutput> {
  return analyzeResumeAndGenerateAtsReportFlow(input);
}

const extractResumeDetails = ai.defineTool(
  {
    name: 'extractResumeDetails',
    description: 'Extracts education and experience details from a resume.',
    inputSchema: z.object({
      resumeText: z.string().describe('The text content of the resume.'),
    }),
    outputSchema: z.object({
      education: z.array(z.string()).describe('List of education details.'),
      experience: z.array(z.string()).describe('List of experience details.'),
    }),
  },
  async (input) => {
    // Placeholder implementation: Replace with actual resume parsing logic
    return {
      education: ['Sample Education 1', 'Sample Education 2'],
      experience: ['Sample Experience 1', 'Sample Experience 2'],
    };
  }
);

const analyzeResumeAndGenerateAtsReportPrompt = ai.definePrompt({
  name: 'analyzeResumeAndGenerateAtsReportPrompt',
  input: {schema: AnalyzeResumeAndGenerateAtsReportInputSchema},
  output: {schema: AnalyzeResumeAndGenerateAtsReportOutputSchema},
  tools: [extractResumeDetails],
  prompt: `You are an expert ATS (Applicant Tracking System) resume analyst. Analyze the resume provided and generate an ATS report.

  Provide an ATS score, identify key skills and weaknesses, and suggest improvements.

  Resume: {{media url=resumeDataUri}}

  After analyzing the resume, use the extractResumeDetails tool to extract education and experience details to get context for the job recommendations.

  Format the output as a JSON object:
  {
    "atsScore": number,
    "keySkills": string[],
    "weaknesses": string[],
    "suggestions": string[]
  }`,
});

const analyzeResumeAndGenerateAtsReportFlow = ai.defineFlow(
  {
    name: 'analyzeResumeAndGenerateAtsReportFlow',
    inputSchema: AnalyzeResumeAndGenerateAtsReportInputSchema,
    outputSchema: AnalyzeResumeAndGenerateAtsReportOutputSchema,
  },
  async input => {
    const {output} = await analyzeResumeAndGenerateAtsReportPrompt(input);
    return output!;
  }
);

export {
  analyzeResumeAndGenerateAtsReport,
  AnalyzeResumeAndGenerateAtsReportInput,
  AnalyzeResumeAndGenerateAtsReportOutput,
};
