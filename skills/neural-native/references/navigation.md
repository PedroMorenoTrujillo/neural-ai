# Navigation and composed screens

`NeuNavComponent` is a selection/navigation control, not an application router. Supply `NeuNavItem[]`, maintain the `value` model and handle `navigate` when the app needs a navigation side effect. Do not perform the same navigation in both valueChange and navigate.

The [navigation example](../examples/navigation.ts) changes real screen content through owned state. It is an in-memory example, not a claim that a native router or persisted history has been configured.

For an actual application stack, follow Angular Native's routing documentation and the generated app configuration. Neural emits actions and state; the app owns routes, back behavior and persistence. Do not transplant Web v2 routing providers, a browser URL strategy or a Web dock into a native app without checking the framework contract.

Keep a bottom navigation bar full-width in its intended layout, with readable labels and a clear selected state. Apply bottom safe-area insets at the app shell; do not add identical insets to both the shell and every nested screen. Provide distinct useful content for each destination.

Framework source: https://ng-native.com
