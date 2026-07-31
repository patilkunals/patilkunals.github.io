---
title: Domain-Driven Design Principle
summary: Business domains, ubiquitous language, bounded contexts, value objects
type: principle
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [ddd, domain-driven-design, business-logic, microservices]
related: [microservices.md, ubiquitous-language.md, bounded-context.md]
links: [https://martinfowler.com/tags/domain%20driven%20design.html]
---

# Domain-Driven Design Principle

**Principle:** Organize architecture around business domains, not technical layers.

## Core Concepts

### 1. Ubiquitous Language
```
Not:     "User Table", "Customer Record"
But:     "Customer", "Account", "Policy" (business terms)

Developers and Business analysts use same terms
  - No translation layer
  - Clear understanding
  - Better communication
```

### 2. Bounded Context
```
Banking Domain:
  - Account Bounded Context (account operations)
  - Payment Bounded Context (payment processing)
  - Loan Bounded Context (lending)

Each context:
  - Own domain model
  - Own database
  - Communicates via APIs/events
```

### 3. Aggregate Root
```
Order aggregate:
  - Order (root)
    - Line Items (child)
    - Delivery Address (child)

Treated as single unit:
  - Transactional boundary
  - Consistency guarantee
  - Loaded together
```

## Example: Insurance Domain

### Contexts
```
Policy Management:
  - Policy, Coverage, Rider
  - Operations: Create, Update, Renew, Cancel

Claims Management:
  - Claim, Claimant, Adjuster
  - Operations: Submit, Validate, Approve, Pay

Customer Management:
  - Customer, Beneficiary, Contact
  - Operations: Register, Update, Verify
```

### Bounded Context Communication
```
Policy Context → Event: "PolicyCreated"
    ↓
Claims Context listens, creates related resources
    ↓
Customer Context listens, updates customer profile
```

## Portfolio Implementation

### Digital Insurance Platform
```
Contexts:
  - Premium Context (calculation, collection)
  - Policy Context (issuance, management)
  - Claims Context (submission, approval)
  - Customer Context (onboarding, management)

Services per context:
  Premium Service owns Premium context
  Policy Service owns Policy context
  Claims Service owns Claims context
  Customer Service owns Customer context

Result: Clear ownership, independent scaling
```

### Neo Banking Platform
```
Contexts:
  - Account Context (account operations)
  - Card Context (card management)
  - Transfer Context (fund transfers)
  - Beneficiary Context (recipient management)

Each context has own database, own APIs
Events connect contexts loosely
```

## Anti-Pattern: Anemic Model

❌ Bad:
```python
class Order:
    def __init__(self):
        self.items = []
        self.total = 0

# Business logic in service (not domain)
def calculate_total(order):
    return sum(item.price for item in order.items)
```

✅ Good:
```python
class Order:
    def __init__(self, items):
        self.items = items
        self._validate()
    
    @property
    def total(self):
        return sum(item.price for item in self.items)
    
    def _validate(self):
        if not self.items:
            raise ValueError("Order must have items")
    
    def can_ship(self):
        return all(item.in_stock for item in self.items)
```

## Strategic Design

### Core Domain
```
What makes us unique?
- Insurance: Claims processing accuracy
- Banking: Fraud detection
- E-commerce: Recommendation engine

Invest heavily, build custom
```

### Supporting Domains
```
Important but not differentiating
- Customer management
- Reporting
- Notifications

Buy off-shelf or build simple
```

### Generic Domains
```
Standard capabilities everyone needs
- User authentication
- Payment processing
- Email delivery

Buy SaaS solutions
```

## Best Practices

✅ **Separate contexts** – Clear boundaries  
✅ **Ubiquitous language** – Everyone speaks same terms  
✅ **Rich models** – Logic in domain, not service layer  
✅ **Event-driven** – Loose coupling between contexts  
✅ **Testing** – Domain-centric tests  

❌ **Avoid anemic models** – Logic spread across services  
❌ **Don't share databases** – Breaks encapsulation  
❌ **Ignore business** – Technical purity over business value  

---

**Last Updated:** 2026-07-28
