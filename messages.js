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
	ADDED_FRIEND: {
		message: "Amigo añadido correctamente",
		status: 201
	},
	DELETED_FRIEND: {
		message: "Amigo eliminado correctamente",
		status: 200
	},
	ALREADY_BEFRIENDED: {
		message: "Ya eres amigo de esta persona",
		status: 409
	},
	INVALID_USER_EMAIL: {
		message: "El email del amigo no es válido",
		status: 400
	},
	NOT_BEFRIENDED: {
		message: "No eres amigo de esta persona",
		status: 409
	}
}

module.exports = { Messages }
