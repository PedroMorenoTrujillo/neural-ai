# Versions, maintenance and optional MCP

This skill release is 0.1.3 and its verified package baseline is `@neural-ui/native@0.1.0-beta.7`, Angular Native 0.22.2 and Angular 22.2.2. Beta APIs can change before 1.0. The installed package and lockfile are the contract for an existing application.

Use `neural-ui-mcp@0.2.6` for this Native baseline and Web Core 2.0.4. MCP 0.2.2 retains Native beta.2; use that release for applications that still require the older contract. MCP 0.1.0 only understands Web and cannot answer Native requests.

Applications staying on Angular Native 0.21.0 should keep Neural Native beta.6, Native skill 0.1.2 and MCP 0.2.5. Choose the matching skill/MCP baseline explicitly; installing these development tools does not migrate an application's framework or make older version requests valid in a newer catalogue.

Use an explicitly selected Native call:

```json
{"library":"native","version":"0.1.0-beta.7","entrypoint":"@neural-ui/native/input","symbol":"NeuInputComponent"}
```

This is an input for `get_api`. `list_components`, `search_documentation`, `get_example` and `validate_usage` use the same `library`/`version` fields. Native example IDs are forms, collections, navigation, overlays, theme and haptics. Resources use `neural-native://docs/` or `neural-native://examples/`; Web resources retain `neural-ui://`.

The server is local stdio and read-only. It does not install dependencies, inspect user files, execute supplied code, modify projects or certify a build. The skill also works without MCP using its packaged references.

For maintainers, update the exact dependency and reviewed source/integrity record, regenerate the declaration-derived API, review removed/changed bindings and token defaults, adapt examples and rerun compilation, browser and MCP consumer tests. Do not silently serve another version under the existing baseline. Keep native device validation separate from Web preview results.
