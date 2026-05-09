# E-Commerce Project

Full-stack e-commerce app with a React frontend and a NestJS backend.

## Project structure

- `front/` — React + Vite frontend application.
- `back/` — NestJS backend application with Prisma.
- `back/API_DOCUMENTATION.md` — detailed backend API contract.
- `docs/` — project documentation for frontend, backend, and API usage.

## Quick start

1. Start the backend:

```bash
cd back
npm install
npm run start:dev
```

2. Start the frontend:

```bash
cd front
npm install
npm run dev
```

## Documentation

- `front/README.md` — frontend setup and usage.
- `back/README.md` — backend setup and usage.
- `back/API_DOCUMENTATION.md` — full backend API endpoints.
- `docs/FRONTEND.md` — frontend architecture and behavior.
- `docs/BACKEND.md` — backend architecture and module overview.
- `docs/API.md` — API endpoints summary.

## Notes

- Frontend runs on `http://localhost:5173`.
- Backend runs on `http://localhost:4000`.
- Uploaded product images are served from `http://localhost:4000/images/<filename>`.
