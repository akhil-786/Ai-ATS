'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { JobRecommendations } from '@/components/features/job-recommendations';
import type { RecommendJobsBasedOnResumeSkillsOutput } from '@/ai/flows/recommend-jobs-based-on-resume-skills';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for job recommendations
const mockJobs: RecommendJobsBasedOnResumeSkillsOutput = [
  {
    jobTitle: 'Senior React Developer',
    companyName: 'Tech Innovators',
    matchPercentage: 92,
    jobDescription: 'Lead the development of our next-generation user interfaces with React and TypeScript.',
    applyLink: 'https://example.com/job1',
  },
  {
    jobTitle: 'Node.js Backend Engineer',
    companyName: 'Server Solutions',
    matchPercentage: 88,
    jobDescription: 'Build scalable and robust backend services using Node.js, Express, and microservices architecture.',
    applyLink: 'https://example.com/job2',
  },
  {
    jobTitle: 'Full-Stack Software Engineer',
    companyName: 'Creative Apps',
    matchPercentage: 85,
    jobDescription: 'Work across the full stack, from our React frontend to our Python/Django backend.',
    applyLink: 'https://example.com/job3',
  },
  {
    jobTitle: 'DevOps Engineer',
    companyName: 'CloudCo',
    matchPercentage: 78,
    jobDescription: 'Manage and automate our AWS infrastructure using Terraform and Kubernetes.',
    applyLink: 'https://example.com/job4',
  },
];


function JobsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-56 w-full" />
      ))}
    </div>
  );
}


export default function JobsPage() {
  const [jobs] = useState(mockJobs);
  const [loading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <header className="pb-8">
            <h1 className="font-headline text-3xl font-bold">Job Matches</h1>
          </header>
          <Card className="shadow-neumorphic">
            <CardHeader>
              <CardTitle>Your Recommended Jobs</CardTitle>
              <CardDescription>
                Personalized job recommendations based on your resume.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <JobsSkeleton /> : <JobRecommendations jobs={jobs} />}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
