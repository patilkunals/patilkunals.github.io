---
title: Scalability Principle
summary: Horizontal scaling, load distribution, statelessness, decoupling
type: principle
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [scalability, horizontal-scaling, load-distribution, performance]
related: [cloud-native.md, microservices.md, event-driven.md]
links: [https://aws.amazon.com/architecture/well-architected/]
---

# Scalability Principle

**Principle:** Systems must scale horizontally (add more servers) not just vertically (bigger servers).

## Vertical vs. Horizontal Scaling

### Vertical (Upgrade Server)
```
Server: 4 CPU, 16GB RAM → Server: 8 CPU, 64GB RAM
  ✅ Simple
  ❌ Expensive
  ❌ Has ceiling (biggest available server)
  ❌ Downtime during upgrade
```

### Horizontal (Add Servers)
```
Server 1 (4 CPU, 16GB)
  ↓
Server 1 + Server 2 + Server 3
  ✅ Unlimited scaling
  ✅ Cost-effective
  ✅ No downtime
  ❌ Requires statelessness
```

## Requirements for Scalability

### 1. Statelessness
```
❌ Stateful (request remembers user):
  Request 1 → Server A (stores user session in memory)
  Request 2 → Server B (doesn't have user session)
  → Error

✅ Stateless (external session storage):
  Request 1 → Server A (stores in Redis)
  Request 2 → Server B (reads from Redis)
  → Works, can scale
```

### 2. Load Balancing
```
                    Load Balancer
                         ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
    Server 1         Server 2         Server 3
  (RR: Request)    (RR: Request)    (RR: Request)

Distribution:
  - Round-robin (equal)
  - Least connections
  - Weighted (by capacity)
  - Geographic (latency)
```

### 3. Database Scaling
```
Read-heavy:
  Write → Primary
  Read ← Replicas (scale reads 10x)

Write-heavy:
  Sharding by customer_id
  Shard 1: customer 1-333
  Shard 2: customer 334-666
  Shard 3: customer 667-1000
```

## Portfolio Implementation

### Digital Insurance Platform
```
Peak load: 10,000 requests/minute
  Premium Service: 10 → 30 replicas
  Policy Service: 5 → 20 replicas
  Claims Service: 8 → 25 replicas

Auto-scaling:
  IF CPU > 70% for 2 min THEN +2 replicas
  IF CPU < 30% for 5 min THEN -1 replica (min = 3)

Result: Handles 3x peak without manual intervention
```

## Monitoring Scalability

```
Metrics:
  - Response time (p50, p95, p99)
  - Error rate
  - Throughput (requests/second)
  - Resource utilization (CPU, memory, disk)

Alert:
  - If response time increases → Scale up
  - If error rate rises → Investigate
  - If disk fills → Add storage
```

---

**Last Updated:** 2026-07-28
