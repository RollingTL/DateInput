# DateInput

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Test assignment for Frontend Developers
Create a Vue@3 component for date input with a mask that will change depending on the browser locale.If the browser locale is "en_US", the input mask should be "MM/DD/YYYY", in any other cases, it should be "DD/MM/YYYY".

Input mask means that it should not allow user to input anything that is not a valid date. See examples here: https://imask.js.org/
The v-model binding should always be of this format: "YYYY-MM-DD";
The component must utilize Vue@3.x and it's composition API;
The component must be written in TypeScript;
The component must be SSR friendly;
Write at least 3 tests for the component.
You can use any date formatting library, like dayjs or moment js. Any other dependencies are prohibited.
You can upload your code to github and send us a link for evaluation.
