# neural-ui-mcp

Servidor MCP oficial de Neural Web y Native, local y de solo lectura. La actualización **0.2.2** alinea Web con **@neural-ui/core 2.0.4** como predeterminado y conserva **@neural-ui/native 0.1.0-beta.2** mediante `library: "native"`. Licencia MIT. Node **22.22.3 o posterior**.

[neural-ui-mcp@0.2.2](https://www.npmjs.com/package/neural-ui-mcp) incluye ambos catálogos. La versión anterior 0.1.0 solo cubre Web. No requiere backend, cuenta, claves, conexión de red durante la ejecución ni servicios de IA. La descarga de dependencias sí usa npm. El cliente de IA que elijas mantiene sus propias condiciones de uso.

## Instalar desde npm

La misma instalación sirve para Web y Native. Selecciona Native explícitamente al llamar a las herramientas.

```sh
npx --yes neural-ui-mcp@0.2.2
```

El proceso espera mensajes MCP en stdin. Para instalarlo como dependencia de tu proyecto usa `npm install --save-dev --save-exact neural-ui-mcp@0.2.2`. La instalación, el binario y el arranque con npx se comprueban con un cliente MCP real. [Evidencia de publicación](https://github.com/PedroMorenoTrujillo/neural-ai/blob/main/evidence/mcp/publication.json).

## Instalar el tarball verificado

Desde una copia del repositorio [Neural AI](https://github.com/PedroMorenoTrujillo/neural-ai):

```sh
npm ci
npm ci --prefix packages/mcp
npm run verify:mcp
npm install --prefix /ruta/absoluta/neural-mcp-local ./dist/mcp/neural-ui-mcp-0.2.2.tgz
```

El último comando instala el paquete local preparado por las pruebas. Comprueba su SHA-256 con `dist/mcp/SHA256SUMS`. También puedes ejecutar directamente `node /ruta/absoluta/neural-ai/packages/mcp/dist/cli.js` después de compilarlo. El proceso espera a un cliente en stdin.

## Conectar Codex y Claude Code

Usa un Node compatible disponible para el cliente.

Para usar directamente la versión publicada:

```sh
codex mcp add neural-ui -- npx --yes neural-ui-mcp@0.2.2
claude mcp add --transport stdio neural-ui -- npx --yes neural-ui-mcp@0.2.2
```

Para una instalación local del tarball:

```sh
codex mcp add neural-ui -- node /ruta/absoluta/neural-mcp-local/node_modules/neural-ui-mcp/dist/cli.js
claude mcp add --transport stdio neural-ui -- node /ruta/absoluta/neural-mcp-local/node_modules/neural-ui-mcp/dist/cli.js
```

Alternativa en `~/.codex/config.toml`:

```toml
[mcp_servers.neural-ui]
command = "node"
args = ["/ruta/absoluta/neural-mcp-local/node_modules/neural-ui-mcp/dist/cli.js"]
```

Configuración JSON para clientes que usan `mcpServers`:

```json
{
  "mcpServers": {
    "neural-ui": {
      "command": "node",
      "args": ["/ruta/absoluta/neural-mcp-local/node_modules/neural-ui-mcp/dist/cli.js"]
    }
  }
}
```

Sintaxis contrastada con [Codex MCP](https://developers.openai.com/codex/mcp/) y [Claude Code MCP](https://code.claude.com/docs/en/mcp) el 15-10-2026. Las pruebas usan el cliente MCP real del SDK oficial; no se han ejecutado sesiones de generación con los hosts Codex o Claude Code. No se cambia automáticamente su configuración.

## Herramientas

| Herramienta | Entrada principal | Resultado |
| --- | --- | --- |
| `list_components` | `query?`, `kind?`, `offset?`, `limit?` | Selector, clase e import público; hasta 50 resultados por página |
| `get_api` | `entrypoint`, `symbol?` | Exports o contrato completo, hash y ubicación de tipos |
| `search_documentation` | `query`, `limit?` | Búsqueda local, hasta 10 fragmentos y URI de la referencia completa |
| `get_example` | `id`: forms, table, navigation, overlays, theme | Fuente del ejemplo validado |
| `validate_usage` | `source`, `filename?` | Errores y advertencias estáticas; `compilationChecked: false` |

Todas aceptan `library: "web" | "native"` (predeterminado `web`) y una versión opcional que debe coincidir con el catálogo: Web `2.0.4`, Native `0.1.0-beta.2`. Las respuestas conservan `{ version, data }`, datos estructurados y texto JSON equivalente. Los errores de mezcla de catálogo o versión se rechazan; no hay conversión implícita. Para proyectos fijados a Core 2.0.3, conserva MCP 0.2.1 y la skill Web 0.1.1; para Core 2.0.1, conserva MCP 0.2.0 y la skill Web 0.1.0 hasta actualizar su baseline. La validación detecta imports internos, símbolos desconocidos, inputs/outputs inexistentes, inputs requeridos ausentes y propietarios de formulario en conflicto, dentro del alcance descrito abajo.

Ejemplo de argumentos para `get_api`:

```json
{"library":"native","version":"0.1.0-beta.2","entrypoint":"@neural-ui/native/input","symbol":"NeuInputComponent"}
```

Native tiene 67 entrypoints, los modelos heredados de sus controles y sus propios contratos de templates. Sus ejemplos son `forms`, `collections`, `navigation`, `overlays` y `theme`; `table` sigue siendo Web. `validate_usage` en Native rechaza imports Web de Neural y controles DOM, y comprueba `pressed` en lugar de aceptar `click` como evento del botón Native.

Recursos fijos: `neural-ui://docs/references/forms`, el resto de referencias bajo `neural-ui://docs/`, y ejemplos bajo `neural-ui://examples/examples/forms` (análogamente para los otros cuatro). Usa `resources/list` para descubrir los URI exactos. La búsqueda devuelve URI completos.

Native usa el espacio separado `neural-native://docs/references/forms` y `neural-native://examples/examples/forms`. La búsqueda de una biblioteca no devuelve documentos de la otra. Todos los URI Web existentes se conservan.

## Límites y seguridad

- Solo texto y recursos empaquetados. No lee proyectos, `.env`, rutas o URL suministradas; no importa ni ejecuta código enviado. No abre puertos, solicita roots, hace sampling ni escribe archivos durante la ejecución.
- Esquemas estrictos, límites de longitud, paginación y límite de elementos. Fuente máxima: 64 KiB UTF-8. El cliente debe limitar también el tamaño de los mensajes de transporte: el esquema se aplica después de decodificar JSON.
- Analiza sintaxis, imports e inline templates. No resuelve tipos de expresiones, herencia, scopes de componentes, NgModules ni templates externos/computados. Puede producir falsos positivos con directivas personalizadas. `valid: true` significa que no detectó errores dentro de ese alcance; ejecuta siempre el compilador y las pruebas Angular.
- Las referencias Web de migración mencionan v1 solo como contexto histórico. Native usa un catálogo separado y requiere selección explícita. El servidor no prueba comportamiento en iOS/Android ni garantiza accesibilidad por validar código estático.
- stdout contiene solo mensajes del protocolo. Diagnósticos genéricos en stderr; no registra el código recibido. SHA-256 detecta corrupción accidental del catálogo; no sustituye la autenticidad del paquete.
- Transporte stdio mediante SDK oficial TypeScript v2 **2.3.1**, compatible con MCP **2026-07-28** y clientes legacy **2025-11-25**. Sin transporte HTTP.

## Mantenimiento

Fuentes únicas: `evidence/api.json` y `evidence/native-api.json`, las referencias/ejemplos de cada skill y `shared/usage-validator.mjs`. `npm run build:mcp` comprueba ambos snapshots y genera los catálogos empaquetados con hashes separados. La skill Web y su release 0.1.0 conservan su alcance. Para actualizar Neural, revisa primero la extracción y los ejemplos, después reconstruye y verifica el MCP. No cambies silenciosamente la versión del catálogo.

Arquitectura, pruebas y publicación: [docs/mcp.md](https://github.com/PedroMorenoTrujillo/neural-ai/blob/main/docs/mcp.md).
