<h1 align="center">SiegeEngineers.org Website</h1>

The main Siege Engineers website.

Requires Node `v24.12.0` through `nvm`.

## Commands

```sh
# Use the project Node version
nvm use

# Install dependencies
npm install

# Development
npm run develop

# Development with Stripe test payment links
GATSBY_STRIPE_ENV=test npm run develop

# Production Build
npm run build

# Serve the build locally
npx gatsby serve
```

`npm install` can print a non-fatal peer warning from Gatsby's internal experimental `react-server-dom-webpack` package. The install is expected to exit 0.

## Other Commands

```sh
# Start the local development server
npm start

# Format code
npm run format

# Lint code
npm run lint

# Deploy
rsync -avh ./public/ aoe2se:~/html/ --delete
```
