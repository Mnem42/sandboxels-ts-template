# TS mod template

A template for making mods in TS for sandboxels with entirely too much submodule
related fuckery. It's primarily made for esbuild, but you can manually use
another build system if you want to.

Esbuild is used by the build script because it's much faster than TSC, but if you
prefer another build system, you can make a build script for it or invoke it manually.

## Initialisation

### Tools

To quickly and easily initialise the submodules and npm, run `init.ps1` for powershell or `init.sh`
for sh or bash. They run effectively the same thing, they're mostly just named differently.

### Edits

To set the name of the mod, uncomment this line in build.mjs and replace `[MOD_NAME]`
with the name you want the mod to have *without* the .js extension (e.g. if you want
it to be called `test.js`, set it to `test`)

```js
// const MOD_NAME = "[name]"
```

## Usage

### Compiling

Either use `npm run build` or `node build.mjs`. `npm run build` is set to just
run the latter, so the only difference is the terminal output.

### Updating submodules

To update the submodule contents, which you should do occasionally (because they
are in active development), run `git submodule update --recursive --remote`.

### Note on bundling HTML and CSS

For bundling HTML and CSS into the JS files outputted, `build.mjs` has this in it:
```js
loader: {
    "*.html": "text",
    "*.css": "text"
}
```
This is needed because, by default, CSS files are outputted "next to" the output JS, and esbuild
has no default behaviour defined for HTML.

For importing these, you can use something like this:
```ts
// NOTE: you do still have to manually add this into the DOM, the
// imports just put the text in the file into a constant
import HTML from "../assets/thing.html"
import CSS  from "../assets/style.css"
```
This will cause errors with eslint since it doesn't "know" that it's fine, but it really does
bundle perfectly well with esbuild.

If you need to import other dependencies similarly, you can add extra extensions if the default
behaviours (as documented in [the esbuild docs](https://esbuild.github.io/content-types/)) aren't
correct for what you want to do. For example, if you want an image imported as a data URI, you need
to add a line like
```js
"*.png": "dataurl"
```
into `loader` so you can access it like
```ts
import IMG from "../assets/thing.png"
```

### Pull requesting changes

#### Github CLI

```bash
gh auth login
gh pr create --title <title> --body <body>
```

First login with `gh auth login` and then create a pull request.

## Targets

By default, it's set to build for the latest version of ECMAScript supported. If you
want to peg it to a specific version, you can set target to whichever version you
need to (e.g. `es2017`)

(surrounding area)

```json
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
```
