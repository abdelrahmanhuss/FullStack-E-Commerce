# Backend API Documentation

This document describes the backend API for the e-commerce app. It is designed to be used by the frontend team.

## Base URL

- Local development: `http://localhost:4000`
- CORS is enabled for: `http://localhost:5173`

## Authentication

- Most protected endpoints require the `Authorization` header:
  - `Authorization: Bearer <jwt-token>`
- JWT token is returned by:
  - `POST /users/login`
  - `POST /users/signup`
  - `POST /admin/login`

## Static Images

Uploaded product images are served from:
- `GET /images/<filename>`

Example:
- `http://localhost:3000/images/1715561234567-product.jpg`

---

## Users

### POST /users/signup

Create a new user.

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:
```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /users/login

Authenticate an existing user.

Request body:
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:
```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET /users

Get all registered users.
- Protected: requires `Authorization` header.

Response:
```json
[{
  "id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "cartData": {},
  "isAdmin": false,
  "orders": []
}]
```

---

## Admin

### POST /admin/login

Admin login endpoint.

Request body:
```json
{
  "email": "admin@example.com",
  "password": "adminpass"
}
```

Response:
```json
{
  "success": true,
  "token": "<jwt-token>",
  "user": {
    "id": "...",
    "name": "Admin Name",
    "email": "admin@example.com",
    "isAdmin": true
  }
}
```

Notes:
- The user must exist in the DB with `isAdmin: true`.
- This endpoint does not require an auth token.

---

## Products

### POST /products/add

Create a new product.
- Protected: requires auth token.
- Content type: `multipart/form-data`.
- Form fields:
  - `name` (string)
  - `price` (number)
  - `description` (string)
  - `category` (string)
  - `image` (file)

Example response:
```json
{
  "success": true,
  "message": "Product created successfully"
}
```

### GET /products/list

Get all products.

Response example:
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": "...",
      "name": "Product 1",
      "image": "1681234567890-product.png",
      "price": 10.5,
      "description": "...",
      "category": "clothing",
      "createdAt": "2026-05-02T...",
      "updatedAt": "2026-05-02T..."
    }
  ]
}
```

### GET /products/category/:category

Get products by category.
- Example: `/products/category/shoes`

Response is the same shape as `/products/list`.

### GET /products/:id

Get a single product by ID.

Response example:
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "id": "...",
    "name": "...",
    "image": "...",
    "price": 99.99,
    "description": "...",
    "category": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### DELETE /products/:id

Delete a product by ID.
- Note: this route is currently unprotected in the backend.

Response example:
```json
{
  "success": true,
  "message": "Product removed successfully"
}
```

---

## Cart

### POST /cart/add

Add an item to the authenticated user cart.
- Protected: requires auth token.

Request body:
```json
{
  "productId": "<product-id>",
  "quantity": 2
}
```

Response example:
```json
{
  "success": true,
  "message": "Item added to cart successfully"
}
```

### DELETE /cart/remove

Remove one unit of a product from the cart.
- Protected: requires auth token.

Request body:
```json
{
  "productId": "<product-id>"
}
```

Response example:
```json
{
  "success": true,
  "message": "Item removed from cart successfully"
}
```

### DELETE /cart/clear

Clear the authenticated user's cart.
- Protected: requires auth token.

Response example:
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

### GET /cart/get

Get the authenticated user's cart data.
- Protected: requires auth token.

Response example:
```json
{
  "success": true,
  "message": "Cart fetched successfully",
  "data": {
    "cartData": {
      "<product-id>": 2,
      "<other-product-id>": 1
    }
  }
}
```

Notes:
- `cartData` is stored as JSON on the user record.
- The value is a map of `productId` to quantity.

---

## Orders

### POST /orders/place

Create a new order for the authenticated user.
- Protected: requires auth token.

Request body:
```json
{
  "items": [
    { "name": "Product 1", "price": 100, "quantity": 2 },
    { "name": "Product 2", "price": 50, "quantity": 1 }
  ],
  "amount": 250,
  "address": "123 Street, City"
}
```

Response example depends on service flow, but should include order creation status.

### POST /orders/verify

Verify payment data.
- Open route (no auth required currently).
- Body is flexible and forwarded to the service.

### GET /orders/userorders

Fetch authenticated user's own orders.
- Protected: requires auth token.

### GET /orders/list

Fetch all orders.
- Open route.

### PATCH /orders/status

Update an order status by ID.
- Request example:
```json
{
  "status": "shipped"
}
```
- URL example: `/orders/status?id=<order-id>`

---

## Notes for Frontend

- Use the returned JWT token in `Authorization` headers for protected calls.
- The backend uses `express.static('uploads')` on `/images` to serve image files.
- Product image URLs should be built as:
  - `http://localhost:3000/images/<image-filename>`
- The backend currently accepts raw `productId` in the `/cart/remove` body rather than path parameter.
- Admin login is separate from users login and checks `isAdmin` on the user record.

## Data Models

### User
- `id`: string
- `name`: string
- `email`: string
- `password`: string (hashed)
- `cartData`: JSON object
- `isAdmin`: boolean
- `orders`: order relationship

### Product
- `id`: string
- `name`: string
- `image`: string (filename)
- `price`: float
- `description`: string
- `category`: string
- `createdAt`: datetime
- `updatedAt`: datetime

### Order
- `id`: string
- `userId`: string
- `items`: JSON
- `amount`: float
- `address`: string
- `status`: string
- `payment`: boolean
- `createdAt`: datetime

---

If you want, I can also add a short example for frontend usage with `fetch` or `axios`. 