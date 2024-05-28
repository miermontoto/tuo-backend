const express = require("express")
const router = express.Router()

const { getPresents, getPresent, addPresent, updatePresent, deletePresent, choosePresent } = require("../models/modelPresents")
const { areFriends, getFriends } = require("../models/modelFriends")
const { getIdFromEmail } = require("../models/modelUsers")
const { Messages } = require("../messages")
const { sendResponse, validateParams } = require("../helpers")

module.exports = router


/**
 * Crear regalo, un usuario identificado en el sistema (apiKey) podrá crear un
 * regalo (id AUTOINCREMENT, nombre, descripción, URL y precio). En la base de
 * datos se va a almacenar toda la información del regalo, y también el email
 * del usuario que lo creo (que se obtendrá el email directamente de la apiKey).
 */
router.post("/", async (req, res) => {
	const { name, description, url, price } = req.body

	const validate = validateParams([name, price])
	if (validate !== Messages.GENERIC_OK) {
		sendResponse(res, validate)
		return
	}

	const result = await addPresent(req.user.id, name, description, url, price)
	sendResponse(res, result)
})


/**
 * Listar mis regalos, este servicio deberá retornar todos los
 * regalos creados por el usuario que ejecuta el servicio, la
 * identificación del usuario se realizará por medio de su apiKey,
 * la cual contiene el email del usuario en cuestión.
 */
router.get("/", async (req, res) => {
	const friendEmail = req.query.userEmail

	// si se ha pasado un email en el campo userEmail, tratar de
	// obtener los regalos de ese usuario, en caso contrario
	// obtener los regalos del usuario que ejecuta el servicio.
	if (validateParams([friendEmail]).status == 200 && friendEmail !== req.user.email) {
		await getFriendPresents(req, res)
		return
	}

	await getMyPresents(req, res)
})


/**
 * Retorna un único regalo, el que tiene la id indicada, es importante
 * verificar que ese regalo pertenece al que ejecuta el servicio, la
 * identificación del usuario se realizará por medio de su apiKey, la
 * cual contiene la id del usuario en cuestión.
 */
router.get("/:id", async (req, res) => {
	const presentId = req.params.id

	const validate = validateParams([presentId])
	if (validate !== Messages.GENERIC_OK) {
		sendResponse(res, validate)
		return
	}

	const result = await getPresent(presentId)

	if (result.status) {
		sendResponse(res, result)
		return
	}

	if ((result.userId !== req.user.id)) {
		const befriended = await areFriends(result.email, req.user.email)

		// comprobar si estoy en la lista de amigos del otro usuario
		if (befriended.status != 200) {
			sendResponse(res, befriended)
			return
		}
	}

	sendResponse(res, Messages.GENERIC_OK, {present: result})
})


/**
 * Eliminar regalo, un usuario identificado en el sistema (apiKey)
 * podrá eliminar un regalo que haya sido creado por el mismo. El
 * regalo se identificará por su ID.
 *
 * Es muy importante comprobar que el usuario (obtener el usuario
 * utilizando la apiKey) es el creador del regalo que se quiere eliminar.
 */
router.delete("/:id", async (req, res) => {
	const presentId = req.params.id

	const validate = validateParams([presentId])
	if (validate.status != 200) {
		sendResponse(res, validate)
		return
	}

	const result = await getPresent(presentId)

	if (result.status) {
		sendResponse(res, result)
		return false
	}

	if (result.userId !== req.user.id) {
		sendResponse(res, Messages.NOT_YOUR_PRESENT)
		return false
	}

	const deleted = await deletePresent(presentId)
	sendResponse(res, deleted)
})


/**
 * Modificar regalo, un usuario identificado en el sistema (apiKey)
 * podrá modificar un regalo que haya sido creado por el mismo. El
 * regalo se identificará por su ID, y la petición contendrá en el
 * body los parámetros a modificar (nombre, descripción, URL y precio).
 */
router.put("/:id", async (req, res) => {
	const presentId = req.params.id

	const result = await getPresent(presentId)

	if (result.status) {
		sendResponse(res, result)
		return
	}

	// si el usuario que realiza la petición no es el dueño del regalo,
	// tratar de elegir el regalo en nombre del usuario de la petición.
	if (result.userId !== req.user.id) {
		await tryChoosingPresent(req, res, result)
		return
	}

	// en caso contrario, actualizar el regalo de manera normal.
	const { name, description, url, price } = req.body

	const validate = validateParams([presentId, name, price])
	if (validate !== Messages.GENERIC_OK) {
		sendResponse(res, validate)
		return
	}

	const updated = await updatePresent(presentId, name, description, url, price)
	sendResponse(res, updated)
})


const getMyPresents = async (req, res) => {
	const result = await getPresents(req.user.id)

	if (result.status) {
		sendResponse(res, result)
		return
	}

	sendResponse(res, Messages.GENERIC_OK, {presents: result})
}


const getFriendPresents = async (req, res) => {
	const friendEmail = req.query.userEmail
	const befriended = await areFriends(friendEmail, req.user.email)

	// comprobar si estoy en la lista de amigos del otro usuario
	if (befriended.status != 200) {
		sendResponse(res, befriended)
		return
	}

	// obtener id del amigo y comprobar errores
	const friendId = await getIdFromEmail(friendEmail)
	if (friendId.status) {
		sendResponse(res, friendId)
		return
	}

	// obtener regalos del amigo y validar errores
	const presents = await getPresents(friendId)
	if (presents === Messages.INTERNAL_ERROR) {
		sendResponse(res, presents)
		return
	}

	sendResponse(res, Messages.GENERIC_OK, {presents: presents})
}


const tryChoosingPresent = async (req, res, present) => {
	// no se puede elegir un regalo ya elegido
	if (present.chosenBy) {
		sendResponse(res, Messages.PRESENT_ALREADY_CHOSEN)
		return
	}

	// no se puede escoger tu propio regalo
	if (present.userId == req.user.id) {
		sendResponse(res, Messages.CANNOT_SELF_CHOOSE)
		return
	}

	const friendList = await getFriends(req.user.email, true)

	if (friendList.status) {
		sendResponse(res, friendList)
		return
	}

	if (!friendList.some(friend => friend.email === present.email)) {
		sendResponse(res, Messages.NOT_BEFRIENDED)
		return
	}

	if (!friendList.some(friend => (friend.email === present.email && friend.friendship === 1))) {
		sendResponse(res, Messages.NOT_YOUR_FRIEND)
		return
	}

	const result = await choosePresent(present.id, req.user.id)
	sendResponse(res, result)
}
