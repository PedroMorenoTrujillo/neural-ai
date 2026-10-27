# MCP local de Neural UI v2

Segunda fase de Neural AI: paquete **neural-ui-mcp 0.1.0**, MIT, [publicado gratuitamente en npm](https://www.npmjs.com/package/neural-ui-mcp) tras autorización web y 2FA del mantenedor. [Instalación y configuración de clientes](../packages/mcp/README.md). El nombre se comprobó antes de publicar; el resultado histórico está en [npm-name.json](../evidence/mcp/npm-name.json). La [verificación histórica desde el registro](../evidence/mcp/publication-0.1.0.json) confirma que sirve el tarball exacto aprobado y que funcionan la instalación limpia, el binario y npx con el cliente oficial.

## Diseño y fuentes únicas

```text
packages/mcp/
  package.json, package-lock.json, tsconfig.json
  src/catalog.ts           # búsqueda y lectura de datos fijos
  src/server.ts            # cinco herramientas y recursos de solo lectura
  src/cli.ts               # stdio, cierre y diagnósticos en stderr
  README.md, LICENSE
shared/usage-validator.mjs  # compartido con scripts/validate.mjs
scripts/build-mcp.mjs       # genera data/ y dist/ dentro del paquete
scripts/verify-mcp-package.mjs
scripts/check-mcp-name.mjs
tests/mcp/                 # unidades, seguridad y cliente real stdio
evidence/mcp/              # resultados y preparación de distribución
```

El extractor existente `scripts/api.mjs` añade el tipo Angular de cada símbolo a `evidence/api.json`. El build exige que ese snapshot coincida con el paquete 2.0.1 instalado. Usa el mismo catálogo de entrypoints admitidos por Neural; los internos siguen excluidos. No carga el runtime de Neural ni requiere que el consumidor tenga Angular instalado para consultar documentación.

El catálogo empaquetado copia automáticamente las 107 referencias y cinco ejemplos de la Skill. El validador se mantiene únicamente en `shared/usage-validator.mjs`; el build lo copia sin alterar a la distribución y las pruebas verifican igualdad. El catálogo generado y los archivos compilados no se mantienen en Git. Los tipos públicos, su hash y las declaraciones se conservan en las respuestas. No se usa el README como sustituto de los contratos públicos.

No se ha cambiado ningún archivo bajo `skills/` respecto a `v0.1.0`, ni la etiqueta o release de la Skill. MCP y Skill tienen ciclos de publicación independientes.

## Protocolo y dependencias

Se usa la línea estable v2 del [SDK TypeScript oficial](https://ts.sdk.modelcontextprotocol.io/v2/) con `@modelcontextprotocol/server@2.3.1`, `serveStdio` y `McpServer`. Compatible con la [revisión MCP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28) y el [transporte stdio](https://ts.sdk.modelcontextprotocol.io/v2/serving/stdio.html). El SDK proporciona negociación y compatibilidad legacy; no hay una implementación artesanal del protocolo.

Dependencias de ejecución: SDK servidor, Zod para esquemas, TypeScript y compilador Angular para los dos AST del validador compartido. El compilador Angular no arranca una aplicación. El SDK cliente solo es dependencia de desarrollo de la raíz. Pins y lockfiles exactos. No se añaden servicios externos ni APIs de IA.

## Verificación reproducible

```sh
npm ci
npm ci --prefix packages/mcp
npm run verify:mcp
npm audit --prefix packages/mcp --omit=dev --audit-level=low
npm run verify
npm run test:clean-install
npm run check:links
npm run check:sources
npm run test:mcp:registry
git diff v0.1.0 --exit-code -- skills/neural-ui
```

La suite MCP comprueba:

- Igualdad con fuentes canónicas, descubrimiento por declaraciones y búsqueda determinista con fragmentos acotados.
- Sintaxis, exports inexistentes, entrypoints privados, Neural Native, bindings, alias de imports, inputs requeridos, directivas y propiedad de Signal Forms; también bindings DOM válidos para evitar falsos positivos.
- Un **cliente real del SDK oficial** lanza un proceso independiente por stdio, negocia explícitamente **2026-07-28**, lista y ejecuta las cinco herramientas y lee recursos. Un segundo cliente JSON-RPC verifica compatibilidad **2025-11-25**.
- stdout inicialmente vacío y después exclusivamente JSON-RPC; no ejecución del código recibido, límites UTF-8, versión incorrecta, argumentos extra, rutas y URI no admitidos. Errores recuperables y cierre por EOF/SIGTERM.
- `npm pack`, inspección de archivos, instalación en un directorio temporal externo al repositorio y arranque desde el binario instalado. Ejecuta herramientas y recursos con red bloqueada por instrumentación de Node. El paquete falla de forma cerrada si se corrompe su catálogo.

El tarball y SHA-256 quedan en `dist/mcp/`. Los detalles del artefacto probado están en [package-verification.json](../evidence/mcp/package-verification.json). La instalación de dependencias requiere red; la ejecución del MCP no la requiere.

Resultado local y [CI aprobada](https://github.com/PedroMorenoTrujillo/neural-ai/actions/runs/38813067488): **11 pruebas MCP, 11 pruebas originales, ocho escenarios Chromium y dos del consumidor limpio aprobados**; build Angular/SSR y procedencia aprobados. La [auditoría de dependencias](../evidence/mcp/security-audit.json) registra cero vulnerabilidades conocidas al comprobarla. [Evidencia remota y hashes](../evidence/mcp/ci.json). El tarball verificado en Linux está en la sección Artifacts de esa ejecución, se conserva siete días e incluye SHA256SUMS; GitHub requiere iniciar sesión para descargarlo. Su contenido tar descomprimido es idéntico al local; la compresión gzip produce un hash de archivo diferente según el runtime.

La suite Angular original vuelve a compilar los cinco ejemplos con comprobación estricta de templates y SSR y ejecuta ocho escenarios Chromium: Signal Forms, Select, tabla, navegación, overlay/foco, tokens/tema, SSR/hidratación y viewport estrecho. El consumidor Angular independiente instalado desde GitHub tiene dos pruebas adicionales. Estos escenarios verifican los ejemplos que entrega el MCP; no significan que `validate_usage` compile el código del usuario.

## Seguridad y límites

Se revisaron las recomendaciones [oficiales de seguridad MCP](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices). Superficie reducida a stdio local: sin HTTP, credenciales, mutaciones, rutas arbitrarias, acceso al proyecto, roots, sampling ni ejecución de código enviado. Todos los recursos tienen URI fijos. Anotaciones de herramientas: lectura, idempotencia y mundo cerrado. Los errores del proceso no imprimen fuentes, secretos o rutas locales.

Las pruebas son controles concretos, no una auditoría externa ni una garantía general de ausencia de vulnerabilidades. El parser JSON del transporte recibe el mensaje antes del esquema: el cliente debe limitar su tamaño total. La comprobación SHA-256 detecta corrupción accidental, no un atacante que cambie a la vez catálogo y hash. No se sigue ninguna instrucción incluida en los fragmentos devueltos.

`validate_usage` es análisis estático parcial de texto: no resuelve expresiones, tipos, scopes/NgModules, herencia o templates externos/computados. No sustituye el compilador ni las pruebas. La detección de eventos DOM usa una lista limitada; directivas personalizadas pueden necesitar revisión. No se afirma compatibilidad validada de todos los componentes o de otras versiones de Neural.

Las pruebas de protocolo con el SDK están ejecutadas. **No se han ejecutado sesiones de agentes Codex o Claude Code conectados al MCP**; sus instrucciones de configuración están contrastadas con sus documentos oficiales. Las evaluaciones con esos hosts quedan pendientes y no se declaran superadas.

## CI y publicación posterior

GitHub Actions mantiene un único job Linux estándar, permisos de lectura, sin cron y timeout de 20 minutos. Instala ambos lockfiles, verifica Skill, MCP, tarball, seguridad, consumidor Angular, enlaces y procedencia. Guarda el tarball verificado como artefacto durante siete días. No publica nada ni usa credenciales npm. No configura runners de pago ni infraestructura.

La publicación 0.1.0 se realizó desde el tarball verificado, sin recompilarlo. npm aplicó su procesamiento previo antes de hacerlo instalable; se comprobó después la integridad SHA-256/SHA-512 y una instalación sin autenticación. `npm run test:mcp:registry` repite esa comprobación contra la versión publicada, incluido npx desde un directorio y caché nuevos. La CI también ejecuta esta prueba pública, sin tokens. Los informes anteriores con `publishedToNpm: false` describen el estado antes de esta publicación; `publication.json` registra el resultado posterior. El README incluido en el tarball conserva la descripción del momento de preparación; las instrucciones vigentes están en este repositorio.

Para publicaciones posteriores: incrementar la versión, repetir la suite, autenticar la cuenta npm con permiso de publicación, revisar el tarball identificado por SHA-256 y obtener autorización expresa para publicarlo. La cuenta/2FA y políticas del registro pueden exigir intervención humana. No se debe sustituir el tarball validado por un build sin verificar ni intentar sobrescribir 0.1.0. No hay obligación de contratar ningún plan.

Quedan pendientes las sesiones de integración con los hosts. La Skill 0.1.0 continúa instalándose desde su etiqueta original.

## Ampliación Native 0.2.0

La descripción anterior registra la publicación Web 0.1.0. La ampliación **0.2.0** reutiliza las cinco herramientas y la forma de respuesta Web, añadiendo `library: "native"`; la selección por defecto sigue siendo Web. La skill `skills/neural-ui` permanece intacta respecto a su release; la nueva `skills/neural-native` es independiente y se distribuye con la etiqueta `neural-native-v0.1.0`.

`scripts/native-api.mjs` extrae 67 entrypoints del paquete npm 0.1.0-beta.2, resuelve modelos heredados y registra los 28 tokens claros/oscuros sin ejecutar el runtime. `build:mcp` verifica los dos snapshots antes de empaquetarlos. Los catálogos usan archivos y hashes separados; la biblioteca nunca se convierte en una ruta proporcionada por el cliente.

Los recursos Native usan `neural-native://` y los Web conservan `neural-ui://`. El validador comparte el parser, pero aplica contratos por biblioteca: rechaza imports Web dentro de Native y viceversa, eventos inventados y versiones cruzadas. No ejecuta la fuente ni afirma que se haya compilado.

La verificación del tarball ampliado ejercita las cinco herramientas y recursos de ambas bibliotecas tras una instalación limpia con la red bloqueada. La versión pública 0.1.0 se sigue comprobando por separado para conservar la compatibilidad histórica. `test:mcp:registry:current` comprueba 0.2.0 contra el hash autorizado de `release-0.2.0.json`, incluyendo instalación y npx con ambos catálogos. Consulta el [README actual del paquete](../packages/mcp/README.md) para instalarlo.
