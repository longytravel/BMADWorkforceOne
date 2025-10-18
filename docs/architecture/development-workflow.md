# Development Workflow

## Local Development Setup

### Prerequisites

```bash
# Required software
node --version    # 18.0.0 or higher
npm --version     # 9.0.0 or higher (or pnpm 8+)
git --version     # 2.30+ for version control
```

### Initial Setup

```bash
# Clone repository (or create new project)
git clone https://github.com/your-org/wfm-intelligence-demo.git
cd wfm-intelligence-demo

# Install dependencies
npm install

# Copy environment template (mostly empty for this demo)
cp .env.example .env.local

# Verify demo data files exist
ls -la public/demo-data/
# Should see: agents.json, schedules.json, cvd-forecast.json, compliance-rules.json
```

### Development Commands

```bash
# Start development server (Vite HMR)
npm run dev
# Opens http://localhost:5173

# Run type checking (no build)
npm run typecheck

# Run linting
npm run lint

# Run unit tests (Vitest)
npm run test

# Run tests in watch mode (re-run on file save)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Build for production
npm run build

# Preview production build locally
npm run preview

# Format code with Prettier
npm run format
```

---

## Environment Configuration

### Required Environment Variables

```bash
# Frontend (.env.local)
# None required for demo! All config is hardcoded or in JSON files.

# Optional for production deployment:
VITE_APP_VERSION=2.0.0
VITE_BUILD_TIMESTAMP=2025-10-20
```

**Rationale:**
- ✅ Zero configuration complexity
- ✅ No API keys or secrets needed
- ✅ Environment variables optional (only for build metadata)

---

## AI Development Tools Setup

### Chrome DevTools MCP (Model Context Protocol)

The project uses Chrome DevTools MCP to enable AI coding assistants to inspect, debug, and analyze the running application in a real Chrome browser.

**Installation (One-time setup):**

```bash
# Install globally
npm install -g chrome-devtools-mcp
```

**Configuration for Claude Code (VS Code):**

Add to VS Code `settings.json` (File → Preferences → Settings → search "claude-code.mcpServers"):

```json
{
  "claude-code.mcpServers": {
    "chrome-devtools": {
      "command": "chrome-devtools-mcp"
    }
  }
}
```

**Restart VS Code** after adding the configuration.

**Capabilities:**
- Navigate to URLs and interact with pages
- Take screenshots of running application
- Read console logs and network requests
- Capture performance traces and Core Web Vitals
- Debug React components in live browser
- Analyze bundle size and load performance
- Execute JavaScript in browser context

**Use Cases:**
- Validate UI rendering during component development
- Debug visual issues without manual browser inspection
- Measure real performance metrics (LCP, CLS, INP)
- Verify responsive design and layout
- Test drag-and-drop interactions
- Capture screenshots for documentation

**Location:** Configuration stored in `C:\Users\User\AppData\Roaming\Code\User\settings.json`

---
