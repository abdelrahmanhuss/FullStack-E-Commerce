# Frontend Documentation

## Overview

The frontend is built with React, Vite, Tailwind CSS, and React Router DOM.

## Key behavior

- Uses `src/context/ShopContext.jsx` to manage:
  - API base URL (`http://localhost:4000`)
  - authentication token and user state
  - cart state
  - product fetching
- Stores the following keys in `localStorage`:
  - `token`
  - `user`
  - `isAdmin`
  - `cartItems`

## Main routes

- `/` — Home
- `/products/:productId` — Product detail
- `/cart` — Cart
- `/shop` — Shop categories
- `/categories` — Categories list
- `/order` — Checkout
- `/verify` — Payment verification
- `/myorders` — User orders
- `/login` — Login page
- `/signup` — Signup page

## Admin routes

- `/admin/add`
- `/admin/list`
- `/admin/orders`
- `/admin/users`
- `/admin/notifications`

Admin routes are wrapped by `AdminProtectedRoute` and only visible when `isAdmin` is set.

## Important files

- `src/App.jsx` — route configuration and sidebar layout.
- `src/context/ShopContext.jsx` — backend API calls, cart logic, and auth state.
- `src/components/admin/` — admin pages.
- `src/pages/` — storefront pages.

## Notes

- If the backend URL changes, update the `url` constant in `src/context/ShopContext.jsx`.
- The frontend expects the backend to serve image files from `/images`.
