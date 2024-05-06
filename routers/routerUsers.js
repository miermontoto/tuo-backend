const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const { validateToken, validateParams, sendResponse } = require("../helpers.js")
const { createUser, checkCredentials } = require("../models/modelUsers.js")
const { registerToken, invalidateToken } = require("../models/modelTokens.js")
const { Messages } = require("../messages.js")

module.exports = router

const secret = process.env.JWT_SECRET_KEY || "secret"

/**
 * Crear usuarios (email, nombre y password), no pueden existir 2 usuarios con
 * el mismo email en la aplicación. Los usuarios deben almacenarse en la base
 * de datos. Se establecerá un criterio de seguridad por el que el password debe
 * tener al menos 5 caracteres.
 */
router.post("/", async (req, res) => {
	// validación de los datos de entrada
	const email = req.body.email
	const name = req.body.nombre
	const password = req.body.password

	const params = validateParams([email, name, password])
	if (params !== Messages.GENERIC_OK) {
		sendResponse(res, params)
		return
	}

	if (password.length < 5) {
		sendResponse(res, Messages.INVALID_PASSWORD)
		return
	}

	const result = await createUser(email, name, password)
	sendResponse(res, result)
})


/**
 * Hacer login y generar una apiKey (JWT). Si la identificación es correcta, se
 * debe almacenar la apiKey en la lista de claves activas. Como mínimo, dentro
 * de la apiKey se deberá almacenar la id y el email del usuario.
 */
router.post("/login", async (req, res) => {
	const email = req.body.email
	const password = req.body.password

	// validación básica de los datos de entrada
	let result = validateParams([email, password])
	if (result !== Messages.GENERIC_OK) {
		sendResponse(res, result)
		return
	}

	// validación de las credenciales
	result = await checkCredentials(email, password)
	if (result === Messages.INVALID_CREDENTIALS) {
		sendResponse(res, result)
		return
	}

	const apiKey = jwt.sign({
		id: result[0].id,
		email: result[0].email,
		time: Date.now()
	}, secret)

	registerToken(apiKey)

	sendResponse(res, Messages.LOGIN_SUCCESS, { apiKey })
})


/**
 * Cerrar sesión, se debe eliminar la apiKey de la lista de claves activas.
 */
router.post("/disconnect", async (req, res) => {
	const apiKey = req.headers.authorization
	if (!validateToken(apiKey, res)) {
		sendResponse(res, Messages.INVALID_TOKEN)
		return
	}

	invalidateToken(apiKey)

	sendResponse(res, Messages.LOGOUT_SUCCESS)
})
