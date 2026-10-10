#!/usr/bin/env bash
# One-shot publish: creates the public GitHub repo, pushes main, links + deploys to Vercel production,
# and connects Vercel's Git integration so every push (including the daily bot commits) redeploys.
#
# Requirements on your machine (one-time logins):
#   gh auth login          # GitHub CLI
#   npm i -g vercel && vercel login
#
# Usage:  bash scripts/ship.sh            (repo name defaults to anti-ai-ui-vault)
#         REPO=my-vault bash scripts/ship.sh
set -euo pipefail

REPO="${REPO:-anti-ai-ui-vault}"
cd "$(dirname "$0")/.."

command -v gh >/dev/null || { echo "Install GitHub CLI: https://cli.github.com"; exit 1; }
command -v vercel >/dev/null || { echo "Install Vercel CLI: npm i -g vercel"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run: gh auth login"; exit 1; }
vercel whoami >/dev/null 2>&1 || { echo "Run: vercel login"; exit 1; }

# 1) Git
if [ ! -d .git ]; then
  git init -b main
  git add -A
  git commit -m "feat: initial Specimen"
fi
git branch -M main

# 2) GitHub (public)
OWNER="$(gh api user --jq .login)"
if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "• GitHub repo $OWNER/$REPO exists — pushing"
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin main
else
  gh repo create "$REPO" --public --source=. --remote=origin --push \
    --description "Specimen (דוגמית) — full website designs and animated UI components with copy-ready Claude prompts."
fi
# Workflows need write permission for the daily bot commit
gh api -X PUT "repos/$OWNER/$REPO/actions/permissions/workflow" -f default_workflow_permissions=write >/dev/null || true

# 3) Vercel: link, connect Git (auto-deploy on push), deploy production
vercel link --yes --project "$REPO"
vercel git connect "https://github.com/$OWNER/$REPO" --yes || echo "• Git already connected (or connect it in Vercel → Project → Settings → Git)"
vercel env add NEXT_PUBLIC_REPO_URL production <<<"https://github.com/$OWNER/$REPO" >/dev/null 2>&1 || true
URL="$(vercel deploy --prod --yes)"

echo
echo "────────────────────────────────────────────"
echo " GitHub : https://github.com/$OWNER/$REPO"
echo " Vercel : $URL"
echo "────────────────────────────────────────────"
echo "Optional: gh secret set ANTHROPIC_API_KEY   # lets the daily job write new components with Claude"
echo "Optional: vercel env add LEAD_WEBHOOK_URL production   # where lead-form submissions are sent"
echo "Test the daily job now: gh workflow run daily-vault-update.yml -f force=true"
