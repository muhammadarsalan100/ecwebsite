# MegaMart — Premium Fashion & Lifestyle E-commerce

A high-end e-commerce platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) — App Router |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) — OKLCH color space |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) via Shadcn patterns |
| Validation | [Zod](https://zod.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) (cart + config stores) |

---

## 🗂️ Project Structure

```
src/
├── app/                  # Next.js App Router pages & layouts
├── assets/               # Static assets (images, fonts)
├── components/
│   ├── ui/               # Atomic primitives (Button, Input, Checkbox)
│   ├── common/           # Cross-feature UI (ProductCard, SectionHeader)
│   ├── layout/           # Global structures (Navbar, Footer)
│   ├── auth/             # Auth flows + ProtectedRoute
│   ├── home/             # Homepage-specific components
│   └── ...               # Feature-specific folders
├── constants/            # ⭐ Single source of truth for all magic strings
│   └── index.ts          # STORAGE_KEYS, API_ROUTES, APP_CONFIG, USER_ROLES
├── hooks/                # Custom React hooks
├── lib/
│   ├── auth-context.tsx  # Global auth state provider
│   ├── store/
│   │   ├── cartStore.ts  # Zustand cart store (persisted)
│   │   └── configStore.ts# Zustand config store (countries, categories)
│   └── utils.ts
├── schemas/              # Zod validation schemas
├── services/             # API service modules
│   ├── apiClient.ts      # Core HTTP client with auto auth & token refresh
│   ├── authService.ts    # Auth & user API calls
│   ├── productService.ts # Catalog & product API calls
│   ├── billingService.ts # Billing API calls
│   └── vendorService.ts  # Vendor API calls
└── types/                # TypeScript type definitions
```

---

## 🔑 Constants System (`src/constants/index.ts`)

All magic strings and configuration values are **centralised here**. Never use raw strings for localStorage keys, API routes, roles, or config defaults anywhere else in the codebase.

```typescript
import { STORAGE_KEYS, API_ROUTES, APP_CONFIG, USER_ROLES } from "@/constants";
```

### `STORAGE_KEYS` — localStorage keys
| Constant | Value | Purpose |
|---|---|---|
| `STORAGE_KEYS.USER_DATA` | `"user_data"` | Full user object snapshot |
| `STORAGE_KEYS.AUTH_TOKEN` | `"auth_token"` | Active Bearer token |
| `STORAGE_KEYS.ID_TOKEN` | `"id_token"` | Identity token |
| `STORAGE_KEYS.REFRESH_TOKEN` | `"refresh_token"` | Long-lived token for renewal |
| `STORAGE_KEYS.USER_EMAIL` | `"user_email"` | Identifies user vs guest session |
| `STORAGE_KEYS.CART` | `"cart-storage"` | Zustand cart persistence key |
| `STORAGE_KEYS.CONFIG` | `"config-storage"` | Zustand config persistence key |

### `API_ROUTES` — backend endpoint paths
All `authService` methods, `apiClient` internals, and any direct `fetch` calls must reference `API_ROUTES.*` instead of inline strings. Changing a URL only requires editing this file.

### `APP_CONFIG` — application defaults
| Constant | Value |
|---|---|
| `APP_CONFIG.DEFAULT_COUNTRY` | `"UAE"` |
| `APP_CONFIG.DEFAULT_CURRENCY` | `"AED"` |
| `APP_CONFIG.DEFAULT_LANGUAGE` | `"English"` |

### `USER_ROLES` — role identifiers
| Constant | Value |
|---|---|
| `USER_ROLES.GUEST` | `"PlatformGuests"` |
| `USER_ROLES.CUSTOMER` | `"PlatformCustomers"` |
| `USER_ROLES.VENDOR` | `"PlatformVendors"` |
| `USER_ROLES.ADMIN` | `"PlatformAdmins"` |

---

## 🌐 API Service Layer (`src/services/`)

All services call `api.get / api.post / api.put / api.patch / api.delete` from `apiClient.ts`. **You never need to manually inject tokens or headers.**

### Adding a new API call

```typescript
// src/services/authService.ts
import { api } from "./apiClient";
import { API_ROUTES } from "@/constants";

export const authService = {
    // ... other methods
    getAddresses: () =>
        api.get<AddressListResponse>(API_ROUTES.CUSTOMER_ADDRESS),

    createAddress: (payload: CreateAddressPayload) =>
        api.post<ApiResponse<any>>(API_ROUTES.CUSTOMER_ADDRESS, payload),

    updateAddress: (payload: { data: Address }) =>
        api.put<ApiResponse<any>>(API_ROUTES.CUSTOMER_ADDRESS, payload),
};
```

> **Rule:** Add the endpoint path to `API_ROUTES` in `src/constants/index.ts` first, then reference it from the service. Never hard-code URLs inline.

---

## 📍 Customer Address Management

The platform supports full CRUD for customer delivery addresses. Addresses are managed globally via `AuthContext` to ensure synchronization across the Navbar, Cart, and Account pages.

### API Endpoints (`API_ROUTES.CUSTOMER_ADDRESS`)

| Method | Purpose | Payload Type |
|---|---|---|
| **GET** | Fetch all saved addresses | `AddressListResponse` |
| **POST** | Create a new address | `CreateAddressPayload` |
| **PUT** | Update an existing address | `{ data: Address }` |

### Key Payload Structure (Create/Update)

```json
{
    "data": {
        "type": 1, 
        "label": "Home",
        "address": "Street / Flat / House",
        "building": "Al Yasmeen Tower",
        "roomNo": "905",
        "countryId": 2,
        "stateId": 1,
        "cityId": 1,
        "mobileNumber": "0097150...",
        "landmark": "Near BrandsForLess",
        "pinCode": "010",
        "default": true
    }
}
```

### Components Involved
- **`src/components/cart/AddressModal.tsx`**: The main UI for adding and editing addresses. It handles form state, location fetching (countries/states/cities), and submission logic.
- **`src/components/layout/navbar/LocationSelector.tsx`**: Displays the active address list in the header and provides entry points for creation/editing.
- **`src/lib/auth-context.tsx`**: Provides `addAddress` and `updateAddress` methods that automatically refresh the global `addresses` state.

---

## 📱 Device Management

### Update Device Key (`API_ROUTES.DEVICE_KEY`)

Used to register a unique identifier for the user's current device (e.g., for push notifications or security).

| Method | Payload Type |
|---|---|
| **PUT** | `{ data: { deviceKey: string } }` |

```json
{
    "data": {
        "deviceKey": "asasasa1"
    }
}
```

---

## 🔐 Authentication Architecture

### Session Types

| Session | Role | How obtained |
|---|---|---|
| **Guest** | `PlatformGuests` | Auto-created on first visit |
| **Customer** | `PlatformCustomers` | OTP login flow |
| **Vendor** | `PlatformVendors` | Vendor registration |

### Auth Flow (OTP-based)

```
1. initiateLogin(email)  → backend sends OTP to email
2. confirmLogin(email, sessionId, otp)
   → returns { accessToken, idToken, refreshToken, user }
3. login(userData) in auth-context
   → stores tokens in localStorage
   → calls refreshUser() in background to fetch full profile
   → router.push("/")
```

### Protecting a Page

Wrap any page that requires authentication with `<ProtectedRoute>`:

```tsx
// src/app/(site)/account/page.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AccountPage() {
    return (
        <ProtectedRoute>
            <AccountContent />
        </ProtectedRoute>
    );
}
```

`ProtectedRoute` watches `isAuthenticated` and `isLoading`. When `!isLoading && !isAuthenticated`, it redirects to `/auth` automatically.

---

## 🛡️ Token Management & `apiClient.ts`

### Automatic Token Injection

On every request, `apiClient` automatically:
1. Reads `STORAGE_KEYS.AUTH_TOKEN` from localStorage → attaches as `Authorization: Bearer <token>`
2. Checks for `STORAGE_KEYS.USER_EMAIL` (or falls back to `user_data.email`) to distinguish user vs guest
3. For **guest requests**, injects the static `x-guest-token` header

### 401 Recovery — Automatic Silent Handling

| Scenario | Recovery |
|---|---|
| Logged-in user, access token expired | Silently calls `/refresh-token` with `user_email` + `refresh_token` → stores new tokens → retries original request — **user never notices** |
| Logged-in user, refresh token also expired | Clears all auth from localStorage → `window.location.href = "/"` → app re-initialises as guest |
| Guest session expired | Silently calls `/guest-session` → stores new guest token → retries original request |

### Concurrent Request Queueing

When multiple requests fire simultaneously and all receive a `401`, only **one** token refresh is performed. All other requests are queued via `subscribeTokenRefresh()` and retried automatically once the new token is ready. This prevents thundering-herd token refresh races.

### Email Fallback in 401 Handler

The `user_email` localStorage key determines whether a session belongs to a real user (triggering token refresh) or a guest (triggering guest re-auth). If `user_email` is absent but `user_data` contains an email, `apiClient` falls back to reading it from there — ensuring the refresh always works even if the login response didn't include an email field directly.

---

## ⚡ `useLocalStorage` Hook — Cross-Tab Sync

`src/hooks/useLocalStorage.ts` is used by `auth-context.tsx` to persist the user object. It has been extended with a native `window "storage"` event listener.

**What this means:**
- The browser fires `"storage"` events in **all other tabs** whenever a tab writes to localStorage
- When **Tab A logs out**, Tab B's React state (`user`, `isAuthenticated`) updates **instantly** — no page reload needed
- When **Tab A's token refreshes**, Tab B's next API call automatically picks up the new token from localStorage

### Cross-Tab Logout Behaviour

```
Tab A: logout()
  → clears localStorage (user_data, auth_token, refresh_token, user_email)
  → establishes fresh guest session
  → router.push("/auth")

Tab B (automatic, via storage event):
  → user = null, isAuthenticated = false
  
  If Tab B is on a PROTECTED page:
    → ProtectedRoute detects !isAuthenticated → router.push("/auth") ✓
  
  If Tab B is on a PUBLIC page:
    → Cross-tab recovery useEffect fires → guestLogin() called
    → Tab B continues browsing as a guest ✓
```

---

## 🔁 Auth Lifecycle — All Scenarios

| Scenario | What happens |
|---|---|
| **First visit (no data)** | `initializeAuth` → `guestLogin()` → guest session stored |
| **First visit, multiple tabs** | Each tab independently gets a guest session (harmless) |
| **Returning user (tokens valid)** | `initializeAuth` → `refreshUser()` → `getAccount()` succeeds → profile updated |
| **Returning user after 10–12h (access token expired)** | `getAccount()` → 401 → silent token refresh → retry → user stays logged in |
| **Returning user (both tokens expired)** | Refresh fails → hard logout → redirect to `/` → guest session |
| **Logged in, multiple tabs, one logs out** | All tabs reflect logged-out state via `storage` event; protected pages redirect |
| **Network offline on open** | `guestLogin()` throws → caught gracefully → `isLoading = false` → app renders |
| **User clears browser storage manually** | `user = null` → treated as fresh visit → guest session |

---

## 🏗️ Architecture & Coding Standards

### 1. Component Folders (`src/components/`)
- **`ui/`** — Low-level atomic primitives (Button, Input). Purely presentational.
- **`common/`** — Cross-feature UI (`ProductCard`, `SectionHeader`, `CategoryNavBar`).
- **`layout/`** — Global structures (`Navbar`, `Footer`, `AccountSidebar`).
- **`auth/`** — Auth flows and `ProtectedRoute`.
- **Feature folders** (`home/`, `billing/`, `wallet/`) — Only relevant to a specific route.

### 2. Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useLocalStorage` | localStorage ↔ React state sync with cross-tab support |
| `useCarousel` | Carousel index and scroll state |
| `useClickOutside` | Detects clicks outside a ref |
| `useCountryFilter` | Country list filtering logic |
| `useCyclicIndex` | Cyclic counter for carousels |
| `useDebounce` | Debounced value for search inputs |
| `useMediaQuery` | Responsive breakpoint detection |

### 3. Validation Schemas (`src/schemas/`)
All user-facing forms must be validated with Zod before submission.
- **`auth.schema.ts`** — Email format, OTP format
- **`billing.schema.ts`** — Address and contact data
- **`misc.schema.ts`** — Newsletter and secondary forms

### 4. Zustand Stores (`src/lib/store/`)
- **`cartStore.ts`** — Cart items, persisted under `STORAGE_KEYS.CART`
- **`configStore.ts`** — Countries, states, cities, categories, currencies, persisted under `STORAGE_KEYS.CONFIG`

Both stores use `zustand/middleware`'s `persist` with `createJSONStorage(() => localStorage)`.

---

## 🎨 Styling & Design System

- **Colors**: Use CSS variables from `src/app/globals.css` (e.g. `bg-primary`, `text-muted-foreground`). Never hard-code hex values.
- **Typography**: **Outfit**, **Readex Pro**, **Poppins**. Maintain consistent heading hierarchy.
- **Dark Mode**: Handled via the `.dark` class with OKLCH variable overrides in `globals.css`.
- **Animations**: All transitions use Framer Motion. Use `layout` and `AnimatePresence` for mounting/unmounting.

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | Base URL of the backend API |
| `NEXT_PUBLIC_GUEST_TOKEN` | ✅ | Static token for guest session requests |
| `NEXT_PUBLIC_SECURE_TOKEN` | ✅ | Token for account registration endpoints |

---

## 🔒 Security Notes

- **localStorage**: Tokens are stored in `localStorage`. For production hardening, consider transitioning to `HttpOnly` cookies to mitigate XSS risk.
- **Token Rotation**: Every refresh generates a new `refresh_token`. `apiClient` always stores the latest token from the refresh response.
- **HTTPS Only**: Tokens must never be transmitted over unencrypted connections.

---

## 🛠️ Adding New Features — Checklist

1. **Types** → Add to `src/types/`
2. **Constants** → Add API routes to `API_ROUTES` in `src/constants/index.ts`
3. **Schema** → Add Zod schema to `src/schemas/` if user input is involved
4. **Service** → Add a method to the relevant service in `src/services/`
5. **Hook** → Create a hook in `src/hooks/` if the logic is reusable
6. **Component** → Build in the appropriate feature folder, using CSS variables for styling
7. **Protection** → Wrap with `<ProtectedRoute>` if the page requires authentication

---

## 🛠️ Future Roadmap & Planned Improvements

To further enhance the application's stability and user experience, the following technical improvements are planned for future implementation:

### 1. API Client Resilience (`apiClient.ts`)
- **Request Timeouts**: Implement a global 20-30 second timeout for all API requests using `AbortController` to prevent permanent UI hangs during network stalls.
- **Refresh Deadlock Fix**: Update the `refreshSubscribers` queue to handle failure cases. Currently, if a token refresh fails, queued requests may stay "pending" indefinitely. The fix will ensure all subscribers are notified (rejected) if a refresh cycle fails.
- **Global Retry Logic**: Add a lightweight retry mechanism (e.g., 2-3 attempts with backoff) for idempotent `GET` requests, especially for critical initialization data like categories and country configurations.

### 2. Data Fetching Stability (`configStore.ts`)
- **Resilient Category Fetching**: Implement a retry pattern for `fetchCategories` to gracefully recover from transient server errors or large payload transfer timeouts.
- **Unified Error Boundary**: Standardize how API timeouts and "No Response" scenarios are surfaced to the user, replacing generic "An error occurred" messages with actionable "Retry" prompts.

---

*This README is the source of truth for the codebase architecture. All new code must align with these patterns.*
