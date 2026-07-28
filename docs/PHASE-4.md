# Phase 4 – Executive Content Migration

## Goal

Transform the resumes under `/incoming` into a modular executive knowledge base.

Do NOT perform a document conversion.

Instead, rewrite, normalize, improve, and modularize the content.

---

# Source

Read every resume under:

/incoming

Never modify these files.

---

# Milestone 1

## Resume Analysis

Create:

docs/resume-analysis.md

Include

- Employers
- Projects
- Skills
- Certifications
- Awards
- Duplicates
- Missing Information
- Recommendations

---

# Milestone 2

Generate

resume/

- executive-summary.md
- career-highlights.md
- core-competencies.md
- technical-skills.md
- certifications.md
- education.md
- awards.md

---

# Milestone 3

Rewrite each employer.

Generate

resume/experience/

- nagarro.md
- mobiquity.md
- citi.md
- tieto.md
- early-career.md

Each employer should include

- Executive Summary
- Business Context
- Responsibilities
- Enterprise Architecture
- Solution Architecture
- Leadership
- Major Projects
- Business Outcomes
- Technology Landscape
- Key Achievements

---

# Milestone 4

Generate one Markdown file for each major project.

Location

portfolio/projects/

Each project should contain

- Executive Summary
- Business Context
- Problem Statement
- Architecture
- Design Decisions
- Technology Stack
- Challenges
- Business Outcomes
- Lessons Learned
- Future Enhancements

---

# Milestone 5

Generate

website/

- home.md
- about.md
- resume.md
- projects.md
- contact.md

---

# Milestone 6

Generate

linkedin/

- headline.md
- about.md
- experience.md
- featured.md

---

# Acceptance Criteria

- Executive tone
- No duplicate content
- ATS-friendly
- Business outcomes highlighted
- Modular Markdown
- Cross-linked content
- One responsibility per file

---

# Git Strategy

Commit after each milestone.

Example

git commit -m "feat(resume): executive summary"

Avoid large commits.

---

# Completion Checklist

- Resume complete
- Employer pages complete
- Portfolio complete
- Website content complete
- LinkedIn content complete
- Quality review complete

Phase 4 is complete only when every checkbox is satisfied.