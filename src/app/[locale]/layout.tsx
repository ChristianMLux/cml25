import { Inter, Outfit } from "next/font/google";
import { Suspense } from "react";
import { ReactNode } from "react";

import I18nProvider from "@/components/i18n/I18nProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AnimatedBackground from "@/components/ui/AnimatedBackground/animated-background";
import CommandPalette from "@/components/ui/CommandPalette";
import { DialogProvider } from "@/components/ui/Dialog";
import FooterSkeleton from "@/components/ui/Loading/Skeleton/FooterSkeleton";
import HeaderSkeleton from "@/components/ui/Loading/Skeleton/HeaderSkeleton";
import ScrollProgress from "@/components/ui/ScrollProgress/scroll-progress";
import { ThemeProvider } from "@/components/ui/Theme/ThemeProvider";
import { getServerTranslation } from "@/lib/getServerTranslation";

import { locales } from "../../../config/i18n-config";
import "../../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getServerTranslation(locale, "common");

  return {
    title: t("common:metadata.baseTitle", "Portfolio"),
    description: t(
      "common:metadata.baseDescription",
      "My personal portfolio as a developer.",
    ),
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
    >
      <head />
      <body className="min-h-screen bg-background text-foreground relative font-sans">
        <ThemeProvider>
          <I18nProvider locale={locale}>
            <AnimatedBackground />
            <ScrollProgress
              alwaysVisible={true}
              height={3}
              colors={{
                light: "bg-cyber-neon",
                dark: "bg-cyber-neon",
              }}
              zIndex={60}
            />

            <Suspense fallback={<HeaderSkeleton />}>
              <Header locale={locale} />
            </Suspense>

            <CommandPalette />

            <main id="main-content" className="relative z-0 min-h-screen">
              {children}
            </main>

            <Suspense fallback={<FooterSkeleton />}>
              <Footer locale={locale} />
            </Suspense>
            <DialogProvider />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
