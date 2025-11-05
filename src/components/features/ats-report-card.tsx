import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScoreChart } from '@/components/charts/score-chart';
import { ThumbsDown, ThumbsUp, Lightbulb } from 'lucide-react';
import type { AnalyzeResumeAndGenerateAtsReportOutput } from '@/ai/flows/analyze-resume-and-generate-ats-report';

interface ATSReportCardProps {
  report: AnalyzeResumeAndGenerateAtsReportOutput;
}

export function ATSReportCard({ report }: ATSReportCardProps) {
  return (
    <Card className="shadow-neumorphic">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">ATS Report</CardTitle>
        <CardDescription>
          Here's how your resume scores against applicant tracking systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <ScoreChart score={report.atsScore} />
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="flex items-center font-semibold text-lg">
            <ThumbsUp className="h-5 w-5 mr-2 text-accent" /> Key Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {report.keySkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="shadow-neumorphic">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="flex items-center font-semibold text-lg">
            <ThumbsDown className="h-5 w-5 mr-2 text-destructive" /> Weaknesses
          </h4>
          <ul className="list-none space-y-2">
            {report.weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start text-sm text-muted-foreground">
                <span className="text-destructive mr-2 mt-1">&#8226;</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="flex items-center font-semibold text-lg">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" /> Suggestions
          </h4>
          <ul className="list-none space-y-2">
            {report.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start text-sm text-muted-foreground">
                <span className="text-primary mr-2 mt-1">&#8226;</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
