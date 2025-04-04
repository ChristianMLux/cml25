# Portfolio CML25

Dies ist mein persönliches Portfolio, erstellt mit Next.js, TypeScript und Tailwind CSS. Es dient zur Präsentation meiner Fähigkeiten, Projekte und meines beruflichen Werdegangs.

## ✨ Features

- **Modernes Tech-Stack:** Gebaut mit Next.js 15, React 19 und TypeScript.
- **Styling:** Tailwind CSS für Utility-First-Styling, unterstützt durch `class-variance-authority` und `tailwind-merge`.
- **Dark Mode:** Theme-Umschaltung (Hell/Dunkel/System) mit `next-themes` und Zustand.
- **Internationalisierung (i18n):** Unterstützung für Deutsch (de) und Englisch (en) mittels `i18next` und Middleware für Locale-Routing.
- **UI Komponenten:**
  - Headless UI und Radix UI für zugängliche Komponenten (Dialog, Label, Toast).
  - Lucide Icons, Heroicons und Simple Icons für Icons.
  - Benutzerdefinierte Komponenten: `CommandPalette`, `ScrollProgress`, `AnimatedBackground`, `DialogProvider`.
- **Formulare:** Kontaktformular mit `react-hook-form` und `zod` für die Validierung.
- **Backend:** Firebase Firestore zum Speichern von Kontaktnachrichten und Firebase Functions für E-Mail-Benachrichtigungen via Nodemailer.
- **Optimierung:** Bildoptimierung mit `next/image`, CSS-Optimierung mit `critters`, Bundle-Analyse.
- **Entwicklungsumgebung:** ESLint, Prettier, Jest, Testing Library, Husky und lint-staged für Codequalität und Konsistenz.
- **Interaktivität:** Command Palette (⌘K / Strg+K) für schnelle Navigation und Aktionen.

## 🚀 Tech Stack

- **Framework:** Next.js 15
- **Sprache:** TypeScript
- **UI:** React 19
- **Styling:** Tailwind CSS 3, `tailwindcss-animate`
- **State Management:** Zustand
- **Formulare:** React Hook Form, Zod
- **i18n:** i18next, react-i18next
- **Backend:** Firebase (Firestore, Functions)
- **Icons:** Lucide Icons, Heroicons, Simple Icons
- **Animation:** Framer Motion
- **Deployment:** (Ursprünglich für Vercel eingerichtet, aber anpassbar)

## 🏁 Getting Started

Um das Projekt lokal zu starten:

1.  **Repository klonen:**

    ```bash
    git clone https://github.com/ChristianMLux/cml25
    cd cml25
    ```

2.  **Abhängigkeiten installieren:**

    ```bash
    npm install
    # oder
    yarn install
    # oder
    pnpm install
    ```

3.  **Umgebungsvariablen einrichten:**
    Erstelle eine `.env.local` Datei im Stammverzeichnis und füge die notwendigen Firebase-Konfigurationsvariablen hinzu (siehe `src/lib/firebase/firebase.ts`) sowie die Gmail-Zugangsdaten für die E-Mail-Funktion (siehe `functions/index.js`).

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=xxx
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
    NEXT_PUBLIC_FIREBASE_APP_ID=xxx
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxx

    # Für Firebase Functions (E-Mail Versand)
    GMAIL_EMAIL=deine_email@gmail.com
    GMAIL_PASSWORD=dein_gmail_app_passwort
    ```

4.  **Entwicklungsserver starten:**
    ```bash
    npm run dev
    # oder
    yarn dev
    # oder
    pnpm dev
    ```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser, um das Ergebnis zu sehen.

## 📝 TODO Liste

- [ ] Color Picker integrieren
- [ ] Captcha Schutz für Kontaktformular (z.B. hCaptcha, reCAPTCHA)
- [ ] Texte finalisieren und Korrektur lesen (alle Sprachen)
- [ ] Projekt-Sektion erweitern (mehr Projekte hinzufügen, Details verbessern)
- [ ] Anwendung des Goldenen Schnitts prüfen/integrieren (Layout, Bilder)
- [ ] Kontaktformular erweitern:
  - [ ] Bedingte Felder "Gehaltsvorstellung" (Salary) und "Arbeitsort" (Place: Remote, Office, Hybrid) hinzufügen.
  - [ ] Diese Felder nur anzeigen, wenn der Absender angibt, HR/Chef zu sein (z.B. über eine Checkbox oder Auswahl).
- [ ] Blog Funktionen integrieren
- [ ] CMS / Hardcoded Data in Firebase übertragen
