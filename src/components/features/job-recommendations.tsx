import type { RecommendJobsBasedOnResumeSkillsOutput } from '@/ai/flows/recommend-jobs-based-on-resume-skills';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface JobRecommendationsProps {
  jobs: RecommendJobsBasedOnResumeSkillsOutput;
}

export function JobRecommendations({ jobs }: JobRecommendationsProps) {
  return (
    <section>
      <h2 className="font-headline text-3xl font-bold mb-6">
        Recommended Jobs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => {
          const placeholder =
            PlaceHolderImages[index % PlaceHolderImages.length];
          return (
            <Card key={index} className="shadow-neumorphic flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                <Image
                  src={placeholder.imageUrl}
                  alt={job.companyName}
                  width={56}
                  height={56}
                  className="rounded-lg shadow-sm"
                  data-ai-hint={placeholder.imageHint}
                />
                <div className="flex-1">
                  <CardTitle>{job.jobTitle}</CardTitle>
                  <CardDescription>{job.companyName}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.jobDescription}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Badge variant="outline" className="py-1 px-3 shadow-neumorphic-inset">
                  <span className="text-accent font-bold mr-1.5">{job.matchPercentage}%</span> Match
                </Badge>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={job.applyLink} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
