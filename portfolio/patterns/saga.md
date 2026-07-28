---
title: Saga Pattern - Distributed Transactions
summary: Orchestration, choreography, compensating transactions, eventual consistency
type: pattern
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [saga, distributed-transactions, microservices, eventual-consistency, workflows]
related: [microservices.md, event-driven.md, compensation.md]
---

# Saga Pattern - Distributed Transactions

Coordinating transactions across multiple microservices using saga pattern.

## Problem

**Distributed transactions are hard:**
- Databases are isolated (no global transactions)
- ACID guarantees don't span services
- 2-phase commit doesn't scale

**Traditional transaction:**
```
BEGIN TRANSACTION
  INSERT order
  DEDUCT payment
  RESERVE inventory
COMMIT
```

**Distributed system:**
```
Order Service:     INSERT order
Payment Service:   DEDUCT payment (fails!)
Inventory Service: RESERVE inventory

Result: Order created but payment failed
        Inventory not reserved but payment deducted
        INCONSISTENT STATE!
```

## Solution: Saga Pattern

**Principle:** Break distributed transaction into multiple local transactions with compensating actions.

## Approach 1: Orchestration

**Coordinator service manages the workflow:**

```
Saga Orchestrator
    ↓
Step 1: Create Order
    ↓ (success)
Step 2: Process Payment
    ↓ (success)
Step 3: Reserve Inventory
    ↓ (fails!)
    ↓
Compensate Step 2: Refund Payment
    ↓
Compensate Step 1: Cancel Order
```

### Implementation
```python
class OrderSaga:
    def execute(self, order_request):
        # Step 1: Create order
        order = self.order_service.create(order_request)
        
        try:
            # Step 2: Process payment
            payment = self.payment_service.pay(order.total)
            
            # Step 3: Reserve inventory
            reservation = self.inventory_service.reserve(order.items)
            
            return {"status": "success", "order": order}
        
        except Exception as e:
            # Compensate: Reverse previous steps
            self.payment_service.refund(payment.id)
            self.order_service.cancel(order.id)
            
            return {"status": "failed", "reason": str(e)}
```

### Sequence Diagram
```
Client          Orchestrator     Order Service    Payment Service  Inventory Service
  │                  │                │                │                 │
  └─ Create Order ──→ │                │                │                 │
                      │─ Create ────→  │                │                 │
                      │ ← Order        │                │                 │
                      │                                 │                 │
                      │─ Process Pay ────────────→      │                 │
                      │              ← Confirmed        │                 │
                      │                                 │                 │
                      │─ Reserve Inventory ──────────────────────→       │
                      │                                          ✗ Fail   │
                      │                                                   │
                      │─ Refund ─────────────────→                      │
                      │         ← Refunded                              │
                      │                                                   │
                      │─ Cancel ──→  │                                   │
                      │ ← Cancelled   │                                  │
                      │                                                   │
  ← Failure ─────────│
```

## Approach 2: Choreography

**Services communicate via events (no central coordinator):**

```
Order Service publishes: "OrderCreated"
    ↓
Payment Service subscribes, processes payment
    ↓ publishes: "PaymentConfirmed"
Inventory Service subscribes, reserves items
    ↓ publishes: "InventoryReserved"
Order Service confirms order

If Inventory fails:
    ↓ publishes: "InventoryFailed"
Payment Service subscribes
    ↓ publishes: "PaymentRefunded"
Order Service publishes: "OrderCancelled"
```

### Event Flow
```python
# Order Service
def create_order(order_data):
    order = save_order(order_data)
    publish_event("order.created", order)
    return order

# Payment Service
@subscribe("order.created")
def handle_order_created(event):
    try:
        payment = process_payment(event.order.total)
        publish_event("payment.confirmed", payment)
    except:
        publish_event("payment.failed", {"order_id": event.order.id})

# Inventory Service
@subscribe("payment.confirmed")
def handle_payment_confirmed(event):
    try:
        reservation = reserve_inventory(event.items)
        publish_event("inventory.reserved", reservation)
    except:
        publish_event("inventory.failed", {"order_id": event.order.id})
        # Payment service will listen and refund

# Payment Service (compensating)
@subscribe("inventory.failed")
def handle_inventory_failed(event):
    refund_payment(event.order.total)
    publish_event("payment.refunded", event)

# Order Service (failure handling)
@subscribe("inventory.failed", "payment.failed")
def handle_failure(event):
    cancel_order(event.order.id)
    publish_event("order.cancelled", event)
```

## Orchestration vs. Choreography

| Aspect | Orchestration | Choreography |
|--------|---------------|--------------|
| **Coordinator** | Central service | None (event-driven) |
| **Complexity** | Easier to understand | Harder to follow |
| **Coupling** | Central point couples services | Loosely coupled |
| **Testing** | Mock orchestrator | Mock event publishers |
| **Failure handling** | Clear in one place | Distributed logic |
| **Performance** | More hops possible | Fewer hops |
| **Debugging** | Easier (centralized) | Harder (distributed) |

**Recommendation:** Start with orchestration, move to choreography for truly independent services.

## Portfolio Implementations

### Digital Insurance Platform
- **Pattern:** Orchestration
- **Workflow:** Premium calculation → Payment → Policy creation
- **Compensation:** Refund if policy creation fails
- **Scale:** 15+ team

### Neo Banking Platform
- **Pattern:** Hybrid (orchestration + events)
- **Workflow:** Account opening → KYC → Card issuance → Activation
- **Compensation:** Close account if KYC fails

## Idempotency & Deduplication

**Problem:** Network failures can cause duplicate calls.

**Solution:** Idempotent operations with deduplication keys.

```python
# Idempotent request
POST /api/payments
{
  "idempotency_key": "abc123",
  "order_id": 456,
  "amount": 100.00
}

# Service stores idempotency key
# If duplicate request → return cached result
# No duplicate charge!
```

### Implementation
```python
from redis import Redis

class IdempotentService:
    def __init__(self):
        self.cache = Redis()
    
    def process_payment(self, idempotency_key, amount):
        # Check if already processed
        cached = self.cache.get(idempotency_key)
        if cached:
            return json.loads(cached)  # Return cached result
        
        # Process
        result = charge_card(amount)
        
        # Cache result (expire after 24 hours)
        self.cache.setex(
            idempotency_key,
            86400,
            json.dumps(result)
        )
        
        return result
```

## Timeout Handling

**Problem:** Services hang or never respond.

**Solution:** Set reasonable timeouts with exponential backoff.

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
def call_payment_service(order_id):
    # Retry up to 3 times with exponential backoff
    # 2s, then 4s, then 8s
    return requests.post(
        "https://payment-service/pay",
        json={"order_id": order_id},
        timeout=5  # 5 second timeout per request
    )
```

## Monitoring Saga Execution

```
Saga Execution Timeline:
├─ Step 1 (Order): 10ms ✓
├─ Step 2 (Payment): 200ms ✓
├─ Step 3 (Inventory): 50ms ✗ FAILS
│
├─ Compensate Step 2: 150ms ✓
└─ Compensate Step 1: 50ms ✓

Total: 460ms | Status: COMPENSATED
```

### Monitoring Queries
```python
# Failed sagas
SELECT count(*) FROM saga_execution
WHERE status = 'COMPENSATED' 
AND created_at > NOW() - INTERVAL '1 hour'

# Long-running sagas (potential hangs)
SELECT * FROM saga_execution
WHERE status = 'RUNNING'
AND started_at < NOW() - INTERVAL '5 minutes'

# Timeout analysis
SELECT step_name, avg(duration), max(duration)
FROM saga_steps
GROUP BY step_name
ORDER BY avg(duration) DESC
```

## Best Practices

✅ **Make operations idempotent** – Handle duplicates safely  
✅ **Set reasonable timeouts** – Don't wait forever  
✅ **Log everything** – Trace saga execution  
✅ **Implement compensations** – Plan for failure  
✅ **Monitor saga state** – Alert on failures  
✅ **Use eventual consistency** – Accept eventual correctness  
✅ **Test failure scenarios** – Chaos engineering  

## Common Pitfalls

❌ **No compensation logic** – Leaves system inconsistent  
❌ **Long-running sagas** – Reduce scope or add timeouts  
❌ **Ignoring network failures** – Not idempotent  
❌ **Overly complex workflows** – Keep sagas simple  
❌ **No monitoring** – Can't see what went wrong  

---

## See Also

- [Microservices](microservices.md) – Architecture using sagas
- [Event-Driven](../architecture-principles/event-driven.md) – Async communication
- [Circuit Breaker](circuit-breaker.md) – Fault tolerance
- [Compensation Pattern](compensation.md) – Reversing operations

## Interview Talking Points

- **Scale:** Managing complex workflows across 3+ services
- **Failure Recovery:** Designing compensation logic for consistency
- **Idempotency:** Handling retries without side effects
- **Monitoring:** Tracking saga execution and detecting failures
- **Trade-offs:** Eventual consistency vs. immediate consistency

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Deep (10+ years)  
**Portfolio Coverage:** 2+ Tier 1 projects
