---
title: Bulkhead Pattern
summary: Resource isolation, preventing cascading failure, independent failure domains
type: pattern
category: Portfolio
domain: Resilience
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [bulkhead, resilience, isolation, thread-pools, resource-management]
related: [circuit-breaker.md, timeout.md, retry.md]
links: [https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead]
---

# Bulkhead Pattern

Isolating resources to prevent one failing component from bringing down entire system.

## Concept (From Naval Architecture)

**Bulkhead:** Watertight compartment in ship.
- If one compartment floods, door closes
- Other compartments remain safe
- Ship stays afloat

**In software:** Separate resource pools for different operations.

## Problem

**Without bulkheads:**
```
Thread Pool (100 threads)
  ├─ Payment Service (using 80 threads)
  ├─ Notification Service (using 20 threads)
  └─ (no threads left)

Result:
  - Payment slow (contends for resources)
  - Notification fails (no threads)
  - Customer experience degraded
```

**With bulkheads:**
```
Thread Pool A: Payment Service (50 threads max)
Thread Pool B: Notification Service (30 threads max)
Thread Pool C: Other (20 threads max)

Result:
  - Each service has guaranteed resources
  - One slow service doesn't starve others
```

## Implementation

### Java Thread Pools
```java
// Bulkhead A: Payment operations
ExecutorService paymentExecutor = Executors.newFixedThreadPool(10);

// Bulkhead B: Notification operations
ExecutorService notificationExecutor = Executors.newFixedThreadPool(5);

// Bulkhead C: Other operations
ExecutorService defaultExecutor = Executors.newFixedThreadPool(20);

// Usage
paymentExecutor.execute(() -> processPayment(order));
notificationExecutor.execute(() -> sendEmail(customer));
```

### Resilience4j (Java)
```java
@Bulkhead(name = "payment", type = Bulkhead.Type.THREADPOOL)
@ThreadPoolBulkhead(
    name = "payment",
    maxThreadPoolSize = 10,
    coreThreadPoolSize = 5,
    queueCapacity = 20
)
public void processPayment(Order order) {
    paymentService.charge(order.total);
}

@Bulkhead(name = "notification", type = Bulkhead.Type.SEMAPHORE)
@Bulkhead(name = "notification", maxConcurrentCalls = 5)
public void sendNotification(String message) {
    notificationService.send(message);
}
```

### Python with ThreadPoolExecutor
```python
from concurrent.futures import ThreadPoolExecutor

# Separate executors (bulkheads)
payment_executor = ThreadPoolExecutor(max_workers=10, thread_name_prefix="payment")
notification_executor = ThreadPoolExecutor(max_workers=5, thread_name_prefix="notify")
query_executor = ThreadPoolExecutor(max_workers=20, thread_name_prefix="query")

# Usage
payment_executor.submit(process_payment, order)
notification_executor.submit(send_email, customer)
query_executor.submit(query_database, "SELECT ...")
```

## Bulkhead Types

### 1. Thread Pool Bulkhead
```
Dedicated thread pool per service
  Pros: True isolation
  Cons: Thread overhead

Best for: CPU-intensive operations
```

### 2. Semaphore Bulkhead
```
Limit concurrent calls (lightweight)
  Pros: Low overhead
  Cons: Shared thread pool

Best for: I/O operations (network, database)
```

### 3. Connection Pool Bulkhead
```
Database connections isolated per service
  Service A: 10 connections
  Service B: 10 connections
  Service C: 10 connections
  
  Prevents one service from exhausting all connections
```

## Monitoring

### Queue Depth
```
If notification queue backs up:
  ├─ New notifications rejected
  ├─ Alert: High notification backlog
  └─ Action: Investigate why slow
```

### Thread Utilization
```
Payment threads: 8/10 (80% used)
Notification threads: 4/5 (80% used)
Query threads: 3/20 (15% used)

Alert if any bulkhead at 90%+ consistently
```

## Portfolio Example

### Digital Insurance Platform
```
Service boundaries with bulkheads:

Premium Calculation:
  - Thread pool: 20
  - Queue: 50
  - Timeout: 5s

Claims Processing:
  - Thread pool: 15
  - Queue: 30
  - Timeout: 10s

Notification Service:
  - Thread pool: 5
  - Queue: 100
  - Timeout: 2s

Result:
  - Premium slow doesn't impact claims
  - Claims slow doesn't block notifications
  - System degrades gracefully
```

## Anti-Pattern: No Isolation

```
❌ Without bulkheads:
   Global thread pool (100 threads)
   ├─ Premium calculation grabs 80
   ├─ Claims processing gets 15
   └─ Notification gets 5 (not enough)
   
   Problems:
   - Notification service times out
   - Users don't get updates
   - Claims processing slow
   - System cascades

✅ With bulkheads:
   Payment: 30 threads
   Claims: 25 threads
   Notification: 20 threads
   Other: 25 threads
   
   Benefits:
   - Each service guaranteed resources
   - Graceful degradation
   - Predictable performance
```

## Best Practices

✅ **Right-size bulkheads** – Not too small (rejection), not too large (waste)  
✅ **Monitor queue depth** – Detect backups early  
✅ **Set rejection policies** – What to do when full  
✅ **Combine with circuit breaker** – Prevent resource waste  
✅ **Test under load** – Verify isolation works  
✅ **Document boundaries** – Team understanding  

## Configuration Example

```yaml
bulkheads:
  payment:
    maxThreadPoolSize: 20
    coreThreadPoolSize: 10
    queueCapacity: 50
    rejectionPolicy: ABORT
    
  claims:
    maxThreadPoolSize: 15
    coreThreadPoolSize: 8
    queueCapacity: 30
    rejectionPolicy: ABORT
    
  notification:
    maxThreadPoolSize: 10
    coreThreadPoolSize: 5
    queueCapacity: 100
    rejectionPolicy: QUEUE
```

---

**Last Updated:** 2026-07-28
