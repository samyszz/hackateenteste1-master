// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Help from "./components/Help";
import ThemeProvider from "./providers/theme-provider";
import TranslationProvider from "./providers/TranslationProvider"; // Importe o provider
import BackToTopButton from "./components/BackUp";
import { AosInit } from "./components/aos-init";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "L.A.R",
  description: "Lugar de Acolhimento e Recomeço",
  icons: {
    icon: "/favicon-v2.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TranslationProvider> {/* Envolva com o TranslationProvider */}
              <Help />
              <Header />
              <BackToTopButton />
              {children}
              <AosInit />
              <Footer />
            </TranslationProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}