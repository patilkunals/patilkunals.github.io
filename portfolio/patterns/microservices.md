---
title: Microservices Architecture Pattern
summary: Service boundaries, independent deployment, API communication, data consistency
type: pattern
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [microservices, architecture, design-pattern, distributed-systems, scalability]
related: [api-led.md, event-driven.md, saga.md, circuit-breaker.md]
links: [https://microservices.io/]
---

# Microservices Architecture Pattern

Distributed architecture breaking monolithic applications into independently deployable services.

## Problem

**Monolithic applications face:**
- Tight coupling prevents independent scaling
- Single technology stack limits flexibility
- Large codebase slows development
- Failure in one component brings down entire system
- Difficult to adopt new technologies

## Solution: Microservices

**Principle:** Split by business capability, not technical layer.

```
Monolithic:
┌─────────────────────┐
│  User Service       │
│  Product Service    │
│  Order Service      │
│  Payment Service    │
│  Notification       │
└─────────────────────┘
       ↓
    Single Database
    Single Deployment
    Tightly Coupled

Microservices:
┌──────────┐  ┌──────────┐  ┌──────────┐
│  User    │  │ Product  │  │  Order   │
│ Service  │  │ Service  │  │ Service  │
└──────────┘  └──────────┘  └──────────┘
      ↓            ↓             ↓
   User DB    Product DB    Order DB
   
   Independent scaling
   Independent deployment
   Loose coupling via APIs
```

## Key Characteristics

### 1. Service Boundaries
- Based on business capability (domain-driven design)
- Loosely coupled, highly cohesive
- Owns its own data (no shared database)
- Clear contract via APIs

### 2. Independent Deployment
```bash
# Update Payment Service without touching others
git checkout payment-service
npm run build && npm run test
docker build -t payment:v2 .
docker push payment:v2
kubectl set image deployment/payment payment=payment:v2
```

### 3. Technology Heterogeneity
```
User Service:     Node.js + MongoDB
Product Service:  Java + PostgreSQL
Order Service:    Python + DynamoDB
Payment Service:  Go + Redis
```

Each service chooses optimal technology.

### 4. Communication Patterns

**Synchronous (REST/gRPC):**
```
Client → Order Service → Payment Service → Payment API
         (waits for response)
```

**Asynchronous (Events):**
```
Order Service publishes "OrderCreated"
                ↓
        Payment Service subscribes
        Fraud Service subscribes
        Notification Service subscribes
```

## Portfolio Implementations

### Digital Insurance Platform (2023-2025)
- **Services:** Premium, Claims, Customer, Notification, Integration
- **Communication:** REST + async events
- **Data:** Independent databases per service
- **Scale:** 15+ team
- **Outcome:** 30% faster processing

### Neo Banking Platform (2021)
- **Services:** Account, Transaction, Transfer, Card, Notification
- **Communication:** REST APIs + event-driven
- **Deployment:** Independent Docker/Kubernetes per service
- **Platforms:** Shared API Gateway for web/mobile

### Middleware Modernization (2021-2022)
- **Refactor:** Monolith → microservices
- **Pattern:** Strangler pattern (gradual migration)
- **Outcome:** $25M savings, 78% uptime

## Critical Challenges & Solutions

| Challenge | Cause | Solution |
|-----------|-------|----------|
| **Data consistency** | Distributed databases | Saga pattern, eventual consistency |
| **Network latency** | Service-to-service calls | Caching, async processing |
| **Debugging** | Requests span multiple services | Distributed tracing (Jaeger) |
| **Testing** | Dependencies on other services | Contract testing, mocks |
| **Deployment complexity** | Many services to coordinate | CI/CD, GitOps, orchestration |

## Operational Challenges

### Service Discovery
```yaml
# Kubernetes automatic discovery
Service: payment
ClusterIP: 10.0.0.50:8080
Endpoints: 
  - pod-1:8080
  - pod-2:8080
  - pod-3:8080
```

### Load Balancing
```
API Gateway
    ↓
Load Balancer (Round-robin, least connections)
    ↓
Service replicas (scale to demand)
```

### Health Checks
```python
@app.get("/health")
def health_check():
    # Check database connection
    # Check external dependencies
    return {"status": "healthy"}
```

Kubernetes uses liveness probes to restart unhealthy pods.

### Circuit Breaker Pattern
```python
from pybreaker import CircuitBreaker

# If Payment Service fails 5 times, stop calling it
circuit_breaker = CircuitBreaker(fail_max=5, reset_timeout=60)

@circuit_breaker
def call_payment_service(request):
    return requests.post("https://payment-service/pay", json=request)

try:
    result = call_payment_service(request)
except CircuitBreakerListener:
    # Service is down, use fallback
    return fallback_response()
```

## Scaling Strategies

### Horizontal Scaling
```yaml
# Scale Payment Service to 10 replicas during peak
kubectl scale deployment payment --replicas=10
```

### Database Scaling
```
Single database becomes bottleneck
    ↓
Read replicas for reads
    ↓
Master-slave replication
    ↓
Sharding by customer (customer_id % 3)
```

### Caching
```
Client → Cache (Redis)
           ↓ (miss)
         Database
```

## Deployment Patterns

### Blue-Green Deployment
```
Blue (V1) → All traffic
Blue (V1) + Green (V2) → V2 validated
             Green (V2) → All traffic
```

### Canary Deployment
```
V1: 95% traffic
V2: 5% traffic
    (monitor metrics)
    ↓
V1: 50% traffic
V2: 50% traffic
    (all good?)
    ↓
V1: 0% traffic
V2: 100% traffic
```

### Rolling Deployment
```
Service replicas: [1, 2, 3, 4, 5]

Update 1 of 5 → [1v2, 2, 3, 4, 5]
Update 1 of 5 → [1v2, 2v2, 3, 4, 5]
Update 1 of 5 → [1v2, 2v2, 3v2, 4, 5]
Update 1 of 5 → [1v2, 2v2, 3v2, 4v2, 5]
Update 1 of 5 → [1v2, 2v2, 3v2, 4v2, 5v2]

All updated with zero downtime
```

## Monitoring & Observability

### Distributed Tracing
```
Request: POST /api/orders
  ├─ Order Service: 50ms
  │  ├─ Validate: 10ms
  │  └─ Save: 40ms
  ├─ Payment Service: 200ms
  │  ├─ Check balance: 50ms
  │  ├─ Process: 100ms
  │  └─ Confirm: 50ms
  └─ Notification: 100ms
       └─ Send email: 100ms

Total: 350ms
```

### Metrics
```
- Request count per service
- Response time (p50, p95, p99)
- Error rate by service
- Database query time
- Cache hit ratio
```

### Logging
```
{
  "timestamp": "2026-07-28T10:30:00Z",
  "trace_id": "abc123def456",
  "service": "payment-service",
  "level": "ERROR",
  "message": "Payment processing failed",
  "details": {
    "customer_id": 123,
    "amount": 100.00,
    "error": "Insufficient balance"
  }
}
```

## Migration Path

### Phase 1: Identify Service Boundaries
```
Monolith →  Analyze dependencies
            ↓
            Define service boundaries (DDD)
            ↓
            Create dependency graph
```

### Phase 2: Extract First Service (Strangler Pattern)
```
Monolith (Order + Payment)
    ↓
Monolith (Order) + Payment Service (extracted)
    ↓
API Gateway routes Payment calls to new service
```

### Phase 3: Repeat
```
Extract User Service
Extract Notification Service
Extract Product Service
...
```

### Phase 4: Stabilize
```
All services extracted
    ↓
Communication patterns optimized
    ↓
Observability complete
    ↓
Runbook and automation ready
```

## When NOT to Use Microservices

❌ **Early-stage startup** – Move fast with monolith  
❌ **Simple CRUD app** – Overkill complexity  
❌ **Small team** – Operational overhead high  
❌ **Extreme consistency requirements** – Use monolith with transactions  

## Best Practices

✅ **Start with monolith** – Extract services when needed  
✅ **Clear ownership** – Each team owns 1-2 services  
✅ **API versioning** – Support multiple versions  
✅ **Async communication** – Reduce coupling  
✅ **Shared nothing** – No direct database access  
✅ **Circuit breaker** – Fault isolation  
✅ **Comprehensive testing** – Unit + integration + contract  
✅ **Observability** – Logs, metrics, traces  

---

## See Also

- [API Design](../technologies/api-design.md) – Service contracts
- [Event-Driven Architecture](../architecture-principles/event-driven.md) – Async communication
- [Saga Pattern](saga.md) – Distributed transactions
- [Circuit Breaker](circuit-breaker.md) – Fault tolerance
- [Kubernetes](../technologies/kubernetes.md) – Container orchestration

## Interview Talking Points

- **Scale:** Migrated multiple systems to microservices
- **Architecture:** Service boundary definition using DDD
- **Communication:** REST + async event patterns
- **Deployment:** Independent service updates, zero downtime
- **Challenges:** Distributed tracing, eventual consistency, operational complexity
- **Tools:** Kubernetes for orchestration, Kafka/RabbitMQ for messaging

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Deep (10+ years)  
**Portfolio Coverage:** 3+ Tier 1 projects
