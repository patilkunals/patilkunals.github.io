---
title: CQRS Pattern - Command Query Responsibility Segregation
summary: Separate read and write models, query optimization, event sourcing integration
type: pattern
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [cqrs, event-sourcing, read-model, write-model, optimization]
related: [event-sourcing.md, microservices.md, eventual-consistency.md]
links: [https://martinfowler.com/bliki/CQRS.html]
---

# CQRS Pattern - Command Query Responsibility Segregation

Separating read and write operations into independent models for optimization and scalability.

## Concept

**Traditional CRUD:**
```
User → Write → Database
    → Read  ↓
         Database
```

Problem: Same model optimized for writes and reads (compromise)

**CQRS Approach:**
```
             Write Model
User Input
   ↓
Writes → Write Database (optimized for transactions)
            ↓
         Event Store (immutable log)
            ↓
         Read Model Updater
            ↓
       Read Databases (optimized for queries)
   ↓
Reads → Query Service (many read databases)
```

## Core Components

### Write Model (Command Side)
- Optimized for writes
- Full data validation
- ACID transactions
- Normalized schema
- Example: Customer account update

```python
class WriteModel:
    def create_order(self, customer_id, items):
        # Validate
        customer = self.validate_customer(customer_id)
        
        # Transaction
        with transaction():
            order = Order.create(customer_id, items)
            inventory.reserve(items)
            
            # Publish event
            self.publish(OrderCreated(order.id, items))
        
        return order.id  # Just return ID
```

### Read Model (Query Side)
- Optimized for reads
- Denormalized schema
- Fast queries (no joins)
- Multiple databases by use case
- Example: Order summary dashboard

```python
class ReadModel:
    def get_order_summary(self, order_id):
        # Direct read from denormalized cache
        return order_cache.get(order_id)

    def get_customer_orders_for_dashboard(self, customer_id):
        # Pre-aggregated data
        return dashboard_cache.get(f"customer:{customer_id}:orders")
    
    def get_inventory_status(self):
        # Real-time inventory view
        return inventory_view_cache.get_all()
```

## Synchronization (Write → Read)

### Event-Driven Sync
```
Write Model publishes event
         ↓
Event Bus (Kafka, RabbitMQ)
         ↓
Multiple consumers update read models
    - Read Cache #1
    - Read Cache #2
    - Analytics Database
    - Search Index
```

### Benefits
- Multiple read models for different use cases
- Independent scaling
- Real-time updates via events
- Eventual consistency

## Portfolio Implementation

### Digital Insurance Platform
```
Write Side:
  - Premium calculation engine
  - Policy creation
  - Claim registration
  - Commands: CreatePolicy, SubmitClaim, PaymentReceived

Read Side:
  - Customer dashboard (denormalized view)
  - Agent portal (filtered by agent)
  - Analytics database (aggregated)
  - Search: Policy by customer, claims by date

Events sync all:
  - PolicyCreated → Update all read models
  - ClaimSubmitted → Update all read models
  - PaymentReceived → Update all read models
```

## Multi-Database Example

```
Events:
  OrderCreated
  OrderShipped
  OrderDelivered

Read Model 1 (Dashboard):
  {
    "customer_id": 123,
    "total_orders": 5,
    "pending": 1,
    "delivered": 4
  }

Read Model 2 (Fulfillment):
  {
    "order_id": 456,
    "status": "shipped",
    "carrier": "FedEx",
    "tracking": "1234567"
  }

Read Model 3 (Analytics):
  {
    "date": "2026-07-28",
    "orders": 1000,
    "revenue": 50000,
    "avg_value": 50
  }
```

## Eventual Consistency Handling

### Write Command
```python
def create_order(order_data):
    # Write synchronously
    order_id = write_model.create(order_data)
    
    # Return immediately
    return {
        "status": "created",
        "order_id": order_id,
        "warning": "Read model updates in progress"
    }

# Caller doesn't immediately see in read model
# But within milliseconds it's available
```

### Client-Side Handling
```javascript
// Place order
const response = await placeOrder(orderData);

// Poll for consistency
let attempts = 0;
while (attempts < 10) {
    const order = await getOrder(response.order_id);
    if (order.status === "confirmed") {
        break;  // Read model updated
    }
    await sleep(100);  // Wait 100ms
    attempts++;
}
```

## Complexity: Single vs. Multiple Databases

### Single Database (Simpler)
```python
# Write and read from same database
# Only denormalize in caching layer

class OrderService:
    def create(self, data):
        # Write
        order = db.insert_order(data)
        
        # Update cache
        cache.set(f"order:{order.id}", order)
        
        # Async event for analytics
        publish_event("OrderCreated", order)
        
        return order
    
    def get(self, order_id):
        # Check cache first
        cached = cache.get(f"order:{order_id}")
        if cached:
            return cached
        
        # Otherwise query database
        order = db.get_order(order_id)
        cache.set(f"order:{order.id}", order)
        return order
```

### Multiple Databases (Powerful but Complex)
```
Write Model          Read Models
  │
  ├─ PostgreSQL      ├─ Redis (cache)
  │  (transactional) ├─ Elasticsearch (search)
  │                  ├─ DynamoDB (analytics)
  │                  └─ Data Warehouse (reporting)
```

## When to Use CQRS

✅ **Complex read requirements** – Many different query patterns  
✅ **High read volume** – Need optimization  
✅ **Eventual consistency acceptable** – Not real-time requirement  
✅ **Independent scaling** – Reads and writes different loads  
✅ **Event sourcing** – Natural fit with CQRS  

❌ **Simple CRUD** – Over-engineering  
❌ **Strong consistency required** – Conflicts with eventual consistency  
❌ **Small team** – Operational complexity  
❌ **Real-time requirements** – Sync overhead  

## Performance Impact

### Query Performance
```
Before (Single Database):
  SELECT * FROM orders
    JOIN customers ON ...
    JOIN items ON ...
    WHERE customer_id = 123
  → 200ms (3 joins)

After (CQRS):
  SELECT * FROM order_view
    WHERE customer_id = 123
  → 10ms (denormalized)
  
Performance: 20x faster
```

### Write Performance
```
Before:
  INSERT order (1ms)
  UPDATE inventory (5ms)
  Total: 6ms, synchronous

After:
  INSERT order (1ms)
  Publish event (0.5ms)
  Total: 1.5ms, async inventory updates
  
Performance: 4x faster (non-blocking)
```

## Common Challenges

| Challenge | Solution |
|-----------|----------|
| **Eventual consistency confuses users** | Optimistic UI updates, polling |
| **Multiple databases complex** | Start with cache layer only |
| **Keeping read models in sync** | Event sourcing, event stream |
| **Debugging failures** | Rebuild read models from events |
| **Testing complexity** | Separate tests for write/read |

## Best Practices

✅ **Start simple** – Cache layer before multiple DBs  
✅ **Use event sourcing** – Audit trail and rebuild capability  
✅ **Monitor lag** – Track read model update latency  
✅ **Versioning** – Events and schemas evolve  
✅ **Idempotent updates** – Handle duplicate events  
✅ **Clear boundaries** – Document read/write separation  
✅ **Rebuild capability** – Recreate read models from events  

## Comparison: Simple vs. CQRS

| Aspect | Traditional | CQRS |
|--------|------------|------|
| **Complexity** | Simple | Complex |
| **Query Speed** | Medium | Very Fast |
| **Write Speed** | Medium | Very Fast |
| **Consistency** | Strong | Eventual |
| **Database load** | Balanced | Asymmetric |
| **Debugging** | Easy | Harder |
| **Cost** | Lower | Higher (more DBs) |

---

## See Also

- [Event Sourcing](event-sourcing.md) – Pair with CQRS
- [Eventual Consistency](../architecture-principles/eventual-consistency.md) – Core concept
- [Microservices](microservices.md) – Architecture context

## Interview Talking Points

- **Query Optimization:** CQRS for dashboard vs. transactional systems
- **Scale:** Handling 1000x read vs. 1x write asymmetry
- **Complexity Trade-off:** When CQRS worth the overhead
- **Implementation:** Cache layer → Event-driven → Multiple DBs
- **Consistency:** Explaining eventual consistency to stakeholders

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Advanced (5+ years)  
**Portfolio Coverage:** Digital Insurance Platform
