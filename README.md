This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



app/
│
├── layout.tsx                     (Root layout – shared layout, metadata, SEO)
├── globals.css                    (Global styles)
│
├── middleware.ts                  (Protect routes + auto redirect logic)
│
├── login/
│   ├── page.tsx                   (Login page UI – client component for form)
│   └── loading.tsx                (Login loading state)
│
├── products/
│   ├── page.tsx                   (SSR product listing page)
│   ├── loading.tsx                (Loading state for SSR)
│   ├── error.tsx                  (Error boundary for product fetch)
│   └── [id]/
│       └── page.tsx               (SSR product detail page)
│
├── cart/
│   └── page.tsx                   (Shopping cart page – client component)
│
├── api/                           (🚨 Your backend layer – required)
│   ├── auth/
│   │   ├── login/
│   │   │   └── route.ts           (POST – call dummyjson login + set cookies)
│   │   ├── refresh/
│   │   │   └── route.ts           (POST – refresh tokens + update cookies)
│   │   ├── me/
│   │   │   └── route.ts           (GET – get logged in user using access token)
│   │   └── logout/
│   │       └── route.ts           (POST – clear cookies)
│   │
│   ├── products/
│   │   ├── route.ts               (GET – products list with pagination/sort)
│   │   ├── categories/
│   │   │   └── route.ts           (GET – product categories)
│   │   └── [id]/
│   │       └── route.ts           (GET – product by ID)
│
├── components/
│   ├── ProductCard.tsx            (Reusable product card UI)
│   ├── Navbar.tsx                 (Navigation bar with logout/cart count)
│   ├── Pagination.tsx             (Pagination component)
│   ├── CategoryFilter.tsx         (Category filter component)
│   └── SortDropdown.tsx           (Sorting component)
│
├── store/
│   └── cartStore.ts               (Redux Toolkit or Context – cart state)
│
├── lib/
│   ├── auth.ts                    (Helper: token validation / cookie utils)
│   ├── fetcher.ts                 (Reusable server fetch wrapper)
│   └── types.ts                   (TypeScript interfaces for products/user)
│
├── tests/
│   ├── login.test.tsx             (Login form tests)
│   ├── cart.test.ts               (Cart reducer tests)
│   └── products.test.ts           (Product page tests)
│
.env                                (Environment variables)