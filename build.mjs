import * as esbuild from 'esbuild'
import * as fs from 'fs'

// Change this to whatever the mod should be called, without the extension.
// const MOD_NAME = "[name]"

// Change this to something else if you want to make it go somewhere that it
// normally wouldn't
const OUT_FILE = `sandboxels/mods/${MOD_NAME}.js`

await esbuild.build({
    entryPoints: ['src/main.ts'],

    outfile: OUT_FILE,
    platform: "browser",
    logLevel: "error",
    bundle: true,

    loader: {
        // Force .html and .css to load as text
        ".html": "text",
        ".css": "text",

        // Use dataurl for .png and .svg (you probably need to extend this list anyway)
        ".png": "dataurl",
        '.bmp': "dataurl",
        ".svg": "dataurl"
    },

    banner: {
        js: `// ${MOD_NAME}.js`
    },
}).then((result) =>{
    let stats = fs.statSync(`sandboxels/mods/${MOD_NAME}.js`)
    console.log("Build finished")
    console.log("Build output size: ", stats.size, "(B)")
})