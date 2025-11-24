# Express TypeScript Refactoring Exercise

This project contains a **deliberately poorly structured** Express.js server written in TypeScript. The entire application is in a single file (`src/index.ts`) with multiple code smells and anti-patterns.

## 🎯 Learning Objective

Students should refactor this codebase by extracting and organizing code into proper layers:

### Suggested Refactoring Steps:

1. **Types/Interfaces** (`types/` or `models/`)
   - Extract user type definition
   - Create proper interfaces

2. **DTOs** (Data Transfer Objects) (`dtos/`)
   - Create DTOs for request/response
   - Add validation schemas with zod

3. **Repository Layer** (`repositories/`)
   - Extract data access logic
   - Abstract the in-memory storage
   - Make it easy to swap to a real database later

4. **Service Layer** (`services/`)
   - Extract business logic
   - Implement duplicate checking

5. **Controller Layer** (`controllers/`)
   - Extract route handlers
   - Handle data validation
   - Handle HTTP-specific logic
   - Manage request/response

6. **Routes** (`routes/`)
   - Separate route definitions
   - Connect routes to controllers

## 🚨 Current Problems (Anti-patterns to fix):

- ❌ Everything in one file
- ❌ No type safety (uses `any`)
- ❌ Business logic in route handlers
- ❌ Duplicate code (validation, existence checks)
- ❌ Direct data manipulation in routes
- ❌ No separation of concerns
- ❌ No proper error handling abstraction
- ❌ No DTOs or input validation

## 🚀 Getting Started

### Install dependencies:
```bash
npm install
```

### Run the server:
```bash
npm run dev
```

## 📚 Recommended Architecture

```
src/
├── index.ts              # App entry point (minimal)
├── types/
│   └── user.types.ts     # User interface/type
├── dtos/
│   └── user.dto.ts       # CreateUserDto, UpdateUserDto
├── repositories/
│   └── user.repository.ts # Data access layer
├── services/
│   └── user.service.ts    # Business logic
├── controllers/
│   └── user.controller.ts # Request handlers
└── routes/
    └── user.routes.ts     # Route definitions
```


## 🏗️ Target Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         REQUEST FLOW                             │
└─────────────────────────────────────────────────────────────────┘

HTTP Request
    │
    ▼
┌─────────────────┐
│   index.ts      │  ← App entry point, registers routes
│  (Express App)  │
└────────┬────────┘
         │ app.use('/api', userRoutes)
         ▼
┌─────────────────┐
│  user.routes.ts │  ← Route definitions (URL → Controller mapping)
│   (Router)      │
└────────┬────────┘
         │ router.post('/users', controller.createUser)
         ▼
┌─────────────────┐
│user.controller.ts│ ← Handles HTTP (req/res), calls service, validation
│  (Controller)   │
└────────┬────────┘
         │ service.createUser(dto)
         ▼
┌─────────────────┐
│ user.service.ts │  ← Business logic, calls repository
│   (Service)     │
└────────┬────────┘
         │ repository.create(user)
         ▼
┌─────────────────┐
│user.repository.ts│ ← Data access layer (CRUD operations)
│  (Repository)   │
└────────┬────────┘
         │
         ▼
    In-Memory Array (or Database)
```

### Layer Responsibilities:

| Layer | Responsibility | What it does | What it returns |
|-------|---------------|--------------|-----------------|
| **index.ts** | Application setup | Initializes Express, middleware, registers routes | - |
| **Routes** | URL mapping | Maps HTTP endpoints to controller methods | - |
| **Controller** | HTTP handling | Parses requests, calls services, formats responses, validates data, | HTTP Response |
| **Service** | Business logic |  Checks duplicates, orchestrates operations | Domain objects or errors |
| **Repository** | Data access | CRUD operations on data store | Domain objects or undefined |
| **Types/DTOs** | Data contracts | Defines data structure and validation | - |

## 💡 Tips

- Think about single responsibility principle
- Each layer should have one clear purpose
- Make the code testable 
- Consider what would change if you switched to a real database
- Keep HTTP concerns (req, res) only in controllers
- Business logic should be framework-agnostic

Good luck refactoring!


