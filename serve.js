import express from "express"

const app = express()
app.use("/learn-to-paint", express.static(`./dist/`))
app.listen(3000)
