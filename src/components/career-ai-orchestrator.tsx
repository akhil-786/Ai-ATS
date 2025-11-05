'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/landing/hero-section';
import { ResumeUploader } from '@/components/features/resume-uploader';
import { ATSReportCard } from '@/components/features/ats-report-card';
import { JobRecommendations } from '@/components/features/job-recommendations';
import { useToast } from '@/hooks/use-toast';
import {
  analyzeResumeAndGenerateAtsReport,
  type AnalyzeResumeAndGenerateAtsReportOutput,
} from '@/ai/flows/analyze-resume-and-generate-ats-report';
import {
  recommendJobsBasedOnResumeSkills,
  type RecommendJobsBasedOnResumeSkillsOutput,
} from '@/ai/flows/recommend-jobs-based-on-resume-skills';
import { Skeleton } from './ui/skeleton';

function ResultsSkeleton() {
  return (
    <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <Skeleton className="h-[400px] w-full" />
      </div>
      <div className="lg:col-span-2">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CareerAIOrchestrator() {
  const [atsReport, setAtsReport] =
    useState<AnalyzeResumeAndGenerateAtsReportOutput | null>(null);
  const [jobRecommendations, setJobRecommendations] =
    useState<RecommendJobsBasedOnResumeSkillsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResumeUpload = async (file: File) => {
    setIsLoading(true);
    setAtsReport(null);
    setJobRecommendations(null);

    try {
      const readFileAsDataURL = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

      const readFileAsText = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });

      const [dataUri, resumeText] = await Promise.all([
        readFileAsDataURL(file),
        readFileAsText(file),
      ]);

      const [report, jobs] = await Promise.all([
        analyzeResumeAndGenerateAtsReport({ resumeDataUri: dataUri }),
        recommendJobsBasedOnResumeSkills({ resumeText }),
      ]);
      
      setJobRecommendations(jobs);
      setAtsReport(report);

    } catch (error) {
      console.error('An error occurred:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem analyzing your resume. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeroSection />
      <div id="uploader" className="container mx-auto px-4 mt-[-4rem] z-10 relative">
        <ResumeUploader onUpload={handleResumeUpload} isLoading={isLoading} />
      </div>

      {isLoading && <ResultsSkeleton />}

      {!isLoading && atsReport && jobRecommendations && (
        <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-24">
            <ATSReportCard report={atsReport} />
          </div>
          <div className="lg:col-span-2">
            <JobRecommendations jobs={jobRecommendations} />
          </div>
        </div>
      )}
    </>
  );
}
