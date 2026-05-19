import type { AuthUser } from '@/core/access/roles'
import { Badge } from '@/components/ui/badge'
import { LogoutButton } from './logout-button'

type Props = {
  user: AuthUser
  title: string
  description?: string
}

export function DashboardHeader({ user, title, description }: Props) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{user.role?.replace('_', ' ')}</Badge>
        <span className="text-sm text-muted-foreground">{user.email}</span>
        <LogoutButton />
      </div>
    </header>
  )
}
