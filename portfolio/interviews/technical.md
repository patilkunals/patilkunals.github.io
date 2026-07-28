---
title: Technical Interview Playbook
summary: System design, architecture decisions, trade-offs, coding, problem-solving
type: playbook
category: Portfolio
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [interview, technical, system-design, architecture]
related: [star-format.md, executive.md, role-specific.md]
---

# Technical Interview Playbook

Preparing for system design and technical architecture interviews.

## System Design Interview Structure

### Step 1: Clarify Requirements (5 minutes)
```
Don't assume! Ask questions:

Functional:
  Q: "How many users?"
  Q: "Read vs. write heavy?"
  Q: "Real-time or batch?"
  Q: "Geographic distribution?"

Non-Functional:
  Q: "Availability target (99%, 99.9%?)?"
  Q: "Latency expectations (ms, seconds?)?"
  Q: "Consistency requirements (strong, eventual?)?"
  Q: "Data retention?"
```

### Step 2: High-Level Architecture (10 minutes)
```
Sketch boxes:
  ┌─────────┐      ┌────────┐      ┌───────────┐
  │ Clients │ ───→ │ LoadBal│ ───→ │ Services  │
  └─────────┘      └────────┘      └─────┬─────┘
                                          │
                                    ┌─────┴──────┐
                                    ↓            ↓
                                  Database    Cache
                                (PostgreSQL) (Redis)
```

### Step 3: Deep-Dive Critical Components (15 minutes)
```
For each major component:
  ├─ Database (SQL vs. NoSQL?)
  ├─ Caching strategy
  ├─ API design
  ├─ Scalability approach
  ├─ Failure handling
  └─ Monitoring
```

### Step 4: Trade-offs & Alternatives (5 minutes)
```
"This design assumes X. If instead Y was requirement:
  - Pro: ...
  - Con: ...
  - Alternative: ..."

Shows mature thinking, not just one solution
```

## Portfolio System Design Examples

### Example 1: Refund Processing System

**Requirements:**
```
- 1000 refunds/day
- 99.95% availability
- Process within 5 minutes
- Audit trail required
```

**Architecture:**
```
Customer request
    ↓
API Gateway (auth, rate limit)
    ↓
Refund Service (validation, calculation)
    ├─ Check policy (cached)
    ├─ Verify return window
    ├─ Calculate amount
    ↓
Payment Service (async via queue)
    ├─ Charge customer
    ├─ Confirm payment
    ↓
Notification Service
    ├─ Send confirmation

Database: PostgreSQL (strong consistency needed)
Cache: Redis (policy, customer data)
Queue: RabbitMQ (payment async)
Monitoring: CloudWatch + Datadog
```

**Key Decisions:**
```
✅ Async payment (doesn't block customer)
✅ Validation before payment (prevent failures)
✅ Audit log (every step recorded)
✅ Retry with circuit breaker (handle failures)
✅ Caching policy data (fast lookup)
```

### Example 2: Real-Time Notification System

**Requirements:**
```
- 50K+ notifications/day
- Deliver within 2 minutes
- Support email, SMS, push
- Retry on failure
```

**Architecture:**
```
Trigger events (policy issued, claim approved)
    ↓
Kafka topics (fanout)
    ├─ Email topic → Email service → SMTP
    ├─ SMS topic → SMS service → Twilio
    └─ Push topic → Push service → APNs/FCM

Retry mechanism:
  Failed → Dead Letter Queue → Batch processing
  
Scaling:
  Consumer groups (independent scaling)
  Multiple replicas per service
  Auto-scaling based on queue depth
```

## Technical Discussion Talking Points

### Microservices vs. Monolith
```
Monolith better when:
  ✅ Small team (<5 people)
  ✅ Simple product (CRUD app)
  ✅ Startup phase (speed to market)

Microservices better when:
  ✅ Large team (>10 people)
  ✅ Complex domain (insurance, banking)
  ✅ Scaling independently
  ✅ Technology diversity needed
  
Your position: "Trade-off based on company stage"
```

### SQL vs. NoSQL
```
SQL:
  ✅ Complex queries (JOINs)
  ✅ Strong consistency (financial)
  ✅ Normalization
  ❌ Scaling writes

NoSQL:
  ✅ High-volume writes
  ✅ Horizontal scaling
  ✅ Flexible schema
  ❌ Eventually consistent
  
Your position: "Use both - polyglot persistence"
```

### Caching Strategy
```
What to cache:
  ✅ Customer profiles (stable)
  ✅ Policy details (rarely change)
  ✅ Product catalogs
  ❌ Real-time balances
  ❌ Transaction history

Cache invalidation:
  ├─ TTL (time-based)
  ├─ Event-driven (policy changes)
  └─ Manual (emergency)
```

## Red Flags & How to Avoid

❌ **No monitoring:** → Always include logs, metrics, alerts  
❌ **Single point of failure:** → Redundancy, multi-AZ  
❌ **No failure handling:** → Circuit breaker, retry, fallback  
❌ **Assumes strong consistency everywhere:** → Use eventual consistency where acceptable  
❌ **Vague on scaling:** → Show specific numbers, auto-scaling triggers  

## Practicing Technical Interviews

### Resources
- System Design book: Alex Xu's "System Design Interview"
- LeetCode system design problems
- Explaining your portfolio architecture

### Practice Structure
```
1. Pick real system (your past project)
2. Interviewer (friend or you simulating)
3. 45-minute interview:
   - 5 min: Requirements
   - 10 min: High-level
   - 20 min: Deep-dive
   - 10 min: Trade-offs & alternatives
4. Feedback: What could improve?
5. Iterate: Try again with improvements
```

---

**Last Updated:** 2026-07-28
