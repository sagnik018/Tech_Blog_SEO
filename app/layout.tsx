import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Blog - Latest Technology Insights',
  description: 'Stay updated with the latest technology trends, tutorials, and insights from industry experts.',
  keywords: ['tech blog', 'technology', 'programming', 'web development', 'AI', 'software engineering'],
  authors: [{ name: 'Tech Blog Team' }],
  openGraph: {
    title: 'Tech Blog - Latest Technology Insights',
    description: 'Stay updated with the latest technology trends, tutorials, and insights from industry experts.',
    type: 'website',
    url: 'https://tech-blog.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tech Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - Latest Technology Insights',
    description: 'Stay updated with the latest technology trends, tutorials, and insights from industry experts.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
