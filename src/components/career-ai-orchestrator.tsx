'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/landing/hero-section';
import { ResumeUploader } from '@/components/features/resume-uploader';
import { ATSReportCard } from '@/components/features/ats-report-card';
import { JobRecommendations } from '@/components/features/job-recommendations';
import { AuthModal } from '@/components/auth/auth-modal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

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

      const dataUri = await readFileAsDataURL(file);
      const report = await analyzeResumeAndGenerateAtsReport({ resumeDataUri: dataUri });
      setAtsReport(report);

      if (!user) {
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error('An error occurred during ATS analysis:', error);
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
  
  useEffect(() => {
    const fetchJobs = async () => {
      if (user && atsReport && !jobRecommendations && !isLoading) {
        setIsLoading(true);
        try {
          const resumeText = "Extract text from data URI is not trivial on the client, so we pass a placeholder. The backend already has the data URI.";
          const jobs = await recommendJobsBasedOnResumeSkills({ resumeText: "" }); // Pass empty text, as the backend will use the tool with data from the previous step.
          setJobRecommendations(jobs);
        } catch (error) {
          console.error('An error occurred fetching job recommendations:', error);
          toast({
            variant: 'destructive',
            title: 'Job Recommendation Failed',
            description: 'Could not fetch job recommendations. Please try again.',
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchJobs();
  }, [user, atsReport, jobRecommendations, isLoading, toast]);


  return (
    <>
      <HeroSection />
      <div id="uploader" className="container mx-auto px-4 mt-[-4rem] z-10 relative">
        <ResumeUploader onUpload={handleResumeUpload} isLoading={isLoading || authLoading} />
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

      {(isLoading || authLoading) && <ResultsSkeleton />}

      {!isLoading && !authLoading && atsReport && (
        <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-24">
            <ATSReportCard report={atsReport} />
          </div>
          <div className="lg:col-span-2">
            {user && jobRecommendations ? (
              <JobRecommendations jobs={jobRecommendations} />
            ) : !user ? (
              <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                <h3 className="font-headline text-xl font-semibold">Ready for your job matches?</h3>
                <p className="text-muted-foreground mt-2 mb-4">Please sign in or create an account to view personalized job recommendations.</p>
                <Button onClick={() => setShowAuthModal(true)}>Login to View Jobs</Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
