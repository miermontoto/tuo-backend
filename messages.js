const Messages = {
	USER_ALREADY_EXISTS: {
		message: "Petición inválida: el email ya está en uso",
		status: 409
	},
	INTERNAL_ERROR: {
		message: "Error interno del servidor",
		status: 500
	},
	INVALID_REQUEST: {
		message: "Petición inválida: parámetros incorrectos",
		status: 400
	},
	INVALID_CREDENTIALS: {
		message: "Petición inválida: credenciales incorrectas",
		status: 401
	},
	INVALID_PASSWORD: {
		message: "Petición inválida: la contraseña debe tener al menos 5 caracteres",
		status: 400
	},
	INVALID_TOKEN: {
		message: "Petición inválida: token inválido",
		status: 401
	},
	USER_CREATED: {
		message: "Usuario creado correctamente",
		status: 201
	},
	LOGIN_SUCCESS: {
		message: "Token generado correctamente",
		status: 200
	},
	LOGOUT_SUCCESS: {
		message: "Sesión cerrada correctamente",
		status: 200
	},
	GENERIC_OK: {
		message: "Petición válida",
		status: 200
	},
}

module.exports = { Messages }
