# Verificación de Neural AI

## Native 0.1.3 y MCP 0.2.6

La skill Native 0.1.3 usa **@neural-ui/native 0.1.0-beta.7**, Angular Native **0.22.2** y Angular **22.2.2**. Se han verificado el SHA-512 del paquete npm, el tag y el [pipeline de publicación del commit `279360579e42672d969f0bc3247435cf8a7ba33d`](https://github.com/PedroMorenoTrujillo/neural-native/actions/runs/42289074651). La migración del framework se ha revisado explícitamente; el sincronizador sigue sin decidirla automáticamente.

Pasan las 68 entradas públicas, los 28 tokens, los seis ejemplos con plantillas estrictas y los doce recorridos nativos en el host de navegador, en vertical y horizontal. También pasan los 22 tests Node, los ocho escenarios Web con Core 2.0.4 y la instalación en un consumidor limpio. La API pública de Native se mantiene; beta.7 corrige el color nativo del placeholder de Input Mask e Input Tags al cambiar de tema.

MCP 0.2.6 supera sus 16 pruebas de protocolo y seguridad, el paquete en un consumidor aislado sin acceso a red y la auditoría de dependencias de producción. Pasan además las siete pruebas de política de publicación y las verificaciones de enlaces y procedencia. La skill Web conserva su versión 0.1.2 y su base Core 2.0.4.

La librería beta.7 ha superado 457 pruebas unitarias y, en aplicaciones standalone con Expo SDK 57 y React Native 0.86.3, 68 comprobaciones en Android y 68 en el simulador iOS. Se han revisado 406 capturas intencionales, incluidos los estados claros, oscuros, horizontales y la selección real de un documento con error y reintento de subida simulada. El archivo publicado y el candidato instalado en esas aplicaciones contienen los mismos 483 archivos, verificados byte por byte.

Un consumidor adicional con la base de la plantilla actual —Expo SDK 58, React Native 0.88 y React 19.3— supera instalación estricta, compilación, 74 pruebas y bundles Android/iOS. Este último control no equivale a una batería de aplicaciones SDK 58 instaladas. Los recorridos del laboratorio tampoco certifican dispositivos físicos, vibración física ni lectores de pantalla; las pruebas de navegador de la skill se mantienen separadas de la evidencia nativa.

## Native 0.1.2 y MCP 0.2.5

La skill Native 0.1.2 usa el paquete publicado **@neural-ui/native 0.1.0-beta.6**, Angular Native **0.21.0** y Angular **22.2.2**. Se han verificado la integridad SHA-512 del tarball, el tag y el pipeline de publicación del commit `1f6bbd25e5b285e426a7353c2bd8faf86539201a`. La actualización del framework se ha revisado explícitamente; el sincronizador automático no decide migraciones de framework.

Pasan las 68 entradas públicas, los 28 tokens, los seis ejemplos con plantillas estrictas y sus doce recorridos de navegador en vertical y horizontal. No se han añadido ni eliminado contratos públicos respecto a beta.5. Los 22 tests Node, los ocho escenarios Web con Core 2.0.4 y la instalación en un consumidor limpio también pasan.

MCP 0.2.5 supera las 16 pruebas de protocolo y seguridad, la ejecución del paquete en un consumidor aislado con denegación de red y la auditoría de producción sin vulnerabilidades conocidas al comprobarla. La política de publicación conserva sus siete pruebas de autorización, procedencia y separación de versiones.

La librería beta.6 se ha probado además en apps standalone: 68 comprobaciones en Android y 68 en el simulador iOS, con selección real de documentos, háptica nativa, ciclo de vida y orientación horizontal. Se han revisado 390 capturas claras, oscuras y horizontales. Estos recorridos pertenecen al laboratorio de la librería; las pruebas de la skill usan el host de navegador y no certifican dispositivos físicos ni lectores de pantalla.

## Native 0.1.1 y MCP 0.2.3

La skill Native 0.1.1 utiliza el paquete npm **@neural-ui/native 0.1.0-beta.5**, Angular Native **0.19.2** y Angular **22.2.2**. Se han regenerado sus 68 entradas públicas y 28 tokens desde las declaraciones distribuidas, sin reutilizar contratos del catálogo Web.

Incluye seis ejemplos compilados con plantillas estrictas. Los doce recorridos de navegador pasan en vertical y horizontal, incluida la preferencia háptica con un módulo no disponible. No se afirma que el navegador vibre ni que estas pruebas certifiquen dispositivos físicos.

El MCP incorpora el adaptador opcional de háptica, los miembros públicos de NeuHaptics y el input por control. Pasan las 16 pruebas de protocolo y seguridad, incluidas peticiones reales al servicio y al ejemplo háptico desde un cliente SDK. También pasa la instalación aislada del tarball con la red bloqueada durante la ejecución. La auditoría de dependencias de producción del MCP no registra vulnerabilidades conocidas al verificarlo. Los ocho escenarios Web siguen pasando con Core 2.0.4.

El flujo de publicación por tags comprueba versión, rama de procedencia e integridad del artefacto antes de usar OIDC. El permiso inicial del publicador en npm se configura por separado; añadir el workflow no equivale a autorizarlo en el registro. Las evidencias de publicaciones anteriores se conservan como registros históricos.

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
## Actualización Web 0.1.2 y MCP 0.2.2

La actualización utiliza `@neural-ui/core@2.0.4`, publicado desde el commit `f691969df36bd402dbe2d62ed6adaaa4799b55d9`. Las referencias se regeneran desde las declaraciones distribuidas por npm y su integridad registrada en `evidence/sources.json`.

Incluye el nuevo input público `closeLabel` de Dialog. La prueba con el cliente MCP consulta ese input y valida un componente Angular que lo utiliza; también comprueba que las peticiones fijadas al catálogo Web 2.0.3 se rechacen en el servidor actualizado. Native conserva su baseline 0.1.0-beta.2.

Pasan las 11 pruebas de contratos, ocho escenarios Web con plantillas Angular estrictas y SSR, diez escenarios de los ejemplos Native mediante su renderer Web, y 15 pruebas MCP con el cliente oficial sobre stdio real. El paquete MCP se ha instalado de forma aislada con la red bloqueada: las cinco herramientas, los recursos y ambos catálogos funcionan. La auditoría de dependencias de producción no detecta vulnerabilidades conocidas; la skill también pasa el validador de estructura de Codex.

El archivo publicado es `neural-ui-mcp-0.2.2.tgz`, con 15 archivos y SHA-256 `0986755e0e489af97f0bf25ae3eabbd8faf5eeb77b68bb255071b556162eb62a`. La descarga pública coincide exactamente con ese archivo verificado; pasan la instalación limpia, el binario y `npx` con un cliente SDK real y los dos catálogos. La evidencia actual está en `evidence/mcp/release-0.2.2.json` y `evidence/mcp/publication.json`. Estas pruebas no equivalen a una sesión de un agente dentro de Codex o Claude Code, ni a pruebas en dispositivos Native físicos. Los resultados y límites de las publicaciones anteriores se conservan.
