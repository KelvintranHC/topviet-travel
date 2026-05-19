export function Icon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className ? `ic ${className}` : 'ic'} aria-hidden>
      <use href={`#${id}`} />
    </svg>
  )
}

export function initialsFromName(name?: string | null): string {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
