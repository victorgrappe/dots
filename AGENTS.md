# dots

## Introduction

This repository is an Obsidian vault used to manage a personal knowledge graph.

Everything in it is built from one primitive, the `dot`. The vault is an ontology
experiment as much as a note collection: the goal is a single rooted graph with
explicit, well-typed relations, not a folder tree of documents.

## Terminology

- **`dot`** — the core primitive. Every structure is built from dots.
  - One dot = one file: `dots/{Name}.md`. The file name *is* the dot's identity.
  - Relations between dots live in the **frontmatter**, as wikilinks. Never in the body.
  - `dots/Dot.md` is the **root object**. It has no `class`, so every chain terminates there.

- **`class:`** — "a *is a* b" (subsumption / subclass-of). Transitive.
  Example: `Food` → `[[Aliment]]` → `[[Dot]]`.

- **`type:`** — "a *has a* b" / instance-of. Not transitive.
  Example: `Pasta alla Carbonara` → `[[Recipe]]`.

Keeping `class` and `type` separate is deliberate. Fusing instance-of and
subclass-of into one relation is what makes naive OOP hierarchies inconsistent:
`Apple ⊂ Fruit ⊂ Food` gives `Apple ⊂ Food`, but `apple_1 ∈ Apple` never makes
`apple_1` a subclass of `Fruit`. The reasoning is worked out in
`dots/Dots, Upper Ontology structure.md`.

Reference notes carry a `wikidata__cd:` (Wikidata Q-code) and sometimes a
`description:`. These are research material and are not yet classed into the graph.

## Conventions

- **`dots/` is flat, on purpose.** Do not create subdirectories to group dots, and
  do not reorganize it. Hierarchy is *derived* from `class` links, not stored in
  the filesystem. `dots/base/dots.base` walks `class` up to 8 levels
  (`class__1` … `class__8`) and joins the names into a dotted path such as
  `Dot.Aliment.Food`. In the `path` formula, `class` joins with `.` and `type` with `--`.
- **New knowledge means a new dot**: add `dots/{Name}.md` with frontmatter linking it
  into the graph. Do not append it as a section of an existing dot.
- Frontmatter links are quoted wikilinks: `class: "[[Aliment]]"`.

## Setup

The vault is synced via iCloud; opening the folder in Obsidian is the whole setup.

Optional: import dots from the separate `victor` vault (see Commands).

## Commands

Run from the repository root — `import.sh` resolves the whitelist as a relative path.

```bash
bash ./vault/victor/import.sh
```

Mirrors `victor` vault into this
repo with `rsync`, limited to the paths listed in `vault/victor/whitelist.txt`
(everything else excluded). **The script is hardcoded to `--dry-run`** and writes
nothing; remove that flag to apply.

The same sync is available inside Obsidian through the `dots` plugin:

````markdown
```dots
sync            <- dry run
```
```dots
sync apply      <- actually writes
```
````

## Directories

- `dots/{Name}.md` — the dot files. Each file is a dot.
  - `dots/base/{}.base` — Obsidian `.base` files that query and display dots in a
    structured way. `dots.base` defines the derived class hierarchy.
  - `dots/template/{}.md` — file templates for creating dots. *Currently empty.*
- `vault/victor/` — the import script and its rsync whitelist.
- `.obsidian/` — Obsidian configuration.
  - `.obsidian/plugins/dots/` — local plugin. Runs plain-JS functions from
    `scripts/` via ```` ```dots ```` code blocks in notes; one function per file,
    file name = function name. Edit a script, then run the **Dots: reload scripts**
    command in Obsidian. See `dots/Dots demo.md`. Editing `main.js` itself needs a
    plugin toggle or an app reload — the command only re-reads `scripts/`.
    The plugin also decorates notes: any dot with a `wikidata__cd` gets a
    **Wikipedia ↗** button under its properties block and an icon in its tab,
    both built from `scripts/wikipediaUrl.js` and styled by `styles.css` (the same
    class the `wikipedia__url__button` formula in `dots.base` uses).
- `assets/` — vault assets. *Currently empty.*

## Notes for agents

- This repo has no tests, no build, and no lint step.
- There is no `.gitignore`; `.obsidian/workspace.json` churns on every Obsidian
  session and shows up in most diffs.
- Commits named `vault backup: <timestamp>` come from the obsidian-git plugin, not
  from a human.
