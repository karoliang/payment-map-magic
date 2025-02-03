# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/81832def-1a31-424a-b2ce-888fdabf5af5

## Features

### Email Integration (Resend)

The project includes email functionality using Resend. To use this feature:

1. Sign up for a Resend account at https://resend.com
2. Get your API key from https://resend.com/api-keys
3. Add the API key to Supabase Edge Function secrets as `RESEND_API_KEY`

Usage example:
```typescript
import { sendEmail } from "@/lib/email";

await sendEmail(
  "user@example.com",
  "Welcome!",
  "<h1>Welcome to our app!</h1>"
);
```

### Stripe Integration

The project includes Stripe payment integration. To use this feature:

1. Create a Stripe account at https://stripe.com
2. Get your API key from https://dashboard.stripe.com/apikeys
3. Add the API key to Supabase Edge Function secrets as `STRIPE_SECRET_KEY`
4. Create a product and price in Stripe Dashboard

Usage example:
```typescript
import { createCheckoutSession, checkSubscriptionStatus } from "@/lib/stripe";

// Create checkout session
const { data } = await createCheckoutSession("price_123");
if (data?.url) {
  window.location.href = data.url;
}

// Check subscription
const { data: status } = await checkSubscriptionStatus("price_123");
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/81832def-1a31-424a-b2ce-888fdabf5af5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/81832def-1a31-424a-b2ce-888fdabf5af5) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
