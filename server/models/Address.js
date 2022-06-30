const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	userAddress: {
		type: String,
		required: true
	},
	tokenAddress: {
		type: String
	},
	tokenName: {
		type: String
	},
	tokenSymbol: {
		type: String
	},
	tokenDecimal: {
		type: Number
	},
	tokenSupply: {
		type: Number
	},
	chainID: {
		type: Number
	},
	launchpadAddress: {
		type: String
	},
	logoUrl: {
		type: String
	},
	website: {
		type: String
	},
	facebook: {
		type: String
	},
	twitter: {
		type: String
	},
	github: {
		type: String
	},
	telegram: {
		type: String
	},
	instagram: {
		type: String
	},
	discord: {
		type: String
	},
	reddit: {
		type: String
	},
	description: {
		type: String
	},
	whiteListState: {
		type: Boolean
	},
	whiteList: [
		{
			whiteListAddress: {
				type: String
			}
		}
	],

	presaleRate: {
		type: String
	},
	presaleState: {
		type: String
	},
	saleCount: {
		type: Number,
		default: 0
	},
	minBuy: {
		type: String,
		default: '0'
	},
	maxBuy: {
		type: String,
		default: '0'
	},
	softCap: {
		type: String,
		default: '0'
	},
	hardCap: {
		type: String,
		default: '0'
	},
	from: {
		type: Date
	},
	to: {
		type: Date
	},
	kycState: {
		type: Boolean,
		default: false
	},
	auditState: {
		type: Boolean,
		default: false
	},
	safuState: {
		type: Boolean,
		default: false
	},
	premium: {
		type: Boolean,
		default: false
	},
	privateSale: {
		type: Boolean,
		default: false
	},
	pancakeswapLiquidity: {
		type: String
	},
	pancakeswapRate: {
		type: String
	},
	pancakeswapLockup: {
		type: String
	},
	withDrawBtnName: {
		type: Boolean,
		default: false
	},
	withDrawBtnToken: {
		type: Boolean,
		default: false
	},
	finalizeBtn: {
		type: Boolean,
		default: false
	},
	lockTimeState: {
		type: Boolean,
		default: false
	},
	ownerWithDrawBtn: {
		type: Boolean,
		default: false
	},
	lockTime: {
		type: Date,
		default: Date.now
	},
	FairState: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	alarmTime: {
		type: Date,
		default: Date.now
	},
	alarmState: {
		type: Boolean,
		default: false
	}
});

module.exports = Address = mongoose.model('launchpad', AddressSchema);
