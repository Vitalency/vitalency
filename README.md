# vitalency

> Vitalency dotcom

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## Firebase

``` bash
# Install the Firebase tools
yarn global add firebase-tools

# Login to your account
firebase login

# Alias vitalency-dev as the deploy target
firebase use --add # pick the dev environment

# Generate static assets and deploy the app
yarn deploy

# To deploy to production
firebase use --add # do this again and pick prod
yarn deploy-production
```