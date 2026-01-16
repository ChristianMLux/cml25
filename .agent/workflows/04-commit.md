---
description: Commit message generation and checking
---

# 04-commit

This workflow handles the commit process.

1. Check git status
   // turbo

```bash
git status
```

2. Generate/Validate Commit Message

   > [!IMPORTANT]
   > Use Conventional Commits format: `type(scope): subject`.
   > Example: `feat(auth): add google login support`.
   > Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

3. Commit changes (Interactive)
   > [!NOTE]
   > If you are an agent, propose the commit command using `run_command` after getting user approval for the message.
