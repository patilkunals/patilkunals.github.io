---
title: Message Queues & Event Streaming
summary: Kafka, RabbitMQ, AWS SNS/SQS, event-driven architecture, asynchronous processing
type: technology
category: Portfolio
domain: Integration
technology: Message Queues
difficulty: Intermediate
status: published
visibility: public
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [messaging, kafka, rabbitmq, event-driven, async, sns-sqs]
related: [event-driven.md, microservices.md, saga.md, kafka.md]
---

# Message Queues & Event Streaming

Deep expertise building event-driven architectures using Kafka, RabbitMQ, and AWS managed services.

## Overview

**Experience:** 10+ years  
**Technologies:** Kafka, RabbitMQ, AWS SNS/SQS, AWS Kinesis  
**Patterns:** Event-driven, asynchronous processing, saga  
**Use Cases:** Microservices communication, data pipelines, real-time processing

## Technology Comparison

| Technology | Throughput | Latency | Complexity | Use Case |
|-----------|-----------|---------|-----------|----------|
| **Kafka** | Very high (1M+ msg/s) | Low (10-100ms) | High | Event streaming, large scale |
| **RabbitMQ** | High (50K msg/s) | Low (10-100ms) | Medium | Task queues, routing |
| **SNS/SQS** | High | Low (100-500ms) | Low | AWS-native, simple |
| **Kinesis** | Very high | Very low (1s) | High | Real-time streaming, analytics |

## Apache Kafka

### Architecture
```
Producers → Broker Cluster → Consumers
              (3+ brokers)
              ↓
            Zookeeper (metadata)
```

### Key Concepts
- **Topic** – Logical channel for messages
- **Partition** – Distributed topic (parallel processing)
- **Consumer Group** – Multiple consumers sharing partitions
- **Offset** – Position in topic log

### Production Setup
```python
from kafka import KafkaProducer, KafkaConsumer
import json

# Producer
producer = KafkaProducer(
    bootstrap_servers=['kafka1:9092', 'kafka2:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Send message
producer.send('transactions', {
    'account_id': 123,
    'amount': 100.00,
    'type': 'withdrawal'
})

# Consumer
consumer = KafkaConsumer(
    'transactions',
    group_id='fraud_detection',
    bootstrap_servers=['kafka1:9092'],
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    auto_offset_reset='earliest'
)

for message in consumer:
    print(f"Processing: {message.value}")
```

### Kafka Streams (Stream Processing)
```python
from kafka import KafkaStreams

# Count transactions per account
topology = KafkaStreams.builder()
topology.stream("transactions")\
    .map(lambda k, v: (v['account_id'], 1))\
    .to_stream()\
    .filter(lambda k, v: v > 10)\
    .to("high_volume_accounts")

streams = KafkaStreams(topology, config)
streams.start()
```

## RabbitMQ

### Architecture
```
Producers → Exchange → Queues → Consumers
            (routing)
```

### Exchange Types
- **Direct** – Route by exact key match
- **Fanout** – Broadcast to all queues
- **Topic** – Route by pattern (*.orders, user.*)
- **Headers** – Route by message headers

### Implementation
```python
import pika
import json

# Connection
connection = pika.BlockingConnection(
    pika.ConnectionParameters('rabbitmq-host')
)
channel = connection.channel()

# Declare exchange and queue
channel.exchange_declare(exchange='orders', exchange_type='topic')
channel.queue_declare(queue='order_processing')
channel.queue_bind(
    exchange='orders',
    queue='order_processing',
    routing_key='order.*'
)

# Producer
def send_order(order_data):
    channel.basic_publish(
        exchange='orders',
        routing_key='order.created',
        body=json.dumps(order_data)
    )

# Consumer
def process_order(ch, method, properties, body):
    order = json.loads(body)
    print(f"Processing order: {order['id']}")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(
    queue='order_processing',
    on_message_callback=process_order
)
channel.start_consuming()
```

## AWS Managed Services

### SNS (Simple Notification Service)
**Publish-Subscribe Pattern**

```python
import boto3

sns = boto3.client('sns')

# Publish message
response = sns.publish(
    TopicArn='arn:aws:sns:us-east-1:123456789:orders',
    Message='{"order_id": 123, "status": "completed"}'
)

# Subscribe multiple consumers
sns.subscribe(
    TopicArn='arn:aws:sns:us-east-1:123456789:orders',
    Protocol='sqs',
    Endpoint='arn:aws:sqs:us-east-1:123456789:fraud-detection'
)
```

### SQS (Simple Queue Service)
**Point-to-Point Pattern**

```python
import boto3

sqs = boto3.client('sqs')

# Send message
sqs.send_message(
    QueueUrl='https://sqs.us-east-1.amazonaws.com/123456789/order-queue',
    MessageBody='{"order_id": 123}'
)

# Receive and process
messages = sqs.receive_message(
    QueueUrl='https://sqs.us-east-1.amazonaws.com/123456789/order-queue',
    MaxNumberOfMessages=10,
    WaitTimeSeconds=20
)

for message in messages.get('Messages', []):
    # Process
    sqs.delete_message(
        QueueUrl=queue_url,
        ReceiptHandle=message['ReceiptHandle']
    )
```

### SNS + SQS Pattern
```
SNS Topic
    ↓ (publish)
SQS Queue 1 → Consumer A
SQS Queue 2 → Consumer B
SQS Queue 3 → Consumer C
```

Benefits:
- Decoupling of producer and consumers
- Multiple independent consumers
- Durable message store (SQS)

## Event-Driven Architecture

### Event Flow
```
Event Source
    ↓
Event Bus (Kafka, SNS, EventBridge)
    ↓
Event Consumers (Lambda, services, subscriptions)
    ↓
Side Effects (database updates, API calls, more events)
```

### Saga Pattern (Distributed Transactions)
```
Order Service          Payment Service         Inventory Service
    ↓                       ↓                       ↓
Order Created     →    Pay Order         →    Reserve Inventory
    ↓
    Payment Received ← Payment Confirmed
    ↓
Order Confirmed
```

Implementation:
```python
# Order service publishes
order_queue.send({
    'event': 'OrderCreated',
    'order_id': 123,
    'amount': 100.00
})

# Payment service listens and responds
payment_handler.on(OrderCreated, lambda event:
    payment_service.process_payment(event.amount)
    .then(publish(PaymentConfirmed))
)

# Inventory service listens and responds
inventory_handler.on(PaymentConfirmed, lambda event:
    inventory_service.reserve_items(event.items)
    .then(publish(InventoryReserved))
)
```

## Portfolio Implementations

### Digital Insurance Platform (2023-2025)
- **Pattern:** Event-driven microservices
- **Technology:** RabbitMQ + AWS SNS/SQS
- **Workflows:** Premium processing, claims, customer updates
- **Scale:** 15+ services, 10K+ messages/day

### Middleware Modernization (2021-2022)
- **Pattern:** Event-driven with legacy integration
- **Technology:** Kafka for streaming, async adapters
- **Outcome:** $25M savings, 78% uptime
- **Scale:** High-volume transaction processing

## Best Practices

✅ **Idempotency** – Handle duplicate messages  
✅ **Message Schema** – Define and validate message format  
✅ **Dead Letter Queue** – Capture failed messages  
✅ **Ordering guarantee** – Use partitions/keys for ordered processing  
✅ **Monitoring** – Track message lag, throughput, errors  
✅ **Versioning** – Plan for message schema evolution  
✅ **Retention** – Define message retention policy  

## Common Patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Fan-out** | Multiple consumers | Order event → Payment, Inventory, Notification |
| **Routing** | Conditional dispatch | Transaction → Fraud check, Audit log |
| **Aggregation** | Combine events | Events from multiple services → Analytics |
| **Replay** | Reprocess events | Consumer caught up from offset |

## Common Challenges

| Challenge | Solution |
|-----------|----------|
| **Duplicate messages** | Idempotent consumer, deduplication key |
| **Message ordering** | Use single partition or ordered queue |
| **Large messages** | Store payload externally, reference in message |
| **Slow consumer** | Consumer scaling, multiple queues |
| **Message loss** | Persistence, replication, acknowledgement |
| **Debugging** | Message logging, tracing, replay capability |

---

## See Also

- [Kafka](../technologies/kafka.md) – Detailed Kafka guide
- [Event-Driven Architecture](../architecture-principles/event-driven.md) – Pattern guide
- [Saga Pattern](../patterns/saga.md) – Distributed transactions
- [AWS SNS/SQS](aws.md) – AWS services

## Interview Talking Points

- **Scale:** Event-driven systems handling 10K+ messages/day
- **Integration:** Combining Kafka, RabbitMQ, AWS managed services
- **Resilience:** Handling failures, message replay, idempotency
- **Architecture:** Saga pattern for distributed transactions
- **Monitoring:** Message lag, throughput, error tracking

---

**Last Updated:** 2026-07-28  
**Expertise Level:** Deep (10+ years)  
**Portfolio Coverage:** 2+ Tier 1 projects
