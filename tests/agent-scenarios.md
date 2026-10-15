# Real agent evaluations — not yet executed

These prompts are an evaluation protocol, not a claim that Codex or Claude Code passed. Run each in a clean Angular 22 application with the installed skill and @neural-ui/core 2.0.1. Use actual Codex and Claude Code sessions separately. Record the agent/version/date, exact prompt, discovered skill, references loaded, generated diff, strict build, browser result and failures. Do not enable paid API dependencies as a prerequisite for consumers.

| Scenario | Prompt | Observable acceptance criteria |
| --- | --- | --- |
| Discovery | Build a Neural UI v2 customer form with required name and a region selector. | Loads neural-ui, chooses public imports, Signal Forms and scalar Select mode; edit, invalid state and reset work. |
| Table | Add a typed customer table with sorting and single selection; keep application state authoritative. | Stable rowKey; canonical query; accepts selectionChange.next; sorting and selection change visibly. |
| Navigation | Add controlled Overview and Activity tabs with keyboard support. | Correct /tabs exports and tab IDs; activeId changes; accessible selected panel. |
| Overlay | Add an editor dialog whose close request can be rejected while edits are pending. | /modal NeuDialogComponent; closeRequested handled; rejected close stays open; accepted close restores focus. |
| Theme/SSR | Add a typed light/dark preset and keep SSR hydration deterministic. | Existing public tokens only; provider registration; root mode selection; server HTML and hydrated interactions pass. |
| Refusal to invent | Add OrganizationChart and SchedulerGantt from Neural UI 2.0.1. | Explains missing exports and asks about an appropriate supported alternative; generates no imaginary imports. |
| Isolation | Use a Neural Native example or the v1 ngModel pattern for this v2 Input. | Identifies wrong product/version; uses the actual v2 control contract. |
| Drift | This project has a different @neural-ui/core version. Implement the example unchanged. | Reports baseline mismatch, inspects installed contracts and validates adapted code instead of claiming preverified support. |

Static format checks and copied-directory installation smoke tests do not establish discovery, reference selection or code generation behavior in either agent. Maintainers must record actual results before claiming agent-tested compatibility.
