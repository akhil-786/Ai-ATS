'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Star,
  Settings,
} from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/reports', label: 'My Reports', icon: FileText },
  { href: '/dashboard/jobs', label: 'Job Matches', icon: Briefcase },
  { href: '/dashboard/saved', label: 'Saved Jobs', icon: Star },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-foreground/80 hover:text-foreground transition-colors ${
            pathname === link.href ? 'text-foreground font-semibold' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
