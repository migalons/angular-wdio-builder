# 1.1.4
Security fixes:
- Bump `js-yaml` to 3.15.0 (quadratic-CPU DoS via merge keys) — the prior
  Dependabot bump only reached 3.14.2, one minor short of the actual patch.
- Bump `brace-expansion` to 5.0.8 (unbounded-expansion OOM DoS); prior alerts
  for this dependency were dismissed without the version ever being patched.
- Bump `diff` to 4.0.4 (ReDoS in `parsePatch`/`applyPatch`).
- Remove unused `jasmine-node` devDependency — it wasn't referenced by any
  script (the test runner is `jasmine`) and pulled in a critical
  command-injection vulnerability via `jasmine-growl-reporter` → `growl`.

# 1.1.3
Fix `TypeError: Launcher is not a constructor` when running against
`@wdio/cli` v8.46+/v9. Those versions ship a CJS interop shim that exports
`Launcher` as a named export instead of `default` (v7's shape). The builder
now resolves either shape, so v7, v8 and v9 all work. (#10)

# 1.1.2
Security fixes:
- Bump `ajv` to 8.18.0 (ReDoS)
- Bump `minimatch` to 3.1.5 (ReDoS)
- Bump `semver` to 5.7.2 (ReDoS)
- Bump `underscore` to 1.13.8 (DoS)
- Added `overrides` in `package.json` for dev-time stability.

# 1.1.1
Bump dependencies due to security issues

# 1.1.0
Bumping angular devkit to support angular 14

# 1.0.2
Bump dependencies due to security issues

# 1.0.1
Bump dependencies due to security issues

# 1.0.0
Initial version