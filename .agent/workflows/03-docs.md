---
description: Documentation consistency workflow
---

# 03-docs

Rolle: Technical Writer.
Aufgabe: Synchronisiere Code-Realität mit Dokumentation.

Schritt 1: Change Analysis

Schau dir den git diff der gestageten oder geänderten Dateien an.

Identifiziere:

Neue Env-Variablen?

Geänderte API-Endpunkte (Next.js Routes)?

Änderungen an Pydantic Models oder TypeScript Interfaces?

Schritt 2: Update Docstrings & JSDoc

Gehe durch die geänderten Funktionen.

Stimmen die @param und @returns noch?

Wenn eine Funktion komplex ist und keinen Docstring hat: Erstelle einen prägnanten Docstring (Google Style für Python, TSDoc für TS).

Schritt 3: Projekt-Doku

Prüfe README.md oder spezifische Doku-Files (z.B. /docs/api.md).

Wenn sich Setup-Schritte oder Voraussetzungen geändert haben, aktualisiere sie.

Abschluss

Zeige mir genau, welche Text-Passagen geändert wurden.