# Locked Charts Native consumer

This fixture preserves the dependency graph used by the tested standalone app:
Angular 22.3.0, Angular Native 0.25.0, Expo 58.0.21, React Native 0.88.1,
React 19.3.0, Charts Native beta.7, Neural Native beta.9 and Core 0.1.3.

The API verifier copies it into a disposable directory and runs strict `npm ci`
before compiling every skill example. It does not resolve a new Expo host or
optional web peer graph on every CI run. All packages come from the public npm
registry; there are no source links or patched installed files.

Refresh both manifests deliberately when changing the reviewed library or SDK
baseline, then repeat the clean consumer and native acceptance checks. The
`--tarball` verifier option installs a complete candidate archive while keeping
the fixture's SDK graph. This compiler fixture is separate from native UI tests.
