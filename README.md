# TS mod template

A template for making mods in TS for sandboxels. It's primarily made for esbuild,
but you can manually use tsc if you want to.

Esbuild is used by the build script because it's much faster than TSC, but if you
prefer another build system, you can make a build script for it or invoke it manually.

## Targets

By default, it's set to build for the latest version of ECMAScript supported. If you
want to peg it to a specific version, you can set target to whichever version you
need to (e.g. `es2017`)

(surrounding area)

```json
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
```
