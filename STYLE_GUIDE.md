
# Writing Standards Guide

Use this guide for resume, portfolio, case study, and project documentation copy.

## Core Principles

- Lead with business outcomes before technologies. State the result, user impact, scale, or operational improvement first, then name the tools or implementation details.
- Use active voice. Make the actor and action clear.
- Quantify achievements where possible. Prefer measured results, scope, frequency, volume, cost, time, quality, reliability, or adoption metrics.
- Keep paragraphs concise. Use short paragraphs of one to three sentences, especially on portfolio pages and case studies.
- Prefer specific verbs over generic ownership language.

## Outcome-First Writing

Write about why the work mattered before explaining how it was built.

Prefer:

> Reduced onboarding time by 35% by automating account setup with Terraform and GitHub Actions.

Avoid:

> Used Terraform and GitHub Actions to automate account setup.

When exact numbers are unavailable, use defensible scope:

- "Supported 12 internal teams"
- "Processed thousands of records daily"
- "Reduced manual review from hours to minutes"
- "Improved deployment consistency across three environments"

## Voice And Tone

- Use active voice: "Built a reporting pipeline" instead of "A reporting pipeline was built."
- Avoid "Responsible for." Replace it with the action performed and result achieved.
- Use direct, confident phrasing without exaggeration.
- Keep tense consistent. Use past tense for completed roles and projects; use present tense for current responsibilities and live systems.

Examples:

- Replace "Responsible for maintaining dashboards" with "Maintained dashboards used by finance and operations leaders."
- Replace "Helped with migration" with "Migrated legacy workflows to a versioned deployment process."
- Replace "Was involved in improving performance" with "Improved API response time by 40%."

## Quantifying Impact

Add numbers when they clarify scale or impact. Useful categories include:

- Revenue, cost, or budget impact
- Time saved or cycle time reduced
- Users, teams, customers, or stakeholders supported
- Data volume, traffic, requests, jobs, or transactions handled
- Reliability, latency, availability, defect rate, or error rate
- Deployment frequency, lead time, recovery time, or automation coverage

If a metric is approximate, use honest language such as "about," "roughly," or "more than."

## Structure And Headings

- Use one `#` heading for the document title.
- Use `##` for major sections.
- Use `###` only for subsections within a major section.
- Do not skip heading levels.
- Keep headings short and descriptive.
- Use parallel heading phrasing within the same document.

Prefer:

```md
# Project Name
## Summary
## Impact
## Technical Approach
## Results
```

Avoid:

```md
# Project Name
### What Happened
## tools
#### Final outcomes
```

## Paragraphs And Bullets

- Keep paragraphs focused on one idea.
- Use bullets for achievements, responsibilities, feature lists, and scannable details.
- Start bullets with strong verbs when describing work.
- Keep bullet grammar parallel within a list.
- Avoid dense blocks of text longer than four lines in rendered Markdown.

## Capitalization

Use consistent capitalization for technologies, product names, roles, and headings.

- Capitalize official technology, product, platform, and company names as their owners style them: `GitHub`, `JavaScript`, `TypeScript`, `Node.js`, `React`, `PostgreSQL`, `AWS`, `Azure`, `Terraform`, `Kubernetes`.
- Use lowercase for generic technology categories: `cloud platform`, `database`, `frontend`, `backend`, `API`, `data pipeline`.
- Keep acronyms uppercase when commonly styled that way: `API`, `SQL`, `CI/CD`, `HTML`, `CSS`, `SLA`, `SLO`.
- Capitalize a role only when it is a formal title next to a person's name or part of an official job title: `Senior Software Engineer`.
- Use lowercase for general role references: `software engineer`, `product manager`, `engineering leader`, `stakeholder`.
- Use title case for document titles and major headings. Use sentence case for long descriptive headings when title case feels forced.

## Technology Mentions

- Name technologies when they clarify credibility, constraints, or implementation choices.
- Do not lead every sentence with a tool name.
- Avoid long comma-separated tool lists unless the stack itself is the point.
- Tie tools to decisions or outcomes.

Prefer:

> Improved release reliability by introducing automated checks in GitHub Actions and environment parity with Docker.

Avoid:

> GitHub Actions, Docker, Node.js, and PostgreSQL were used for the project.

## Final Review Checklist

Before publishing, check that the writing:

- Opens with impact, user value, or business outcome.
- Uses active voice.
- Replaces "Responsible for" with concrete actions.
- Includes metrics or scale where available.
- Keeps paragraphs short and scannable.
- Uses heading levels consistently.
- Capitalizes technologies, acronyms, and roles consistently.
