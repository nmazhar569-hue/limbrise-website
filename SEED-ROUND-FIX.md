# Seed Round Fix — exact drop-in

**Confirmed decision (2026-07-16):** LimbRise is raising a **$550K seed round, opening September 2027.**
Frame it as **"register interest," never "Now Open."** Apply to the repo that deploys **limbrise.com** (`LimbRise-Inc-Website`).

This file fixes all four problems the three AIs flagged: (1) inconsistent number, (2) $0 counters, (3) false "Now Open" framing, (4) a stale "past milestone" on the Journey page.

---

## The single source of truth (make everything match this, word-for-word)

| Field | Value |
|---|---|
| Amount | **$550K** (write it identically everywhere — `$550K`, not `$550,000` in one place and `$536K`/`$449K` in another) |
| Stage | **Seed round** |
| Status | **Opening September 2027** |
| Investor action | **Register interest** (join the investor list) — not "Invest" / "Now Open" |
| Interviews | **69** (see Tier B / B1 — also unify this: 69 everywhere, not 67 or 56) |

---

## Location-by-location changes

The three reviews reported the raise appearing in **three** places. Fix all three so they can never drift apart again.

### 1) Homepage — investor counter + copy
- **Counter:** currently animates from `$0K` → shows `$550K`/`$536K`. → Render **`$550K`** statically (see "The $0 counter fix" below). 
- **Label under it:** ~~"Seed Round — Now Open"~~ → **"Seed round — opening September 2027"**
- **Surrounding copy:** ~~"…closing its $550K seed round"~~ / ~~"Now Open"~~ → **"We're opening a $550K seed round in September 2027."**
- **Sonnet's extra note (C20):** the homepage currently duplicates the *entire* investor pitch. Tease it in ~2 lines and link to the Investors page instead of repeating it.

### 2) Investors page — hero stat card + CTA
- **Stat card:** ~~"$449K Seed Round — Now Open"~~ / ~~"$536K"~~ → **"$550K seed round · Opening September 2027"** (static render).
- **Heading:** **"Building toward our seed raise — September 2027."**
- **Body:** *"LimbRise is a medtech company developing RevoStep, a hands-free mobility device for knee recovery. We're opening a $550K seed round in September 2027 to fund engineering refinement, biomechanical validation, regulatory preparation, and manufacturing."*
- **CTA:** ~~"Invest" / "Accredited investors only"~~ → **"Register interest"** → an investor-list capture form (name, email, firm). See "CTA change" below.
- **Footnote:** *"Investor materials available to qualified investors on request."*
- **⚠️ Before this page publicly solicits, have securities counsel approve it** (P0.6 in the action plan). "Register interest" is lower-risk than an "Invest"/"accredited-only" solicitation, but still get sign-off.

### 3) Journey / milestones page — the stale "past milestone"
- Currently: **"Jun 2026 — Seed Round Opens — $550,000 — Scaling what we've proven."** This reads as *already done*.
- → Move it to the **future** section and relabel: **"Sept 2027 (planned) — Open $550K seed round — fund validation & regulatory milestones."**
- Also drop **"Scaling what we've proven"** (C16 — nothing clinical is proven yet) → **"Funding the next stage of engineering and validation."**

### 4) Interview count (fold in while you're here — B1)
Set **69** on the homepage, Journey, Why-RevoStep, **and** the Investors stat card. The Investors page currently shows 67/56 — that contradiction is as damaging as the dollar figure.

---

## The $0 counter fix (the mechanical bug)

**Root cause:** the count-up animation starts at `0`, and if JS doesn't run — static HTML, `prefers-reduced-motion`, slow devices, a crawler, an SSR snapshot — the visitor sees **`$0K` / `0 interviews`.** The rule: **the real number must already be in the HTML; the animation is decoration on top of it.**

**If the live site is plain HTML/JS** (the `legacy/` folder is), put the final value in the markup and animate *only* if motion is allowed:

```html
<!-- The real number is the text content. It shows even with zero JS. -->
<span class="counter" data-target="550" data-prefix="$" data-suffix="K">$550K</span>

<script>
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target;
    const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = prefix + target + suffix; return; } // leave the real value
    let start = null;
    const duration = 1200;
    function tick(t) {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      el.textContent = prefix + Math.round(p * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
</script>
```

**If the live site is React/Next** — initialize state to the final value (so SSR/first paint shows it), then animate on mount:

```jsx
function Counter({ target = 550, prefix = "$", suffix = "K", duration = 1200 }) {
  // First render (and SSR, and no-JS) shows the REAL number, never 0.
  const [value, setValue] = React.useState(target);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf, start = null;
    setValue(0); // only after mount, once we know JS + motion are on
    const tick = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <span>{prefix}{value}{suffix}</span>;
}
```

Key point in both: **default/initial = the real number; `0` is only ever set *after* confirming JS + motion.** A crawler or a reduced-motion user always sees `$550K`.

---

## CTA change — capture interest, don't transact

Replace the "Invest" / "Now Open" button with a **Register interest** action that collects the investor for 2027 instead of implying they can wire money today:

- Button: **"Register interest"** (or "Get on our investor list")
- Form fields: Name · Email · Firm/Fund (optional) · "Accredited investor? Y/N" (optional)
- Confirmation copy: *"Thanks — we'll be in touch as our September 2027 seed round approaches."*
- This also fixes Sonnet's point that warm interest currently hits a dead end.

---

## How to actually ship this (since I can't reach the private repo from here)

`LimbRise-Inc-Website` is private and this session has no GitHub auth, so I can't open a PR against it directly. Two ways forward:

1. **You apply it** — this file is a complete spec; the copy is final and the counter fix is ready to paste.
2. **I apply it** — open this project in an **interactive Claude Code session** and run `gh auth login` (or set `GH_TOKEN`). Then point me at the `LimbRise-Inc-Website` working copy and I'll make the edits + open a PR. If the live site isn't actually a GitHub repo (e.g. Framer/Webflow/Wix), tell me the platform and I'll give platform-specific steps.

**Also confirm:** is the plan for this `limbrise-website` rebuild to *replace* limbrise.com? If so, say the word and I'll build this corrected investor section natively into the rebuild too — then the fix lives in the codebase you're actually moving to.
