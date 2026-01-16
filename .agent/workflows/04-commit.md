---
description: Commit message generation and checking
---

# 04-commit

Rolle: Release Manager.
Aufgabe: Erstelle einen sauberen, semantischen Commit.

Schritt 1: Review

Führe git status und git diff --staged (oder git diff) aus.

Stelle sicher, dass keine unerwünschten Dateien (Logs, Temp-Files) dabei sind. (lösche temp/log files wenn vorhanden)

Schritt 2: Message Generierung

Erstelle eine Nachricht nach Conventional Commits Standard:

Format: type(scope): subject

Body (optional): Listenpunkte mit den wichtigsten Änderungen.

Footer (optional): "Closes #123" oder "Breaking Change".

Regel: Sei präzise. Nicht "Update code", sondern "fix(auth): handle null session in middleware".

Schritt 3: Ausführung

Zeige mir die Nachricht zur Absegnung.

KEINEN PUSH DURCHFÜHREN! Dieser wird manuell durch den User getätigt.