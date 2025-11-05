'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { RecommendJobsBasedOnResumeSkillsOutput } from '@/ai/flows/recommend-jobs-based-on-resume-skills';

// Mock data for saved jobs
const mockSavedJobs: RecommendJobsBasedOnResumeSkillsOutput = [
    {
        jobTitle: 'Senior React Developer',
        companyName: 'Tech Innovators',
        matchPercentage: 92,
        jobDescription: 'Lead the development of our next-generation user interfaces with React and TypeScript.',
        applyLink: 'https://example.com/job1',
    },
    {
        jobTitle: 'Full-Stack Software Engineer',
        companyName: 'Creative Apps',
        matchPercentage: 85,
        jobDescription: 'Work across the full stack, from our React frontend to our Python/Django backend.',
        applyLink: 'https://example.com/job3',
    },
];


export default function SavedJobsPage() {
    const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  
    const handleUnsave = (jobTitle: string) => {
      setSavedJobs(savedJobs.filter(job => job.jobTitle !== jobTitle));
    };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <header className="pb-8">
            <h1 className="font-headline text-3xl font-bold">Saved Jobs</h1>
          </header>
          <Card className="shadow-neumorphic">
            <CardHeader>
              <CardTitle>Your Saved Job Postings</CardTitle>
              <CardDescription>
                Jobs you have saved for later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedJobs.map((job, index) => (
                    <Card key={index} className="shadow-neumorphic-inset flex flex-col">
                      <CardHeader>
                        <CardTitle>{job.jobTitle}</CardTitle>
                        <CardDescription>{job.companyName}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {job.jobDescription}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Link href={job.applyLink} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleUnsave(job.jobTitle)}>
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="sr-only">Unsave</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>You haven't saved any jobs yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
