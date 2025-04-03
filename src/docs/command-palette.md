# Command Palette - Best Practices

Dieses Dokument beschreibt die Funktionsweise und Verwendung der Command Palette im Portfolio-Projekt. Sie ermöglicht schnelle Navigation und Aktionen über eine Tastenkombination (⌘K / Strg+K).

## Relevante Dateien & Hooks/Stores

- **UI Komponente:**
  - `src/components/ui/CommandPalette/index.tsx`: Die Hauptkomponente, die das Dialogfenster, die Suche und die Liste der Befehle rendert.
  - `src/components/ui/CommandPalette/CommandItem.tsx`: Komponente zur Darstellung eines einzelnen Befehls in der Liste.
  - `src/components/ui/Dialog/Dialog.tsx`: Basis-Dialogkomponente, die von der Command Palette verwendet wird.
- **Store:**
  - `src/lib/store/uiStore.ts`: Enthält den `useCommandPaletteStore` (Zustand Store) zur Verwaltung des Zustands (offen/geschlossen) und der zuletzt verwendeten Befehle.
- **Hook:**
  - `src/hooks/useCommandPalette.ts`: Ein optionaler Hook, um die Command Palette programmatisch zu steuern (wird aktuell nicht direkt genutzt, aber die Logik ist im Store/Komponente).
- **Layout Integration:**
  - `src/app/[locale]/layout.tsx`: Hier wird die `<CommandPalette />` Komponente eingebunden, um global verfügbar zu sein.
- **Styling:**
  - `src/styles/command-palette.css`: Spezifische Stile für die Command Palette.
- **Übersetzungen:**
  - `public/locales/{locale}/command.json`: Enthält die Texte für die Command Palette (Labels, Platzhalter etc.).

## Setup & Konzepte

1.  **Zustand Store (`useCommandPaletteStore`):**
    - Verwaltet den `isOpen`-Zustand der Palette.
    - Speichert eine Liste der `recentCommands` (IDs der zuletzt ausgeführten Befehle) persistent im Local Storage (`command-palette-storage`). Die Liste ist auf die letzten 5 Befehle begrenzt.
    - Bietet Aktionen `open`, `close` und `addRecentCommand`.
2.  **Command Palette Komponente (`CommandPalette/index.tsx`):**
    - Verwendet den `useCommandPaletteStore`, um den offenen/geschlossenen Zustand zu steuern.
    - Definiert eine Liste aller verfügbaren `allCommands` (Navigation, Aktionen wie Theme-Wechsel, Sprachwechsel). Die Labels werden dynamisch mittels `useTranslation('command')` übersetzt.
    - Implementiert die Suchlogik: Filtert `allCommands` basierend auf der Eingabe im Suchfeld (case-insensitive).
    - Zeigt zuerst die `recentCommands` an (aus dem Store geladen und mit `allCommands` abgeglichen), wenn die Suche leer ist.
    - Gruppiert die gefilterten Befehle nach Kategorien (`navigation`, `action`, `settings`).
    - Verwaltet den `activeIndex` zur Tastaturnavigation (Pfeiltasten Hoch/Runter) innerhalb der sichtbaren Befehlsliste.
    - Implementiert die Tastatur-Handler (`handleKeyDown`) für Pfeiltasten, Enter (führt den aktiven Befehl aus) und Escape (schließt die Palette). Sorgt dafür, dass der aktive Eintrag sichtbar bleibt (`scrollIntoView`).
    - Verwendet `CommandItem` zur Darstellung jedes Befehls, inklusive Icon und optionalem Shortcut-Hinweis.
    - Registriert einen globalen Event Listener, um die Palette mit ⌘K / Strg+K zu öffnen.
    - Fokussiert automatisch das Suchfeld beim Öffnen.
3.  **Befehlsdefinition (`Command` Interface):** Jeder Befehl hat eine `id`, ein `label` (aus `t()` geholt), ein `icon` (React-Komponente), eine `category`, eine optionale `shortcut`-Anzeige und eine `action`-Funktion, die beim Auswählen ausgeführt wird.
4.  **Aktionen:** Die `action`-Funktionen der Befehle führen die entsprechende Logik aus (z.B. Navigation mittels `window.location.href`, Theme-Änderung über `setTheme`, Sprachwechsel). Nach der Ausführung wird oft `close()` aufgerufen und der Befehl über `handleCommandSelect(id)` (was `addRecentCommand` aufruft) zu den Favoriten hinzugefügt.

## Best Practices & Verwendung

### 1. Globale Einbindung

Die `<CommandPalette />` Komponente **muss** im Root Layout (`src/app/[locale]/layout.tsx`) platziert werden, damit sie auf allen Seiten verfügbar ist und der globale Shortcut (⌘K / Strg+K) funktioniert.

````typescript
// src/app/[locale]/layout.tsx
import CommandPalette from "@/components/ui/CommandPalette"; // Importieren
import { ThemeProvider } from "@/components/ui/Theme/ThemeProvider";
import I18nProvider from "@/components/i18n/I18nProvider";

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <I18nProvider locale={locale}>
            {/* ... Header, AnimatedBackground etc. ... */}
            <CommandPalette /> {/* Hier einbinden, oft nach dem Header */}
            <main id="main-content">{children}</main>
            {/* ... Footer, DialogProvider etc. ... */}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
2. Neue Befehle hinzufügenUm neue Befehle hinzuzufügen, bearbeite die allCommands-Liste in src/components/ui/CommandPalette/index.tsx.// src/components/ui/CommandPalette/index.tsx

// 1. Importiere das benötigte Icon
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

// ... innerhalb der Komponente ...

  const allCommands: Command[] = [
    // ... bestehende Befehle (home, projects, about, contact, theme-toggle, language-toggle) ...

    // 2. Füge den neuen Befehl hinzu
    {
      id: "settings", // Eindeutige ID
      label: t("command:settings.general"), // Verwende einen Übersetzungskey
      icon: Cog8ToothIcon, // Referenziere das importierte Icon
      category: "settings", // Ordne einer Kategorie zu (oder erstelle eine neue)
      shortcut: "g s", // Optionaler Shortcut-Hinweis
      action: () => { // Definiere die Aktion
        navigateTo(`/${i18n.language}/settings`); // Beispiel: Navigation zur Einstellungsseite
        handleCommandSelect("settings"); // Füge zur "Zuletzt verwendet"-Liste hinzu
      },
    },
  ];

// ... rest der Komponente ...
3. Übersetzungen für BefehleStelle sicher, dass die Labels (label) und ggf. Kategorie-Namen für neue Befehle in den entsprechenden Namespace-Dateien (command.json) in public/locales/de und public/locales/en hinzugefügt werden.// public/locales/de/command.json
{
  // ...
  "categories": {
    "navigation": "Navigation",
    "action": "Aktionen",
    "settings": "Einstellungen" // Neue Kategorie
  },
  "settings": { // Gruppe für Einstellungs-Befehle
    "general": "Allgemeine Einstellungen" // Label für den neuen Befehl
  }
  // ...
}
```json
// public/locales/en/command.json
{
  // ...
  "categories": {
    "navigation": "Navigation",
    "action": "Actions",
    "settings": "Settings" // New category
  },
  "settings": { // Group for settings commands
    "general": "General Settings" // Label for the new command
  }
  // ...
}
````

4. StylingAnpassungen am Aussehen der Command Palette (über das Standard-Dialog-Styling hinaus) können in src/styles/command-palette.css oder über Tailwind-Klassen direkt in den Komponenten (CommandPalette/index.tsx, CommandItem.tsx) vorgenommen werden.

#### Richtlinien

##### Eindeutige IDs:

Verwende kurze, aber eindeutige IDs für jeden Befehl.

##### Konsistenz:

Halte die Struktur der Command-Objekte konsistent. Verwende Icons von Heroicons oder Lucide für ein einheitliches Aussehen.

##### Performance:

Vermeide aufwändige Berechnungen bei der Filterung oder im Rendering der Liste, besonders in der action-Funktion.

##### Zugänglichkeit:

Achte auf korrekte ARIA-Attribute (wie aria-selected, role="option") für Tastaturnavigation und Screenreader. Die
