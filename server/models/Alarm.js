const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlarmSchema = new Schema({
	userAddress: {
		type: String
	},

	alarmValue: [
		{
			tokenAddress: {
				type: String
			},
			startAlarmTime5: {
				type: Boolean,
				default: false
			},
			startAlarmTime15: {
				type: Boolean,
				default: false
			},
			startAlarmTime30: {
				type: Boolean,
				default: false
			},
			startAlarmState: {
				type: Boolean,
				default: false
			},
			endAlarmTime5: {
				type: Boolean,
				default: false
			},
			endAlarmTime15: {
				type: Boolean,
				default: false
			},
			endAlarmTime30: {
				type: Boolean,
				default: false
			},
			endAlarmState: {
				type: Boolean,
				default: false
			}
		}
	],

	favorite: [
		{
			tokenAddress: {
				type: String
			},
			favorite: {
				type: Boolean,
				default: false
			}
		}
	],

	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Auth = mongoose.model('alarms', AlarmSchema);
