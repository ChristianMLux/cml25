# Project Tech Stack & Conventions

## Core Technology

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Package Manager:** npm
- **Structure:** `src/` directory for application code

## Styling

- **Engine:** Tailwind CSS
- **Convention:** Utility-first, utilize `className` props.
- **Icons:** Lucide React, Heroicons

## Code Quality

- **Linting:** ESLint (`npm run lint`)
- **Formatting:** Prettier (`npm run format`)
- **Type Checking:** TypeScript (`npm run typecheck`)
- **Testing:** Jest (`npm run test`)

## Python Support

- **Status:** Minimal scripts only (e.g., `FolderToText.py`).
- **Convention:** No dedicated Python CI pipeline is currently enforced. Run scripts directly with system `python`.
