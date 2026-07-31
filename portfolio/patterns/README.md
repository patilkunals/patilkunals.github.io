---
title: Patterns
summary: Reusable architecture and design patterns
type: index
category: Portfolio
visibility: public
status: published
created: 2026-07-28
version: 1.0
---

# Patterns

Reusable architecture and design patterns used across portfolio projects.

## Integration Patterns

- **[API Gateway Pattern](api-gateway.md)** – Central request routing, rate limiting, authorization
- **[Strangler Pattern](strangler.md)** – Gradual migration from monolith to microservices
- **[Circuit Breaker](circuit-breaker.md)** – Fault tolerance, graceful degradation
- **[Saga Pattern](saga.md)** – Distributed transactions across services

## Data Patterns

- **[CQRS](cqrs.md)** – Command Query Responsibility Segregation
- **[Event Sourcing](event-sourcing.md)** – Event-based state management
- **[Database per Service](database-per-service.md)** – Data isolation in microservices

## Communication Patterns

- **[Synchronous (REST/gRPC)](synchronous-communication.md)** – Request-response, direct calls
- **[Asynchronous (Messaging)](asynchronous-communication.md)** – Event-driven, decoupled
- **[Publish-Subscribe](pub-sub.md)** – Event streaming, multiple consumers

## Resilience Patterns

- **[Retry](retry.md)** – Transient failure handling
- **[Timeout](timeout.md)** – Preventing cascading failures
- **[Bulkhead](bulkhead.md)** – Resource isolation
- **[Fallback](fallback.md)** – Degraded functionality

---

**Last Updated:** 2026-07-28
