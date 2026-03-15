# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign personal website from Bootstrap academic portfolio to custom vanilla HTML/CSS/JS with systems-engineering aesthetic.

**Architecture:** Single-page site (`index.html`) with custom CSS (light/dark via custom properties), minimal JS (dark mode toggle), and a `blog/` directory for individual post pages. No frameworks, no build step.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, grid, flexbox), vanilla JS, IBM Plex fonts (Google Fonts CDN), GitHub Pages deployment.

**Spec:** `docs/superpowers/specs/2026-03-15-website-redesign-design.md`

---

## Chunk 1: Foundation — CSS and Housekeeping

### Task 1: Rename favicon and add .gitignore entry

**Files:**
- Rename: `laughing (1).png` → `favicon.png`
- Create: `.gitignore` (if not exists) or modify to add `.superpowers/`

- [ ] **Step 1: Rename the favicon file**

```bash
cd "/Users/nicholasching/Desktop/Coding Projects/Personal Website/nick-ching23.github.io"
git mv "laughing (1).png" favicon.png
```

- [ ] **Step 2: Add .superpowers/ to .gitignore**

Create or append to `.gitignore`:
```
.superpowers/
.claude/
```

- [ ] **Step 3: Commit**

```bash
git add favicon.png .gitignore
git commit -m "chore: rename favicon, add .gitignore"
```

---

### Task 2: Write the complete CSS file with light/dark theming

**Files:**
- Rewrite: `styles.css`

This replaces the entire existing `styles.css` with the new design system. All colors use CSS custom properties for light/dark mode support.

- [ ] **Step 1: Write `styles.css`**

Complete rewrite with:
- CSS custom properties on `:root` (light) and `[data-theme="dark"]` (dark)
- Light mode colors: bg `#f7f7f5`, text `#1a1a1a`, secondary `#555`, body-secondary `#666`, muted `#999`, muted-light `#bbb`, borders `#e0e0dc`, accent `#4a6cf7`, cards `#fff`, tags `#eeeee9`
- Dark mode colors: bg `#1a1a1e`, text `#e8e8e4`, secondary `#aaa`, body-secondary `#999`, muted `#777`, muted-light `#555`, cards `#242428`, borders `#333338`, accent `#6b8aff`, tags `#2a2a2e`
- Nav background: `rgba(247,247,245,0.85)` light / `rgba(26,26,30,0.85)` dark
- `body::before` pseudo-element for grid background (40px intervals, `rgba(0,0,0,0.03)` light / `rgba(255,255,255,0.03)` dark)
- IBM Plex Sans for body, IBM Plex Mono for nav/labels/tags/code
- Sticky nav with `backdrop-filter: blur(12px)` and translucent background
- Hero: CSS Grid two-column layout, max-width 1000px
- Node diagram: 320x320 container with absolute-positioned nodes, dashed SVG connections, `@keyframes pulse` using only `opacity` and `transform: scale()`
- Two-column grid for projects + writing (1.4fr 1fr)
- Project cards: `var(--color-card)` bg, `var(--color-border)` border, hover: `translateY(-1px)` + `box-shadow: 0 2px 12px rgba(0,0,0,0.04)`
- Post rows: `border-bottom: 1px solid var(--color-border-light)`, hover: `padding-left: 0.5rem`
- Hero links: `var(--color-border)` border, hover: `background: var(--color-text); color: var(--color-bg)` (inverts)
- Toggle switch: 32x18px pill track, 14px circle
- Dark mode transition: `0.3s` on `background-color` and `color`
- Responsive `@media (max-width: 768px)`: single-column hero, stacked projects/writing, scaled diagram, condensed nav
- Blog post page styles: `.blog-post` with max-width 650px, centered, proper `pre code` styling

- [ ] **Step 2: Verify by opening index.html in browser**

At this point the page will look broken (old HTML + new CSS). That's expected — just verify the CSS file loads without errors by checking the browser console.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: complete CSS rewrite with light/dark theming and systems aesthetic"
```

---

## Chunk 2: Homepage HTML

### Task 3: Rewrite index.html — complete homepage

**Files:**
- Rewrite: `index.html`

Replace the entire file. Remove all Bootstrap/jQuery dependencies. Build the new structure from scratch.

- [ ] **Step 1: Write the `<head>` section**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nicholas Ching</title>
  <link rel="icon" href="favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
```

No Bootstrap, no jQuery. Only IBM Plex fonts and our custom CSS.

- [ ] **Step 2: Write the `<nav>` section**

```html
<nav>
  <a href="index.html" class="logo">nc</a>
  <div class="nav-links">
    <a href="#projects">projects</a>
    <a href="#writing">writing</a>
    <button class="toggle" id="theme-toggle" aria-label="Toggle dark mode"></button>
  </div>
</nav>
```

All lowercase, monospace (styled by CSS). Toggle is a `<button>` for accessibility.

- [ ] **Step 3: Write the hero section**

Two-column grid. Left side: overline, name, bio, links. Right side: SVG node diagram.

Bio text (exact copy from spec):
```
Software Engineer at Garda Capital Partners.
MS Computer Science, Columbia University.
I build reliable, performant systems — interested in distributed computing,
low-latency infrastructure, and data systems.
```

Hero links: GitHub (`https://github.com/nick-ching23/`) and LinkedIn (`https://www.linkedin.com/in/nicholas-ching/`), both `target="_blank" rel="noopener"`.

- [ ] **Step 4: Write the hero node diagram**

Inside `.hero-diagram > .diagram-container` (320x320):

7 `<div class="node">` elements with absolute positioning:

| Node | Class | top | left/right |
|------|-------|-----|------------|
| sys | `.node` | 20px | left: 50px |
| net | `.node.accent` | 20px | right: 60px |
| io | `.node` | 130px | left: 10px |
| core | `.node.filled` | 120px | left: 132px |
| mem | `.node.accent` | 130px | right: 30px |
| log | `.node` | bottom: 40px | left: 60px |
| api | `.node` | bottom: 30px | right: 70px |

Each node is 56x56px with 1.5px border, 4px border-radius, centered label text in IBM Plex Mono 0.6rem.

SVG overlay (`viewBox="0 0 320 320"`, class `connections`) with dashed `<line>` elements (`stroke-dasharray: 4 3`):

| Edge | x1,y1 → x2,y2 |
|------|----------------|
| sys→core | 78,48 → 160,148 |
| sys→io | 78,48 → 38,158 (accent) |
| net→core | 232,48 → 160,148 |
| net→mem | 232,48 → 262,158 (accent) |
| io→log | 38,158 → 88,252 |
| core→log | 160,148 → 88,252 (accent) |
| core→api | 160,148 → 222,262 |
| mem→api | 262,158 → 222,262 |

3 `<div class="pulse-dot">` at connection midpoints with staggered delays (0s, 0.7s, 1.4s):
- pd1: top: 95px, left: 95px
- pd2: top: 85px, right: 100px
- pd3: bottom: 85px, left: 130px

Coordinate labels: `<span class="coord-label">` with `0,0` top-left and `n,n` bottom-right.

- [ ] **Step 4b: Write the divider between hero and projects+writing**

```html
<div class="divider"><hr></div>
```

Thin horizontal rule separating the hero from the content grid. Styled by CSS (max-width 1000px, horizontal padding matching sections, `border-top: 1px solid var(--color-border)`).

- [ ] **Step 5: Write the projects section**

```html
<section class="section" id="projects">
```

Left column of two-col grid. Section header: uppercase mono "PROJECTS" with thick bottom border.

3 project cards, each with:
- `.project-card` container
- `.project-top` with `<h3>` title and `.tech-tags` div containing `<span class="tech-tag">` elements
- `.project-desc` paragraph
- `.project-link` anchor: `→ github` linking to the repo URL, `target="_blank" rel="noopener"`

Projects in order: jaq, ShockNet, Boop (content from spec).

- [ ] **Step 6: Write the writing section**

Right column of two-col grid. Section header: "WRITING" with "all →" link (`href="#"` — placeholder, no blog index page yet).

3 post rows, each with:
- `.post-row` container
- `.post-meta` div with `.post-title` span and `.post-date` span
- `.post-preview` paragraph

Posts (from spec):
1. "On Designing Low-Latency Data Pipelines" — 2026.03
2. "Why Haskell Made Me a Better Systems Programmer" — 2026.02
3. "Building a Query Engine in C++" — 2026.01

Post titles link to `blog/post-1.html`, `blog/post-2.html`, `blog/post-3.html`.

- [ ] **Step 7: Write the footer**

```html
<footer>
  <span>© <span id="year"></span> nicholas ching</span>
  <a href="mailto:nc2935@columbia.edu">nc2935@columbia.edu</a>
</footer>
```

The `#year` span is populated by `script.js`.

- [ ] **Step 8: Add script tag and close**

```html
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 9: Open in browser and verify layout**

Check:
- Nav is sticky, translucent, lowercase mono
- Hero two-column with diagram on right
- Diagram nodes visible, connections dashed, dots pulsing
- Projects and writing side by side
- Footer at bottom with email
- No console errors

- [ ] **Step 10: Commit**

```bash
git add index.html
git commit -m "feat: complete homepage rewrite with systems-engineering design"
```

---

## Chunk 3: JavaScript and Blog Pages

### Task 4: Write script.js — dark mode toggle and dynamic year

**Files:**
- Rewrite: `script.js`

- [ ] **Step 1: Write `script.js`**

```javascript
// Dark mode toggle
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check saved preference, then system preference
const saved = localStorage.getItem('theme');
if (saved) {
  html.setAttribute('data-theme', saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.setAttribute('data-theme', 'dark');
}

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Dynamic copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
```

- [ ] **Step 2: Verify in browser**

- Click toggle: background, text, cards, borders, grid lines all swap
- Refresh page: preference persists
- Footer shows current year

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat: dark mode toggle with localStorage persistence and dynamic year"
```

---

### Task 5: Create blog directory and placeholder post pages

**Files:**
- Create: `blog/post-1.html` (On Designing Low-Latency Data Pipelines)
- Create: `blog/post-2.html` (Why Haskell Made Me a Better Systems Programmer)
- Create: `blog/post-3.html` (Building a Query Engine in C++)

Each blog post uses the same boilerplate:

- [ ] **Step 1: Create `blog/` directory**

```bash
mkdir -p blog
```

- [ ] **Step 2: Write `blog/post-1.html`**

Boilerplate structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>On Designing Low-Latency Data Pipelines — Nicholas Ching</title>
  <link rel="icon" href="../favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <nav>
    <a href="../index.html" class="logo">nc</a>
    <div class="nav-links">
      <a href="../index.html#projects">projects</a>
      <a href="../index.html#writing">writing</a>
      <button class="toggle" id="theme-toggle" aria-label="Toggle dark mode"></button>
    </div>
  </nav>

  <article class="blog-post">
    <p class="post-date">2026.03</p>
    <h1>On Designing Low-Latency Data Pipelines</h1>
    <p>Coming soon.</p>
  </article>

  <footer>
    <span>© <span id="year"></span> nicholas ching</span>
    <a href="mailto:nc2935@columbia.edu">nc2935@columbia.edu</a>
  </footer>

  <script src="../script.js"></script>
</body>
</html>
```

- [ ] **Step 3: Write `blog/post-2.html`**

Same boilerplate. Title: "Why Haskell Made Me a Better Systems Programmer", date: 2026.02.

- [ ] **Step 4: Write `blog/post-3.html`**

Same boilerplate. Title: "Building a Query Engine in C++", date: 2026.01.

- [ ] **Step 5: Verify blog pages in browser**

- Open each post directly — nav works, dark mode toggle works, fonts load
- Click `nc` logo — navigates back to homepage
- Click nav links — navigates to homepage sections

- [ ] **Step 6: Verify homepage links to blog posts**

- Click each writing entry on homepage — navigates to correct blog post

- [ ] **Step 7: Commit**

```bash
git add blog/
git commit -m "feat: add blog post placeholder pages"
```

---

## Chunk 4: Cleanup and Final Verification

### Task 6: Remove unused files and verify everything

**Files:**
- Remove from git: `profile_pic.jpg` (optional — can keep file, just not referenced)
- Remove from git: `N Ching Resume.pdf` link (already not referenced in new HTML)
- Verify: no references to Bootstrap, jQuery, or old files remain

- [ ] **Step 1: Verify no old references remain**

Search `index.html` and blog pages for:
- `bootstrap` — should not appear
- `jquery` — should not appear
- `profile_pic` — should not appear
- `laughing` — should not appear
- `distributed_systems` — should not appear

- [ ] **Step 2: Full browser test — light mode**

Open `index.html`:
- [ ] Nav: sticky, translucent, `nc` logo, `projects`, `writing`, toggle
- [ ] Hero: two columns, bio on left, node diagram on right
- [ ] Diagram: nodes visible, dashed connections, pulsing dots
- [ ] Projects: 3 cards (jaq, ShockNet, Boop) with tech tags
- [ ] Writing: 3 post rows with titles, dates, previews
- [ ] Footer: dynamic year, email link
- [ ] All GitHub links open in new tab
- [ ] Anchor links scroll to correct sections

- [ ] **Step 3: Full browser test — dark mode**

Click toggle:
- [ ] Background changes to warm charcoal
- [ ] Text, cards, borders, tags all swap colors
- [ ] Grid lines adapt
- [ ] Diagram nodes adapt (filled node stays visible)
- [ ] Toggle state persists on refresh

- [ ] **Step 4: Mobile test (resize to < 768px)**

- [ ] Hero collapses to single column (diagram below text)
- [ ] Projects and writing stack vertically
- [ ] Nav stays horizontal with tighter spacing
- [ ] No horizontal overflow

- [ ] **Step 5: Test blog post pages**

- [ ] Each post loads with correct title and date
- [ ] Dark mode toggle works on blog pages
- [ ] Nav links navigate back to homepage

- [ ] **Step 6: Final commit if any fixes were needed**

```bash
git add index.html styles.css script.js blog/
git commit -m "fix: final cleanup and polish"
```
