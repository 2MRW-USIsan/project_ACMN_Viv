# project_ACMN_Viv

Minimal CRUD TODO App

## Overview
This project is a minimal CRUD TODO application.

The goal is to experiment with:
- Clean Architecture
- Domain Driven structure
- Type-safe API development

This project is developed with GitHub Copilot Agent.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- MUI
- Prisma
- SQLite3
- Zod
- Swagger API

## Design Keywords
- Atomic Design
- Clean Architecture
- Domain Driven structure

## Directory Structure
```text
    /src
        /app
            /page.tsx
            /layout.tsx
        /business
        /components
            /atoms
            /molecules
            /organisms
            /template
        /hooks
        /services
        /utils
        /types
```

## Architecture Rules
- business: domain logic
- services: API / database access
- components: UI
- hooks: reusable React hooks
- utils: helper functions
- types: shared types

## Development Rules

- Prefer strict TypeScript typing
- Use Zod for validation
- Keep business logic outside UI components
- Write reusable components