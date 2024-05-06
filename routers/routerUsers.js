const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const { validateToken, validateParams, sendResponse } = require("../helpers.js")

module.exports = router

const secret = process.env.JWT_SECRET_KEY || "secret"

/**
 * Crear usuarios (email, nombre y password), no pueden existir 2 usuarios con
 * el mismo email en la aplicación. Los usuarios deben almacenarse en la base
 * de datos. Se establecerá un criterio de seguridad por el que el password debe
 * tener al menos 5 caracteres.
 */
router.post("/", (req, res) => {
	// validación de los datos de entrada
	const email = req.body.email
	const nombre = req.body.nombre
	const password = req.body.password

	if (!validateParams([email, nombre, password], res)) return

	if (password.length < 5) {
		res.status(400).send("Petición inválida: la contraseña debe tener al menos 5 caracteres")
		return
	}

	// TODO: almacenar usuario en base de datos

	sendResponse(res, 201, "Usuario creado correctamente")
})


/**
 * Hacer login y generar una apiKey (JWT). Si la identificación es correcta se
 * debe almacenar la apiKey en la lista de claves activas. Como mínimo dentro
 * de la apiKey se deberá almacenar la id y el email del usuario.
 */
router.post("/login", (req, res) => {
	const email = req.body.email
	const password = req.body.password

	// validación básica de los datos de entrada
	if (!validateParams([email, password], res)) return

	// TODO: comprobar credenciales en base de datos

	const apiKey = jwt.sign({
		id: 1,
		email: 'test@test.com',
		time: Date.now()
	}, secret)

	sendResponse(res, 200, "Token generado correctamente", { apiKey })
})


/**
 * Cerrar sesión, se debe eliminar la apiKey de la lista de claves activas.
 */
router.post("/disconnect", (req, res) => {
	const apiKey = req.headers.authorization
	if (!validateToken(apiKey, res)) return

	// TODO: eliminar apiKey de la lista de claves activas

	sendResponse(res, 200, "Sesión cerrada correctamente")
})
