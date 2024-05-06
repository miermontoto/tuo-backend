const express = require("express")
const app = express()

const routerPresents = require("./routers/routerPresents")
const routerFriends = require("./routers/routerFriends")
const routerUsers = require("./routers/routerUsers")

app.use("/presents", routerPresents)
app.use("/friends", routerFriends)
app.use("/users", routerUsers)

app.get("/", (req, res) => {
	res.send("Hello World")
})

app.listen(3000, () => {
	console.log("Server is running on port 3000")
})
