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