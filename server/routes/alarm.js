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
							if (req.body.startAlarmTime5 !== undefined)
								value.startAlarmTime5 = req.body.startAlarmTime5;
							if (req.body.startAlarmTime15 !== undefined)
								value.startAlarmTime15 = req.body.startAlarmTime15;
							if (req.body.startAlarmTime30 !== undefined)
								value.startAlarmTime30 = req.body.startAlarmTime30;
							if (req.body.startAlarmState !== undefined)
								value.startAlarmState = req.body.startAlarmState;
							if (req.body.endAlarmState !== undefined) value.endAlarmState = req.body.endAlarmState;
							if (req.body.endAlarmTime5 !== undefined) value.endAlarmTime5 = req.body.endAlarmTime5;
							if (req.body.endAlarmTime15 !== undefined) value.endAlarmTime15 = req.body.endAlarmTime15;
							if (req.body.endAlarmTime30 !== undefined) value.endAlarmTime30 = req.body.endAlarmTime30;
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
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});

// @route ---> POST api/alarm/register
// @desc  ---> Register alarm data
// @access --> Public
router.post('/addFavorite', (req, res) => {
	var favorite = {
		userAddress: req.body.userAddress,
		favorite: req.body.favorite
	};

	Alarm.findOne({ userAddress: req.body.userAddress })
		.then((data) => {
			if (data) {
				var favorite = data.favorite.find((value) => value.tokenAddress === req.body.tokenAddress);
				if (favorite) {
					var dt = data.favorite.map((value) => {
						if (value.tokenAddress === req.body.tokenAddress) {
							if (req.body.favorite !== undefined) value.favorite = req.body.favorite;
						}
						return value;
					});
					data.favorite = dt;
				} else {
					data.favorite.push(favorite);
				}
				data.save().then().catch((e) => console.log(e));
			} else {
				const newAlarm = new Alarm({
					userAddress: req.body.userAddress,
					favorite: favorite
				});
				newAlarm.save().then((data) => console.log(data)).catch((err) => res.status(404).json(err));
			}
			res.json(data);
		})
		.catch((err) => res.status(404).json(err));
});

module.exports = router;
