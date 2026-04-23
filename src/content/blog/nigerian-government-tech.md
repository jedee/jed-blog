---
title: "Why Nigerian Government Tech Adoption Moves at the Pace It Does"
date: "2026-04-20"
description: "Building technology for government parastatals in Nigeria is not a technical problem — it is a stakeholder management problem in disguise. Here is what I learned from the inside."
tags: ["nigeria", "government", "policy", "technology"]
readTime: "10 min"
---

## The Decision Is Never About Technology

The first thing you learn fast: nobody inside a government parastatal is evaluated on whether they adopted the right technology. They are evaluated on whether they followed process, whether their supervisors were consulted, and whether the system they approved did not cause a visible problem.

This is not laziness or corruption. It is rational behavior given the actual incentive structure.

If a director approves a new attendance system and it fails, they own the failure. If they approve continuing with the existing spreadsheet and it fails, the spreadsheet failed. They followed procedure. They consulted the right people. They are protected.

Technology adoption in this environment is not a technical decision. It is a political decision dressed in technical language. Your job is not to build the right system. Your job is to build the right system in a way that makes it safe for the people who approve it.

---

## The Approval Chain Problem

A mid-sized government parastatal in Nigeria can have seven to twelve approval levels for a new system. Each level has different concerns:

**The IT team** wants something maintainable, with documentation they can actually use.

**The HR director** wants something that does not expose staff data, that their supervisors will understand, and that they can defend if a staff member challenges an attendance record.

**The finance team** wants something that does not complicate their procurement rules, that can be expensed correctly, and that has a vendor who will still be around in three years.

**The director-general** wants something that will not become a scandal, that their supervising ministry will not question, and that does not create work for their office.

**The supervising ministry** wants something that does not create parliamentary questions.

None of these concerns are wrong. They are all legitimate. But they are all different, and a technical solution that satisfies none of them is not going to survive the approval process.

---

## Why Procurement Rules Are Not Just Bureaucracy

Developers tend to view procurement rules as obstacles. They are not. They are load-bearing structures that distribute accountability.

The reason government systems in Nigeria require documented procurement is because the alternative — a single officer deciding to spend public resources on a system they chose privately — is genuinely dangerous. Not because that officer is corrupt, but because without the distributed accountability structure, there is no way to verify that public money was spent wisely.

When I was building AMML, I spent significant time understanding the procurement framework not to find workarounds, but to understand where the accountability pressure points were. Once I understood that, I could design the rollout in a way that made it safe for each decision-maker in the chain.

This meant:
- Documenting every decision publicly, in writing, with clear owners
- Making sure each stakeholder could see the system working before being asked to approve it
- Building in review stages that gave each approval level confidence at their stage of evaluation
- Ensuring the vendor relationship (me) was structured in a way that was defensible under audit

None of this was technically complicated. All of it was necessary.

---

## The Role of Trust Architecture

One of the most underappreciated aspects of government technology projects is what I call trust architecture — designing the system so that it generates trust as a byproduct of how it works.

The AMML attendance system needed to be believable by:
- HR managers who needed to trust the late-arrival calculations
- Staff members who needed to trust that clock-in records were accurate
- Finance teams who needed to trust that payroll deductions were correct
- The director-general who needed to trust that the system could not be manipulated

The technical solution for each of these is different. Trust for HR is about audit trails and verification. Trust for staff is about transparency — knowing what the system recorded and why. Trust for finance is about verifiable calculations. Trust for leadership is about the system being robust to challenges from any direction.

A system that is technically correct but architecturally opaque will fail the trust test. People will find workarounds — paper backup logs, unofficial spreadsheets, informal verification calls — not because they do not understand the technology, but because the technology has not been designed to generate their trust.

---

## The Practical Implications

For developers working in this space, here is what this means concretely:

**Start with the approval chain, not the technical architecture.** Map who will be asked to approve the system at each stage. Understand what each person needs to be able to say yes. Design the system to make those conversations easy.

**Build in review stages.** Do not build the complete system and then present it. Present working components at each approval stage. Give each decision-maker something they can evaluate with their specific concerns in mind.

**Design for audit.** Not because you expect to be audited, but because a system designed to survive audit generates the kind of documentation and structure that builds institutional trust.

**Separate the vendor problem from the technical problem.** Who you are matters in government technology. A system from an unknown developer with no track record has to prove itself in ways that a system from a recognized vendor does not. Position yourself accordingly — not by inflating credentials, but by ensuring the relationship is structured in a way that is accountable and transparent.

---

## The Actual Timeline

Government technology adoption in Nigeria is slow for reasons that are mostly rational, given the environment. Understanding those reasons does not make it faster — but it lets you stop blaming the wrong things and start working within the actual constraints.

The systems that get built are the ones where the developer understood that the approval chain was part of the product. Not an obstacle to work around — a feature to design for.

---

*AMML is currently deployed at Abuja Markets Management Limited. The approval chain involved seven stakeholders across three departments. It took fourteen months from first conversation to production deployment. The system is still in use.*