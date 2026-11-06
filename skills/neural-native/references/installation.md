# Installation and renderer boundary

Reviewed: Neural Native `0.1.0-beta.7`, Angular Native `0.22.2`, Angular `22.2.2`, TypeScript `6.0.3`. Use the app's generated tooling and lockfile.

For a new app, follow the official template:

```sh
npx create-expo-app@latest my-neural-app --template @ng-native/template@0.22.2
cd my-neural-app
npm install --save-exact @neural-ui/native@0.1.0-beta.7
```

In an existing compatible app only the last command is needed. Keep `@ng-native/components`, `device`, `fabric`, `icons` and the app's other framework packages aligned to the same compatible release. The package requires `react-native-svg` 15.15.4. Its published README's tested application baseline is Expo 57.0.27 / React Native 0.86.3; additional native modules must exist in the Expo/runtime or development build.

The Angular Native 0.22.2 template uses Expo 58 and React Native 0.88. Preserve that runtime rather than downgrading a generated app to the laboratory's SDK 57 baseline. An isolated SDK 58 consumer is checked separately with strict peer installation, component tests and Android/iOS bundles; those checks do not replace installed-app validation for that runtime. Install optional native modules with the template's Expo tooling so their versions match the application.

The strict SDK 58 fixture uses npm 11.21.0 and matching React-family packages at 19.3.0. If npm 10 fails with an Arborist error, check framework peers first and use a compatible npm 11 release. If optional `react-dom` or `react-server-dom-webpack` packages cause a React peer conflict, align their patch version with the template's React version instead of changing React Native or bypassing peer checks.

There is no Neural global CSS stylesheet or mandatory Web provider to install. Compose `neu-theme` and the controls in the generated `App`; preserve its exported name and bootstrapping. Run the template's `npm start` workflow and open its compatible native host.

`@ng-native/web` 0.22.2 is a browser host for previews using `mount` and its Vite plugin. Use it for rapid interaction feedback, while retaining actual device verification for safe areas, native presentations, file selection and accessibility. Do not import `@angular/platform-browser` bootstrap as a substitute for the native app entry point.

Use the skill's [forms example](../examples/forms.ts) inside the app's screen/safe-area shell. Wrap the app with `SafeAreaProvider` and use `SafeAreaView` for content that must respect insets.

Official setup: https://ng-native.com/guide/getting-started
Library installation: https://native.neuralui.org/en/installation
