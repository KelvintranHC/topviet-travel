import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Think Forward Admin',
  description: 'Custom admin dashboard — Payload headless CMS',
}

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
