import type { Metadata } from 'next'
import { Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'राजकीय उच्च माध्यमिक विद्यालय गडली ठोठी - Government Higher Secondary School Gadli Thothi',
  description: 'गुणवत्तापूर्ण शिक्षा का केंद्र - हमारा विद्यालय बच्चों के समग्र विकास के लिए प्रतिबद्ध है',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={notoSansDevanagari.className}>
        {children}
      </body>
    </html>
  )
}
