---
title: API Design & REST Architecture
summary: REST APIs, API Gateway, versioning, authentication, rate limiting, OpenAPI
type: technology
category: Portfolio
domain: Architecture
technology: API Design
difficulty: Intermediate
status: published
visibility: public
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [api, rest, design, gateway, microservices, integration]
related: [microservices.md, api-led.md, kubernetes.md, aws.md]
---

# API Design & REST Architecture

Deep expertise designing RESTful APIs for microservices, public platforms, and enterprise integrations.

## Overview

**Experience:** 15+ years  
**Focus:** REST API design, versioning, security, scalability  
**Platforms:** AWS API Gateway, Kong Gateway, Spring MVC  
**Standards:** OpenAPI/Swagger, OAuth 2.0, JWT

## REST Principles

### Core Concepts
- **Resources** – Nouns (users, accounts, transactions)
- **HTTP Verbs** – Actions (GET, POST, PUT, DELETE, PATCH)
- **Stateless** – Each request contains all necessary information
- **Cacheable** – Responses marked as cacheable or not
- **Uniform Interface** – Consistent request/response format

### Resource-Based Design
```
/api/v1/accounts/{id}
  GET    – Retrieve account
  PUT    – Update entire account
  PATCH  – Partial update
  DELETE – Close account

/api/v1/accounts/{id}/transactions
  GET    – List transactions
  POST   – Create transaction
```

## API Gateway Patterns

### AWS API Gateway
```yaml
# REST API
/api/v1/
  Stages: dev, staging, prod
  Methods: GET, POST, PUT, DELETE
  Integration: Lambda, HTTP, AWS services
  Features: 
    - Rate limiting
    - API keys
    - CORS configuration
    - Request/response mapping
    - Authorization (IAM, Cognito, Lambda)
```

### Kong API Gateway
```yaml
# Microservices API Gateway
Services:
  - service-1: http://service-1:8080
  - service-2: http://service-2:8080
  
Routes:
  - /api/v1/service1/* → service-1
  - /api/v1/service2/* → service-2
  
Plugins:
  - Authentication (OAuth2, JWT)
  - Rate limiting
  - Request/response transformation
  - Logging and monitoring
```

## API Versioning Strategies

### 1. URL Path Versioning (Recommended)
```
/api/v1/accounts
/api/v2/accounts (new version)
```
Pros: Clear, explicit, easy to route  
Cons: Duplicate code, maintenance burden

### 2. Query Parameter Versioning
```
/api/accounts?version=1
/api/accounts?version=2
```
Pros: Single URL, easy to test  
Cons: Less explicit, harder to monitor

### 3. Header Versioning
```
Accept: application/vnd.api+json;version=1
```
Pros: Doesn't pollute URLs  
Cons: Not discoverable, complex to route

### 4. Content Negotiation
```
Accept: application/vnd.company.v1+json
```
Pros: Standards-based  
Cons: Complex to implement

## Authentication & Authorization

### OAuth 2.0 (Recommended)
```python
# Token endpoint
POST /oauth/token
Authorization: Basic {client_id}:{client_secret}
Body: grant_type=client_credentials

# API call with token
GET /api/v1/accounts
Authorization: Bearer {access_token}
```

### JWT (JSON Web Tokens)
```python
# Token structure
Header.Payload.Signature

# Example payload
{
  "sub": "user123",
  "exp": 1704067200,
  "iat": 1704010800,
  "scopes": ["read:accounts", "write:transactions"]
}
```

### API Key Authentication
```
GET /api/v1/accounts
X-API-Key: sk_live_abc123def456
```
Simple but less secure for high-security APIs.

## Rate Limiting & Throttling

### Token Bucket Algorithm
```python
class RateLimiter:
    def __init__(self, rate=100, period=60):
        self.rate = rate
        self.period = period
        self.tokens = rate
        self.last_update = time.time()
    
    def allow_request(self):
        now = time.time()
        elapsed = now - self.last_update
        self.tokens = min(self.rate, self.tokens + elapsed * (self.rate / self.period))
        
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
```

### Response Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 75
X-RateLimit-Reset: 1234567890
```

## OpenAPI/Swagger Documentation

### Basic Structure
```yaml
openapi: 3.0.0
info:
  title: Banking API
  version: 1.0.0
servers:
  - url: https://api.bank.com/v1

paths:
  /accounts:
    get:
      summary: List accounts
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
          required: false
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Account'
                  
    post:
      summary: Create account
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateAccountRequest'
      responses:
        '201':
          description: Created

components:
  schemas:
    Account:
      type: object
      properties:
        id:
          type: string
        balance:
          type: number
        currency:
          type: string
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid account ID format",
    "details": {
      "field": "account_id",
      "expected": "UUID format"
    },
    "trace_id": "abc123def456"
  }
}
```

### HTTP Status Codes
| Code | Meaning | Use |
|------|---------|-----|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid auth |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unexpected error |

## Pagination & Filtering

### Offset Pagination
```
GET /api/v1/transactions?offset=0&limit=20
```

### Cursor Pagination (Recommended)
```
GET /api/v1/transactions?cursor=abc123&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "next_cursor": "def456",
    "has_more": true
  }
}
```

### Filtering
```
GET /api/v1/transactions?account_id=123&status=completed&date_from=2026-01-01
```

## Portfolio API Examples

### TRIMS – Trade Finance API
- **Scale:** 20-person team
- **Pattern:** RESTful microservices
- **Gateway:** Custom integration layer
- **Security:** OAuth 2.0, TLS

### Digital Insurance Platform
- **Pattern:** REST + event-driven
- **Gateway:** Kong with rate limiting
- **Security:** JWT, API keys
- **Scale:** 15+ service coordination

### Neo Banking Platform
- **Pattern:** REST + async (SNS/SQS)
- **Gateway:** AWS API Gateway
- **Security:** Cognito, OAuth 2.0
- **Platforms:** Web, iOS, Android

## Best Practices

✅ **Versioning** – Plan for evolution  
✅ **Documentation** – OpenAPI/Swagger  
✅ **Security** – OAuth 2.0, HTTPS, validation  
✅ **Idempotency** – Safe retries with Idempotency-Key  
✅ **Pagination** – Cursor-based for large datasets  
✅ **Caching** – Set Cache-Control headers  
✅ **Error handling** – Clear, structured errors  
✅ **Monitoring** – Log all requests, latency, errors  

## Anti-Patterns to Avoid

❌ **Verb-based URLs** – `/api/getAccounts` (use GET instead)  
❌ **No versioning** – Breaks clients on changes  
❌ **No documentation** – Clients can't use API properly  
❌ **Weak authentication** – API key only for public APIs  
❌ **No rate limiting** – Vulnerable to abuse  
❌ **Inconsistent responses** – Different error formats  
❌ **Ignoring HTTP semantics** – Using GET for mutations  

---

## See Also

- [Microservices](../patterns/microservices.md) – Architecture pattern
- [API-Led Architecture](../architecture-principles/api-led.md) – Design principle
- [Kong Gateway](../technologies/) – API gateway
- [AWS API Gateway](aws.md) – AWS service

## Interview Talking Points

- **Scale:** Designed APIs for 20+ person teams across banking, insurance
- **Security:** OAuth 2.0, JWT, rate limiting implementation
- **Evolution:** Managing API versioning and backward compatibility
- **Documentation:** OpenAPI/Swagger across all projects
- **Integration:** Cross-system API design (legacy + modern)

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Deep (15+ years)  
**Portfolio Coverage:** 4+ Tier 1 projects
