module.exports = class CustomUtils {
	constructor() {}

	createError(name, status, message) {
		const error = new Error(meessage)
		error.status = status
		error.name = name
		return error
	}
}