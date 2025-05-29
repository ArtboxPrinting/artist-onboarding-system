import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artist Onboarding Platform',
  description: 'Professional artist onboarding system with database integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}