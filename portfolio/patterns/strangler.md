---
title: Strangler Pattern - Gradual Monolith Migration
summary: Incremental refactoring, parallel systems, traffic routing, minimal risk
type: pattern
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [strangler, migration, monolith, refactoring, gradual]
related: [microservices.md, deployment-patterns.md]
links: [https://martinfowler.com/bliki/StranglerFigApplication.html]
---

# Strangler Pattern - Gradual Monolith Migration

Replacing monolithic systems incrementally by building new services alongside existing system.

## Problem

**Challenges with big-bang rewrites:**
- High risk (complete system replacement)
- Long time to value (nothing works until everything done)
- Team disruption (focusing on rewrite, not new features)
- Expensive (entire system rebuilt)

**Better approach: Incremental strangling**

## Concept

```
Step 1: Identify Feature
  Monolith has feature X (e.g., authentication)

Step 2: Build Service
  Create Service X in parallel

Step 3: Route Traffic
  Router: New requests → Service X
          Old requests → Monolith

Step 4: Monitor & Validate
  Verify Service X works correctly

Step 5: Repeat
  Extract next feature

Step 6: Decommission
  When all features extracted, shut down monolith
```

## Visual Progress

```
Week 1-2:  Monolith (100%)
           └─ Service A (new)

Week 3-4:  Monolith (80%)
           ├─ Service A (20%)
           └─ Service B (new)

Week 5-6:  Monolith (60%)
           ├─ Service A (20%)
           ├─ Service B (20%)
           └─ Service C (new)

Week 12:   Services (100%)
           └─ Monolith (decommissioned)
```

## Implementation Strategy

### 1. API Gateway (Routing)
```
Client requests
    ↓
API Gateway
    ├─ /auth/* → Authentication Service (new)
    ├─ /users/* → User Service (new)
    ├─ /* → Monolith (old)
```

### 2. Feature Extraction Priority
```
Priority 1: Stateless services (Authentication, Configuration)
Priority 2: Independent services (User management)
Priority 3: Dependent services (Orders, Payments)
Priority 4: Complex services (Core business logic)
```

### 3. Data Consistency
```
Option A: Dual writes (write to both systems)
  Pros: Easy implementation
  Cons: Inconsistency risk

Option B: Events (monolith publishes events)
  Pros: Reliable sync
  Cons: Eventual consistency

Option C: Shared database (temporary)
  Pros: Immediate consistency
  Cons: Tight coupling
```

## Portfolio Example: Middleware Modernization

### Timeline
```
Before: Monolithic J2EE application (8 years old)

Phase 1 (Months 1-3): Extract User Service
  - Monolith: 95%
  - User Service: 5%
  - API Gateway routes /users/* to new service

Phase 2 (Months 4-6): Extract Product Service
  - Monolith: 85%
  - Services: 15%

Phase 3 (Months 7-12): Extract Order + Payment
  - Monolith: 40%
  - Services: 60%

Phase 4 (Months 13-18): Migrate Core
  - Monolith: 5% (legacy)
  - Services: 95%

Result: $25M savings, 78% uptime improvement
```

## Risk Mitigation

### 1. Parallel Testing
```
New Service:
  ├─ Unit tests
  ├─ Integration tests
  ├─ Load tests
  └─ Canary deployment (1% traffic)

Once validated:
  └─ Increase traffic to 100%
```

### 2. Rollback Plan
```
If Service fails:
  ├─ Instantly route to monolith
  ├─ Investigate issue
  └─ Re-deploy when fixed
```

### 3. Data Sync Validation
```
Periodic checks:
  - Count records in new service vs. monolith
  - Spot check data differences
  - Alert if divergence detected
```

## Common Challenges

| Challenge | Solution |
|-----------|----------|
| **Data sync issues** | Event sourcing, eventual consistency acceptance |
| **Slow migration** | Prioritize high-value services first |
| **Team burnout** | Split team (maintenance vs. new development) |
| **Complex dependencies** | Map service boundaries before starting |
| **Testing complexity** | Automated tests, shadow traffic comparison |

## Anti-Patterns to Avoid

❌ **Extract everything at once** → Use strangler instead  
❌ **Ignore monolith maintenance** → Keep it stable during migration  
❌ **Inconsistent data** → Use events, dual-writes carefully  
❌ **No rollback plan** → Have exit strategy always  
❌ **Migrate everything at once** → Gradual is safer  

## Best Practices

✅ **Start with stateless services** – Easiest to extract  
✅ **Use API Gateway** – Centralized routing, easy switching  
✅ **Event-driven sync** – Reliable data consistency  
✅ **Monitor closely** – Catch issues early  
✅ **Gradual traffic shift** – Canary deployment (1% → 10% → 100%)  
✅ **Automated testing** – Validate every step  
✅ **Document boundaries** – Clear service contracts  

## When to Use Strangler

✅ **Large monolith** – Rewrite not feasible  
✅ **Ongoing business** – Can't afford downtime  
✅ **Unclear requirements** – Extract services as you learn  
✅ **Risk-averse team** – Gradual reduces risk  

❌ **Small codebase** – Rewrite faster  
❌ **Long-term vision** – If clear, modernize more directly  
❌ **Technology change** – Complete rewrite may be better  

---

## See Also

- [Microservices](microservices.md) – Target architecture
- [API Design](../technologies/api-design.md) – Gateway patterns
- [Deployment Patterns](deployment-patterns.md) – Canary, blue-green

## Interview Talking Points

- **Risk Reduction:** Gradual migration minimizes risk
- **Business Continuity:** No downtime during transformation
- **Timeline:** 12-18 month migration for large systems
- **Cost Savings:** $25M+ through optimization and efficiency
- **Team Coordination:** Maintaining monolith while extracting services

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Advanced (10+ years)  
**Portfolio Coverage:** Middleware Modernization project
