# Video Library

## Overview

A sample video library web app.

## Tech stack

- **Backend**: Express/tRPC
- **Database**: Kysely (with PostgreSQL)
- **Frontend**: React/Tailwind CSS

## Setup instructions

### Prerequisites

- Node.js (>= v23.6.0 due to TypeScript support)
- PostgreSQL (>= v6.0)
- npm globally installed

### Installation

```bash
# Clone the repository
git clone https://github.com/oddlyfunctional/video-library.git

# Navigate into the project directory
cd video-library

# Install dependencies
npm install
```

### Running in development mode

1. Setup your environment variables (the database credentials in particular are necessary):

```
# Copy the .env template
cp .env.example .env

# Then edit .env
```

2. Prepare the database:

```
npm run db:dev:prepare
```

3. Run the development servers:

```
npm run dev
```

### Running tests

1. Setup your environment variables (the database credentials in particular are necessary):

```
# Copy the .env template
cp .env.example .env.test

# Then edit .env.test
```

2. Prepare the database:

```
npm run db:test:prepare
```

3. Run the tests:

```
# Runs tests once:
npm test

# Runs tests and keep watching for changes, ideal for development:
npm run test:dev
```

## Future improvements

- Transpile server code to relax Node.js version requirements
- Consider doing Server-Side Rendering
- Setup react-router to Framework mode for type-safe routes and improve code-splitting (consider changing to `@tanstack/react-router`)
- Evaluate and improve A11y
- Better handle loading states (prettier UI, define minimum time for showing spinner)
- Standardize folder structure
- Write integration and e2e tests
- Verify performance for video list on large datasets (perhaps add pagination and/or virtualization)
- Setup production build (right now there's no easy way to serve the static assets once built)
- Write `Dockerfile` for easy deployment
