# Layout, accessibility and localization

Use native primitives and the app's safe-area shell. `SafeAreaProvider` supplies insets; `SafeAreaView` applies them. Respect all needed edges in landscape, not just the top inset in portrait. Let collection content scroll inside a bounded layout, and leave deliberate padding/gaps between labels, fields, cards and buttons.

`ScrollView`'s `contentContainerStyle` controls content padding/gap. When a focused field must not consume the first tap on another control, choose `keyboardShouldPersistTaps="handled"` for that flow and verify the actual renderer behavior. Avoid focusing a search input on opening every selection popup if that unnecessarily summons the mobile keyboard.

Give Neural buttons visible labels and icon actions useful accessible names through their declared inputs. Use native `text` for readable content. Keep selection visible without relying on color alone, and preserve reduced-motion behavior when styling transitions.

Translate the component's exposed action/search/empty/error/close labels and date locale. Keep option IDs and stored values independent of language. Preserve prerelease names such as Beta/Alpha as product/version terms rather than translating a package version.

Exercise each changed flow at a narrow width, both orientations, enlarged system text and light/dark themes. Check keyboard dismissal, scrolling, focus and return from overlays. Browser preview checks help catch clipping and action failures; they do not verify native VoiceOver/TalkBack announcements, touch exploration or native module availability. Report these as separate checks, with observed evidence rather than an accessibility certification.
