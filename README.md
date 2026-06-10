# FitConnect

FitConnect is a university Agile Software Development MVP for organizing and joining local fitness and wellness meetups. It includes authentication, event management with image URLs, RSVP tracking, dashboards, and in-app notifications.

## Features

- User registration and login with bcrypt password hashing and JWT authentication
- Protected routes for dashboard, profile, event creation, editing, RSVP, and notifications
- SQLite persistence with users, events, RSVPs, and notifications tables
- Seeded fitness events with public Unsplash image URLs
- Event creation, editing, listing, details, and fallback images
- RSVP join/cancel with attendance counts
- User dashboard for upcoming, joined, and created events
- RSVP confirmation and event reminder notifications
- Responsive React UI built for stakeholder demos
- Backend API tests and GitHub Actions CI

## Technology Stack

- Frontend: React, Vite, React Router, Axios, lucide-react
- Backend: Node.js, Express.js
- Database: SQLite
- Authentication: JWT, bcrypt
- Testing: Vitest, Supertest
- CI: GitHub Actions

## Folder Structure

```text
FitConnect/
  backend/
    src/
      controllers/
      database/
      middleware/
      models/
      routes/
      services/
      tests/
      utils/
    server.js
  frontend/
    src/
      components/
      context/
      pages/
      services/
      utils/
  .github/workflows/
```

## Installation

Install dependencies for both applications:

```bash
npm run install:all
```

Create backend environment settings:

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env` with a long `JWT_SECRET` for non-demo use.

## Running the App

Start the backend API:

```bash
npm run dev:backend
```

Start the frontend:

```bash
npm run dev:frontend
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Deployment

Use Node.js 20 for CI and deployment. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for environment variables, build commands, and release checks.

## Database Setup

The backend creates and migrates SQLite automatically on startup. By default the database file is:

```text
backend/database/fitconnect.sqlite
```

Seed data is inserted automatically when the events table is empty.

## Testing

Run backend API tests:

```bash
npm test --prefix backend
```

Build the frontend:

```bash
npm run build --prefix frontend
```

Run both from the root:

```bash
npm test
npm run build
```

## API Documentation

Authentication:

- `POST /api/auth/register` creates a user and returns `{ user, token }`
- `POST /api/auth/login` validates credentials and returns `{ user, token }`

Events:

- `GET /api/events` lists all events
- `GET /api/events/:id` returns one event
- `POST /api/events` creates an event, protected
- `PUT /api/events/:id` edits an event, protected and creator-only
- `DELETE /api/events/:id` deletes an event, protected and creator-only

RSVP:

- `POST /api/rsvp/join` joins an event, protected, body `{ "eventId": 1 }`
- `POST /api/rsvp/cancel` cancels an RSVP, protected, body `{ "eventId": 1 }`

Notifications:

- `GET /api/notifications` lists notifications, protected
- `PATCH /api/notifications/read-all` marks notifications as read, protected

Dashboard and Profile:

- `GET /api/dashboard` returns upcoming, joined, created events, stats, and notification previews
- `GET /api/users/me` returns the authenticated profile

## Agile Commit Milestones

The repository history is organized around the requested Scrum-style sprint commits:

1. Initial project setup with React Express and SQLite
2. Implement user registration and authentication
3. Add event creation and event management features
4. Implement RSVP system and dashboard functionality
5. Add notification system and UI improvements
6. Add testing bug fixes and project documentation
7. Final MVP release and deployment preparation
