# Property Manager

A Nuxt 3 property management application for landlords, property managers, and tenants. It brings property listings, tenant applications, maintenance requests, and role-based dashboard views into one responsive interface.

## Features

- Browse property listings and details
- Track tenants and applications
- Submit and follow maintenance requests
- Communicate through comments
- Use manager and tenant dashboard views
- Sign in and register

## Stack

Nuxt 3, Vue 3, TypeScript, and the Vue Composition API.

## Run locally

### Requirements

- Node.js version supported by Nuxt 3
- Yarn 1.22.22 (the repository's package manager)

### Install dependencies

```sh
git clone https://github.com/akimzzy/property-manager.git
cd property-manager
yarn install --frozen-lockfile
```

### Start the development server

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and preview

```sh
yarn build
yarn preview
```

## Repository layout

- `pages/` — application routes
- `components/` — reusable interface components
- `assets/css/` — global styles
- `data/` — development data
- `layouts/` — page layouts
- `middleware/` — route middleware
- `nuxt.config.ts` — Nuxt configuration

For framework guidance, see the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).
