---
title: "How to Add Content to This Site"
date: 2026-07-27
author: Synergia Ranch
excerpt: A guide for website managers on creating blog posts and knowledge nodes using Obsidian and Git.
tags: [meta, guide]
---

This guide covers how to add content to the Synergia Ranch Agroecology website using Obsidian. No coding required — you write markdown files, and the site updates automatically.

---

## Setting Up Obsidian Git

This only needs to be done once per computer.

### 1. Install Obsidian

Download from [obsidian.md](https://obsidian.md) and install it.

### 2. Clone the repository as a vault

You need Git installed on your computer first ([git-scm.com](https://git-scm.com)).

In your terminal:

```bash
git clone https://github.com/travbetravelin/Synergia-Ranch-Agroecology.git
```

Then open Obsidian → **Open folder as vault** → select the cloned folder.

### 3. Install the Obsidian Git plugin

1. In Obsidian, go to **Settings** → **Community plugins**
2. Turn off **Restricted mode**
3. Click **Browse**, search for **Obsidian Git**, and install it
4. Enable the plugin

### 4. Configure the plugin

Go to **Settings** → **Obsidian Git** and set:

- **Auto pull interval**: `10` (minutes) — keeps your local copy up to date
- **Auto push interval**: `0` — push manually so you control when changes go live

### 5. Configure the Templates plugin

1. Go to **Settings** → **Core plugins** and enable **Templates**
2. Go to **Settings** → **Templates** and set **Template folder location** to `_templates`

Now when you create a new file, run **Templates: Insert template** from the command palette to pre-fill the correct frontmatter.

### 6. Publishing your changes

When ready to publish:

1. Open the **Command palette** (Cmd+P on Mac, Ctrl+P on Windows)
2. Run **Obsidian Git: Commit all changes**
3. Run **Obsidian Git: Push**

Changes go live on the site within a few minutes after pushing.

> **Always pull before you start writing.** Run **Obsidian Git: Pull** from the command palette to avoid conflicts with other contributors.

---

## Folder Structure

All content lives inside the `content/` folder:

```
content/
  blog/        ← blog posts (visible at /blog)
  people/      ← speaker and contributor profiles
  topics/      ← conceptual subjects (water, biochar, etc.)
  places/      ← locations
  events/      ← conferences and gatherings
```

Templates for each content type live in `_templates/` — use them when creating new files.

---

## Writing a Blog Post

1. Create a new file inside `content/blog/`
2. Name it with lowercase letters and hyphens — this becomes the URL: `water-and-soil.md` → `/blog/water-and-soil`
3. Insert the **Blog Post** template from the command palette
4. Fill in the frontmatter and write your content below

### Frontmatter

```yaml
---
title: "Water and Soil Health"
date: 2026-07-15
author: Your Name
excerpt: A short summary shown on the blog index page.
tags: [water, soil, agroecology]
---
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Displayed as the page heading |
| `date` | Recommended | Used for sorting (YYYY-MM-DD format) |
| `author` | Optional | Shown below the title |
| `excerpt` | Recommended | Preview text on the blog index |
| `tags` | Optional | Displayed as colored chips |

---

## Creating a Knowledge Node

Knowledge nodes are the entries in the graph — people, topics, places, and events.

| Type | Folder | Template to use |
|---|---|---|
| People | `content/people/` | Person |
| Topics | `content/topics/` | Topic |
| Places | `content/places/` | Place |
| Events | `content/events/` | Event |

Name the file using the node's slug: `mark-nelson.md`, `biochar.md`, etc.

### Frontmatter

**Person:**
```yaml
---
slug: mark-nelson
title: Mark Nelson
type: people
role: Ecologist and co-founder of Biosphere 2
---
```

**Topic, Place, or Event:**
```yaml
---
slug: biochar
title: Biochar
type: topic
---
```

| Field | Required | Description |
|---|---|---|
| `slug` | Yes | Must match the filename exactly (without `.md`) |
| `title` | Yes | Display name shown on the page and in the graph |
| `type` | Yes | `people`, `topic`, `place`, or `event` |
| `role` | People only | Short descriptor shown below the name |

---

## Connecting Nodes with Wikilinks

The site builds its knowledge graph automatically from `[[wikilinks]]` in the body of any file. No separate configuration needed.

To link to a knowledge node, wrap its slug in double brackets anywhere in the body:

```
[[biochar]]
[[mark-nelson]]
[[synergia-ranch|the ranch]]   ← custom display label after the pipe
```

These render as clickable links on the page and automatically create edges in the graph. If a blog post mentions `[[biochar]]`, that post will appear under "Related posts" on the Biochar node page, and the Biochar node will appear in the "Connections" panel when reading the post.

**The slug is just the filename without `.md`.** For example, `content/topics/biochar.md` has the slug `biochar`.

Connections are bidirectional — add the wikilink in one file and both nodes show the relationship.

---

## Tips

- **Filename = slug**: keep filenames lowercase with hyphens. `My File.md` becomes `/blog/My-File`, which looks odd in URLs.
- **Pull before you write**: run **Obsidian Git: Pull** before starting to avoid conflicts with other contributors.
- **Wikilink autocomplete**: Obsidian will suggest existing filenames as you type `[[` — use this to avoid slug typos.
- **The graph updates on every deploy**: new nodes and edges appear automatically after you push.
