import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ReportsPage() {
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
              <p>Reports content will go here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
