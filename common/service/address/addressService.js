'use strict';
const logger = require('../../../server/logger').slog;

module.exports = class AddressService {
	constructor(Address) {
		this.address = Address;
	}

	//data가 들어왔을때 address를 insert하는 함수
	createAddress(data, cb) {
		if(!cb) {
			return this.address.create(data)
		}

		return this.address.create(data)
		then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`createAddress error: ${error}`)
			return cb(error)
		})
	}

	//조건 없이 모든 주소를 가져오는 함수
	getAddressList(cb) {
		if(!cb) {
			return this.address.find({});
		}

		return this.address.find({})
		then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`getAddressList error: ${error}`)
			return cb(error)
		})
	}


	//Address 리스트 검색에 있어서 조건이 있는 경우와 없는 경우를 명시적으로 구분하기위해 각각의 메서드로 분
	getAddressListByCondition(condition, cb) {
		if(!cb) {
			return this.address.find({condition});
		}

		return this.address.find({condition})
		then(result => {
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`getAddressListByCondition error: ${error}`)
			return cb(error)
		})
	}

	getAddressByCondition(condition, cb) {
		if(!cb) {
			return this.address.findOne({condition});
		}

		return this.address.findOne({condition})
		then(result => {
			if(!result) {
				throw new Error('존재하지 않는 사용자입니다.')
			}
			return cb(null, result)
		})
		.catch(error => {
			logger.error(`getAddressListByCondition error: ${error}`)
			return cb(error)
		})
	}

	updateByCondition(condition, data, cb) {
		if(!cb) {
			return this.address.updateAll(condition, data)
		}

		return this.address.updateAll(condition, data)
		.then(result => {
			return cb(null, !!result.count)
		})
		.catch(error => {
			logger.error(`updateByCondition error: ${error}`)
			return cb(error)
		})
	}

	deleteById(condition, cb) {
		return this.getAddressByCondition(condition)
		.then(result => {
			if(!result) {
				throw new Error('존재하지 않는 주소입니다.')
			}

			return result.destroy()
		})
		.then(result => {
			cb(null, !!result.count)
		})
		.catch(error => {			
			return cb(error)
		})
	}
}