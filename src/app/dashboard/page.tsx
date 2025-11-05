import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import { Logo } from '@/components/logo';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Briefcase, Star } from 'lucide-react';

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <h1 className="font-headline text-2xl font-bold">Dashboard</h1>
          <Button>Upload New Resume</Button>
        </header>
        <main className="p-4 md:p-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-neumorphic">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Highest ATS Score
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  on "Senior Frontend Resume"
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-neumorphic">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Jobs Applied
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 this month
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-neumorphic">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Saved Jobs
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Ready to apply
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-neumorphic">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Your latest resume analysis reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Senior Frontend Resume.pdf</p>
                  <p className="font-bold text-primary">92%</p>
                </div>
                <Progress value={92} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">UX Designer Resume_v2.docx</p>
                  <p className="font-bold text-primary">85%</p>
                </div>
                <Progress value={85} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Product Manager Resume.pdf</p>
                  <p className="font-bold text-primary">78%</p>
                </div>
                <Progress value={78} />
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
