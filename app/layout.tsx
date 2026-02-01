import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Setter IA - Dashboard Charles',
  description: "L'excellence de l'automatisation de luxe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-cream antialiased">
        {children}
      </body>
    </html>
  )
}
