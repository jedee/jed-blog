---
title: "Building a Biometric Attendance System That Actually Works"
date: "2026-04-14"
description: "Integrating ZK biometric devices with a web app sounds like a hardware problem. It is actually a data mapping problem. Here is what I learned integrating Realand AL325 terminals."
tags: ["biometrics", "hardware", "typescript", "engineering"]
readTime: "15 min"
---

## The Meeting That Started Everything

It was the second meeting with the AMML IT team when the head of operations said it: *"We need to know who is actually showing up."*

Not who the attendance sheet says is showing up. Who is *actually* showing up.

This sounds simple. It isn't. The organization manages 18 markets across the FCT. Staff travel between markets. Market supervisors have no reliable way to verify which of their staff actually clocked in until the monthly reconciliation — by which point, the late arrivals have already been marked present.

The biometric system was supposed to solve this. The vendor who sold them the ZKeco AL325 terminals said it would solve this. The vendor was, technically, correct — the hardware was capable. What the vendor did not mention was that *capable* and *integrated* are very different things.

---

## The Hardware Reality

ZKeco makes solid biometric hardware. The AL325 is a reliable terminal — fingerprint recognition, card swipe, facial recognition, TCP/IP connectivity, WiFi on some models. It checks all the boxes.

What ZKeco does not provide, out of the box, is a usable attendance API.

The device stores attendance logs internally. You can:
- Export a CSV via USB stick (manually, per device)
- Pull logs via a proprietary DLL on Windows (requires their SDK)
- Query via a direct TCP connection using ZK's obscure binary protocol

There is no REST API. There is no cloud sync. There is no webhook.

Every vendor integration I've seen either:
1. Uses the Windows DLL and runs a Windows server
2. Builds a middleware that polls the device over the network
3. Has their own cloud platform that they white-label

For a government parastatal with no dedicated IT infrastructure and staff who had never seen a biometric device before, none of these options were going to work without significant custom development.

---

## The Architecture I Built

The system I designed has three layers:

**1. Device Layer** — Each market has an AL325. Staff clock in/out using fingerprint. The device stores logs internally.

**2. Import Layer** — The AMML dashboard has a per-device CSV import tool. Market supervisors export logs from the device (one button press, USB stick, 30 seconds) and upload them to the dashboard. No network configuration required.

**3. Dashboard Layer** — A React + TypeScript application that:
- Maps ZK device IDs to staff AMML IDs
- Imports attendance records with clock-in/out times
- Calculates late arrivals, absences, and total hours worked
- Generates market-level attendance reports

The CSV import approach was the right call for this context. Here's why:

```
Traditional approach:  Device → Real-time sync → Server → Dashboard
                      Problem: Requires network config, static IPs, port forwarding,
                      firewall exceptions, vendor middleware, someone who knows what TCP/IP means

What I built:         Device → USB Export → CSV Upload → Dashboard
                      Benefit: Works today. No network changes. Market supervisors can do it.
```

---

## The ID Mapping Problem

The single hardest part of the integration was not the CSV parsing. It was ID mapping.

ZK devices identify employees by a numeric ID set on the device — let's call it the *ZK ID*. AMML identifies employees by an AMML ID — `AMML-001`, `AMML-002`, etc.

These two IDs are almost never the same.

Staff are enrolled on the ZK device with their own internal numbering. The AMML system has its own numbering. Market supervisors, who enrolled staff on the devices, used their own judgment for the device IDs — sometimes matching AMML IDs, sometimes not.

So when the CSV comes in with a ZK ID of `17`, I need to know: is that AMML-017? Or is it the staff member who was enrolled 17th on this device, who might be AMML-023?

**The solution: a ZK-to-AMML mapping table.**

Every staff member who will clock on a device gets a mapping entry:
```
ZK ID: 17 → AMML ID: AMML-023 (Chidinma Ogunyemi, Wuse Market)
```

This mapping lives in the dashboard. When a CSV comes in, each row is looked up in the map. If it matches, the attendance record is created under the correct AMML ID. If it doesn't match, the row is flagged as unmapped and can be resolved manually.

The mapping table is the single most important piece of data in the entire system.

---

## What I Would Do Differently

**Enforce ID consistency from day one.** The best time to standardize ZK IDs and AMML IDs is before anyone touches the device. The second best time is now, while there are only 400 staff enrolled.

**Build the mapping import before the attendance import.** I built attendance first, then mapping. This meant early attendance records had incorrect IDs that I had to clean up retrospectively.

**Test with one market before rolling out.** I tested on Wuse Market with 15 staff. That test caught three major issues: a device firmware bug, a CSV export format difference between firmware versions, and a market supervisor who was entering staff on the device under different names than their official records. Finding those in production across all 18 markets would have been expensive.

---

## What Actually Works in Production

Six months after deployment:

- 14 of 18 markets are actively using the system
- 4 markets are using paper-based backup (the devices are there, supervisors need more training)
- Average daily attendance capture rate: 73% (up from ~40% with paper)
- Market directors are checking the dashboard before monthly reviews — not after

The number I care about most: market directors are *using* the data. That was always the point.

---

*AMML is live. Hardware questions or integration challenges? Reach out — I've worked with ZKeco devices more than I ever expected to.*