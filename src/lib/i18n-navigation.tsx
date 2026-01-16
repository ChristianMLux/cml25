"use client";
import Link from "next/link";
import {
  useRouter as useNextRouter,
  usePathname as useNextPathname,
} from "next/navigation";
import { useTranslation } from "react-i18next";

import { locales, defaultLocale } from "../../config/i18n-config";

export function LocalizedLink({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language || defaultLocale;

  const localizedHref = href.toString().startsWith("/")
    ? `/${currentLocale}${href === "/" ? "" : href}`
    : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}

export function useRouter() {
  const nextRouter = useNextRouter();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language || defaultLocale;

  return {
    ...nextRouter,
    push: (href: string) => {
      if (href.startsWith("/") && !href.startsWith(`/${currentLocale}`)) {
        nextRouter.push(`/${currentLocale}${href === "/" ? "" : href}`);
      } else {
        nextRouter.push(href);
      }
    },
    replace: (href: string) => {
      if (href.startsWith("/") && !href.startsWith(`/${currentLocale}`)) {
        nextRouter.replace(`/${currentLocale}${href === "/" ? "" : href}`);
      } else {
        nextRouter.replace(href);
      }
    },
  };
}

export function usePathname() {
  const pathname = useNextPathname();

  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, "") || "/";
    }
  }

  return pathname;
}

export function redirect(path: string, locale?: string) {
  const currentLocale = locale || defaultLocale;

  if (
    path.startsWith("/") &&
    !locales.some((loc) => path.startsWith(`/${loc}`))
  ) {
    return `/${currentLocale}${path === "/" ? "" : path}`;
  }

  return path;
}
