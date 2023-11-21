import es from "esbuild"
import fs from "fs"
import * as sass from "sass"

const dir_client = "./dist"

if (fs.existsSync(dir_client)) {
    fs.rmSync(dir_client, { recursive: true })
}

fs.mkdirSync(dir_client, { recursive: true })
fs.copyFileSync("./resources/favicon.ico", `${dir_client}/favicon.ico`)
fs.copyFileSync("./resources/index.html", `${dir_client}/index.html`)

es.buildSync({
    entryPoints: ["./src/index.ts"],
    outfile: `${dir_client}/client.js`,
    minify: true,
    bundle: true,
    tsconfig: "./tsconfig.json",
    platform: "browser",
    treeShaking: true,
    loader: { ".wgsl": "text" },
})

let res = sass.compile("./src/styles/index.scss")
fs.writeFileSync(`${dir_client}/client.css`, res.css)
