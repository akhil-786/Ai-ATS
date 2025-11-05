import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <header className="pb-8">
            <h1 className="font-headline text-3xl font-bold">Settings</h1>
          </header>
          <Card className="shadow-neumorphic">
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>
                Manage your account and application settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Settings form will go here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
