process.env.NODE_CONFIG_DIR = __dirname + "/config"
const config = require("config")
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")


const app = express()

//parse body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//router
require("./router")(app)

app.use(express.static(path.join(__dirname, "../public"), { fallthrough: false }));

console.log(`*** ${String(config.get("LEVEL")).toUpperCase()} ***`)

app.listen(config.get("PORT"), () => {
  console.log(`server is running on port ${config.get("PORT")}`)
});
