import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Motion Docs - A Note Taking Application Design To Boost Productivity.",
  description: "This is a note taking application. The user can write and share their notes, documents and research papers.",
  icons:[
    {
      media: "(prefers-color-scheme: light )",
      url:"/black_logo.png",
      href:"/black_logo.png"
    },
    {
      media: "(prefers-color-scheme: dark )",
      url:"/white_logo.png",
      href:"/white_logo.png"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
