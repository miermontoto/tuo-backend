const express = require('express')
const router = express.Router()

const { addFriend, getFriends, deleteFriend } = require("../models/modelFriends")
const { sendResponse, validateParams } = require("../helpers")
const { Messages } = require("../messages")

module.exports = router


/**
 * Agregar amigo, cada usuario tendrá una lista de amigos, amigos serán las
 * personas que podrán acceder a la listade regalos del usuario. Agregar un
 * amigo consistirá únicamente en añadir su dirección de correo electrónico
 * en una tabla, no requiere de confirmación por parte del amigo ni nada
 * similar. Un usuario podrá agregar amigos utilizando el endpoint.
 *
 * Este endpoint recibirá a través del body el email del amigo.
 */
router.post("/", async (req, res) => {
	const user = req.user
	const targetEmail = req.body.email

	// validación de parámetros
	const validate = validateParams([targetEmail])
	if (validate !== Messages.GENERIC_OK) {
		sendResponse(res, validate)
		return
	}

	if (user.email === targetEmail) {
		sendResponse(res, Messages.CANT_FRIEND_YOURSELF)
		return
	}

	const result = await addFriend(user.email, targetEmail)
	sendResponse(res, result)
})


/**
 * Ver lista de amigos, el usuario identificado por medio de la apiKey podrá
 * obtener su lista de amigos.
 */
router.get("/", async (req, res) => {
	const user = req.user
	const result = await getFriends(user.email)

	if (result === Messages.INTERNAL_ERROR) {
		sendResponse(res, result)
		return
	}

	sendResponse(res, Messages.GENERIC_OK, {Friends: result})
})


/**
 * Eliminar el amigo enviado como parámetro (:email) del usuario que está
 * identificado en sesión (por medio de su apiKey)
 */
router.delete("/:email", async (req, res) => {
	const user = req.user
	const targetEmail = req.params.email

	const result = await deleteFriend(user.email, targetEmail)
	sendResponse(res, result)
})
