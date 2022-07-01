const express = require('express');
const router = express.Router();

// loads User model
const Alarm = require('../models/Alarm');

// @route ---> POST api/alarm/register
// @desc  ---> Register alarm data
// @access --> Public
router.post('/register', (req, res) => {
	var alarm = {
		tokenAddress: req.body.tokenAddress,

		startAlarmTime5: req.body.startAlarmTime5,
		startAlarmTime15: req.body.startAlarmTime15,
		startAlarmTime30: req.body.startAlarmTime30,

		endAlarmTime5: req.body.endAlarmTime5,
		endAlarmTime15: req.body.endAlarmTime15,
		endAlarmTime30: req.body.endAlarmTime30,

		startAlarmState: req.body.startAlarmState,
		endAlarmState: req.body.endAlarmState
	};

	Alarm.findOne({ userAddress: req.body.userAddress })
		.then((data) => {
			if (data) {
				var alarmData = data.alarmValue.find((value) => value.tokenAddress === req.body.tokenAddress);
				if (alarmData) {
					var dt = data.alarmValue.map((value) => {
						if (value.tokenAddress === req.body.tokenAddress) {
							if (req.body.startAlarmTime5) value.startAlarmTime5 = req.body.startAlarmTime5;
							if (req.body.startAlarmTime15) value.startAlarmTime15 = req.body.startAlarmTime15;
							if (req.body.startAlarmTime30) value.startAlarmTime30 = req.body.startAlarmTime30;
							if (req.body.startAlarmState) value.startAlarmState = req.body.startAlarmState;
							if (req.body.endAlarmState) value.endAlarmState = req.body.endAlarmState;
							if (req.body.endAlarmTime5) value.endAlarmTime5 = req.body.endAlarmTime5;
							if (req.body.endAlarmTime15) value.endAlarmTime15 = req.body.endAlarmTime15;
							if (req.body.endAlarmTim30) value.endAlarmTim30 = req.body.endAlarmTime30;
						}
						return value;
					});
					data.alarmValue = dt;
				} else {
					data.alarmValue.push(alarm);
				}
				data.save().then().catch((e) => console.log(e));
			} else {
				const newAlarm = new Alarm({
					userAddress: req.body.userAddress,
					alarmValue: alarm
				});
				newAlarm.save().then((data) => console.log(data)).catch((err) => res.status(404).json(err));
			}
			res.json(data);
		})
		.catch((err) => res.status(404).json(err));
});

// @route ---> POST api/alarm/data
// @desc  ---> get alarm data
// @access --> Public
router.post('/data', (req, res) => {
	Alarm.findOne({ userAddress: req.body.userAddress })
		.then((dat) => {
			// const re = dat.alarmValue.find((dt) => dt.tokenAddress === req.body.tokenAddress);
			// console.log(re);
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});

module.exports = router;
