---
title: "The Gap Between Writing Code and Building Systems"
date: "2026-04-20"
description: "Most developers can maintain existing architecture. Few can design from scratch. Here is what separates mid-level from senior engineers in production systems."
tags: ["system-design", "career", "architecture", "senior-engineer"]
readTime: "14 min"
---

There's a moment in every engineer's career when someone asks you to design something with only a rough idea of what it should do. No ticket. No ticket. No Jira. Just a problem and a deadline.

That's where mid-level ends and senior begins.

---

## The Skill Nobody Teaches

Most developers can join an existing codebase and add features. They understand the patterns. They know where to put the logic. They write clean code and pass code reviews.

But ask them to design something from scratch — a system with no starter code, no architecture to inherit — and most will freeze.

I know because I was there.

When I started building AMML, the Abuja Markets Management system, I wasn't inheriting someone else's work. I was making every decision:

- How do I structure this so a government parastatal with 18 markets and 400+ staff can actually use it?
- What do I use for data persistence when there's no server infrastructure?
- How do I handle biometric attendance from ZK devices that don't have a REST API?
- What does role-based access look like when the Superadmin is also a manager at one market but just a staff at another?

These aren't questions you can answer by reading documentation. They're **architectural tradeoffs** — decisions that affect every layer of the system for months or years.

---

## The Four Pillars I Had to Master

### 1. API Design — How Systems Talk to Each Other

The first question when building any system: how do components communicate?

**AMML's approach:** REST over HTTP/JSON.

Not because it's the best for every situation — it's not. But for a government parastatal with limited IT infrastructure, it's the most portable. You don't need a specialized client library. Any device that can make an HTTP request can interact with the system.

Here's what I learned about choosing protocols:

- **REST/JSON** — Simple, human-readable, widely understood. Good for most CRUD operations.
- **GraphQL** — Flexible queries, but adds complexity. Not justified for a system that doesn't need nested, dynamic data fetching.
- **gRPC** — Extremely performant, binary protocol. Excellent for microservices where latency matters. Overkill for a single-parastatal deployment.

The choice isn't about being modern. It's about what fits your constraints.

### 2. Data Layer — The Decision That Defines Everything

Every system I've seen fail does so at the data layer. Not because of bad code — because the data model was wrong from the start.

For AMML, I had to decide:

**Option A: localStorage (current)**
- Zero infrastructure cost
- Works offline
- Risk: browser data loss, no concurrent writes
- Appropriate for: single-user, < 5K records

**Option B: IndexedDB via Dexie.js (Phase 2)**
- Client-side, no server cost
- Indexed queries on date ranges
- Appropriate for: multi-user single device, larger datasets

**Option C: SQLite on Bun server (Phase 3)**
- Real concurrent multi-user support
- Proper server-side validation
- Appropriate for: multi-market, multi-user, government cloud deployment

I chose Option A for speed, with a clear migration path to Option C. That's what real-world architecture looks like — not picking the "best" solution, but picking the one that works for where you are now while planning for where you're going.

### 3. Security — Layers, Not Walls

Building a system that handles government employee data requires real security thinking, not just "add a login."

**The three attacks I designed against:**

**XSS (Cross-Site Scripting)**
If an attacker submits a `<script>` tag as a staff name or comment, it could execute on other users' browsers. React escapes all rendered strings by default — I never used `dangerouslySetInnerHTML`. That's the first line of defense.

**CSRF (Cross-Site Request Forgery)**
If a logged-in user's browser is tricked into making a background request to the attendance API, that request could succeed if I relied solely on session cookies. I avoided this by using JWT in the `Authorization` header — not a cookie — so the browser can't be manipulated into sending it to a cross-origin endpoint automatically.

**Data Tampering**
Since attendance records are stored client-side in localStorage, a technically sophisticated user could edit their own clock-in time. The mitigation is Phase 3: server-side validation when biometric logs are ingested. The server becomes the source of truth, not the browser.

### 4. Scalability — Knowing When to Optimize

Early optimization is a trap. I built AMML's Phase 1 targeting the constraints I actually had:

- Single parastatal, single deployment
- 400 staff, 18 markets
- No dedicated server infrastructure
- Government IT policies limiting cloud adoption

React + Vite for fast iteration. localStorage for zero infrastructure cost. Role-based access at the component level. CSV export from ZK devices as the integration pattern.

All of these choices would be wrong if the system needed to serve 50,000 concurrent users across multiple government agencies. But that's not the problem I have. It's the problem I might have in three years — and I know exactly how to get there when that happens.

---

## What I'd Tell My Earlier Self

**You don't need to know everything. You need to know how to make the right decision with incomplete information.**

The senior engineers I've worked with aren't the ones who knew every technology. They're the ones who could:

1. Understand a problem deeply enough to identify the constraints
2. Evaluate options without being seduced by novelty
3. Make a decision and defend it with reasoning, not authority
4. Recognize when their decision was wrong and change it without ego

Building AMML taught me more about system design than five years of following tickets. Because when you're the one making the call, you also own the consequences — and that changes how you think about every line you write.

---

## The Real Difference

Companies pay senior salaries not for people who can write code. They pay for people who can:

- Design the architecture when there's no architecture
- Make tradeoff decisions with ambiguous requirements
- Optimize the data layer for performance and cost
- Think about how the system affects the people using it

That last one is the one nobody talks about.

AMML isn't just a technical system. It's used by market managers who barely touch computers. It's supposed to track whether government employees showed up to work. When it goes down, someone's livelihood is affected.

That's the part that makes you a senior engineer — not the code, but the weight of what the code does.

---

*AMML is live at the Abuja Markets Management Limited deployment. The architecture is documented in full at `/home/workspace/amml/ARCHITECTURE.md`.*