# FitConnect Deployment Notes

## Runtime

Use Node.js 20 for CI and deployment. The project includes `.nvmrc` for local version managers.

## Backend

Required environment variables:

```text
PORT=5000
JWT_SECRET=<long-random-secret>
CLIENT_ORIGIN=<frontend-origin>
DB_PATH=./database/fitconnect.sqlite
```

Production start command:

```bash
npm start --prefix backend
```

The backend creates SQLite tables and seed events automatically on startup. Make sure the directory used by `DB_PATH` is persistent in the hosting environment.

## Frontend

Optional environment variable:

```text
VITE_API_URL=<backend-url>/api
```

Production build command:

```bash
npm run build --prefix frontend
```

Preview command:

```bash
npm run preview --prefix frontend
```

## Release Checklist

- Run `npm test --prefix backend`
- Run `npm run build --prefix frontend`
- Confirm `JWT_SECRET` is not the development fallback in production
- Confirm `CLIENT_ORIGIN` matches the deployed frontend URL
- Confirm SQLite data path is persistent
- Confirm seeded event images render and fallback image works

