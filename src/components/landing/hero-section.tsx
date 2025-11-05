import { Button } from '@/components/ui/button';
import { MoveDown } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-gradient bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 dark:from-blue-800 dark:via-purple-900 dark:to-pink-900" />
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
          Boost Your Career with AI
        </h1>
        <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
          Upload your resume and let our Gemini-powered AI provide you with an
          in-depth ATS analysis and personalized job recommendations in seconds.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-neumorphic">
            <Link href="#uploader">
              Upload Resume
              <MoveDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
