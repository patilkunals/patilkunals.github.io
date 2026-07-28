---
title: Retry Pattern
summary: Transient failure handling, exponential backoff, jitter, idempotency
type: pattern
category: Portfolio
domain: Resilience
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [retry, resilience, transient-failures, exponential-backoff]
related: [circuit-breaker.md, timeout.md, idempotency.md]
---

# Retry Pattern

Automatically recovering from transient failures by retrying operations.

## Concept

**Transient failure:** Temporary error that may succeed if retried.

```
Request → Service fails (timeout)
  ↓ (wait 1 second)
Retry 1 → Service still busy
  ↓ (wait 2 seconds)
Retry 2 → Service recovers
  ↓
Success
```

## Implementation

### Basic Retry Loop
```python
def call_service_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=5)
            return response.json()
        except requests.exceptions.Timeout:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise
```

### Exponential Backoff with Jitter
```python
import random
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
def call_payment_service(payment_data):
    return requests.post("https://payment-service/pay", json=payment_data)

# Actual waits:
# Attempt 1: 2s
# Attempt 2: 2-4s (exponential + jitter)
# Attempt 3: 4-8s
# Attempt 4: 8s (capped at max=10)
# Attempt 5: Fail
```

### With Jitter (Prevent Thundering Herd)
```python
import random
import time

def retry_with_jitter(func, max_retries=5):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt < max_retries - 1:
                # Wait = base * (2 ^ attempt) + random jitter
                wait_time = (2 ** attempt) + random.uniform(0, 1)
                time.sleep(wait_time)
            else:
                raise
```

## Retry Strategies

### Fixed Delay
```
Retry every 2 seconds
Attempt 1: 0s (fail)
Attempt 2: 2s (fail)
Attempt 3: 4s (success)

Simple but inefficient
```

### Linear Backoff
```
Wait = 1 * attempt
Attempt 1: 1s
Attempt 2: 2s
Attempt 3: 3s
```

### Exponential Backoff (Recommended)
```
Wait = 2 ^ attempt
Attempt 1: 2s
Attempt 2: 4s
Attempt 3: 8s
Attempt 4: 16s
Attempt 5: 32s

Gives service time to recover
```

## When NOT to Retry

❌ **4xx errors** (400, 401, 403, 404) – Client error, not transient  
❌ **Invalid input** – Will fail again  
❌ **Authentication failure** – Won't succeed by retrying  

✅ **5xx errors** (500, 502, 503) – Server errors, may be transient  
✅ **Timeout** – Service temporarily busy  
✅ **Connection refused** – Service restarting  

## Idempotency Requirement

**Problem:** If not idempotent, retrying causes duplicates.

```
Request 1: Transfer $100 → Success
Request 2 (retry): Transfer $100 → Duplicate charge!
```

**Solution:** Idempotent operation + idempotency key.

```python
def transfer_money(idempotency_key, amount):
    # Check if already processed
    existing = db.query(idempotency_key)
    if existing:
        return existing  # Return previous result
    
    # Process
    result = charge_account(amount)
    
    # Store result with key
    db.save(idempotency_key, result)
    return result
```

## Portfolio Examples

### Payment Processing
```
Scenario: Customer payment fails due to network timeout

Without retry:
  - Customer sees error
  - No payment processed
  - Customer retries manually

With retry:
  - Automatic retry after 2 seconds
  - Payment succeeds
  - Customer sees confirmation immediately
```

### API Calls
```
Third-party services (CRM, billing, notifications)
  - Occasional failures (network, overload)
  - Retry with exponential backoff
  - Circuit breaker after N failures
```

## Best Practices

✅ **Use exponential backoff** – Respects service recovery time  
✅ **Add jitter** – Prevent thundering herd  
✅ **Ensure idempotency** – Safe to retry  
✅ **Set max retries** – Don't retry forever  
✅ **Combine with circuit breaker** – Stop retrying if service down  
✅ **Log retry attempts** – Diagnose issues  
✅ **Monitor retry rates** – Alert if high  

---

**Last Updated:** 2026-07-28
