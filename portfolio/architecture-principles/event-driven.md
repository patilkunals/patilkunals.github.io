---
title: Event-Driven Architecture Principle
summary: Asynchronous communication, loose coupling, scalability, responsiveness
type: principle
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [event-driven, async, microservices, scalability, decoupling]
related: [event-sourcing.md, saga.md, message-queues.md]
---

# Event-Driven Architecture Principle

**Principle:** Services communicate through events rather than direct coupling.

## Concept

### Synchronous (Blocking)
```
Service A calls Service B
  ↓ (waits for response)
If Service B slow/down → Service A blocked
```

### Event-Driven (Async)
```
Service A publishes event
  ↓ (doesn't wait)
Service A continues
  ↓
Multiple consumers process event when ready
```

## Core Patterns

### 1. Publish-Subscribe
```
Order Service publishes "OrderCreated"
  ↓
Multiple subscribers listen:
  - Inventory Service (reserve stock)
  - Notification Service (send email)
  - Analytics Service (record metric)
  - Fraud Detection Service (check)
```

### 2. Event Streaming
```
Events flow through message broker:
  Order Created
    → Payment Confirmed
    → Inventory Reserved
    → Order Shipped
    → Delivery Attempted
    → Delivered

Complete audit trail, multiple consumers
```

## Benefits

### 1. Loose Coupling
```
Services don't know about each other
  - Only know event format
  - Can add/remove services
  - Easy to test in isolation
```

### 2. Scalability
```
Peak load: 10,000 orders/minute
  
Synchronous:
  Order Service → Payment (bottleneck)
  
Event-Driven:
  Order Service (fast) → Queue → Payment (at own pace)
  Order Service continues
```

### 3. Responsiveness
```
User creates order
  - Order Service returns immediately (fast)
  - Async processes (payment, inventory) continue
  - User notified when complete
```

## Portfolio Use Cases

### Digital Insurance Platform
```
Customer submits claim:
  ClaimSubmitted event
    ↓
  └─ Validation Service → ClaimValidated
  └─ Document Service → DocumentRequested
  └─ Notification Service → CustomerNotified

Multiple services process in parallel
```

### Neo Banking Platform
```
Customer initiates transfer:
  TransferRequested event
    ↓
  └─ Fraud Detection → DecisionMade
  └─ Ledger → EntryCreated
  └─ Notification → TransferConfirmed

Async, resilient, scalable
```

## Implementation

### Kafka (Event Streaming)
```
Topics:  orders, payments, shipments, deliveries
Consumers: Payment Service, Inventory Service, Notification Service

Benefits: 
  - Replay events
  - Multiple consumers
  - Ordered per partition
```

### RabbitMQ (Message Routing)
```
Exchange:  orders
Queues:    payment_queue, inventory_queue, notification_queue
Benefits:
  - Flexible routing
  - Dead letter handling
  - Acknowledgment patterns
```

### AWS SNS/SQS
```
SNS Topic:  orders
SQS Queues: payment, inventory, notification
Benefits:
  - Managed service
  - Scales automatically
  - Built-in retry
```

## Best Practices

✅ **Async-first** – Default to events  
✅ **Eventual consistency** – Accept delayed consistency  
✅ **Idempotency** – Handle duplicate events  
✅ **Monitoring** – Track message lag, throughput  
✅ **Error handling** – Dead letter queues  
✅ **Schema versioning** – Events evolve  

❌ **Avoid tight coupling** – No direct service calls  
❌ **Don't force async** – Synchronous okay when needed  

---

**Last Updated:** 2026-07-28
