---
title: GenAI Architect Interview Playbook
summary: LLM strategy, agentic AI, RAG, prompt engineering, responsible AI
type: playbook
category: Portfolio
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [interview, genai, llm, agentic-ai, ai-strategy]
related: [star-format.md, technical.md, enterprise-architect.md]
---

# GenAI Architect Interview Playbook

Specialized preparation for GenAI/AI Architect roles.

## GenAI Landscape Context

**Current State (2024-2026):**
```
LLM Models:
  ├─ Claude 3 (Anthropic): Haiku/Sonnet/Opus
  ├─ GPT-4/4o (OpenAI): Enterprise capability
  ├─ Gemini (Google): Competitive alternative
  └─ Open-source: LLaMA, Mistral (cost-effective)

Platforms:
  ├─ AWS Bedrock (managed LLMs, easy integration)
  ├─ Azure OpenAI (enterprise integration)
  ├─ Vertex AI (Google Cloud)
  └─ Self-hosted (open-source models)

Tooling:
  ├─ LangChain (orchestration)
  ├─ LangGraph (workflows)
  ├─ Vector DBs (pgvector, Pinecone)
  └─ Prompt frameworks (structured output, agents)
```

## Your Agentic Ops Case Study

**The Perfect Example for GenAI Interviews:**

### Business Problem
```
Challenge: HR/Finance processes still manual
  - Refund processing: 30 min per request
  - Expense approvals: inconsistent
  - Data entry errors: expensive
  
Market opportunity: Automate with AI
  - Speed: 30 min → 2 min (15x improvement)
  - Cost: $5-10 manual → $0.01 AI (500x cost reduction)
  - Scale: hundreds of SOPs easily
  
Competitive angle: "AI isn't about chatbots,
  it's about unlocking business processes"
```

### Your Architectural Approach
```
Foundation: Three-layer architecture

Layer 1: SOP Ingestion
  Input: PDF/Word Standard Operating Procedure
  Process: Parse + extract structure
  Output: Structured SOP in database
  Tools: Document parsing, NLP extraction

Layer 2: Agent Generation
  Input: Structured SOP
  Process: Convert to LLM-executable workflow
  Output: Agent configuration (tools, prompts, rules)
  Technology:
    - LangChain: Define tools
    - LangGraph: State machine workflow
    - Claude 3 Sonnet: Reasoning, decision-making
    - Structured output: Parsing results

Layer 3: Execution
  Input: Customer request (refund, approval, etc.)
  Process: Agent decides actions → executes tools
  Output: Completed process + audit trail
  Tools: API integrations (payment, database, notification)
  Monitoring: Every decision logged for compliance
```

## Interview Stories for GenAI Role

### Story 1: Moving from Chatbot to Agentic Workflow

```
Situation:
  - Company built chatbot (Q&A interface)
  - Limited business value (nice but not transformative)
  - New realization: processes could be automated

Task:
  - Redesign from chatbot to agentic system
  - Focus on business outcomes (cost, speed)
  - Ensure governance (compliance, audit)

Action:
  1. Mapped processes that could be automated
     (30-minute manual processes are prime targets)
  2. Identified core LLM capability needed:
     - Reasoning (understand situation)
     - Tool use (execute actions)
     - Memory (context between steps)
  3. Chose Claude 3 Sonnet (best reasoning, cost-effective)
  4. Built three-layer architecture:
     - SOP ingestion (structure manual processes)
     - Agent generation (convert to executable workflows)
     - Execution layer (tools + monitoring)
  5. Ensured compliance:
     - Audit trail (every decision logged)
     - Human-in-loop (escalation paths)
     - Explainability (why did agent decide this?)

Result:
  ✅ Speed: 30 min → 2 min (15x)
  ✅ Cost: $5-10 → $0.01 (500x)
  ✅ ROI: $600K+/year savings
  ✅ Scalability: Hundreds of SOPs with same architecture
  ✅ Governance: Compliant with audit/regulatory requirements
```

### Story 2: RAG Implementation for Domain Knowledge

```
Situation:
  - Large organization with scattered knowledge
  - Regulatory documents, policies, procedures
  - New agents needed context to decide correctly

Task:
  - Build retrieval-augmented generation system
  - Provide agents with accurate, up-to-date information
  - Manage cost at scale

Action:
  1. Identified knowledge sources:
     - Policy documents (PDFs, Word)
     - Previous decisions (database)
     - Runbooks (text + diagrams)
  2. Created embedding pipeline:
     - Parse documents → chunks (1000 tokens)
     - Generate embeddings (Amazon Titan embeddings)
     - Store in vector DB (pgvector in PostgreSQL)
  3. Implemented retrieval:
     - Query from agent → semantically similar chunks
     - Pass relevant context to Claude
  4. Optimized for cost:
     - Efficient chunk size (balance accuracy/cost)
     - Prompt caching (reduce token usage 90%)
     - Structured output (parsing results)

Result:
  ✅ Accuracy: 92% (vs. 60% without RAG)
  ✅ Compliance: All decisions backed by policy
  ✅ Cost: $0.01 per process (caching reduces tokens)
  ✅ Maintenance: Centralized knowledge source
```

### Story 3: Handling Failure Modes & Safety

```
Situation:
  - LLMs can hallucinate (confident false info)
  - Financial processes require high accuracy
  - Regulatory requirement for explainability

Task:
  - Implement safety guardrails
  - Detect and prevent hallucinations
  - Ensure compliance auditing

Action:
  1. Identified failure modes:
     - Hallucinated policy (doesn't actually exist)
     - Incorrect calculation (math error)
     - Out-of-policy action (exceeds authority)
  2. Implemented multi-layer safety:
     - Structured output (prevent free-form hallucinations)
     - Calculation verification (double-check math)
     - Policy constraints (hard limits in tools)
     - Human review (escalation for edge cases)
  3. Monitoring & governance:
     - Every decision logged (who, what, when, why)
     - Regular audits (sample review)
     - Feedback loop (agent learns from corrections)
     - Metrics (accuracy, escalation rate, cost)

Result:
  ✅ Safety: <0.1% error rate (acceptable for business)
  ✅ Audit: Complete trail for compliance
  ✅ Learning: Continuous improvement from feedback
  ✅ Trust: Executive confidence in AI decision-making
```

## GenAI Discussion Topics

### Topic 1: Model Selection Strategy

**Question:** "How do you decide between different LLMs?"

**Your framework:**
```
Decision factors:
  1. Capability needed:
     - Simple Q&A → Haiku (cheap, fast)
     - Complex reasoning → Sonnet (balanced)
     - Specialized tasks → Opus (expensive, best)
  
  2. Cost analysis:
     - Input tokens: $3/M (Sonnet)
     - Output tokens: $15/M (Sonnet)
     - Throughput: N requests/sec
     - Volume: Daily/Monthly usage
  
  3. Latency requirements:
     - Real-time (sub-second) → Haiku
     - Interactive (1-5 sec) → Sonnet
     - Batch processing → Opus (quality over speed)
  
  4. Safety/Compliance:
     - Hallucination risk: Sonnet better than Haiku
     - Bias concerns: Claude > OpenAI (general perception)
     - Data privacy: Self-hosted vs. managed service
  
  5. Integration:
     - Bedrock (AWS native, easy)
     - Azure OpenAI (enterprise Microsoft)
     - Direct API (flexibility, operational burden)

Your position: "Model choice is business decision,
not technology decision. Optimize for outcomes."
```

### Topic 2: Token Economics

**Question:** "How do you manage LLM costs at scale?"

**Your approach:**
```
Optimization layers:

1. Prompt efficiency:
   - Clear instructions (better results per token)
   - Remove unnecessary context
   - Few-shot examples (teach without system prompt)

2. Context window management:
   - Only include relevant information
   - Summarize old conversations
   - Chunk large documents intelligently

3. Response optimization:
   - Structured output (parse once, not retry)
   - Streaming (stop early if possible)
   - Caching (repeat queries much cheaper)

4. Model selection:
   - Haiku for simple tasks (1/5 cost of Sonnet)
   - Sonnet for standard workflows (best ROI)
   - Opus only when absolutely needed

Example: Refund processing
  - Without optimization: $0.50 per request
  - With prompt caching: $0.01 per request (50x improvement)
  - Monthly (1000 refunds): $10k → $200
  - Annual savings: $120k
```

### Topic 3: Responsible AI & Governance

**Question:** "How do you ensure AI is being used responsibly?"

**Your framework:**
```
Dimensions of responsibility:

1. Fairness & Bias:
   - Monitor decisions for demographic bias
   - Regular audits (fair treatment across groups)
   - Adjustment rules (override if biased)

2. Transparency:
   - Explain why agent made decision
   - Show supporting evidence (which policy/precedent)
   - Human-understandable rationale

3. Accountability:
   - Clear ownership (who's responsible?)
   - Audit trails (every decision logged)
   - Escalation paths (human review available)

4. Safety:
   - Prevent jailbreaks (adversarial inputs)
   - Detect hallucinations (consistency checks)
   - Hard limits (authorization constraints)

5. Privacy:
   - Data minimization (only use needed info)
   - Retention policies (don't store longer than needed)
   - Compliance (GDPR, CCPA, industry regulations)

In Agentic Ops: "Every decision is auditable.
  If something goes wrong, we know exactly
  what the AI saw, how it reasoned, and why."
```

### Topic 4: The Future of Agentic AI

**Question:** "What excites you about agentic AI?"

**Your vision:**
```
Current state (2024-2026):
  - Single-agent workflows
  - Deterministic processes
  - Human-in-loop for edge cases

Near-term (2026-2028):
  - Multi-agent collaboration
  - Dynamic decision-making
  - Higher autonomy
  - Industry-specific agents

Challenges we're solving:
  1. Reliability: How do we ensure correct decisions?
  2. Cost: How do we make it economical?
  3. Explainability: Can business users trust it?
  4. Compliance: Does it meet regulatory requirements?
  5. Maintenance: How do we keep it accurate?

Long-term positioning: "Agentic AI is not about
  replacing humans. It's about amplifying human
  capability—handling routine work so humans can
  focus on strategic, creative, complex tasks."
```

## Technical Competencies to Demonstrate

### 1. LLM Fundamentals
```
You should understand:
  ✅ Transformer architecture (why attention works)
  ✅ Tokenization (how LLMs count words)
  ✅ Embeddings (vector representations)
  ✅ Fine-tuning (adapting models)
  ✅ Inference optimization (cost & speed)
```

### 2. Agentic Architecture
```
Key concepts:
  ✅ ReAct pattern (Reasoning + Acting)
  ✅ Tool definition (how agents call functions)
  ✅ State management (memory between steps)
  ✅ Error handling (what if tool fails?)
  ✅ Orchestration (coordinating multiple tools)
```

### 3. RAG Implementation
```
Must know:
  ✅ Embedding models (Amazon Titan, OpenAI)
  ✅ Vector similarity search (cosine, Euclidean)
  ✅ Chunk strategies (size, overlap)
  ✅ Retrieval patterns (dense, hybrid, semantic)
  ✅ Context window management
```

### 4. Prompt Engineering
```
Core skills:
  ✅ System prompts (set behavior/rules)
  ✅ Few-shot examples (teach by example)
  ✅ Chain-of-thought (improve reasoning)
  ✅ Structured output (parse programmatically)
  ✅ Iterative refinement (A/B testing prompts)
```

---

**Last Updated:** 2026-07-28
