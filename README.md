# TesloShop

This is a Next.js project bootstrapped with `pnpm create next-app --typescript`.

## Features

⚡️ Next.js v13\
⚡️ Zustand\
⚡️ TailwindCSS\
⚡️ NextAuth\
⚡ Docker

## Getting Started

### .env

Create `.env` file based on `.env.template`

### Run the development server with Docker 🐳 :

```bash
# install pnpm
npm i -g pnpm

# install deps
pnpm i

# run docker contaniers
docker compose -f docker-compose.dev.yml up --build

# run dev server
pnpm run dev

# stop and remove containers & networks
docker compose -f docker-compose.dev.yml down

```

#### Executing SEED

```bash
# HTTP Get request

curl http://localhost:3000/api/seed
```

### Run the production server with Docker 🐳 :

```bash
# run db
docker compose -f docker-compose.dev.yml up --build

# Executing SEED: HTTP Get request
curl http://localhost:3000/api/seed

# docker compose
docker compose up --build -d

```

## View demo

To see the real-time behavior you can log in with:

- User: `alex1@gmail.com` and password `123123`
- User: `alex2@gmail.com` and password `123123`

<a href="https://adralx-airbnb-nextjs.vercel.app" target="_blank">Demo</a>

### Screenshots

![Admi](.screenshots/home.png)



| | | 
|:-------------------------:|:-------------------------:|
| <img width="1604" src=".screenshots/login.png">    |  <img width="1604" src=".screenshots/listing_1.png"> 
| <img width="1604" src=".screenshots/search.png">    |  <img width="1604" src=".screenshots/datepicker.png"> 
| <img width="1604" src=".screenshots/airbnb-your-home.png">    |  <img width="1604" src=".screenshots/listing_2.png"> 