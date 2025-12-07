# Bishal's Portfolio

A personal portfolio built with React, TypeScript and Vite, showcasing projects, skills and a contact form that sends email via a small serverless API.

## Features

- Interactive hero, projects, experience, and skills sections
- Live chart and trading-themed visuals
- Contact form that sends messages using an email API (`/api/send-email`)
- Smooth animations using Framer Motion and accessible UI with Chakra UI

## Tech Stack

- React 18 + TypeScript
- Vite for dev server and bundling
- Chakra UI + Emotion for styling
- Framer Motion for animations
- Nodemailer for server-side email sending

## Project Structure (important files)

- `index.html` — HTML entry
- `src/` — React app source
  - `src/App.tsx`, `src/main.tsx` — app entry
  - `src/components/` — UI components (Hero, Projects, Contact, etc.)
- `api/send-email.ts` — API route that sends emails using Nodemailer
- `package.json` — scripts and dependencies

## Getting Started

Prerequisites

- Node.js (recommend v18 or later)
- npm or yarn

Install

```bash
git clone https://github.com/xor09/Portfolio.git
cd bishal-portfolio
npm install
```

Run in development

```bash
npm run dev
```

Build for production

```bash
npm run build
npm run preview
```

## Environment Variables

The contact API (`api/send-email.ts`) expects the following environment variables. Create a `.env` file at the project root (do not commit secrets):

```env
# SMTP server settings used by nodemailer
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=supersecretpassword

# Destination address to receive contact form emails
CONTACT_TO_EMAIL=you@domain.com
```

- `SMTP_HOST`: SMTP server hostname (e.g., `smtp.sendgrid.net` or your provider)
- `SMTP_PORT`: SMTP port (defaults to `587` when omitted)
- `SMTP_USER`: SMTP username (used as the sender address)
- `SMTP_PASS`: SMTP password or API key
- `CONTACT_TO_EMAIL`: the email that will receive contact form messages

If you deploy to a hosting platform (Vercel, Netlify, etc.), set these environment variables in the project settings for that platform.

## Contact API Usage

POST `/api/send-email`

Request JSON body:

```json
{
  "name": "Your name",
  "email": "you@example.com",
  "subject": "Message subject",
  "message": "Hello!"
}
```

Example with curl:

```bash
curl -X POST 'http://localhost:5173/api/send-email' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Alice","email":"alice@example.com","subject":"Hi","message":"Hello from curl"}'
```

The API returns JSON with a `message` describing success or failure.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck and build for production
- `npm run preview` — preview the production build

## Contributing

If you'd like to contribute, open an issue or pull request. For code changes, follow common practices: fork, create a branch, run and test locally, then open a PR.

## License

This repository does not include a license file. Add one if you plan to make the project public under a specific license.

## Questions / Contact

If you need help configuring the SMTP settings or deployment, open an issue or contact the repository owner.
