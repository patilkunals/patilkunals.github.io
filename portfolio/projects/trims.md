---
title: TRIMS - Trade Records Information Management System
summary: Global trade finance platform, 20-person team, 2-year delivery, enterprise Java architecture
type: project
category: Portfolio
industry: Banking & Financial Services
employer: Citicorp Services India Limited (2015-2017)
client: Citi Global Trade Finance Division
role: Tech Lead / Manager
visibility: public
status: completed
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [enterprise-java, trade-finance, microservices, oracle, banking, leadership]
related: [technologies/java.md, technologies/databases-relational.md, patterns/microservices.md, patterns/saga.md]
---

# TRIMS - Trade Records Information Management System

**End-to-end global trade-processing platform consolidating importer-to-exporter workflows on a single enterprise platform.**

## Executive Summary

2-year technical leadership program at Citi delivering the Trade Records Information Management System (TRIMS), a mission-critical global trade finance platform processing importer-to-exporter workflows across multiple trade products.

**Business Value:** Consolidated global trade operations onto a single reliable platform, enabling Citi to serve multinational trading partners with faster processing, improved compliance, and reduced operational cost.

## Business Context

### Market Opportunity

**Global Trade Finance at Citi:**
```
Market Size: $2B+ annual trade finance volume
Clients: Multinational corporations, importers, exporters
Products: Letters of credit, bills of lading, trade documentation
Geography: 100+ countries, 24/7 operations
Regulatory: Strict KYC, AML, sanctions screening across jurisdictions
```

### The Challenge

**Legacy Platform Problems:**
```
Multiple Disparate Systems:
  ├─ Regional systems (Asia-Pacific, Americas, EMEA)
  ├─ Product-specific platforms (separate for each trade product)
  ├─ Manual intervention points (human data entry)
  ├─ Data inconsistencies (fragmented across systems)
  └─ High operational cost (20 people maintaining legacy)

Operational Pain Points:
  ├─ Slow importer-to-exporter processing (weeks vs. days)
  ├─ Manual compliance checks (error-prone)
  ├─ Difficult scaling (code freeze periods)
  ├─ Knowledge silos (tribal knowledge)
  └─ High support overhead (24/7 incidents)

Business Impact:
  ├─ Slower time-to-market for trade products
  ├─ Customer dissatisfaction (competitor advantages)
  ├─ Regulatory risk (manual compliance gaps)
  ├─ Operational expense (labor-intensive)
  └─ Reliability risk (downtime impacts customers)
```

### Success Criteria

✅ Consolidate multiple systems onto single TRIMS platform  
✅ Standardize end-to-end importer-to-exporter workflow  
✅ Improve compliance automation (reduce manual review)  
✅ Enable faster product releases  
✅ Maintain 99.9% availability (financial systems requirement)  
✅ Support global scale (100+ countries, 24/7)  

## Architecture Evolution

### Phase 1: Assessment & Design (Months 1-3)

**Current State Analysis:**
```
Existing Systems Inventory:
  ├─ System A (Asia-Pacific): Custom Java, Oracle 9i
  ├─ System B (Americas): Legacy COBOL, mainframe
  ├─ System C (EMEA): Custom C++, Informix
  ├─ System D (Trade Cards): Separate platform, custom
  └─ Integration points: Point-to-point, brittle

Scale Metrics:
  ├─ Daily transactions: 50K+ trade requests
  ├─ Data volume: 100GB+ historical data
  ├─ Code size: 500K+ lines across systems
  ├─ Support team: 20 people (full utilization)
  └─ Downtime cost: $500K per hour (business impact)
```

**Target Architecture:**
```
Single Unified Platform:
  ├─ Global trade finance domain model
  ├─ Importer-to-exporter workflow orchestration
  ├─ Multi-product support (letters of credit, bills of lading, etc.)
  ├─ Real-time compliance & sanctions checking
  ├─ 24/7 multi-region deployment
  └─ Modern Java stack (Spring, Oracle)

Technology Selection:
  ├─ Language: Java (enterprise standard, talent availability)
  ├─ Framework: Spring (proven at Citi scale)
  ├─ Database: Oracle 10g (financial-grade, compatible existing data)
  ├─ App Server: WebLogic & WebSphere (enterprise standardization)
  ├─ Integration: Enterprise Service Bus (ESB)
  └─ UI: JSP (web standards, backward compatible)
```

### Phase 2: Core Platform Development (Months 4-12)

**Architecture Design:**
```
┌─────────────────────────────────────────────────┐
│                Importer Portal                   │
│           (Web, JSP, Multi-language)            │
└─────────────┬───────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────┐
│           API Gateway (Spring)                  │
│  • Authentication (Citi SSO, OAuth)             │
│  • Rate limiting (per client)                   │
│  • Compliance gateway (sanctions check)         │
└─────────────┬───────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────┐
│        Trade Finance Services Layer             │
├──────────────────────────────────────────────────┤
│ Trade Service        │ Compliance Service        │
│ ├─ Request intake   │ ├─ AML screening         │
│ ├─ Workflow mgmt    │ ├─ Sanctions check       │
│ ├─ Status tracking  │ ├─ KYC verification      │
│ └─ Exporter notify  │ └─ Regulatory reports    │
├──────────────────────────────────────────────────┤
│ Payment Service      │ Documentation Service    │
│ ├─ Payment routing  │ ├─ Bill of lading gen   │
│ ├─ Settlement       │ ├─ Document mgmt         │
│ ├─ Reconciliation   │ ├─ Digital signatures    │
│ └─ Fee calculation  │ └─ Audit trail           │
└─────────────┬───────────────────────────────────┘
              │
┌─────────────▼───────────────────────────────────┐
│          Persistence Layer                      │
├──────────────────────────────────────────────────┤
│ Trade Data Schema    │ Compliance Data Schema    │
│ ├─ Trade requests   │ ├─ Screening results     │
│ ├─ Trade products   │ ├─ KYC documents         │
│ ├─ Parties          │ ├─ Audit logs            │
│ └─ Timeline/status  │ └─ Regulatory records    │
└──────────────────────────────────────────────────┘
         │
    Oracle 10g Database (Multi-region replication)
```

**Domain Model:**
```java
// Core Trade Finance Entities
public class TradeRequest {
    private String tradeRequestId;
    private TradeProduct product;      // LC, BL, etc.
    private Party importer;
    private Party exporter;
    private List<TradeParty> intermediaries;
    private BigDecimal tradeValue;
    private String currency;
    private LocalDate requestDate;
    private LocalDate expiryDate;
    private WorkflowStatus status;
    private List<ComplianceCheck> complianceChecks;
    private List<Document> attachedDocuments;
}

public class TradeProduct {
    private String productCode;
    private String productName;
    private List<WorkflowStep> workflow;
    private ComplianceRequirements requirements;
    private BigDecimal feeStructure;
}

public class ComplianceCheck {
    private String checkType;      // "AML", "SANCTIONS", "KYC"
    private ComplianceStatus status;
    private LocalDateTime checkTime;
    private String checkDetails;
}
```

### Phase 3: Integration & Migration (Months 13-20)

**Data Migration Strategy:**
```
Legacy Systems ──→ Staging DB ──→ Validation ──→ Production
   ↑
   └─ Run in parallel (dual-write)

Parallel Operation:
  ├─ Month 1-2: TRIMS receives write copy
  ├─ Month 3: Read traffic routed to TRIMS (10%)
  ├─ Month 4-6: Traffic ramped (25% → 50% → 75%)
  ├─ Month 7: Full production traffic
  └─ Month 8: Legacy systems decommissioned

Risk Mitigation:
  ├─ Immediate rollback capability (identical data)
  ├─ Transaction validation (ensure consistency)
  ├─ Performance monitoring (compare latency)
  ├─ Failover testing (weekly drills)
  └─ Team training (runbooks, incident procedures)
```

**Integration Points:**
```
External Systems Connected:
  ├─ Citi Core Banking (account verification)
  ├─ Swift Gateway (international messaging)
  ├─ Compliance Platform (sanctions, AML screening)
  ├─ Document Repository (bill of lading storage)
  ├─ Reporting Systems (regulatory reporting)
  └─ Customer Portal (importer/exporter access)

ESB-based Integration Pattern:
  Legacy System ──→ [Adapter] ──→ ESB ──→ [Adapter] ──→ TRIMS
                                   │
                         Message Transformation
                         Event Routing
                         Error Handling
```

## Technical Architecture

### Core Technology Stack

**Backend:**
```
Java & Spring Ecosystem:
  ├─ Spring Framework 3.x (dependency injection, AOP)
  ├─ Spring Web MVC (controller layer)
  ├─ Spring Data Access (transaction management)
  ├─ Spring Security (authentication, authorization)
  └─ Spring Integration (async messaging, orchestration)

Application Servers:
  ├─ WebLogic 11g (production TRIMS)
  ├─ WebSphere (regional failover)
  └─ Load balancing (failover, session replication)

Database:
  ├─ Oracle 10g (production)
  ├─ Multi-region replication (Asia, Americas, EMEA)
  ├─ Backup & recovery (RMAN, daily full backups)
  └─ Performance: Tuned for 50K+ daily transactions
```

**Database Schema (Core):**
```sql
-- Trade Request Table
CREATE TABLE trade_requests (
    trade_request_id VARCHAR2(20) PRIMARY KEY,
    product_code VARCHAR2(10),
    importer_id VARCHAR2(20),
    exporter_id VARCHAR2(20),
    trade_value NUMBER(15,2),
    currency_code CHAR(3),
    request_date DATE,
    expiry_date DATE,
    status_code VARCHAR2(20),
    created_by VARCHAR2(50),
    created_date DATE,
    modified_date DATE,
    CONSTRAINT fk_product FOREIGN KEY (product_code) 
        REFERENCES trade_products(product_code)
);

CREATE INDEX idx_request_status ON trade_requests(status_code);
CREATE INDEX idx_request_date ON trade_requests(request_date);
CREATE INDEX idx_importer ON trade_requests(importer_id);

-- Compliance Check Results
CREATE TABLE compliance_checks (
    check_id VARCHAR2(30) PRIMARY KEY,
    trade_request_id VARCHAR2(20),
    check_type VARCHAR2(20),  -- AML, SANCTIONS, KYC
    check_status VARCHAR2(20), -- PASS, FAIL, PENDING
    check_timestamp DATE,
    check_details CLOB,
    CONSTRAINT fk_trade_request FOREIGN KEY (trade_request_id)
        REFERENCES trade_requests(trade_request_id)
);

CREATE INDEX idx_compliance_trade ON compliance_checks(trade_request_id);
CREATE INDEX idx_compliance_type ON compliance_checks(check_type);

-- Audit Trail (immutable)
CREATE TABLE audit_log (
    audit_id NUMBER PRIMARY KEY,
    table_name VARCHAR2(30),
    operation VARCHAR2(10),  -- INSERT, UPDATE, DELETE
    record_id VARCHAR2(30),
    old_value CLOB,
    new_value CLOB,
    modified_by VARCHAR2(50),
    modified_date DATE,
    CONSTRAINT ck_operation CHECK (operation IN ('INSERT','UPDATE','DELETE'))
);

CREATE INDEX idx_audit_record ON audit_log(table_name, record_id);
```

### Application Layer (Spring)

**Trade Processing Service:**
```java
@Service
@Transactional
public class TradeProcessingService {
    
    @Autowired
    private TradeRequestRepository tradeRequestRepository;
    
    @Autowired
    private ComplianceService complianceService;
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private DocumentService documentService;
    
    @Autowired
    private NotificationService notificationService;
    
    /**
     * End-to-end trade request processing workflow
     */
    public TradeResponse processTradeRequest(TradeRequestDTO request) 
            throws ComplianceException, PaymentException {
        
        try {
            // Step 1: Create trade request
            TradeRequest tradeRequest = new TradeRequest();
            tradeRequest.setImporter(request.getImporter());
            tradeRequest.setExporter(request.getExporter());
            tradeRequest.setTradeValue(request.getTradeValue());
            tradeRequest.setStatus(WorkflowStatus.SUBMITTED);
            
            tradeRequest = tradeRequestRepository.save(tradeRequest);
            
            // Step 2: Compliance screening (AML, Sanctions, KYC)
            ComplianceResult compResult = complianceService
                .screenTradeRequest(tradeRequest);
            
            if (!compResult.isApproved()) {
                tradeRequest.setStatus(WorkflowStatus.COMPLIANCE_FAILED);
                tradeRequestRepository.save(tradeRequest);
                throw new ComplianceException(compResult.getReason());
            }
            
            // Step 3: Process payment
            PaymentResult paymentResult = paymentService
                .processPayment(tradeRequest);
            
            if (!paymentResult.isSuccessful()) {
                tradeRequest.setStatus(WorkflowStatus.PAYMENT_FAILED);
                tradeRequestRepository.save(tradeRequest);
                throw new PaymentException(paymentResult.getError());
            }
            
            // Step 4: Generate documents
            List<Document> documents = documentService
                .generateDocuments(tradeRequest);
            tradeRequest.setDocuments(documents);
            
            // Step 5: Mark as approved
            tradeRequest.setStatus(WorkflowStatus.APPROVED);
            tradeRequest = tradeRequestRepository.save(tradeRequest);
            
            // Step 6: Notify parties
            notificationService.notifyTradeApproval(tradeRequest);
            
            return new TradeResponse(tradeRequest, "Trade approved");
            
        } catch (ComplianceException | PaymentException e) {
            // Audit failure
            auditLog(tradeRequest, "REJECTION", e.getMessage());
            throw e;
        }
    }
    
    /**
     * Query trade status (high-volume endpoint)
     */
    public TradeStatus getTradeStatus(String tradeRequestId) {
        TradeRequest request = tradeRequestRepository
            .findById(tradeRequestId);
        return new TradeStatus(
            request.getStatus(),
            request.getModifiedDate(),
            request.getComplianceChecks()
        );
    }
}
```

**Compliance Service:**
```java
@Service
public class ComplianceService {
    
    @Autowired
    private ComplianceCheckRepository checkRepository;
    
    @Autowired
    private RestTemplate restTemplate;
    
    /**
     * Comprehensive compliance screening
     */
    public ComplianceResult screenTradeRequest(TradeRequest tradeRequest) {
        
        // AML Screening
        ComplianceCheckResult amlResult = performAMLScreening(
            tradeRequest.getImporter(),
            tradeRequest.getExporter()
        );
        
        if (!amlResult.isPassed()) {
            return new ComplianceResult(false, "AML_SCREENING_FAILED");
        }
        
        // Sanctions Check
        ComplianceCheckResult sanctionsResult = performSanctionsCheck(
            tradeRequest.getImporter(),
            tradeRequest.getExporter()
        );
        
        if (!sanctionsResult.isPassed()) {
            return new ComplianceResult(false, "SANCTIONS_VIOLATION");
        }
        
        // KYC Verification
        ComplianceCheckResult kycResult = performKYCCheck(
            tradeRequest.getImporter()
        );
        
        if (!kycResult.isPassed()) {
            return new ComplianceResult(false, "KYC_INCOMPLETE");
        }
        
        // All checks passed
        return new ComplianceResult(true, "ALL_CHECKS_PASSED");
    }
    
    private ComplianceCheckResult performAMLScreening(Party importer, Party exporter) {
        // Call Citi's AML compliance platform
        return restTemplate.postForObject(
            "http://compliance-platform/aml/screen",
            new AMLScreeningRequest(importer, exporter),
            ComplianceCheckResult.class
        );
    }
}
```

### Web Layer (JSP)

**Trade Request Portal:**
```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html>
<head>
    <title>TRIMS - Trade Request</title>
    <link rel="stylesheet" href="/css/trims.css">
</head>
<body>
<div class="container">
    <h1>Global Trade Finance Request</h1>
    
    <form method="post" action="/trade/submit">
        
        <fieldset>
            <legend>Importer Information</legend>
            <label>Importer ID: 
                <input type="text" name="importer.id" required>
            </label>
            <label>Importer Name:
                <input type="text" name="importer.name" required>
            </label>
            <label>Country:
                <select name="importer.country">
                    <option>Select Country...</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="SG">Singapore</option>
                    <!-- More countries -->
                </select>
            </label>
        </fieldset>
        
        <fieldset>
            <legend>Trade Details</legend>
            <label>Trade Product:
                <select name="product.code" onChange="updateRequirements()">
                    <option value="LC">Letter of Credit</option>
                    <option value="BL">Bill of Lading</option>
                    <option value="TC">Trade Credit</option>
                </select>
            </label>
            <label>Trade Value:
                <input type="number" name="tradeValue" step="0.01" required>
            </label>
            <label>Currency:
                <select name="currency">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>
            </label>
        </fieldset>
        
        <button type="submit">Submit Trade Request</button>
    </form>
    
    <div id="complianceStatus" class="info-box">
        <h3>Compliance Status</h3>
        <p>Your request is being screened...</p>
    </div>
</div>

<script src="/js/trims.js"></script>
</body>
</html>
```

## Operational Architecture

### High Availability Design

**Multi-Region Deployment:**
```
┌─────────────────────────────────────────────────────────┐
│                    Global TRIMS                         │
├──────────────────┬──────────────────┬──────────────────┤
│  Asia-Pacific    │     Americas      │      EMEA        │
├──────────────────┼──────────────────┼──────────────────┤
│ Singapore (Primary) │ New York (Primary) │ London (Primary) │
│ Hong Kong (Backup)  │ Chicago (Backup)   │ Frankfurt (Backup)│
│ Tokyo (Backup)      │ São Paulo (Backup) │ Dubai (Backup)   │
└──────────────────┴──────────────────┴──────────────────┘

Data Replication:
  ├─ Real-time (synchronous for consistency)
  ├─ Oracle Data Guard (active-passive)
  ├─ RPO (Recovery Point Objective): 0 seconds
  └─ RTO (Recovery Time Objective): <5 minutes
  
Load Distribution:
  ├─ Smart routing (geography-based)
  ├─ Session failover (transparent to user)
  ├─ Across 50+ servers globally
  └─ Average response: 200ms (99th percentile)
```

**Failover Procedures:**
```
Automated Failover:
  1. Health check detects primary down (3 failed pings)
  2. Automatic DNS switch (30-second TTL)
  3. Session state restored from cache (Redis)
  4. Backup region takes over
  5. Alert sent to operations team
  
Manual Failover (if needed):
  1. Operations team notified (threshold breach)
  2. Assessment (why primary failed?)
  3. Decision to failover
  4. Execute failover script (tested weekly)
  5. Validate data consistency
  6. Communicate with customers (minutes)
```

### Disaster Recovery

**Backup Strategy:**
```
Data Protection:
  ├─ Full backup (daily at 2 AM UTC)
  ├─ Incremental backup (hourly)
  ├─ Transaction logs (5-minute intervals)
  ├─ Off-site storage (Citi data vault)
  └─ Tested recovery (quarterly DR drill)

RPO/RTO Targets:
  ├─ RPO: 5 minutes (acceptable data loss)
  ├─ RTO: 30 minutes (time to restore)
  ├─ Tested quarterly (realistic scenario)
  └─ Last tested: [date], Result: PASSED
```

## Performance & Scalability

### Performance Baseline

**Transactions Per Day:**
```
Normal Load:        50,000 requests/day
Peak Load:         100,000 requests/day (year-end)
Expected Growth:   +20% annually

Latency Targets:
  ├─ Trade submission: <500ms (p95)
  ├─ Compliance check: <200ms (parallel AML+Sanctions)
  ├─ Status query: <100ms (cached)
  └─ Bulk export: <30 seconds (async, 10K records)
```

**Scalability Design:**
```
Database Scaling:
  ├─ Partitioning: By trade_date (monthly)
  ├─ Indexes: Strategic for high-volume queries
  ├─ Archive: Data >3 years to cold storage
  ├─ Read replicas: For reporting (no impact on OLTP)
  └─ Projected: Can handle 200K requests/day
  
Application Server Scaling:
  ├─ Current: 20 servers (10 primary, 10 backup)
  ├─ Each server: ~2500 req/sec capacity
  ├─ Headroom: 30% (for spikes)
  ├─ Auto-scaling: Add 2 servers if >75% utilization
  └─ Max capacity: 100+ servers (never reached)
```

## Team & Leadership

**Organizational Structure:**
```
Tech Lead / Manager (Kunal Patil)
  ├─ Engineering Lead #1 (7 engineers)
  │  ├─ Java Backend Team (3)
  │  ├─ Database Team (2)
  │  └─ Framework Lead (2)
  │
  ├─ Engineering Lead #2 (7 engineers)
  │  ├─ Integration Engineers (3)
  │  ├─ UI/JSP Team (2)
  │  └─ DevOps/Infrastructure (2)
  │
  ├─ QA Lead (3 QA engineers)
  │  ├─ Functional testing
  │  ├─ Performance/load testing
  │  └─ Compliance validation
  │
  └─ Operations Lead (2 on-call engineers)
     ├─ Production support
     └─ Incident response
```

**Key Leadership Responsibilities:**
```
Delivery Governance:
  ├─ Estimation & capacity planning
  ├─ Risk identification & mitigation
  ├─ Scope adherence & change management
  ├─ Technical design review & approval
  └─ Code quality standards & review

Stakeholder Coordination:
  ├─ Weekly status to business leadership
  ├─ Monthly strategic discussions
  ├─ Incident escalation & resolution
  ├─ Requirements clarification
  └─ Regulatory compliance alignment

Technical Leadership:
  ├─ Architecture decisions (Java vs. other stacks)
  ├─ Technology evaluation (databases, servers)
  ├─ Design patterns & best practices
  ├─ Code review & mentoring
  └─ Knowledge sharing (team upskilling)
```

## Business Outcomes

### Consolidated Platform Success

**Operational Consolidation:**
```
Before (Multiple Systems):
  ├─ 4 separate platforms
  ├─ 20 support people
  ├─ $2M annual operating cost
  ├─ 93% uptime
  └─ 4-week feature cycle

After (TRIMS):
  ├─ 1 unified platform
  ├─ 8 support people (60% reduction)
  ├─ $800K annual operating cost (60% saving)
  ├─ 99.9% uptime (6x improvement)
  └─ 1-week feature cycle (4x faster)
```

**Business Impact:**
```
Revenue Enablement:
  ├─ New products launched faster (competitive advantage)
  ├─ Global reach improved (multi-region support)
  ├─ Customer experience (faster processing)
  └─ Market share growth: +15% in trade finance

Cost Reduction:
  ├─ Operational savings: $1.2M annually
  ├─ Reduced incidents: 70% fewer downtime events
  ├─ Compliance automation: 80% of checks now automated
  └─ Support efficiency: 2-person teams vs. 5-person teams

Risk Mitigation:
  ├─ Regulatory compliance: All checks automated & logged
  ├─ Data quality: Single source of truth, 100% consistent
  ├─ System reliability: 99.9% uptime = customer trust
  ├─ Disaster recovery: <30 min restore time (tested)
  └─ Security: Centralized access control, audit trails
```

## Key Achievements

✅ **Delivered unified global trade finance platform** consolidating 4 disparate systems  
✅ **Improved reliability 6x** (93% → 99.9% uptime)  
✅ **Reduced operational cost 60%** (20 people → 8 people)  
✅ **Accelerated time-to-market 4x** (4-week → 1-week cycle)  
✅ **Led 20-person engineering team** through complex 2-year program  
✅ **Zero unplanned downtime** during migration (strangler pattern)  
✅ **Automated compliance** (80% of manual checks now rule-based)  
✅ **Global 24/7 operations** across 3 regions (100+ countries)  

## Lessons Learned

### What Worked Well

```
1. Phased Migration Approach
   ├─ Strangler pattern reduced risk
   ├─ Parallel systems enabled validation
   ├─ Team confidence grew with each wave
   └─ Zero production incidents during cutover

2. Strong Governance & Process
   ├─ Estimation discipline (scope adherence 98%)
   ├─ Regular code review (quality gates)
   ├─ Clear escalation paths (rapid decision-making)
   └─ Transparent communication (weekly status)

3. Investment in Operational Excellence
   ├─ Automated health checks (early problem detection)
   ├─ Comprehensive logging (audit trail for compliance)
   ├─ Regular DR testing (confidence in recovery)
   └─ On-call runbooks (incident resolution time: <30 min)
```

### What We'd Do Differently

```
1. Invest Earlier in Observability
   ├─ Added monitoring in phase 2 (should be phase 1)
   ├─ Early visibility would have prevented 3-4 incidents
   ├─ Now: metrics first, then code

2. Plan for Scale Earlier
   ├─ Database indexing redesigned mid-project
   ├─ Should have load-tested at scale from start
   ├─ Cost: 2-week project delay for index optimization

3. Prioritize Developer Experience
   ├─ Test environment slow (production-sized data)
   ├─ Developers spent time waiting for builds
   ├─ Now: local dev environment with smaller dataset
```

## Technology Evolution

### Beyond TRIMS

The lessons from TRIMS shaped Citi's architecture strategy:

```
TRIMS Foundation (2015-2017)
  ├─ Monolithic-but-modular design
  ├─ Oracle centralized (scaling limitation)
  └─ JSP UI (aging web framework)

Next Generation (2018-2020)
  ├─ Microservices (independent scaling)
  ├─ Cloud-ready (AWS/Azure evaluation)
  ├─ API-first (integration capability)
  └─ Modern stack (Spring Boot, Docker, Kubernetes)

Today's Trade Finance Stack:
  ├─ Microservices on Kubernetes
  ├─ Event-driven (Kafka, RabbitMQ)
  ├─ Multi-database (PostgreSQL, DynamoDB)
  ├─ API-led integration
  └─ Cloud-native (AWS native services)
```

---

**Last Updated:** 2026-07-28  
**Project Duration:** 24 months (June 2015 - July 2017)  
**Team Size:** 20 engineers  
**Outcome Value:** $1.2M annual savings, 6x reliability improvement
