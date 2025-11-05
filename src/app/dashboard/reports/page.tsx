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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Report {
  id: string;
  fileName: string;
  score: number;
  date: string;
}

// Mock data for reports
const mockReports: Report[] = [
  { id: '1', fileName: 'Senior_Frontend_Resume.pdf', score: 92, date: '2024-07-20' },
  { id: '2', fileName: 'UX_Designer_Resume_v2.docx', score: 85, date: '2024-07-18' },
  { id: '3', fileName: 'Product_Manager_Resume.pdf', score: 78, date: '2024-07-15' },
  { id: '4', fileName: 'Fullstack_Engineer_Final.pdf', score: 89, date: '2024-07-12' },
];

export default function ReportsPage() {
  const [reports] = useState(mockReports);

  const getScoreVariant = (score: number) => {
    if (score > 85) return 'default';
    if (score > 70) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <header className="pb-8">
            <h1 className="font-headline text-3xl font-bold">My Reports</h1>
          </header>
          <Card className="shadow-neumorphic">
            <CardHeader>
              <CardTitle>Resume Analysis Reports</CardTitle>
              <CardDescription>
                Here are all the ATS reports you have generated.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead className="w-[150px] text-center">Score</TableHead>
                    <TableHead className="w-[200px]">Analysis Progress</TableHead>
                    <TableHead className="w-[150px] text-right">Date</TableHead>
                    <TableHead className="w-[200px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.fileName}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getScoreVariant(report.score)} className="text-lg">
                          {report.score}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Progress value={report.score} />
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(report.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" aria-label="View report">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Download report">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
