# TASK: Connect DriveOS Dashboard to a Real Persistent Database

You are working on an existing DriveOS project.

The project already has an established architecture and UI implementation.

Your task is to CONNECT THE EXISTING DASHBOARD AND POPUP FORMS TO A REAL PERSISTENT DATABASE.

DO NOT redesign the UI.
DO NOT replace the existing dashboard.
DO NOT create a new frontend architecture.
DO NOT remove existing components.
DO NOT rewrite working features unnecessarily.

The primary goal is DATA PERSISTENCE and DATA FLOW.

---

# 1. CURRENT PROJECT CONTEXT

The project appears to have a structure similar to:

DriveOS/
├── apps/
│   ├── api/
│   └── web/
│
├── .github/
├── .agents/
└── ...

Inside the web application there are already features such as:

- activity-timeline
- ai-assistant
- ai-insights
- authentication
- brand-comparison
- customer-analytics
- customers
- dashboard
- etc.

There are also existing dashboard components such as:

- ActivityTimeline.tsx
- AiAssistantModal.tsx
- AiInsightPanel.tsx
- ApprovalsList.tsx
- ApprovalsReviewModal.tsx
- HeroGreeting.tsx
- MetricsGrid.tsx
- SalesTrendChart.tsx

The existing UI is already implemented.

Treat the existing UI as the SOURCE OF TRUTH.

---

# 2. FIRST: AUDIT THE EXISTING PROJECT

Before modifying anything:

1. Inspect the complete repository structure.
2. Inspect:
   - package.json
   - apps/api
   - apps/web
   - existing API routes
   - existing data models
   - existing authentication
   - existing hooks
   - existing services
   - existing state management
   - existing mock data
   - existing popup/modal forms
   - existing customer/approval/sales features
3. Identify whether a database already exists.
4. Identify whether an ORM already exists.
5. Identify whether an API/data-access layer already exists.
6. Identify all places currently using hardcoded/mock/static data.

DO NOT immediately start coding.

First understand the current architecture.

---

# 3. DATABASE STRATEGY

The application needs a REAL PERSISTENT DATABASE.

If the project already has a database solution, KEEP USING IT.

If there is no database yet:

Use PostgreSQL as the database.

Prefer Supabase PostgreSQL if the project does not already have an established PostgreSQL provider.

The database must NOT be implemented using:

- React state
- localStorage
- sessionStorage
- static JSON
- mock arrays
- browser memory

Those can only be used for temporary UI state, never as the source of truth.

The source of truth must be the database.

---

# 4. DATABASE ARCHITECTURE

Follow this architecture:

Frontend
    ↓
API
    ↓
Service / Repository Layer
    ↓
Database
    ↓
Service / Repository Layer
    ↓
API Response
    ↓
Frontend
    ↓
Dashboard UI

The frontend should NOT directly manipulate the database unless the existing architecture explicitly requires it.

Since this project already has:

apps/web
apps/api

prefer:

apps/web → apps/api → database

---

# 5. IDENTIFY THE REQUIRED ENTITIES

Based on the existing DriveOS dashboard, identify and model the entities that are already represented by the UI.

At minimum investigate whether these entities are needed:

## Customers

Possible fields:

- id
- name
- email
- phone
- company
- status
- source
- assigned_to
- created_at
- updated_at

DO NOT blindly use these fields.

Inspect the existing customer UI/forms and determine the actual required fields.

---

## Vehicles / Inventory

The dashboard contains vehicle-related information.

Inspect the existing implementation and determine whether a vehicle/inventory entity is already present or implied.

Possible fields:

- id
- brand
- model
- year
- price
- stock
- status
- location
- created_at
- updated_at

Again:

DO NOT blindly implement fields that are not required by the existing application.

---

## Sales

Inspect the Sales Trend implementation.

Determine what data is currently required to calculate:

- Revenue MTD
- Units Sold
- Monthly sales
- Quarterly sales
- Sales trend

Create a proper sales entity or transaction model if necessary.

---

## Approvals

Inspect:

- ApprovalsList.tsx
- ApprovalsReviewModal.tsx

Determine the actual approval data structure.

Possible fields:

- id
- title
- type
- status
- requester
- amount
- notes
- created_at
- reviewed_at
- reviewed_by

Use the existing UI requirements as the source of truth.

---

## Activity Timeline

Inspect:

- ActivityTimeline.tsx
- activity-timeline feature

Determine what actions should create activity records.

For example:

- customer created
- customer updated
- sale created
- approval submitted
- approval approved
- approval rejected

Activity records should be persistent.

---

# 6. DATABASE RELATIONSHIPS

Analyze the existing application and establish proper relationships.

For example:

Customer
    ↓
Sales
    ↓
Vehicle

User
    ↓
Customer assignment

User
    ↓
Approval

User
    ↓
Activity

Do not create unnecessary relationships.

Keep the schema normalized and maintainable.

Use foreign keys where appropriate.

---

# 7. DATABASE MIGRATIONS

Create proper database migrations.

DO NOT manually create tables only through temporary scripts.

The database schema must be reproducible.

Someone cloning this repository should be able to understand:

1. What tables exist.
2. What columns exist.
3. What relationships exist.
4. How to initialize the database.
5. How to run migrations.

Document the process.

---

# 8. API LAYER

Inspect the existing API architecture first.

Create or extend API endpoints according to the existing architecture.

At minimum support CRUD operations for the entities that have corresponding UI forms.

For example:

GET
    /customers

GET
    /customers/:id

POST
    /customers

PATCH
    /customers/:id

DELETE
    /customers/:id

Do the same for other entities only when the UI requires them.

DO NOT create unnecessary endpoints.

---

# 9. POPUP FORM → DATABASE

This is one of the MOST IMPORTANT requirements.

Every existing popup/modal that creates or edits data must actually persist the data.

Example:

User opens:

"Add Customer"

↓

User fills:

Name
Email
Phone
Company
etc.

↓

User clicks:

SAVE

↓

Frontend validates the form

↓

Frontend sends request to API

↓

API validates request

↓

API writes to database

↓

Database returns created record

↓

API returns created record to frontend

↓

Frontend updates the relevant UI

↓

Popup closes

↓

New customer appears in the customer list

↓

Dashboard metrics update if applicable

This must be a REAL end-to-end flow.

---

# 10. NO FAKE SUCCESS

Do NOT make the UI show:

"Customer added successfully"

unless the database operation actually succeeded.

If the database request fails:

- keep the form data where appropriate
- show an error state
- do not pretend the record was saved
- do not update the UI as if the record exists

The UI must reflect the actual database state.

---

# 11. IMMEDIATE UI UPDATE

After creating/updating/deleting a record, the relevant UI should update immediately.

Example:

Create Customer

↓

Database INSERT succeeds

↓

Customer list refreshes or cache is invalidated

↓

New customer appears

No manual browser refresh should be required.

The same principle applies to:

- customers
- approvals
- sales
- activities
- inventory
- other CRUD entities

Use the project's existing data-fetching/state-management solution.

If the project uses React Query/TanStack Query, use query invalidation/refetching appropriately.

If it uses another system, follow the existing architecture.

DO NOT introduce a new state management library unless absolutely necessary.

---

# 12. DASHBOARD METRICS MUST BECOME DATA-DRIVEN

The current dashboard contains metrics such as:

- Revenue MTD
- Unit Terjual
- Konversi Lead
- Fleet Utilization
- Sales Trend
- AI Insights

Inspect which of these currently use mock/static values.

Replace mock values with database-backed calculations where the underlying data exists.

For example:

Revenue MTD

should be calculated from actual sales records for the current month.

Unit Terjual

should be calculated from actual sales.

Sales Trend

should be calculated from actual sales grouped by month.

Do NOT simply hardcode the current screenshot values into the database.

The dashboard should reflect the actual records.

---

# 13. SEED DATA

Create development seed data so the dashboard does not look empty during development.

The seed data should resemble the existing UI.

For example:

Customers
Sales
Vehicles
Approvals
Activities

However:

Clearly separate SEED DATA from REAL USER DATA.

The seed script must be optional and must not overwrite production data.

---

# 14. VALIDATION

Implement validation at BOTH levels:

Frontend
    ↓
API
    ↓
Database

Frontend validation is for user experience.

Backend validation is for security and data integrity.

Do not trust frontend validation alone.

Validate:

- required fields
- email formats where applicable
- numeric fields
- dates
- enum/status values
- relationships
- invalid IDs
- duplicate records where appropriate

Use the validation system already present in the project if one exists.

---

# 15. ERROR HANDLING

Implement proper error states.

Examples:

Database unavailable:

"Unable to connect to the database."

Validation error:

"Please check the required fields."

Record not found:

"Customer not found."

Duplicate/conflict:

"Customer already exists."

Do not expose raw database errors to the user.

Log useful technical details on the server side.

---

# 16. LOADING STATES

Existing buttons/forms should handle loading states.

Example:

Before:

[ Save ]

During request:

[ Saving... ]

After success:

modal closes

After failure:

form remains open
+
error displayed

Prevent accidental duplicate submissions.

---

# 17. SECURITY

Inspect the existing authentication system.

Database operations must respect the authenticated user.

Do NOT expose:

- database credentials
- service-role keys
- secrets
- private environment variables

to the frontend.

Use environment variables correctly.

Never hardcode credentials into source code.

---

# 18. ENVIRONMENT VARIABLES

Create/update the appropriate environment configuration.

Use:

.env.local

or whatever environment convention the project already uses.

Make sure:

- development works
- production configuration is documented
- secrets are not committed to Git

Update .gitignore if necessary.

Provide an example environment file such as:

.env.example

with placeholder values only.

---

# 19. DO NOT BREAK THE EXISTING UI

This is critical.

DO NOT:

- redesign the dashboard
- change typography
- change colors
- change spacing
- change layout
- replace Figma implementation
- remove existing components
- replace working modals
- change navigation unnecessarily

The existing UI is already approved.

Your job is to make the existing UI FUNCTIONAL with real data.

Only make minimal UI changes when required for:

- loading states
- error states
- empty states
- validation messages
- displaying newly persisted data

---

# 20. MOCK DATA AUDIT

Search the entire project for:

- mock
- dummy
- fake
- sample
- hardcoded arrays
- placeholder data
- static metrics

For every result:

Determine whether it should become database-backed.

Do not blindly remove mock data.

Some mock data may be intentionally used for:

- UI previews
- testing
- development seed data

Keep those where appropriate.

---

# 21. DATA FLOW DOCUMENTATION

After implementation, create documentation describing:

Frontend
↓
API
↓
Service
↓
Database

For every major entity explain:

- where it is created
- where it is stored
- where it is fetched
- where it is displayed
- how it is updated
- how it is deleted

---

# 22. TEST THE COMPLETE FLOW

Do not consider the task complete after creating the database.

Test the actual user journey.

## Test 1 — Create

Open popup

→ fill form

→ submit

→ API request

→ database INSERT

→ API response

→ UI update

→ refresh browser

→ record still exists

---

## Test 2 — Update

Open existing record

→ modify data

→ save

→ database UPDATE

→ UI updates

→ refresh browser

→ changes remain

---

## Test 3 — Delete

Delete record

→ confirmation

→ API DELETE

→ database DELETE

→ UI updates

→ refresh browser

→ record remains deleted

---

## Test 4 — Error

Temporarily simulate invalid input/database failure.

Verify that:

- error is shown
- UI does not pretend success
- application does not crash

---

# 23. IMPORTANT ARCHITECTURAL RULE

Do NOT solve this by putting everything inside the React components.

Avoid:

Component
    ↓
Direct database logic
    ↓
Random queries

Prefer:

Component
    ↓
Hook / Data Layer
    ↓
API Client
    ↓
API Route
    ↓
Service
    ↓
Repository / ORM
    ↓
Database

Follow the existing architecture whenever possible.

---

# 24. IMPLEMENTATION ORDER

Work in this order:

PHASE 1
Audit existing architecture.

PHASE 2
Identify existing entities and mock data.

PHASE 3
Design database schema.

PHASE 4
Implement migrations.

PHASE 5
Implement database access layer.

PHASE 6
Implement/extend API endpoints.

PHASE 7
Connect existing popup forms.

PHASE 8
Connect existing lists/tables.

PHASE 9
Connect dashboard metrics.

PHASE 10
Connect activity timeline.

PHASE 11
Implement loading/error/empty states.

PHASE 12
Create development seed data.

PHASE 13
Run type checking/linting/tests.

PHASE 14
Test complete CRUD flows.

---

# 25. STOP CONDITIONS

Before making architectural changes, inspect the repository.

If an existing solution already handles:

- database
- ORM
- API
- authentication
- state management

DO NOT replace it.

Extend it.

If you discover that the current architecture is incomplete, explain the problem first and choose the smallest architectural change necessary.

---

# 26. FINAL DELIVERABLE

When finished, provide a concise implementation report containing:

1. Database technology used
2. Tables created
3. Relationships
4. API endpoints created/updated
5. Popup forms connected
6. Dashboard sections connected
7. Mock data replaced
8. Environment variables required
9. Migration/seed commands
10. Tests performed
11. Any remaining limitations

MOST IMPORTANT:

The application must now have this real behavior:

USER INPUT
↓
POPUP FORM
↓
API
↓
DATABASE
↓
API RESPONSE
↓
DASHBOARD / LIST / CHART
↓
PERSISTENT DATA

A browser refresh must NOT erase the data.

The database is the SOURCE OF TRUTH.

Do not finish the task until at least one complete CREATE → DATABASE → FETCH → DISPLAY flow has been verified end-to-end.
