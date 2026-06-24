---
description: Create one or more scheduled articles for this blog. Handles writing the content, creating separate branches, and opening PRs with the correct [publish: YYYY-MM-DD] title token so the auto-merge workflow can pick them up.
argument-hint: "[topic or description of what to write]"
---

You are helping create scheduled articles for the **tulisan** blog, which supports SEO for [Baca-Quran.id](https://www.baca-quran.id/). Read and follow ALL rules below before doing anything.

## Rules from AGENTS.md

!`cat $CLAUDE_PROJECT_DIR/AGENTS.md`

## Existing articles (to avoid keyword cannibalization)

!`find $CLAUDE_PROJECT_DIR/content/blog -name "index.md" | sort | sed 's|.*/content/blog/||;s|/index.md||'`

## Your task

The user wants to schedule: **$ARGUMENTS**

Follow these steps exactly:

### Step 1 — Plan

Before writing anything, present a plan to the user:
- Proposed title, slug, publish date, and target keywords for each article
- Check the existing articles list above — do NOT create articles that would cannibalize existing keywords
- Wait for the user to confirm or adjust the plan

### Step 2 — Write the articles

For each article:
- Create the folder `content/blog/YYYY-MM-DD-slug/` with `index.md` inside
- Follow all writing rules from AGENTS.md (tone, length, format, no em-dashes, bold-headed paragraphs, etc.)
- **YAML rule**: if `title` or `description` contains a colon (`:`), wrap the whole value in double quotes — e.g. `title: "Judul: Subjudul"`. Unquoted colons break the YAML parser and fail CI.
- Include at least one link to `https://www.baca-quran.id/` or a subpage
- Cross-link to related articles using relative paths like `[Title](/slug/)`

### Step 3 — One branch and one PR per article

For **each article separately**:

1. Create a fresh branch from `origin/master`:
   ```
   git checkout origin/master -b scheduled/YYYY-MM-DD-short-slug
   ```
2. Add only that article's folder and commit it
3. Push the branch
4. Open a PR with this exact title format:
   ```
   [publish: YYYY-MM-DD] CONTENT: Article Title Here
   ```
   The `[publish: YYYY-MM-DD]` token is mandatory — the `scheduled-merge.yml` workflow uses it to auto-merge on the right date.
5. Add the **`scheduled`** label to the PR.

**Never put multiple articles in one PR. Never use the same branch for two articles.**

### Step 4 — Report

List all PRs created with their URLs and publish dates.
