---
title: Architecture & Technology Glossary
summary: 70+ essential terms for architecture, cloud, AI, banking, integration
type: reference
category: Portfolio
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [glossary, reference, terminology, definitions]
related: [technologies/*, patterns/*, principles/*]
---

# Architecture & Technology Glossary

Comprehensive reference for architecture, cloud, AI, and business domain terminology.

## Architecture & Design Patterns

**Aggregate Root** - Entity that serves as access point for related objects in domain-driven design (e.g., Order aggregate with LineItems)

**Bounded Context** - Domain-driven design concept defining clear boundaries for business contexts (e.g., Premium context, Claims context)

**Circuit Breaker** - Pattern preventing cascading failures by stopping calls to failing services (CLOSED → OPEN → HALF_OPEN)

**CQRS** - Command Query Responsibility Segregation; separating read and write operations into independent models

**Domain Model** - Representation of core business concepts and their relationships

**Event Sourcing** - Pattern storing application state as immutable sequence of events instead of current state

**Eventual Consistency** - Guarantee that data will converge to consistent state, but not immediately

**Microservices** - Architecture pattern splitting monolithic application into independently deployable services

**Saga Pattern** - Pattern coordinating distributed transactions across microservices with compensation logic

**Strangler Pattern** - Gradual migration from monolithic to microservices by extracting services incrementally

**Ubiquitous Language** - Shared vocabulary between developers and business stakeholders in domain-driven design

## Cloud & Infrastructure

**Availability Zone (AZ)** - Isolated datacenter within AWS region (e.g., us-west-2a, us-west-2b)

**Auto-Scaling** - Automatically increasing/decreasing compute resources based on demand

**Blue-Green Deployment** - Switching traffic between two identical production environments (safe rollback possible)

**Canary Deployment** - Gradually rolling out new version to percentage of users (1% → 10% → 100%)

**Container** - Lightweight isolated environment packaging application and dependencies (Docker)

**Infrastructure as Code (IaC)** - Defining infrastructure through version-controlled configuration (Terraform, CloudFormation)

**Kubernetes** - Container orchestration platform managing deployment, scaling, networking

**Lambda (AWS)** - Serverless compute executing code without managing servers; pay per invocation

**Load Balancer** - Distributing incoming traffic across multiple servers

**Multi-AZ** - Deployment across multiple availability zones for high availability

**Orchestration** - Automated management of containerized applications (Kubernetes, ECS)

**Serverless** - Cloud computing model where provider manages infrastructure; developer writes functions

**Virtual Private Cloud (VPC)** - Isolated network within cloud provider account

## Data & Databases

**ACID** - Transaction properties: Atomicity, Consistency, Isolation, Durability

**Denormalization** - Intentionally storing redundant data to optimize query performance

**Eventual Consistency** - Guarantee that data will converge to consistent state (vs. immediate consistency)

**Foreign Key** - Database constraint linking related tables

**Index** - Data structure accelerating database query performance

**JOIN** - SQL operation combining data from multiple tables

**Master-Slave Replication** - Primary database replicates writes to read-only replicas

**Normalization** - Organizing database to minimize redundancy (1NF, 2NF, 3NF)

**OLAP** - Online Analytical Processing; data warehouse queries (complex, analytical)

**OLTP** - Online Transaction Processing; operational database (simple, frequent writes)

**Partition/Shard** - Splitting data across multiple databases by key (customer_id, geographic region)

**Primary Key** - Unique identifier for database record

**Query Plan** - Database execution strategy for retrieving data

**Schema** - Database structure defining tables, columns, relationships

**Stored Procedure** - Pre-compiled SQL code stored in database

**Transactions** - Grouping operations that succeed or fail together (ACID guarantee)

**Vector Database** - Specialized database for storing and searching embeddings (pgvector, Pinecone)

## Messaging & Integration

**Asynchronous** - Operation completes without waiting for response

**Choreography** - Decentralized pattern where services communicate via events (vs. orchestration)

**Dead Letter Queue** - Queue for messages that fail processing

**Event** - Notification that something happened (OrderCreated, PaymentProcessed)

**Event-Driven Architecture** - Systems communicating through events; loose coupling

**Idempotency** - Operation produces same result if executed once or multiple times

**Kafka** - High-throughput distributed message streaming platform

**Message Queue** - System storing and forwarding asynchronous messages

**Orchestration** - Centralized service coordinating workflow across multiple services

**Pub-Sub** - Publish-Subscribe pattern; decoupled producers and consumers

**RabbitMQ** - Message broker supporting complex routing patterns

**Saga** - Distributed transaction coordinated through events and compensation

**SNS/SQS** - AWS services: SNS (pub-sub), SQS (point-to-point messaging)

**Synchronous** - Operation waits for response before continuing

## API & Integration

**API Gateway** - Service routing requests to backend services; rate limiting, auth

**Authentication** - Verifying user/system identity (OAuth 2.0, JWT, API keys)

**Authorization** - Verifying user has permission for action (RBAC, ACL)

**Contract Testing** - Validating API contract between producer and consumer

**gRPC** - High-performance RPC framework using Protocol Buffers

**JWT** - JSON Web Token; stateless authentication token

**OAuth 2.0** - Industry-standard authorization protocol (delegated access)

**OpenAPI** - Standard for documenting REST APIs (formerly Swagger)

**Rate Limiting** - Restricting number of API calls per time period

**REST** - Architectural style using HTTP methods (GET, POST, PUT, DELETE)

**SOAP** - XML-based protocol for web services (legacy, declining)

**Versioning** - Managing API changes; URL path (/v1/, /v2/) or header strategy

**Web Service** - Remote service accessible over network (REST, SOAP, gRPC)

## Generative AI & LLMs

**Agents** - Autonomous systems using reasoning and tools to accomplish goals

**Alignment** - LLM behavior matching human values and preferences

**Embeddings** - Vector representation of text capturing semantic meaning

**Fine-tuning** - Adapting pre-trained LLM for specific task or domain

**Hallucination** - LLM confidently stating false information

**Inference** - Using trained model to make predictions/generate text

**LLM** - Large Language Model; neural network trained on massive text data

**Prompt** - Instructions given to LLM; quality significantly impacts output

**Prompt Engineering** - Designing effective instructions for LLMs

**RAG** - Retrieval-Augmented Generation; providing context from knowledge base to LLM

**RLHF** - Reinforcement Learning from Human Feedback; aligning LLM with human preferences

**Tokens** - Units of text (roughly 4 characters/0.75 words); basis for LLM pricing

**Transformer** - Neural network architecture powering modern LLMs

**Vector Search** - Finding similar items using vector distance (embeddings)

## Security

**Encryption at Rest** - Data encrypted when stored (AES-256)

**Encryption in Transit** - Data encrypted during transmission (TLS/HTTPS)

**Key Management System (KMS)** - Service managing encryption keys

**MFA** - Multi-Factor Authentication; multiple identity verification methods

**Penetration Testing** - Authorized security testing simulating attacks

**Principal of Least Privilege** - Users have minimum necessary permissions

**Role-Based Access Control (RBAC)** - Granting permissions based on roles

**Secret Management** - Securely storing/rotating passwords, keys, tokens

**Single Sign-On (SSO)** - User authenticates once, accesses multiple services

**TLS/HTTPS** - Cryptographic protocol securing HTTP communication

**Vulnerability Scanning** - Automated detection of security weaknesses

## DevOps & Observability

**CI/CD** - Continuous Integration/Continuous Deployment; automated testing and deployment

**Debugging** - Process of identifying and fixing bugs in code

**Deployment** - Moving code from development to production

**Instrumentation** - Adding code to emit metrics, logs, traces

**Latency** - Time delay in system response (measured in ms)

**Logging** - Recording system events for debugging and audit

**Mean Time to Recovery (MTTR)** - Average time to fix production issue

**Metrics** - Quantitative measurements of system performance

**Monitoring** - Continuously observing system health and performance

**Observable** - System emitting sufficient data to understand its behavior

**RTO/RPO** - Recovery Time Objective / Recovery Point Objective; disaster recovery targets

**SLA** - Service Level Agreement; promised uptime/performance

**SLO** - Service Level Objective; internal target (stricter than SLA)

**Throughput** - Number of requests/transactions per unit time

**Tracing** - Following request through multiple services

**Uptime** - Percentage of time system is operational

## Business & Industry Terms

### Insurance

**AML** - Anti-Money Laundering; regulatory requirement to detect illegal funds

**Beneficiary** - Person designated to receive insurance proceeds

**Claim** - Request for insurance payment

**Coverage** - Protection provided by insurance policy

**Deductible** - Amount insured must pay before coverage applies

**KYC** - Know Your Customer; regulatory requirement to verify customer identity

**Policy** - Insurance contract between insurer and insured

**Premium** - Payment for insurance coverage

**Rider** - Optional coverage added to base policy

**Underwriting** - Process of assessing risk and determining coverage/pricing

### Banking

**ACH** - Automated Clearing House; electronic funds transfer system

**CASA** - Current Account Saving Account; deposit account in India

**Core Banking** - Essential banking functions (deposits, loans, payments)

**CIF** - Customer Information File; complete customer profile

**KYC** - Know Your Customer; regulatory verification

**NEFT** - National Electronic Funds Transfer; scheduled transfer system (India)

**RTGS** - Real Time Gross Settlement; immediate fund transfer

**SWIFT** - Society for Worldwide Interbank Financial Telecommunication; international payments

**T24** - Temenos platform; core banking system

### Integration

**API** - Application Programming Interface; method for systems to communicate

**Batch Processing** - Processing large data sets in groups (vs. real-time)

**Data Integration** - Combining data from multiple sources

**ETL** - Extract, Transform, Load; data pipeline pattern

**Middleware** - Software facilitating communication between systems

**Webhook** - HTTP callback triggered by specific event

---

## Cross-Reference

For detailed explanations:
- **Architecture patterns:** See [patterns/](../patterns/)
- **Technologies:** See [technologies/](../technologies/)
- **Principles:** See [architecture-principles/](../architecture-principles/)
- **AI/GenAI:** See [ai/](../ai/)

---

**Last Updated:** 2026-07-28  
**Total Terms:** 70+  
**Categories:** 12
