# LivePoll System

This is a complete reference project for the **App Security & Full-Stack Integration (LivePoll System)** experiment.

## What is included
- Spring Boot backend in a Spring Initializr style layout
- Spring Security configuration
- JWT-based authentication
- Google OAuth 2.0 login flow
- Role-based access control using `ROLE_USER` and `ROLE_ADMIN`
- `@PreAuthorize` secured endpoints
- Poll creation, listing, voting and poll status toggle APIs
- React frontend integrated with the secured backend
- CORS enabled for frontend-backend communication
- H2 in-memory database for quick testing
- Seeded demo users and a sample poll

## Project structure
- `backend/` → Spring Boot application
- `frontend/` → React + Vite frontend

## Backend setup
1. Open `backend/src/main/resources/application.yml`
2. Add your Google OAuth credentials:
   - `client-id`
   - `client-secret`
3. Run the backend:
   - With Maven installed: `mvn spring-boot:run`
   - Or import the `backend` folder into IntelliJ / Spring Tool Suite and run `LivepollApplication`
4. Backend runs on `http://localhost:8080`

## Frontend setup
1. Open a terminal inside `frontend`
2. Install dependencies:
   - `npm install`
3. Run the app:
   - `npm run dev`
4. Frontend runs on `http://localhost:5173`

## Demo accounts
- Admin:
  - `admin@livepoll.com`
  - `admin123`
- User:
  - `user@livepoll.com`
  - `user123`

## Main endpoints
### Public / auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /oauth2/authorization/google`

### User or Admin
- `GET /api/polls`
- `GET /api/polls/{pollId}`
- `POST /api/polls/{pollId}/vote`
- `GET /api/users/me`

### Admin only
- `POST /api/admin/polls`
- `POST /api/admin/polls/{pollId}/toggle`

## Notes
- Google login requires a Google Cloud OAuth client configured with a valid redirect URI for Spring Security.
- The `backend/mvnw` files are included for a starter-like structure, but because this package was generated offline, you should use your local Maven installation or import the project into an IDE.
- H2 is used so the project can be tested quickly without MySQL or PostgreSQL.
