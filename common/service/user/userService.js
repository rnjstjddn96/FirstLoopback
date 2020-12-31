'use strict';
const logger = require('../../../server/server/logger').slog;

module.export = class UserService {
	constructor(User) {
		this.user = User
	}
}