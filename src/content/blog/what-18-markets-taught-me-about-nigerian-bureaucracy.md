---
title: "What 18 Markets Taught Me About Nigerian Bureaucracy"
date: "2026-04-21"
description: "Building technology for 18 markets across the FCT changes how you think about engineering, politics, and the difference between a system that works and one that survives."
tags: ["career", "government", "nigeria", "stakeholder-management"]
readTime: "12 min"
---

There is a particular silence that falls over a government office when you say the word "software."

It is not hostility. It is not enthusiasm. It is the sound of people deciding, very carefully, not to have an opinion.

I have heard that silence seventeen times. Once for each market the Abuja Markets Management Limited oversees. Plus one for the head office.

This is what I learned.

---

## Lesson One: The Person Who Signs Is Never the Person Who Decides

Every approval chain in government is a mirage. You meet with the Director of Administration. You think the Director of Administration can approve your proposal. You are wrong. The Director of Administration can only tell you who else to meet.

The actual decision is made three levels above the person sitting across from you, who has never heard your name, and who will approve or reject your idea based on criteria that have nothing to do with whether your system works.

I learned to ask one question early: *who else needs to see this before a decision is made?*

The answer is always longer than you want.

---

## Lesson Two: "We Already Have Something Like That" Means Nothing

The most common objection I heard: *"We already have something like that."*

It does not mean they have a working system. It does not mean they have a system at all. It means someone, at some point, mentioned a computer to someone else, and a file was opened, and a consultant submitted a proposal that was filed in a drawer.

What it actually means is: there is no budget, no urgency, and no internal champion willing to put their name on something new.

I learned to reframe the conversation. Not "here is a better system." But: *"what happened the last time someone tried to track attendance electronically here?"*

That question opens the real conversation. Because something always happened. A vendor took money and disappeared. A ministry imposed a system that nobody trained anyone on. A consultant built something that only worked on one computer in one office.

The failure is the entry point. Not the solution.

---

## Lesson Three: The Budget Meeting Is the Real Meeting

Every organization has a formal meeting schedule. Budget meetings are not on it. Budget meetings happen in corridors, in cars after 5pm, in the parking lot of the ministry on a Friday.

The person who controls the money is often not the person you were introduced to at the formal meeting. They are usually older, less visible, and have final say over everything — including things that were supposedly already approved.

I learned to find them. Not aggressively. Not suspiciously. But quietly, through the right intermediaries, and with a clear, short explanation of what I needed, why I needed it, and what it would cost.

Government budgets, in my experience, are not as rigid as they appear. There is usually a line item for "consultancy services" or "emergency infrastructure." The money exists. The problem is accessing it without triggering seventeen forms.

---

## Lesson Four: Your Biggest Ally Is the Person Who Has to Use It

Middle management is not the decision-maker, but they are the implementation layer. Get them involved early. Not as consultants — as co-builders.

When I was designing the AMML attendance system, I spent two weeks sitting with market supervisors. Not asking them what they wanted. Asking them what broke. Every single one had a story about the last attendance system that failed: the paper register that got wet during rainy season, the Excel sheet that only one person knew how to open, the vendor who promised training and never came.

Their pain was specific. Their feedback was precise. And when the system went live, those same supervisors were the ones who defended it to their directors — because they had helped build it, and it worked differently from the others they had seen fail.

The person who has to use the system will either make it succeed or ensure it fails. There is no neutral.

---

## Lesson Five: The Meeting That Should Have Been an Email

In government, there is a meeting for every three emails that should have been sent. Most of these meetings are not about decisions. They are about accountability — making sure that if the project fails, twenty people can say they were involved and raised concerns.

I used to find this frustrating. Now I see it differently.

Government employees, particularly in parastatals, operate in a environment where being associated with a failed project is worse than being associated with no project at all. The meetings are not inefficiency. They are risk management.

The solution is not to fight the meetings. It is to manage them — come with a one-page summary, ask for decisions in writing, follow up every conversation with a summary email that says *"per our discussion, the agreed next steps are…"*

You are not just building software. You are building a paper trail that protects everyone.

---

## Lesson Six: "It Is Not in the System" Is Sometimes True and Sometimes a Lie

When a government employee tells you something cannot be done because "it is not in the system," there are two possible meanings.

The first is literal: the process is genuinely constrained by an upstream system — a treasury system, an IPPIS number, a Federal Ministry approval portal — that you cannot change and cannot bypass.

The second is a polite refusal. They do not want to do the thing. They are not going to fight for the thing. And they would prefer you understood that the system is the reason, not them.

You learn to tell the difference by asking one question: *"who controls that system, and what would it take for them to make an exception?"*

If they know the answer, the system is the real constraint. If they deflect, the system is the excuse.

---

## Lesson Seven: Paper Is Still the Official Record

In 2026, the official record of a government employee's attendance is still sometimes a paper sign-in book.

Not because nobody cares about modernizing. But because a paper sign-in book requires no login, no training, no electricity, no internet, no vendor relationship, and — most importantly — no single point of failure that can be blamed on any one person.

Digital systems in government carry invisible political weight. When a digital system fails, someone is responsible. When a paper book fails, it is weather. Or God. Or fate. Never a person.

The implication for software builders: you cannot make the digital version the only version. Not at first. You build alongside the paper system, prove the digital version works, and let the paper system become the backup — until, eventually, nobody uses it anymore.

You do not replace the paper system. You make it irrelevant.

---

## Lesson Eight: The Vendor Who Said "We Already Did This for FCTA"

Three different biometric vendors told me they had already implemented attendance systems for the FCT Administration. I verified all three claims. None of the systems were operational.

This is a specific Nigerian government dynamic I have come to call the *pilot project graveyard*. A ministry or parastatal signs an MOU with a vendor. A pilot is deployed. It works in demo conditions. The ministry does not adopt it at scale. The vendor moves on. The system is never maintained.

Three years later, someone finds the hardware in a storage room, tries to use it, and discovers that the cloud backend it relied on no longer exists.

When you encounter this — and you will — do not dismiss it. Acknowledge it. Say: *"I understand there was an attempt before. Here is why this is different."*

Then be specific about what makes it different: open-source code you control, local processing that does not depend on a vendor's servers, a contract with a maintenance clause, or simply the fact that you are already inside the organization and can iterate in real time.

---

## Lesson Nine: The Approval You Need Is Not Technical

Most technical people, when they hit a government wall, assume the problem is technical. If we just build a better system, the logic goes, people will adopt it.

This is wrong in government more often than it is right.

The approval you need is organizational. The question is not *"does this system work?"* The question is *"whose performance metrics does this system improve, and do they know it?"*

I built a biometric attendance system. The system I was actually building was a tool for market directors to document their staff performance. As long as paper sign-in books were the official record, market directors could not prove who was actually showing up. With a digital record, they could.

Once I framed it that way — not as a technology project, but as a performance documentation tool — the conversation changed completely.

---

## Lesson Ten: The Small Victory Is the Victory

You will not transform all 18 markets in one quarter. You will not replace all paper systems in one year. You will not change how the organization thinks about technology in one meeting.

You will install one device in one market. You will get one supervisor to check the dashboard every morning. You will get one director to forward an attendance report in a meeting where it previously would not have been mentioned.

That is the work.

The mistake is waiting for the big moment — the approval, the budget, the organization-wide rollout — before considering the work successful. The big moment will come, eventually, because of the accumulation of small moments that preceded it.

Every device you get working. Every supervisor who checks the report. Every conversation where someone says *"so the system shows who was late?"*

Those are the victories.

---

## What I Would Tell My Earlier Self

Build inside the organization, not outside it.

I spent the first six months building in isolation — assuming that if the system was good enough, the organization would adopt it. That is not how government works. The system has to be adopted before it is evaluated. You build a version that is good enough for one person to use, you put it in front of them, you fix what they break, and you build the next version together.

The second lesson: your most valuable skill is not your code. It is your ability to sit in a room full of people who are not sure they trust you, and make them feel like you are on their side. Because you are. You are not trying to replace their job. You are trying to make their job manageable.

The third lesson: document everything in writing. Every verbal commitment, every agreed next step, every decision made in a corridor meeting. Send the follow-up email. Keep the copy.

Because when the system fails — and it will fail — you want to be able to show exactly what was decided, by whom, and when.

Government work is not fast. It is not clean. And it is not about the technology.

It is about whether you can be trusted to show up tomorrow and finish what you started.

So show up.

---

*AMML is operational across 18 markets in the FCT. The attendance system processes biometric data from ZK devices, generates daily reports, and tracks late arrivals and absent staff. It is not perfect. It is in production.*