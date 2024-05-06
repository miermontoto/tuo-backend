const express = require("express")
const router = express.Router()

module.exports = router


/**
 * Crear usuarios (email, nombre y password), no pueden existir 2 usuarios con
 * el mismo email en la aplicación. Los usuarios deben almacenarse en la base
 * de datos. Se establecerá un criterio de seguridad por el que el password debe
 * tener al menos 5 caracteres.
 */
router.post("/", (req, res) => {

})


/**
 * Hacer login y generar una apiKey (JWT). Si la identificación es correcta se
 * debe almacenar la apiKey en la lista de claves activas. Como mínimo dentro
 * de la apiKey se deberá almacenar la id y el email del usuario.
 */
router.post("/login", (req, res) => {

})


/**
 * Cerrar sesión, se debe eliminar la apiKey de la lista de claves activas.
 */
router.post("/disconnect", (req, res) => {

})
