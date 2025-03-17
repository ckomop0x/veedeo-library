### **Frontend `package.json` Scripts Description**

- **`dev`** → Runs the Next.js development server (`next dev`).
- **`build`** → Builds the Next.js application for production (`next build`).
- **`start`** → Starts the production server (`next start`).
- **`lint`** → Runs ESLint to check for code style issues (`next lint`).
- **`check-ts`** → Runs TypeScript type checking (`tsc`).
- **`test`** → Runs all tests once (`vitest run --passWithNoTests`).
- **`test:watch`** → Runs tests in watch mode (`vitest`).
- **`test:coverage`** → Runs tests and generates a coverage report (`vitest run --passWithNoTests --coverage`).

---

### **Environment Configuration**
Default environment variables:
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000
```
To customize these values, copy `.env.example` to `.env.local` and modify as needed.
