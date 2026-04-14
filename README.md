# Property Management System (PMS)

A modern full-stack property management platform for admins, managers, tenants, and maintenance staff.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61dafb)](pms-frontend)
[![Backend](https://img.shields.io/badge/backend-Express%20API-000000)](pms-backend)
[![Database](https://img.shields.io/badge/database-Supabase-3fcf8e)](https://supabase.com)

## Why This Project

Managing rental properties usually means juggling spreadsheets, chats, and payment screenshots. PMS centralizes operations into one workflow:

- Property and unit lifecycle management
- Lease creation and rent generation
- Payment tracking and verification
- Maintenance request assignment and completion
- Notification and activity log system
- Role-based dashboard experiences

## Core Features

- Multi-role authentication and route protection
- Admin dashboard with occupancy and payment insights
- Manager workflows for operations and maintenance
- Tenant self-service for leases, payments, and tickets
- Razorpay payment integration and webhook handling
- Activity logs for auditability
- Notification center with preferences
- Demo mode fallback for local-first onboarding

## Tech Stack

- Frontend: React 19, Vite, React Router, TanStack Query
- Backend: Node.js, Express 5
- Database/Auth: Supabase PostgreSQL + Supabase Auth
- Payments: Razorpay
- Deployment: Vercel

## Monorepo Structure

```text
.
|-- api/                  # Vercel serverless entry
|-- pms-backend/          # Express API + services + docs
|-- pms-frontend/         # React application + docs
|-- README.md
`-- vercel.json
```

## Quick Start

### 1) Clone and install

```bash
git clone https://github.com/MittalAshutosh/PROPERTY-MANAGEMENT-SYSTEM.git
cd PROPERTY-MANAGEMENT-SYSTEM
```

### 2) Backend setup

```bash
cd pms-backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on [http://localhost:4000](http://localhost:4000)

### 3) Frontend setup

In a new terminal:

```bash
cd pms-frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

## Environment Variables

Backend (`pms-backend/.env`):

- `PORT`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Frontend (`pms-frontend/.env`):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL`
- `VITE_RAZORPAY_KEY`

## Roles and Access

| Role        | Access Scope                                            |
| ----------- | ------------------------------------------------------- |
| Admin       | Full system control and analytics                       |
| Manager     | Property, unit, lease, and maintenance operations       |
| Tenant      | Lease, payments, and maintenance self-service           |
| Maintenance | Assigned maintenance task execution                     |

## Documentation

- Backend docs: [pms-backend/docs/README.md](pms-backend/docs/README.md)
- Frontend docs: [pms-frontend/docs/README.md](pms-frontend/docs/README.md)
- API reference: [pms-backend/docs/API_REFERENCE.md](pms-backend/docs/API_REFERENCE.md)
- Database schema: [pms-backend/docs/DATABASE.md](pms-backend/docs/DATABASE.md)

## Roadmap

- Add charts and exports for advanced portfolio analytics
- Add invoice/PDF generation for rent receipts
- Add automated reminder scheduler
- Add E2E test suite and API integration tests
- Add Dockerized local environment

## Contributing

Contributions are welcome. Start here:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

## License

MIT. See [LICENSE](LICENSE).
