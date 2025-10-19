# BMad Flow Visualization - Developer Guide

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [How to Add New Artifacts](#how-to-add-new-artifacts)
- [How to Update Existing Artifacts](#how-to-update-existing-artifacts)
- [GitHub Integration](#github-integration)
- [Component Details](#component-details)
- [Styling and Customization](#styling-and-customization)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## Overview

The **BMad Flow Visualization** is an interactive page that showcases the complete 12-phase BMad methodology workflow. It includes:

- **Interactive Mermaid flowchart** showing all phases with clickable nodes
- **Phase detail cards** displaying outputs and artifacts for each phase
- **Document viewer modal** that loads full markdown documents from GitHub
- **Real project artifacts** from the BMAD Workforce One project

**Live URL:** `/bmad-flow` (accessible via navigation in the app header)

### Key Features

✅ **Click phase nodes** → Expands phase details below diagram
✅ **Click artifacts** → Opens full document in scrollable modal
✅ **GitHub integration** → Fetches markdown content from repository
✅ **Responsive design** → Works on all screen sizes
✅ **Easy to update** → Single configuration file for all phases and artifacts

---

## Architecture

### Component Hierarchy

```
BmadFlowPage (Main Page)
├── BmadFlowDiagram (Interactive Mermaid Chart)
├── Phase Detail Card (Conditionally rendered when phase selected)
│   └── ArtifactCard (Multiple per phase)
└── DocumentViewerModal (Full document viewer)
```

### Data Flow

```
1. User clicks phase node in Mermaid diagram
   ↓
2. BmadFlowPage updates selectedPhaseId state
   ↓
3. Phase details expand below diagram
   ↓
4. User clicks artifact card
   ↓
5. DocumentViewerModal opens
   ↓
6. fetchGitHubContentCached() fetches markdown from GitHub
   ↓
7. ReactMarkdown renders content in modal
```

---

## File Structure

### Core Files

```
wfm-intelligence-demo/
├── src/
│   ├── pages/
│   │   └── BmadFlowPage.tsx          # Main page component
│   ├── components/
│   │   ├── BmadFlowDiagram.tsx       # Mermaid flowchart
│   │   └── DocumentViewerModal.tsx   # Full document viewer
│   ├── data/
│   │   └── bmadPhases.ts             # ⭐ PHASE CONFIGURATION (edit this!)
│   ├── utils/
│   │   └── githubContent.ts          # GitHub content fetcher
│   └── components/ui/
│       ├── dialog.tsx                # Shadcn Dialog component
│       ├── accordion.tsx             # Shadcn Accordion (legacy)
│       ├── card.tsx                  # Shadcn Card component
│       └── button.tsx                # Shadcn Button component
```

### Key Configuration File

**`src/data/bmadPhases.ts`** - This is where you manage all phases and artifacts!

---

## How to Add New Artifacts

### Step 1: Add the file to your GitHub repository

Ensure the new document is committed to the repository at:
```
https://github.com/longytravel/BMADWorkforceOne
```

Example path:
```
docs/stories/2.1.build-cvd-heatmap.md
```

### Step 2: Edit `bmadPhases.ts`

Open: `src/data/bmadPhases.ts`

Find the phase where you want to add the artifact (e.g., Phase VIII for a new story):

```typescript
{
  id: 'phase-8',
  phase: 'VIII. Execution: Story Drafting',
  agentName: 'Bob',
  // ... other fields
  artifacts: [
    // Existing artifacts...

    // ADD YOUR NEW ARTIFACT HERE:
    {
      name: 'Story 2.1 - Build CvD Heatmap',
      githubPath: 'docs/stories/2.1.build-cvd-heatmap.md',
      description: 'Interactive heatmap showing capacity vs demand',
      highlights: [
        'Status: Ready for Review ✓',
        '15-minute interval grid (7 days x 96 intervals)',
        'Color-coded service level indicators',
        'Hover tooltips with coverage stats',
        'Click-to-drill-down modal'
      ]
    }
  ]
}
```

### Step 3: (Optional) Add file size

If you want to display the file size badge:

```typescript
{
  name: 'Story 2.1 - Build CvD Heatmap',
  githubPath: 'docs/stories/2.1.build-cvd-heatmap.md',
  description: 'Interactive heatmap showing capacity vs demand',
  size: '18 KB',  // ← Add this
  highlights: [...]
}
```

### Step 4: Save and test

1. Save `bmadPhases.ts`
2. The page will hot-reload automatically
3. Click Phase VIII → Your new artifact should appear
4. Click the artifact → Document should load from GitHub

---

## How to Update Existing Artifacts

### Update Highlights or Description

Edit the artifact in `bmadPhases.ts`:

```typescript
{
  name: 'Brainstorming Session Results',
  githubPath: 'docs/brainstorming-session-results.md',
  description: 'Role Playing & What-If Scenarios - 50+ ideas generated', // ← Changed from 47+ to 50+
  size: '26 KB', // ← Updated size
  highlights: [
    'Techniques: Role Playing (4 perspectives), What If Scenarios',
    '50+ distinct concepts and features identified', // ← Updated
    // ... rest of highlights
  ]
}
```

### Change Phase Outputs

Edit the `outputs` array for any phase:

```typescript
{
  id: 'phase-1',
  phase: 'I. Planning: Project Definition',
  // ...
  outputs: [
    'Project Brief',
    'Market Research',
    'Competitive Analysis',
    'Brainstorming Results',
    'User Research Summary' // ← Add new output
  ],
  // ...
}
```

---

## GitHub Integration

### How It Works

The app fetches content from GitHub using raw URLs:

**Format:**
```
https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}/{githubPath}
```

**Example:**
```
https://raw.githubusercontent.com/longytravel/BMADWorkforceOne/main/docs/brainstorming-session-results.md
```

### Configuration

Edit these constants in `src/data/bmadPhases.ts`:

```typescript
export const GITHUB_REPO = 'longytravel/BMADWorkforceOne';
export const GITHUB_BRANCH = 'main';
```

### Caching

Documents are cached in memory after first load to improve performance.

To **clear the cache** (for testing):

```typescript
import { clearContentCache } from '@/utils/githubContent';

clearContentCache(); // Clears all cached documents
```

### Local Development vs Production

- **Local dev:** Fetches from GitHub (requires internet)
- **Production (Vercel):** Fetches from GitHub (same behavior)

**Note:** The app does NOT read local files. All content comes from GitHub, even in development.

---

## Component Details

### BmadFlowPage.tsx

**Purpose:** Main page component that orchestrates the entire flow visualization.

**Key State:**
- `selectedPhaseId` - Which phase is currently expanded
- `selectedArtifact` - Which artifact document is being viewed
- `isModalOpen` - Whether document modal is visible

**Key Functions:**
- `handlePhaseClick(phaseId)` - Expands/collapses phase details
- `handleArtifactClick(artifact)` - Opens document modal

---

### BmadFlowDiagram.tsx

**Purpose:** Renders interactive Mermaid flowchart.

**How it works:**
1. Initializes Mermaid with custom theme colors
2. Renders flowchart definition into SVG
3. Attaches click handlers to phase nodes
4. Calls `onPhaseClick` callback when user clicks a node

**Customization:**

To change diagram colors, edit `themeVariables` in `useEffect`:

```typescript
themeVariables: {
  primaryColor: '#0d9488',      // Teal - Planning phases
  primaryTextColor: '#fff',     // White text
  primaryBorderColor: '#0f766e', // Dark teal border
  lineColor: '#64748b',         // Gray arrows
  secondaryColor: '#8b5cf6',    // Purple - Quality gates
  tertiaryColor: '#3b82f6',     // Blue - Execution phases
}
```

To change the flowchart structure, edit `getMermaidDefinition()` function.

---

### DocumentViewerModal.tsx

**Purpose:** Displays full markdown documents in a scrollable modal.

**How it works:**
1. Receives `artifact` prop with `githubPath`
2. Calls `fetchGitHubContentCached()` to load content
3. Shows loading spinner while fetching
4. Renders markdown using `ReactMarkdown`
5. Displays highlights at bottom

**Features:**
- Max width: 6xl (1280px)
- Max height: 90vh (90% of viewport)
- Scrollable content area
- Error handling with user-friendly messages

---

### githubContent.ts

**Purpose:** Utility for fetching content from GitHub.

**Functions:**

```typescript
// Fetch content (no caching)
fetchGitHubContent(githubPath: string): Promise<FetchContentResult>

// Fetch with caching
fetchGitHubContentCached(githubPath: string): Promise<FetchContentResult>

// Clear cache
clearContentCache(): void
```

**Error Handling:**
Returns `{ content: '', error: 'message' }` on failure.

---

## Styling and Customization

### Colors

The page uses a consistent color scheme:

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Planning Phases | Blue | `bg-blue-500` |
| Transition Phase | Orange | `bg-orange-500` |
| Execution Phases | Teal | `bg-teal-500`, `bg-teal-600` |
| Quality Gates | Purple | `bg-purple-500` |
| Backgrounds | Slate | `bg-slate-50`, `bg-slate-100` |

### Phase Card Styling

Edit `BmadFlowPage.tsx` Phase Detail Card section:

```typescript
<div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white">
  {/* Phase header - Change gradient colors here */}
</div>
```

### Mermaid Diagram Styling

Edit `BmadFlowDiagram.tsx` flowchart definition:

```
classDef planning fill:#3b82f6,stroke:#1e40af,stroke-width:3px,color:#fff
classDef execution fill:#0d9488,stroke:#0f766e,stroke-width:3px,color:#fff
classDef gate fill:#8b5cf6,stroke:#6d28d9,stroke-width:3px,color:#fff
classDef transition fill:#f59e0b,stroke:#d97706,stroke-width:3px,color:#fff
```

---

## Troubleshooting

### ❌ Document won't load

**Symptoms:** Modal opens but shows "Failed to load document" error.

**Causes:**
1. File doesn't exist at the GitHub path
2. Repository is private
3. Network/CORS issue
4. Incorrect `GITHUB_REPO` or `GITHUB_BRANCH` constants

**Solutions:**
- Verify file exists: Visit raw URL in browser
  ```
  https://raw.githubusercontent.com/longytravel/BMADWorkforceOne/main/{githubPath}
  ```
- Check repository is public
- Verify `githubPath` in `bmadPhases.ts` matches actual file location
- Check browser console for network errors

---

### ❌ Phase node not clickable

**Symptoms:** Clicking phase in Mermaid diagram does nothing.

**Causes:**
1. Node ID mismatch between Mermaid and phase data
2. Click handler not attached properly

**Solutions:**
- Check node ID format in `getMermaidDefinition()`:
  ```
  phase-1[I. Project Definition...]
  ```
- Must match `phase.id` in `bmadPhases.ts`:
  ```typescript
  { id: 'phase-1', ... }
  ```
- Clear browser cache and reload

---

### ❌ Mermaid diagram not rendering

**Symptoms:** Blank space where diagram should be.

**Causes:**
1. Mermaid syntax error
2. Mermaid library not loaded
3. Browser compatibility issue

**Solutions:**
- Check browser console for Mermaid errors
- Verify Mermaid definition syntax at https://mermaid.live/
- Test in different browser (Chrome recommended)
- Ensure `mermaid` npm package is installed:
  ```bash
  npm list mermaid
  ```

---

### ❌ Hot reload not working after editing bmadPhases.ts

**Symptoms:** Changes don't appear after saving file.

**Solutions:**
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Restart dev server:
  ```bash
  npm run dev
  ```
- Clear Vite cache:
  ```bash
  rm -rf node_modules/.vite
  npm run dev
  ```

---

## Future Enhancements

### Potential Features to Add

1. **Search/Filter Phases**
   - Add search input to filter phases by keyword
   - Highlight matching artifacts

2. **Artifact Type Icons**
   - Different icons for PRD, Story, Architecture docs
   - Color-coded by document type

3. **Progress Tracking**
   - Show completion percentage per phase
   - Visual indicators for "In Progress" vs "Done"

4. **Export Functionality**
   - Download phase summaries as PDF
   - Export flowchart as PNG/SVG

5. **Artifact Preview Hover**
   - Show first few lines of document on hover
   - Quick preview without opening modal

6. **Timeline View**
   - Alternative visualization showing phases on a timeline
   - Date stamps for when artifacts were created

7. **Local File Fallback**
   - Load from local `docs/` folder if GitHub fetch fails
   - Useful for offline development

8. **Mermaid Diagram Customization UI**
   - Admin panel to customize colors
   - Toggle different diagram types (flowchart, timeline, etc.)

---

## Quick Reference

### Add New Artifact Checklist

- [ ] Commit document to GitHub repository
- [ ] Open `src/data/bmadPhases.ts`
- [ ] Find the correct phase by `id`
- [ ] Add artifact object to `artifacts` array
- [ ] Include: `name`, `githubPath`, `description`, `highlights`
- [ ] (Optional) Add `size` field
- [ ] Save file
- [ ] Test in browser: Click phase → Click artifact → Verify document loads

### Update Phase Checklist

- [ ] Open `src/data/bmadPhases.ts`
- [ ] Find phase by `id`
- [ ] Update fields: `phase`, `agentName`, `agentRole`, `primaryFunction`, `outputs`, `artifacts`
- [ ] Save file
- [ ] Test in browser

### Deploy to Production

1. Commit all changes to GitHub
2. Push to `main` branch
3. Vercel auto-deploys within 1-2 minutes
4. Test at: https://bmad-workforce-one.vercel.app/bmad-flow

---

## Support

**Questions?** Contact the original developer or refer to:
- React Documentation: https://react.dev/
- Mermaid Documentation: https://mermaid.js.org/
- Tailwind CSS: https://tailwindcss.com/
- Shadcn/ui: https://ui.shadcn.com/

---

**Last Updated:** 2025-10-19
**Version:** 1.0
**Maintainer:** James (Developer Agent)
