---
title: Timeout Pattern
summary: Preventing cascading failures, fast failure, resource management, deadline
type: pattern
category: Portfolio
domain: Resilience
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [timeout, resilience, cascading-failure, fast-failure]
related: [circuit-breaker.md, retry.md, bulkhead.md]
links: [https://learn.microsoft.com/en-us/azure/architecture/patterns/]
---

# Timeout Pattern

Setting time limits on operations to prevent blocking and cascading failures.

## Problem

**Without timeout:**
```
Request → Service A (waits for Service B)
Service B is hanging (stuck)
  ↓ (indefinitely waits)
Service A thread blocked
  ↓ (accumulates threads)
Service A exhausts resources
  ↓
Service A crashes (cascading failure)
```

**With timeout:**
```
Request → Service A calls Service B
  ↓ (timeout: 5 seconds)
After 5s → No response
  ↓
Stop waiting, return error
  ↓
Service A continues (uses fallback)
  ↓
Resources freed, no cascade
```

## Implementation

### HTTP Request Timeout
```python
import requests

# Timeout after 5 seconds
response = requests.get(
    "https://external-service.com/api/data",
    timeout=5  # Total timeout
)
```

### With Read/Connect Timeout
```python
# (connect_timeout, read_timeout)
response = requests.get(
    url,
    timeout=(3, 5)  # 3s to connect, 5s to read
)
```

### Kubernetes Pod Timeout
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-service
spec:
  containers:
  - name: app
    image: my-image
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 10
      timeoutSeconds: 5  # 5 second timeout
      periodSeconds: 10
```

### AWS Lambda Timeout
```python
import boto3

client = boto3.client('lambda')

# Invoke with timeout
try:
    response = client.invoke(
        FunctionName='payment-processor',
        Payload=json.dumps({"amount": 100}),
        ClientContext='timeout=30'  # 30 second timeout
    )
except client.exceptions.RequestLimitExceededException:
    # Timeout or other limit
    return {"status": "failed", "reason": "timeout"}
```

## Timeout Strategy

### Timeout Hierarchy
```
Service Call: 5 seconds
  ↓ (includes network latency)
Read Timeout: 3 seconds
  ↓
Connect Timeout: 2 seconds

Total possible wait: ~5 seconds (not cumulative)
```

### Setting Appropriate Values

```
Fast operations (cache lookup):       500ms
Medium operations (database query):   2-5s
Slow operations (batch processing):   30s
External APIs:                        10-15s
```

## Cascade Prevention

### Bad: No Timeout
```
Request → A (wait forever)
           → B (wait forever)
           → C (wait forever)
           
Result: All blocked
```

### Good: With Timeout
```
Request → A (timeout 5s)
           → B (timeout 3s)
           → C (timeout 1s)

If any fails: Return quickly, continue
```

## Fallback on Timeout

```python
def get_customer_data(customer_id):
    try:
        # Try primary service
        return customers_service.get(customer_id, timeout=5)
    except requests.exceptions.Timeout:
        # Fallback to cache
        cached = cache.get(f"customer:{customer_id}")
        if cached:
            return cached
        
        # Last resort
        return {"name": "Unknown", "cached": True}
```

## Portfolio Example

### Payment Processing
```
Process Payment Workflow:
  1. Validate customer (timeout: 2s)
  2. Check balance (timeout: 3s)
  3. Charge card (timeout: 5s)
  4. Update ledger (timeout: 2s)

If any step times out:
  - Roll back
  - Notify customer
  - Return to pending state

Without timeouts:
  - Could hang indefinitely
  - Customer frustrated
  - System resources exhausted
```

## Monitoring

### Timeout Rate Metrics
```
- Requests per second
- Timeout rate (% of requests that timeout)
- Service response time (p50, p95, p99)

Alert if:
  - Timeout rate > 5%
  - Service latency > threshold
```

### Logging
```json
{
  "timestamp": "2026-07-28T10:30:00Z",
  "service": "payment",
  "operation": "charge_card",
  "duration_ms": 5001,
  "status": "timeout",
  "reason": "External payment service slow"
}
```

## Best Practices

✅ **Set realistic timeouts** – Not too aggressive, not too lenient  
✅ **Use hierarchy** – Outer > Inner timeouts  
✅ **Implement fallback** – Graceful degradation  
✅ **Monitor timeout rate** – Alert if increasing  
✅ **Combine with retry** – Different concerns  
✅ **Combine with circuit breaker** – Stop calling failing service  
✅ **Test timeouts** – Chaos engineering  

## Common Mistakes

❌ **No timeout** – Cascading failures  
❌ **Too short** – Legitimate operations fail  
❌ **No fallback** – Just error, no recovery  
❌ **Ignoring timeout rate** – Can't see problems  

---

**Last Updated:** 2026-07-28
