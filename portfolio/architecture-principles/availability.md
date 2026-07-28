---
title: Availability Principle
summary: High availability, fault tolerance, disaster recovery, multi-region
type: principle
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [availability, high-availability, fault-tolerance, disaster-recovery]
related: [cloud-native.md, resilience-patterns.md]
---

# Availability Principle

**Principle:** Systems must remain operational even during failures (99.9%+ uptime).

## Availability Tiers

```
99.0%   (2.88 hours down/year)     - Acceptable
99.9%   (8.76 minutes down/year)   - Good
99.95%  (4.38 minutes down/year)   - Very Good
99.99%  (52 seconds down/year)     - Excellent
99.999% (5.2 seconds down/year)    - Premium
```

## Achieving High Availability

### 1. Redundancy
```
Single Point of Failure (bad):
  Load Balancer → Server A (if fails, system down)

Redundant (good):
  Load Balancer A
    ↓
  ┌─────┴──────┐
  ↓            ↓
Server A    Server B
  
Load Balancer B (backup)
  
Result: System survives single failure
```

### 2. Multi-AZ Deployment
```
AWS Availability Zones (different buildings):
  Region us-west-2
    ├─ AZ-A: 3 servers
    ├─ AZ-B: 3 servers
    └─ AZ-C: 3 servers

Failure in AZ-A:
  ↓
Requests route to AZ-B and AZ-C
  ↓
System continues (degraded but up)
```

### 3. Automatic Failover
```
Server A (primary) ← Health check → ✓
Server B (standby)  ← Health check → ✓

Server A fails:
  ↓
Health check fails
  ↓
Automatic failover to Server B
  ↓
Users don't notice (except brief spike)
```

## Disaster Recovery

### RTO/RPO
```
RTO (Recovery Time Objective):
  How quickly can we restore?
  Target: 15 minutes

RPO (Recovery Point Objective):
  How much data is acceptable to lose?
  Target: 5 minutes
```

### Backup Strategy
```
Real-time:     Standby system, automatic failover
Daily:         Snapshots, restoreable to any day
Weekly:        Full backups, geographic distribution
Monitored:     Test restores monthly
```

## Portfolio Example

### Middleware Modernization
```
Before: 93% uptime (4-6 hours down/month)
After:  99.95% uptime (22 minutes down/year)

Achieved through:
  ├─ Multi-AZ deployment
  ├─ Auto-scaling (no bottleneck)
  ├─ Database replication
  ├─ Backup/restore processes
  └─ Monitoring & alerting

Result: 78% uptime improvement
```

---

**Last Updated:** 2026-07-28
