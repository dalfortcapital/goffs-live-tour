# Goff's Live Tour (demo)

A rep-driven, needs-based live product tour. The rep runs the tour from a presenter console; the customer joins on their own screen with a 6-character client code, and their screen follows every click in real time: slides, answers, product hotspots and photos.

**Live demo:** https://dalfortcapital.github.io/goffs-live-tour/

> Prototype built by DalFort Capital Partners for Goff's Performance Solutions. Product content is summarized from goffsenterprises.com and needs Goff's review before any customer sees it (see [Content to verify](#content-to-verify)).

## Try it in 60 seconds

1. Open the demo and click **I'm presenting**. You'll get a client code (e.g. `K7M4QX`).
2. Click **Open customer window** to try it alone. Or, on another computer or phone, go to the demo link, choose **I'm a customer** and enter the code. The **Invite customer** button also has a link and QR code.
3. Drive the tour. Answer the questions, tap the numbered hotspots, flip through photos. The customer's screen follows.

Presenter shortcuts: `←` `→` to move, `1`–`9` to pick an answer, hotspot or photo.

## What the tour does

| Stage | What happens |
|---|---|
| Intro | Personalized title slide (customer company, rep name), 30-second "who we are" |
| Needs | "What's the biggest problem?" branches to **doors**, **curtain walls** or **the dock**. Each branch asks four discovery questions (location, traffic, size, problems; or goal, layout, access, mounting; or trailers, priority, driver alignment, problems). |
| Picture this | A without/with comparison picked from what the customer said (e.g. forklift impacts vs. energy loss vs. pests) |
| Solution | A specific product recommendation with "why it fits" lines tied to their answers, add-ons to consider, a clickable product diagram and a photo gallery |
| Next steps | Quantity, install location, opening sizes, timing, installer, site survey; then role, timeline, sign-off, budget, follow-up |
| Summary | A recap on both screens. The rep can copy, download (CSV) or email the lead summary. |

Rep-side extras: a talk track for every slide, a live "captured so far" panel, a jump menu, and a toggle that lets the customer tap their own answers and fill in the scope from their screen.

## How it's built

Plain HTML, CSS and JavaScript (ES modules). No framework, no build step, no server. It's hosted free on GitHub Pages.

```
index.html          landing page
presenter.html      rep console
join.html           customer view
assets/js/tour.js   ALL content: questions, branching, products, hotspots, talk tracks, recommendation logic
assets/js/render.js draws a slide on a fixed 1280×720 canvas that scales to any screen (same layout on both sides)
assets/js/sync.js   keeps the screens in sync
assets/js/presenter.js / client.js   page logic
assets/img/*.svg    product diagrams used for the hotspots
```

**Sync.** The presenter owns the tour state and sends the whole thing (a few KB of JSON) on every change; the customer just renders the latest state. Two transports run side by side:

- **Across devices:** WebRTC data channels via [PeerJS](https://peerjs.com/). PeerJS's free public broker only introduces the two browsers; data then flows browser-to-browser, falling back to PeerJS's public TURN relay when a direct path is blocked.
- **Same browser** (two windows): `BroadcastChannel`, which needs no network at all. This is what "Open customer window" uses.

Reconnects are automatic on both sides, and a presenter refresh keeps the same code and answers. Add `&via=direct` to a join link to force the cross-device path when testing on one machine.

**Editing content.** Everything a customer sees is in `assets/js/tour.js`. Adding a question is a few lines; adding a product means adding it to `PRODUCTS` and to the branch's recommendation function.

## What a production version would add

This demo proves the experience. A version Goff's reps use with real customers would need:

- **A real-time server you control** instead of the public PeerJS broker: a small Node/Socket.io or WebSocket service, or a managed service (Ably, Pusher, Supabase Realtime). The interface in `sync.js` is the only part that changes.
- **Rep logins and expiring client codes** (e.g., Microsoft 365 single sign-on for reps).
- **A content editor** so marketing can add products, photos, videos and questions without a developer.
- **CRM hand-off.** Post the lead summary straight to the CRM instead of copy/download.
- **Video slides** with synced play/pause, and photos hosted with the app rather than loaded from goffsenterprises.com.
- **Analytics:** which branches get used, where tours stop, time per slide.
- **Hosting** on a Goff's subdomain, plus accessibility and cross-browser QA.

## Content to verify

Product facts come from goffsenterprises.com (November 2026). Before customer use, Goff's should confirm:

- **About slide:** "Since 1987" (the About page also says 1985), "67,000 sq ft", "4 weeks or less" to ship.
- **Specs** for Clean Guard, Harsh Guard, G1 and Model 2000 come from summary-level copy only. Cyclone warranty terms are deliberately left out because the site's copy conflicts.
- **The 45-day Cyclone trial** is offered as an add-on for Cyclone recommendations.
- **Some hotspot wording is inferred** from product names (e.g., what wear pleats and trailer restraints do).
- **"Picture this" slides** are generic scenarios, not customer case studies.
- **Recommendation logic** in `tour.js` is a first pass and should be tuned by Goff's sales team.
- **Photos load from goffsenterprises.com.** If those URLs change, a placeholder shows instead.

## Running locally

Any static file server works, for example:

```bash
npx serve .
```

or `python -m http.server`. Opening the HTML files directly from disk won't work, because browsers block ES modules on `file://`.
