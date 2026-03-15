# Personal Website Redesign — Design Spec

## Overview

Redesign nicholas ching's personal website from a Bootstrap-based academic portfolio into a custom vanilla HTML/CSS/JS professional site with a systems-engineering aesthetic. The site should position Nicholas as a software engineer who builds reliable, performant systems — subtly signaling interest in distributed computing and low-latency infrastructure without explicitly stating career goals.

## Goals

- Present a professional engineering identity (not academic)
- Lead with "Software Engineer" — Garda Capital Partners and Columbia University are supporting context
- Showcase systems-oriented projects and technical writing
- Clean, systematic visual design that reflects the kind of work Nicholas does
- Light mode default with warm dark mode toggle

## Non-Goals

- No static site generator or build tooling — plain HTML/CSS/JS served from GitHub Pages
- No resume PDF link
- No skills lists, experience timelines, or testimonials
- No profile photo in hero
- No Open Graph / SEO meta tags (can add later)
- No syntax highlighting library for blog code blocks (plain `<pre><code>` for now)
- No accessibility audit (reasonable contrast for primary text; muted text colors are intentionally low-contrast for visual hierarchy)

## Site Structure

### Pages

1. **`index.html`** — Single-page homepage with all sections
2. **`blog/*.html`** — Individual blog post pages

### Homepage Sections (top to bottom)

1. **Nav** — Sticky, translucent with backdrop blur. Logo (`nc`), anchor links (`projects`, `writing`), dark mode toggle. All lowercase, monospace.
2. **Hero** — Two-column grid. Left: overline "Software Engineer", name, bio paragraph, GitHub + LinkedIn buttons. Right: animated system architecture node diagram.
3. **Divider** — Thin horizontal rule.
4. **Projects + Writing** — Side-by-side two-column grid (projects wider on left, writing on right).
5. **Footer** — `© {dynamic year} nicholas ching` + `nc2935@columbia.edu`, monospace. Year via `new Date().getFullYear()`.

### Blog Post Pages

- Narrow centered column (~650px max-width)
- Same fonts, grid background, and nav as homepage
- Title, date, then content
- Logo link (`nc`) in nav navigates back to homepage (no dedicated back arrow)
- Each post is a hand-authored HTML file using a consistent boilerplate structure
- Code blocks use `<pre><code>` with IBM Plex Mono — no syntax highlighting library (keep it simple, can add later)

## Visual Design

### Typography

- **IBM Plex Sans** — Body text, bio, project descriptions, blog content
- **IBM Plex Mono** — Nav links, logo, section headers, tech tags, dates, code snippets

### Color Palette

**Light mode (default):**
- Background: `#f7f7f5` (warm off-white)
- Text: `#1a1a1a`
- Secondary text: `#555`, `#666`
- Muted text: `#999`, `#bbb`
- Borders: `#e0e0dc`
- Accent: `#4a6cf7` (blue — used in diagram, hover states)
- Cards: `#fff`
- Tags: `#eeeee9` background

**Dark mode:**
- Background: `#1a1a1e` (warm charcoal)
- Text: `#e8e8e4`
- Cards: `#242428`
- Borders: `#333338`
- Accent: `#6b8aff` (slightly lighter blue)
- Tag background: `#2a2a2e`
- All colors managed via CSS custom properties on `:root` and `[data-theme="dark"]`

### Grid Background

Faint graph-paper grid lines (`rgba(0,0,0,0.03)` in light, `rgba(255,255,255,0.03)` in dark) at 40px intervals. Applied via `body::before` pseudo-element, fixed position, `pointer-events: none`.

### Hero Diagram

Animated node graph representing a system architecture:
- 7 nodes labeled: `sys`, `net`, `io`, `core`, `mem`, `log`, `api`
- `core` node is filled (dark background, light text)
- `net`, `mem` nodes use accent color border
- Dashed SVG lines connecting nodes
- 3 pulsing blue dots animating along connections (CSS `@keyframes pulse` using `opacity` and `transform: scale()` only for GPU acceleration)
- Coordinate labels (`0,0` and `n,n`) in corners for a technical/research touch

**Node layout and edges** (absolute positioned within a 320x320 container):
```
       [sys]----------[net]
        / \            / \
       /   \          /   \
     [io]  [core]  [mem]
       \    / \      /
        \ /   \    /
       [log]  [api]
```
Edges: sys→core, sys→io, net→core, net→mem, io→log, core→log, core→api, mem→api

The diagram uses a fixed 320x320px container with absolute-positioned `<div>` nodes and an SVG overlay for dashed connection lines. On screens below 768px, the diagram scales down proportionally via `transform: scale()` to fit.

### Interactions

- **Project cards**: Subtle lift (`translateY(-1px)`) and shadow on hover. GitHub link turns accent blue.
- **Blog post rows**: Indent left on hover (`padding-left: 0.5rem`). Title turns accent blue.
- **Nav links**: Color transition on hover.
- **Hero buttons**: Fill to dark background on hover.
- **Dark mode toggle**: Toggle switch element in nav (same as mockup — pill-shaped track with sliding circle). Swaps CSS custom properties via JS, smooth `0.3s` transition on `background-color` and `color`.

### Responsive Behavior

Breakpoint: **768px**.

- **Above 768px**: Two-column hero, side-by-side projects + writing, full nav
- **Below 768px**: Single-column hero (diagram below text, scaled down), stacked projects then writing, nav stays horizontal with reduced gap (1rem) and smaller font
- Grid background remains on all sizes

## Content

### Hero Bio

```
Software Engineer at Garda Capital Partners.
MS Computer Science, Columbia University.
I build reliable, performant systems — interested in distributed computing,
low-latency infrastructure, and data systems.
```

### Projects

#### jaq
- **Tags**: C++, Bazel, SIMD, coroutines
- **Description**: High-performance polyglot data query tool with interactive TUI. Streaming coroutines for memory-efficient processing, SIMD-accelerated parsing across JSON, YAML, TOML, and INI.
- **Link**: https://github.com/tzhouhc/cs4995-project

#### ShockNet
- **Tags**: Haskell, parallelism, graphs
- **Description**: Parallel graph computation engine implementing the Independent Cascade Model with Haskell parallelization primitives for concurrent network diffusion simulation.
- **Link**: https://github.com/nick-ching23/ShockNet

#### Boop
- **Tags**: Python, BERT, NLP
- **Description**: Fine-tuned BERT model for detecting self-harm risk in social media posts. Winner, Best Mental Health Project — Columbia ADI Hackathon 2024.
- **Link**: https://github.com/nick-ching23/Boop

### Writing

Blog posts will be created as separate HTML files in a `blog/` directory. The homepage shows a preview list with title, date (`YYYY.MM` format), and one-line summary. Placeholder entries for initial build:

1. **"On Designing Low-Latency Data Pipelines"** — `2026.03` — "Where the bottlenecks actually are in real-time ingestion at scale."
2. **"Why Haskell Made Me a Better Systems Programmer"** — `2026.02` — "How types and purity changed the way I write C++ and reason about concurrency."
3. **"Building a Query Engine in C++"** — `2026.01` — "Parsing, evaluation, and the surprising cost of string copies."

These are placeholder titles. Blog post pages will be created empty (title + date only) and content written later.

## Technical Implementation

### File Structure

```
/
├── index.html          # Homepage
├── styles.css          # All styles (light + dark theme via custom properties)
├── script.js           # Dark mode toggle + any minimal interactions
├── blog/
│   ├── post-1.html     # Individual blog posts
│   └── ...
├── favicon.png         # Renamed from "laughing (1).png"
└── profile_pic.jpg     # Can be removed from git (unused)
```

### Dark Mode Implementation

```js
// Toggle data-theme attribute on <html>
// Persist preference to localStorage
// Check system preference on first load via prefers-color-scheme
```

CSS custom properties on `:root` (light) and `[data-theme="dark"]` for all color values.

### What Gets Removed

- Bootstrap CSS/JS CDN links
- jQuery dependency
- `N Ching Resume.pdf` link (file can stay, just not linked)
- Profile photo from layout
- "Distributed Systems Resources" nav link
- "Recent News" timeline section
- Veritas and Lucidity project cards

### What Gets Added

- IBM Plex fonts (Google Fonts CDN)
- CSS custom properties for theming
- Dark mode toggle (JS + localStorage)
- SVG node diagram in hero
- `blog/` directory structure
- Grid background effect
- jaq project card

## Deployment

No changes — continues to deploy via GitHub Pages from the `main` branch. No build step required.
