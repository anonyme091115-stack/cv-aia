import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'

const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CV.AI - Créateur de CV intelligent propulsé par IA',
    template: '%s | CV.AI'
  },
  description: 'Créez votre CV professionnel gratuitement avec l\'aide de l\'IA. Génération automatique, optimisation ATS, templates modernes.',
  keywords: ['CV', 'curriculum vitae', 'IA', 'intelligence artificielle', 'emploi', 'carrière', 'France'],
  authors: [{ name: 'CV.AI' }],
  openGraph: {
    title: 'CV.AI - Créateur de CV intelligent',
    description: 'Créez votre CV professionnel gratuitement avec l\'aide de l\'IA',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${bricolage.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
