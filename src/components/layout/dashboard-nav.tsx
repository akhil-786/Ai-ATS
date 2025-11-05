'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, Briefcase, Star, Settings } from 'lucide-react';

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
    <div className="p-2">
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              className="font-medium"
              tooltip={{ children: link.label, className: "shadow-neumorphic" }}
            >
              <Link href={link.href}>
                <link.icon />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
