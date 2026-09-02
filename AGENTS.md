# AGENTS.md

## Coding Guidelines

These rules apply whenever code is created, modified, refactored, reviewed, or tested in this repository.

The primary goals are:

- Keep code easy to understand.
- Keep files small and focused.
- Maintain strong TypeScript type safety.
- Prefer explicit and descriptive project structure.
- Avoid unnecessary abstractions.
- Preserve existing behavior during refactors.
- Follow the conventions of React 19, Next.js 16, TypeScript 7, and Zod 4.

---

# 1. File and Folder Organization

## 1.1 Keep Files Small and Focused

Every file should have one clear responsibility.

Use approximately **150 lines per file as a practical upper limit**.

A file may occasionally exceed this by 10 to 15 lines when splitting it would make the code less clear, but large files should not become the default.

If a file becomes significantly larger:

1. Identify its separate responsibilities.
2. Extract those responsibilities into clearly named files.
3. Group related files into descriptive subfolders.
4. Apply the same rules recursively to the extracted files.

Do not create files containing hundreds of unrelated lines simply to avoid creating additional modules.

Organize feature code by responsibility, using operation-specific folders and a dedicated types folder. For example:

```text
feature/
  create-property/
    all-files-related-to-create-a-property
  validate-property/
    all-files-related-to-validate-a-property
  update-property/
    all-files-related-to-update-a-property
  property-types/
    all-files-related-to-types-property
```

over:

```text
feature/
  property-utils.ts
```

containing hundreds of lines and many unrelated responsibilities.

---

## 1.2 Prefer One Main Function Per File

Whenever practical, keep one primary function in each file.

This makes it possible to understand the purpose of a file from its filename and locate functionality without searching through large modules.

For example:

```text
authentication/
  sign-in/
    sanitize-email-sign-in.ts
    validate-email-sign-in.ts
    create-email-session.ts
```

The exact naming does not need to match this example.

The important rule is that filenames and folder names should clearly communicate their purpose before opening them.

---

## 1.3 Use Descriptive Names

Names should explain what a file or folder contains.

Avoid generic names when a more specific name is available.

Prefer:

```text
authentication/sign-in/email-validation/email-sign-in-sanitizer.ts
```

over vague names such as:

```text
helpers.ts
utils.ts
common.ts
stuff.ts
```

Generic project-level folders such as `utils/`, `helpers/`, `services/`, and `types/` may still be used when they are part of the existing project structure, but the files inside them should remain specific and descriptive.

---

## 1.4 Place Files in Their Correct Domain

The main application source directories are:

```text
apps/client/src/
apps/server/src/
```

Use the existing architectural folders inside these directories.

Examples include:

```text
utils/
helpers/
handlers/
services/
routes/
types/
hooks/
```

Place files according to their responsibility.

Examples:

- Hooks belong in the appropriate `hooks/` location.
- Types belong in the appropriate `types/` location.
- Services belong in the appropriate `services/` location.
- Route handlers belong in their appropriate route or handler location.

Do not place unrelated responsibilities together simply because they belong to the same feature.

---

## 1.5 Do Not Create `shared/` Folders

Do not create folders named:

```text
shared/
```

This includes folders intended for:

- Shared components.
- Shared utilities.
- Shared types.
- Shared services.
- Shared feature code.

If functionality is reusable, place it in the appropriate existing architectural location under:

```text
apps/client/src/
apps/server/src/
packages/schemas/src/
```

Choose the location based on what the code actually does.

---

## 1.6 Zod Schemas Belong in `packages/schemas`

All reusable Zod schemas belong under:

```text
packages/schemas/src/
```

Organize these schemas into descriptive domain folders.

Example:

```text
packages/schemas/src/
  authentication/
  properties/
  agencies/
  users/
```

Do not scatter reusable application schemas throughout the client and server applications when they belong in the schemas package.

---

## 1.7 Avoid Barrel Files

Do not create barrel files or `index.ts` files for re-exporting modules.

Avoid:

```text
feature/
  index.ts
  create-item.ts
  update-item.ts
```

with:

```ts
export * from "./create-item";
export * from "./update-item";
```

Import modules directly from their actual files instead.

The import path should make the dependency explicit.

---

## 1.8 Preserve Existing Behavior

When modularizing or refactoring:

- Preserve the current behavior.
- Do not change unrelated functionality.
- Do not introduce abstractions without a clear benefit.
- Do not add wrapper functions solely for architectural appearance.
- Do not add unnecessary boilerplate.
- Do not add unnecessary generated comments.

Refactoring should improve structure without unnecessarily changing behavior.

---

# Root Dependency Restrictions

The root `package.json` must keep its dependencies limited to these exact entries:

```json
"@workspace/biome": "workspace:*",
"@workspace/typescript": "workspace:*",
"turbo": "^2.9.3"
```

Do not add any other dependencies or devDependencies to the root package. Add dependencies to the workspace package that owns the related code or configuration instead.

# 2. Code Readability

Code should be understandable without requiring excessive navigation through imports or deeply nested abstractions.

Prefer code where the primary behavior of the file can be understood quickly.

Avoid designs where understanding a simple operation requires opening many layers of wrappers.

Reusable code is encouraged, but isolation should not come at the cost of hiding the actual behavior.

---

# 3. Example and Placeholder Data

Do not hardcode:

- Project names.
- Personal information.
- Real email addresses.
- Real API keys.
- Real UUIDs.
- Private identifiers.
- User-provided personal information.

When examples are necessary, use neutral fictional values unrelated to real project or user data.

Prefer:

```ts
const email = "example@example.com";
```

rather than real application or personal information.

Only use real values when the task explicitly requires them.

---

# 4. Comments

## 4.1 Comment Purpose and Reasoning

Comments should explain useful context about what the code is doing or why a particular implementation exists.

Prefer comments that help future readers understand behavior or constraints.

Example:

```ts
// Keeps expired sessions out of the response before session data reaches the client.
```

Avoid comments that merely repeat the code.

---

## 4.2 Do Not Prefix Comments With `Why:` or `What:`

Avoid:

```ts
// Why: This prevents duplicates.
// What: Filters duplicate records.
```

Prefer:

```ts
// Prevents duplicate records from being returned.
```

---

## 4.3 Do Not Use Numbered Step Comments

Avoid:

```ts
// 1. Validate the input.
// 2. Query the database.
// 3. Return the result.
```

Write comments naturally where explanation is actually needed.

---

## 4.4 Avoid Decorative Comment Headers

Do not create decorative separators such as:

```ts
/* --------------------------------------------------------------- */
/* HTML FRAGMENTS                                                  */
/* --------------------------------------------------------------- */
```

or:

```ts
/* -- MAP ATTRIBUTION -------------------------------------------- */
```

Use normal comments instead.

---

## 4.5 Avoid Label-Style Function Comments

Avoid:

```ts
// The header: This builds the header.
```

Prefer:

```ts
// Builds the header shown above the property information.
```

Comments should read naturally as sentences.

---

## 4.6 Do Not Mention Human Readability in Comments

Do not write comments containing phrases such as:

```text
human readable
human friendly
human-like
```

Do not refer to the reader using pronouns when it is unnecessary.

Describe the code itself.

Prefer:

```ts
// Builds the normalized query parameters used by the search request.
```

---

## 4.7 Comment Punctuation

Every complete comment sentence should end with a period.

---

## 4.8 Use Plain Keyboard Characters

Do not use em dashes or decorative Unicode characters in source-code comments.

Use ordinary characters available on a standard QWERTY keyboard.

Prefer:

```text
-
:
()
[]
```

instead of decorative symbols.

---

# 5. Functions

## 5.1 Isolate Functions by Responsibility

Functions should generally live in individual files when they represent independent responsibilities.

This is especially important for:

- Business logic.
- Validation.
- Transformations.
- Database operations.
- Request handlers.
- Data normalization.
- Authentication logic.
- Reusable utilities.

The filename should make the function easy to locate.

---

## 5.2 Prefer Typed Parameter Objects for Complex Functions

When a function requires several related parameters, use a typed object.

Prefer:

```ts
type CreateUserInput = {
  email: string;
  name: string;
  role: UserRole;
};

function createUser({ email, name, role }: CreateUserInput) {
  // ...
}
```

instead of:

```ts
function createUser(email: string, name: string, role: UserRole) {
  // ...
}
```

when the parameters represent one logical input.

This makes call sites easier to understand.

---

## 5.3 Avoid Meaningless Wrapper Functions

Do not create a function that only forwards arguments to another function.

Avoid:

```ts
function getUser(id: string) {
  return fetchUser(id);
}
```

unless the wrapper adds a clear responsibility such as:

- Validation.
- Transformation.
- Authorization.
- Error handling.
- Business logic.
- Logging required by the application.
- Domain-specific behavior.

Every abstraction should have a reason to exist.

---

# 6. TypeScript Type Safety

## 6.1 Maintain Full Type Safety

Follow modern **TypeScript 7** conventions.

The goal is that variables, return values, parameters, and application data have useful and predictable inferred types.

Avoid intentionally weakening types to make errors disappear.

---

## 6.2 Never Default to `any`

Avoid:

```ts
any;
```

Use:

```ts
unknown;
```

for data that has not yet been validated.

Then narrow or validate it before use.

Example:

```ts
function parseInput(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  return value.trim();
}
```

`unknown` is preferable because TypeScript requires the value to be validated before accessing it.

---

## 6.3 Do Not Use Assertions to Hide Type Errors

Do not use assertions such as:

```ts
value as SomeType;
```

only to silence TypeScript.

Instead:

- Narrow the value.
- Validate the value.
- Correct the source type.
- Correct the function signature.
- Correct the schema.
- Use an appropriate type guard.

Assertions are acceptable only when the runtime guarantee is genuinely known and TypeScript cannot represent it correctly.

---

## 6.4 Validate Untrusted Data With Zod

External or untrusted data must be validated before being treated as application data.

Examples include:

- API responses.
- Request bodies.
- URL parameters.
- Query strings.
- Form submissions.
- Cookies.
- Environment variables.
- Database input.
- External service responses.
- User-controlled values.

Use **Zod 4** for runtime validation.

---

## 6.5 Infer Types From Zod Schemas

Do not manually maintain a TypeScript type and Zod schema representing the exact same shape.

Prefer:

```ts
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;
```

This keeps runtime validation and compile-time types synchronized.

---

## 6.6 Choose `safeParse` and `parse` Intentionally

Use:

```ts
schema.safeParse();
```

when invalid data is an expected possibility that should be handled normally.

Use:

```ts
schema.parse();
```

when invalid data represents an exceptional condition and throwing is appropriate.

---

## 6.7 Handle Nullable and Optional Values Explicitly

Handle the following intentionally:

```text
null
undefined
optional properties
missing object keys
empty arrays
array lookups
map lookups
database nullable fields
```

Avoid using the non-null assertion operator:

```ts
value!;
```

only to silence TypeScript.

Use it only when the value is guaranteed by runtime logic that TypeScript cannot understand.

---

## 6.8 Reuse Existing Types

Do not create duplicate interfaces or types when the type can safely be derived from:

- A Zod schema.
- A function return type.
- A library type.
- An existing domain type.
- An existing API contract.

Prefer inference and reuse over maintaining duplicate definitions.

---

# 7. Zod

Use **Zod 4** conventions throughout the project.

The main rules are:

- Validate external values before using them.
- Infer TypeScript types from schemas.
- Keep schemas modularized by domain.
- Place reusable schemas under `packages/schemas/src/`.
- Use `safeParse` for expected validation failures.
- Use `parse` for exceptional invalid states.
- Avoid maintaining duplicate schema and interface definitions.

---

# 8. React 19

## 8.1 Keep React Code Simple

When writing React 19 code, prefer normal functions, expressions, and variables before introducing memoization.

Prefer:

```tsx
const filteredItems = items.filter((item) => item.active);

const handleSelect = (id: string) => {
  selectItem(id);
};
```

Do not automatically write:

```tsx
const filteredItems = useMemo(
  () => items.filter((item) => item.active),
  [items],
);

const handleSelect = useCallback(
  (id: string) => {
    selectItem(id);
  },
  [selectItem],
);
```

---

## 8.2 Rely on React Compiler for Normal Memoization

The application should rely on React Compiler for ordinary optimization.

Do not add the following by default:

```text
useMemo
useCallback
React.memo
```

Only use manual memoization when there is a specific, demonstrated reason.

Examples may include:

- Required stable references for an external API.
- Expensive operations React Compiler cannot optimize appropriately.
- Measured performance problems.
- Library contracts requiring referential stability.

---

## 8.3 Do Not Replace Memoization With `"use memo"` Everywhere

Do not mechanically replace `useMemo` or `useCallback` with:

```ts
"use memo";
```

React Compiler should normally determine what should be optimized.

Start with simple React code.

Optimize manually only when there is a clear reason.

---

# 9. Next.js 16

## 9.1 Server Components by Default

Use React Server Components by default.

Add:

```ts
"use client";
```

only when the component requires client-side functionality such as:

- Browser APIs.
- React state.
- Effects.
- Event handlers.
- Client-only libraries.
- Other browser-only behavior.

Keep the client boundary as low in the component tree as practical.

Do not convert large component trees to client components when only a small child requires interactivity.

---

## 9.2 Fetch Data in Server Components

When possible, fetch server data directly inside Server Components.

Avoid unnecessary client-side requests for information that can already be loaded on the server.

---

## 9.3 Run Independent Requests in Parallel

Independent asynchronous operations should run concurrently.

Prefer:

```tsx
const [user, items] = await Promise.all([getUser(), getItems()]);
```

instead of:

```tsx
const user = await getUser();
const items = await getItems();
```

when the second operation does not depend on the first.

---

## 9.4 Use Built-In Next.js Features

Prefer native Next.js features rather than recreating equivalent infrastructure manually.

Use the appropriate features when applicable:

```text
loading.tsx
error.tsx
not-found.tsx
Suspense
Server Actions
Route Handlers
Metadata API
Next.js caching APIs
```

---

## 9.5 Internal Navigation

Use:

```tsx
next / link;
```

for internal application navigation.

Do not use ordinary anchor navigation for internal routes when `Link` is appropriate.

---

## 9.6 Images

Use:

```tsx
next / image;
```

when Next.js image optimization is appropriate.

Do not use it mechanically when the source or use case does not benefit from Next.js image optimization.

---

## 9.7 Caching

When using Next.js 16 caching features such as:

```ts
"use cache";
```

the reason for caching should be clear from the surrounding implementation.

Do not introduce caching without understanding:

- What is being cached.
- How long it can remain valid.
- What mutation invalidates it.
- How it is refreshed or revalidated.

---

## 9.8 Invalidate the Correct Data After Mutations

After a server mutation, invalidate or update only the affected cached data using the appropriate Next.js cache APIs.

Avoid forcing unrelated pages or the entire application to refresh unnecessarily.

---

## 9.9 Server Actions

Use Server Actions for mutations that naturally belong to the UI, including:

- Forms.
- Button-triggered application actions.
- User-facing mutations.

Keep the following on the server:

- Validation.
- Authorization.
- Business logic.
- Sensitive operations.

Never trust a value simply because it came from:

- A Server Action.
- The application's frontend.
- A supposedly internal request.

Treat user-controlled values as untrusted and validate them.

---

# 10. Testing

## 10.1 Write or Execute Tests Only When Explicitly Requested

Do not create, modify, or write test files unless the user explicitly asks for tests.

Do not execute any tests unless the user explicitly asks for tests to be executed. This includes:

- Unit and integration tests.
- Full Vitest suites.
- Playwright tests.
- End-to-end tests.
- Focused test commands.

A request to implement, refactor, or fix functionality does not by itself authorize writing or executing tests.

---

## 10.2 Organize Tests Like Production Code When Requested

When the user explicitly requests test files, organize them using the same responsibility-based folder division as the normal production code. For example:

```text
feature/
  create-property/
    create-property.test.ts
  validate-property/
    validate-property.test.ts
  update-property/
    update-property.test.ts
  property-types/
    property-types.test.ts
```

When tests are explicitly requested:

- Make them align with the implemented behavior.
- Keep them focused and independent.
- Follow the same modularization rules used by production code.

---

## 10.3 Use Vitest for Unit and Integration Tests

Use Vitest for testing:

- Functions.
- Hooks.
- Services.
- Schemas.
- Utilities.
- Components.
- Focused integration behavior.

---

## 10.4 Keep Test Files Focused

Do not place a complete test suite covering many unrelated responsibilities into one enormous file.

Split tests according to behavior or responsibility.

Example:

```text
authentication/
  validate-email.test.ts
  create-session.test.ts
  revoke-session.test.ts
```

rather than:

```text
authentication.test.ts
```

containing hundreds of unrelated tests.

The same file-size and modularization principles apply to test code.

---

## 10.5 Tests Must Be Independent

Tests must not depend on execution order.

A test should not require another test to run first.

Reset relevant state between tests, including:

- Mocks.
- Timers.
- Database fixtures.
- Global state.
- Module state.
- Test data.

---

## 10.6 Test Behavior Instead of Implementation Details

Avoid tests that fail only because:

- A function was renamed.
- A function moved to another file.
- Internal implementation was refactored.
- A private helper changed.

when the externally observable behavior remains the same.

Prefer testing contracts and behavior.

---

## 10.7 Do Not Use Vitest for Browser Flows

Do not recreate full browser behavior using Vitest when the scenario belongs in Playwright or another browser-testing tool.

Use the appropriate level of testing for the behavior.

---

# 11. Browser and DevTools Rules

Browser automation tools must not be used automatically.

Only use them according to the rules below.

---

## 11.1 Chrome DevTools MCP

Do **not** use `chrome-devtools-mcp` unless the user explicitly requests it.

The default behavior is to avoid this tool.

---

## 11.2 `agent-browser`

Use the `agent-browser` CLI only when the user or task explicitly requests `agent-browser`.

Do not use it automatically.

When requested, first attempt to connect to localhost:9222 and allow up to 10 seconds for the connection:

```sh
timeout 10s agent-browser connect "http://localhost:9222"
```

If localhost:9222 does not respond within 10 seconds, get the default gateway IP:

```sh
ip route show | grep default | awk '{print $3}'
```

Use the returned IP for the fallback connection:

```sh
GATEWAY_IP="$(ip route show | grep default | awk '{print $3}')"
timeout 10s agent-browser connect "http://${GATEWAY_IP}:9222"
```

Run `agent-browser snapshot -i` only after a connection succeeds. If the fallback IP is unavailable or the fallback connection fails, do not perform browser automation.

---

## 11.3 `chrome-devtools-cli`

When the user or task explicitly requests Chrome DevTools interaction, prefer:

```text
chrome-devtools-cli
```

over `chrome-devtools-mcp`.

Do not use either tool unless browser or DevTools interaction is part of the requested task.

Validate `chrome-devtools-cli` by first attempting localhost:9222 for up to 10 seconds:

```sh
timeout 10s chrome-devtools start --browserUrl http://localhost:9222
```

If localhost:9222 does not respond within 10 seconds, get the default gateway IP:

```sh
ip route show | grep default | awk '{print $3}'
```

Then try the returned IP:

```sh
GATEWAY_IP="$(ip route show | grep default | awk '{print $3}')"
timeout 10s chrome-devtools start --browserUrl "http://${GATEWAY_IP}:9222"
```

Run `chrome-devtools list_pages` only after a connection succeeds. If the fallback IP is unavailable or the fallback connection fails, do not perform browser automation.

---

# 12. Refactoring Checklist

Whenever refactoring existing code, verify the following before considering the work complete:

- Existing behavior remains unchanged unless a behavior change was requested.
- Files are focused and preferably around 150 lines or fewer.
- Large files have been split by responsibility where appropriate.
- Extracted files have descriptive names.
- Functions are isolated when doing so improves discoverability.
- No unnecessary wrappers were introduced.
- No `shared/` folders were created.
- No barrel files or re-export `index.ts` files were created.
- Zod schemas are placed in `packages/schemas/src/` when appropriate.
- Existing types and schemas are reused instead of duplicated.
- External values are validated.
- `any` has not been introduced unnecessarily.
- Type assertions are not being used simply to suppress errors.
- React memoization has not been added without a reason.
- `"use client"` has been kept as low in the tree as possible.
- Independent asynchronous server operations run in parallel where appropriate.
- Cache invalidation targets only affected data.
- Tests were not written or executed unless explicitly requested.
- When requested, tests remain isolated and focused and mirror the production folder division.
- Browser automation tools were not used unless explicitly requested.

---

# 13. Priority When Rules Conflict

When multiple approaches are technically valid, prefer the solution that provides the following, in this order:

1. Correct behavior.
2. Type safety.
3. Clear responsibility boundaries.
4. Readability.
5. Maintainability.
6. Simple implementation.
7. Reuse where reuse genuinely reduces duplication.
8. Performance optimization when there is a demonstrated reason.

Do not sacrifice clarity for abstraction.

Do not sacrifice correctness for file-size targets.

The approximate 150-line limit exists to encourage focused modules, not to force unnatural fragmentation.

---

# 14. Default Implementation Philosophy

Unless the task explicitly requires something different:

- Keep the implementation simple.
- Keep modules focused.
- Prefer explicit code over hidden abstractions.
- Prefer direct imports.
- Prefer inference over duplicated types.
- Validate data at trust boundaries.
- Use server-side capabilities where appropriate.
- Let React Compiler handle ordinary memoization.
- Use native Next.js functionality before inventing custom infrastructure.
- Write or execute tests only when the user explicitly requests them.
- Do not use browser automation or DevTools tooling unless requested.
- Avoid unrelated refactors.
- Avoid generated boilerplate.
- Avoid unnecessary wrappers.
- Avoid unnecessary comments.
- Make the smallest clean change that fully solves the requested problem.
