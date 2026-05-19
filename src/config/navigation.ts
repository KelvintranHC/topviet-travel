import type { Role } from '@/core/access/roles'

export type NavItem = {
  title: string
  href: string
  icon: string
  roles?: Role[]
}

export const dashboardNav: NavItem[] = [
  { title: 'Tổng quan', href: '/dashboard', icon: 'layout-dashboard' },
  {
    title: 'Người dùng',
    href: '/dashboard/users',
    icon: 'users',
    roles: ['super_admin', 'admin'],
  },
  { title: 'Tours', href: '/dashboard/tours', icon: 'map' },
  { title: 'Điểm đến', href: '/dashboard/destinations', icon: 'globe' },
  { title: 'Trang & nội dung', href: '/dashboard/content', icon: 'file-text' },
  { title: 'Media', href: '/dashboard/media', icon: 'image' },
  { title: 'Cài đặt site', href: '/dashboard/settings', icon: 'settings' },
]

export function filterNavByRole(items: NavItem[], role: Role | null | undefined): NavItem[] {
  return items.filter((item) => {
    if (!item.roles) return true
    if (!role) return false
    return item.roles.includes(role)
  })
}
