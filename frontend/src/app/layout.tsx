import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Narbar } from "@/components/common/Navbar";

import { Providers } from "./providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description:
    "The place where odd jobs find their perfect match. From quirky gigs to one-off tasks, we’ve got you covered—no job too odd, no request too weird!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        <Providers>
          <header>
            <Narbar />
          </header>
          <main className="flex flex-1 overflow-hidden">{children}</main>
        </Providers>
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  );
}
