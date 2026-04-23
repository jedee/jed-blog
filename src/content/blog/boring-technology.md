---
title: "Boring Technology Is Actually Kind of Wonderful"
date: "2026-04-19"
description: "The exciting new framework is not always the right one. Here is why boring, proven technology is often the smartest engineering decision you can make."
tags: ["engineering", "tooling", "architecture", "best-practices"]
readTime: "8 min"
---

## The Cost of Excitement

The problem with exciting technology is not that it doesn't work. It usually does. The problem is what comes after the launch:

**Breaking changes every six months.** The library that was "the future" in January is deprecated by June. You spend more time migrating than building.

**No Stack Overflow answers.** When something breaks at 2am, you are on your own. The community has not had time to encounter, document, and solved the problems you are now hitting.

**The documentation is wrong.** The first version of any documentation is written before anyone has used the tool in production. You are the production user. Congratulations.

**Your team does not know it.** Training time is real cost. Cognitive overhead for a team learning a new stack while trying to ship is real cost.

I learned this the hard way with AMML.

---

## What I Almost Did Wrong

Early in building AMML, I was tempted to reach for the newest database technology I could find. Something distributed, resilient, "built for scale." It would have been a fascinating technical challenge.

It would also have been completely wrong for the problem.

The actual constraint was a government parastatal with no dedicated server infrastructure. The system needed to run on whatever was available. It needed to be explainable to non-technical administrators. It needed to be fixable by someone who was not me, three years from now, in a different country.

None of those requirements benefit from a distributed database with a novel consistency model.

So I used localStorage for Phase 1. It was boring. It was also correct.

---

## The Criteria That Actually Matter

When I evaluate technology choices now, I use a different set of questions:

**Will this still exist in five years?** Not "is it popular now" — has it been stable long enough that it is unlikely to disappear or completely rewrite itself?

**Can a competent engineer who has never seen this tool figure out what the code does?** Boring technology has readable error messages, Stack Overflow threads from 2017, and code that does what it looks like it does.

**Does this solve the actual problem?** Not the problem I imagine I might have someday — the problem I have right now, with the resources I actually have.

**What is the failure mode?** Exciting technology tends to fail in exciting ways — cascading bugs, sudden breaking changes, complete data loss. Boring technology tends to fail in boring ways — a slow query you can optimize, a disk that fills up on a schedule you can predict.

---

## The Boring Stack That Actually Works

For most of the work I do, this is the boring stack:

- **React + TypeScript** — not the newest framework, but stable, widely understood, with a massive ecosystem
- **SQLite** — zero configuration, survives restart, transactional by default, and you can run it locally without starting a container
- **Node.js / Bun** — JavaScript on the server, widely deployable, straightforward debugging
- **Plain CSS with a design system** — instead of the latest CSS-in-JS solution, a set of design tokens and utility classes that anyone can read

None of these are exciting. All of them are reliable in ways that matter.

---

## When Exciting Is Right

I am not arguing against new technology as a rule. Sometimes the exciting choice is correct:

- When the boring alternative literally cannot do what you need
- When the new tool solves a problem that is specifically expensive for your use case
- When the team is already fluent and the migration cost is low

The question is not "new vs old." The question is "what does this decision cost me over the lifetime of the project?"

---

## The Real Advantage of Boring Technology

Here is what nobody talks about with boring stacks: they let you focus on the actual problem.

When I am not thinking about which cache invalidation strategy to use or whether my ORM will survive the next major version, I am thinking about how to structure the attendance data so it makes sense to a market manager who has never seen a database.

That is the work that matters. That is the work that makes something actually useful to the people who will depend on it.

The exciting technology is a distraction. Boring, proven, and appropriate — that is the winning combination.

---

*The AMML system is built with boring technology. It has survived three production deployments, a complete UI rewrite, and hundreds of staff records. The stack is not interesting. The system works.*