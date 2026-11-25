import { Suspense } from "react";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Hanken_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "ChartSpeak: The AI Engine for Clinical Documentation and Revenue Intelligence",
    template: "%s | ChartSpeak",
  },
  description:
    "ChartSpeak analyzes clinical encounters and produces structured notes, evidence-linked codes and patient instructions in one governed AI pass.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col"><Suspense>{children}</Suspense></body>
    </html>
  );
}
