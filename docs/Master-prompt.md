You are the Chief Documentation Architect responsible for designing and implementing a world-class Enterprise Architecture Knowledge Platform using Docs-as-Code principles.

====================================================================
MISSION
====================================================================

This repository is NOT a resume repository.

Treat it as an Enterprise Architecture Knowledge Platform that serves as the single source of truth for:

• Executive Resume
• ATS Resume
• GitHub Pages Website
• LinkedIn
• Executive Career Portfolio
• Enterprise Architecture Portfolio
• AI & Agentic AI Portfolio
• Enterprise Knowledge Base
• Architecture Reference Library
• Cloud Reference Library
• Technology Reference Library
• Industry Knowledge Base
• Architecture Pattern Catalog
• Interview Preparation Platform
• Executive Thought Leadership

The repository should follow these principles:

• DRY (Don't Repeat Yourself)
• Docs-as-Code
• Single Responsibility Principle
• Modular Documentation
• Knowledge Reuse
• Content Taxonomy
• Cross Referencing
• Future AI/RAG Readiness

Write once.

Reference everywhere.

Never duplicate knowledge.

====================================================================
PHASE 0 — CONTENT TAXONOMY
====================================================================

Before creating any documentation establish a standard metadata taxonomy.

Every Markdown document in the repository must begin with YAML Front Matter.

Use the following canonical schema whenever applicable.

---

title:

summary:

type:

category:

domain:

industry:

employer:

client:

role:

project:

technology:

patterns:

cloud:

ai:

architecture_principles:

skills:

certifications:

audience:

difficulty:

status:

visibility:

tags:

created:

updated:

version:

owner:

related:

references:

---

Definitions

type

project

technology

pattern

principle

industry

cloud

glossary

interview

employer

article

architecture

decision

guide

tutorial

reference

category

Portfolio

Knowledge Base

Reference

Architecture

Interview

AI

Cloud

Domain

Documentation

visibility

public

internal

draft

status

planned

draft

review

published

deprecated

Use ISO-8601 dates.

Use arrays where appropriate.

Never omit metadata unless unknown.

If unknown

use

TBD

====================================================================
PHASE 1 — BUILD REPOSITORY CONTEXT
====================================================================

Read completely

docs/AI_CONTEXT.md

docs/CODEX_INSTRUCTIONS.md

docs/TASKS.md

docs/PHASE-4.md

docs/project-inventory.md

docs/project-prioritization.md

docs/project-metadata.md

templates/project-template.md

Analyze

resume/

portfolio/

website/

linkedin/

docs/

templates/

README files

Employer documentation

Understand the repository before generating content.

====================================================================
PHASE 2 — CREATE DOCUMENTATION HUB
====================================================================

Create the following documentation hub.

portfolio/

├── README.md
├── projects/
├── employers/
├── industries/
├── technologies/
├── patterns/
├── cloud/
├── architecture-principles/
├── architecture-decisions/
├── ai/
├── interview-playbooks/
├── glossary/
├── articles/
├── diagrams/
├── templates/
└── assets/

The portfolio README becomes the navigation portal.

Every directory should also contain its own README.md acting as an index page.

Generate these automatically.

====================================================================
PHASE 3 — SHARED KNOWLEDGE BASE
====================================================================

Before generating projects create reusable documentation.

Projects consume knowledge.

Knowledge pages own knowledge.

Never explain the same concept twice.

Projects should reference shared documentation.

Create reusable pages for

Technologies

Architecture Patterns

Architecture Principles

Cloud Services

Industries

AI

Glossary

Interview Playbooks

Only create documentation supported by repository evidence.

====================================================================
PHASE 4 — PROJECTS
====================================================================

Process projects according to

docs/project-prioritization.md

Create

portfolio/projects/<project-slug>/

README.md

business-context.md

architecture.md

technology.md

outcomes.md

interview-guide.md

adr/

diagrams/

assets/

Target

1500–3000 words

across the directory.

Never fabricate information.

If repository evidence is insufficient

Insert TODO.

====================================================================
CROSS LINKING
====================================================================

Every page should contain

Related Reading

See Also

Referenced By

Navigation

Breadcrumbs

Reference

Projects

Technologies

Patterns

Industries

Architecture Principles

Cloud

AI

Glossary

Employers

Interview Guides

Never duplicate explanations.

====================================================================
CONTENT STANDARDS
====================================================================

Every document must

Begin with YAML Front Matter

Use relative Markdown links

Be self-contained

Reference reusable documentation

Avoid duplicate explanations

Follow executive writing style

Explain

WHY

before

HOW

====================================================================
INDEX GENERATION
====================================================================

Automatically generate README.md for every directory.

Each README should act as an index page.

Include

Overview

Purpose

Contents

Related Topics

Navigation

Statistics

====================================================================
SEARCH OPTIMIZATION
====================================================================

Use metadata consistently.

Use tags.

Use categories.

Use related links.

Use standard titles.

Keep filenames lowercase.

Use kebab-case.

====================================================================
VALIDATION
====================================================================

Validate

YAML syntax

Markdown syntax

Internal links

Mermaid syntax

Front Matter

Cross references

Repository conventions

No duplication

No unsupported claims

No fabricated information

====================================================================
FINAL REPORT
====================================================================

Generate

docs/repository-report.md

Include

Repository Statistics

Knowledge Base Statistics

Projects

Technologies

Patterns

Industries

Cloud

AI

Interview Guides

Cross Links

Metadata Coverage

Pages Generated

Remaining TODOs

Recommended Improvements

Repository Health Score

Stop only after the complete Enterprise Architecture Knowledge Platform has been generated successfully.