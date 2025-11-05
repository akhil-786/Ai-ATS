import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CareerAIOrchestrator } from '@/components/career-ai-orchestrator';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <CareerAIOrchestrator />
      </main>
      <Footer />
    </div>
  );
}
