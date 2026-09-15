@../AGENTS.md

## Claude Code

`AGENTS.md` above is the single source of truth for this project; keep it current
rather than duplicating its content here. This file is only for instructions that
apply to Claude Code and not to other agents.

- The import path is `@../AGENTS.md`, not `@AGENTS.md`: relative imports resolve
  against the file that contains them, and this file lives in `.claude/`.
- To verify the import still resolves after moving or renaming either file, ask a
  fresh session something only `AGENTS.md` knows:
  `claude -p "Without using any tools, which file is the root object here?"`
  `/context` only reports a **Memory files** token total, not the file names.
