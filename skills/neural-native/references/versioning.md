# Versions, maintenance and optional MCP

This skill release is 0.1.0 and its verified package baseline is `@neural-ui/native@0.1.0-beta.2`, Angular Native 0.18.2 and Angular 22.2.2. Beta APIs can change before 1.0. The installed package and lockfile are the contract for an existing application.

Use `neural-ui-mcp@0.2.0` for both Web and Native. The earlier `neural-ui-mcp@0.1.0` only understands Web and cannot answer Native requests. Do not claim it supports Native because a tool happens to share the same name.

Use an explicitly selected Native call:

```json
{"library":"native","version":"0.1.0-beta.2","entrypoint":"@neural-ui/native/input","symbol":"NeuInputComponent"}
```

This is an input for `get_api`. `list_components`, `search_documentation`, `get_example` and `validate_usage` use the same `library`/`version` fields. Native example IDs are forms, collections, navigation, overlays and theme. Resources use `neural-native://docs/` or `neural-native://examples/`; Web resources retain `neural-ui://`.

The server is local stdio and read-only. It does not install dependencies, inspect user files, execute supplied code, modify projects or certify a build. The skill also works without MCP using its packaged references.

For maintainers, update the exact dependency and reviewed source/integrity record, regenerate the declaration-derived API, review removed/changed bindings and token defaults, adapt examples and rerun compilation, browser and MCP consumer tests. Do not silently serve another version under the existing baseline. Keep native device validation separate from Web preview results.
