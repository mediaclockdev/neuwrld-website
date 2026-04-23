# Boneyard Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Boneyard-backed skeleton loading to the site's main user-facing loading surfaces while keeping the existing fallback skeletons and loading guards intact.

**Architecture:** Use `Skeleton` from `boneyard-js/react` inside components that already have clear loading states. Each target component gets a lightweight fixture that mirrors the final layout closely enough for `boneyard-js build` to capture, while the current handcrafted skeleton or loading placeholder remains as the fallback for safety.

**Tech Stack:** React 18, Vite, Redux Toolkit, Tailwind CSS, Boneyard JS

---

### Task 1: Finalize Boneyard app wiring

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/bones/registry.js`
- Modify: `package.json`
- Modify: `boneyard.config.json`

- [ ] **Step 1: Verify the app imports the Boneyard registry before render**
- [ ] **Step 2: Keep the registry registration file valid even before generated bones exist**
- [ ] **Step 3: Keep the `bones` script pointing at the local Vite dev server**
- [ ] **Step 4: Preserve a dark-friendly config so generated skeletons match the site**

### Task 2: Homepage sections

**Files:**
- Modify: `src/components/Homepage/Hero.jsx`
- Modify: `src/components/Homepage/FeaturedCollection.jsx`
- Modify: `src/components/Homepage/RecommendedProduct.jsx`
- Reuse: `src/components/Homepage/Heroskeleton.jsx`
- Reuse: `src/components/Homepage/FeaturedCollectionSkeleton.jsx`
- Reuse: `src/components/Homepage/RecommendedProductSkeleton.jsx`

- [ ] **Step 1: Replace early loading returns with `Skeleton` wrappers**
- [ ] **Step 2: Add static fixture markup for each homepage section**
- [ ] **Step 3: Keep existing fallback skeletons wired into the wrapper**
- [ ] **Step 4: Remove obvious debug logs and dead imports while touching these files**

### Task 3: Listing and category surfaces

**Files:**
- Modify: `src/Views/Pages/ProductList/ProductList.jsx`
- Modify: `src/components/Category/AllCategory.jsx`

- [ ] **Step 1: Wrap product grid loading state with a `Skeleton` boundary**
- [ ] **Step 2: Add a product-card fixture matching the current grid layout**
- [ ] **Step 3: Wrap the all-category loading state with a `Skeleton` boundary**
- [ ] **Step 4: Keep the empty/error states outside the skeleton boundary**

### Task 4: Product and cart surfaces

**Files:**
- Modify: `src/components/Product/ProductDetails.jsx`
- Modify: `src/components/Product/ProductImages.jsx`
- Modify: `src/components/Cart/Cart.jsx`
- Modify: `src/components/Order.jsx`

- [ ] **Step 1: Replace plain text product loading placeholders with Boneyard skeletons**
- [ ] **Step 2: Wrap the cart page body and summary loading states with a shared skeleton boundary**
- [ ] **Step 3: Wrap the orders page loading state with a skeleton boundary while keeping the retry path intact**
- [ ] **Step 4: Avoid changing business logic beyond what is required for the loading UI integration**

### Task 5: Verification

**Files:**
- Modify: `docs/superpowers/plans/2026-04-23-boneyard-rollout.md`

- [ ] **Step 1: Run `npm run build` and confirm the app bundles successfully**
- [ ] **Step 2: Run `npm run lint` and record any pre-existing warnings/errors that remain**
- [ ] **Step 3: Summarize how to generate bones locally with `npm run dev` + `npm run bones`**
