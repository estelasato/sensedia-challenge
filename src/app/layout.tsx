import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "@/src/app/providers";
import { cn } from "@/src/components/lib/utils";
import { Toaster } from "@/src/components/ui/sonner";
import { Menu } from "../components/layout/Menu";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Sensedia Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-50 pt-14 md:pt-0">
            <Menu />

            <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
