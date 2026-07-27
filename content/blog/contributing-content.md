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
- **Commit message**: `vault backup: {{date}}` (or leave as default)

### 5. Publishing your changes

When you are ready to publish:

1. Open the **Command palette** (Cmd+P on Mac, Ctrl+P on Windows)
2. Search for **Obsidian Git: Commit all changes**
3. Then search for **Obsidian Git: Push**

Changes go live on the site within a few minutes after pushing.

> **Note:** Always pull before you start writing to avoid conflicts. Use **Obsidian Git: Pull** from the command palette.

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

---

## Writing a Blog Post

Create a new `.md` file inside `content/blog/`. The filename becomes the URL slug — use lowercase letters and hyphens, no spaces.

**Example:** `content/blog/water-and-soil.md` → `/blog/water-and-soil`

### Frontmatter

Every blog post needs a frontmatter block at the top:

```yaml
---
title: "Water and Soil Health"
date: 2026-07-15
author: Your Name
excerpt: A short summary shown on the blog index page.
tags: [water, soil, agroecology]
links: [biochar, mark-nelson, synergia-ranch]
---

Your post content goes here...
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Displayed as the page heading |
| `date` | Recommended | Used for sorting (YYYY-MM-DD format) |
| `author` | Optional | Shown below the title |
| `excerpt` | Recommended | Preview text on the blog index |
| `tags` | Optional | Displayed as colored chips |
| `links` | Optional | Connects this post to knowledge nodes (see below) |

### Body

Write standard markdown below the frontmatter. You can use:

- `**bold**`, `*italic*`
- `## Headings`
- `- Bullet lists`
- `[link text](https://example.com)`
- `[[node-slug]]` — links to a knowledge node (see below)
- `[[node-slug|custom label]]` — same link with custom display text

---

## Linking to Knowledge Nodes (Wikilinks)

The site has a **knowledge graph** — a network of people, topics, places, and events. You can link to any node from a blog post using double-bracket syntax:

```
[[biochar]]
[[mark-nelson]]
[[synergia-ranch|the ranch]]
```

These render as clickable links that navigate to the node's detail page, which shows that node's notes and all its connections.

To connect a post to the graph (so it appears in the side panel and on node pages), add the node slugs to the `links:` frontmatter field:

```yaml
links: [biochar, water-policy, mark-nelson]
```

The slug is just the filename of the node without the `.mdx` extension. For example, `content/topics/biochar.mdx` has the slug `biochar`.

---

## Creating a Knowledge Node

Knowledge nodes are the entries in the graph. They are MDX files (markdown with optional components) stored in one of four folders based on type.

### Node types

| Type | Folder | Example |
|---|---|---|
| People | `content/people/` | Speakers, contributors |
| Topics | `content/topics/` | Biochar, water policy, permaculture |
| Places | `content/places/` | Synergia Ranch, Spirit Farm |
| Events | `content/events/` | 2026 Water Conference |

### Frontmatter for a knowledge node

```yaml
---
slug: mark-nelson
title: Mark Nelson
type: people
role: Ecologist and co-founder of Biosphere 2
links: [biosphere-2, water-policy, synergia-ranch]
---

Mark Nelson is an ecologist, writer, and pioneer of closed ecological systems...
```

| Field | Required | Description |
|---|---|---|
| `slug` | Yes | Unique identifier used in URLs and links |
| `title` | Yes | Display name |
| `type` | Yes | `people`, `topic`, `place`, or `event` |
| `role` | Optional | Short descriptor shown below the title |
| `links` | Optional | Slugs of connected nodes — this creates graph edges |

### Viewing the graph

After publishing, the full graph is at `/graph`. Clicking any node opens its detail page showing its notes and connections. Blog posts that link to a node appear in a **Related posts** section at the bottom of that node's page.

---

## Tips

- **Filename = slug**: keep filenames lowercase with hyphens. `My File.md` becomes `/blog/My-File` which looks odd in URLs.
- **Pull before you write**: run **Obsidian Git: Pull** before starting to avoid merge conflicts.
- **Links are bidirectional**: if post A links to node B, node B's page will show post A under Related Posts — you only need to add the link in one direction.
- **The graph updates on every deploy**: new nodes and edges appear automatically after you push.
