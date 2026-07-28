# Reusable Front Matter

Define common YAML front-matter fields for projects, companies, articles, and ADRs so automation can parse metadata reliably.

Example fields and meanings:
- title: Human-readable title
- company: Employer/organisation
- domain: Business domain or vertical
- role: Role held on the project
- duration: Time range (e.g., "2020-2022")
- status: Draft | In Progress | Completed
- technologies: List of technologies used
- tags: List of short tags for filtering
- author: Article/ADR author
- date: ISO date (YYYY-MM-DD)

Use this YAML snippet at the top of project/company/article files.

---
# Example front matter for a project
title: Discovery Life
company: Nagarro
domain: Insurance
role: Associate Distinguished Engineer
duration: "2019-2021"
status: Completed
technologies:
  - Java
  - AWS
  - Kafka
tags:
  - insurance
  - data-platform
---
