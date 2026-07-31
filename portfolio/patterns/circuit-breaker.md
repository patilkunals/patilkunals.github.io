---
title: Circuit Breaker Pattern
summary: Fault tolerance, graceful degradation, failure prevention, fast failure
type: pattern
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [circuit-breaker, resilience, fault-tolerance, microservices]
related: [microservices.md, retry.md, timeout.md]
links: [https://martinfowler.com/bliki/CircuitBreaker.html]
---

# Circuit Breaker Pattern

Preventing cascading failures and enabling graceful degradation in distributed systems.

## Problem

**Cascading failures in microservices:**

```
Request → Service A (working)
            ↓
          Service B (50% failure rate)
            ↓
          Threads exhaust waiting for Service B
            ↓
          Service A becomes slow
            ↓
          Load increases on Service B
            ↓
          Service B fails completely
            ↓
          Service A fails (no threads available)
            ↓
          System fails
```

## Solution: Circuit Breaker

**Analogy:** Electrical circuit breaker stops current flow when circuit overloads.

```
CLOSED STATE:
  Requests → Service B (normal)

OPEN STATE:
  Requests → Circuit Breaker → Immediate failure
             (don't even try to call Service B)

HALF-OPEN STATE:
  Requests → Try calling Service B (test)
             ↓ (success) → CLOSED
             ↓ (failure) → OPEN
```

## States & Transitions

### CLOSED (Normal)
```python
# Track call failures
failure_count = 0
success_count = 0

if success:
    success_count += 1
else:
    failure_count += 1

# If too many failures, trip circuit
if failure_count > threshold:  # e.g., 5 failures
    state = OPEN
```

### OPEN (Failing)
```python
# Don't call the service at all
# Return cached response or error

if time_since_tripped < timeout:  # e.g., 60 seconds
    raise CircuitBreakerOpenException()
else:
    state = HALF_OPEN  # Try again after timeout
```

### HALF-OPEN (Testing)
```python
# Send one test request
try:
    result = call_service()
    state = CLOSED  # Success! Resume normal
    failure_count = 0
except:
    state = OPEN   # Still failing, keep circuit open
    failure_count += 1
```

## Implementation

### Python with PyBreaker
```python
from pybreaker import CircuitBreaker

# Create circuit breaker
payment_breaker = CircuitBreaker(
    fail_max=5,      # Open after 5 failures
    reset_timeout=60  # Try again after 60 seconds
)

@payment_breaker
def process_payment(amount):
    response = requests.post(
        "https://payment-service/pay",
        json={"amount": amount},
        timeout=5
    )
    return response.json()

# Usage
try:
    result = process_payment(100.00)
except:
    # Circuit is open or service failed
    # Use fallback
    result = {"status": "pending", "note": "Will retry later"}
```

### Java with Hystrix/Resilience4j
```java
// Resilience4j setup
CircuitBreaker circuitBreaker = CircuitBreaker.ofDefaults("paymentService");

@CircuitBreaker(name = "paymentService")
public Payment processPayment(Order order) {
    return paymentService.pay(order);
}

// Usage with fallback
public Payment processPaymentWithFallback(Order order) {
    try {
        return processPayment(order);
    } catch (CircuitBreakerOpenException e) {
        return fallbackPayment(order);  // Cache or manual approval
    }
}
```

### AWS Lambda with Fallback
```python
import boto3
from datetime import datetime, timedelta

class CircuitBreakerCache:
    def __init__(self):
        self.cache = {}
    
    def call_service(self, service_name, request):
        key = f"{service_name}:{hash(request)}"
        
        # Check circuit state
        if self.is_open(service_name):
            # Return cached response
            if key in self.cache:
                return self.cache[key]
            raise Exception(f"Service {service_name} is unavailable")
        
        # Call service
        try:
            response = call_lambda(service_name, request)
            self.cache[key] = response
            self.reset_failures(service_name)
            return response
        except Exception as e:
            self.record_failure(service_name)
            raise
    
    def record_failure(self, service_name):
        failures = self.get_failures(service_name)
        failures += 1
        if failures >= 5:
            self.trip_circuit(service_name)
    
    def is_open(self, service_name):
        tripped_at = self.get_trip_time(service_name)
        if tripped_at is None:
            return False
        # Open for 60 seconds, then half-open
        return datetime.now() < tripped_at + timedelta(seconds=60)
```

## Monitoring & Metrics

### Key Metrics
```
- Circuit state (CLOSED, OPEN, HALF_OPEN)
- Failure rate (%)
- Request count per service
- Latency (p50, p95, p99)
- Cache hit rate (when OPEN)
```

### CloudWatch Monitoring
```python
cloudwatch = boto3.client('cloudwatch')

cloudwatch.put_metric_data(
    Namespace='CircuitBreaker',
    MetricData=[
        {
            'MetricName': 'FailureRate',
            'Value': failure_rate,
            'Unit': 'Percent'
        },
        {
            'MetricName': 'CacheHits',
            'Value': cache_hits,
            'Unit': 'Count'
        }
    ]
)
```

### Alerting
```
Alert if:
- Failure rate > 20% for more than 2 minutes
- Circuit stays OPEN for > 5 minutes
- Cache hit rate > 80% (indicates ongoing issue)
```

## Configuration Strategies

### Conservative (Lower risk of cascading failure)
```python
CircuitBreaker(
    fail_max=3,           # Open quickly
    reset_timeout=30,     # Test frequently
    expected_exception=None  # Open on any exception
)
```

### Aggressive (Tolerate temporary issues)
```python
CircuitBreaker(
    fail_max=10,          # Allow more failures
    reset_timeout=180,    # Wait longer to test
    exclude=TypeError     # Don't open for certain errors
)
```

### Adaptive (Adjust based on traffic)
```python
class AdaptiveCircuitBreaker:
    def __init__(self):
        self.fail_threshold = 5
        self.timeout = 60
    
    def adjust_for_traffic(self, request_rate):
        # High traffic: tolerate more failures
        if request_rate > 1000/min:
            self.fail_threshold = 10
            self.timeout = 120
        else:
            self.fail_threshold = 5
            self.timeout = 60
```

## Fallback Strategies

### 1. Cached Response
```python
@payment_breaker(fallback=lambda order: {
    "status": "pending",
    "cached": True,
    "message": "Payment service unavailable, will retry"
})
def process_payment(order):
    return payment_service.pay(order)
```

### 2. Degraded Service
```python
def process_payment(order):
    try:
        return payment_service.pay(order)  # Full service
    except CircuitBreakerOpen:
        # Degraded: manual approval instead of automatic
        return {
            "status": "manual_review",
            "requires_approval": True
        }
```

### 3. Default/Stub Response
```python
def get_product_recommendations(user_id):
    try:
        return recommendation_service.get(user_id)
    except CircuitBreakerOpen:
        # Return popular products instead of personalized
        return get_trending_products()
```

## Portfolio Use Cases

### Banking Systems
- **Challenge:** Payment gateway fails, should not impact order creation
- **Solution:** Circuit breaker caches recent payment responses, orders marked "pending"
- **Fallback:** Manual batch payment processing during outages

### Insurance Platform
- **Challenge:** Claims service overloaded during spike
- **Solution:** Circuit breaker gates claims to prevent cascade
- **Fallback:** Queue claims for batch processing when peak subsides

### E-commerce
- **Challenge:** Inventory check is slow, blocks purchases
- **Solution:** Circuit breaker with optimistic approach
- **Fallback:** Assume inventory available, fulfill later if out-of-stock

## Best Practices

✅ **Set appropriate thresholds** – Not too sensitive, not too lenient  
✅ **Use both timeout and failure count** – Catch slow and failing services  
✅ **Implement good fallbacks** – Plan for open circuit  
✅ **Monitor actively** – Alert on state changes  
✅ **Test in staging** – Verify fallback behavior  
✅ **Document behavior** – Team understanding matters  
✅ **Combine with retry** – Different concerns  

## Common Mistakes

❌ **No fallback** – Open circuit just fails request  
❌ **Sensitive threshold** – Circuit opens on temporary blips  
❌ **Silent failures** – Don't log open circuit events  
❌ **Ignoring half-open** – Don't test if service recovered  
❌ **One size fits all** – Different services need different configs  

---

## See Also

- [Retry Pattern](retry.md) – Complement to circuit breaker
- [Timeout Pattern](timeout.md) – Fail fast
- [Microservices](microservices.md) – Architecture pattern

## Interview Talking Points

- **Resilience:** Preventing cascading failures across services
- **Production:** Implemented circuit breakers across payment systems
- **Fallback Strategies:** Degradation vs. caching vs. queuing
- **Monitoring:** Alerting on circuit state changes
- **Testing:** Simulating service failures in chaos engineering

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Deep (10+ years)  
**Portfolio Coverage:** Multiple Tier 1 projects
