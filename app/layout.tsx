'use client'

import localFont from "next/font/local";
import "./globals.css";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.stores";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { getMe } = useAuthStore();
  
  useEffect(() => {
    (async () => {
      await getMe()
    })()
  }, [getMe])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
