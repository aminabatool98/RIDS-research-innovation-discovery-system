# RIDS — Research Information Discovery System

A full-stack MERN platform that catalogues university research by **Department** and by
**Field of knowledge**, alongside faculty profiles, media coverage, events, achievements and
news — with a working AI chatbot, a recommendation engine, global search, and a dedicated
admin panel. Built from the attached project proposal.

## What's included

- **Backend** (`/server`) — Node.js + Express + MongoDB/Mongoose. JWT auth, role-based admin
  access, full REST API for every module, a rule-based chatbot that queries your real data
  (upgrades automatically to a real LLM if you add an OpenAI key — no code changes needed),
  a simple explainable recommendation engine, global keyword search, rate limiting, and a seed
  script.
- **Frontend** (`/client`) — React (Vite) + Tailwind CSS + Framer Motion. Public showcase pages,
  user auth + bookmarks, an animated chatbot widget, and a full admin panel with CRUD screens
  for every content type.

## Quick start

### 1. Backend

```bash
cd server
cp .env.example .env
# edit .env — at minimum set MONGO_URI (a free MongoDB Atlas cluster works) and JWT_SECRET
npm install
npm run seed     # creates the 10 fixed fields, sample departments, and an admin login
npm run dev       # starts the API on http://localhost:5000
```

The seed script prints the admin email/password it created (from `ADMIN_SEED_EMAIL` /
`ADMIN_SEED_PASSWORD` in `.env`) — **log in and change it** after your first visit.

### 2. Frontend

```bash
cd client
cp .env.example .env   # VITE_API_URL defaults to http://localhost:5000/api
npm install
npm run dev             # starts the site on http://localhost:5173
```

Open `http://localhost:5173`. Log in with the seeded admin account to reach `/admin` and start
posting real research, faculty, media, events, achievements and news — the public site updates
immediately since everything reads from the same database.

### 3. Optional: real AI chatbot

The chatbot works immediately with no setup — it searches your live database and replies with
real matches. To upgrade it to an LLM-generated response (still grounded in your data, so it
won't invent papers that don't exist), add to `server/.env`:

```
OPENAI_API_KEY=sk-...
```

No restart-required code changes — `utils/aiService.js` checks for the key automatically.

## Project structure

```
rids/
  server/            Express API
    models/          11 Mongoose schemas (User, Department, Field, Faculty, ResearchPaper, …)
    controllers/      Route handlers
    routes/            REST endpoints, mounted under /api
    middleware/     JWT auth, admin gate, error handling
    utils/               token signing, chatbot logic, recommendation engine, generic CRUD factory
    seed/               seed.js — run once after connecting a fresh database
  client/             React (Vite) app
    src/api/           one file per resource, wraps axios
    src/components/  Navbar, Footer, cards, chatbot widget, generic AdminCrudTable
    src/pages/         public pages, auth, user dashboard, admin panel
    src/redux/         auth + UI state (Redux Toolkit)
```

## Deployment

- **Database**: MongoDB Atlas (free tier is enough to start).
- **Backend**: Render, Railway, or any Node host — set the same environment variables from
  `server/.env.example`, including `CLIENT_URL` for CORS.
- **Frontend**: Vercel or Netlify — set `VITE_API_URL` to your deployed backend's `/api` URL.

## Notes

- File uploads (`fileUrl`, `imageUrl`, `photoUrl` fields) currently take a direct URL — wire up
  Cloudinary/S3 + Multer in `middleware/uploadMiddleware.js` if you want in-browser file uploads
  from the admin panel instead of pasting links.
- Password reset currently logs the reset token to the server console instead of emailing it —
  connect a mail provider (e.g. Nodemailer + SMTP) in `authController.js` before going live.
