---
title: Prompt Engineering
summary: Instruction design, few-shot learning, chain-of-thought, prompt optimization
type: guide
category: Portfolio
domain: AI/GenAI
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [prompt-engineering, llm, instruction-design, few-shot, optimization]
related: [genai-fundamentals.md, langchain.md, bedrock.md]
---

# Prompt Engineering

Designing effective instructions for LLMs to produce desired outputs.

## Basic Structure

### Simple Prompt
```
Input:
  "Summarize this text: [text]"

Output:
  Brief summary

Problem: Vague, LLM may produce poor output
```

### Better Prompt
```
Input:
  """
  You are a technical writer. Summarize the following text in 2-3 sentences.
  
  Focus on key findings and business impact.
  
  Text:
  [text]
  
  Summary:
  """

Output:
  More focused summary matching instructions
```

## Techniques

### 1. Role Definition
```
❌ "Summarize this"
✅ "As a financial analyst, summarize this quarterly report"
```

### 2. Context Setting
```
❌ "What's a circuit breaker?"
✅ "You are a software architect. Explain the circuit breaker pattern for microservices"
```

### 3. Few-Shot Learning
```
"Classify sentiment: positive, negative, or neutral

Examples:
  Text: 'I love this product!'
  Sentiment: positive
  
  Text: 'Worst purchase ever'
  Sentiment: negative
  
Now classify:
  Text: 'It works okay, nothing special'
  Sentiment: "
```

### 4. Chain-of-Thought
```
❌ "What is 15% of 200?"
✅ "Let's think through this step by step.
     1. Start with 200
     2. Calculate 15% of 200
     3. Show the calculation
     4. Give final answer"
```

### 5. Structured Output
```
Input:
  """
  Extract the following from the text:
  - Company name
  - Founded year
  - CEO name
  - Industry
  
  Format as JSON.
  
  Text: [text]
  """

Output:
  {
    "company": "...",
    "founded": 20XX,
    "ceo": "...",
    "industry": "..."
  }
```

## Portfolio Applications

### SOP to Agent Transformation

```
Prompt:
"""
You are an expert at converting Standard Operating Procedures (SOPs)
into executable agent workflows.

Convert the following SOP into a structured workflow:
1. Extract each step
2. Identify decision points
3. Define tools needed for each step
4. Output as YAML workflow definition

Format:
steps:
  - name: Step Name
    action: tool_name
    params:
      param1: value
    next_step: Next Step Name (or end)

SOP:
[SOP text]

Workflow:
"""

Result:
  Structured workflow ready for LangGraph execution
```

### Claim Processing

```
Prompt:
"""
You are a claims processor. For each claim submitted:

1. Validate required documents
2. Check policy coverage
3. Calculate settlement
4. Generate response

Use this structured format:
{
  "claim_id": "...",
  "status": "valid|invalid",
  "issues": ["..."],
  "coverage_applicable": true|false,
  "settlement_amount": number,
  "recommendation": "approve|deny|manual_review"
}

Claim:
[claim details]

Analysis:
"""
```

## Prompt Optimization

### Iterative Refinement
```
Attempt 1: Generic prompt
  Result: Poor output
  Reason: No guidance

Attempt 2: Added role
  Result: Better, but wrong format
  Reason: No output format specified

Attempt 3: Added role + format + examples
  Result: Excellent
  Reason: Clear expectations
```

### Common Pitfalls

❌ **Too vague** – "Explain this code"  
✅ **Clear** – "As a Python expert, explain this code. Focus on performance implications"

❌ **Assumes knowledge** – "Do the thing"  
✅ **Explicit** – "Create a list of 5 items with format [name, description, impact]"

❌ **Multiple goals** – "Summarize, translate, and rate"  
✅ **Focused** – "Summarize this (other tasks in separate prompts)"

## Advanced Techniques

### Persona + Task + Format
```
Prompt template:

"You are a [PERSONA].
Your task is to [TASK].

Input: [INPUT]

Format your response as:
[FORMAT]

Additional context:
[CONTEXT]

Response:"
```

### Constraint-Based
```
"Generate code that:
- Uses Python 3.9+
- Has type hints
- Is PEP 8 compliant
- Includes docstrings
- Handles errors gracefully

Function: [description]

Code:"
```

### Temperature & Randomness
```
temperature = 0.0  # Deterministic (facts, code)
temperature = 0.7  # Balanced (creative writing)
temperature = 1.0  # Very creative (brainstorming)
```

## Measuring Quality

### Metrics
- **Relevance:** Does output answer the question?
- **Accuracy:** Is information correct?
- **Completeness:** Did it cover all aspects?
- **Format:** Does it match requested format?
- **Consistency:** Reliable across multiple runs?

### Testing
```python
def test_prompt(prompt, test_cases):
    for input_text, expected_output in test_cases:
        result = llm(prompt + input_text)
        accuracy = evaluate(result, expected_output)
        print(f"Test: {accuracy}")
```

## Best Practices

✅ **Be specific** – Clear beats clever  
✅ **Use examples** – Few-shot learning works  
✅ **Chain thinking** – Step-by-step reasoning  
✅ **Structure output** – JSON, XML, markdown  
✅ **Test iteratively** – Refine based on results  
✅ **Document prompts** – Version control, track changes  
✅ **Monitor cost** – Token counting  

---

**Last Updated:** 2026-07-28
