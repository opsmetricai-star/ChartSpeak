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
    default: "ChartSpeak: Ambient Clinical Intelligence for Documentation",
    template: "%s | ChartSpeak",
  },
  description:
    "ChartSpeak listens to the patient conversation and drafts structured clinical notes, coding suggestions and patient instructions, so clinicians can stay present.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col"><Suspense>{children}</Suspense></body>
    </html>
  );
}
