'use strict'
//ES6 문법 파일임을 명시

module.exports = function(User) {
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

	User.getUserById = (id,cb) => {
		User.findOne({
			where: {
				id: id.toString()
			}
		})
		.then(result => {
			cb(null, result)
		})
		.catch(error => {
			cb(error)
		})
	}
}
