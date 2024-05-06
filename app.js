const express = require("express")
const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json()) // middleware que parsea el body de las peticiones

const routerPresents = require("./routers/routerPresents")
const routerFriends = require("./routers/routerFriends")
const routerUsers = require("./routers/routerUsers")

app.use("/presents", routerPresents)
app.use("/friends", routerFriends)
app.use("/users", routerUsers)

app.listen(port, () => {})
