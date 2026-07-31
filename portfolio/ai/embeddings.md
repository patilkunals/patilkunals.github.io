---
title: Embeddings & Vector Search
summary: Vector embeddings, semantic search, similarity, vector databases
type: guide
category: Portfolio
domain: AI/GenAI
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [embeddings, vector-search, semantic-search, similarity]
related: [rag.md, vector-databases.md, langchain.md]
links: [https://platform.openai.com/docs/guides/embeddings]
---

# Embeddings & Vector Search

Understanding text embeddings and semantic search for RAG systems.

## What is an Embedding?

**Embedding:** Vector representation of text (list of numbers).

```
Text: "The quick brown fox jumps over the lazy dog"
Embedding: [-0.5, 0.3, 0.1, ..., 0.2] (1536 dimensions)

Key property: Similar text → similar vectors (close in space)
```

## Vector Space Geometry

### Similarity in Vector Space
```
"cat" and "dog" are close (both animals)
  ↓
cos_similarity("cat", "dog") = 0.85 (high)

"cat" and "rocket" are far (unrelated)
  ↓
cos_similarity("cat", "rocket") = 0.2 (low)
```

### Distance Metrics

**Cosine Similarity** (Recommended)
```
Measures angle between vectors
Range: -1 (opposite) to 1 (identical)
Result: 1 = identical, 0 = orthogonal
```

**Euclidean Distance**
```
Straight-line distance in vector space
Result: 0 = identical, ∞ = very different
```

## Embedding Models

### Amazon Titan Embeddings
```python
from langchain.embeddings import BedrockEmbeddings

embeddings = BedrockEmbeddings(
    model_id="amazon.titan-embed-text-v1"
)

# Embed text
vector = embeddings.embed_query("How do I process a refund?")
```

### OpenAI Embeddings
```python
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

vectors = embeddings.embed_documents([
    "Document 1...",
    "Document 2...",
    "Document 3..."
])
```

## Vector Search

### Nearest Neighbor Search
```
Query: "How to process refunds?"
  ↓ Embed
Query vector
  ↓ Search in database
Top 5 closest:
  1. "Refund policy and procedures" (similarity: 0.92)
  2. "Customer return process" (0.88)
  3. "Money back guarantee" (0.85)
  4. "Refund tracking system" (0.82)
  5. "Return authorization" (0.79)
```

### Approximate Nearest Neighbor (ANN)
```
Problem: Exact search in 1M+ vectors is slow
Solution: ANN indexes (fast approximate search)

Index types:
  - HNSW (Hierarchical Navigable Small Worlds)
  - IVF (Inverted File)
  - LSH (Locality Sensitive Hashing)

Trade-off: Speed vs. Accuracy
```

## RAG Flow with Embeddings

```
1. INGESTION PHASE:
   Documents
    ↓
   Split into chunks
    ↓
   Embed each chunk
    ↓
   Store in vector database

2. QUERY PHASE:
   User query
    ↓
   Embed query
    ↓
   Vector search (find similar)
    ↓
   Retrieve top-k documents
    ↓
   Feed to LLM with context
    ↓
   Generate grounded response
```

## Practical Example: SOP Database

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import BedrockEmbeddings
from langchain.document_loaders import PDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load SOPs
loader = PDFLoader("company_procedures.pdf")
docs = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_documents(docs)

# Create vector store
embeddings = BedrockEmbeddings(
    model_id="amazon.titan-embed-text-v1"
)
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name="company_sops"
)

# Search
results = vectorstore.similarity_search(
    "How do I process a customer refund?",
    k=3
)

for doc, score in results:
    print(f"Score: {score}")
    print(f"Content: {doc.page_content}")
```

## Choosing Embedding Dimensions

| Dimensions | Use Case | Trade-off |
|-----------|----------|-----------|
| 300 | Speed, edge devices | Lower accuracy |
| 768 | Balanced | Good accuracy, reasonable speed |
| 1536 | High quality | Best accuracy, slower search |
| 3072 | Expert | Highest quality, slowest |

## Optimizations

### Caching
```python
# Cache embeddings (don't recompute)
embedding_cache = {}

def get_embedding(text):
    if text in embedding_cache:
        return embedding_cache[text]
    
    embedding = embeddings.embed_query(text)
    embedding_cache[text] = embedding
    return embedding
```

### Filtering
```python
# Pre-filter before vector search
results = vectorstore.similarity_search(
    query,
    k=5,
    filter={"source": "company_procedures"}  # Only company docs
)
```

### Batching
```python
# Embed multiple documents at once
batch_embeddings = embeddings.embed_documents(
    doc_list,  # List of 100+ documents
    batch_size=32
)
```

## Common Challenges

| Challenge | Solution |
|-----------|----------|
| **Poor retrieval** | Better chunking, longer overlap, metadata |
| **Synonym misses** | Expand query, multiple queries, dense passage retrieval |
| **Slow search** | Index optimization, ANN algorithms, caching |
| **High cost** | Cheaper embeddings model, less frequent updates |
| **Dimension mismatch** | Use same embedding model for all |

## Best Practices

✅ **Consistent embeddings** – Same model for indexing and search  
✅ **Appropriate chunking** – Balance granularity and context  
✅ **Metadata** – Include source, date, category for filtering  
✅ **Testing** – Validate retrieval quality on examples  
✅ **Monitoring** – Track search latency and accuracy  
✅ **Updating** – Refresh embeddings when data changes  

---

**Last Updated:** 2026-07-28  
**Primary Project:** [Agentic Ops Platform](../../projects/agentic-ops/)
