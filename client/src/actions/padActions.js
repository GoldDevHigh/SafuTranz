import axios from 'axios';

import {
	GET_PADS,
	PAD_LOADING,
	GET_WHILTELIST,
	SET_WHILTELIST_STATE,
	GET_WHILTELIST_EVERY_DATA,
	SET_BUFFER_DATA,
	SET_BUFFER_DATA1
} from './types';

export const getPads = () => (dispatch) => {
	dispatch(setPadLoading());

	let padData = {
		presaleAddress: '',
		tokenAddress: '',
		title: '',
		symbol: '',
		decimal: '',
		total: '',
		rate: '',
		softCap: '0',
		hardCap: '0',
		minBuy: '',
		maxBuy: '',
		from: '',
		to: '',
		user: '',
		chainID: '',
		chainName: '',
		logoUrl: '',
		website: '',
		facebook: '',
		twitter: '',
		github: '',
		telegram: '',
		instagram: '',
		discord: '',
		reddit: '',
		description: '',
		pancakeswapLockup: '',
		pancakeswapLiquidity: '',
		pancakeswapRate: '',
		FairState: false
	};

	let pads = [];

	var chainID = Number(window.localStorage.getItem('chainId'));
	axios
		.get(`/api/getAll`)
		.then((res1) => {
			const datas = res1.data;
			const filteredDats = datas.filter((order) => order.launchpadAddress != null);
			const listSize = filteredDats.length;
			const func2 = (size) => {
				var count = 0;
				for (let i = 0; i < size; i++) {
					if (chainID === filteredDats[i].chainID) {
						padData.user = filteredDats[i].userAddress;
						padData.tokenAddress = filteredDats[i].tokenAddress;
						padData.title = filteredDats[i].tokenName;
						padData.symbol = filteredDats[i].tokenSymbol;
						padData.total = filteredDats[i].tokenSupply;
						padData.decimal = filteredDats[i].tokenDecimal;
						padData.chainID = filteredDats[i].chainID;
						padData.presaleAddress = filteredDats[i].launchpadAddress;
						padData.rate = filteredDats[i].presaleRate;
						padData.softCap = filteredDats[i].softCap;
						padData.hardCap = filteredDats[i].hardCap;
						padData.minBuy = filteredDats[i].minBuy;
						padData.maxBuy = filteredDats[i].maxBuy;
						padData.from = filteredDats[i].from;
						padData.to = filteredDats[i].to;
						padData.whiteListState = filteredDats[i].whiteListState;
						padData.whitelist = filteredDats[i].whiteList;
						padData.logoUrl = filteredDats[i].logoUrl;
						padData.website = filteredDats[i].website;
						padData.facebook = filteredDats[i].facebook;
						padData.twitter = filteredDats[i].twitter;
						padData.github = filteredDats[i].github;
						padData.telegram = filteredDats[i].telegram;
						padData.instagram = filteredDats[i].instagram;
						padData.discord = filteredDats[i].discord;
						padData.reddit = filteredDats[i].reddit;
						padData.description = filteredDats[i].description;
						padData.saleCount = filteredDats[i].saleCount;
						padData.safuState = filteredDats[i].safuState;
						padData.kycState = filteredDats[i].kycState;
						padData.auditState = filteredDats[i].auditState;
						padData.privateSale = filteredDats[i].privateSale;
						padData.favorite = filteredDats[i].favorite;
						padData.advertise = filteredDats[i].advertise;
						padData.premium = filteredDats[i].premium;
						padData.presaleState = filteredDats[i].presaleState;
						padData.pancakeswapLiquidity = filteredDats[i].pancakeswapLiquidity;
						padData.pancakeswapRate = filteredDats[i].pancakeswapRate;
						padData.pancakeswapLockup = filteredDats[i].pancakeswapLockup;
						padData.pancakeswapLockup = filteredDats[i].pancakeswapLockup;
						padData.withDrawBtnToken = filteredDats[i].withDrawBtnToken;
						padData.withDrawBtnName = filteredDats[i].withDrawBtnName;
						padData.finalizeBtn = filteredDats[i].finalizeBtn;
						padData.lockTimeState = filteredDats[i].lockTimeState;
						padData.lockTime = filteredDats[i].lockTime;
						padData.ownerWithDrawBtn = filteredDats[i].ownerWithDrawBtn;
						padData.FairState = filteredDats[i].FairState;
						pads[count] = Object.assign({}, padData);
						count++;
					}
				}

				dispatch({
					type: GET_PADS,
					payload: pads
				});
			};

			func2(listSize);
		})
		.catch((err) =>
			dispatch({
				type: GET_PADS,
				payload: null
			})
		);
};
export const getAllData = () => (dispatch) => {
	dispatch(setPadLoading());

	let padData = {
		presaleAddress: '',
		tokenAddress: '',
		title: '',
		symbol: '',
		decimal: '',
		total: '',
		rate: '',
		softCap: '0',
		hardCap: '0',
		minBuy: '',
		maxBuy: '',
		from: '',
		to: '',
		user: '',
		chainID: '',
		chainName: '',
		logoUrl: '',
		website: '',
		facebook: '',
		twitter: '',
		github: '',
		telegram: '',
		instagram: '',
		discord: '',
		reddit: '',
		description: '',
		pancakeswapLockup: '',
		pancakeswapLiquidity: '',
		pancakeswapRate: '',
		FairState: false
	};

	let pads = [];

	axios
		.get(`/api/getAll`)
		.then((res1) => {
			const datas = res1.data;
			const filteredDats = datas.filter((order) => order.launchpadAddress != null);
			const listSize = filteredDats.length;
			const func2 = (size) => {
				for (let i = 0; i < size; i++) {
					padData.user = filteredDats[i].userAddress;
					padData.tokenAddress = filteredDats[i].tokenAddress;
					padData.title = filteredDats[i].tokenName;
					padData.symbol = filteredDats[i].tokenSymbol;
					padData.total = filteredDats[i].tokenSupply;
					padData.decimal = filteredDats[i].tokenDecimal;
					padData.chainID = filteredDats[i].chainID;
					padData.presaleAddress = filteredDats[i].launchpadAddress;
					padData.rate = filteredDats[i].presaleRate;
					padData.softCap = filteredDats[i].softCap;
					padData.hardCap = filteredDats[i].hardCap;
					padData.minBuy = filteredDats[i].minBuy;
					padData.maxBuy = filteredDats[i].maxBuy;
					padData.from = filteredDats[i].from;
					padData.to = filteredDats[i].to;
					padData.whiteListState = filteredDats[i].whiteListState;
					padData.whitelist = filteredDats[i].whiteList;
					padData.logoUrl = filteredDats[i].logoUrl;
					padData.website = filteredDats[i].website;
					padData.facebook = filteredDats[i].facebook;
					padData.twitter = filteredDats[i].twitter;
					padData.github = filteredDats[i].github;
					padData.telegram = filteredDats[i].telegram;
					padData.instagram = filteredDats[i].instagram;
					padData.discord = filteredDats[i].discord;
					padData.reddit = filteredDats[i].reddit;
					padData.description = filteredDats[i].description;
					padData.saleCount = filteredDats[i].saleCount;
					padData.safuState = filteredDats[i].safuState;
					padData.kycState = filteredDats[i].kycState;
					padData.auditState = filteredDats[i].auditState;
					padData.privateSale = filteredDats[i].privateSale;
					padData.premium = filteredDats[i].premium;
					padData.presaleState = filteredDats[i].presaleState;
					padData.favorite = filteredDats[i].favorite;
					padData.advertise = filteredDats[i].advertise;
					padData.pancakeswapLiquidity = filteredDats[i].pancakeswapLiquidity;
					padData.pancakeswapRate = filteredDats[i].pancakeswapRate;
					padData.pancakeswapLockup = filteredDats[i].pancakeswapLockup;
					padData.pancakeswapLockup = filteredDats[i].pancakeswapLockup;
					padData.withDrawBtnToken = filteredDats[i].withDrawBtnToken;
					padData.withDrawBtnName = filteredDats[i].withDrawBtnName;
					padData.finalizeBtn = filteredDats[i].finalizeBtn;
					padData.lockTimeState = filteredDats[i].lockTimeState;
					padData.lockTime = filteredDats[i].lockTime;
					padData.ownerWithDrawBtn = filteredDats[i].ownerWithDrawBtn;
					padData.FairState = filteredDats[i].FairState;

					pads[i] = Object.assign({}, padData);
				}

				dispatch({
					type: GET_PADS,
					payload: pads
				});
			};

			func2(listSize);
		})
		.catch((err) =>
			dispatch({
				type: GET_PADS,
				payload: null
			})
		);
};

export const getWhitelist = (id) => (dispatch) => {
	dispatch(setPadLoading());
	axios
		.get(`/api/addWhitelist/${id}`)
		.then((whitelists) =>
			dispatch({
				type: GET_WHILTELIST,
				payload: whitelists.data.whiteList
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_WHILTELIST,
				payload: null
			})
		);
};
export const getWhitelistdata = (id) => (dispatch) => {
	dispatch(setPadLoading());
	axios
		.get(`/api/addWhitelistState/getdata/${id}`)
		.then((whitelists) => {
			dispatch({
				type: GET_WHILTELIST_EVERY_DATA,
				payload: whitelists
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_WHILTELIST_EVERY_DATA,
				payload: null
			})
		);
};
export const setWhiteListData = (data) => (dispatch) => {
	dispatch(setPadLoading());
	axios
		.post(`/api/addWhitelistState/`, data)
		.then((whitelists) =>
			dispatch({
				type: SET_WHILTELIST_STATE,
				payload: whitelists
			})
		)
		.catch((err) =>
			dispatch({
				type: SET_WHILTELIST_STATE,
				payload: null
			})
		);
};

export const setReduxValue = (data) => (dispatch) => {
	dispatch({
		type: SET_BUFFER_DATA,
		payload: data
	});
};
export const setReduxValue1 = (data) => (dispatch) => {
	dispatch({
		type: SET_BUFFER_DATA1,
		payload: data
	});
};

export const setPadLoading = () => {
	return {
		type: PAD_LOADING
	};
};
