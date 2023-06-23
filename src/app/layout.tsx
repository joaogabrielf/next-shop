import { ReactNode, Suspense } from 'react'
import './globals.css'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import Loading from './loading'
import { Metadata } from 'next'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Next Shop',
  description: 'Next Shop',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Suspense fallback={<Loading />}>
          <div className="flex min-h-full flex-col items-center">
            <header className="mx-auto my-0 w-full max-w-full px-8 py-4">
              <Link href="/">
                <Image
                  src="/logo-project.svg"
                  alt="me"
                  width={136}
                  height={52}
                />
              </Link>
            </header>

            {children}
          </div>
        </Suspense>
      </body>
    </html>
  )
}
