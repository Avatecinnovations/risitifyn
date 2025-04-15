# Welcome my design

## Project info

**URL**: https://lovable.dev/projects/4c1b2da0-603f-4b23-8ef3-f3d808b4eb8c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4c1b2da0-603f-4b23-8ef3-f3d808b4eb8c) and start prompting.

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

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4c1b2da0-603f-4b23-8ef3-f3d808b4eb8c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Risitify

A modern invoice management system built with React and Supabase.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Resend account (for email functionality)

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/risitify.git
   cd risitify
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the following variables in `.env`:
     - `VITE_PROJECT_URL`: Your Supabase project URL (from Supabase dashboard -> Settings -> API)
     - `VITE_SECRET_ANON_KEY`: Your Supabase anon/public key (from Supabase dashboard -> Settings -> API)
     - `VITE_RESEND_API_KEY`: Your Resend API key (from Resend dashboard)

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── lib/           # Utility functions and configurations
  ├── types/         # TypeScript type definitions
  └── integrations/  # Third-party service integrations
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
