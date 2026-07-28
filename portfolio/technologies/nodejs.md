---
title: Node.js Runtime & Ecosystem
summary: Express.js, async patterns, event-driven, npm ecosystem, scalability
type: technology
category: Portfolio
domain: Backend
visibility: public
status: published
created: 2026-07-28
version: 1.0
owner: Kunal Patil
tags: [nodejs, javascript, express, async, event-loop]
related: [javascript.md, api-design.md, microservices.md]
---

# Node.js Runtime & Ecosystem

JavaScript runtime optimized for asynchronous, event-driven applications.

## Core Strengths

### Event-Driven Architecture
```javascript
// Node.js is fundamentally event-driven
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('order:created', (order) => {
  console.log('Order created:', order.id);
  processPayment(order);
  notifyCustomer(order);
});

// Emit event
emitter.emit('order:created', {id: 123, amount: 100});
```

### Non-Blocking I/O
```javascript
// Blocking (DON'T DO)
const data = fs.readFileSync('large-file.txt');
process.nextTick(() => console.log('Next'));
// Takes seconds before "Next" prints

// Non-blocking (CORRECT)
fs.readFile('large-file.txt', (err, data) => {
  console.log('File read');
});
console.log('Next');  // Prints immediately
```

## Express.js Framework

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(authMiddleware);

// Routes
app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

app.listen(3000, () => console.log('Server running'));
```

## Async/Await Patterns

### Handling Concurrency
```javascript
// Sequential (slow)
async function processOrders(orders) {
  for (const order of orders) {
    await processPayment(order);      // Waits for each
    await updateInventory(order);
  }
}

// Parallel (fast)
async function processOrders(orders) {
  await Promise.all(orders.map(order => 
    Promise.all([
      processPayment(order),
      updateInventory(order)
    ])
  ));
}
```

## Portfolio Application

### Amazon Events Platform (2022-2024)
- **Scale:** 10K+ events/minute
- **Services:** Event ingestion, processing, distribution
- **Technology:** Node.js + Express
- **Infrastructure:** Kubernetes/EKS
- **Outcome:** Real-time event processing at scale

## NPM Ecosystem

### Production Packages
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.3.0",
    "redis": "^4.5.0",
    "dotenv": "^16.0.0",
    "joi": "^17.8.0",
    "winston": "^3.7.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "mocha": "^10.2.0"
  }
}
```

## Performance Optimization

### Clustering (Multi-core)
```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker process
  app.listen(3000);
}
```

### Caching
```javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/products/:id', async (req, res) => {
  // Check cache first
  const cached = await client.get(`product:${req.params.id}`);
  if (cached) return res.json(JSON.parse(cached));
  
  // Database hit
  const product = await Product.findById(req.params.id);
  await client.setex(`product:${req.params.id}`, 3600, JSON.stringify(product));
  res.json(product);
});
```

## Challenges

❌ **Memory leaks** → Monitor with clinic.js, heap snapshots  
❌ **Blocking operations** → Use worker threads for CPU-intensive tasks  
❌ **Single-threaded** → Scale with clustering or serverless  

## Best Practices

✅ Use async/await consistently  
✅ Handle errors gracefully  
✅ Implement proper logging (Winston, Pino)  
✅ Use environment variables for config  
✅ Write tests (Jest, Mocha)  
✅ Deploy in containers (Docker/Kubernetes)  

---

**Last Updated:** 2026-07-28
