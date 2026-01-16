# Internationalisierung (i18n) - Best Practices

Dieses Dokument beschreibt die Best Practices für die Verwendung der Internationalisierung (i18n) im Portfolio-Projekt. Ziel ist es, die Anwendung mehrsprachig (Deutsch/Englisch) zu gestalten.

## Relevante Dateien & Hooks

- **Konfiguration:**
  - `src/lib/i18n.ts`: Hauptkonfiguration von `i18next`.
  - `config/i18n-config.ts`: Definition der unterstützten Locales und der Standard-Locale.
  - `src/middleware.ts`: Next.js Middleware zur Erkennung und Weiterleitung basierend auf der Locale.
- **Provider:**
  - `src/components/i18n/I18nProvider.tsx`: Client-seitiger Provider, der die i18n-Instanz bereitstellt.
- **Übersetzungsdateien:**
  - `public/locales/{locale}/{namespace}.json`: JSON-Dateien mit den Übersetzungen (z.B. `public/locales/de/common.json`).
- **Navigations-Helfer:**
  - `src/lib/i18n-navigation.tsx`: Angepasste `Link` (`LocalizedLink`) und `useRouter`, `usePathname` Hooks für Locale-bewusste Navigation.
- **Server-seitige Übersetzungen:**
  - `src/lib/getServerTranslation.ts`: Funktion zum Laden von Übersetzungen in Server Components.
- **Client-seitige Übersetzungen:**
  - `useTranslation` Hook von `react-i18next`.

## Setup & Konzepte

1. **Konfiguration (`i18n.ts`):** Definiert unterstützte Sprachen (`supportedLngs`), Fallback-Sprache (`fallbackLng`), Namespaces (`ns`), Backend-Einstellungen (zum Laden der JSON-Dateien) und Spracherkennung (`detection`).
2. **Locale-Routing (`middleware.ts`):**
   - Die Middleware prüft eingehende Anfragen.
   - Wenn kein Locale-Präfix (`/de` oder `/en`) vorhanden ist, ermittelt sie die bevorzugte Sprache (aus Cookie oder `accept-language` Header).
   - Leitet den Benutzer zur entsprechenden Locale-Version der URL weiter (z.B. `/projekte` -> `/de/projekte`).
   - Setzt ein `NEXT_LOCALE` Cookie zur Speicherung der bevorzugten Sprache.
3. **Provider (`I18nProvider.tsx`):** Wird im Root-Layout (`layout.tsx`) verwendet, um den `i18next`-Kontext für Client Components bereitzustellen und die Sprache basierend auf dem URL-Parameter zu initialisieren.
4. **Übersetzungsdateien:** Für jede Sprache (`de`, `en`) gibt es einen Ordner unter `public/locales`. Darin befinden sich JSON-Dateien für jeden Namespace (`common`, `projects`, etc.), die Schlüssel-Wert-Paare für die Übersetzungen enthalten.
5. **Navigation (`i18n-navigation.tsx`):**
   - `LocalizedLink`: Eine Wrapper-Komponente um `next/link`, die automatisch das aktuelle Locale-Präfix zur `href` hinzufügt.
   - `useRouter` / `usePathname`: Angepasste Versionen der Next.js Hooks, die das Locale-Präfix berücksichtigen bzw. entfernen.
6. **Übersetzungen verwenden:**
   - **Server Components:** `getServerTranslation(locale, namespace)` verwenden, um die `t`-Funktion zu erhalten.
   - **Client Components:** Den `useTranslation(namespace)` Hook verwenden, um die `t`-Funktion und die `i18n`-Instanz zu erhalten.

## Best Practices & Verwendung

### 1. Übersetzungen in Server Components

```typescript
// Beispiel: src/app/[locale]/page.tsx
import { getServerTranslation } from "@/lib/getServerTranslation";

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  // Namespace 'home' für die spezifische Seite laden
  const t = await getServerTranslation(locale, "home");

  return (
    <h1>{t('hero.title')}</h1> // Verwendung der t-Funktion
  );
}
```

### 2. Übersetzungen in Client Components//

Beispiel: src/components/layout/Header/index.tsx
"use client";
import { useTranslation } from "react-i18next";
import { LocalizedLink } from '@/lib/i18n-navigation'; // Wichtig: LocalizedLink verwenden

export default function Header({ locale }: { locale: string }) {
// Namespace 'common' für allgemeine Texte laden
const { t } = useTranslation("common");

return (

<nav>
<LocalizedLink href="/projects">{t('navigation.projects')}</LocalizedLink>
<LocalizedLink href="/about">{t('navigation.about')}</LocalizedLink>
{/_ ... weitere Links _/}
</nav>
);
}

### 3. Locale-Bewusste Navigation

Verwende immer LocalizedLink für interne Links, um sicherzustellen, dass das Locale-Präfix korrekt hinzugefügt wird.import { LocalizedLink } from '@/lib/i18n-navigation';

<LocalizedLink href="/about">
  {t('navigation.about')}
</LocalizedLink>
Verwende den angepassten useRouter für programmatische Navigation.import { useRouter } from '@/lib/i18n-navigation';

const router = useRouter();
// Navigiert automatisch zu /de/contact oder /en/contact, je nach aktueller Locale
router.push('/contact');

### 4. Sprachwechsel

Der Sprachwechsel wird durch Navigation zur entsprechenden URL mit dem anderen Locale-Präfix ausgelöst (z.B. über Links im Header oder die Command Palette). Die Middleware und der I18nProvider kümmern sich um den Rest.// Beispiel für Sprachumschalter-Links im Header
const pathname = usePathname(); // Den Locale-freien Pfad holen

```
<a href={`/de${pathname}`} className={locale === 'de' ? 'font-bold' : ''}>DE</a>
<span>|</span>
<a href={`/en${pathname}`} className={locale === 'en' ? 'font-bold' : ''}>EN</a>
```

### 5. Struktur der Übersetzungsdateien

Logische Namespaces: Halte die Namespaces logisch getrennt (z.B. common für allgemeine Texte wie Navigation/Buttons, projects für projektbezogene Texte, about für die Über-mich-Seite). Das verbessert die Übersicht und Ladeperformance.Konsistente Schlüssel: Verwende exakt die gleichen Schlüsselnamen über verschiedene Sprachen hinweg.Verschachtelung: Nutze Verschachtelung für bessere Organisation und Lesbarkeit der JSON-Dateien:// common.json

```
{
  "navigation": {
    "home": "Startseite",
    "projects": "Projekte",
    "about": "Über mich",
    "contact": "Kontakt"
  },
  "buttons": {
    "submit": "Absenden",
    "viewMore": "Mehr anzeigen"
  },
  "footer": {
     "copyright": "© {{year}} Mein Portfolio. Alle Rechte vorbehalten.",
     "imprint": "Impressum"
  }
}
```

#### Variablen:

Verwende die {{variable}}-Syntax für dynamische Werte (wie im Copyright-Beispiel oben). Diese können dann in der t-Funktion übergeben werden: t('footer.copyright', { year: new Date().getFullYear() }).

#### RichtlinienStandard-Namespace:

Definiere häufig verwendete, globale Texte (Navigation, Footer, allgemeine Buttons) im common-Namespace.

#### Keys:

Verwende beschreibende, hierarchische Keys (z.B. hero.title statt text1).Fallback: Stelle sicher, dass die fallbackLng (de in diesem Fall) alle notwendigen Keys enthält, falls eine Übersetzung in einer anderen Sprache fehlt.Keine HTML-Tags: Vermeide HTML-Tags direkt in den Übersetzungs-
