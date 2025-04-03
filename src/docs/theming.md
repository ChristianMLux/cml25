# Theming - Best Practices

Dieses Dokument beschreibt die Best Practices für das Theming-System (Hell-/Dunkelmodus) im Portfolio-Projekt.

## Relevante Dateien & Hooks/Stores

- **Provider:**
  - `src/components/ui/Theme/ThemeProvider.tsx`: React Context Provider, der das Theme verwaltet und auf das System-Theme hört. Wendet die `dark` oder `light` Klasse auf das `<html>`-Element an.
- **Store:**
  - `src/lib/store/themeStore.ts`: Zustand Store zur persistenten Speicherung der Theme-Einstellung (`light`, `dark` oder `system`).
- **Konfiguration:**
  - `tailwind.config.ts`: Konfiguration von Tailwind CSS, insbesondere der `darkMode: 'class'` Einstellung.
  - `src/styles/globals.css`: Definition der CSS-Variablen für Farben im Light- und Dark-Mode (`:root` und `.dark`).
- **UI Komponenten:**
  - `src/components/ui/Theme/theme-toggle.tsx`: Beispiel-Button zum Umschalten des Themes (wird aktuell nicht direkt verwendet, aber Logik ist im Header).
  - `src/components/layout/Header/index.tsx`: Implementiert den Theme-Toggle-Button.
  - `src/components/layout/Header/MobileNav.tsx`: Implementiert den Theme-Toggle-Button für die mobile Navigation.

## Setup & Konzepte

1.  **Tailwind Konfiguration:** `darkMode: 'class'` in `tailwind.config.ts` weist Tailwind an, Dark-Mode-Stile anzuwenden, wenn das `<html>`-Element die Klasse `dark` hat.
2.  **CSS Variablen:** In `globals.css` werden Farbvariablen für `:root` (Light Mode Standard) und `.dark` definiert. Diese Variablen werden von Tailwind-Komponenten (wie Button, Card etc.) und benutzerdefinierten Stilen verwendet. Beispiel: `--background`, `--foreground`, `--primary`, `--border`.
3.  **Zustand Store (`themeStore.ts`):**
    - Speichert den aktuellen Theme-Zustand (`theme`: 'light', 'dark' oder 'system').
    - Verwendet `zustand/middleware/persist`, um die Auswahl des Benutzers im Local Storage zu speichern (`theme-storage`).
    - Bietet eine `setTheme`-Aktion zum Ändern des Themes.
4.  **Theme Provider (`ThemeProvider.tsx`):**
    - Liest den Theme-Zustand aus dem `themeStore`.
    - Fügt die Klasse `dark` oder `light` zum `<html>`-Element hinzu oder entfernt sie, basierend auf dem ausgewählten Theme und der Systempräferenz (wenn `theme === 'system'`).
    - Fügt einen Event Listener hinzu, um auf Änderungen des System-Themes (`prefers-color-scheme: dark`) zu reagieren und die Klasse entsprechend anzupassen, wenn `theme === 'system'`.
    - Stellt den Theme-Zustand und die `setTheme`-Funktion über den `useTheme`-Hook bereit.
5.  **Theme Umschaltung:** Komponenten wie der Header verwenden den `useTheme`-Hook (indirekt über `useNavigation`), um das aktuelle Theme zu lesen und die `setTheme`-Funktion aufzurufen, um es zu ändern.

## Best Practices & Verwendung

### 1. Styling für Dark Mode

Verwende das `dark:` Präfix von Tailwind CSS, um spezifische Stile für den Dark Mode zu definieren.

```tsx
// Beispiel Komponente
<div className="bg-white text-black dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
  Inhalt mit angepassten Farben und Rändern für Light/Dark Mode.
</div>
```

### 2. Verwendung von CSS Variablen

Wenn benutzerdefinierte CSS-Stile benötigt werden (z.B. für komplexe Hintergründe oder spezifische Komponenten), greife auf die in globals.css definierten Variablen zurück, um Konsistenz zu gewährleisten.

#### /_ Beispiel in einer CSS-Datei oder <style> Block _/

.custom-gradient-background {
background: linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)));
}

.special-text {
color: hsl(var(--primary));
}

### 3. Theme Umschalten

Verwende den useTheme-Hook (oder den useNavigation-Hook, der ihn kapselt), um das Theme zu ändern. Die Logik ist bereits im Header und MobileNav implementiert.
// Aus src/components/layout/Header/index.tsx (vereinfacht)
"use client";
import { useNavigation } from "@/hooks/useNavigation";
import { Button } from "@/components/ui/Button/button";
import { Sun, Moon } from "lucide-react";

export default function Header({ locale }: HeaderProps) {
const { theme, toggleTheme, t } = useNavigation();

return (
<header>
{/_ ... _/}
<Button
variant="ghost"
size="icon"
onClick={toggleTheme} // Ruft setTheme auf
aria-label={t("theme.toggle")} >
{theme === 'dark' ? <Sun /> : <Moon />}
</Button>
{/_ ... _/}
</header>
);
} 4. Theme im Root Layout einbindenDer ThemeProvider muss im Root Layout (src/app/[locale]/layout.tsx) eingebunden werden, und zwar möglichst weit oben, um alle Kind-Komponenten zu umschließen.// src/app/[locale]/layout.tsx
import { ThemeProvider } from "@/components/ui/Theme/ThemeProvider";
import I18nProvider from "@/components/i18n/I18nProvider"; // Beispiel: Andere Provider

export default async function RootLayout({ children, params }: RootLayoutProps) {
const { locale } = await params;
return (
// suppressHydrationWarning ist wichtig bei Verwendung von next-themes
<html lang={locale} suppressHydrationWarning>
<body className="min-h-screen bg-white dark:bg-gray-900 ...">
<ThemeProvider> {/_ Hier einbinden _/}
<I18nProvider locale={locale}> {/_ Andere Provider können hier folgen _/}
{/_ ... restlicher Inhalt (Header, Footer, etc.) ... _/}
{children}
</I18nProvider>
</ThemeProvider>
</body>
</html>
);
}

#### Richtlinien

##### Bevorzuge Tailwind:

Nutze wo immer möglich die dark: Variante von Tailwind anstelle von benutzerdefinierten CSS-Variablen oder Inline-Styles für Theming.

##### Konsistente Farben:

Verwende die definierten CSS-Variablen (--background, --foreground, --primary, --secondary, --muted, --accent, --border, --input, --ring) für konsistentes Styling über die gesamte Anwendung hinweg. Diese Variablen sind bereits mit den Tailwind-Farbnamen (z.B. bg-background, text-primary) verknüpft.

##### System-Theme:

Biete die "System"-Option an (falls gewünscht und implementiert), damit sich die Seite automatisch an die OS-Einstellung anpasst. Der ThemeProvider unterstützt dies bereits.

##### suppressHydrationWarning:

Vergiss nicht das suppressHydrationWarning-Attribut im <html>-Tag, um Hydration-Fehler zu vermeiden, die durch das serverseitige Rendern und die clientseitige Theme-Anpassung
