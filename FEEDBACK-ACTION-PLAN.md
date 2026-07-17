# LimbRise Website — Feedback Action Plan

**Source:** Combined feedback from **ChatGPT**, **Perplexity**, and **Claude Sonnet** (the "Untitled document.pdf" analysis).
**Compiled:** 2026-07-16.
**How to read this:** Every item is tagged with which AI platforms raised it. More platforms = higher confidence it's a real problem. Work top-down: **Priority 0 → Tier A → Tier B → Tier C.**

Legend: 🟢 **ChatGPT** · 🔵 **Perplexity** · 🟣 **Sonnet** · ✅ = all three agree

---

## ⚠️ READ FIRST — Which website is this?

There are **two different codebases** and it matters a lot:

| | What it is | Has the seed-round content? |
|---|---|---|
| **Live site — limbrise.com** | The fully-built site all three AIs reviewed (nav: About · RevoStep · Reebound · Investors · Contact). | **YES** — `$550K seed round – Now Open`, `69 interviews`, investor page, clinical claims. |
| **This repo — `limbrise-website`** | A clean-slate **rebuild** (Next.js). Homepage + placeholder `/about`, `/revostep`, `/reebound` "coming soon" pages. | **NO** — none of it exists here yet. |

**Consequence:** Most items below describe problems on the **live site**. They are fixed in one of two ways:
1. **Edit the live site's code** (the repo that actually deploys limbrise.com — likely the private `LimbRise-Inc-Website`), **or**
2. **Build these pages correctly the first time** in this rebuild as it grows, using this document as the spec.

**The rebuild is your single biggest opportunity:** almost every issue below can be *designed out* instead of *patched*.

---

## 🔴 PRIORITY 0 — The Seed Round / Funding (your #1 fix)

This is the single most damaging area for investor credibility, and all three platforms hit it. There are **four separate problems** bundled together:

### P0.1 — The dollar figure is inconsistent across pages ✅ (🟢🔵🟣)
The raise shows up as **different numbers on different pages**:
- Homepage: **$550K** — 🟢🔵🟣
- Investor page counter: **$536K** (🟢) / **$449K** (🔵) — the AIs even saw *different* second numbers, which proves how unstable it is
- Surrounding copy: **$550K**
- Internal planning referenced: **~$500K pre-seed**

> To an investor who opens two tabs, two different raise amounts on one site is an instant "these people don't have their story straight" — the fastest way to lose a term sheet before a meeting. **Fix: one board-approved number, everywhere** (site + deck + business plan + cap table + outreach).

### P0.2 — The animated counters render **$0** on load ✅ (🟢🔵🟣)
The count-up animation starts at `0`, so on a static load, no-JS, reduced-motion, slow devices, or to a search-engine crawler, the page literally reads **"$0K raised, 0 interviews, 0 products."** That reads as *zero traction*.

> **Fix: hard-code the real numbers as the rendered value.** The animation should count *to* a number that is already in the HTML — never *from* zero with no fallback. This is a mechanical bug, not a copy choice.

### P0.3 — "Now Open" is not true — the raise is **September 2027** 🟣 (Sonnet only — but it's the deepest issue)
The site says the round is **"Now Open"** and actively soliciting. Per your own clarification, you are **not raising until ~September 2027** — a ~14-month gap between what the site claims and what's true. This is worse than a typo:
- Anyone who reaches out to invest *now* hits a dead end (you waste warm interest you'd want to bank for 2027).
- A round that's been "open" for 14+ months looks **stale and unfilled** by the time you actually raise.

> **Fix: reframe from transacting to capturing interest.** e.g. *"Building toward our seed raise — Q3 2027"* or *"Raising our seed round in September 2027."* Change the CTA from **"Invest" → "Register interest" / "Get on our investor list."**

### P0.4 — "Pre-seed" vs "Seed" stage is unresolved (🟢🟣)
🟢 says your actual stage is **pre-seed**; the site says **"Seed Round."** 🟣 asks whether Sept 2027 is a *seed* round while earlier materials referenced a **$550K pre-seed** — i.e. is there a **pre-seed now and a seed later**, or one round? This must be settled so the site, deck, and cap table all name the **same round**.

### P0.5 — Third location: the Journey page shows it as a *past* milestone 🟣
The Journey timeline reads **"Jun 2026 — Seed Round Opens — $550,000 — Scaling what we've proven"** — phrased as a *completed* milestone in a checklist of things already done. Same Sept-2027 correction needed here (this is the *third* place the raise appears, after homepage and Investors).

### P0.6 — Legal: don't publicly solicit without securities counsel 🟢
The page says **"Accredited investors only."** Not necessarily false, but 🟢 warns: **do not casually solicit investment on a Canadian company's public page** — the applicable exemptions depend on jurisdiction/offering. **Have securities counsel approve the investor page before it publicly solicits.**

### P0.7 — "Use of funds" categories should map to real milestones 🟢
Replace vague buckets with milestone-tied ones: (1) RevoStep engineering & prototype completion, (2) bench & biomechanical validation, (3) regulatory & quality-system prep, (4) manufacturing & DFM, (5) focused LimbRise Recovery MVP *only if separately budgeted*. **Do not promise "first paying Reebound customers."**

### ✅ DECISIONS (confirmed 2026-07-16)
| Question | Decision |
|---|---|
| Amount + stage | **$550K seed round** |
| Timing / framing | **Opening September 2027** — "register interest," not "Now Open" |
| Where to apply | **The live-site repo** (`LimbRise-Inc-Website`) |

> **The full, exact drop-in (every location + the counter fix + the CTA change) is in [`SEED-ROUND-FIX.md`](SEED-ROUND-FIX.md).**

### Corrected investor block — final copy
> ```
> Eyebrow:   For Investors
> Heading:   Building toward our seed raise — September 2027
> Amount:    $550K seed round        ← rendered statically in the HTML, never animates from $0
> Body:      LimbRise is a medtech company developing RevoStep, a hands-free mobility
>            device for knee recovery. We're opening a $550K seed round in September 2027
>            to fund engineering refinement, biomechanical validation, regulatory
>            preparation, and manufacturing.
> CTA:       Register interest  →  (adds them to the investor list; NOT "Invest now")
> Footnote:  Investor materials available to qualified investors on request.
>            [Have securities counsel approve this page before it publicly solicits — see P0.6]
> ```

---

## 🟢🔵🟣 TIER A — Flagged by ALL THREE platforms (do these first)

- [ ] **A1. Fix the funding number + $0 counters + framing** — see Priority 0 above. ✅
- [ ] **A2. Kill the generic tagline "…here to help you write the next chapter."** The opening line above it ("The hardest part of recovery isn't the injury. It's everything that comes after.") is genuinely great — keep it. But "write the next chapter" is worn-out health-marketing filler. Replace with something concrete: *"69 people told us what recovery actually costs them. We built the answer."* ✅
- [ ] **A3. Remove "We are innovating for a better tomorrow."** It's empty filler **and** it repeats the line right before it ("…innovate for tomorrow") — reads like a skipped edit pass. Cut it; the paragraph it anchors stands on its own. ✅
- [ ] **A4. Fix the Reebound page / nav treatment.** All three flag it, three ways: 🟢 *remove it as an equal public product / redirect to "LimbRise Recovery — in development"*; 🟣 *it's a primary-nav item leading to one "coming soon" sentence — the single most un-Apple thing on the site; pull it from nav or ship a real minimal page*; 🔵 *the screenshots look like a fitness app, not clinical recovery software — clarify it's the monitoring layer, not a workout tracker.* **Decision needed: retire Reebound from primary nav, or ship a real minimal page.** ✅
- [ ] **A5. Rebuild navigation.** All three say the nav is wrong, converging on **audience-first**: 🟢 & 🟣 → route by **Patients / Clinicians / Investors**; 🔵 → at minimum add descriptors ("RevoStep — The Device") and stop making brand names carry the nav. Add **one persistent, visually-distinct CTA button** ("Partner with LimbRise") present identically on every page. ✅
- [ ] **A6. Segment the Contact flow.** One form for investors + clinicians + patients + press feels like nobody's home. Add an **"I'm a…" dropdown** (Patient / Clinician / Investor / Press) and route investor-deck requests to their own intake. ✅
- [ ] **A7. Don't call anything "clinic-ready."** The product/dev section says "From concept to clinic-ready," but the clinical trial is still ~2027. All three warn against "clinic-ready" / "ready to scale." Use *"Where we are. Where we're going."* and present stages as a **roadmap, not an arrival**. ✅

---

## 🟢🔵 / 🟢🟣 / 🔵🟣 TIER B — Flagged by TWO platforms

### Accuracy / claims
- [ ] **B1. Interview count contradiction** (🟢🔵). Homepage/Journey say **69**; investor page shows **67** (🟢) or **56** (🔵). Pick **69** and make it identical everywhere. Add an "as of [date]."
- [ ] **B2. "REB Approved" while "in process"** (🟢🔵). These contradict — you can't be approved and in-process. Written REB approval is required *before* human research begins. Use **"REB application in process / submission underway."**
- [ ] **B3. "Protocol Compliance — High" for RevoStep** (🟢🔵). Listed as "High" with **no trial run yet**. Change to **"Projected"** or remove until data exists.
- [ ] **B4. "Heal faster"** (🟢🔵). A direct medical-efficacy claim with no clinical data — regulatory risk. **Delete**, or soften to *"…without the setbacks that slow recovery down."*
- [ ] **B5. "HIPAA-ready"** (🟢🔵). HIPAA is US law; you launch first into Canada (PIPEDA / PHIPA). Claiming HIPAA-readiness signals you don't know your own regulatory environment — and using Google Cloud doesn't make an app HIPAA-ready. Replace with **PIPEDA/PHIPA** language (or remove).
- [ ] **B6. "Clinically Partnered" / "every product validated with clinicians"** (🟢🔵). Overstates breadth — you have advisors, not a validated clinical program. Use **"Developed with clinical and research input"** and name Dr. McGibbon specifically.
- [ ] **B7. "Post-operative atrophy: significantly reduced"** (🟢🔵). "Significantly" implies statistical significance from a study that hasn't run. Change to **"expected to be reduced"** / "hip stabilizers remain active."
- [ ] **B8. Reebound "Corporate Wellness" audience** (🟢🔵). A different market with no traction/pathway — creates focus confusion at seed stage. **Remove** or move to a clearly-labelled "future vision."
- [ ] **B9. Reebound reads as a fitness app, not clinical software** (🔵🟣). "Train smarter. Recover better." is athletic-performance language. Reframe for post-surgical/physio patients: *"Your physiotherapist sees you twice a week. Reebound is with you every day in between."* Surface the **Composite Recovery Index (CRI)** — it's the real B2B differentiator and it's buried.
- [ ] **B10. "Harvard Medical School affiliated" (Dr. McGibbon)** (🟢🔵). Implies a *current* Harvard affiliation; he was a Harvard postdoc **1994–1996**. Use: *"Professor, University of New Brunswick; rehabilitation biomechanics researcher and former Harvard Medical School postdoctoral fellow."* Don't imply the UNB lab is Harvard-affiliated.

### Team / trust
- [ ] **B11. Three advisors, identical "Clinical Advisor" title + identical "DC" placeholder avatars** (🟢🟣). Three identical grey initials next to three different people reads as a bug. **Add real headshots** and **differentiate roles** (McGibbon → clinical validation; Cowper-Smith → commercial strategy; Barden → regulatory/IP & trial design). Surface **Cowper-Smith's two medical-device exits** — for investors that's a far stronger signal than "clinical oversight," and it's currently invisible.
- [ ] **B12. Noor's "certifications from Stanford and Harvard" are vague** (🟢🟣). Name them exactly (e.g. *Stanford AI Graduate Certificate; Harvard Business School Online Entrepreneurship certificate*) — specific and checkable lands harder, and vague university names can imply degrees you don't hold.
- [ ] **B13. "Terms" link goes to the homepage** (🟢🟣). A dead legal link looks worse than none — especially on a site soliciting investors. Build a real Terms page or remove the link.

### Marketing / structure
- [ ] **B14. Homepage delays "what does LimbRise actually make?"** (🟢🟣). The emotional open is good but a visitor should know within ~5–10s that RevoStep is a hands-free mobility device for knee recovery, that a prototype exists, and that validation is the priority. Put the product answer up front.
- [ ] **B15. "One problem. Two answers. One ecosystem" / "ecosystem" jargon** (🟢🔵). Overstates a two-equal-product portfolio and is introduced before either product is explained. Replace with **"Mobility first. Recovery intelligence next."** — RevoStep is the beachhead; software/sensing are supporting/future layers.
- [ ] **B16. Patient testimonials: two both labelled "Crutch User," presented as verbatim** (🟢🟣). Identical anonymous labels read as one reused voice. Either use authentic, documented, permissioned quotes (with a first name + injury type, e.g. "Sam, ACL tear"), or reframe as *"Common themes across 69 interviews…"* — synthesized quotes can't be shown as direct quotations.
- [ ] **B17. Rename pages to be evidence-led, not marketing-led** (🟢🟣). "Product Breakdown" → **RevoStep**; "Why RevoStep" → **The Clinical Case** (its own H1 already says this) or **Validation**; "Future Plans" → **Roadmap**; "Contact Us" → **Partner with LimbRise**.
- [ ] **B18. Replace generic "Learn more" CTAs** (🟢🟣). Every button should say what happens: *Explore RevoStep · View validation · Request investor materials · Discuss clinical collaboration.*
- [ ] **B19. Label concept renders as "concept."** (🟢🟣). CAD images and the "Prototype 2 / next-gen" visuals must be labelled *"concept design / next-generation design in development"* so they're not mistaken for a shipped product. The homepage Reebound UI mockup especially — it looks finished but links to an empty page.
- [ ] **B20. Prototype naming is inconsistent** (🟢🔵🟣 — see also A). "Prototype 1/2" in one section, "V1A / V1B" in another, on the same scroll. Pick **one taxonomy sitewide.** *(Borderline all-three; keep the single-taxonomy fix regardless.)*

---

## 🟢 / 🔵 / 🟣 TIER C — Flagged by ONE platform (lower consensus, still worth doing)

### 🟢 ChatGPT only — mostly regulatory/factual rigor
- [ ] **C1. "Why RevoStep" clinical page is scientifically indefensible — take it offline until rewritten.** It states unproven outcomes as fact (prevents contracture, maintains pelvic symmetry, prevents Trendelenburg gait, "47% quit," "1 in 3 secondary injury," "crutch users cannot safely cross a street," fall-risk low, etc.). Canadian law requires an "adequate and proper test" *before* a performance claim. Rebuild it as a **Validation Program** separating: known crutch research (cited) · hypotheses · internally tested · still to validate · future studies.
- [ ] **C2. Remove "Health Canada clearance / cleared / regulatory clearance."** Class I devices don't get a device-specific licence; an MDEL is an *establishment* licence, not approval of safety/efficacy. Use: *"developing regulatory and quality documentation for an anticipated Class I pathway, subject to final classification."*
- [ ] **C3. "0.98 m/s — nearly double crutch speed" — remove from homepage** until you can disclose sample size, injured vs healthy tester, device version, protocol, trials, stats. *(Note the platform conflict — see below.)*
- [ ] **C4. "Bypasses the injury site entirely" is biomechanically false.** Joint-reaction/muscle forces can remain even with external offloading. Use *"intended to reduce selected loads on the injured limb per the prescribed protocol."*
- [ ] **C5. "Field-tested."** First prototype had engineering demonstrations, not formal field testing. Use *"early functional prototype demonstrated under controlled engineering conditions."*
- [ ] **C6. "No hardware" → "No implantation required."** RevoStep *is* hardware.
- [ ] **C7. Patent claims: national filings vs PCT.** Site says separate CA/US/EU/JP filings; internal docs say **PCT**. A PCT app isn't national-phase entry. Use *"International patent application filed under the PCT. Patent pending."*
- [ ] **C8. "First perfect score in competition history" / "global recognition."** Keep only if the organizer documented it; otherwise *"First place, Atlantic Engineering Competition 2026."* Hult = "Canadian National finalist" (don't overstate to "global").
- [ ] **C9. Mitacs/UNB "Partnership secured" / "clinical validation begins."** Only if formally approved, executed, funded, and Dr. McGibbon/UNB approved the wording. Otherwise *"research collaboration and Mitacs funding proposal in development."*
- [ ] **C10. Funding pipeline mixes non-equivalent items** (prizes, grant applications, a Futurpreneur loan, SR&ED, IRAP potential). Split into: **Secured/received · Awarded, pending · Applications submitted · Planned/eligible.** Don't lump debt + tax credits into "non-dilutive pipeline." SR&ED is retrospective, not upfront cash.
- [ ] **C11. "$34B market" is unsourced.** Replace a broad global rehab TAM with a **bottom-up** number (knee cases → NWB/PWB cases → Canadian DME/clinic/WCB channels → eligible users → price per episode).
- [ ] **C12. "Market validation" overstates 69 interviews.** Interviews prove a *problem*, not willingness-to-pay/reimbursement/PMF. Call it **"Problem discovery informed by 69 patient interviews."**
- [ ] **C13. Privacy/legal contradictions.** Product page says Vertex AI/Gemini; privacy policy says Anthropic — list the real processors. "Health data never shared with third parties" contradicts using Google Cloud/Firebase/an AI provider. Remove "HIPAA-ready" (see B5). Fix the PIPEDA 30-day-deletion misstatement. **Create a general website privacy policy** (the contact form currently points to the app's Reebound policy).
- [ ] **C14. Replace `limbrise.team@gmail.com` with a domain address** (e.g. `hello@limbrise.com`). *(Note: this Gmail is **also present in the current rebuild** — homepage + RevoStep page — so it's fixable here right now.)*
- [ ] **C15. "16-month roadmap" doesn't match the displayed Jul 2026–Aug 2027 span.** Reconcile the $344K projected spend and $120K grant-eligible figures with the raise. Label every milestone: Target / Planned / Application submitted / Agreement in development / Confirmed / Completed.
- [ ] **C16. "We've built the products. Now we're scaling."** False for the stage — you have a prototype + software work, not validated commercial products. *"A functional prototype is built. This round funds the engineering and evidence for the next stage."*
- [ ] **C17. Name consistency: "Briana" vs "Brianna" Lawton; inconsistent/inflated titles.** *(The rebuild already uses "Brianna Lawton" consistently — verify the live site matches.)* Distinguish employees / contractors / volunteers / interns / advisors / board; don't present students at executive level without qualification.

### 🔵 Perplexity only
- [ ] **C18. Clinical-trial dates contradict:** "underway at UNB CARE Lab, Q4 2026" vs "20-subject trial planned Q2 2027." Pick one (Q4 2026 is likely premature with REB in process).
- [ ] **C19. Feature the 0.98 m/s stat as a standalone stat block** — Perplexity's view is it's your strongest number and it's buried. **⚠️ This directly conflicts with ChatGPT (C3), which says remove it.** See conflicts below.

### 🟣 Sonnet only — structure & craft
- [ ] **C20. Homepage duplicates the entire investor pitch verbatim** (same $0K, same copy, same CTA as /investors). A visitor reads the full pitch twice. **Tease in two lines, link to the dedicated page.**
- [ ] **C21. Ration the "X is not Y, it is Z" rhetorical device.** Used 3× on the clinical page ("not an opinion, it's what the data shows," "not a better crutch, a replacement," "not a worst-case, the standard outcome"). Powerful once, diminishing after. One per page.
- [ ] **C22. Move Dr. McGibbon's named quote to the top of the claims section**, not the bottom — an expert quote gives the reader permission to believe what follows.
- [ ] **C23. Journey page: milestone cards flatten weight-classes.** "1st place, Canadian Engineering Nationals" looks identical to a minor participation credit. Visually rank major validation events above minor ones.
- [ ] **C24. Journey timeline: inconsistent date granularity** ("2025" / "Early 2026" / "Feb 2026" / "Now") and **"Now" used as a literal date** — which silently goes stale. Use real dates.
- [ ] **C25. Founder bios lead with hometown/hobbies before credentials.** Warm, but an investor wants the credential first. Reorder.
- [ ] **C26. Voice is inconsistent sitewide** — homepage punchy, Team warm, Future Plans dry. Establish one voice that flexes, not three briefs.
- [ ] **C27. The "Back" link has no destination cue** (back to section menu? home?). Make it explicit on every subpage.

---

## ⚔️ Where the platforms DISAGREE (you decide)

- **The 0.98 m/s speed stat.** 🟢 says **remove it** from the homepage (not a generalizable clinical result without protocol disclosure). 🔵 says **feature it more prominently** (your strongest proof point). 🟣 splits the difference: **keep it but add the method** ("measured over a 10-metre timed walk test, mean across N trials"). → **Recommended: Sonnet's path** — keep it *only* with the methodology stated; if you can't state the method yet, follow ChatGPT and pull it until you can.
- **"Prototype 2 – The Redesign" framing.** 🔵 warns the "prototype" label undermines investor confidence and suggests "Next Generation: V2." 🟢/🟣 want honesty that it's a concept/not-yet-built. → **Recommended: honest + confident** — "Next-generation design in development," clearly labelled, led by the improvement (25 lb → under 8 lb), never implying it's shipped.

---

## 🧭 The one theme all three converge on

> The design isn't the problem. The **copy is written as if LimbRise is ~18–24 months more advanced than it is** — claiming proven clinical outcomes, secured approvals/partnerships, two finished products, and a validated AI platform, while the details contradict each other.

The fix is the same everywhere: **remove unsupported certainty, replace with precise, dated, evidence-backed statements.** Make it a **RevoStep-first** company (one memorable sentence in 5 seconds), not a broad "recovery ecosystem." Adopt a **claims ladder**:

| Evidence stage | Allowed language |
|---|---|
| Concept | "We are exploring…" |
| Engineering objective | "Designed to… / Intended to…" |
| Internal evaluation | "In preliminary internal testing…" |
| Controlled validation | "A controlled study found…" |
| Regulatory/commercial | "Authorized for… / Available in…" |

---

## 🔧 What applies to THIS rebuild right now

Most items above are about the live site, but a few already exist in this repo and can be fixed immediately:
- **C14 — Gmail address** (`limbrise.team@gmail.com`) appears on the homepage and RevoStep page → swap for a domain address.
- **Mission copy** — "consistently superior outcomes" uses an unsupported superlative ("superior") and an efficacy claim → soften.
- **RevoStep card copy** — "reduce atrophy… move naturally while healing" echoes the exact unproven claims flagged in B4/B7 → soften to "designed to…".
- **"Backed by & partnered with" + 10 partner logos** — make sure every logo represents a real, agreed relationship (C9 territory).
- **Footer** — no Privacy/Terms links yet → add real ones as those pages get built (B13/C13).
- **Already good in the rebuild:** consistent "Brianna" spelling, simpler nav, no $0 counters, honest "under construction" pages.

---

## ✅ Recommended build order for the rebuild

1. **Investor section — corrected** (Priority 0): one number, static render, "register interest / Sept 2027," counsel-reviewed. *(Blocked on your answers.)*
2. **Audience-first nav + one persistent CTA** (A5) with a segmented contact flow (A6).
3. **Homepage**: product-forward hero (B14), kill filler taglines (A2/A3), "Mobility first, recovery intelligence next" (B15).
4. **RevoStep page**: claims-ladder copy, concept labels (B19), one prototype taxonomy (B20), no "clinic-ready" (A7).
5. **Validation page** (rename from "Why RevoStep", C1): the restraint *is* the credibility.
6. **Team**: real advisor headshots + differentiated roles (B11), specific certs (B12).
7. **Reebound decision** (A4): retire from nav or ship a real minimal page.
8. **Legal**: real Privacy + Terms, domain email (C13/C14/B13).

*The standard to test every page against:* **within 10 seconds, can a new visitor say what RevoStep is, who it's for, why it matters, what stage it's at, and what to do next?**
