---
title: NoSQL Databases - DynamoDB, MongoDB, Cassandra
summary: High-volume transactions, eventual consistency, horizontal scaling, schema-less
type: technology
category: Portfolio
domain: Data
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [nosql, dynamodb, mongodb, cassandra, scalability]
related: [databases-relational.md, aws.md, microservices.md]
links: [https://aws.amazon.com/nosql/]
---

# NoSQL Databases - DynamoDB, MongoDB, Cassandra

Distributed databases optimized for high volume, horizontal scaling, and eventual consistency.

## When to Use NoSQL

**Traditional SQL (ACID):**
```
✅ Financial transactions (must be consistent)
✅ Complex queries with JOINs
✅ Structured data
❌ Millions of writes/second
❌ High availability across regions
```

**NoSQL (Eventual Consistency):**
```
✅ High-volume writes (1M+/second)
✅ Horizontal scaling needed
✅ Flexible schema
✅ High availability required
❌ Complex transactions
❌ Cross-document consistency
```

## AWS DynamoDB

### Primary Choice for AWS

**Characteristics:**
```
✅ Fully managed (no infrastructure)
✅ Multi-AZ replication (built-in)
✅ Auto-scaling (pay per request)
✅ Millisecond latency
✅ Supports transactions (2024+)
```

### Data Model

```
Table: orders
├─ Partition Key: customer_id (distribution)
├─ Sort Key: order_id (ordering)
└─ Attributes:
   ├─ order_date
   ├─ total_amount
   ├─ status
   └─ items (JSON)
```

### Usage Pattern

```python
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('orders')

# Write
table.put_item(Item={
    'customer_id': '123',
    'order_id': 'order-456',
    'amount': 99.99,
    'items': ['item-1', 'item-2']
})

# Read
response = table.get_item(
    Key={
        'customer_id': '123',
        'order_id': 'order-456'
    }
)

# Query (efficient)
response = table.query(
    KeyConditionExpression='customer_id = :cid',
    ExpressionAttributeValues={':cid': '123'}
)
```

### Scaling

```
Provisioned (predictable):
  Read capacity: 100 RCU/sec
  Write capacity: 50 WCU/sec
  Cost: ~$50/month

On-Demand (unpredictable):
  Auto-scales 0 → unlimited
  Cost: $1.25 per million read requests
  Better for: Unpredictable workloads

Recommendation: On-demand for 90% of use cases
```

## MongoDB

### Open-Source + Cloud

**Characteristics:**
```
✅ Document-oriented (JSON)
✅ Flexible schema
✅ Secondary indexes
✅ Transactions (single/multi-doc)
✅ Atlas (cloud-hosted)
```

### Document Model

```python
from pymongo import MongoClient

client = MongoClient('mongodb+srv://...')
db = client['portfolio']
customers = db['customers']

# Insert
customers.insert_one({
    '_id': ObjectId(),
    'name': 'John Doe',
    'email': 'john@example.com',
    'policies': [
        {'policy_id': 'P123', 'type': 'auto'},
        {'policy_id': 'P124', 'type': 'home'}
    ],
    'created_at': datetime.now()
})

# Query
customer = customers.find_one({'email': 'john@example.com'})

# Update
customers.update_one(
    {'_id': customer['_id']},
    {'$push': {'policies': new_policy}}
)
```

## Cassandra

### Highly Available, Distributed

**Characteristics:**
```
✅ Linear scaling (add nodes, throughput increases)
✅ No single point of failure
✅ Multi-region replication
✅ Tunable consistency (eventual to strong)
❌ Complex (operational overhead)
❌ No JOIN operations
```

### Data Model

```python
from cassandra.cluster import Cluster

cluster = Cluster(['127.0.0.1'])
session = cluster.connect('portfolio')

# Insert
session.execute(
    """
    INSERT INTO orders (customer_id, order_id, amount, created_at)
    VALUES (%s, %s, %s, %s)
    """,
    ('cust-123', 'ord-456', 99.99, datetime.now())
)

# Query
rows = session.execute(
    """
    SELECT * FROM orders WHERE customer_id = %s
    """,
    ['cust-123']
)
```

## Comparison

| Feature | DynamoDB | MongoDB | Cassandra |
|---------|----------|---------|-----------|
| **Hosting** | Managed (AWS) | Managed/Self | Self-hosted |
| **Scaling** | Horizontal | Horizontal | Linear |
| **Consistency** | Eventual + Strong | Strong | Tunable |
| **Transactions** | Yes (2024+) | Yes | Limited |
| **Complexity** | Low | Low | High |
| **Cost** | Pay per request | Monthly | Infrastructure |

## Portfolio Applications

### Digital Insurance Platform
```
DynamoDB tables:
  - Customers (partition: customer_id)
  - Policies (partition: policy_id)
  - Claims (partition: claim_id)
  - Transactions (partition: timestamp)
  
Scale: 1M+ writes/day
Use: High-volume transactional data
```

### Real-time Analytics
```
Cassandra cluster:
  - Time-series data (events)
  - Multi-node distributed
  - 100K+ events/second
  - 3-region replication
```

## Best Practices

✅ **Choose right database** – RDBMS for transactions, NoSQL for scale  
✅ **Denormalize** – Optimize for queries, not storage  
✅ **Monitor partitions** – Ensure balanced distribution  
✅ **Set retention** – Old data cleanup (TTL)  
✅ **Test failure modes** – Distributed systems fail in weird ways  

---

**Last Updated:** 2026-07-28
