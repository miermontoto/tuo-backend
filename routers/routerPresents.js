const express = require("express")
const router = express.Router()

const { getPresents, getPresent, addPresent, updatePresent, deletePresent } = require("../models/modelPresents")
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

	const validate = validateParams([name, description, url, price])
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
	const result = await getPresents(req.user.id)

	if (result === Messages.INTERNAL_ERROR) {
		sendResponse(res, result)
		return
	}

	sendResponse(res, Messages.GENERIC_OK, {Presents: result})
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

	if (!checkPresent(res, result, req.user.id)) return

	sendResponse(res, Messages.GENERIC_OK, {Present: result})
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
	if (validate !== Messages.GENERIC_OK) {
		sendResponse(res, validate)
		return
	}

	const result = await getPresent(presentId)
	if (!checkPresent(res, result, req.user.id)) return

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
	const { name, description, url, price } = req.body

	const validate = validateParams([presentId, name, description, url, price])
	if (validate !== Messages.GENERIC_OK) {
		sendResponse(res, validate)
		return
	}

	const result = await getPresent(presentId)
	if (!checkPresent(res, result, req.user.id)) return

	const updated = await updatePresent(presentId, name, description, url, price)
	sendResponse(res, updated)
})


const checkPresent = (res, result, userId) => {
	if (!('userId' in result)) {
		sendResponse(res, result)
		return false
	}

	if (result.userId !== userId) {
		sendResponse(res, Messages.NOT_YOUR_PRESENT)
		return false
	}

	return true
}
