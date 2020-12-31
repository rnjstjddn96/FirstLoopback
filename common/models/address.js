'use strict';
const logger = require('../../server/logger').slog
const AddressService = require('../service/address/addressService')

module.exports = function(Address) {
	const service = new AddressService(Address)

	Address.createAddressByUser = (mainAddress, subAddress, zipCode, seq, isMain, req, cb) => {
			return service.createAddress({
				mainAddress: mainAddress,
				subAddress: subAddress,
				zipCode: zipCode,
				seq: seq,
				isMain: isMain,
				userId: req.userInfo.id.toString()
			}, cb)
	}

	Address.findAll = (cb) => {
		return service.getAddressList(cb)
	}

	Address.me = (req, cb) => {
		return service.getAddressListByCondition({
			where: {
				userId: req.userInfo.id.toString()
			},
			order: 'seq ASC'
			, cb})
	}

//	1. 인스턴스 메소드를 통한 삭제
	// Address.deleteById = (id, req, cb) => {
	// 	return service.getAddressByCondition({
	// 		where: {
	// 			and: [
	// 				{ userId: req.userInfo.id.toString() },
	// 				{ id: id }
	// 			]
	// 		}
	// 	})
	// 	.then(address => {
	// 		return address.destroy()
	// 	})
	// 	.then(result => {
	// 		return cb(null, result)
	// 	})
	// 	.catch(error => {
	// 		return cb(error)
	// 	})
	// }

//	2. 클래스 메소드를 통한 삭제
	Address.deleteAddress = (id, req, cb) => {
		return service.deleteById({
			where: {
				and: [
					{ userId: req.userInfo.id.toString() },
					{ id: id }
				]
			}
		}, cb)
	}	

	Address.updateById = (id, data, req, cb) => {
		return service.updateByCondition({id: id}, {...data}, cb)
	}

};
