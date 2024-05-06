const express = require("express")
const app = express()
const port = process.env.APP_PORT || 3000

const { validateToken, sendResponse } = require("./helpers")
const { Messages } = require("./messages")

app.use(express.json()) // middleware que parsea el body de las peticiones

app.use(["/presents", "/friends"], (req, res, next) => {
	const token = req.headers.authorization
	if (!validateToken(token)) {
		sendResponse(res, Messages.INVALID_TOKEN)
		return
	}

	next()
})

const routerPresents = require("./routers/routerPresents")
const routerFriends = require("./routers/routerFriends")
const routerUsers = require("./routers/routerUsers")

app.use("/presents", routerPresents)
app.use("/friends", routerFriends)
app.use("/users", routerUsers)

app.listen(port, () => {})
