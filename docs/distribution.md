# Distribución pública de Neural AI 0.1.0

Estado comprobado el 15 de octubre de 2026. Se conserva la versión validada v0.1.0; la skill y su etiqueta no se han sustituido. Coste adicional contratado: **0 €**. No se han aceptado planes de pago, creado cuentas nuevas, usado APIs de IA de pago ni desplegado servicios.

## Estado por canal

| Canal | Estado real | Enlace y evidencia |
| --- | --- | --- |
| GitHub | Publicado: repositorio público MIT, etiqueta y archivo instalable con checksums | [Repositorio](https://github.com/PedroMorenoTrujillo/neural-ai), [release](https://github.com/PedroMorenoTrujillo/neural-ai/releases/tag/v0.1.0) |
| Skills.sh | Publicado y ficha verificada en navegador | [neural-ui](https://www.skills.sh/pedromorenotrujillo/neural-ai/neural-ui), [captura](assets/skills-sh-listing.jpg) |
| Skillstore | Procesamiento superado; PR creada y en revisión final, todavía no publicado | [PR #3792](https://github.com/aiskillstore/marketplace/pull/3792), [seguimiento](https://skillstore.io/es/submissions/676de7bb-7215-4418-99f6-7e00fbbed494), [workflow superado](https://github.com/aiskillstore/marketplace/actions/runs/38807780270), [justificante](assets/skillstore-submission.jpg) |
| SkillsMP | Preparado para indexación automática; ficha no confirmada | [FAQ oficial](https://skillsmp.com/docs/faq): topics claude-skills y claude-code-skill añadidos; sincronización diaria |
| Skills Directory | Pendiente por autenticación | [Acceso al envío](https://app.skillsdirectory.com/sign-in?returnTo=%2Fsubmit); requiere una sesión interactiva del titular que no se ha completado |
| VoltAgent | No enviado: todavía no cumple el requisito de adopción comunitaria | [Reglas de contribución](https://github.com/VoltAgent/awesome-agent-skills/blob/main/CONTRIBUTING.md) |
| Travisvn | No enviado: exige al menos 10 estrellas y excluye envíos asistidos por IA | [Reglas de contribución](https://github.com/travisvn/awesome-claude-skills/blob/main/CONTRIBUTING.md) |
| Directorio universal de OpenAI | Investigado; no enviado | [Requisitos oficiales](https://developers.openai.com/plugins/deploy/submission): paquete plugin, identidad verificada y permisos de publicación |

No se han creado PRs que incumplan requisitos de los directorios, comprado estrellas ni generado instalaciones para alterar rankings. La primera instalación real del CLI permitió registrar la ficha de Skills.sh; las verificaciones posteriores desactivan su telemetría.

Skillstore permite un envío anónimo y lo declara en su formulario. Se envió la URL fijada a v0.1.0, la licencia y un resumen verificable de pruebas; las notificaciones GitHub opcionales quedaron desactivadas. Enviado o procesando no significa publicado. La decisión de revisión corresponde al directorio.

El estado estructurado está en [channels.json](../evidence/distribution/channels.json). Las condiciones de los sitios pueden cambiar; este informe registra lo observado durante esta ejecución.

## Instalación comprobada mediante Skills.sh

Desde el directorio de una aplicación, sin instalar globalmente el CLI:

```sh
npx --yes skills@1.7.2 add https://github.com/PedroMorenoTrujillo/neural-ai/tree/v0.1.0/skills/neural-ui --skill neural-ui --agent codex claude-code --copy --yes
```

El CLI instala la carpeta en .agents/skills/neural-ui para Codex y .claude/skills/neural-ui para Claude Code. skills-lock.json registra source, ref v0.1.0 y skillPath. Las dos instalaciones incluyen referencias y ejemplos y conservan contenidos idénticos.

Este camino usa npm para ejecutar el instalador opcional. La [instalación por git y copia](../README.md#instalar-en-codex) sigue disponible sin npm para la skill. No se exige ningún servicio de IA de pago adicional.

Fuentes: [CLI oficial](https://www.skills.sh/docs/cli), [código del instalador](https://github.com/vercel-labs/skills), [Codex](https://developers.openai.com/codex/skills/) y [Claude Code](https://code.claude.com/docs/en/skills).

## Prueba en una aplicación Angular limpia

Se creó un proyecto nuevo con Angular CLI 22.2.2 fuera de Neural AI, con node_modules y lockfile propios. Primero se instaló la skill etiquetada con el helper de Codex desde GitHub; después se comprobó el CLI de Skills.sh con ambos agentes. No se emplearon enlaces a las dependencias del repositorio de Neural AI.

Codex leyó y aplicó la skill instalada en esta sesión para construir un consumidor nuevo. La prueba compone formulario, Select, Table, Tabs, Dialog y un preset tipado en una aplicación de clientes. Los archivos están en [tests/distribution](../tests/distribution); el resultado sin rutas privadas está en [clean-install.json](../evidence/distribution/clean-install.json).

Comprobaciones realizadas:

- Angular/core/forms/CDK 22.2.2 y @neural-ui/core 2.0.1 instalados en el proyecto independiente.
- Skill fijada a v0.1.0 y copias autocontenidas para ambos agentes, con SHA-256 coincidente y referencias locales válidas.
- Compilación de producción con TypeScript estricto, strictTemplates y bundles browser/servidor.
- Crear un cliente con required/minLength, seleccionar región y restablecer valor, touched y dirty.
- Ordenar la tabla, aceptar selección en estado de aplicación y editar el cliente seleccionado.
- Rechazar Escape con cambios sin guardar, guardar el cambio y devolver el foco al disparador.
- Navegar Tabs por teclado, aplicar el preset oscuro y mantener el ancho a 375 px.
- Renderizar contenido real mediante SSR sin JavaScript e interactuar después de hidratar sin errores de navegador.

Resultado: **2 escenarios nuevos superados**, además de **11 pruebas de contratos/instalación/compilación negativa y 8 escenarios Chromium de la suite original**. Las ejecuciones originales de GitHub Actions en [main](https://github.com/PedroMorenoTrujillo/neural-ai/actions/runs/38804446468) y en [v0.1.0](https://github.com/PedroMorenoTrujillo/neural-ai/actions/runs/38804794934) estaban superadas antes de distribuir la versión.

El flujo ampliado también está [superado en Linux](https://github.com/PedroMorenoTrujillo/neural-ai/actions/runs/38808505548): suite original, instalación limpia completa, enlaces, procedencia y empaquetado. La [evidencia estructurada de CI](../evidence/distribution/ci.json) registra el commit comprobado y la conclusión de cada paso.

Para reproducir toda la instalación limpia:

```sh
npm ci
npx playwright install chromium
npm run test:clean-install
```

El script crea una aplicación temporal nueva, instala dependencias desde su lockfile independiente, descarga la skill desde GitHub con telemetría desactivada, compila y ejecuta los escenarios. Conserva informes en test-results y la aplicación temporal hasta la limpieza normal del entorno. También forma parte de GitHub Actions.

La instalación y la aplicación real están probadas. Las sesiones independientes de generación en Codex y Claude Code siguen pendientes según [el protocolo](../tests/agent-scenarios.md); no se presentan como superadas. La instalación para Claude Code no demuestra por sí sola su descubrimiento ni su generación.

## Trabajo externo pendiente

Skillstore debe aprobar la PR ya creada. SkillsMP debe sincronizar su índice. Skills Directory requiere una sesión autenticada. Los listados curados tienen condiciones de elegibilidad que aún no se cumplen. No se ha creado una automatización de seguimiento ni contratado herramientas para resolver esos pasos.
