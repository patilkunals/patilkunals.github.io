---
title: RAG Systems - Retrieval-Augmented Generation
summary: Knowledge retrieval, semantic search, embeddings, LLM integration, vector databases
type: technology
category: Portfolio
domain: AI/GenAI
technology: RAG Systems
difficulty: Advanced
status: published
visibility: public
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [rag, genai, retrieval, embeddings, vector-search, knowledge-base]
related: [langchain.md, bedrock.md, agentic-ai.md, vector-databases.md]
links: [https://aws.amazon.com/what-is/retrieval-augmented-generation/]
---

# RAG Systems - Retrieval-Augmented Generation

Production experience building Retrieval-Augmented Generation systems that combine LLMs with knowledge bases.

## Overview

**Pattern:** RAG (Retrieval-Augmented Generation)  
**Problem:** LLMs have knowledge cutoff dates and hallucinate  
**Solution:** Retrieve relevant documents → Feed to LLM → Generate grounded response  
**Experience:** Production Agentic Ops platform with pgvector

## How RAG Works

### Architecture Flow
```
User Query
    ↓
1. Embedding – Convert query to vector
    ↓
2. Vector Search – Find similar documents in database
    ↓
3. Retrieval – Get top K most relevant documents
    ↓
4. Prompt Enrichment – Add documents to prompt context
    ↓
5. LLM Generation – Claude generates response using context
    ↓
Response with citations
```

### Detailed Flow
```python
from langchain.embeddings import BedrockEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import Bedrock

# 1. Initialize embeddings model
embeddings = BedrockEmbeddings(
    model_id="amazon.titan-embed-text-v1"
)

# 2. Create/load vector database
vectorstore = Chroma(
    collection_name="sop_documents",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

# 3. Create retriever (top-k search)
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}  # Top 5 documents
)

# 4. Build QA chain
llm = Bedrock(model_id="anthropic.claude-3-sonnet-20240229-v1:0")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff",
    return_source_documents=True
)

# 5. Query with context
result = qa_chain({"query": "How do I process a refund?"})
print(result["result"])
print(result["source_documents"])
```

## Embedding Models

### Amazon Titan Embeddings
```python
embeddings = BedrockEmbeddings(
    model_id="amazon.titan-embed-text-v1"
)

# Embed documents (batch)
document_embeddings = embeddings.embed_documents([
    "How to process refunds",
    "Customer complaint handling",
    "Return policy details"
])

# Embed query
query_embedding = embeddings.embed_query("What's the refund process?")

# Similarity search
similarity = cosine_similarity(query_embedding, document_embeddings)
```

### OpenAI Embeddings
```python
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
```

### Cohere Embeddings
```python
embeddings = BedrockEmbeddings(
    model_id="cohere.embed-english-v3"
)
```

## Vector Databases

### pgvector (PostgreSQL)
```sql
-- Enable pgvector extension
CREATE EXTENSION vector;

-- Create table with embeddings
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(1536),
    metadata JSONB
);

-- Create index for fast search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);

-- Search for similar documents
SELECT content, embedding <-> query_embedding AS distance
FROM documents
ORDER BY distance
LIMIT 5;
```

### Pinecone (Managed)
```python
from langchain.vectorstores import Pinecone
import pinecone

# Initialize Pinecone
pinecone.init(api_key="YOUR_API_KEY")

# Create vector store
vectorstore = Pinecone.from_texts(
    texts=documents,
    embedding=embeddings,
    index_name="sop-documents"
)

# Query
results = vectorstore.similarity_search("How to process refund?", k=5)
```

### Chroma (Local/Embedded)
```python
from langchain.vectorstores import Chroma

vectorstore = Chroma(
    collection_name="documents",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

# Add documents
vectorstore.add_texts(texts, metadatas)

# Query
results = vectorstore.similarity_search("query", k=5)
```

## RAG Chain Types

### 1. Stuff (Recommended for small contexts)
```python
chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)
# Puts all documents directly in prompt
```

**When to use:** Few documents, total < 8K tokens  
**Pros:** Simple, single LLM call  
**Cons:** Limited context window

### 2. Map-Reduce
```python
chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="map_reduce"
)
```

**When to use:** Many documents, need to summarize  
**Process:** Map (process each doc) → Reduce (combine results)  
**Cost:** Multiple LLM calls

### 3. Refine
```python
chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="refine"
)
```

**When to use:** Sequential document processing  
**Process:** Process doc 1 → Refine with doc 2 → Refine with doc 3...  
**Cost:** One call per document

## Agentic Ops RAG Implementation

### Document Ingestion Pipeline
```python
from langchain.document_loaders import PDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load SOPs (PDF documents)
loader = PDFLoader("standard_operating_procedures.pdf")
documents = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_documents(documents)

# Embed and store
embeddings = BedrockEmbeddings(model_id="amazon.titan-embed-text-v1")
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name="sop-base"
)
```

### Agent with RAG Access
```python
from langchain.agents import Tool, initialize_agent

# Create RAG tool
def retrieve_sop(query: str) -> str:
    """Retrieve relevant SOP sections"""
    results = vectorstore.similarity_search(query, k=3)
    return "\n".join([doc.page_content for doc in results])

tools = [
    Tool(
        name="RetrieveSOP",
        func=retrieve_sop,
        description="Retrieve relevant SOP sections for a query"
    ),
    # Other tools...
]

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION
)

# Agent can now access SOP knowledge
result = agent.run("How do I process a healthcare claim?")
```

## Quality Metrics

### Retrieval Quality
- **Precision:** Fraction of retrieved documents that are relevant
- **Recall:** Fraction of relevant documents that are retrieved

### LLM Generation Quality
- **BLEU:** Compares against reference outputs
- **ROUGE:** Recall-Oriented Understudy for Gisting Evaluation
- **Human evaluation:** Is the answer helpful and accurate?

### Cost Metrics
- **Cost per query:** Total LLM + embedding tokens cost
- **Latency:** Time from query to response
- **Throughput:** Queries per second

## Common Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **Poor retrieval** | Better embeddings, tune similarity threshold, improve document splitting |
| **LLM hallucination** | Enforce citations, validate against retrieved docs |
| **High latency** | Vector DB indexing, batch processing, caching |
| **Outdated knowledge** | Refresh embeddings periodically, add versioning |
| **Context overflow** | Refine chain type, better document chunking |
| **Expensive** | Cheaper embeddings model, fewer queries, caching |

## Best Practices

✅ **Chunking strategy** – Balance between granularity and context  
✅ **Similarity threshold** – Filter low-relevance results  
✅ **Metadata filtering** – Pre-filter documents before vector search  
✅ **Hybrid search** – Combine keyword and semantic search  
✅ **Caching** – Cache embeddings and common queries  
✅ **Versioning** – Track document versions in metadata  
✅ **Monitoring** – Track retrieval quality and cost  
✅ **Citations** – Always cite retrieved sources  

## Advanced Techniques

### Hybrid Search
```python
# Combine keyword search + semantic search
results_semantic = vectorstore.similarity_search(query, k=5)
results_keyword = full_text_search(query, k=5)
results_combined = rerank(results_semantic + results_keyword)
```

### Metadata Filtering
```python
# Filter by document source
vectorstore.similarity_search(
    query,
    k=5,
    filter={"source": "standard_operating_procedures.pdf"}
)
```

### Query Expansion
```python
# Generate multiple queries
queries = llm.generate([
    f"Generate 3 variations of this query: {query}"
])

# Search with each variation
results = []
for q in queries:
    results.extend(vectorstore.similarity_search(q, k=3))

# Deduplicate and rerank
final_results = rerank(results)
```

---

## See Also

- [LangChain](langchain.md) – RAG orchestration
- [AWS Bedrock](bedrock.md) – LLM provider
- [Vector Databases](../technologies/) – Storage solutions
- [Agentic AI](../ai/agentic-ai.md) – Agent patterns
- [Embeddings & Vector Search](../ai/embeddings.md) – Technical details

## Interview Talking Points

- **Production System:** RAG implementation in Agentic Ops platform
- **Architecture:** pgvector + LangChain + Claude Bedrock integration
- **Scale:** Handling large SOP document bases efficiently
- **Quality:** Balancing retrieval quality, latency, and cost
- **Innovation:** SOP-to-agent transformation using RAG

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Production (1+ year)  
**Primary Project:** [Agentic Ops Platform](../projects/agentic-ops/)
