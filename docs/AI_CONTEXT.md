# AI Context

This file is the permanent operating manual for AI assistants working on this repository. It exists to preserve repository intent, content ownership, writing standards, and workflow expectations across GitHub Copilot, Codex, ChatGPT, Claude, Gemini, and any future AI-supported editing tools.

Every AI assistant must read this document before making repository changes. The repository is a long-term executive career portfolio, not a one-off resume conversion project. Changes must improve the quality, consistency, maintainability, and reuse of the professional knowledge base.

# Repository Vision

This repository is a Markdown-first, Docs-as-Code executive career portfolio. Its long-term purpose is to act as the single source of truth for professional content across resumes, portfolio pages, websites, LinkedIn material, architecture case studies, technical articles, presentation content, interview preparation, and future publications.

The repository should remain:

- Markdown-first, so source content is portable, reviewable, version-controlled, and automation-ready.
- Modular, so each file owns one type of information and can be reused across outputs.
- Docs-as-Code, so content evolves through small, reviewable changes with clear history.
- Automation-ready, so future scripts can generate resumes, websites, PDFs, DOCX files, LinkedIn drafts, and portfolio pages from trusted source files.
- Maintainable over the long term, so career history, project narratives, skills, and architecture knowledge can be updated without duplication.

# Repository Objectives

- Maintain executive-quality documentation for senior architecture, technology, and leadership roles.
- Support ATS optimization through structured, keyword-rich, factual Markdown content.
- Prepare interview narratives, project talking points, and leadership examples.
- Generate website-ready content for GitHub Pages or another static publishing system.
- Generate executive and ATS resume variants from reusable source files.
- Generate portfolio pages for architecture, AI, cloud, transformation, and project case studies.
- Generate LinkedIn profile content from the same factual source material.
- Preserve professional knowledge in a reusable, searchable, version-controlled format.
- Avoid duplicated, inconsistent, or unverified claims across professional artifacts.

# Candidate Profile

The candidate is a senior technology leader with 20+ years of experience across enterprise architecture, solution architecture, cloud-native platforms, AI and Agentic AI, banking, insurance, retail, healthcare, telecom, and enterprise software delivery.

The current profile emphasizes:

- Enterprise Architecture and Solution Architecture across complex business domains.
- AI, GenAI, Agentic AI, RAG, LangChain, LangGraph, Model Context Protocol, and AWS Bedrock.
- Cloud-native architecture and AWS-based modernization.
- Banking and financial services, including core banking, trade finance, payments, KYC, digital banking, and regulatory systems.
- Insurance and healthcare digital platforms.
- Retail and mobile commerce platforms.
- Leadership across technical delivery, architecture governance, stakeholder engagement, mentoring, estimation, capacity planning, and cross-functional execution.
- Digital transformation through modernization of monolithic platforms, API-led architecture, cloud adoption, mobile channels, and enterprise integration.
- Technology strategy that connects business outcomes, architecture decisions, delivery governance, and measurable impact.

Do not invent profile details. If a fact is not present in repository source material, mark it with `TODO:` instead of guessing.

# Target Roles

## Primary

- Principal Enterprise Architect
- Principal Solution Architect
- Enterprise AI Architect
- Chief Architect
- Distinguished Engineer

## Secondary

- GenAI Architect
- AI Architect
- Enterprise Integration Architect
- Technology Consultant

# Repository Structure

## `incoming/`

Purpose: Stores original source material imported into the repository.

Expected content:

- Original resumes.
- LinkedIn exports.
- Source documents supplied by the candidate.
- Unmodified raw inputs used for analysis.

Examples:

- `incoming/Kunal_Patil_Resume_July_2026.docx`
- `incoming/Kunal_Patil_JAVA_11_years_Resume.docx`
- `incoming/LinkedIn Profile.pdf`

Relationship with other folders: `incoming/` is the evidence layer. Content may be analyzed and rewritten into `resume/`, `portfolio/`, `website/`, and `linkedin/`, but files in `incoming/` must not be modified.

## `resume/`

Purpose: Owns professional resume source content.

Expected content:

- Executive summary.
- Career highlights.
- Core competencies.
- Technical skills.
- Certifications.
- Education.
- Awards.
- Employer experience pages.
- Resume variants such as master, executive, and ATS versions.

Examples:

- `resume/executive-summary.md`
- `resume/career-highlights.md`
- `resume/core-competencies.md`
- `resume/technical-skills.md`
- `resume/experience/nagarro.md`
- `resume/versions/executive.md`
- `resume/versions/ats.md`

Relationship with other folders: `resume/` should use verified facts from `incoming/` and `docs/resume-analysis.md`. It can reference `portfolio/projects/` once project files are complete.

## `portfolio/`

Purpose: Owns architecture knowledge, case studies, project narratives, and portfolio-level technical content.

Expected content:

- Architecture capability pages.
- AI and GenAI architecture pages.
- Cloud transformation pages.
- Enterprise architecture pages.
- Project case studies.

Examples:

- `portfolio/ai-architecture.md`
- `portfolio/cloud-transformation.md`
- `portfolio/enterprise-architecture.md`
- `portfolio/projects/agentic-ops.md`
- `portfolio/projects/national-home-loan.md`

Relationship with other folders: `portfolio/` expands resume facts into richer case studies, architecture decisions, trade-offs, outcomes, and interview-ready project narratives.

## `website/`

Purpose: Planned folder for website presentation content.

Expected content:

- Home page copy.
- About page copy.
- Resume page copy.
- Projects page copy.
- AI or architecture portfolio page copy.
- Contact page copy.

Examples:

- `website/home.md`
- `website/about.md`
- `website/resume.md`
- `website/projects.md`
- `website/contact.md`

Relationship with other folders: `website/` should present curated content from `resume/` and `portfolio/`. It is a presentation layer, not the source of truth for facts. This folder may not exist yet; create it only when the relevant milestone asks for it.

## `linkedin/`

Purpose: Planned folder for LinkedIn-specific profile content.

Expected content:

- Headline.
- About section.
- Experience summaries.
- Featured content.
- Post drafts or professional networking copy if requested.

Examples:

- `linkedin/headline.md`
- `linkedin/about.md`
- `linkedin/experience.md`
- `linkedin/featured.md`

Relationship with other folders: `linkedin/` adapts verified facts from `resume/` and `portfolio/` for professional networking. It should not introduce new facts that are absent from source material. This folder may not exist yet; create it only when requested.

## `docs/`

Purpose: Owns repository operating documentation, phase plans, analysis reports, review reports, and contributor guidance.

Expected content:

- AI and Codex instructions.
- Phase plans.
- Resume analysis.
- Employer review notes.
- Documentation indexes.
- Architecture notes.
- Roadmaps and task plans.

Examples:

- `docs/AI_CONTEXT.md`
- `docs/CODEX_INSTRUCTIONS.md`
- `docs/PHASE-4.md`
- `docs/TASKS.md`
- `docs/resume-analysis.md`
- `docs/employer-review.md`
- `docs/README.md`

Relationship with other folders: `docs/` governs how content should be created, reviewed, and maintained. It should describe process and decisions, not duplicate long-form resume or project content.

## `templates/`

Purpose: Provides reusable structures for consistent content creation.

Expected content:

- Project templates.
- Company templates.
- Article templates.
- Front matter templates.
- Architecture decision templates.

Examples:

- `templates/project-template.md`
- `templates/company-template.md`
- `templates/article-template.md`
- `templates/front-matter.md`
- `templates/adr-template.md`

Relationship with other folders: `templates/` should guide new files in `resume/`, `portfolio/`, `website/`, `linkedin/`, and `docs/`. Templates should not contain final factual claims unless explicitly designed as examples.

## `scripts/`

Purpose: Planned folder for automation scripts.

Expected content:

- Resume generators.
- ATS resume builders.
- Executive resume builders.
- PDF and DOCX generators.
- Website build helpers.
- Content quality checkers.
- Broken-link checkers.
- Markdown formatters.

Examples:

- `scripts/build-resume.py`
- `scripts/generate-ats-resume.py`
- `scripts/check-links.py`
- `scripts/lint-markdown.py`

Relationship with other folders: `scripts/` should automate generation and validation from Markdown source files. This folder may not exist yet; create it only when requested by a milestone or task.

## `assets/`

Purpose: Planned folder for static assets used by the website, portfolio, presentations, or generated documents.

Expected content:

- Images.
- Diagrams.
- Architecture visuals.
- Logos if allowed.
- Downloadable generated assets if the repository later adopts that convention.

Examples:

- `assets/images/`
- `assets/diagrams/`
- `assets/presentations/`

Relationship with other folders: `assets/` supports presentation and publishing. It should not replace Markdown source content. This folder may not exist yet; create it only when required.

## `.github/`

Purpose: Owns GitHub-specific automation and repository workflows.

Expected content:

- GitHub Actions workflows.
- Issue templates.
- Pull request templates.
- Automation for publishing, validation, and future resume or website generation.

Examples:

- `.github/workflows/`
- `.github/pull_request_template.md`

Relationship with other folders: `.github/` should automate validation, generation, and publishing from repository source files. It should not contain canonical career content.

# Single Source of Truth

Each folder owns a specific layer of information:

- `incoming/`: Original source material. Preserve exactly as received.
- `docs/`: Operating guidance, analysis, reviews, plans, and repository decisions.
- `resume/`: Professional resume source content and role-specific career narrative.
- `resume/experience/`: Employer-specific experience pages.
- `resume/versions/`: Resume variants assembled from modular source content.
- `portfolio/`: Architecture knowledge, case studies, project narratives, and technical portfolio content.
- `portfolio/projects/`: Canonical project-level detail once project pages are generated.
- `website/`: Website presentation layer, when created.
- `linkedin/`: Professional networking presentation layer, when created.
- `templates/`: Reusable structure and formatting patterns.
- `scripts/`: Automation and validation logic, when created.
- `assets/`: Supporting images, diagrams, and static publishing assets, when created.
- `.github/`: Repository automation and GitHub workflow configuration.

Do not duplicate canonical facts across folders unless the downstream file is intentionally a generated or presentation-oriented variant. When duplication is necessary for an output, keep the canonical version clear and update related copies deliberately.

# Writing Philosophy

Writing in this repository must put business value before technology. Technology matters, but it should be presented as the means by which business outcomes, architecture quality, delivery confidence, governance, resilience, and transformation were achieved.

Emphasize:

- Business outcomes.
- Architecture and design decisions.
- Leadership and governance.
- Transformation and modernization.
- Stakeholder alignment.
- Decision making.
- Delivery excellence.
- Risk reduction.
- Security, reliability, scalability, performance, and maintainability.

Avoid technology-first writing. Do not lead with tool lists unless the section specifically describes technology landscape or technical skills.

# Writing Style

Preferred verbs:

- Architected
- Designed
- Led
- Governed
- Enabled
- Established
- Modernized
- Optimized
- Delivered
- Improved
- Accelerated
- Standardized

Avoid:

- Responsible for
- Worked on
- Helped
- Supported
- Participated in
- Involved in

Use active voice. Keep paragraphs concise. Use bullets for achievements, responsibilities, outcomes, skills, and project facts.

# Employer Documentation Standard

Every employer page in `resume/experience/` must use this structure:

```md
# Employer Name

## Executive Summary

## Business Context

## Responsibilities

## Enterprise Architecture

## Solution Architecture

## Leadership

## Major Projects

## Business Outcomes

## Technology Landscape

## Key Achievements
```

Employer pages should describe the role at that employer, the business context, the architecture and delivery responsibilities, leadership scope, major projects, outcomes, technologies, and achievements. Do not overstate seniority for earlier roles. Connect earlier engineering experience to later architecture leadership without exaggerating responsibilities.

# Project Documentation Standard

Every project page should include:

```md
# Project Name

## Executive Summary

## Business Context

## Problem Statement

## Business Objectives

## Architecture Overview

## Architecture Decisions

## Technology Stack

## Integration Landscape

## Security

## Scalability

## Availability

## Performance

## Challenges

## Risks

## Trade-offs

## Business Outcomes

## Lessons Learned

## Future Improvements

## Interview Talking Points

## Related Skills

## Related Employers
```

Project pages should expand employer-level facts into architecture case studies. They should capture business context, design rationale, trade-offs, quality attributes, delivery risks, outcomes, and interview-ready narrative. If data is missing, use `TODO:`.

# Markdown Standards

- Use one `#` heading for the page title.
- Use `##` for major sections.
- Use `###` for subsections such as individual projects.
- Do not skip heading levels.
- Keep paragraphs short and focused.
- Prefer bullet lists for scannability.
- Use tables when comparing repeated structured data.
- Use relative Markdown links for internal references.
- Keep one responsibility per file.
- Use consistent capitalization for technologies, roles, headings, and product names.
- Avoid long blocks of dense prose.
- Keep TODOs explicit with the `TODO:` prefix.

# Repository Rules

Never modify:

- `incoming/`

Never invent:

- Employers
- Projects
- Dates
- Achievements
- Certifications
- Awards
- Metrics
- Client names
- Credentials

If information is missing, uncertain, inconsistent, or not supported by repository sources, insert `TODO:` instead of guessing.

Do not overwrite quality content with lower-quality content. Do not delete content unless it is duplicate, obsolete, or factually incorrect.

# Git Workflow

- Make small, focused changes.
- Keep one logical change per commit.
- Use meaningful commit messages.
- Avoid unrelated edits.
- Review diffs before summarizing work.
- Preserve user changes and existing uncommitted work.
- Do not revert files unless explicitly asked.

Recommended commit message examples:

- `docs: add AI context guide`
- `feat(resume): add employer experience page`
- `docs: review employer consistency`
- `chore: add markdown validation workflow`

# AI Workflow

Every AI assistant should follow this workflow:

1. Read.
2. Analyze.
3. Plan.
4. Implement.
5. Validate.
6. Summarize.
7. Stop.

Never automatically continue into the next milestone. Complete the requested scope, summarize what changed, identify remaining TODOs, and wait for approval before continuing.

# Quality Checklist

Every generated document must be:

- Executive quality.
- ATS friendly.
- Technically accurate.
- Grammatically correct.
- Consistent with existing tone and structure.
- Cross-linked when related files exist.
- Markdown compliant.
- Interview ready.
- Business-outcome oriented.
- Free from unsupported claims.
- Clear about TODOs and unresolved source gaps.

# Long-Term Vision

This repository should eventually generate and maintain:

- Executive Resume.
- ATS Resume.
- GitHub Pages website.
- LinkedIn Profile.
- Architecture Portfolio.
- AI Portfolio.
- Technical Blog.
- Presentation Decks.
- Interview Handbook.
- Professional Knowledge Base.

The long-term goal is not only to store career content, but to maintain a durable professional knowledge system that can be reused across job searches, interviews, executive conversations, public portfolio pages, conference material, articles, and future publishing.

# Definition of Done

A repository change is complete only when:

- The relevant source files were read.
- The change matches repository structure and writing standards.
- Content is reviewed for factual accuracy.
- Dates, metrics, employers, projects, certifications, and achievements are not invented.
- Markdown heading hierarchy is correct.
- Related content is linked where appropriate and where target files exist.
- Duplication is avoided or intentionally managed.
- TODOs are explicit.
- The result is production ready for its intended stage.
- The assistant summarizes files created, files updated, outstanding TODOs, and the recommended next step.

# Instructions for Future AI Sessions

Every AI assistant must read `docs/AI_CONTEXT.md` before making repository changes.

After reading this file, also read task-specific instructions such as `docs/CODEX_INSTRUCTIONS.md`, phase plans such as `docs/PHASE-4.md`, relevant analysis files such as `docs/resume-analysis.md`, and the files directly affected by the requested change.

Operate conservatively. Preserve source truth. Prefer business outcomes, architecture, leadership, and governance over implementation-heavy descriptions. Stop after completing the requested scope.
