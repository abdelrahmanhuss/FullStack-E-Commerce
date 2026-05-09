# Backend Documentation

## Overview

The backend uses NestJS with Prisma and includes the following features:

- JWT-based authentication
- Admin-only guards for protected admin endpoints
- File upload support for product images using Multer
- Static image serving from `/images`
- CORS enabled for `http://localhost:5173`

## Main modules

- `src/users` — user signup, login, user listing, user delete, admin role management.
- `src/admin` — admin login.
- `src/products` — add products, list products, category filtering, single product detail, delete product.
- `src/cart` — manage authenticated user cart.
- `src/orders` — create and manage orders and payment verification.
- `src/notifications` — admin notifications management.
- `src/auth` — JWT auth guard and admin guard.
- `src/prisma` — Prisma service and configuration.

## Server configuration

- Backend port: `4000` by default.
- CORS origin: `http://localhost:5173`.
- Static route: `/images` serves files from the `uploads/` folder.
- Validation pipe is enabled globally in `src/main.ts`.

## Running the backend

```bash
cd back
npm install
npm run start:dev
```

## Production build

```bash
cd back
npm run build
npm run start:prod
```

## Notes

- For API details and request/response examples, use `back/API_DOCUMENTATION.md`.
- Keep the `uploads/` directory available for storing product images.
