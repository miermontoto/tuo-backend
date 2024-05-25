const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env.API_PORT || 3001

const { validateToken, sendResponse } = require("./helpers")
const { Messages } = require("./messages")
const { testConnection } = require("./database")

app.use(express.json()) // middleware que parsea el body de las peticiones

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"]
})) // middleware que habilita CORS

// middleware que valida el token de las rutas /presents y /friends
app.use(["/presents", "/friends"], (req, res, next) => {
	const token = req.headers.authorization
	const verified = validateToken(token)

	if (!verified) {
		sendResponse(res, Messages.INVALID_TOKEN)
		return
	}

	req.user = verified
	next()
})

const routerPresents = require("./routers/routerPresents")
const routerFriends = require("./routers/routerFriends")
const routerUsers = require("./routers/routerUsers")

app.use("/presents", routerPresents)
app.use("/friends", routerFriends)
app.use("/users", routerUsers)

app.use("/health", (req, res) => { sendResponse(res, Messages.GENERIC_OK) })

app.listen(port, () => { testConnection() })
