# Installation and renderer boundary

Reviewed: Neural Native `0.1.0-beta.2`, Angular Native `0.18.2`, Angular `22.2.2`, TypeScript `6.0.3`. Use the app's generated tooling and lockfile.

For a new app, follow the official template:

```sh
npx create-expo-app@latest my-neural-app --template @ng-native/template@0.18.2
cd my-neural-app
npm install --save-exact @neural-ui/native@0.1.0-beta.2
```

In an existing compatible app only the last command is needed. Keep `@ng-native/components`, `device`, `fabric`, `icons` and the app's other framework packages aligned to the same compatible release. The package requires `react-native-svg` 15.15.4. Its published README's tested application baseline is Expo 57.0.27 / React Native 0.86.3; additional native modules must exist in the Expo/runtime or development build.

There is no Neural global CSS stylesheet or mandatory Web provider to install. Compose `neu-theme` and the controls in the generated `App`; preserve its exported name and bootstrapping. Run the template's `npm start` workflow and open its compatible native host.

`@ng-native/web` 0.18.2 is a browser host for previews using `mount` and its Vite plugin. Use it for rapid interaction feedback, while retaining actual device verification for safe areas, native presentations, file selection and accessibility. Do not import `@angular/platform-browser` bootstrap as a substitute for the native app entry point.

Use the skill's [forms example](../examples/forms.ts) inside the app's screen/safe-area shell. Wrap the app with `SafeAreaProvider` and use `SafeAreaView` for content that must respect insets.

Official setup: https://ng-native.com/guide/getting-started
Library installation: https://native.neuralui.org/en/installation
