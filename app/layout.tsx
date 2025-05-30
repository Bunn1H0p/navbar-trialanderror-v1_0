import './globals.css'
import NavBar from './components/nav-bar'
import { ReactNode } from 'react'
import { mPlusRounded } from './ui/fonts';

export const metadata = {
  title: 'My App',
  description: 'A modern web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mPlusRounded.className} antialiased`}>
        <NavBar />
          <main>{children}</main>
      </body>
    </html>
  );
}
