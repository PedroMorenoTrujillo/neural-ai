# neural-ui-mcp

Servidor MCP oficial de Neural UI v2, local y de solo lectura. Consulta **@neural-ui/core 2.0.1**: 96 entrypoints públicos, 107 referencias y cinco ejemplos Angular 22. Licencia MIT. Node **22.22.3 o posterior**.

Preparado para npm, **todavía no publicado**. No ejecutes `npx neural-ui-mcp` esperando esta versión hasta que exista una publicación verificada. No requiere backend, cuenta, claves, conexión de red durante la ejecución ni servicios de IA. La descarga de dependencias sí usa npm. El cliente de IA que elijas mantiene sus propias condiciones de uso.

## Instalar el tarball verificado

Desde una copia del repositorio [Neural AI](https://github.com/PedroMorenoTrujillo/neural-ai):

```sh
npm ci
npm ci --prefix packages/mcp
npm run verify:mcp
npm install --prefix /ruta/absoluta/neural-mcp-local ./dist/mcp/neural-ui-mcp-0.1.0.tgz
```

El último comando instala el paquete local preparado por las pruebas. Comprueba su SHA-256 con `dist/mcp/SHA256SUMS`. También puedes ejecutar directamente `node /ruta/absoluta/neural-ai/packages/mcp/dist/cli.js` después de compilarlo. El proceso espera a un cliente en stdin.

## Conectar Codex y Claude Code

Sustituye las rutas por las de tu instalación y usa un Node compatible disponible para el cliente:

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

Todas aceptan `version: "2.0.1"` opcional y rechazan otras versiones. Respuestas con `version`, datos estructurados y texto JSON equivalente. La validación detecta imports internos, símbolos desconocidos, inputs/outputs inexistentes, inputs requeridos ausentes y propietarios de formulario en conflicto, dentro del alcance descrito abajo.

Recursos fijos: `neural-ui://docs/references/forms`, el resto de referencias bajo `neural-ui://docs/`, y ejemplos bajo `neural-ui://examples/examples/forms` (análogamente para los otros cuatro). Usa `resources/list` para descubrir los URI exactos. La búsqueda devuelve URI completos.

## Límites y seguridad

- Solo texto y recursos empaquetados. No lee proyectos, `.env`, rutas o URL suministradas; no importa ni ejecuta código enviado. No abre puertos, solicita roots, hace sampling ni escribe archivos durante la ejecución.
- Esquemas estrictos, límites de longitud, paginación y límite de elementos. Fuente máxima: 64 KiB UTF-8. El cliente debe limitar también el tamaño de los mensajes de transporte: el esquema se aplica después de decodificar JSON.
- Analiza sintaxis, imports e inline templates. No resuelve tipos de expresiones, herencia, scopes de componentes, NgModules ni templates externos/computados. Puede producir falsos positivos con directivas personalizadas. `valid: true` significa que no detectó errores dentro de ese alcance; ejecuta siempre el compilador y las pruebas Angular.
- Las referencias de migración mencionan v1 como contexto histórico. La API servida es exclusivamente v2 web. Neural Native queda fuera de ámbito.
- stdout contiene solo mensajes del protocolo. Diagnósticos genéricos en stderr; no registra el código recibido. SHA-256 detecta corrupción accidental del catálogo; no sustituye la autenticidad del paquete.
- Transporte stdio mediante SDK oficial TypeScript v2 **2.3.1**, compatible con MCP **2026-07-28** y clientes legacy **2025-11-25**. Sin transporte HTTP.

## Mantenimiento

Fuentes únicas: `evidence/api.json`, `skills/neural-ui/references`, `skills/neural-ui/examples` y `shared/usage-validator.mjs`. `npm run build:mcp` comprueba la API y genera copias de distribución. La Skill y su release 0.1.0 permanecen intactas. Para actualizar Neural, revisa primero la extracción y los ejemplos, después reconstruye y verifica el MCP. No cambies silenciosamente la versión del catálogo.

Arquitectura, pruebas y publicación: [docs/mcp.md](https://github.com/PedroMorenoTrujillo/neural-ai/blob/main/docs/mcp.md).
