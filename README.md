# Neural AI

Skill oficial de **Neural UI v2** para desarrollar aplicaciones Angular con contratos verificables. Primera versión: **0.1.0**, validada con **@neural-ui/core 2.0.1**, **Angular 22.2.2** y **TypeScript 6.0.3**. Licencia MIT.

Una skill principal, referencias bajo demanda y ejemplos ejecutables. La segunda fase añade un [servidor MCP local opcional](packages/mcp/README.md), publicado como [neural-ui-mcp@0.1.0 en npm](https://www.npmjs.com/package/neural-ui-mcp). Sin backend de producto, hosting, Supabase ni servicio de IA de pago obligatorio. La instalación de la skill se hace desde GitHub y no necesita npm. La aplicación Angular consumidora sí instala Neural UI y sus peers.

La skill también está disponible en [Skills.sh](https://www.skills.sh/pedromorenotrujillo/neural-ai/neural-ui). Consulta el [informe de distribución](docs/distribution.md) para la instalación con su CLI, la prueba en Angular limpio y el estado real de los directorios.

El MCP requiere Node 22.22.3 o posterior y se puede iniciar con `npx --yes neural-ui-mcp@0.1.0`. Es un proceso stdio para conectar desde un cliente MCP; consulta su [configuración para Codex y Claude Code](packages/mcp/README.md#conectar-codex-y-claude-code).

## Instalar en Codex

Desde el directorio de tu aplicación, en macOS/Linux o Git Bash. Usa un directorio de descarga nuevo:

```sh
git clone --depth 1 --branch v0.1.0 https://github.com/PedroMorenoTrujillo/neural-ai.git neural-ai-skills
mkdir -p .agents/skills
test ! -e .agents/skills/neural-ui && cp -R neural-ai-skills/skills/neural-ui .agents/skills/neural-ui
```

La última línea evita sobrescribir una instalación existente. Conserva la carpeta completa, incluidas references, examples y LICENSE. Reinicia la sesión si no aparece y solicita: `Usa $neural-ui para crear un formulario de clientes con Neural UI 2.0.1 y Angular 22`.

Para instalar a nivel de usuario, copia la misma carpeta a `~/.agents/skills/neural-ui` en lugar de la ruta del proyecto. No instales dos copias con el mismo nombre en ubicaciones que Codex descubra simultáneamente.

## Instalar en Claude Code

Después de clonar como arriba, desde el directorio de tu aplicación:

```sh
mkdir -p .claude/skills
test ! -e .claude/skills/neural-ui && cp -R neural-ai-skills/skills/neural-ui .claude/skills/neural-ui
```

Para instalación personal usa `~/.claude/skills/neural-ui`. Abre una sesión y ejecuta `/neural-ui` con la tarea, o pide una implementación de Neural UI v2 para activar la selección por descripción.

Otros agentes que implementen Agent Skills pueden cargar la misma carpeta desde su ubicación de skills. El formato portable está validado; cada agente conserva sus propias reglas de descubrimiento. No se han ejecutado aún evaluaciones de generación en sesiones independientes de Codex ni Claude Code. El [protocolo de evaluación](tests/agent-scenarios.md) registra lo pendiente.

Ubicaciones y formato contrastados con [Codex](https://developers.openai.com/codex/skills/), [Claude Code](https://code.claude.com/docs/en/skills) y [Agent Skills](https://agentskills.io/specification) el 15 de octubre de 2026.

## Contenido

```text
skills/neural-ui/
  SKILL.md
  LICENSE
  references/
    installation.md, components.md, forms.md, state.md
    theming.md, layout-accessibility.md, ssr.md
    migration.md, versioning.md
    api/                    # 96 entrypoints, índice y 262 tokens públicos
  examples/                 # forms, table, navigation, overlays, theme
scripts/                    # extracción, validación, enlaces, procedencia y empaquetado
shared/usage-validator.mjs  # validador único para Skill y MCP
packages/mcp/               # servidor TypeScript stdio y paquete npm independiente
tests/
  *.test.mjs                # contratos, instalación y compilación negativa
  browser/                  # escenarios reales en Chromium
  integration/              # fixture Angular CLI: browser + SSR/hidratación
  agent-scenarios.md         # evaluaciones de agentes pendientes
evidence/                   # npm integrity, commit fuente, política y snapshot API
.github/workflows/verify.yml
docs/verification.md
```

La entrada principal contiene las reglas esenciales y enlaza referencias especializadas. No carga todo el catálogo de componentes al activar la skill. Cada referencia de API se deriva del paquete distribuido; la política oficial del código fuente excluye entrypoints internos aunque estén físicamente exportados.

Cobertura: instalación y configuración; componentes e imports; formularios y Signal Forms; propiedad del estado; tablas, navegación y overlays; theming y tokens; layouts y accesibilidad; SSR e hidratación; migración desde v1; mantenimiento de versiones. Neural Native queda fuera del ámbito.

## Verificar el proyecto

Para mantenedores: Node **22.22.3** y npm. Las dependencias son herramientas de desarrollo, no requisitos de instalación de la skill.

```sh
npm ci
npx playwright install chromium
npm run verify
npm run check:links
npm run check:sources
```

`verify` comprueba snapshot API, estructura portable de SKILL.md, integridad npm, enlaces locales, imports públicos, selectores, bindings, tokens, pruebas de regresión, compilación Angular estricta y escenarios de navegador contra SSR real. Los ejemplos de la skill se importan directamente en el fixture: no existe una copia de prueba que pueda divergir.

Las pruebas de contratos incluyen imports/exportaciones inexistentes, entrypoints internos, Neural Native, componentes eliminados, cambios de inputs y referencias rotas. El compilador Angular rechaza además un import desde el barrel incorrecto, una tabla sin rowKey y un modelo open inventado para Dialog. Las pruebas de navegador cubren edición/validación/reset, Select, ordenación/selección, Tabs con teclado, cierre aceptado/rechazado y foco, presets, SSR sin JavaScript, hidratación sin errores y viewport estrecho.

GitHub Actions ejecuta un único job Linux estándar, con timeout de 20 minutos, permisos de lectura y cancelación de ejecuciones anteriores de la misma rama. También verifica el MCP y conserva su tarball probado durante siete días. No hay cron, runners de pago ni servicios externos de ejecución. El repositorio público usa los runners estándar gratuitos de GitHub; no se aprovisiona infraestructura.

Consulta [resultados y límites de verificación](docs/verification.md). La cobertura de navegador se limita a los ejemplos incluidos y Chromium; no equivale a auditar cada componente ni a certificar WCAG.

## Actualizar Neural UI

1. Cambia el pin exacto de @neural-ui/core y actualiza el lockfile.
2. Registra la integridad npm y un commit fuente correspondiente en evidence/sources.json. Revisa la política oficial de soporte antes de actualizar evidence/upstream-policy.json.
3. Ejecuta `npm run api:generate` y revisa el diff de exports, tipos, inputs/outputs, tokens y estilos. El generador también elimina referencias de entrypoints retirados.
4. Adapta únicamente las guías de comportamiento y los ejemplos afectados. Actualiza los metadatos de versión de la skill y las instrucciones de instalación.
5. Ejecuta toda la verificación y las evaluaciones de agentes que correspondan antes de publicar una nueva etiqueta.

`npm run api:check` nunca actualiza automáticamente la referencia revisada: falla ante deriva. La extracción usa el AST y el resolver de TypeScript sobre los tipos públicos, no expresiones regulares aplicadas al README. Conserva hashes de las declaraciones completas y de los estilos para detectar cambios que requieran revisión.

Para preparar una distribución: `npm run release:prepare`, con los cambios de la skill ya confirmados en Git. Produce un tar.gz de la carpeta instalable y SHA256SUMS en dist. La publicación se hace con una etiqueta versionada y GitHub Releases; no se publica un paquete npm.

## Fuentes y alcance

- [Código oficial](https://github.com/PedroMorenoTrujillo/neural-ui-workspace), commit exacto en [evidence/sources.json](evidence/sources.json).
- [Paquete 2.0.1 en el registro npm](https://registry.npmjs.org/@neural-ui%2fcore/2.0.1), con SHA-512 comprobable.
- [Documentación oficial v2](https://ui.neuralui.org/v2/).

El paquete publicado y sus contratos públicos son la referencia principal para APIs consumibles. Los documentos históricos de migración no sustituyen los tipos de 2.0.1. Este proyecto no modifica Neural UI ni requiere acceso a su repositorio para usar la skill.
