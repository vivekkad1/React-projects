# JobTrackr

A clean, modern job application tracker built with React. Keep all your job applications organised in one place — track statuses, attach resumes, set reminders, and get a visual overview of your job search progress.

![JobTrackr](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?style=flat&logo=mui&logoColor=white)

---

## Features

- **Track Applications** — Add, edit, and delete job applications with details like company, role, location type, status, and applied date.
- **Resume Uploads** — Attach a PDF or Word resume (.pdf / .doc / .docx) directly to each application. Files are Base-64 encoded and stored locally.
- **Status Management** — Five distinct statuses: Wishlist, Applied, Interview, Offer, Rejected — each with unique visual styling.
- **Dashboard Overview** — At-a-glance stat cards and a recent applications feed with upcoming reminders.
- **Analytics** — Interactive charts (Doughnut, Line, Bar) powered by Chart.js showing status distribution, weekly velocity, and interview funnel.
- **Notes** — A global free-form notepad for jotting down interview tips, contact info, or anything else.
- **Search & Filter** — Filter applications by status, location type, and free-text search.
- **Reminder Dates** — Set reminder dates and see urgent reminders highlighted on the Dashboard.
- **Dark Mode** — Full dark mode toggle with a smooth transition.
- **Persistent Storage** — All data is saved to `localStorage` so it survives page refreshes.

---

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Component Library | Material UI v7 |
| Routing | React Router v6 |
| Forms | React Hook Form |
| Charts | Chart.js + react-chartjs-2 |
| Icons | Lucide React |
| Date Utilities | Day.js |
| Notifications | React Hot Toast |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-vivekkad1/jobtrackr.git
   cd jobtrackr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

---

## Project Structure

```
src/
├── components/
│   ├── common/         # ProtectedRoute, EmptyState
│   ├── jobs/           # JobCard, JobFilters, StatusBadge
│   └── layout/         # AppLayout, Sidebar, TopBar
├── pages/
│   ├── Dashboard.jsx
│   ├── JobList.jsx
│   ├── JobDetail.jsx
│   ├── AddJob.jsx
│   ├── Analytics.jsx
│   ├── Notes.jsx
│   └── Login.jsx
├── store/
│   ├── index.js        
│   ├── jobsSlice.js    # Jobs state + localStorage persistence
│   ├── authSlice.js    # Auth state
│   └── uiSlice.js      # Dark mode toggle
├── utils/
│   ├── statusColors.js # Status badge styles
│   ├── localStorage.js # Storage helpers
│   └── dateHelpers.js  # Date formatting utils
├── App.jsx             # Routes + MUI theme
├── main.jsx
└── index.css           # Tailwind v4 theme config
```

---

## Usage

1. **Sign in** with any email and a 6+ character password (demo mode — no backend required).
2. Click **Add Application** to log a new job.
3. Choose a **status** to reflect where you are in the process.
4. Attach your **resume** (PDF/Word, max 2MB).
5. Set a **reminder date** to get alerted on the Dashboard when a deadline is approaching.
6. Head to **Analytics** to see your job search trends visualised.

---

## Notes on Data Storage

All application data, including uploaded resumes (Base-64 encoded) is stored in the browser's `localStorage`. There is no backend or database. Clearing site data in your browser will erase all records.

> **Tip:** If you plan to store many applications with large resume files, be mindful of the browser's `localStorage` size limit (~5MB per origin).

---

## License

MIT
