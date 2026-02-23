import type { Metadata } from "next";
import Script from "next/script";
import { Unbounded, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { AnimatedFavicon } from "@/components/AnimatedFavicon";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Flex by net2phone — AI Agent Builder",
  description:
    "Create voice + chat AI agents with a real phone number in under 4 minutes. No credit card required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={`${unbounded.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AnimatedFavicon />
        {children}
        <Footer />
        <Script
          src="https://userstory.net2phone.com/static/tracker/tracker.js"
          data-project-key="pk_5AaUb1IM1jyeQ_ywgZWpGXqC4nfhwojexjcwtPvJU7k"
          data-api-url="https://userstory.net2phone.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
