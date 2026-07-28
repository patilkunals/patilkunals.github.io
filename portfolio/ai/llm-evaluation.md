---
title: LLM Evaluation & Quality Metrics
summary: BLEU, ROUGE, semantic similarity, hallucination detection, output validation
type: guide
category: Portfolio
domain: AI/GenAI
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [llm-evaluation, quality-metrics, validation, testing]
related: [genai-fundamentals.md, prompt-engineering.md]
---

# LLM Evaluation & Quality Metrics

Measuring and validating LLM output quality.

## Automatic Metrics

### BLEU Score (Machine Translation)
```
Measures overlap between generated and reference
Range: 0-100 (higher = better)

Example:
  Reference: "The quick brown fox"
  Generated: "The quick brown dog"
  BLEU: 75% (3 of 4 words match)
  
Limitation: Misses semantic similarity
```

### ROUGE Score (Summarization)
```
Recall-Oriented Understudy for Gisting Evaluation

ROUGE-1: Unigram overlap
ROUGE-2: Bigram overlap
ROUGE-L: Longest common subsequence

Example:
  Reference: "Machine learning improves accuracy"
  Generated: "ML improves accuracy significantly"
  ROUGE-1: 60% (3 of 5 words overlap)
```

### Semantic Similarity
```
Embedding-based comparison:

1. Embed reference text
2. Embed generated text
3. Calculate cosine similarity
4. Result: -1 (opposite) to 1 (identical)

Example:
  "How to refund"    vs  "Refund processing steps"
  Similarity: 0.82 (high, captures intent)
```

## Human Evaluation

### Rubric-Based
```
Criteria:
  ✅ Accuracy (factually correct)
  ✅ Completeness (covers all aspects)
  ✅ Clarity (easy to understand)
  ✅ Conciseness (not verbose)
  ✅ Relevance (answers the question)

Score: 1-5 per criterion
Average: Final quality score
```

### A/B Testing
```
Option A: Model v1
Option B: Model v2

Random 100 samples
Have humans choose: A, B, or Tie

If B wins > 60%: Upgrade to v2
If A wins > 60%: Keep v1
If Tie: Continue testing
```

## Portfolio Application: Agentic Ops

### Agent Output Validation
```
Step 1: Agent generates action
Step 2: Validate output:
  ├─ Is it a valid tool? (exact tool name)
  ├─ Are parameters correct? (schema validation)
  ├─ Does it make sense? (semantic check)
  └─ Has it been tried before? (detect loops)

Step 3: Execute or escalate to human
```

### Quality Metrics
```
Task: Process refund SOP

Metrics:
  - Correct tool selection: 98%
  - Valid parameters: 99%
  - SOP compliance: 97%
  - Customer satisfaction: 4.8/5
  - Escalation rate: <3%
```

## Detecting Hallucinations

### Fact-Checking
```
LLM claim: "Company founded in 1995"

Check:
  1. Search knowledge base
  2. Query external API
  3. Verify against documents
  4. Flag if inconsistent
```

### Consistency Checking
```
Request: "What's our return policy?"

Response 1: "30-day returns from purchase"
Response 2: "Returns within 30 days"
Response 3: "30 days from delivery date"

Inconsistency detected → Flag for human review
```

### Probability Thresholds
```
Model confidence:
  > 95%: Confident (auto-approve)
  80-95%: Medium (review)
  < 80%: Low (escalate)
```

## Cost vs. Quality Trade-off

```
Model Selection:
  Claude Haiku: Fast, cheap, 95% accuracy
  Claude Sonnet: Balanced, 98% accuracy
  Claude Opus: Slow, expensive, 99% accuracy

Strategy:
  - Simple tasks: Haiku + validation
  - Complex tasks: Sonnet
  - Critical paths: Opus with review
```

---

**Last Updated:** 2026-07-28
