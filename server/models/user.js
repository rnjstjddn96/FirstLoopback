'use strict'
//ES6 문법 파일임을 명시

const CustomUtils = require('../utils')

module.exports = function(User) {
	const Utils = new CustomUtils()

	User.createUserByParams = (params, cb) => {
		User.create({...params})
		//javascript에서 동기 처리를 하기 위한 방법 => promise (.then, .catch)
		.then(result => {
			//loopback에서 callback 첫번째 인자 값은 error 유무	
			//콜백이 호출되는 순간 그 function은 끝, front에 전달되지 않는다
			return cb(null, result)	
		})
		.catch(error => {
			return cb(error)
		})
	}

	User.me = (req,cb) => {
		const _user = req.userInfo
		delete _user.password

		return cb(null, _user)
	}

	User.updateUser = (id, param, cb) => {
		User.findOne({
			where: {
				id: id.toString()
			}
		})
		.then(_user => {
			if (!_user) {
				throw Utils.createError('BAD REQUEST', 400, '존재하지 않는 아이디입니다.')
			}
			return _user
		})
		.then(_user => {
			return User.replaceById(id, {...param})
		})
		.then(result => {
			cb(null, result)
		})
		.catch(error => {
			return cb(error)
		})
	}

	User.observe('before save', (context, next) => {
		const _instance = context.instance;
		const updatedDate = new Date();

		if (_instance) {
      _instance.emailVerified = true;
      _instance.created = updatedDate;
      _instance.updated = updatedDate;
    } else {
      if (!context.currentInstance) {
        return next();
      } else {
        context.data.updated = updatedDate;
      }
    }

		return next();
	});
}
