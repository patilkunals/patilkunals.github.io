---
title: Vector Databases
summary: pgvector, Pinecone, Weaviate, Chroma, semantic search optimization
type: technology
category: Portfolio
domain: Data
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [vector-db, embeddings, semantic-search, rag]
related: [embeddings.md, rag.md, databases-relational.md]
---

# Vector Databases

Specialized databases for storing and searching vector embeddings at scale.

## pgvector (PostgreSQL Extension)

### Advantages
```
✅ Integrated with PostgreSQL
✅ ACID transactions
✅ Cost-effective (open-source)
✅ Hybrid queries (SQL + vector)
✅ Easy backup/replication
```

### Setup
```sql
CREATE EXTENSION vector;

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536),
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### Query
```sql
-- Find similar documents
SELECT id, content, 
  (1 - (embedding <=> query_embedding::vector)) as similarity
FROM documents
ORDER BY embedding <=> query_embedding::vector
LIMIT 5;
```

## Pinecone (Managed Service)

### Benefits
```
✅ No infrastructure management
✅ Auto-scaling
✅ High availability
✅ Metadata filtering
❌ Cost per API call
❌ Vendor lock-in
```

### Usage
```python
import pinecone

# Initialize
pinecone.init(api_key="YOUR_API_KEY", environment="us-west1-gcp")
index = pinecone.Index("agentic-ops-sops")

# Upsert vectors
index.upsert(vectors=[
  ("doc-1", embedding1, {"source": "sop.pdf", "type": "procedure"}),
  ("doc-2", embedding2, {"source": "sop.pdf", "type": "workflow"})
])

# Query
results = index.query(query_embedding, top_k=5, include_metadata=True)
for match in results.matches:
  print(f"{match.id}: {match.score} - {match.metadata}")
```

## Weaviate (Open-Source + Cloud)

### Features
```
✅ Open-source (self-hosted option)
✅ GraphQL API
✅ Multiple distance metrics
✅ Semantic search with BERT
✅ Generative search
```

### Integration
```python
import weaviate

client = weaviate.Client("http://localhost:8080")

# Create schema
schema = {
  "classes": [{
    "class": "Document",
    "properties": [
      {"name": "content", "dataType": ["text"]},
      {"name": "source", "dataType": ["string"]}
    ]
  }]
}
client.schema.create_classes(schema)

# Add documents
client.data_object.create(
  data_object={
    "content": "How to process...",
    "source": "sop.pdf"
  },
  class_name="Document"
)

# Search
result = client.query.get("Document").with_near_text(
  {"concepts": ["refund processing"]}
).with_limit(5).do()
```

## Comparison Table

| Feature | pgvector | Pinecone | Weaviate | Chroma |
|---------|----------|----------|----------|--------|
| **Hosting** | Self | Managed | Self/Cloud | Self |
| **Cost** | Low | High | Low-Medium | Free |
| **Scale** | 100M+ | Unlimited | 1B+ | 100K+ |
| **Setup** | Easy | Easiest | Medium | Easiest |
| **Use Case** | Production | Enterprise | Enterprise | Dev/Test |

## RAG Pipeline with Vectors

```
1. Ingestion:
   SOPs → Split → Embed → Store in pgvector
   
2. Query:
   User query → Embed → Vector search → Top-5 docs
   
3. Generation:
   Top-5 docs + Query → LLM → Answer
```

## Agentic Ops Implementation

```python
from langchain.vectorstores import PGVector
from langchain.embeddings import BedrockEmbeddings
from langchain.chains import RetrievalQA
from langchain.llms import Bedrock

# Vector store
vectorstore = PGVector(
  connection_string="postgresql://...",
  embedding_function=BedrockEmbeddings(),
  table_name="sop_documents"
)

# LLM
llm = Bedrock(model_id="anthropic.claude-3-sonnet-20240229-v1:0")

# RAG chain
qa_chain = RetrievalQA.from_chain_type(
  llm=llm,
  chain_type="stuff",
  retriever=vectorstore.as_retriever(k=5)
)

# Query
answer = qa_chain.run("How to process a refund SOP?")
```

## Performance Optimization

### Index Configuration
```
lists = 100      (100 clusters for IVFFLAT)
probe = 10       (search across 10 clusters)

More lists → Better accuracy, slower search
Fewer lists → Faster search, less accurate
```

### Metadata Filtering
```sql
-- Filter before vector search
SELECT * FROM documents
WHERE source = 'sop.pdf' AND category = 'refunds'
ORDER BY embedding <=> query_embedding
LIMIT 5;
```

### Batch Operations
```python
# Batch upsert (faster)
vectors_batch = [
  (f"doc-{i}", embedding, metadata)
  for i, (embedding, metadata) in enumerate(data)
]
index.upsert(vectors_batch, batch_size=100)
```

## Dimensionality Considerations

| Dimensions | Embedding Model | Use Case |
|-----------|-----------------|----------|
| 384 | All-MiniLM-L6-v2 | Fast, edge devices |
| 768 | sentence-transformers | Balanced |
| 1536 | Amazon Titan | High quality |
| 3072 | OpenAI text-3-large | Expert |

## Best Practices

✅ **Choose index type** – IVFFLAT fast, HNSW most accurate  
✅ **Metadata filtering** – Pre-filter before vector search  
✅ **Batch operations** – Faster than single inserts  
✅ **Monitor latency** – Track query performance  
✅ **Backup strategy** – Regular snapshots  
✅ **Hybrid search** – Combine keyword + vector  

---

**Last Updated:** 2026-07-28  
**Primary Project:** [Agentic Ops Platform](../../projects/agentic-ops/)
