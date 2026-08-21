# DriveOS Landing Page — Master Prompt

## CONTEXT

I already have a **DriveOS automotive intelligence dashboard** based on the existing DriveOS PRD. The dashboard is the authenticated product experience.

I now need you to design and build the **public-facing DriveOS landing page** that users see **before entering the dashboard**.

This is **not** a redesign of the existing dashboard.

The landing page must function as the marketing, product-introduction, and conversion layer of DriveOS.

### Primary user flow

```text
Visitor opens DriveOS website
        ↓
Visitor lands on public Landing Page
        ↓
Visitor explores product and features
        ↓
Click "Login"
        ↓
Navigate to DriveOS Login page
        ↓
Successful login
        ↓
Enter existing DriveOS Dashboard

OR

Visitor opens DriveOS website
        ↓
Visitor lands on public Landing Page
        ↓
Click "Sign Up" / "Get Started"
        ↓
Navigate to DriveOS Sign Up page
        ↓
Create account / complete onboarding
        ↓
Enter DriveOS Dashboard
```

---

# YOUR ROLE

Act as a:

- Senior Product Designer
- Senior UI/UX Designer
- Senior SaaS Landing Page Designer
- Senior Brand Designer
- Frontend UX Architect

Your task is to create a complete, premium, cohesive landing page experience for **DriveOS**.

Before designing or coding, carefully understand the existing DriveOS dashboard and maintain visual consistency with it.

---

# IMPORTANT PRODUCT CONTEXT

DriveOS is an intelligent operating system for modern automotive businesses.

It brings multiple automotive business operations into one connected platform, including:

- Executive Overview
- Sales Intelligence
- Vehicle Inventory Management
- Premium Vehicle Gallery
- Vehicle Detail / 360° Experience
- Customer Analytics
- Service Management
- Financial Dashboard
- Brand Performance Comparison
- Fleet Monitoring
- Live Delivery Tracking
- Notifications
- Reports
- Smart Search
- AI Insights
- AI Assistant
- User and Role Management
- Multi-branch operations

The product should feel like a **premium automotive SaaS platform**, not a generic car dealership website.

---

# CORE BRAND POSITIONING

DriveOS should communicate:

> One intelligent operating system for modern automotive businesses.

Alternative messaging themes:

- Run your automotive business from one intelligent system.
- See more. Move faster. Drive smarter.
- Sales, inventory, operations, and intelligence — connected.
- From vehicles to business decisions, everything moves through DriveOS.

The visitor should understand within the first few seconds that DriveOS is:

1. An automotive business platform.
2. Built for operational teams and decision-makers.
3. More than a dashboard.
4. A connected operating system.
5. Powered by data and intelligent insights.

---

# DESIGN DIRECTION

The visual direction must be:

- Premium
- Sophisticated
- Modern
- Automotive
- Intelligent
- Minimal
- High-end SaaS
- Apple-inspired in clarity and polish
- Confident, not flashy
- Clean, not empty
- Futuristic, but believable

## Avoid

Do NOT create:

- A generic car rental website.
- A car marketplace.
- A dealership vehicle catalog as the main landing page.
- An overly futuristic cyberpunk interface.
- Excessive gradients.
- Excessive glassmorphism.
- Random floating cards everywhere.
- A template-like SaaS landing page.
- Too much text.
- Excessive animations.
- Fake statistics or fake customer logos.

The landing page must feel like the public extension of the existing DriveOS product.

---

# EXISTING DASHBOARD CONSISTENCY

Before creating the landing page:

1. Inspect the existing dashboard structure.
2. Reuse the existing visual language wherever appropriate.
3. Preserve the same:
   - color palette
   - typography philosophy
   - border radius
   - spacing system
   - button style
   - icon style
   - shadows
   - cards
   - navigation behavior
   - dark/light theme logic
4. Reuse existing design tokens and components when possible.
5. Do not create an unrelated brand identity.

The landing page should make users feel:

> "This clearly belongs to the same product as the dashboard."

---

# LANDING PAGE STRUCTURE

Create the page with the following information architecture.

---

## SECTION 1 — NAVIGATION

Create a premium, minimal sticky navigation.

### Left

DriveOS logo.

### Center navigation

- Product
- Solutions
- Intelligence
- Security
- Resources

The navigation can use dropdowns where useful, but do not overcomplicate it.

### Right

Secondary action:

`Log in`

Primary action:

`Sign up`

Optional alternative primary CTA:

`Get started`

### REQUIRED BEHAVIOR

When the user clicks:

- `Log in` → navigate to `/login`
- `Sign up` or `Get started` → navigate to `/signup`

Do not leave these as non-functional buttons.

Navigation should transition elegantly when scrolling:

- Hero top: transparent or subtle
- After scrolling: solid/blurred surface with clear separation

---

## SECTION 2 — HERO

This is the most important section.

### Eyebrow

Optional:

`THE INTELLIGENT OPERATING SYSTEM FOR AUTOMOTIVE BUSINESS`

### Main headline

Use a strong headline such as:

> Run your automotive business from one intelligent system.

Alternative:

> See more. Move faster. Drive smarter.

### Supporting copy

Explain that DriveOS connects sales, inventory, customers, operations, and intelligence in one platform.

Keep it concise and premium.

### CTA group

Primary:

`Get started`

Secondary:

`Explore platform`

Behavior:

- Get started → `/signup`
- Explore platform → smooth scroll to product/platform section

### Hero visual

Display a realistic preview of the existing DriveOS dashboard.

The dashboard preview should feel like real product proof.

Highlight useful information such as:

- Revenue
- Unit Sold
- Inventory
- Sales performance
- Branch performance
- AI insight

Do NOT invent an entirely different dashboard.

Use the existing dashboard visual system as much as possible.

### Optional subtle floating insights

Examples:

- Revenue trend
- Low inventory alert
- AI insight
- Sales growth

Keep them subtle.

---

## SECTION 3 — THE PROBLEM

Headline:

> Your business shouldn't run on disconnected tools.

Show the contrast between fragmented operations and DriveOS.

### Fragmented side

Examples:

- Spreadsheets for inventory
- Separate tools for sales
- Manual reporting
- Scattered customer information
- Delayed operational visibility

### Connected side

With DriveOS:

- One connected platform
- Shared source of truth
- Cross-team visibility
- Centralized operations
- Actionable intelligence

The design should visually communicate transformation from:

`Disconnected → Connected`

---

## SECTION 4 — PLATFORM OVERVIEW

Headline:

> One platform. Every moving part.

Show DriveOS as a connected ecosystem.

Use a premium bento grid or structured modular layout.

Core modules to feature:

### Sales Intelligence
Manage leads, pipelines, follow-ups, and sales performance.

### Vehicle Inventory
Track vehicles, availability, inventory levels, and operational status.

### Customer Analytics
Understand customer relationships and behavior.

### Financial Intelligence
Monitor revenue, expenses, margins, and performance.

### Service Operations
Manage service activity and operational workflows.

### Fleet & Delivery
Monitor operational movement and delivery progress.

Do not overcrowd this section.

Use progressive disclosure if necessary.

---

## SECTION 5 — EXECUTIVE VISIBILITY

Headline:

> Your entire business. At a glance.

Feature a large DriveOS dashboard preview.

Explain that leaders can monitor:

- Revenue
- Unit sales
- Profit
- Inventory
- Customer satisfaction
- Branch performance

CTA:

`Explore the platform`

This CTA can scroll to additional product details or navigate to a future product page.

---

## SECTION 6 — SALES & INVENTORY

Create a visually strong product showcase.

### Sales

Headline:

> Turn every lead into the next opportunity.

Highlight:

- Sales pipeline
- Lead stages
- Follow-up reminders
- Conversion visibility
- Sales activity

### Inventory

Headline:

> Know every vehicle. Everywhere.

Highlight:

- Vehicle availability
- Inventory status
- Branch visibility
- Reservations
- Vehicle information

Use existing dashboard UI patterns wherever possible.

---

## SECTION 7 — PREMIUM VEHICLE EXPERIENCE

This section should introduce the vehicle-focused nature of DriveOS.

Headline:

> See every vehicle from every angle.

Feature:

- Premium vehicle gallery
- Vehicle details
- Interactive 360° experience
- Specifications
- Availability

The visual can be cinematic, but should still feel like a business product rather than a consumer car advertisement.

---

## SECTION 8 — DRIVEOS INTELLIGENCE

This is one of the key differentiators.

### Eyebrow

`DRIVEOS INTELLIGENCE`

### Headline

> Your data knows more. Now you can ask it.

Introduce:

#### AI Insights

Examples:

- Demand trends
- Inventory anomalies
- Performance changes
- Operational alerts

#### AI Assistant

Natural-language questions about business data.

Example interaction:

User:

> Which vehicles need attention today?

DriveOS:

> Several vehicles require attention based on inventory levels, reservations, and recent sales activity.

Do not claim AI can autonomously approve financial actions.

The AI experience should communicate:

- Grounded insights
- Real business data
- Explainable information
- Controlled actions

---

## SECTION 9 — MULTI-BRANCH OPERATIONS

Headline:

> From one showroom to an entire automotive group.

Show hierarchy:

```text
DriveOS
   ↓
Automotive Group / Tenant
   ↓
Branch A   Branch B   Branch C
   ↓
Teams, users, and operations
```

Highlight:

- Centralized visibility
- Branch-level operations
- Role-based access
- Scalable structure
- Secure separation of business data

---

## SECTION 10 — ROLE-BASED EXPERIENCE

Headline:

> One system. Built for every team.

Use tabs or an interactive selector.

Suggested roles:

- Dealer Owner
- Executive Manager
- Sales Consultant
- Inventory Manager
- Service Advisor
- Fleet Manager
- Finance Team

When a role is selected, update the displayed interface or content.

Examples:

### Dealer Owner

Business overview and strategic metrics.

### Sales Consultant

Leads, follow-ups, and sales pipeline.

### Inventory Manager

Vehicles, availability, and inventory status.

The goal is to show that DriveOS adapts to the user's job.

---

## SECTION 11 — NOTIFICATIONS & OPERATIONAL AWARENESS

Headline:

> Know what needs attention before it slows you down.

Show examples:

- Low inventory
- Follow-up required
- Delivery delay
- Service capacity warning
- New business insight

Possible notification channels:

- In-app
- Email
- WhatsApp
- Web push

Do not overpromise instant real-time behavior where the actual product uses periodic updates.

---

## SECTION 12 — REPORTING & ANALYTICS

Headline:

> From data to decisions.

Show reporting capabilities:

- Sales performance
- Inventory reporting
- Financial overview
- Customer analytics
- Branch comparison

Display filtering concepts:

`Daily · Weekly · Monthly · Custom`

Mention exports only if supported:

- CSV
- Excel
- PDF

---

## SECTION 13 — SMART SEARCH

Headline:

> Find anything. Instantly.

Show a product search experience.

Example placeholder:

`Search vehicles, customers, VIN, orders, reports...`

Possible results:

- Vehicle
- Customer
- Sales order
- Report

This should feel integrated with the DriveOS product.

---

## SECTION 14 — SECURITY & TRUST

Headline:

> Your business data stays protected.

Communicate:

### Secure Access

Authentication and account protection.

### Role-Based Access

Users only access relevant information.

### Data Isolation

Business data is separated between tenants.

### Auditability

Important actions can be traced.

### Secure Payments

Sensitive card information is handled by the payment provider rather than stored directly in DriveOS.

Avoid unsupported certifications or compliance badges.

---

## SECTION 15 — FINAL CTA

Create a large, memorable closing section.

Headline:

> Ready to move your automotive business forward?

Supporting copy:

> Bring your sales, inventory, operations, and intelligence into one connected system.

Primary CTA:

`Get started`

→ `/signup`

Secondary CTA:

`Log in`

→ `/login`

This section should feel decisive and conversion-focused.

---

## SECTION 16 — FOOTER

Include:

### Brand

DriveOS logo and concise description.

### Product

- Overview
- Sales
- Inventory
- Intelligence

### Solutions

- Dealerships
- Showrooms
- Automotive Groups
- Fleet Operations

### Resources

- Help Center
- Documentation
- Product Updates
- Contact

### Legal

- Privacy Policy
- Terms of Service
- Security

Do not create links to pages that do not exist unless placeholder routing is intentionally configured.

---

# AUTHENTICATION PAGES

The landing page must connect naturally to authentication.

## LOGIN PAGE

Route:

`/login`

Purpose:

Allow existing DriveOS users to access their dashboard.

Recommended structure:

- DriveOS logo
- Welcome back
- Email field
- Password field
- Remember me
- Forgot password
- Log in button
- Optional Google sign-in if supported
- Link:

> Don't have an account? Sign up

On successful authentication:

`→ Dashboard`

The design must feel consistent with the landing page and dashboard.

---

## SIGN-UP PAGE

Route:

`/signup`

Purpose:

Allow new users to begin using DriveOS.

Recommended structure:

### Step 1 — Account

- Full name
- Email
- Password

### Step 2 — Business

- Business / company name
- Optional business type
- Optional branch information

### Step 3 — Confirmation

- Account successfully created
- Continue to DriveOS

If the existing authentication architecture is already implemented, adapt to it rather than creating a conflicting system.

---

# ROUTING REQUIREMENTS

Implement clear navigation.

```text
/                  → DriveOS Landing Page
/login             → Login
/signup            → Sign Up
/dashboard         → Authenticated DriveOS Dashboard
```

If the existing dashboard uses another route structure, preserve the existing route and adapt these routes accordingly.

Never break the current dashboard.

---

# RESPONSIVE REQUIREMENTS

The landing page must work on:

- Desktop
- Laptop
- Tablet
- Mobile

## Mobile behavior

- Navigation collapses cleanly.
- Login and Sign Up remain easy to access.
- Dashboard visuals do not become unreadably small.
- Large product previews can use horizontal cropping or focused previews.
- Complex bento grids should stack intelligently.
- Interactive tabs should remain usable.
- CTAs should remain visible and easy to tap.

Do not simply shrink the desktop layout.

Design the mobile experience intentionally.

---

# ANIMATION & INTERACTION

Use motion sparingly.

Recommended:

- Fade/slide reveal on scroll
- Subtle dashboard preview movement
- Smooth section transitions
- Hover states
- Tab transitions
- Navigation blur transition
- Gentle parallax only where it adds value

Avoid:

- Constant floating motion
- Excessive parallax
- Heavy animations
- Long loading sequences
- Animation that delays interaction

Respect reduced-motion preferences.

---

# ACCESSIBILITY

Ensure:

- Semantic heading hierarchy
- Keyboard-accessible navigation
- Visible focus states
- Sufficient contrast
- Accessible form labels
- Buttons are distinguishable
- Reduced-motion support
- Mobile touch targets are appropriate

---

# CONTENT RULES

1. Do not invent customer logos.
2. Do not invent testimonials.
3. Do not invent performance statistics.
4. Do not claim unsupported certifications.
5. Do not overpromise AI capabilities.
6. Do not describe periodic/manual tracking as precise GPS real-time tracking.
7. Keep product terminology consistent with DriveOS.
8. Prefer concise, confident copy.
9. Avoid generic marketing filler.
10. Every major section must have a clear purpose.

---

# IMPLEMENTATION PRIORITY

## Phase 1 — Required

Build:

1. Navigation
2. Hero
3. Problem
4. Platform overview
5. Executive dashboard showcase
6. Sales & Inventory
7. DriveOS Intelligence
8. Final CTA
9. Footer
10. Login page
11. Sign-up page
12. Working routing

## Phase 2 — Enhanced

Add:

- Vehicle 360° showcase
- Multi-branch visualization
- Role-based interactive experience
- Notifications showcase
- Reporting
- Smart Search
- Security section

---

# FINAL QUALITY CHECK

Before considering the work complete, verify:

### Product consistency
- Does this clearly belong to the existing DriveOS dashboard?
- Are existing visual tokens reused?

### Product clarity
- Can a new visitor understand what DriveOS does within seconds?
- Is it clear that this is automotive business software?

### Conversion
- Is `Sign up` easy to find?
- Is `Log in` easy to find?
- Do both actions navigate correctly?

### UX
- Does the landing page flow naturally?
- Is the content hierarchy clear?
- Is mobile intentionally designed?

### Technical
- Are existing dashboard routes preserved?
- Are authentication routes correctly connected?
- Are buttons functional?
- Are there no dead primary CTAs?

### Visual
- Does it feel premium?
- Does it avoid generic SaaS-template aesthetics?
- Does it maintain a sophisticated automotive identity?

---

# IMPORTANT EXECUTION RULE

Do not redesign, replace, or break the existing DriveOS dashboard.

The goal is to create a public entry experience around the existing product:

```text
DriveOS Landing Page
       ↓
Login / Sign Up
       ↓
Authentication
       ↓
Existing DriveOS Dashboard
```

Treat the existing dashboard as the core product and the new landing page as its premium public-facing entry point.

First inspect the existing project structure, routes, design system, and authentication implementation. Then create the landing page and authentication entry flow in a way that integrates cleanly with the current DriveOS application.
