---
title: Event Sourcing Pattern
summary: Immutable event log, state reconstruction, audit trail, temporal queries
type: pattern
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [event-sourcing, event-log, immutable, audit-trail, reconstruction]
related: [cqrs.md, saga.md, event-driven.md]
---

# Event Sourcing Pattern

Storing application state as an immutable log of events instead of current state.

## Concept

**Traditional State Storage:**
```
Current State:
{
  "customer_id": 123,
  "balance": 900,
  "status": "active"
}

Problem: History lost, difficult to audit, hard to understand how we got here
```

**Event Sourcing:**
```
Event Stream (Immutable):
1. CustomerCreated(id=123, name="John", initial_balance=1000)
2. MoneyWithdrawn(amount=100)
3. MoneyDeposited(amount=50)
4. MoneyWithdrawn(amount=50)

Current State = Replay all events from start
  = 1000 - 100 + 50 - 50
  = 900

Benefits:
  - Complete history available
  - Understand state changes
  - Replay to debug
  - Point-in-time queries
```

## Architecture

### Event Store (Immutable Log)
```
┌─────────────────────────────────────────┐
│ Event Store                             │
│ (Append-only log)                       │
│                                         │
│ 1: AccountCreated(123)                  │
│ 2: Deposit(100)                         │
│ 3: Withdrawal(25)                       │
│ 4: Transfer(50, to=456)                 │
│ 5: Closure()                            │
│                                         │
│ (Can only append, never modify/delete)  │
└─────────────────────────────────────────┘
```

### State Reconstruction
```python
def reconstruct_state(account_id):
    state = {}
    
    for event in event_store.get_events(account_id):
        state = apply_event(state, event)
    
    return state

def apply_event(state, event):
    if isinstance(event, AccountCreated):
        return {"id": event.id, "balance": 0, "created": event.timestamp}
    elif isinstance(event, Deposited):
        state["balance"] += event.amount
        return state
    elif isinstance(event, Withdrawn):
        state["balance"] -= event.amount
        return state
```

## Implementation

### Event Store (PostgreSQL with Event Table)
```sql
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    aggregate_id UUID NOT NULL,
    aggregate_type VARCHAR(255),
    event_type VARCHAR(255) NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL,
    version INT NOT NULL
);

-- Immutable events
INSERT INTO events (aggregate_id, event_type, data, created_at, version)
VALUES (
    '123e4567-e89b-12d3-a456-426614174000',
    'CustomerCreated',
    '{"name": "John", "initial_balance": 1000}',
    NOW(),
    1
);

-- Query events for reconstruction
SELECT * FROM events
WHERE aggregate_id = '123e4567-e89b-12d3-a456-426614174000'
ORDER BY version;
```

### Python Implementation
```python
class EventStore:
    def __init__(self, db):
        self.db = db
    
    def append_event(self, aggregate_id, event):
        # Get next version
        last_version = self.db.query(
            "SELECT MAX(version) FROM events WHERE aggregate_id = %s",
            (aggregate_id,)
        )
        next_version = (last_version or 0) + 1
        
        # Append (never update)
        self.db.insert(
            "events",
            aggregate_id=aggregate_id,
            event_type=event.__class__.__name__,
            data=json.dumps(event.__dict__),
            version=next_version
        )
    
    def get_events(self, aggregate_id):
        rows = self.db.query(
            "SELECT * FROM events WHERE aggregate_id = %s ORDER BY version",
            (aggregate_id,)
        )
        
        return [deserialize(row["event_type"], row["data"]) for row in rows]
    
    def rebuild_state(self, aggregate_id):
        events = self.get_events(aggregate_id)
        state = Account(aggregate_id)
        
        for event in events:
            state.apply(event)
        
        return state
```

## Portfolio Use Cases

### Insurance Claims Processing
```
Claim Event Log:
1. ClaimSubmitted(customer_id=123, amount=1000)
2. ClaimValidated(by="adjuster1")
3. DocumentRequested(for="proof_of_loss")
4. DocumentReceived(count=3)
5. ClaimApproved(approved_amount=1000)
6. PaymentProcessed(date="2026-07-28")

Audit Trail: Complete history
Replay: Investigate any step
Temporal: State at any point in time
```

### Banking Transactions
```
Account History:
1. AccountOpened(customer=123, type="savings")
2. Deposit(100)
3. Deposit(50)
4. Withdrawal(30)
5. InterestApplied(2.5)
6. FeeCharged(5)

Reconciliation: Match sum of events to current balance
Time Travel: Balance on any date
Dispute: Replay events to verify correctness
```

## Advanced Capabilities

### Snapshot (Performance Optimization)
```
Problem: 10,000 events per account → rebuild slow

Solution: Store snapshots

Events                  Snapshots
└─ Event 1             ├─ Snapshot at event 5000
  └─ Event 2            │  (state = ...)
    ...                 │
  └─ Event 5000 ────────┘
    ...                 ├─ Snapshot at event 10000
  └─ Event 10000 ───────┘


Rebuild: Restore from latest snapshot, apply remaining events
10000 events → 1 snapshot + 100 events (100x faster)
```

### Projection (Derived Views)
```
Event Log                Multiple Projections
│                       ├─ Dashboard View
├─ Customer Created      │  (denormalized)
├─ Order Placed         ├─ Analytics View
├─ Order Shipped        │  (aggregated)
├─ Money Received       └─ Reporting View
                            (for compliance)
```

### Point-in-Time Queries
```python
def get_balance_on_date(account_id, target_date):
    # Get all events until target_date
    events = event_store.get_events_until(account_id, target_date)
    
    # Replay
    state = Account(account_id)
    for event in events:
        state.apply(event)
    
    return state.balance

# Example: What was balance on July 1?
balance_july_1 = get_balance_on_date("123", "2026-07-01")
```

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **Event log grows large** | Snapshots, archival, partitioning |
| **Event schema changes** | Versioning, upcasting |
| **Debugging complex state** | Replay tool, visualization |
| **Rebuilding projections** | Idempotent handlers, versioned handlers |
| **Consistency between aggregates** | Saga pattern, eventual consistency |

## Best Practices

✅ **Immutability** – Never modify or delete events  
✅ **Versioning** – Events may change schema over time  
✅ **Snapshots** – Optimize large event streams  
✅ **Idempotent handlers** – Handle duplicate events  
✅ **Event naming** – Use past tense (OrderCreated)  
✅ **Complete events** – Store all relevant data  
✅ **Timestamp precision** – Use microseconds  

## Performance Considerations

### Event Store Size
```
1 million accounts
10 events per account (average)
10 million total events

Query: Get all events for account
→ B-tree index on (aggregate_id, version)
→ < 1ms response time
```

### Projection Updates
```
Online (Real-time):
  Event published → Immediately update projection
  Latency: 10-50ms
  
Batch (Periodic):
  Every 5 minutes, rebuild projections
  Latency: Up to 5 minutes
  
Hybrid:
  Online for critical projections
  Batch for reporting/analytics
```

## When to Use Event Sourcing

✅ **Audit requirements** – Complete history required  
✅ **Debugging** – Replay events to understand behavior  
✅ **Complex domain logic** – Events capture decisions  
✅ **Temporal queries** – State at any point in time  
✅ **Event-driven systems** – Natural fit  

❌ **Simple CRUD** – Over-engineering  
❌ **Real-time strong consistency** – Complexity not worth it  
❌ **Small team** – Operational overhead  

---

## See Also

- [CQRS](cqrs.md) – Common pairing with event sourcing
- [Event-Driven Architecture](../architecture-principles/event-driven.md) – Pattern overview
- [Saga Pattern](saga.md) – Distributed transactions

## Interview Talking Points

- **Audit Trail:** Complete, immutable history of changes
- **Debugging:** Replay events to investigate issues
- **Temporal:** Query state at any point in time
- **Performance:** Snapshots and projections optimization
- **Complexity Trade-off:** Benefits vs. operational overhead

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Advanced (5+ years)  
**Portfolio Coverage:** Insurance, Banking projects
