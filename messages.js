const Messages = {
	USER_ALREADY_EXISTS: {
		message: "El email ya está en uso",
		status: 409
	},
	INTERNAL_ERROR: {
		message: "Error interno del servidor",
		status: 500
	},
	INVALID_REQUEST: {
		message: "Parámetros incorrectos",
		status: 400
	},
	INVALID_CREDENTIALS: {
		message: "Credenciales incorrectas",
		status: 401
	},
	INVALID_PASSWORD: {
		message: "La contraseña debe tener al menos 5 caracteres",
		status: 400
	},
	INVALID_TOKEN: {
		message: "Token inválido (inicio de sesión requerido)",
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
		message: "Esta persona no es tu amigo",
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
	PRESENT_ALREADY_CHOSEN: {
		message: "Este regalo ya ha sido elegido",
		status: 409
	},
	CANNOT_SELF_CHOOSE: {
		message: "No puedes elegir un regalo tuyo",
		status: 400
	},
	PRESENT_CHOSEN: {
		message: "Regalo elegido correctamente",
		status: 200
	},
}

module.exports = { Messages }
