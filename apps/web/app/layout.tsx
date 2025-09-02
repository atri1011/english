import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AuthButton from '@/components/AuthButton'
import { config } from '@/lib/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Sentence Learning App',
  description: 'Learn English through AI-powered sentence analysis and practice',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient(
    config.supabase.url,
    config.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies().set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">AI Sentence App</h1>
              </div>
              <div className="flex items-center space-x-4">
                {session && (
                  <a
                    href="/settings"
                    className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                  >
                    设置
                  </a>
                )}
                <AuthButton session={session} />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  )
}