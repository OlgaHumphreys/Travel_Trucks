# TravelTrucks

Frontend for a camper van rental service. Built with React, Vite, Redux Toolkit, React Router, and Axios. Browse the catalog, filter by location/vehicle type/equipment, save favorites, view camper details with photo galleries and reviews, and submit a booking request.

## Tech stack

- **React 19 + Vite** — app shell and dev server
- **Redux Toolkit** — global state for the camper list, active filters, and favorites
- **React Router** — `/`, `/catalog`, `/catalog/:id`
- **Axios** — API requests to the camper backend
- **react-toastify** — success notification on booking submission
- Plain CSS with design tokens (CSS custom properties) — no UI framework dependency

## Getting started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Run in development
```bash
npm run dev
```
Opens at `http://localhost:5173` by default.

### Build for production
```bash
npm run build
```
Outputs to `dist/`.

### Preview the production build locally
```bash
npm run preview
```

## Project structure

```
src/
  api/            Axios instance + API calls
  components/     Reusable UI pieces (Layout, Hero, CamperCard, FilterBar, Gallery, ReviewList, BookingForm, Loader)
  pages/          Route-level pages (HomePage, CatalogPage, CamperDetailsPage)
  redux/          Redux Toolkit slices: campers, filters, favorites + store config
  utils/          Shared helpers (price formatting, equipment filtering, label maps)
```

## Notes on implementation

- **Filtering**: Location and vehicle type are sent as query params to the API. Equipment filters (AC, kitchen, etc.) are applied client-side after fetching, since the mock API backend doesn't reliably support multi-key boolean filtering on its free tier.
- **Favorites**: Stored in `localStorage` under the key `travelTrucks.favorites`, so they persist across page reloads.
- **Load More**: Preserves the currently selected filters and appends the next page of results to the existing list.
- **New filter search**: Previously loaded results are cleared before a new filtered search request is made, per the assignment's requirement.
- **Price formatting**: Whole-number prices from the API (e.g. `8000`) are displayed with two decimal places (`8000.00`).

## Deployment

Deployed on **Vercel**. Build command: `npm run build`. Output directory: `dist`.

The `vercel.json` in the project root rewrites all routes to `/index.html` so that React Router paths (`/catalog`, `/catalog/:id`) work correctly on the live URL.

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Deploy via Vercel Dashboard

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the repository — Vite is detected automatically.
4. Click **Deploy**.

Every subsequent `git push` to `main` triggers a new deployment automatically.
