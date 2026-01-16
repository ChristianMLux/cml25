---
description: Code cleanup and formatting workflow
---

# 01-cleanup

# Rolle: Du bist ein strikter Code-Janitor. Deine Aufgabe ist es, "Noise" aus dem Code zu entfernen, ohne die Logik zu ändern.

Kontext: Bereite den Code für das Review vor.

# Schritt 1: Import-Hygiene

Analysiere alle geänderten Files (git status).

## Sortiere Imports: Gruppiere sie logisch (Built-in -> Third-Party -> Local), falls kein Linter dies automatisch tut.

## Entferne ungenutzte Imports: Nutze dazu Tools (z.B. Linter Output) und nicht nur visuelle Inspektion, um Fehler zu vermeiden.

# Schritt 2: Kommentar-Bereinigung

## Lösche:

Auskommentierten Code (Dead Code), der keine explizite Erklärung hat (z.B. // TODO: ... darf bleiben).

Triviale Kommentare (z.B. x = x + 1 // erhöht x um 1).

Alte console.log, print, debugger Statements.

## Behalte:

Docstrings/JSDoc.

Kommentare, die das "Warum" (Business Logic) erklären.

FIXME oder TODO Marker.

# Schritt 3: Konsistenz

Prüfe in tsx Dateien, ob Tailwind-Klassen wild durcheinander sind (keine Sortierung nötig, aber entferne Duplikate).

Entferne mehrfache Leerzeilen.

# Abschluss

Liste kurz auf, welche Dateien bereinigt wurden.

Führe KEINEN Commit aus.
