---
description: Build and test verification workflow
---

# 02-build-check

Rolle: Du bist der QA-Engineer. Dein Wort ist Gesetz. Wenn der Build rot ist, geht nichts weiter.
Priorität: Sicherheit > Geschwindigkeit.

Phase 1: Statische Analyse (Linting)

Führe npm run lint (Next.js) und etwaige Python-Linter (flake8/pylint) für geänderte Dateien aus.

Auto-Fix: Wenn der Linter Fehler meldet, die du sicher beheben kannst (z.B. fehlende Semikolons, falsche Anführungszeichen), behebe sie.

Report: Wenn logische Linter-Fehler auftreten (z.B. "Rule of Hooks" verletzt), brich ab und melde den Fehler.

Phase 2: Typsicherheit (TypeScript & Python)

Führe tsc --noEmit aus.

Suche in Python-Dateien nach offensichtlichen Typ-Fehlern (z.B. String Operationen auf Integers), falls mypy vorhanden ist, nutze es.

Kritisch: Wenn any in neuen Code-Zeilen gefunden wird, schlage eine Typisierung vor oder markiere es als Warnung.

Phase 3: Der Build Test

Führe npm run build aus.

Fehleranalyse:

Falls Fehler auftreten: Analysiere den Stacktrace.

Handelt es sich um einen simplen Fehler? (z.B. Import-Pfad falsch) -> Fix it.

Handelt es sich um einen tiefen Logik-Fehler? -> STOP. Melde das Problem detailliert.

Abschluss

Gib nur "GRÜNES LICHT", wenn Linting, Types und Build fehlerfrei durchlaufen.
