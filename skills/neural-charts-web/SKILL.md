---
name: neural-charts-web
description: Build or debug browser charts with @neural-charts/web, @neural-charts/angular, or @neural-charts/react. Use for chart data and options, SVG rendering, lifecycle, controlled interactions, exports, and adapter selection.
license: MIT
metadata:
  author: PedroMorenoTrujillo
  version: "0.1.0"
  charts-web-version: "1.2.2"
  charts-angular-version: "1.1.1"
  charts-react-version: "1.0.0"
---

# Neural Charts for browsers

Read the application's package manifest and lockfile. Select the adapter for the application and confirm its public contract before generating code. This skill is verified against Charts Web 1.2.2, Charts Angular 1.1.1 and Charts React 1.0.0.

| Application | Reference | Complete example | MCP library |
| --- | --- | --- | --- |
| Browser application using the renderer directly | [Web](references/web.md) | [Mount and dispose a chart](examples/line-web.ts) | `charts-web` |
| Angular application | [Angular](references/angular.md) | [Signal-driven chart](examples/line-angular.ts) | `charts-angular` |
| React 19 application | [React](references/react.md) | [Controlled legend](examples/line-react.tsx) | `charts-react` |

- Keep observation and series IDs stable when replacing immutable data and options.
- Use a title and an accessibility description that explains the data. Keep interactive controls keyboard accessible and provide a table or equivalent detail where needed.
- In a view managed by Angular or React, let its adapter own the renderer lifecycle.
- For iOS or Android applications built with Angular Native, use the Neural Charts Native skill.

When the MCP is available, set the matching `library` and version, then call `get_api` with the exact npm entrypoint. If the installed version differs, use its shipped declarations and documentation. Compile and run the result in the actual application.
