type MediaRef =
  | number
  | { url?: string | null }
  | null
  | undefined

export function resolveImageUrl(media: MediaRef, fallbackUrl?: string | null): string {
  if (media && typeof media === 'object' && media.url) {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
    return media.url.startsWith('http') ? media.url : `${base}${media.url}`
  }
  return fallbackUrl || ''
}

export function formatVnd(price: number | null | undefined, priceLabel?: string | null): string {
  if (priceLabel) return priceLabel
  if (!price) return 'Liên hệ'
  return price.toLocaleString('vi-VN')
}
