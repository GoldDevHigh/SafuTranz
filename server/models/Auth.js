const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
	escrowAddress: {
		type: String
	},

	password: {
		type: String
	},
	Authpassword: {
		type: String
	},

	netFeeValueToken: {
		BSC: {
			type: Number,
			default: 0.15
		},
		BSCTest: {
			type: Number,
			default: 0.02
		},
		ETH: {
			type: Number,
			default: 0.03
		},
		Ropsten: {
			type: Number,
			default: 0.005
		},
		Cronos: {
			type: Number,
			default: 80
		},
		PulseTest: {
			type: Number,
			default: 0.1
		},
		Avalanche: {
			type: Number,
			default: 0.8
		},
		AvalancheTest: {
			type: Number,
			default: 0.1
		},
		Polygon: {
			type: Number,
			default: 30
		}
	},

	netFeeValueLaunch: {
		BSC: {
			type: Number,
			default: 0.7
		},
		BSCTest: {
			type: Number,
			default: 0.3
		},
		ETH: {
			type: Number,
			default: 0.13
		},
		Ropsten: {
			type: Number,
			default: 0.02
		},
		Cronos: {
			type: Number,
			default: 800
		},
		PulseTest: {
			type: Number,
			default: 0.2
		},
		Avalanche: {
			type: Number,
			default: 8
		},
		AvalancheTest: {
			type: Number,
			default: 0.3
		},
		Polygon: {
			type: Number,
			default: 85
		}
	},

	raisedFee: {
		type: Number,
		default: 17
	},

	subcriberAddress: [
		{
			url: {
				type: String
			}
		}
	],

	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Auth = mongoose.model('users', AuthSchema);
