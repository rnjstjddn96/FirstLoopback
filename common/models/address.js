'use strict';
const logger = require('../../server/logger').slog;

module.exports = function(Address) {
	Address.createAddressByUser = (mainAddress, subAddress, zipCode, seq, isMain, req, cb) => {
			Address.create({
				mainAddress: mainAddress,
				subAddress: subAddress,
				zipCode: zipCode,
				seq: seq,
				isMain: isMain,
				userId: req.userInfo.id.toString()
			})
			.then(result => {
				logger.info('Address API 호출', result)
				return cb(null, result)
			})
			.catch(error => {
				logger.error('Address 에러: ', error)
				return cb(error)
			})
	}

	Address.findAll = (cb) => {
		Address.find({})
		.then(result => {
				logger.info('Address API 호출', result)
				return cb(null, result)
			})
			.catch(error => {
				logger.error('Address 에러: ', error)
				return cb(error)
			})
	}

	Address.me = (req, cb) => {
		Address.find({
			where: {
				userId: req.userInfo.id.toString()
			},
			order: 'seq ASC'
		})
		.then(result => {
				logger.info('Address me API 호출', result)
				return cb(null, result)
			})
			.catch(error => {
				logger.error('Address me 에러: ', error)
				return cb(error)
			})
	}

	Address.deleteById = (id, req, cb) => {
		Address.findOne({
			where: {
				and: [
					{ userId: req.userInfo.id.toString() },
					{ id: id }
				]
			}
		})
		.then(address => {
			if(!address) {
				throw new Error("에러")
			}
			return address.destroy()
		})
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			return cb(error)
		})
	}

	Address.updateById = (id, data, req, cb) => {
		Address.updateAll({id: id}, {...data})
		.then(result => {
			return cb(null, result)
		})
		.catch(error => {
			return cb(error)
		})
	}
};
