# Flex by net2phone — AI Agent Builder

A Next.js landing page and interactive demo for **Flex**, an AI agent builder that lets you create voice + chat agents with a real phone number in under 4 minutes. No credit card required.

## Overview

Flex helps you build custom AI agents that answer calls, handle chats, and take action 24/7. Describe what you need in plain English, connect your tools, and Flex builds and deploys the agent with a real phone number.

### Features

- **Zero code** — Describe your needs; Flex handles the engineering
- **Real phone number** — Agents get a live number for calls and SMS
- **Native integrations** — Gmail, Google Calendar, Salesforce, Slack, Outlook, Teams, Excel, and more
- **24/7 availability** — Never miss a call or chat
- **Multilingual** — 100+ languages out of the box

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS, Radix UI
- **Animations:** Framer Motion, GSAP, Three.js
- **Icons:** Lucide React
- **Fonts:** Unbounded, JetBrains Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout, metadata, fonts
│   ├── page.tsx        # Main page: hero + onboarding flow
│   └── globals.css     # Global styles
├── components/
│   ├── landing/        # Landing page sections (Hero, Integrations, Trust, etc.)
│   ├── onboarding/     # 5-step onboarding wizard
│   ├── ui/             # Reusable UI components
│   └── demo/           # Demo components
├── lib/
│   └── utils.ts        # Utility functions
└── public/
    └── icons/          # Integration icons (Gmail, Slack, etc.)
```

## Onboarding Flow

The app includes a 5-step onboarding wizard:

1. **Intent** — Describe what your agent should do (e.g., answer customer questions, schedule demos)
2. **Tools** — Connect integrations (Gmail, Salesforce, Slack, etc.)
3. **Questions** — Answer context questions to customize the agent
4. **Account** — Enter your details (name, email, company website)
5. **Reveal** — Summary and completion

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

```bash
npm run build
```

Then deploy the `.next` output to your preferred hosting platform. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## License

Private — net2phone
