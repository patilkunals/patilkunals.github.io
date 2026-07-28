# Employer Review

## Issues Found

- Executive tone is consistent across `resume/experience/`, with each employer page using business context, architecture, leadership, outcomes, and technology landscape sections.
- Heading hierarchy is consistent across employer documents: one `#` title, `##` major sections, and `###` project subsections.
- Career progression is logical: early software engineering foundation, Tieto lead software engineering, Citi technical leadership, Mobiquity solution architecture, and Nagarro enterprise/cloud/GenAI architecture.
- Leadership progression is clear, moving from delivery ownership and customer engagement into team leadership, technical governance, solution architecture, and architecture review practices.
- Business outcomes are emphasized in every employer page, with explicit TODOs where metrics require validation.
- Some achievements intentionally repeat at different levels: employer pages describe context-specific achievements, while `career-highlights.md` summarizes portfolio-level highlights.
- A technology naming inconsistency appeared around `AWS API Gateway` versus `Amazon API Gateway`.
- Mobiquity event-platform dates were conflicting: the July 2026 resume listed July 2017 - December 2018, while LinkedIn also referenced re:MARS 2019.
- A few heading names used title-case `And` in project names, while the existing style generally reads better with lowercase `and`.
- Internal cross-references are currently minimal. No broken internal links were found because the employer pages do not yet contain Markdown links to project files.

## Improvements Made

- Standardized `AWS API Gateway` to `Amazon API Gateway` in:
  - `resume/career-highlights.md`
  - `resume/experience/nagarro.md`
- Standardized `S3` to `Amazon S3` in the Nagarro technology landscape.
- Clarified the Mobiquity event-platform date conflict by changing the date field to a `TODO:` that records both source versions instead of presenting one as final.
- Standardized Mobiquity project headings from `And` to `and`:
  - `Event Management System / Amazon re:MARS and re:Invent`
  - `Forrester TAP App and TAP Web`

## Remaining TODOs

- Validate quantified outcomes before external use:
  - `$25M` client savings
  - `78%` API uptime improvement
  - `14%` revenue uplift
  - `12%` time-to-market reduction
  - `20%` platform uptime improvement
- Confirm Mobiquity event-platform dates across re:Invent 2017, re:Invent 2018, and re:MARS 2019.
- Confirm Forrester TAP App and TAP Web project dates, role title, and technology stack.
- Confirm Mister Car Wash project dates, role title, and technology stack.
- Confirm China VAT Implementation dates and technology stack.
- Confirm exact dates for Tieto projects: Payment Service Agreement, First Card, ComHem, and SIMbase.
- Confirm project-specific tools and platforms for Tieto.
- Confirm early-career project dates for Load Manager, Digital HomeSoul, and Mobile Ticket Reservation System.
- Confirm any formal leadership, mentoring, or ownership responsibilities during Clarice Technologies, Spartan Labs, and Inbitech Solutions.
- Add validated early-career business metrics if available.

## Recommendations

- Keep employer pages as the detailed source for role-specific narrative and use `career-highlights.md` only for cross-career executive highlights.
- Add Markdown links from employer project sections to `portfolio/projects/` after project files are generated.
- Preserve the current employer-page structure for future additions: Executive Summary, Business Context, Responsibilities, Enterprise Architecture, Solution Architecture, Leadership, Major Projects, Business Outcomes, Technology Landscape, and Key Achievements.
- Use official technology names consistently, especially AWS service names such as `Amazon API Gateway`, `Amazon S3`, `AWS Lambda`, `Amazon DynamoDB`, and `AWS Bedrock`.
- Keep TODOs in place until metrics, project dates, and client naming policy are verified.
- Avoid adding more quantified claims until each metric has a confirmed source and business context.
