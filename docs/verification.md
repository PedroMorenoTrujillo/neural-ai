# Verificación de Neural AI

## Actualización Web 0.1.1 y MCP 0.2.1

Baseline comprobado el 27 de octubre de 2026: **@neural-ui/core 2.0.3**, Angular/CDK/CLI 22.2.2 y TypeScript 6.0.3. Se han regenerado las referencias desde el paquete npm y verificado su SHA-512 y el commit de publicación `748b85a3b4e9a183b306eaa00cf64d4deb58de21`.

La comparación con 2.0.1 conserva los 96 entrypoints admitidos, las firmas públicas y los 262 tokens. Solo cambia el hash de una declaración de CascadeSelect; no cambia su contrato público. La política de soporte coincide con la del commit publicado.

La compilación Angular estricta y los ocho escenarios Web de navegador pasan con 2.0.3. También pasan los diez recorridos Native, las quince pruebas del MCP y el paquete instalado en un consumidor aislado con la red bloqueada durante la ejecución. Una aplicación Angular limpia instala la skill en las carpetas de Codex y Claude Code, comprueba la integridad del paquete 2.0.3, compila y supera sus dos escenarios adicionales de navegador. La auditoría de dependencias de producción del MCP no informa vulnerabilidades conocidas.

El catálogo Native continúa en `@neural-ui/native@0.1.0-beta.2` y la skill Native en 0.1.0. El MCP 0.2.1 exige Web 2.0.3 si se indica una versión; rechaza 2.0.1 en lugar de mezclar contratos. Los consumidores que necesiten Core 2.0.1 pueden conservar la skill Web 0.1.0 y MCP 0.2.0. Las etiquetas y evidencias históricas no se reescriben.

Estas comprobaciones no añaden sesiones independientes de generación en Codex o Claude Code ni certificación de dispositivos o accesibilidad. Los límites descritos más abajo siguen vigentes.

## Verificación original de Web 0.1.0

Baseline: @neural-ui/core 2.0.1; Angular/CDK/CLI 22.2.2; TypeScript 6.0.3; Playwright 1.63.0. Validación local ejecutada el 15 de octubre de 2026 en macOS. Los resultados de CI se consultan en la pestaña Actions del repositorio.

La fase posterior de distribución añade una instalación desde GitHub en una aplicación Angular independiente y dos escenarios de navegador nuevos. Está documentada en [el informe de distribución](distribution.md), con su script reproducible y los estados de publicación.

| Comprobación | Resultado local | Alcance |
| --- | --- | --- |
| Procedencia | Superada | SHA-512 del tarball npm, versión de código fuente y política oficial del commit registrado |
| API generada | Superada | 96 entrypoints admitidos, aliases de inputs/outputs, tipos exportados, hashes completos y 262 tokens públicos |
| SKILL.md | Superada | YAML real, campos portables, nombre, descripción, metadatos y entrada breve |
| Referencias y ejemplos | Superada | Enlaces locales, imports/exportaciones, selectores, bindings y tokens |
| Pruebas Node/Angular negativas | 11 superadas | Contratos ausentes, deriva, versiones antiguas, aislamiento Native/internos, formato, referencias e instalación autocontenida |
| Build Angular | Superado | Templates estrictos, bundles browser y servidor; mismos archivos de examples |
| Chromium | 8 superadas | Formularios, Select, Table, Tabs, Dialog, temas, SSR/hidratación y layout estrecho |
| Enlaces externos | Superada | Respuestas HTTP de las fuentes y enlaces documentados; informe generado en test-results/links.json |
| Codex: descubrimiento y generación | Pendiente | No se ejecutó una sesión independiente usando la skill instalada |
| Claude Code: descubrimiento y generación | Pendiente | No se ejecutó una sesión independiente usando la skill instalada |

Los tests de instalación copian la carpeta completa a ubicaciones temporales .agents/skills y .claude/skills y vuelven a resolver todos sus enlaces locales. Demuestran que la distribución es autocontenida. No demuestran la selección automática o la calidad de generación de un agente.

Las pruebas SSR sirven HTML por petición desde el servidor local de Angular CLI. Un navegador sin JavaScript comprueba contenido inicial real; un navegador con JavaScript interactúa con los mismos controles y falla ante errores de consola o hidratación. Esto no despliega ningún servicio.

Durante el desarrollo, las pruebas detectaron y corrigieron los contratos de Select single y Table.selectionChange.next, la allowlist de hosts para SSR local y el reset CSS border-box necesario para el layout de la muestra. Se corrigieron también localizadores que confundían el texto del icono de error con el mensaje y la sincronización al reabrir Dialog. El paquete de Neural UI se mantuvo intacto.

Los informes de enlaces y navegador se generan en test-results. GitHub Actions conserva artefactos brevemente solo si una ejecución falla. No se incluyen trazas con rutas locales en la distribución de la skill.

Limitaciones: solo baseline 2.0.1; solo Chromium; no auditoría exhaustiva de los componentes; no prueba de lector de pantalla ni certificación WCAG; sin integración remota de Table ni codemod automático de v1; evaluaciones de agentes pendientes según [el protocolo](../tests/agent-scenarios.md). El catálogo generado certifica la extracción estructural, no el comportamiento completo de cada export.

## Ampliación Native del 27-10-2026

Baseline adicional: `@neural-ui/native@0.1.0-beta.2`, Angular Native/renderer Web 0.18.2 y Angular 22.2.2. La skill Native tiene ciclo propio y no cambia las instrucciones de la skill Web publicada.

- Extracción comprobable desde 67 entrypoints, incluyendo bindings heredados y los 28 tokens claros/oscuros. El paquete instalado se contrasta con su integridad npm y el commit público registrado en `evidence/native-sources.json`.
- Los cinco ejemplos importados directamente de la skill pasan el compilador Angular con `strictTemplates`. Su fixture usa `@ng-native/web`, no imitaciones HTML de los componentes.
- Diez recorridos de navegador ejercitan formularios, selección y filtrado, cambio real de contenido de navegación, apertura/cierre de modal con footer proyectado y cambio de tema. Se prueban 390×844 y 844×390, errores de página y desbordamiento horizontal.
- Quince pruebas MCP cubren el catálogo Web existente y el nuevo catálogo Native, el cliente SDK real, los cinco tools, recursos, parsers, integridad, límites, selección de biblioteca y rechazo de versiones/imports cruzados.
- La prueba del paquete instalado verifica ambas bibliotecas con la red bloqueada durante la ejecución del servidor. Descargar o instalar dependencias sí necesita npm.

Estos resultados son de compilación, transporte y navegador, no una nueva prueba de hardware iOS/Android ni de VoiceOver/TalkBack. Tampoco se han ejecutado sesiones independientes de generación en los hosts Codex y Claude Code. La instalación pública del MCP se contrasta con el registro y el hash de release; la skill Native usa la etiqueta independiente `neural-native-v0.1.0`.

Antes de anunciar compatibilidad probada con cada agente, ejecutar los escenarios del protocolo y adjuntar versiones, prompts, diffs, builds y resultados de interacción. Para ampliar versiones de Neural, regenerar contratos y volver a verificar antes de cambiar el soporte declarado.
