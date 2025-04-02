import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/ui/Theme/ThemeProvider";
import { locales } from "../../../config/i18n-config";
import { getServerTranslation } from "@/lib/getServerTranslation";
import { ReactNode } from "react";
import I18nProvider from "@/components/i18n/I18nProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeaderSkeleton from "@/components/ui/Loading/Skeleton/HeaderSkeleton";
import FooterSkeleton from "@/components/ui/Loading/Skeleton/FooterSkeleton";
import { DialogProvider } from "@/components/ui/Dialog";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrollProgress from "@/components/ui/ScrollProgress/scroll-progress";
import AnimatedBackground from "@/components/ui/AnimatedBackground/animated-background";
import "../../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      "My personal portfolio as a developer."
    ),
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <head />
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
        <ThemeProvider>
          <I18nProvider locale={locale}>
            <AnimatedBackground />
            <ScrollProgress
              alwaysVisible={true}
              height={1}
              colors={{
                light: "bg-blue-600",
                dark: "bg-blue-400",
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
