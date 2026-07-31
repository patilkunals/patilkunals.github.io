---
title: AI Cost Optimization & Token Management
summary: Model selection, token counting, caching, batching, cost-benefit analysis
type: guide
category: Portfolio
domain: AI/GenAI
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [cost-optimization, token-management, pricing, efficiency]
related: [bedrock.md, prompt-engineering.md, llm-evaluation.md]
links: [https://aws.amazon.com/bedrock/pricing/]
---

# AI Cost Optimization & Token Management

Controlling costs while maintaining quality.

## Token Economics

### Token Counting
```
1 token ≈ 4 characters ≈ 0.75 words

Example:
  "How to process a refund?" = 6 tokens
  
Cost (Claude 3 Sonnet):
  Input: $3 per million tokens
  Output: $15 per million tokens
  
6 tokens input = $0.000018 cost
```

### Pricing by Model

| Model | Input | Output | Use Case |
|-------|-------|--------|----------|
| **Haiku** | $0.25/M | $1.25/M | Simple, fast |
| **Sonnet** | $3/M | $15/M | Balanced |
| **Opus** | $15/M | $75/M | Complex |

### Cost Example: 1000 Refunds/Day

```
Haiku (simple validation):
  Per request: 200 input + 50 output tokens
  Cost: (0.2*3 + 0.05*15) / 1M = $0.00125
  Daily: 1000 * $0.00125 = $1.25
  Monthly: $37.50

Opus (complex reasoning):
  Per request: 500 input + 200 output tokens
  Cost: (0.5*15 + 0.2*75) / 1M = $0.02250
  Daily: 1000 * $0.0225 = $22.50
  Monthly: $675

Savings with Haiku: $637.50/month = $7650/year
```

## Optimization Techniques

### 1. Model Selection
```
Route by complexity:

Simple task (email validation):
  → Haiku (70% cheaper)

Medium task (document classification):
  → Sonnet (balanced)

Complex task (reasoning, writing):
  → Opus (best quality)

Result: 40-50% cost reduction
```

### 2. Prompt Caching
```
Long document context (SOP for refunds):

Without caching:
  Repeat query: 1000 tokens (full SOP) + prompt
  Cost: High for repeated queries

With caching:
  First query: 1000 + prompt (cached)
  Repeat query: Just prompt (90% reduction)
  
Savings: 10x for repeated queries
```

### 3. Token Optimization
```
Verbose prompt:
  "Please carefully and thoroughly analyze the following
   customer request and determine if it meets all the
   requirements for a refund under our policy..."
  = 30 tokens

Concise prompt:
  "Refund eligibility check: [request]"
  = 8 tokens
  
Savings: 75% fewer tokens
```

### 4. Batching
```
Individual: 100 requests × 2 seconds = 200 seconds

Batch: 100 requests → Send as batch → Wait → Results
  Processing time: 10 seconds
  
Savings: 95% time reduction (but no real-time)
```

### 5. Fallback to Cheaper Model
```
Try Sonnet first:
  If simple (output < 100 tokens):
    Reprocess with Haiku (70% cheaper)
  
  If complex (output > 500 tokens):
    Keep Sonnet result

Result: Achieves most savings without quality loss
```

## Monitoring Costs

### Dashboards
```
Daily Metrics:
  - Tokens used (input/output)
  - Cost to date
  - Cost per request
  - Model distribution (% Haiku/Sonnet/Opus)

Alerts:
  - If daily cost > $1000 (anomaly)
  - If inefficiency detected (model wrong-sized)
```

### Cost Attribution
```
Per feature:
  Refund processing: $5/day
  Email generation: $2/day
  Document classification: $8/day
  Other: $3/day

Actionable: Can optimize high-cost features
```

## Agentic Ops Case Study

### Target Economics
```
1000 refunds/day

Cost per refund:
  Manual (30 min @ $25/hr): $12.50
  AI-optimized: $0.01

Savings: $12.49 per refund
Daily: $12,490
Annual: $4.5M

Strategy:
  ├─ Primary: Claude 3 Sonnet
  ├─ Simple validation: Haiku (fallback)
  ├─ Caching: SOP documents
  └─ Batching: Nightly reconciliation
```

---

**Last Updated:** 2026-07-28  
**Primary Project:** [Agentic Ops Platform](../../projects/agentic-ops/)
