const express = require('express')
const router = express.Router()

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
router.post("/", (req, res) => {

})


/**
 * Ver lista de amigos, el usuario identificado por medio de la apiKey podrá
 * obtener su lista de amigos.
 */
router.get("/", (req, res) => {

})


/**
 * Eliminar el amigo enviado como parámetro (:email) del usuario que está
 * identificado en sesión (por medio de su apiKey)
 */
router.delete("/:email", (req, res) => {

})
