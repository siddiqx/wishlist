import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F7F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Blueprint — Siddiq's Curated Registry & Acquisition Roadmap",
  description:
    "An executive personal equipment registry, specifications catalogue, and dynamic acquisition roadmap.",
  openGraph: {
    title: "The Blueprint — Siddiq's Curated Registry & Acquisition Roadmap",
    description: "Curated equipment registry, specifications, budget modeling, and acquisition roadmap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F7F5] text-[#111110]">
        {children}
      </body>
    </html>
  );
}
