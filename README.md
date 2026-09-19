# KAVACH CARE (कवच केयर)
### AI-Assisted Rural Care Navigation & Referral Continuity Platform
*National Health Mission (NHM) • Ayushman Bharat Digital Mission (ABDM) Compatible*

---

## 🏛️ Platform Overview

**KAVACH CARE** is a production-grade public digital health platform engineered to eliminate drop-offs and misdirection in rural patient referrals across India. Connecting village ASHA frontline workers, Ayushman Arogya Mandirs (Sub-Centres), Primary Health Centres (PHC), Community Health Centres (CHC / FRU), and District Hospitals into a closed-loop continuum.

- **Deterministic ICMR STG Triage**: Clinical decision support based on Indian Council of Medical Research (ICMR) Standard Treatment Guidelines. Flags Red (Emergency), Amber (Urgent), Green (Routine).
- **Dynamic Facility Registry Matching**: Matches referrals to optimal public hospitals based on real-time bed capacity, specialist duty rosters, and diagnostic availability.
- **Closed-Loop Verification**: 9-stage verifiable patient audit tracking from village screening to post-discharge ASHA home verification.
- **Offline-First Resilience**: Frontline workers can screen patients, queue referrals, and auto-sync when network connectivity is restored.
- **Multilingual & Accessible**: Full trilingual support (**English**, **हिन्दी**, **मराठी**), Web Speech voice guidance, A-/A/A+ font scaling, and WCAG AAA high-contrast toggle.
- **ABDM Compliant**: Standardized 14-digit ABHA ID integration, Ayushman Arogya Mandir interoperability, and printable bilingual QR referral slips.

---

## 🚀 Quick Start Guide (VS Code)

### Prerequisites
1. **Node.js**: v18 or higher installed ([Download Node.js](https://nodejs.org/))
2. **MongoDB**: Local MongoDB Community Server running on `127.0.0.1:27017` or a MongoDB Atlas connection string ([Download MongoDB](https://www.mongodb.com/try/download/community))

---

### Step 1: Open in VS Code
Open the project directory in VS Code:
```bash
code C:\Users\pinsu\.gemini\antigravity\scratch\kavach-care
```

---

### Step 2: Start the Backend Server

Open a terminal in VS Code (`Ctrl + \`` or `Terminal > New Terminal`):

```bash
# Navigate to the backend directory
cd server

# Install dependencies (if not already installed)
npm install

# (Optional) Seed the database with realistic demo data
npm run seed

# Start backend development server
npm run dev
```

The backend server will launch at:
- **API Base URL**: `http://localhost:5000/api`
- **Health Check**: `http://localhost:5000/api/health`
- **Public Facilities**: `http://localhost:5000/api/facilities`
- **District Analytics**: `http://localhost:5000/api/analytics/district`

---

### Step 3: Start the Frontend Application

Open a **second** terminal tab in VS Code (`Terminal > New Terminal`):

```bash
# Ensure you are in the project root directory (kavach-care)
npm install

# Start Vite frontend dev server
npm run dev
```

Open your browser and navigate to:
**`http://localhost:5173`**

---

### Step 4: Production Build Test

To verify TypeScript types and generate a minified production bundle:
```bash
npm run build
```
The output will be bundled cleanly into `dist/`.

---

## 👥 Pre-Configured Demo Accounts

All demo accounts have password: **`password123`**

| Role | Name | Email Address | Portal / Features |
| :--- | :--- | :--- | :--- |
| **Patient / Citizen** | Sita Sharma | `patient.sita@kavach.gov.in` | `/patient` — Track referrals, appointments, health records, SMS alerts |
| **ASHA Frontline Worker** | Sunita Madavi | `asha.sunita@kavach.gov.in` | `/frontline` — Patient registration, ICMR STG triage, offline queue & sync, home follow-up tasks |
| **Medical Officer / Specialist** | Dr. Anand Sharma | `doctor.sharma@kavach.gov.in` | `/doctor` — OPD queue, clinical triage acceptance, e-discharge summary entry |
| **Hospital Admin (CHC)** | CHC Rampur Admin | `admin.chcrampur@kavach.gov.in` | `/facility` — Live bed capacity, ICU / HDU availability, inward referral reception |
| **District CMO** | Dr. Rajesh Verma | `cmo.sehore@kavach.gov.in` | `/admin` — Sehore district telemetry, bottleneck detection, drop-off heatmaps |

*Note: On the [Login Page](http://localhost:5173/login), you can click any "Quick Demo Fill" badge to immediately populate login credentials.*

---

## 🏗️ Architecture & Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Tooling & Bundler**: Vite
- **Styling**: Tailwind CSS (Indian Public Healthcare & National Health Mission theme `#0F5B4E`, `#123B63`, `#198754`, `#F8FAFC`)
- **Icons**: Lucide React
- **Charts**: Recharts (District analytics, referral trends, hospital load)
- **Internationalization (i18n)**: Custom React Context with LocalStorage persistence (`en`, `hi`, `mr`)
- **Accessibility**: High-contrast theme mode, Web Speech API speech-to-text, A11y font scaling
- **Offline Resilience**: Web LocalStorage synchronization queue with automatic reconnection listeners

### Backend
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose ODM (11 normalized clinical models)
- **Security**: JWT tokens, Bcrypt password hashing, Role-Based Access Control (RBAC), sanitized inputs
- **Triage & Facility Services**: Rule-based ICMR Standard Treatment Guidelines engine & dynamic facility availability scoring

---

## 📁 Project Directory Structure

```
kavach-care/
├── .env                          # Frontend environment config
├── .env.example
├── package.json                  # Frontend dependencies & scripts
├── vite.config.ts                # Vite configuration & proxy
├── tsconfig.json                 # TypeScript compiler configuration
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # App router & layout container
│   ├── index.css                 # Global CSS & accessibility styles
│   ├── context/
│   │   ├── AuthContext.tsx       # Authentication & user state
│   │   ├── LanguageContext.tsx   # Trilingual context (en, hi, mr)
│   │   └── AccessibilityContext.tsx # Font scaling, contrast, speech
│   ├── i18n/                     # Centralized translations
│   │   ├── en.ts
│   │   ├── hi.ts
│   │   ├── mr.ts
│   │   └── index.ts
│   ├── services/                 # API service layer (Axios)
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── patientService.ts
│   │   ├── facilityService.ts
│   │   ├── referralService.ts
│   │   ├── appointmentService.ts
│   │   ├── screeningService.ts
│   │   ├── followupService.ts
│   │   ├── notificationService.ts
│   │   └── analyticsService.ts
│   ├── components/
│   │   ├── common/               # GovHeaderBar, Navbar, Footer
│   │   ├── home/                 # Hero, Problem, HowItWorks, ReferralTracker,
│   │   │                         # HealthcareNetwork, Ecosystem, DistrictAnalytics, AISafety
│   │   └── modals/               # TriageWizardModal, ReferralSlipModal
│   └── pages/
│       ├── HomePage.tsx          # Landing page with section navigation
│       ├── LoginPage.tsx         # Unified government sign-in
│       ├── RegisterPage.tsx      # Public registration
│       └── dashboards/           # Role-based portals
│           ├── PatientDashboard.tsx
│           ├── FrontlineDashboard.tsx (with offline queue & sync)
│           ├── DoctorDashboard.tsx
│           ├── FacilityDashboard.tsx
│           └── AdminDashboard.tsx
└── server/                       # Node.js Express REST Backend
    ├── .env                      # Server environment config
    ├── .env.example
    ├── package.json              # Server dependencies & scripts
    ├── tsconfig.json
    └── src/
        ├── server.ts             # Express application initialization
        ├── seed.ts               # Demo data seeder script
        ├── config/               # Database & environment configuration
        ├── models/               # 11 Mongoose Schemas
        ├── controllers/          # API route controllers
        ├── routes/               # API endpoints
        ├── middleware/           # JWT authentication & role authorization
        └── services/             # AI Triage & Facility Matching engines
```

---

## ⚖️ Clinical Safety & Legal Governance

> **Important Clinical Notice**: KAVACH CARE operates under the ethical guidelines of the Ministry of Health and Family Welfare (MoHFW) and the Digital Personal Data Protection (DPDP) Act 2023. The AI triage engine provides algorithmic prioritization assistance aligned with ICMR Standard Treatment Guidelines (STG) for frontline workers. All final clinical diagnoses, prescription writing, and admission decisions remain strictly with licensed medical practitioners.
