---
title: GenAI Fundamentals
summary: Large Language Models, training, fine-tuning, prompting, limitations
type: guide
category: Portfolio
domain: AI/GenAI
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [genai, llm, fundamentals, training, inference]
related: [prompt-engineering.md, bedrock.md, langchain.md]
---

# GenAI Fundamentals

Understanding Large Language Models and Generative AI technology.

## What is GenAI?

**Generative AI** systems produce new content (text, code, images) based on patterns learned during training.

**LLM (Large Language Model):** Neural network trained on massive text data to predict next token (word).

## How LLMs Work

### 1. Tokenization
```
"Hello, how are you?" → tokens
  → ["Hello", ",", "how", "are", "you", "?"]
  → [12345, 1024, 5001, 3820, 9012, 8001]
```

### 2. Embedding
```
Each token → Vector (list of numbers)
  "Hello" → [-0.5, 0.3, 0.1, ..., 0.2] (length 4096)
  
Similar words have similar vectors:
  "happy" ≈ "joyful"
  "king" - "man" + "woman" ≈ "queen"
```

### 3. Attention Mechanism
```
Understanding relationships between words:
  "The bank manager opened the account"
  
"bank" relates to:
  - "manager" (strong)
  - "opened" (medium)
  - "account" (strong)
  
Attention weights determine influence
```

### 4. Prediction
```
Input: "The quick brown"
Model predicts next token:
  "fox" (90% probability)
  "dog" (5% probability)
  "cat" (3% probability)
  
Repeat process for each prediction
```

## Model Sizes

| Model | Parameters | Size | Use Case |
|-------|-----------|------|----------|
| **Small** | 7B | 14GB | Mobile, edge, simple tasks |
| **Medium** | 70B | 140GB | Balanced, general purpose |
| **Large** | 100B+ | 200GB+ | Complex reasoning, instruction following |

Larger = Better quality, higher latency/cost

## Training Process

### Pre-training
```
1. Massive text data (billions of documents)
2. Self-supervised: Predict next token
3. Months on large GPU clusters
4. Result: General knowledge, language understanding
```

### Fine-tuning
```
1. Smaller labeled dataset (domain-specific)
2. Supervised: Train on specific task
3. Hours/days on GPUs
4. Result: Better performance on target task
```

### RLHF (Reinforcement Learning from Human Feedback)
```
1. Generate multiple responses
2. Humans rank by quality
3. Train reward model
4. Optimize model to maximize reward
5. Result: Better alignment with human preferences
```

## Key Capabilities & Limitations

### Capabilities
✅ Text generation (essays, code, stories)  
✅ Summarization (compress long documents)  
✅ Question answering (with context)  
✅ Code generation (with limitations)  
✅ Translation (between languages)  
✅ Classification (categorize text)  

### Limitations
❌ No real-time information (training cutoff)  
❌ Hallucinations (confident false statements)  
❌ Context window (can't remember everything)  
❌ Reasoning (struggles with math, logic)  
❌ Knowledge boundaries (knows what was in training data)  

## Common Models

### Anthropic Claude
- Strong reasoning and instruction-following
- Good for complex tasks
- Available via AWS Bedrock

### Meta Llama
- Open-source, can self-host
- Good cost-performance
- Multiple sizes (7B, 13B, 70B)

### OpenAI GPT
- Powerful reasoning (GPT-4)
- Available via API
- High cost

## Portfolio Application

### Agentic Ops Platform
```
Task: Parse SOP document and create automated agent

1. Fine-tune Claude on SOP structure
2. Generate agent code from SOP
3. Create tools for each step
4. Build orchestration workflow
5. Deploy as Lambda function

Result: SOP → Agent (fully automated)
```

## Best Practices

✅ **Be specific** – Clear instructions work better  
✅ **Provide context** – More information → better answers  
✅ **Use examples** – Few-shot learning is powerful  
✅ **Verify outputs** – LLMs can hallucinate  
✅ **Iterate** – Refine prompts based on results  
✅ **Understand costs** – Token counting prevents surprises  

---

**Last Updated:** 2026-07-28
