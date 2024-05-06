const express = require("express")
const router = express.Router()

module.exports = router

/**
 * Listar mis regalos, este servicio deberá retornar todos los
 * regalos creados por el usuario que ejecuta el servicio, la
 * identificación del usuario se realizará por medio de su apiKey,
 * la cual contiene el email del usuario en cuestión.
 */
router.get("/", (req, res) => {

})


/**
 * Retorna un único regalo, el que tiene la id indicada, es importante
 * verificar que ese regalo pertenece al que ejecuta el servicio, la
 * identificación del usuario se realizará por medio de su apiKey, la
 * cual contiene la id del usuario en cuestión.
 */
router.get("/:id", (req, res) => {

})


/**
 * Eliminar regalo, un usuario identificado en el sistema (apiKey)
 * podrá eliminar un regalo que haya sido creado por el mismo. El
 * regalo se identificará por su ID.
 *
 * Es muy importante comprobar que el usuario (obtener el usuario
 * utilizando la apiKey) es el creador del regalo que se quiere eliminar.
 */
router.delete("/:id", (req, res) => {

})


/**
 * Modificar regalo, un usuario identificado en el sistema (apiKey)
 * podrá modificar un regalo que haya sido creado por el mismo. El
 * regalo se identificará por su ID, y la petición contendrá en el
 * body los parámetros a modificar (nombre, descripción, URL y precio).
 */
router.put("/:id", (req, res) => {

})
