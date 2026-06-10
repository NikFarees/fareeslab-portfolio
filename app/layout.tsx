import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { DM_Sans, Fraunces } from "next/font/google";
import { site } from "@/data/site";
import Fireflies from "@/components/Fireflies";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.heroCopy,
  keywords: [
    "Nik Farees",
    "Software Engineer",
    "Laravel",
    "Next.js",
    "Docker",
    "Backend Developer",
    "Full Stack",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.heroCopy,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.heroCopy,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans">
        <Fireflies />
        {children}
      </body>
    </html>
  );
}
