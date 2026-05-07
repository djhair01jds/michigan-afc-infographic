# Claude Code Ops Guide — Michigan AFC Infographic

## Starting a Session

Each session starts cold — Claude doesn't remember the previous conversation, only what's in the memory files. To get oriented fast, open with:

> "The site is down / X is broken. Here's what happened: [brief description]. Fix it."

The more specific, the faster things move. Vague openers ("something's wrong with analytics") cost a round of questions.

## For Incidents (like the PostHog outage)

Tell Claude:
1. **What broke** — "site is returning a 404" / "PostHog events aren't firing"
2. **When it started** — "after the last deploy" / "sometime this morning"
3. **What changed recently** — paste the last few commits if you know them, or just say "check recent git history"

Claude will check `git log`, DNS, CI runs, and the live bundle from there.

## Key Commands to Know

```bash
# Check what's deployed vs what's in git
git log origin/main --oneline -5

# Verify live bundle matches expected code
curl -s https://michigan.adultfostercare.net/index.html | grep -o 'static/js/main\.[a-z0-9]*\.js'

# Watch CI/deploy status
gh run list --limit 5

# Check DNS
nslookup ph.adultfostercare.net 8.8.8.8
```

## What Claude Remembers Across Sessions

The memory system stores project conventions, architecture, and workflow. Claude can recall:
- Card data structure and facility types
- The full deploy workflow (branch → PR → CI → verify on custom domain)
- Known gotchas (Firebase CDN caching, two-account git credential issue)

Ask "what do you remember about this project?" if you're unsure what's stored.

## The Two-Account Git Issue

If `git push` fails with a 403, run:
```bash
gh auth setup-git
git push origin main
```
This forces git to use the `djhair01jds` token instead of `dhair-dml01`.

## Live Site

Always verify on the custom domain, not `.web.app` (Firebase CDN caches aggressively):
- **Live site:** https://michigan.adultfostercare.net
- **Bundle verification:**
  ```bash
  curl -s https://michigan.adultfostercare.net/index.html | grep -o 'static/js/main\.[a-z0-9]*\.js'
  # then curl that bundle and grep for your expected string
  ```
