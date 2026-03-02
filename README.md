# Outfit - Premium Fashion & Lifestyle E-commerce

A high-end e-commerce platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## 🚀 Technical Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using OKLCH color space)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (customized via Shadcn patterns)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏗️ Architecture & Coding Standards

### 1. Component Folders (`src/components/`)
We use a hierarchical component structure to ensure maintainability:
- **`ui/`**: Low-level atomic primitives (Button, Input, Checkbox). These should be purely presentational.
- **`common/`**: Cross-feature UI elements like `SectionHeader` or `CategoryNavBar`.
- **`layout/`**: Global structures like `Navbar`, `Footer`, and `AccountSidebar`.
- **`sharedcomponent/`**: Reusable business components like `Newsletter`.
- **Feature-Specific (`home/`, `auth/`, `billing/`, `wallet/`)**: Components that are only relevant to specific routes.

### 2. Custom Hooks (`src/hooks/`)
All complex state or logic shared across components must reside here.
- **Naming Rule**: Always use `camelCase` (e.g., `useCarousel.ts`).
- **Separation**: Components only handle JSX/Styling; Hooks handle state/logic.
- **Current Hooks**: `useCarousel`, `useClickOutside`, `useCountryFilter`, `useLocalStorage`, `useMediaQuery`, `useCyclicIndex`.

### 3. Validation Schemas (`src/schemas/`)
All user-facing forms must be validated using Zod.
- **`auth.schema.ts`**: Handles email format and password strength.
- **`billing.schema.ts`**: Ensures address and contact data integrity.
- **`misc.schema.ts`**: Newsletter and secondary forms.

### 4. API Service Layer (`src/services/`)
- **`apiClient.ts`**: Primary requester.
- **`withAuth` Wrapper**: **Critical.** When making protected API calls, wrap the method: `withAuth(api.get)("/endpoint")`. This automatically injects the Bearer token from `localStorage`.

---

## 🔮 Handling Future Updates (Crucial for AI & Developers)

### ⚙️ Adding New Features
1. **Define Data**: Add your types to `src/types/index.ts`.
2. **Define Validation**: Create a schema in `src/schemas`.
3. **Logic First**: If the feature has complexity, create a hook in `src/hooks`.
4. **Service**: Add a method in `src/services` to handle the backend interaction.
5. **UI**: Build the component in the appropriate feature folder using Tailwind v4 variables.

### 🎨 Styling & Design System
- **Colors**: Never use hardcoded hex values in complex components. Use the CSS variables defined in `src/app/globals.css` (e.g., `bg-primary`, `text-muted-foreground`).
- **Typography**: The project uses **Outfit**, **Readex Pro**, and **Poppins**. Ensure heading hierarchy is consistent.
- **Theming**: Dark mode is handled via the `.dark` class in `globals.css` and OKLCH variable overrides.

### 🔐 Authentication Flow
- **OTP-Based Login**:
  - `initiateLogin`: Requests an OTP for a given email.
  - `confirmLogin`: Validates OTP and returns a session payload (`accessToken`, `idToken`, `refreshToken`).
- **Session Management**:
  - Global state is managed in `src/lib/auth-context.tsx`.
  - To protect a page, wrap the component content with the `<ProtectedRoute>` component.
- **Token Infrastructure**:
  - `accessToken`: Short-lived token for API authorization.
  - `refreshToken`: Long-lived token used to obtain new access tokens via the `/refresh-token` endpoint.

### 🛡️ Token Management & Security
- **Storage**: Currently, tokens are stored in `localStorage`. 
  - *Note*: While convenient, this is susceptible to XSS. For production, consider transitioning to `HttpOnly` cookies.
- **Token Rotation**: The `refreshToken` API implements rotation—each refresh request generates a *new* refresh token. Always update the stored token with the latest one from the response.
- **Automatic Refresh**: The `apiClient.ts` handles the background refresh logic using the `refreshToken` service when an `accessToken` expires.
- **Security Best Practices**:
  - **HTTPS Only**: Tokens must never be transmitted over unencrypted connections.
  - **Cleanup**: On logout or session expiration (401/403 errors), all tokens and user data must be cleared from storage.
  - **Sanitization**: Maintain a strict Content Security Policy (CSP) to mitigate XSS risks associated with `localStorage`.

### 📡 API Transitions
- Currently, most data is mocked or static.
- When connecting a real backend, update the `NEXT_PUBLIC_API_URL` in `.env`.
- Ensure all services in `src/services` use the `api` object (raw) or `withAuth(api)` (protected) appropriately.

---
*This documentation is the source of truth for the codebase architecture. All new code must align with these patterns to maintain a premium and modern UI flow.*
