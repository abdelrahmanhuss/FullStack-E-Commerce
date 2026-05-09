# Frontend

React frontend for the e-commerce application.

## Overview

- Built with React 19, Vite, Tailwind CSS, and React Router.
- Uses `axios` to call the backend API at `http://localhost:4000`.
- Stores session data in `localStorage` for `token`, `user`, `isAdmin`, and `cartItems`.
- Includes admin protected routes for Add, List, Orders, Users, and Notifications.

## Setup

```bash
cd front
npm install
```

## Run locally

```bash
cd front
npm run dev
```

## Build for production

```bash
cd front
npm run build
```

## Lint

```bash
cd front
npm run lint
```

## Important files

- `src/App.jsx` - application routes and admin route layout.
- `src/context/ShopContext.jsx` - API base URL, auth token handling, cart logic, and product fetching.
- `src/components/admin/` - admin dashboard pages.
- `src/pages/` - main storefront pages.

## Backend API URL

The frontend is configured to hit the backend at:

```txt
http://localhost:4000
```

If you change the backend port, update `src/context/ShopContext.jsx`.

## Notes

- The frontend expects the backend to serve uploaded images under `/images/<filename>`.
- Admin access is controlled in the frontend by `isAdmin` from local storage and `AdminProtectedRoute`.
- The development frontend runs on `http://localhost:5173` by default.
