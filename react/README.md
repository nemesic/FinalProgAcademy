# FinalProgAcademy

Final front-end project for Prog.Academy.

This project is a responsive wellness e-commerce website inspired by LYMA. It includes a landing page, product pages, journal, support page, account page, and cart page.

## Language

- JavaScript (ES6+)

## Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- CSS
- ESLint
- LocalStorage
- Fetch API

## Pages

- Home
- Supplement
- Laser
- Journal
- About
- Help & Support
- Account
- Cart

## Features

- SPA navigation with React Router
- Product gallery with thumbnails
- Add to cart
- Quantity controls for products
- Cart with total price calculation
- Account login and logout
- Smooth scroll navigation between sections
- Responsive layout
- Modal windows and animated transitions

## API

API is used only in:

- Reviews
- Journal

The Journal page loads posts from an external API, and the Reviews section also works with API data.

## LocalStorage

LocalStorage is used only in:

- Cart
- Account

Cart data is stored in LocalStorage so products stay saved after reload. Account state is also stored there to keep login status.

## Run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Notes

- Reviews and Journal are the only parts connected to API.
- Cart and Account work through LocalStorage.
- The rest of the project is built with React components and custom styling.