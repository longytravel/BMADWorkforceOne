# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel (Free Tier)
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **CDN/Edge:** Automatic via Vercel Edge Network (300+ global locations)

**Backend Deployment:**
- **Platform:** N/A (client-side only)

---

## CI/CD Pipeline

```yaml
# .github/workflows/vercel-deploy.yml (Optional - Vercel auto-deploys by default)
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run typecheck

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build

      # Vercel handles actual deployment automatically
      # This workflow just validates code quality
```

**Deployment Flow:**
1. Developer pushes code to GitHub `main` branch
2. Vercel detects push via GitHub integration
3. Vercel runs `npm run build` automatically
4. Static files deployed to global edge network (~60 seconds)
5. Live URL updated: `https://wfm-demo.vercel.app`

**Preview Deployments:**
- Every PR gets unique preview URL: `https://wfm-demo-git-feature-branch.vercel.app`
- Test changes before merging to production
- Automatic cleanup when PR closed

---

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| **Development** | `http://localhost:5173` | N/A | Local development with HMR |
| **Preview** | `https://wfm-demo-git-*.vercel.app` | N/A | PR preview deployments |
| **Production** | `https://wfm-demo.vercel.app` | N/A | Live demo environment |

**Custom Domain (Optional):**
- Can add custom domain (e.g., `demo.wfm-intelligence.com`) via Vercel dashboard
- Free SSL certificate included
- DNS configuration required

---
