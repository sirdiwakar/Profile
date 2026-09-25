# Adarsh Diwakar — standalone portfolio

The complete portfolio, converted to a normal React + TypeScript + Vite application. It includes the original design, photo, résumé download, experience, projects, theme selector, smooth navigation, sound effects, and three mini-games.

**No authentication, ChatGPT account, API keys, backend, database, or environment variables are required.** The former hosted site's sign-in gate was part of its hosting service; it is not included here. All Sites plugins, hosting manifests, authentication integrations, and Cloudflare worker configuration have been removed from this standalone copy.

## Run locally

Install Node.js 22.13 or newer (Node 22 LTS recommended).

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL Vite prints, normally http://localhost:5173.

You can also use npm: `npm install`, then `npm run dev`. That generates a separate package-lock.json; the included reproducible lockfile is for pnpm. Pick one package manager for subsequent work.

A prebuilt **dist/** folder is also included and can be served immediately. Rebuild after changing the source.

## Build and deploy

```sh
pnpm build
pnpm preview
```

The build command checks TypeScript and produces **dist/**. Preview serves that build locally; it is not a production server. Deploy the entire contents of dist/ to any ordinary static web server. No Node process is needed on the production server.

For a static-hosting provider, use:

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Publish/output directory: `dist`
- Environment variables: none

For your own Nginx server, copy dist/ into its web root and adapt the included nginx.conf. The project assumes deployment at the root of a domain. To deploy under a subdirectory, configure Vite's `base` and update the root-relative photo, résumé, and favicon URLs accordingly.

### Docker

```sh
docker build -t adarsh-portfolio .
docker run --rm -p 8080:80 adarsh-portfolio
```

Open http://localhost:8080. Docker builds the app in Node and serves static files through Nginx. To expose the site on a public domain, configure your domain, reverse proxy, and HTTPS on your server.

## File structure

```text
adarsh-portfolio/
├── index.html                 # HTML shell, title, description, favicon
├── package.json               # Required dependencies and run/build scripts
├── pnpm-lock.yaml             # Reproducible dependency versions
├── vite.config.ts             # React plugin and @/ source alias
├── tsconfig.json              # TypeScript settings
├── postcss.config.mjs          # Tailwind CSS processing
├── Dockerfile                 # Optional Node build → Nginx runtime
├── nginx.conf                 # Optional static-server configuration
├── .dockerignore
├── .gitignore
├── README.md
├── public/
│   ├── adarsh.png              # Your portrait
│   ├── Adarsh-Diwakar-Resume.pdf
│   └── favicon.svg
└── src/
    ├── main.tsx               # Mounts React into index.html
    ├── App.tsx                # Portfolio sections, theme/sound state, games
    ├── styles.css             # Complete styling, animations, responsive rules
    ├── components/ui/         # Included reusable Shadcn/Radix UI primitives
    │   ├── sidebar.tsx
    │   ├── radio-group.tsx
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── separator.tsx
    │   ├── sheet.tsx
    │   ├── skeleton.tsx
    │   └── tooltip.tsx
    ├── hooks/use-mobile.ts    # Responsive sidebar helper
    └── lib/utils.ts           # Class-name merging helper
```

## How the code works

`src/App.tsx` contains `Home` (the main portfolio) and three small game components:

- `Reaction`: randomized delay, early-click detection, reaction-time measurement.
- `Memory`: eight cards, pair matching, move counter, restart.
- `Bug`: 20-second bug-clicking challenge and score.

The main component uses React hooks for local state, IntersectionObserver for section markers and reveal effects, CSS for smooth scrolling and animation, and the Web Audio API for short synthesized sounds. Theme preferences use localStorage. Games reset on page reload. No Redux or remote state is needed.

`src/styles.css` defines the dark/light CSS variables, right navigation rail, hero portrait treatment, responsive layouts, project concept panels, arcade cards, and reduced-motion support. Tailwind utilities support the included UI primitives.

## Customize

- Text, experience, stats, projects, social links, email: `src/App.tsx`.
- Colors, fonts, spacing, mobile layout: `src/styles.css`.
- Photo and résumé: replace their files in `public/`, retaining filenames, or update their paths in App.tsx.
- Browser title and description: `index.html`.
- Favicon: `public/favicon.svg`.

The project illustrations are explicitly labeled concepts, not screenshots of the linked projects. Experience and metrics reflect the supplied résumé; update them as your work changes.

## Validation

The standalone TypeScript check and production Vite build were run before packaging. Browser interaction testing and a Docker image build were not performed for this export.
