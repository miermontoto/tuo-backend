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
	},
	PRESENT_NOT_FOUND: {
		message: "Regalo no encontrado",
		status: 404
	},
	NOT_YOUR_PRESENT: {
		message: "No tienes permiso para acceder a este regalo",
		status: 403
	},
	PRESENT_ADDED: {
		message: "Regalo añadido correctamente",
		status: 201
	},
	PRESENT_UPDATED: {
		message: "Regalo actualizado correctamente",
		status: 200
	},
	PRESENT_DELETED: {
		message: "Regalo eliminado correctamente",
		status: 200
	},
	NOT_YOUR_FRIEND: {
		message: "Esta persona no te tiene en su lista de amigos",
		status: 403
	},
	USER_DOES_NOT_EXIST: {
		message: "El usuario no existe",
		status: 404
	},
	CANT_FRIEND_YOURSELF: {
		message: "No puedes ser amigo de ti mismo",
		status: 400
	},
}

module.exports = { Messages }
