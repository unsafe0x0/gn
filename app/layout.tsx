import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grind Nation Card",
  description: "Create your personalized Grind Nation Card",
  keywords: ["Grind Nation", "Developer Card", "Community"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bodyFont.className}>{children}</body>
    </html>
  );
}
