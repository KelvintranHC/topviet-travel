'use client'

import {
  FileText,
  Image,
  LayoutDashboard,
  Mic,
  Settings,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { filterNavByRole, type NavItem } from '@/config/navigation'
import type { Role } from '@/core/access/roles'
import { cn } from '@/lib/utils'

const iconMap = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  mic: Mic,
  'file-text': FileText,
  image: Image,
  settings: Settings,
} as const

type Props = {
  userRole: Role | null | undefined
  items: NavItem[]
}

export function DashboardSidebar({ userRole, items }: Props) {
  const pathname = usePathname()
  const nav = filterNavByRole(items, userRole)

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link href="/dashboard" className="text-sm font-semibold tracking-tight text-sidebar-foreground">
          Think Forward
        </Link>
        <span className="ml-2 rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
          Admin
        </span>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {nav.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? LayoutDashboard
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3 text-xs text-muted-foreground">
        Payload headless engine
      </div>
    </aside>
  )
}
