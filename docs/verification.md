# Verificación de Neural AI 0.1.0

Baseline: @neural-ui/core 2.0.1; Angular/CDK/CLI 22.2.2; TypeScript 6.0.3; Playwright 1.63.0. Validación local ejecutada el 15 de octubre de 2026 en macOS. Los resultados de CI se consultan en la pestaña Actions del repositorio.

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

Antes de anunciar compatibilidad probada con cada agente, ejecutar los escenarios del protocolo y adjuntar versiones, prompts, diffs, builds y resultados de interacción. Para ampliar versiones de Neural, regenerar contratos y volver a verificar antes de cambiar el soporte declarado.
