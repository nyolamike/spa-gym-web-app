# spa-gym-web-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
## Development Runtime

NVM for managing javascript runtime  
node version v22.13.1  
npm version 10.9.2  
project was created with `npm create vue@latest`  

```
nyolamike@Nyolas-MacBook-Pro gym-and-spa % npm create vue@latest
Need to install the following packages:
  create-vue@3.14.0
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ Project name: … spa-gym-web-app
✔ Add TypeScript? … No ✔ / Yes
✔ Add JSX Support? … No ✔ / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes ✔
✔ Add Pinia for state management? … No / Yes ✔
✔ Add Vitest for Unit Testing? … No ✔ / Yes
✔ Add an End-to-End Testing Solution? › Cypress ✔
✔ Add ESLint for code quality? › No 

Scaffolding project in /Users/nyolamike/xyola/gym-and-spa/spa-gym-web-app...

Done. Now run:

  cd spa-gym-web-app
  npm install
  npm run dev
```

Added tailwind css vai  
`npm install tailwindcss@latest`   
`npm install  @tailwindcss/vite`  
<link rel="stylesheet" href="https://rsms.me/inter/inter.css"> 

`npm install @headlessui/vue @heroicons/vue`  

https://tailwindcss.com/docs/installation/using-vite


## Added it to git via

…or push an existing repository from the command line
git init
git remote add origin git@github.com:nyolamike/spa-gym-web-app.git
git branch -M main
git push -u origin main

## Todo

[] Add web app repo to github  
[] Add backend repo to github  
[] Integrate tailwind  
[] Implement Login and Logout Session Management  
[] Host backend on hostinger vps  
[] Host front end on netilify  
[] Buy a domain on cloudflare  
[] Implement forgot password  
[] Implement remember me on the login
[] Add a logo for palz  
[] Implement Register
