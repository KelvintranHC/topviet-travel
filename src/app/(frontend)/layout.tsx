import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import React from 'react'

export const metadata: Metadata = {
  title: 'Touriza — Tour Nước Ngoài | Top Viet Travel',
  description: 'Top Viet Travel — tour trong và ngoài nước uy tín, giá tốt.',
}

const iconSprite = readFileSync(join(process.cwd(), 'public/icons-sprite.svg'), 'utf8')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/touriza.css" />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: iconSprite }} aria-hidden />
        {children}
      </body>
    </html>
  )
}
