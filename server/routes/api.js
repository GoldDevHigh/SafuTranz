const express = require('express');
const router = express.Router();
const Address = require('../models/Address.js');
const Auth = require("../models/Auth.js");

// const compiler = require('../scripts/compile.js');
const fs = require('fs');
const xxxx = require('./presaleAbi.json');

router.get('/getAll', (req, res) => {
	Address.find().then((data) => {
		res.json(data);
	});
});

router.get('/getTokenContract', (req, res) => {
	let data = compiler('token');
	res.json(data);
});

router.get('/getTokenContractAbi', (req, res) => {
	let bufferData = fs.readFileSync(__dirname + '/tokenAbi.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.get('/getTokenContractBytecode', (req, res) => {
	let bufferData = fs.readFileSync(__dirname + '/tokenBytecode.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.post('/addTokenAddress', (req, res) => {
	const newAddress = new Address({
		userAddress: req.body.userAddress,
		tokenAddress: req.body.tokenAddress,
		tokenName: req.body.tokenName,
		tokenSymbol: req.body.tokenSymbol,
		tokenDecimal: req.body.tokenDecimal,
		tokenSupply: req.body.tokenSupply,
		chainID: req.body.chainID
	});

	newAddress.save().then((data) => res.json(data)).catch((err) => console.log(err));
});

router.get('/getPresaleContract', (req, res) => {
	data = compiler('presale');
	res.json(data);
});

router.get('/getPresaleContractAbi', (req, res) => {
	res.json(xxxx);
});

router.get('/getPresaleContractAbi/:id', (req, res) => {
	const updateAddress = {};
	updateAddress.presaleState = true;
	Address.findOneAndUpdate({ tokenAddress: req.params.id }, { $set: updateAddress }, { new: true })
		.then()
		.catch((err) => console.log(err));
	res.json(xxxx);
});

router.post('/getPresaleContractAbi/:id/buy', (req, res) => {
	Address.findOne({ tokenAddress: req.params.id })
		.then((data) => {
			if (data.saleCount === undefined) data.saleCount = Number(req.body.saleCount);
			else data.saleCount = Number(data.saleCount) + Number(req.body.saleCount);
			data.save();
		})
		.catch((err) => console.log(err));
});

router.post('/getPresaleContractAbi/cancel', (req, res) => {
	Address.findOne({ tokenAddress: req.body.presaleAddress })
		.then((data) => {
			if (req.body.presaleState !== undefined) data.presaleState = req.body.presaleState;
			if (req.body.withDrawBtnToken) data.withDrawBtnToken = true;
			if (req.body.withDrawBtnName) data.withDrawBtnName = true;
			if (req.body.finalizeBtn) data.finalizeBtn = true;
			if (req.body.lockTimeState) data.lockTimeState = true;
			if (req.body.lockTime !== undefined) data.lockTime = req.body.lockTime;
			if (req.body.ownerWithDrawBtn !== undefined) data.ownerWithDrawBtn = req.body.ownerWithDrawBtn;

			data.save();
		})
		.catch((err) => console.log(err));
});

router.post('/setAuthSetting', (req, res) => {
	const data = {
		kycState: req.body.kycState,
		auditState: req.body.auditState,
		safuState: req.body.safuState,
		premium: req.body.premium,
		privateSale: req.body.privateSale
	};

	Address.findOneAndUpdate({ launchpadAddress: req.body.presaleAddress }, { $set: data }, { new: true })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => console.log(err));
});

router.get('/getPresaleContractBytecode', (req, res) => {
	let bufferData = fs.readFileSync(__dirname + '/presaleBytecode.json');
	let stData = bufferData.toString();
	let data = JSON.parse(stData);
	res.json(data);
});

router.post('/addPresaleAddress', (req, res) => {
	const updateAddress = {};
	updateAddress.launchpadAddress = req.body.presaleAddress;
	updateAddress.presaleRate = req.body.presaleRate;
	updateAddress.minBuy = req.body.minBuy;
	updateAddress.maxBuy = req.body.maxBuy;
	updateAddress.softCap = req.body.softCap;
	updateAddress.hardCap = req.body.hardCap;
	updateAddress.from = req.body.from;
	updateAddress.to = req.body.to;
	updateAddress.logoUrl = req.body.logoUrl;
	updateAddress.website = req.body.website;
	updateAddress.facebook = req.body.facebook;
	updateAddress.twitter = req.body.twitter;
	updateAddress.github = req.body.github;
	updateAddress.telegram = req.body.telegram;
	updateAddress.instagram = req.body.instagram;
	updateAddress.discord = req.body.discord;
	updateAddress.reddit = req.body.reddit;
	updateAddress.description = req.body.description;
	updateAddress.whiteListState = req.body.whiteListState;
	updateAddress.pancakeswapLiquidity = req.body.pancakeswapLiquidity;
	updateAddress.pancakeswapRate = req.body.pancakeswapRate;
	updateAddress.pancakeswapLockup = req.body.pancakeswapLockup;

	Address.findOneAndUpdate(
		{ tokenAddress: req.body.tokenAddress },
		{ $set: updateAddress },
		{ new: true }
	).then((profile) => {
		res.json(profile);
	});
});

router.post('/addWhitelist', (req, res) => {
	const updateAddress = {};
	updateAddress.whiteListAddress = req.body.val;

	Address.findOne({ launchpadAddress: req.body.launchpadAddress })
		.then((dat) => {
			dat.whiteList.push(updateAddress);
			dat.save().catch((err) => console.log(err));
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});

router.post('/removeWhitelist', (req, res) => {
	Address.findOne({ launchpadAddress: req.body.launchpadAddress })
		.then((dat) => {
			dat.whiteList = dat.whiteList.filter((exp) => exp.whiteListAddress !== req.body.val);
			dat.save().catch((err) => console.log(err));
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});



router.get('/addWhitelist/:id', (req, res) => {
	Address.findOne({ launchpadAddress: req.params.id })
		.then((dat) => {
			res.json(dat);
		})
		.catch((err) => res.status(404).json(err));
});
///
router.post('/addWhitelistState', (req, res) => {
	const updateAddress = {};

	updateAddress.whiteListState = req.body.whiteListState;

	Address.findOneAndUpdate({ tokenAddress: req.body.tokenAddress }, { $set: updateAddress }, { new: true })
		.then((address) => {
			res.json(address);
		})
		.catch((err) => console.log(err));
});

router.get('/addWhitelistState/getdata/:id', (req, res) => {
	Address.find({ launchpadAddress: req.params.id })
		.sort({ date: -1 })
		.limit(1)
		.then((address) => {
			res.json(address);
		})
		.catch((err) => console.log(err));
});

router.delete('/presaleDelete/:id', async (req, res) => {
	try {
		const presale = await Address.findOne({ launchpadAddress: req.params.id });
		if (!presale) {
			return res.status(404).json({ msg: 'presale not found' });
		}
		await presale.remove();
		res.json({ msg: 'Preale removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
