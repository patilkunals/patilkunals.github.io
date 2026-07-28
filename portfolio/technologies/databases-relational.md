---
title: Relational Databases
summary: PostgreSQL, Oracle, MySQL, schema design, normalization, pgvector
type: technology
category: Portfolio
domain: Data
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [relational, sql, postgresql, oracle, mysql, pgvector]
related: [databases-nosql.md, vector-databases.md, rag.md]
---

# Relational Databases

ACID-compliant databases for transactional consistency and complex queries.

## PostgreSQL (Primary Choice)

### Strengths
```
✅ Open-source (free)
✅ ACID guarantees
✅ JSON support
✅ pgvector extension (vectors for RAG)
✅ Scalability (horizontal read replicas)
✅ PostGIS (geographic data)
```

### Setup
```sql
CREATE DATABASE portfolio_db;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
```

## Oracle Database

### Enterprise Features
```
✅ Advanced partitioning
✅ Real Application Clusters (RAC)
✅ Advanced security (Virtual Private Database)
✅ Data warehousing (OLAP)
❌ Expensive licensing
```

### Typical Use
```
- Financial institutions (TRIMS project)
- Insurance companies (Digital Insurance uses T24 on Oracle)
- Large enterprises requiring 99.99% uptime
```

## pgvector Extension (Critical for RAG)

### Installing
```sql
-- Enable pgvector in PostgreSQL
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table with vector column
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536),  -- 1536 dimensions (Titan embeddings)
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for fast search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

### Usage
```sql
-- Insert document with embedding
INSERT INTO documents (content, embedding) VALUES (
  'How to process a refund...',
  '[0.1, 0.2, 0.3, ..., 0.5]'::vector
);

-- Semantic search (similarity)
SELECT id, content, 
  1 - (embedding <=> query_embedding) as similarity
FROM documents
WHERE embedding <=> query_embedding < 0.3  -- Close to query
ORDER BY embedding <=> query_embedding
LIMIT 5;
```

### Agentic Ops Integration
```python
from langchain.vectorstores import PGVector
from langchain.embeddings import BedrockEmbeddings

# Connect to pgvector
vectorstore = PGVector(
    connection_string="postgresql://user:pass@localhost/portfolio_db",
    embedding_function=BedrockEmbeddings(),
    table_name="documents"
)

# Store SOP documents
vectorstore.add_documents(sop_documents)

# Semantic search
results = vectorstore.similarity_search("Process refund", k=3)
```

## Normalization Levels

### 1NF (First Normal Form)
```
❌ Not normalized:
  Customer: {name: "John", orders: [123, 456, 789]}

✅ Normalized:
  customers table: id, name
  orders table: id, customer_id, order_number
```

### 3NF (Third Normal Form)
```
✅ Normalized:
  customers: id, name, city_id
  cities: id, name, country_id
  countries: id, name
  
  (No transitive dependencies)
```

## Performance Optimization

### Indexing
```sql
-- Single column index (common queries)
CREATE INDEX idx_orders_date ON orders(created_at);

-- Composite index (filters on multiple columns)
CREATE INDEX idx_orders_customer_date 
ON orders(customer_id, created_at);

-- Query planner uses index
EXPLAIN SELECT * FROM orders 
WHERE customer_id = 123 AND created_at > '2026-01-01';
```

### Query Optimization
```sql
-- Efficient: Uses index
SELECT * FROM orders 
WHERE customer_id = 123;

-- Inefficient: Full table scan
SELECT * FROM orders 
WHERE amount * 1.1 > 100;  -- Function on column

-- Better:
SELECT * FROM orders 
WHERE amount > (100 / 1.1);
```

### Replication
```
Master (writes)
  ↓ WAL (Write-Ahead Log)
Read Replicas (read-only, scales reads)
  ← SELECT queries
```

## Portfolio Applications

### TRIMS (2015-2017)
```
Database: Oracle
Tables: Contracts, Settlements, Counterparties
Scale: 20-person team, 10M+ records
Pattern: Normalized 3NF schema
```

### Digital Insurance Platform (2023-2025)
```
Database: PostgreSQL
Tables: Policies, Claims, Customers, Coverage
Vectors: pgvector for document search in claims processing
Scale: 15+ team, millions of policies
```

### Agentic Ops Platform (Current)
```
Database: PostgreSQL with pgvector
Tables: SOPs, Documents, Embeddings
Use: RAG system for SOP knowledge base
Vector Index: IVFFLAT for fast similarity search
```

## Common Challenges

| Challenge | Solution |
|-----------|----------|
| **Slow queries** | Index optimization, query rewriting |
| **Large datasets** | Partitioning, archival strategy |
| **Concurrency** | Lock management, transaction isolation |
| **Backup complexity** | pg_dump, WAL archival, point-in-time recovery |

## Best Practices

✅ **Normalize schema** – 3NF reduces redundancy  
✅ **Index strategically** – Not on every column  
✅ **Use transactions** – ACID guarantees  
✅ **Monitor performance** – slow query logs  
✅ **Regular backups** – Automated, tested  
✅ **Use pgvector** – For RAG systems  

---

**Last Updated:** 2026-07-28
