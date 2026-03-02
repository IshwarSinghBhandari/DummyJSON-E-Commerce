# Next.js 16 E-commerce Application

This project is a Next.js 16 e-commerce application built using the App Router.
It integrates with the DummyJSON API and demonstrates authentication, server-side rendering, protected routes, state management, and API handling using route handlers.

The application follows the constraints provided in the assignment:
- TypeScript everywhere
- SSR for data fetching
- App Router only
- API integration through /app/api/*
- Secure token handling using httpOnly cookies
- No secrets exposed to the client

------------------------------------------------------------

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Redux Toolkit + redux-persist
- Tailwind CSS
- shadcn/ui

------------------------------------------------------------

## Features Implemented

Authentication
- Login form with validation
- POST /api/auth/login forwards request to DummyJSON
- accessToken and refreshToken stored in httpOnly secure cookies
- GET /api/auth/user fetches current user from token
- Logout clears cookies
- Protected routes using middleware
- Auto redirect:
  - Logged in users → products page
  - Logged out users → login page

Products
- Server-side product fetching using async server components (SSR)
- Server-side category fetching
- Filtering by category
- Search via API
- Sorting via API
- Pagination using limit and skip
- Product details page (dynamic route)

Cart
- Add to cart using Redux Toolkit
- Persistent cart using redux-persist
- Update quantity
- Remove item
- Dedicated cart page

UI
- Fully responsive layout
- Loading states
- Error handling for API failures

------------------------------------------------------------

## API Architecture

All external API calls are proxied through Next.js route handlers under:

/app/api/

This ensures:
- Tokens are never exposed to the client
- Backend URL is hidden
- Centralized error handling

Routes implemented:
- /api/auth/login
- /api/auth/logout
- /api/auth/user
- /api/products
- /api/products/[id]
- /api/categories

------------------------------------------------------------

## Server-Side Rendering

Products and categories are fetched on the server using async server components.

Example pattern:

export default async function Page() {
  const res = await fetch(..., { cache: "no-store" })
}

This ensures:
- SEO-friendly rendering
- Faster initial load
- No sensitive data exposed to client

------------------------------------------------------------

## Middleware Protection

Protected routes are handled using middleware.ts.

- If token is missing → redirect to /login
- If token exists → allow access
- Logged in users are redirected away from login page

------------------------------------------------------------

## State Management

Redux Toolkit is used for:
- Cart state
- Persisted cart across refresh

Authentication state is derived from secure cookies via server calls.

------------------------------------------------------------

## Getting Started

1. Install dependencies

npm install

2. Create .env file in project root

BACKEND_BASE_URL=https://dummyjson.com


3. Run development server

npm run dev

Application runs on:
http://localhost:3000

------------------------------------------------------------

## Scripts

npm run dev     - Start development server  
npm run build   - Build for production  
npm run start   - Start production server  
npm run lint    - Run linter  

------------------------------------------------------------

## Deployment

The application can be deployed on:
- Vercel

Make sure environment variables are configured in the hosting platform.

------------------------------------------------------------

## Notes

- TypeScript is used across the project.
- SSR is used where required.
- Client components are only used when necessary (cart, UI interactivity).
- No secrets are exposed to the client.
- All API calls are routed through Next.js route handlers.
