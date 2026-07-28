---
title: Security-First Architecture Principle
summary: Defense in depth, least privilege, encryption, audit trails
type: principle
category: Portfolio
domain: Architecture
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [security, defense-in-depth, authentication, encryption]
related: [cloud-native.md, api-design.md]
---

# Security-First Architecture Principle

**Principle:** Security is architecture responsibility, not an afterthought.

## Defense in Depth

**Layers:**
```
Layer 1: Network (firewall, VPC, WAF)
Layer 2: Authentication (OAuth 2.0, MFA)
Layer 3: Authorization (least privilege, roles)
Layer 4: Encryption (TLS, at-rest)
Layer 5: Audit (logging, compliance)
```

## Core Practices

### 1. Authentication
```
OAuth 2.0 (industry standard):
  Client → Authorization Server
           ↓
      User logs in
           ↓
      Issues token
           ↓
  Client uses token for API calls
```

### 2. Authorization
```
Role-Based Access Control (RBAC):
  User has roles:
    ├─ Customer (can view own orders)
    ├─ Agent (can view customer orders)
    └─ Admin (can view/modify all)

API enforces:
  GET /orders/123 → Only customer 123, agent, or admin
```

### 3. Encryption
```
In Transit: TLS/HTTPS
  All network communication encrypted

At Rest: AES-256
  Data in database encrypted
  
Key Management: AWS KMS
  Keys separate from data
  Audit trail for access
```

### 4. Audit Trail
```
Log:
  - Who accessed what
  - When
  - From where
  - What changed
  
Retention: 7 years (compliance requirement)
Immutable: Can't be modified (audit integrity)
```

## Portfolio Compliance

### Digital Insurance (Financial Regulated)
```
Requirements:
  ✅ SOC 2 Type II
  ✅ Encryption (TLS + at-rest)
  ✅ MFA for admin access
  ✅ Audit logs (7-year retention)
  ✅ PII protection (GDPR)
  ✅ Disaster recovery (RTO < 4 hours)
```

---

**Last Updated:** 2026-07-28
