import * as esbuild from 'esbuild'
import * as fs from 'fs'
import { createServer } from 'http'

// Change this to whatever the mod should be called, without the extension.
const MOD_NAME = "test"

// Change this to something else if you want to make it go somewhere that it
// normally wouldn't
const OUT_FILE = `sandboxels-mods/mods/${MOD_NAME}.js`

const host_server = process.env.HOST_SERVER === "true"
const server_port = parseInt(process.env.SERVER_PORT) || 3000

await esbuild.build({
    entryPoints: ['src/main.ts'],

    outfile: OUT_FILE,
    platform: "browser",
    logLevel: "error",
    bundle: true,

    loader: {
        // Force .html, .svg, and .css to load as text
        ".html": "text",
        ".css": "text",
        ".svg": "text"
    },

    banner: {
        js: `// ${MOD_NAME}.js`
    },
}).then(() => {
    let stats = fs.statSync(`sandboxels-mods/mods/${MOD_NAME}.js`)
    console.log("Build finished")
    console.log("Build output size: ", stats.size, "(B)")

    if (host_server) {
        const code = fs.readFileSync(`sandboxels-mods/mods/${MOD_NAME}.js`)

        const server = createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.end(code)
        })
        server.listen(server_port)
    }
})