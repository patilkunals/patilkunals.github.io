---
title: Fallback Pattern
summary: Graceful degradation, alternative responses, user experience preservation
type: pattern
category: Portfolio
domain: Resilience
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [fallback, resilience, degradation, graceful]
related: [circuit-breaker.md, timeout.md, retry.md]
links: [https://learn.microsoft.com/en-us/azure/architecture/patterns/]
---

# Fallback Pattern

Providing alternative functionality when primary service fails.

## Concept

**Without fallback:**
```
User requests feature
  ↓
Service fails
  ↓
Error shown to user
  ↓
Poor experience
```

**With fallback:**
```
User requests feature
  ↓
Primary service fails
  ↓
Fallback strategy activated
  ├─ Cached response, OR
  ├─ Simplified version, OR
  ├─ Default value
  ↓
User gets response (degraded but useful)
  ↓
Good experience
```

## Fallback Strategies

### 1. Cached Response
```python
def get_customer(customer_id):
    try:
        # Try service
        return customer_service.get(customer_id, timeout=2)
    except Timeout:
        # Fall back to cache
        cached = redis.get(f"customer:{customer_id}")
        if cached:
            return json.loads(cached)
        
        # Last resort: minimal data
        return {"id": customer_id, "name": "Unknown"}
```

### 2. Degraded Service
```python
def recommend_products(customer_id):
    try:
        # Try personalized
        return recommendation_engine.personalize(customer_id)
    except ServiceUnavailable:
        # Fall back to popular products
        return get_trending_products()
```

### 3. Default Value
```python
def get_exchange_rate(currency):
    try:
        return rate_service.get_rate(currency)
    except:
        # Use last known rate
        last_rate = db.get_last_rate(currency)
        if last_rate and last_rate.age < 24_hours:
            return last_rate
        
        # Hard-coded default (rarely used)
        return 1.0  # Neutral rate
```

### 4. Queuing for Later
```python
def send_email(customer):
    try:
        # Try immediate send
        email_service.send(customer.email, subject, body)
    except Timeout:
        # Queue for batch processing
        email_queue.push({
            'customer': customer,
            'subject': subject,
            'body': body
        })
        return "Email queued (will send shortly)"
```

## Portfolio Examples

### Notification Service
```
Primary: Real-time email via external provider
Fallback 1: Queue for batch processing
Fallback 2: Store in database, send later
Fallback 3: Log to system (notify manually if persistent)

Result: No notification lost
```

### Product Recommendations
```
Primary: ML-based personalized recommendations
Fallback 1: Popular products (same category)
Fallback 2: Recently viewed products
Fallback 3: Best sellers globally

Result: Customer always sees suggestions
```

### Currency Exchange
```
Primary: Real-time rate from external API
Fallback 1: Rate from 1 hour ago
Fallback 2: Rate from yesterday
Fallback 3: Last known stable rate

Result: Commerce continues (with slight risk)
```

## Monitoring Fallbacks

### Alert on Fallback Usage
```
If fallback activated:
  ├─ Log event
  ├─ Increment counter
  └─ Alert if > threshold

Alerts:
  - "Recommendation service down, using fallback"
  - "Email service unavailable, queueing emails"
  - "Exchange rate API unreliable, using cached rate"
```

### Metrics
```
fallback_activated_total (counter)
fallback_type (cache, degraded, default, queue)
fallback_age (how old is cache)
time_until_primary_recovered (when does primary come back)
```

## Best Practices

✅ **Provide valuable fallback** – Not just error message  
✅ **Inform user** – "Feature slightly limited" message  
✅ **Monitor usage** – Alert when fallback active  
✅ **Keep cache fresh** – Pre-warm on startup  
✅ **Test fallback behavior** – Chaos engineering  
✅ **Define strategy per service** – Different risks need different approaches  

---

**Last Updated:** 2026-07-28
