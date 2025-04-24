# Property Manager

A modern property management application built with Nuxt 3 and Vue.js. This app streamlines property listings, tenant management, maintenance requests, and more for landlords, property managers, and tenants.

## Features

- Property listing and details view
- Tenant management and application tracking
- Maintenance request submission and tracking
- Comment sections for communication
- Dashboard views for managers and tenants
- User authentication (login/register)
- Responsive UI with reusable components

## Tech Stack

- [Nuxt 3](https://nuxt.com/) (Vue 3 framework)
- TypeScript
- Composition API
- CSS (custom styles in `/assets/css/main.css`)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm, yarn, pnpm, or bun

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
https://github.com/your-username/property-manager.git
cd property-manager

# Install dependencies (choose one)
npm install
yarn install
pnpm install
bun install
```

### Development

Start the development server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
yarn dev
pnpm dev
bun run dev
```

### Production

Build for production:

```bash
npm run build
yarn build
pnpm build
bun run build
```

Preview the production build locally:

```bash
npm run preview
yarn preview
pnpm preview
bun run preview
```

## Project Structure

- `pages/` — Main application pages (dashboard, properties, tenants, etc.)
- `components/` — Reusable Vue components (modals, cards, UI elements)
- `assets/css/` — Global styles
- `data/` — Mock data for development
- `layouts/` — Application layouts
- `middleware/` — Route middleware (e.g., authentication)
- `nuxt.config.ts` — Nuxt configuration

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

For more details, see the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction).
