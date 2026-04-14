# PMS - Property Management System

A full-stack Property Management System with React frontend and Express backend.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, TanStack Query, React Router
- **Backend**: Express 5, Node.js
- **Database**: Supabase (PostgreSQL)
- **Payments**: Razorpay
- **Auth**: Supabase Auth

## 📁 Project Structure

```
pms/
├── api/                  # Vercel Serverless Functions
│   └── index.js          # Express app for serverless
├── pms-backend/          # Backend source
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── middleware/   # Auth middleware
│   └── docs/             # Backend documentation
├── pms-frontend/         # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── services/     # API client
│   └── docs/             # Frontend documentation
└── vercel.json           # Vercel configuration
```

## 🔧 Local Development

### Backend
```bash
cd pms-backend
npm install
cp .env.example .env  # Configure your env vars
npm run dev           # Runs on http://localhost:4000
```

### Frontend
```bash
cd pms-frontend
npm install
npm run dev           # Runs on http://localhost:5173
```

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_RAZORPAY_KEY`
4. Deploy!

## 📚 Documentation

- [Backend Docs](./pms-backend/docs/README.md)
- [Frontend Docs](./pms-frontend/docs/README.md)

## 🔐 User Roles

| Role | Access |
|------|--------|
| Admin | Full access |
| Manager | Property management |
| Tenant | View lease, pay rent |
| Maintenance | View assigned tasks |

## 📄 License

MIT