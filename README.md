# Allowance Web Client

This is a single page application for the [Allowance smart contracts][contracts].

## ⚠️ Warning

Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only.  NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.

## Setup

1. clone this repo locally
2. run `yarn`
3. Create a `.env.local` file and add an environment variable for the contract account ID.

```
VITE_NEAR_CONTRACT_ID = $REGISTRY_CONTRACT_ACCOUNT_ID
```

## Development

```
yarn dev
```

## Build

```
yarn build
```

## Stack

- [Vite][vite] - front-end tooling
- [Typescript][typescript] - type checking
- [Vue 3][vue] - single file components using Vue 3's composition API
- [Tailwindcss][tailwindcss] - component styling
- [Jest][jest] - test runner

## Features
- login with NEAR wallet
- use `near-api-js` to interact with the [allowance smart contracts][contracts]
- uses i18n for multiple language support


This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

[contracts]: https://github.com/rhythnic/NCD.L1.sample--allowance
[vite]: https://vitejs.dev/
[typescript]: https://www.typescriptlang.org/docs/
[vue]: https://v3.vuejs.org/
[tailwindcss]: https://tailwindcss.com/
[jest]: https://jestjs.io/