import type { Metadata } from "next";
import { Geist, Geist_Mono, UnifrakturMaguntia, Spectral } from "next/font/google";
import "./globals.css";
import CapsuleHeader from "./components/CapsuleHeader";
import ScrollIndicator from "./components/ScrollIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unifrakturMaguntia = UnifrakturMaguntia({
  variable: "--font-gothic",
  subsets: ["latin"],
  weight: "400",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: "300", // Light weight
});

export const metadata: Metadata = {
  title: "NE-S / California Mountain Snake [SS26]",
  description: "NE-S fashion capsule collection - California Mountain Snake [SS26]. A fusion of medical aesthetics and high-end fashion.",
  keywords: ["NE-S", "fashion", "capsule", "California Mountain Snake", "SS26", "luxury fashion"],
  authors: [{ name: "NE-S" }],
  openGraph: {
    title: "NE-S / California Mountain Snake [SS26]",
    description: "NE-S fashion capsule collection - California Mountain Snake [SS26]. A fusion of medical aesthetics and high-end fashion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unifrakturMaguntia.variable} ${spectral.variable} antialiased`}
      >
        <CapsuleHeader />
        <ScrollIndicator />
        {children}
      </body>
    </html>
  );
}
