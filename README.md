# NextJS To-do

A simple task organization application built using the new router, server components and everything new in Next.js 13.


## About this project

This project as an experiment to see how a modern app (with features like authentication, subscriptions, ...etc) would work in Next.js 13 and server components.


## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Metadata files
- Server and Client Components
- Authentication using **NextAuth.js**
- ORM using **Drizzle**
- Database on **Vercel Postgres**
- UI Components built using **Shadcn UI**
- Styled using **Tailwind CSS**
- Written in **TypeScript**


## Roadmap

- [ ] Validations using Zod
- [ ] Create lists to organize your tasks
- [ ] Subscriptions using Stripe
- [ ] Themes and dark mode


## Known Issues

A list of things not working right now:

1. probably at least one thing. Come back later 😊


## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
