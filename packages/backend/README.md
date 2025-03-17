### Backend `package.json` Scripts Description

- **`prebuild`** → Cleans the `dist` directory before building (`rimraf dist`).
- **`build`** → Compiles TypeScript files into JavaScript (`npx tsc`).
- **`start`** → Runs the compiled backend server (`node dist/index.js`).
- **`dev`** → Starts the backend in development mode with hot reloading (`nodemon --watch src --ext ts --exec ts-node src/index.ts`).
- **`check-ts`** → Runs TypeScript type checking (`tsc`).
- **`test`** → Runs all tests once (`vitest run`).
- **`test:watch`** → Runs tests in watch mode (`vitest`).
- **`test:coverage`** → Runs tests and generates a coverage report (`vitest run --coverage`).

---

### **Environment Configuration**
Default environment variables:
```dotenv
PORT=4000
CORS_ORIGIN=http://localhost:3000
```
To customize these values, copy `.env.example` to `.env` and modify as needed.
