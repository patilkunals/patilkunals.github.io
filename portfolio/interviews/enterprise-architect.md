---
title: Enterprise Architect Role Playbook
summary: Strategy, decisions, governance, risk management, stakeholder alignment
type: playbook
category: Portfolio
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [interview, enterprise-architect, strategy, governance]
related: [star-format.md, technical.md, executive.md]
---

# Enterprise Architect Role Playbook

Specialized interview preparation for Principal/Enterprise Architect roles.

## What Enterprise Architects Do

**Not:** Code, build, execute  
**Yes:** Guide strategy, evaluate options, mitigate risks, maintain vision

```
Your stakeholders:
  ├─ CTO/VP Engineering (technology strategy)
  ├─ Product executives (business alignment)
  ├─ Delivery teams (guidance, standards)
  ├─ Finance (cost optimization)
  └─ Compliance/Security (risk, governance)
```

## Key Competencies

### 1. Strategic Thinking
```
Question: "How do you approach long-term architectural decisions?"

Answer: "I balance:
  ✅ Business goals (what are we trying to achieve?)
  ✅ Technical constraints (what are our limitations?)
  ✅ Organizational capability (what can we execute?)
  ✅ Risk management (what could go wrong?)
  ✅ Cost optimization (sustainable economics?)
  
Example: Digital Insurance platform decision to go microservices
  - Why: Scale independently, faster deployment, product innovation
  - How: Strangler pattern (phased, risk-reduced)
  - Cost: $1.8M investment for $25M return
  - Timeline: 3 years to full transformation"
```

### 2. Decision-Making Framework
```
Architecture decision process:

1. Define problem (not just symptoms)
2. Gather requirements (business + technical)
3. Evaluate options (at least 3)
   ├─ Option A + pros/cons
   ├─ Option B + pros/cons
   └─ Option C + pros/cons
4. Recommend (clear rationale)
5. Communicate (get alignment)
6. Monitor (KPIs for success)
7. Iterate (adjust as conditions change)
```

### 3. Governance & Standards
```
You establish/maintain:
  ├─ Architectural standards
  ├─ Technology choices (approved list)
  ├─ Security/compliance standards
  ├─ Code quality expectations
  ├─ Operational excellence patterns
  └─ Roadmap alignment

Question: "How do you ensure teams follow architectural standards?"

Answer: "Governance without bureaucracy:
  ✅ Clear standards (documented, rationale explained)
  ✅ Tools enforce (linting, automated checks)
  ✅ Review process (lightweight architecture review)
  ✅ Autonomy within bounds (teams own implementation)
  ✅ Feedback & learning (ADRs, retrospectives)"
```

### 4. Risk Management
```
Your job: Identify and mitigate risks
  - Technical risk (can we build this?)
  - Organizational risk (can we execute?)
  - Market risk (will this matter?)
  - Operational risk (can we run this?)

Example:
  Risk: Microservices adds operational complexity
  Mitigation:
    - Invest in observability (logs, traces, metrics)
    - Container orchestration (Kubernetes)
    - DevOps culture (shift-left)
    - Runbooks (incident response)
    - On-call processes
```

## Interview Stories for Enterprise Architect Role

### Story 1: Major Architecture Decision

```
Situation:
  - Company at inflection point (scale challenge)
  - Monolithic system limiting growth
  - Team disagreement on direction

Task:
  - Lead architecture decision (monolith vs. microservices)
  - Get alignment (executive + team)
  - Define migration path

Action:
  1. Chartered architecture review
  2. Evaluated 3 options with costs
  3. Presented trade-offs to leadership
  4. Designed strangler pattern (phased approach)
  5. Led architecture governance for 18 months
  6. Communicated progress to stakeholders

Result:
  ✅ $25M value delivered
  ✅ 60% cost reduction
  ✅ Team alignment (no defection)
  ✅ Competitive advantage (faster deployment)
  ✅ Blueprint for future decisions
```

### Story 2: Influencing without Authority

```
Situation:
  - Several teams building similar solutions (wasteful)
  - No formal architecture governance
  - Teams resistant to "big architecture"

Task:
  - Establish standards without mandates
  - Get buy-in from independent teams
  - Create shared platforms

Action:
  1. Interviewed teams (understood pain points)
  2. Proposed "shared services" (appealed to self-interest)
  3. Started with pilot project (built trust)
  4. Established lightweight review process
  5. Celebrated early wins
  6. Iterated based on feedback

Result:
  ✅ 40% effort reduction (vs. duplicated work)
  ✅ Higher code quality (peer learning)
  ✅ Faster delivery (shared libraries)
  ✅ Established governance (culture shifted)
```

### Story 3: Technical Debt Management

```
Situation:
  - Legacy system slowing innovation
  - Product team wants new features fast
  - Engineering team wants to refactor

Task:
  - Balance innovation speed + technical health
  - Create refactoring roadmap
  - Get executive alignment on investment

Action:
  1. Quantified tech debt cost (feature velocity)
  2. Presented to product leadership (business impact)
  3. Designed incremental refactoring plan
  4. Allocated 20% team capacity to debt
  5. Set quality metrics (code coverage, complexity)
  6. Measured improvement over time

Result:
  ✅ Feature velocity improved 30%
  ✅ Team morale improved (modern tech)
  ✅ Reduced bugs (better code quality)
  ✅ Sustainability (culture of quality)
```

## Portfolio Deep-Dives

### Digital Insurance Platform (3-year transformation)
```
Questions likely:
  - "How did you guide architectural decisions?"
  - "How did you manage risks in migration?"
  - "How did you get alignment across stakeholders?"

Your talking points:
  ✅ Strangler pattern (phased, low-risk)
  ✅ Domain-driven design (business aligned)
  ✅ Microservices (independent scaling)
  ✅ Event-driven (loose coupling)
  ✅ Multi-AZ deployment (high availability)
  
Business impact:
  - $25M value (cost + speed + reliability)
  - 15-person team coordination
  - 3-year execution plan
  - Zero unplanned downtime during migration
```

### Middleware Modernization (18-month cloud journey)
```
Questions likely:
  - "How do you approach legacy modernization?"
  - "How do you manage infrastructure costs?"
  - "How do you balance innovation with stability?"

Your talking points:
  ✅ Cloud-first strategy (AWS, Kubernetes)
  ✅ Cost optimization (60% reduction)
  ✅ Operational excellence (99.95% uptime)
  ✅ Team capability building (DevOps, SRE)
  ✅ Governance framework (standards, compliance)
```

## Likely Interview Questions

### Q: "How do you stay current with technology?"
```
A: "Several approaches:
   1. Continuous learning (reading, courses, conferences)
   2. POCs (proof-of-concept for new tech)
   3. Technology radar (quarterly assessment)
   4. Community (architecture guilds, meetups)
   5. Vendor engagement (understand roadmap)
   
   But also: I'm skeptical of shiny new things.
   I apply 'boring technology' principle—use proven
   solutions for production systems."
```

### Q: "How do you handle pressure from multiple stakeholders?"
```
A: "By being transparent and data-driven:
   1. Understand each stakeholder's goals
   2. Show trade-offs clearly (not just one option)
   3. Use metrics (business outcomes, not just tech)
   4. Be honest about constraints
   5. Recommend clearly (not fence-sitting)
   
   Example: When CTO wanted bleeding-edge tech,
   finance wanted cost reduction, and product wanted speed:
   I showed how cloud + containers solved all three."
```

### Q: "What architectural mistake have you made?"
```
A: "[Specific mistake + learning]
   - Initially didn't invest enough in observability
   - Result: Hard to debug distributed system
   - Fixed: Made logs, metrics, traces first-class
   - Now: Every new service includes observability
   
   Key learning: Operational excellence is architectural
   concern, not just operations team concern."
```

---

**Last Updated:** 2026-07-28
