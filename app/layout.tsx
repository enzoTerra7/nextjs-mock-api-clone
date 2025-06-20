import type { Metadata } from "next";
import { Inter, Lora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";

const InterSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const LoraSerif = Lora({
  variable: "--font-lora-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mock API clone",
  description: "A clone from MockAPI using NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterSans.variable} ${LoraSerif.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
