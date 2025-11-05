'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { Logo } from '@/components/logo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="mt-4 mx-4 md:mx-auto max-w-5xl rounded-lg bg-background/60 p-2.5 shadow-neumorphic backdrop-blur-lg backdrop-saturate-150">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Return to homepage">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link
              href="/"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          </div>
          <AuthModal>
            <Button>Login</Button>
          </AuthModal>
        </div>
      </nav>
    </header>
  );
}
