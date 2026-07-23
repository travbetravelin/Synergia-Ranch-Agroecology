import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StagingBanner } from "@/components/StagingBanner";
import { OrgNav } from "@/components/OrgNav";
import { Footer } from "@/components/Footer";
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
  title: "Synergia Ranch Agroecology",
  description:
    "Regenerative land stewardship, ecological research, and community practice at Synergia Ranch, Santa Fe, NM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StagingBanner />
        <OrgNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
