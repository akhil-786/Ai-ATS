import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-foreground/60">
          <p>&copy; 2025 CareerAI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
