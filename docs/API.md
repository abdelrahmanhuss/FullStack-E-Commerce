# API Summary

## Base URL

- Local development backend: `http://localhost:4000`

## Authentication

- Use `Authorization: Bearer <jwt-token>` for protected routes.
- User token is returned by `POST /users/login` and `POST /users/signup`.
- Admin token is returned by `POST /admin/login`.

## Main endpoints

### Users

- `POST /users/signup`
- `POST /users/login`
- `GET /users/list` — admin only
- `DELETE /users/delete/:id` — admin only
- `POST /users/make-admin/:id` — admin only
- `POST /users/demote/:id` — admin only

### Admin

- `POST /admin/login`

### Products

- `POST /products/add` — admin only, multipart form upload
- `GET /products/list`
- `GET /products/category/:category`
- `GET /products/:id`
- `DELETE /products/:id` — admin only

### Cart

- `POST /cart/add` — protected
- `DELETE /cart/remove` — protected
- `DELETE /cart/clear` — protected
- `GET /cart/get` — protected

### Orders

- `POST /orders/place` — protected
- `POST /orders/verify`
- `GET /orders/userorders` — protected
- `GET /orders/list` — admin only
- `PATCH /orders/status/:id` — admin only

### Notifications

- `POST /notifications` — admin only
- `GET /notifications/list` — admin only
- `DELETE /notifications/delete/:id` — admin only
- `DELETE /notifications/clear` — admin only
- `PATCH /notifications/read/:id` — admin only

## Notes

- Product images are served from: `http://localhost:4000/images/<filename>`.
- For full API request and response examples, see `back/API_DOCUMENTATION.md`.
