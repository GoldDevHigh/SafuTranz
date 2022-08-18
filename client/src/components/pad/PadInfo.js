import React, { Component } from 'react';
import classnames from 'classnames';
import Web3 from 'web3';
import axios from 'axios';
import { Button, Input, Radio, RadioGroup, List, Col, Row } from 'rsuite';
import { getWhitelist, setWhiteListData, getWhitelistdata } from '../../actions/padActions';
import { getEscrowAddress } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	FaChrome,
	FaDiscord,
	FaFacebookSquare,
	FaGithub,
	FaInstagram,
	FaReddit,
	FaTelegram,
	FaTwitter
} from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import Moment from 'react-moment';
import ProgressBar from '@ramonak/react-progress-bar';
import { Link } from 'react-router-dom';
import logoVideo from '../assets/video/sample.mp4';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

var netName;
var netNameBtn = true,
	tokenNameBtn = true,
	finalizeBtn = true;
var cancelBtn = true;

var ownerState = false;
var whileListInputState = true;
var minBuy,
	maxBuy,
	whiteListState,
	website,
	logoUrl,
	facebook,
	twitter,
	github,
	telegram,
	instagram,
	discord,
	reddit,
	tokenName,
	description,
	tokenSymbol,
	tokenDecimal,
	tokenSupply,
	softCap = 0,
	hardCap = 0,
	from,
	to,
	pancakeswapLiquidity,
	pancakeswapRate,
	pancakeswapLockup,
	presaleRate,
	tokenAddress,
	userAddress,
	withDrawBtnName,
	withDrawBtnToken,
	finalizeBtnState = false,
	chainId,
	tokenNameUrl,
	lockTimeState,
	ownerWithDrawBtn,
	kycState,
	auditState,
	safuState,
	premium,
	privateSale,
	FairState,
	ownerWithDrawBtnState,
	presaleState = true,
	BuyerSaleValue;
var saleCount = 0;
var dipTime;
var lockTime = new Date(),
	lockCalcTime;
var currentDate = new Date();
var receiverAddress;
var youRaise;
var presaleAddresstemp, tokenAddresstemp;
var doughnutPresale, doughnutLiquidity, doughnutLock, doughnutUnlock, doughnutTeam, doughnutBurn;

const options = {
	plugins: {
		legend: {
			position: 'top',
			// rtl: true,
			labels: {
				usePointStyle: true,
				pointStyle: 'circle',
				padding: 8,
				color: '#fff'
			}
		}
	}
};

class PadInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buy: '',
			formErrors: { buy: '' },
			buyValid: false,
			formValid: false,
			presaleState: '',
			soldTokens: 0,
			raisedAmount: 0,
			numberBuyer: 0,
			modalState: false,
			address: '',
			adderssSelect: '',
			data: {}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onModalState = this.onModalState.bind(this);
		this.addAddress = this.addAddress.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.onFinalizeClick = this.onFinalizeClick.bind(this);
		this.onwithRawTokenName = this.onwithRawTokenName.bind(this);
		this.onwithdrawNetName = this.onwithdrawNetName.bind(this);
		this.RemoveAddress = this.RemoveAddress.bind(this);
		this.onWithDraw = this.onWithDraw.bind(this);
	}

	componentDidMount() {
		let buf = this.props.match.params.id;
		presaleAddresstemp = buf.slice(0, 6) + ' ... ' + buf.slice(-3);

		this.props.getWhitelist(buf);
		this.props.getWhitelistdata(buf);
		this.props.getEscrowAddress();
		///BUFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
		doughnutPresale = 12;
		doughnutLiquidity = 10;
		doughnutLock = 8;
		doughnutUnlock = 6;
		doughnutTeam = 5;
		doughnutBurn = 3;

		window.scrollTo(0, 0);
		axios
			.get(`/api/getPresaleContractAbi`)
			.then(async (res) => {
				const abi = res.data;
				const web3 = new Web3(Web3.givenProvider);

				const presaleContract = new web3.eth.Contract(abi, buf);

				presaleContract.methods.presaleStatus().call().then((res) => {
					switch (res) {
						case '3':
							this.setState({
								presaleState: 'Failed'
							});

							break;
						case '2':
							this.setState({
								presaleState: 'Successful'
							});

							break;
						case '1':
							this.setState({
								presaleState: 'Active'
							});

							break;
						case '0':
							this.setState({
								presaleState: 'Queued'
							});
							break;
					}
				});

				presaleContract.methods.status().call().then((res) => {
					this.setState({
						numberBuyer: res.num_buyers,
						soldTokens: Number(res.sold_amount),
						raisedAmount: Number(res.raised_amount) / 1000000000000000000
					});
				});
				presaleContract.methods.buyers(window.localStorage.getItem('userAddress')).call().then((res) => {
					BuyerSaleValue = res.sale;
					youRaise = res.base;
				});
			})
			.catch((err) => console.log(err));
		setInterval(() => {
			this.setState((prevState) => {
				return {};
			});
		}, 1000);
	}

	onModalState() {
		this.setState({
			modalState: !this.state.modalStat
		});
	}

	changeWhiteListState(value) {
		whiteListState = value;
		const sendData = {
			whiteListState: value,
			tokenAddress: tokenAddress
		};
		this.props.setWhiteListData(sendData);
		this.props.getWhitelistdata(this.props.match.params.id);
	}

	onSubmit(e) {
		e.preventDefault();

		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			axios
				.get(`/api/getPresaleContractAbi`)
				.then(async (res) => {
					const abi = res.data;
					const web3 = new Web3(Web3.givenProvider);
					let parameter = {
						from: window.localStorage.getItem('userAddress'),
						value: web3.utils.toWei(this.state.buy, 'ether')
					};
					const data = {
						saleCount: this.state.buy
					};
					const presaleContract = new web3.eth.Contract(abi, this.props.match.params.id);

					presaleContract.methods.userDeposit().send(parameter).then(() => {
						axios
							.post(`/api/getPresaleContractAbi/${tokenAddress}/buy`, data)
							.then((res) => console.log('buy successfully'));
						alert(`You have boought ${this.state.buy} ${netName} `);
						window.location.href = `/PadInfo/${this.props.match.params.id}`;
					});
				})
				.catch((err) => console.log(err));
		} else {
			alert('You must connect a wallet!');
		}
	}

	handleInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;

		let buyValid = this.state.buyValid;

		switch (fieldName) {
			case 'buy':
				buyValid = value >= minBuy && value <= hardCap - this.state.raisedAmount ? true : false;
				fieldValidationErrors.buy = buyValid ? '' : ' is invalid';

				if (this.state.presaleState === 'Active') buyValid = true;
				else buyValid = false;

				break;
			default:
				break;
		}

		this.setState({
			formErrors: fieldValidationErrors,
			formValid: buyValid,
			buyValid: buyValid
		});
	}

	addAddress() {
		const data = {
			launchpadAddress: this.props.match.params.id,
			val: this.state.address
		};
		axios
			.post(`/api/addWhitelist`, data)
			.then((res) => {
				// window.localStorage.setItem('whitelist', res);
				this.props.getWhitelist(this.props.match.params.id);
			})
			.catch((err) => console.log(err));

		this.setState({
			address: ''
		});
	}

	RemoveAddress() {
		const data = {
			launchpadAddress: this.props.match.params.id,
			val: this.state.address
		};
		axios
			.post(`/api/removeWhitelist`, data)
			.then((res) => {
				// window.localStorage.setItem('whitelist', res);
				this.props.getWhitelist(this.props.match.params.id);
				console.log(res);
			})
			.catch((err) => console.log(err));

		this.setState({
			address: ''
		});
	}

	onChangeValue(event) {
		this.setState({
			address: event
		});
	}

	onWithDraw() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			axios
				.get(`/api/getPresaleContractAbi`)
				.then(async (res) => {
					const abi = res.data;
					const web3 = new Web3(Web3.givenProvider);
					const presaleContract = new web3.eth.Contract(abi, this.props.match.params.id);
					presaleContract.methods
						.withdrawICOCoin(window.localStorage.getItem('userAddress'), receiverAddress)
						.send({ from: window.localStorage.getItem('userAddress') })
						.then(() => {
							const data = {
								presaleAddress: tokenAddress,
								ownerWithDrawBtn: false
							};

							axios.post(`/api/getPresaleContractAbi/cancel`, data).then((res) => console.log(res));
							alert(`You have withdrawn the raised crypto`);
							window.location.href = `/PadInfo/${this.props.match.params.id}`;
						});
				})
				.catch((err) => console.log(err));
		}
	}

	onFinalizeClick() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			axios
				.get(`/api/getPresaleContractAbi`)
				.then(async (res) => {
					const abi = res.data;
					const web3 = new Web3(Web3.givenProvider);
					const presaleContract = new web3.eth.Contract(abi, this.props.match.params.id);
					presaleContract.methods
						.finalize()
						.send({ from: window.localStorage.getItem('userAddress') })
						.then(() => {
							currentDate = new Date();
							lockTime = new Date(currentDate.getTime() + Number(pancakeswapLockup) * 60000);

							const data = {
								presaleAddress: tokenAddress,
								presaleState: '2',
								finalizeBtn: true,
								lockTimeState: true,
								ownerWithDrawBtn: true,
								lockTime: lockTime
							};
							axios.post(`/api/getPresaleContractAbi/cancel`, data).then((res) => console.log(res));
							alert(`You have finalized the presale`);
							window.location.href = `/PadInfo/${this.props.match.params.id}`;
							lockTimeState = true;
						});
				})
				.catch((err) => console.log(err));
		}
	}

	onCancelClick() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			axios.get(`/api/getPresaleContractAbi`).then(async (res) => {
				const abi = res.data;
				const web3 = new Web3(Web3.givenProvider);
				const presaleContract = new web3.eth.Contract(abi, this.props.match.params.id);
				presaleContract.methods.cancel().send({ from: window.localStorage.getItem('userAddress') }).then(() => {
					const data = {
						presaleAddress: tokenAddress,
						presaleState: '3'
					};
					axios.post(`/api/getPresaleContractAbi/cancel`, data).then((res) => console.log(res));
					alert(`You have canceled the presale`);
					window.location.href = `/PadInfo/${this.props.match.params.id}`;
				});
			});
		}
	}

	onwithRawTokenName() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			axios.get(`/api/getPresaleContractAbi`).then(async (res) => {
				const abi = res.data;
				const web3 = new Web3(Web3.givenProvider);
				const presaleContract = new web3.eth.Contract(abi, this.props.match.params.id);
				presaleContract.methods
					.userWithdrawTokens()
					.send({ from: window.localStorage.getItem('userAddress') })
					.then(() => {
						const data = {
							presaleAddress: tokenAddress,
							presaleState: '2',
							withDrawBtnToken: true
						};
						axios.post(`/api/getPresaleContractAbi/cancel`, data).then((res) => console.log(res));
						alert(`You have successfully withdrawn ${tokenName}`);
						window.location.href = `/PadInfo/${this.props.match.params.id}`;
					});
			});
		}
	}

	onwithdrawNetName() {
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			axios.get(`/api/getPresaleContractAbi`).then(async (res) => {
				const abi = res.data;
				const web3 = new Web3(Web3.givenProvider);
				const presaleContract = new web3.eth.Contract(abi, this.props.match.params.id);
				presaleContract.methods
					.userWithdrawBaseTokens()
					.send({ from: window.localStorage.getItem('userAddress') })
					.then(() => {
						const data = {
							presaleAddress: tokenAddress,
							withDrawBtnName: true
						};
						axios.post(`/api/getPresaleContractAbi/cancel`, data).then((res) => console.log(res));
						alert(`You have successfully withdrawn ${netName}`);
						window.location.href = `/PadInfo/${this.props.match.params.id}`;
					});
			});
		}
	}

	render() {
		const { whitelist, whiteData } = this.props.pad;
		if (this.props.auth.escrowAddress !== undefined) {
			const { escrowAddress } = this.props.auth.escrowAddress.data;
			receiverAddress = escrowAddress;
		}

		if (whiteData.data === undefined) saleCount = 0;
		else {
			saleCount = whiteData.data[0].saleCount;
			whiteListState = whiteData.data[0].whiteListState;
			website = whiteData.data[0].website;
			facebook = whiteData.data[0].facebook;
			twitter = whiteData.data[0].twitter;
			github = whiteData.data[0].github;
			telegram = whiteData.data[0].telegram;
			instagram = whiteData.data[0].instagram;
			discord = whiteData.data[0].discord;
			reddit = whiteData.data[0].reddit;
			logoUrl = whiteData.data[0].logoUrl;
			tokenName = whiteData.data[0].tokenName;
			description = whiteData.data[0].description;
			tokenSymbol = whiteData.data[0].tokenSymbol;
			tokenDecimal = whiteData.data[0].tokenDecimal;
			tokenSupply = whiteData.data[0].tokenSupply;
			softCap = whiteData.data[0].softCap;
			hardCap = whiteData.data[0].hardCap;
			minBuy = whiteData.data[0].minBuy;
			maxBuy = whiteData.data[0].maxBuy;
			from = whiteData.data[0].from;
			to = whiteData.data[0].to;
			pancakeswapLiquidity = whiteData.data[0].pancakeswapLiquidity;
			pancakeswapRate = whiteData.data[0].pancakeswapRate;
			pancakeswapLockup = whiteData.data[0].pancakeswapLockup;
			presaleRate = whiteData.data[0].presaleRate;
			tokenAddress = whiteData.data[0].tokenAddress;
			userAddress = whiteData.data[0].userAddress;
			chainId = whiteData.data[0].chainID;
			withDrawBtnName = whiteData.data[0].withDrawBtnName;
			withDrawBtnToken = whiteData.data[0].withDrawBtnToken;
			finalizeBtnState = whiteData.data[0].finalizeBtn;
			lockTimeState = whiteData.data[0].lockTimeState;
			lockTime = whiteData.data[0].lockTime;
			ownerWithDrawBtn = whiteData.data[0].ownerWithDrawBtn;
			kycState = whiteData.data[0].kycState;
			auditState = whiteData.data[0].auditState;
			safuState = whiteData.data[0].safuState;
			premium = whiteData.data[0].premium;
			privateSale = whiteData.data[0].privateSale;
			FairState = whiteData.data[0].FairState;

			tokenAddresstemp = tokenAddress.slice(0, 6) + ' ... ' + tokenAddress.slice(-3);

			switch (whiteData.data[0].presaleState) {
				case '3':
					presaleState = 'Failed';
					break;
				case '2':
					presaleState = 'Successful';
					break;
				case '1':
					presaleState = 'Active';
					break;
				case '0':
					presaleState = 'Queued';
			}

			if (whiteListState === false) {
				whileListInputState = true;
			} else {
				const mylist = whitelist.find(
					(element) => Number(element.whiteListAddress) === Number(window.localStorage.getItem('userAddress'))
				);

				if (mylist === undefined) whileListInputState = false;
				else whileListInputState = true;
			}

			var hardCapTime = new Date(to);
			var softCapTime = new Date(from);
			var nowTime = new Date();
			var calcTime = new Date();
			var startTime = new Date();
			var formattedTime2;

			calcTime = hardCapTime.getTime() - nowTime.getTime();
			startTime = softCapTime.getTime() - nowTime.getTime();

			if (lockTimeState) {
				var lockTimeCalc = new Date(lockTime);
				lockCalcTime = lockTimeCalc.getTime() - nowTime.getTime();

				let unix_timestamp2 = lockCalcTime;
				// Create a new JavaScript Date object based on the timestamp
				// multiplied by 1000 so that the argument is in milliseconds, not seconds.
				var date2 = new Date(unix_timestamp2);

				var day2 = date2.getUTCDate();
				// Hours part from the timestamp
				var hours2 = date2.getUTCHours();
				// Minutes part from the timestamp
				var minutes2 = '0' + date2.getUTCMinutes();
				// Seconds part from the timestamp
				var seconds2 = '0' + date2.getUTCSeconds();

				// Will display time in 10:30:23 format
				formattedTime2 = hours2 + ':' + minutes2.substr(-2) + ':' + seconds2.substr(-2);
			}

			let unix_timestamp = calcTime;
			// Create a new JavaScript Date object based on the timestamp
			// multiplied by 1000 so that the argument is in milliseconds, not seconds.
			var date = new Date(unix_timestamp);

			var day = date.getUTCDate();
			// Hours part from the timestamp
			var hours = date.getUTCHours();
			// Minutes part from the timestamp
			var minutes = '0' + date.getUTCMinutes();
			// Seconds part from the timestamp
			var seconds = '0' + date.getUTCSeconds();

			// Will display time in 10:30:23 format
			var formattedTime = day - 1 + 'days; ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

			let unix_timestamp1 = startTime;
			// Create a new JavaScript Date object based on the timestamp
			// multiplied by 1000 so that the argument is in milliseconds, not seconds.
			var date1 = new Date(unix_timestamp1);

			var day1 = date1.getUTCDate();
			// Hours part from the timestamp
			var hours1 = date1.getUTCHours();
			// Minutes part from the timestamp
			var minutes1 = '0' + date1.getUTCMinutes();
			// Seconds part from the timestamp
			var seconds1 = '0' + date1.getUTCSeconds();

			// Will display time in 10:30:23 format
			var formattedTime1 = day1 - 1 + 'days; ' + hours1 + ':' + minutes1.substr(-2) + ':' + seconds1.substr(-2);

			if (whiteData.data[0].presaleState === '3') {
				dipTime = <span>FAILED</span>;
			} else if (whiteData.data[0].presaleState === '2') {
				dipTime = <span>SUCCESS</span>;
			} else if (softCapTime > nowTime) {
				dipTime = <span>UPCOMING:{formattedTime1}</span>;
			} else if (hardCapTime < nowTime) {
				if (hardCap <= saleCount) dipTime = <span>SUCCESS</span>;
				else if (softCap <= saleCount) dipTime = <span>SUCCESS</span>;
				else dipTime = <span>FAILED</span>;
			} else if (saleCount >= hardCap) {
				dipTime = <span>SUCCESS</span>;
			} else {
				dipTime = <span className="endTime-font">ACTIVE:{formattedTime}</span>;
			}
		}

		if (window.localStorage.getItem('userAddress') === userAddress) ownerState = true;
		else ownerState = false;

		var lister;
		if (whitelist.length !== 0) {
			lister = whitelist.map((item, id) => (
				<List.Item key={id} index={id} className="info-list-item">
					{item.whiteListAddress}
				</List.Item>
			));
		}

		switch (chainId) {
			case 1:
				netName = 'ETH';
				tokenNameUrl = 'https://etherscan.io/address/';
				break;
			case 3:
				netName = 'ETH';
				tokenNameUrl = 'https://ropsten.etherscan.io/address/';
				break;
			case 56:
				netName = 'BNB';
				tokenNameUrl = 'https://bscscan.com/address/';
				break;
			case 97:
				netName = 'tBNB';
				tokenNameUrl = 'https://testnet.bscscan.com/address/';
				break;
			case 43114:
				netName = 'AVAX';
				tokenNameUrl = 'https://avascan.info/blockchain/c/address/';
				break;
			case 25:
				netName = 'CRO';
				tokenNameUrl = 'https://cronoscan.com/address/';
				break;
			case 941:
				netName = 'tPLS';
				tokenNameUrl = 'https://scan.v2b.testnet.pulsechain.com/address/';
				break;
			case 137:
				netName = 'MATIC';
				tokenNameUrl = 'https://polygonscan.com/address/';
				break;
			default:
				netName = 'BNB';
				tokenNameUrl = 'https://bscscan.com/address/';
				break;
		}

		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			switch (this.state.presaleState) {
				case 'Successful':
					netNameBtn = true;
					cancelBtn = true;
					ownerWithDrawBtnState = true;
					finalizeBtn = false;
					this.state.buyValid = false;

					if (finalizeBtnState) {
						finalizeBtn = true;

						if (ownerWithDrawBtn) {
							ownerWithDrawBtnState = false;
						} else ownerWithDrawBtnState = true;

						if (lockCalcTime < 0) {
							if (BuyerSaleValue > 0) tokenNameBtn = false;
							else tokenNameBtn = true;
						}
					}
					if (withDrawBtnToken) {
						lockTimeState = false;
					}
					break;
				case 'Failed':
					tokenNameBtn = true;
					finalizeBtn = true;
					cancelBtn = true;
					ownerWithDrawBtnState = true;

					this.state.buyValid = false;
					netNameBtn = false;
					if (withDrawBtnName) netNameBtn = true;
					break;
				case 'Queued':
					tokenNameBtn = true;
					finalizeBtn = true;
					netNameBtn = true;
					ownerWithDrawBtnState = true;
					this.state.buyValid = false;
					cancelBtn = false;
					break;
				case 'Active':
					tokenNameBtn = true;
					finalizeBtn = true;
					netNameBtn = true;
					cancelBtn = false;
					ownerWithDrawBtnState = true;
					this.state.buyValid = true;

					if (softCap <= this.state.raisedAmount) {
						finalizeBtn = false;
					}
					break;
				default:
					tokenNameBtn = true;
					finalizeBtn = true;
					netNameBtn = true;
					ownerWithDrawBtn = true;
					cancelBtn = true;
					this.state.buyValid = false;
					break;
			}
		} else {
			tokenNameBtn = true;
			finalizeBtn = true;
			netNameBtn = true;
			cancelBtn = true;
			ownerWithDrawBtnState = true;
			this.state.buyValid = false;
		}
		if (this.props.pad.whiteData.data !== undefined) {
			whiteListState = this.props.pad.whiteData.data[0].whiteListState;
		}

		//display donghnut set
		const data = {
			labels: [ 'Presale', 'Liquidity', 'Team', 'Locked', 'Unlocked', 'Burnt' ],
			datasets: [
				{
					// label: '# of Votes',
					data: [
						doughnutPresale,
						doughnutLiquidity,
						doughnutLock,
						doughnutUnlock,
						doughnutTeam,
						doughnutBurn
					],
					backgroundColor: [ '#02D485', '#39D402', '#D44302', '#D48E02', '#0256D4', '#D4023B' ],
					borderColor: '#000',
					borderWidth: 5,
					hoverOffset: 4
				}
			]
		};

		return (
			<div>
				<section className="ant-layout black-background">
					<main className="">
						<div className="py-5">
							{FairState ? (
								<div className="bg-dark style-border columns mt-4">
									<div className="column is-flex-grow-2">
										<div className="ant-card ant-card-bordered">
											<div className="ant-card-body">
												<Link to="/PadList">
													<button className="back-button">back</button>
												</Link>
												<article className="media pool-detail" style={{ position: 'relative' }}>
													<div className="media-content">
														<div className="content">
															<div className="is-flex is-align-items-center">
																<div>
																	{website !== null ? (
																		<a
																			href={website}
																			style={{ marginRight: '5px' }}
																		>
																			<FaChrome
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{facebook !== null ? (
																		<a
																			href={facebook}
																			style={{ marginRight: '5px' }}
																		>
																			<FaFacebookSquare
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{twitter !== null ? (
																		<a
																			href={twitter}
																			style={{ marginRight: '5px' }}
																		>
																			<FaTwitter
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}

																	{github !== null ? (
																		<a href={github} style={{ marginRight: '5px' }}>
																			<FaGithub
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}

																	{telegram !== null ? (
																		<a
																			href={telegram}
																			style={{ marginRight: '5px' }}
																		>
																			<FaTelegram
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}

																	{instagram !== null ? (
																		<a
																			href={instagram}
																			style={{ marginRight: '5px' }}
																		>
																			<FaInstagram
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{discord !== null ? (
																		<a
																			href={discord}
																			style={{ marginRight: '5px' }}
																		>
																			<FaDiscord
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{reddit !== null ? (
																		<a href={reddit} style={{ marginRight: '5px' }}>
																			<FaReddit
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																</div>
															</div>
															<div className="ant-typography" />
														</div>
														<div>
															{whiteListState ? (
																<span className="card-whitelist-text">WHT</span>
															) : (
																''
															)}
															{kycState ? <span className="card-kyc-text">KYC</span> : ''}
															{auditState ? (
																<span className="card-audit-text">AUDIT</span>
															) : (
																''
															)}
															{safuState ? (
																<span className="card-safu-text">SAFU</span>
															) : (
																''
															)}
															{premium ? (
																<span className="card-premium-text">PRM</span>
															) : (
																''
															)}
															{privateSale ? (
																<span className="card-privateSale-text">PVT</span>
															) : (
																''
															)}
														</div>
													</div>
												</article>
												<div className="table-container mt-6">
													<table>
														<tbody>
															<tr>
																<td>
																	<img
																		src={logoUrl}
																		width="60px"
																		height="60px"
																		alt="logo"
																	/>
																</td>
																<td className="has-text-left">
																	<h3 className="mr-3  launch-tr">
																		{tokenName} Presale
																	</h3>
																</td>
															</tr>
															<tr>
																<td colSpan={2} className="has-text-center launch-tr">
																	Fair LaunchPad
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">Description</td>
																<td
																	className="has-text-left"
																	style={{ fontSize: '15px' }}
																>
																	{description}
																</td>
															</tr>
															<tr>
																<td colSpan={2}>
																	<div className="divider flex flex-column">
																		<div className="rounded-md">
																			Token Information
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">Chain</td>
																<td className="has-text-left">{chainId}</td>
															</tr>

															<tr>
																<td className="has-text-left launch-tr">
																	Token Address
																</td>
																<td className="has-text-left addresses">
																	<a
																		href={tokenNameUrl + tokenAddress}
																		target="_blank"
																		rel="noreferrer nofollow"
																		id="pad-info-a"
																	>
																		{tokenAddress}
																	</a>
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">Token Name</td>
																<td className="has-text-left">{tokenName}</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Token Symbol
																</td>
																<td className="has-text-left">{tokenSymbol}</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Token Decimals
																</td>
																<td className="has-text-left">{tokenDecimal}</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Total Supply
																</td>
																<td className="has-text-left">{tokenSupply}</td>
															</tr>
															<tr>
																<td colSpan={2}>
																	<div className="divider flex flex-column">
																		<div className="rounded-md">
																			Presale Information
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Presale Address
																</td>
																<td className="has-text-left">
																	<a
																		className="mr-1"
																		href={tokenNameUrl + this.props.match.params.id}
																		target="_blank"
																		rel="noreferrer nofollow"
																		id="pad-info-a"
																	>
																		{this.props.match.params.id}
																	</a>
																	<br />
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Presale Rate
																</td>
																<td className="has-text-left">
																	1 {netName} = {presaleRate}
																	{tokenSymbol}
																</td>
															</tr>

															<tr>
																<td className="has-text-left launch-tr">Soft Cap</td>
																<td className="has-text-left">
																	{softCap} {netName}
																</td>
															</tr>

															<tr>
																<td className="has-text-left launch-tr">Minimum Buy</td>
																<td className="has-text-left">
																	{minBuy} {netName}
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">Maximum Buy</td>
																<td className="has-text-left">
																	{maxBuy} {netName}
																</td>
															</tr>

															<tr>
																<td className="has-text-left launch-tr">
																	Presale Start Time
																</td>
																<td className="has-text-left">
																	<Moment format="YYYY-MM-DD HH:mm">{from}</Moment>
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Presale End Time
																</td>
																<td className="has-text-left">
																	<Moment format="YYYY-MM-DD HH:mm">{to}</Moment>
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Liquidity (%)
																</td>
																<td className="has-text-left">
																	{pancakeswapLiquidity}
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Swap Listing Rate
																</td>
																<td className="has-text-left">{pancakeswapRate}</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Presale Token Lockup (minutes)
																</td>
																<td className="has-text-left">{pancakeswapLockup}</td>
															</tr>
															<tr>
																<td width="50%" className="has-text-left launch-tr">
																	Tokens for Presale
																</td>
																<td className="has-text-info has-text-left">
																	{softCap * presaleRate}
																</td>
															</tr>
															<tr>
																<td width="50%" className="has-text-left launch-tr">
																	Tokens for Liquidity
																</td>
																<td className="has-text-info has-text-left">
																	{softCap * presaleRate * pancakeswapLiquidity / 100}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									<div className="column is-flex-grow-1">
										<div className="ant-card ant-card-bordered">
											<div className="ant-card-body">
												<div className="field">
													<table>
														<tbody>
															<tr>
																<td colSpan={2}>
																	<div className="divider flex flex-column">
																		<div className="rounded-md">
																			Presale Status Information
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Presale Status
																</td>
																<td className="text-white" style={{ fontSize: '15px' }}>
																	{dipTime}
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Number of Buyers
																</td>
																<td className="text-white">{this.state.numberBuyer}</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">Sold Tokens</td>
																<td className="text-white">
																	{this.state.soldTokens} {tokenSymbol}
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Raised Amount
																</td>
																<td className="text-white">
																	{this.state.raisedAmount} {netName}
																</td>
															</tr>
															<tr>
																<td className="has-text-left launch-tr">
																	Raised by You
																</td>
																<td className="text-white">
																	{youRaise / 10 ** 18} {netName}
																</td>
															</tr>
														</tbody>
													</table>
													<ProgressBar
														completed={(saleCount / Number(softCap) * 100).toFixed(0)}
														className="info-progressbar"
													/>
													<span className="float-left">0</span>
													<span className="float-right">
														{softCap} {netName}
													</span>
													<div className="ant-card ant-card-bordered">
														{ownerState ? (
															<div className="ant-card-body">
																<div className="mt-2">
																	<div className="field">
																		<label
																			htmlFor=""
																			className="launch-tr"
																			style={{ fontSize: '30px' }}
																		>
																			Sale Type
																		</label>
																		<RadioGroup
																			style={{ width: '100%', display: 'flex' }}
																			value={whiteListState}
																			onChange={(value) => {
																				this.changeWhiteListState(value);
																			}}
																		>
																			<Radio value={false} className="text-white">
																				Public
																			</Radio>
																			<Radio value={true} className="text-white">
																				WhiteList
																			</Radio>
																		</RadioGroup>
																	</div>
																	<List autoScroll className="info-list">
																		{lister}
																	</List>
																	<h4 className="text-white">
																		{whitelist ? whitelist.length : 0} whiteListed
																		users
																	</h4>
																	{whiteListState ? (
																		<div>
																			<Input
																				placeholder="whitelist address"
																				id="pay-info-input-owner"
																				style={{ marginTop: '10px' }}
																				value={this.state.address}
																				onChange={this.onChangeValue}
																			/>
																			<Button
																				disabled={this.state.address === ''}
																				className="pay-info-button-add"
																				style={{ marginTop: '20px' }}
																				onClick={this.addAddress}
																			>
																				Add
																			</Button>
																			<Button
																				disabled={this.state.address === ''}
																				className="pay-info-button-add"
																				style={{ marginTop: '20px' }}
																				onClick={this.RemoveAddress}
																			>
																				Remove
																			</Button>
																		</div>
																	) : (
																		''
																	)}
																	<hr />
																</div>
																<label
																	htmlFor=""
																	className="label"
																	style={{ fontSize: '15px' }}
																	id="white"
																>
																	Pool Actions
																</label>
																<div className="my-2">
																	<button
																		disabled={finalizeBtn}
																		type="button"
																		className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																		onClick={this.onFinalizeClick}
																	>
																		<span>Finalize Pool</span>
																	</button>
																</div>
																<div className="my-2">
																	<button
																		disabled={cancelBtn}
																		type="button"
																		className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																		onClick={this.onCancelClick}
																	>
																		<span>Cancel Pool</span>
																	</button>
																</div>
																<div className="my-2">
																	<button
																		disabled={ownerWithDrawBtnState}
																		type="button"
																		className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																		onClick={this.onWithDraw}
																	>
																		<span>withdraw ICO</span>
																	</button>
																</div>
															</div>
														) : (
															<div>
																<List autoScroll className="info-list info-list-state ">
																	{lister}
																</List>
																<h4 className="text-white">
																	{whitelist ? whitelist.length : 0} whiteListed users
																</h4>
															</div>
														)}
													</div>
												</div>
												{whiteListState ? !whileListInputState ? (
													<p style={{ color: 'red', marginTop: '30px', fontSize: '20px' }}>
														You are not a whitelisted user
													</p>
												) : (
													<p style={{ marginTop: '30px', fontSize: '20px' }}>
														You are a whitelisted user
													</p>
												) : (
													''
												)}
											</div>
										</div>
									</div>
									{whileListInputState ? (
										<div className="column is-flex-grow-1">
											<div className="ant-card ant-card-bordered">
												<div className="ant-card-body">
													<form onSubmit={this.onSubmit}>
														<div className="field">
															<label className="label" id="white">
																Amount should be more than {minBuy} {netName} and less
																than {(maxBuy - this.state.raisedAmount).toFixed(3)}{' '}
																{netName}
															</label>
															<div style={{ marginTop: '20px' }}>
																<input
																	value={this.state.buy}
																	onChange={(event) => this.handleInput(event)}
																	className={classnames(
																		'form-control form-control-lg pay-info-input',
																		{ 'is-invalid': this.state.formErrors.buy }
																	)}
																	id="buy"
																	name="buy"
																	type="number"
																	placeholder="0.0"
																/>

																<div className="invalid-feedback">
																	{this.state.formErrors.buy}
																</div>
															</div>
														</div>
														<button
															disabled={!this.state.buyValid}
															type="submit"
															className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
															style={{ marginTop: '15px' }}
														>
															<svg
																stroke="currentColor"
																fill="currentColor"
																strokeWidth="0"
																viewBox="0 0 1024 1024"
																height="1em"
																width="1em"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
															</svg>
															<span className="ml-2">Buy</span>
														</button>

														<div style={{ marginTop: '40px' }}>
															<button
																disabled={tokenNameBtn}
																onClick={this.onwithRawTokenName}
																type="button"
																className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
															>
																<span>
																	withdraw{' '}
																	{finalizeBtnState ? lockCalcTime > 0 ? (
																		<span style={{ color: 'red' }}>
																			{formattedTime2}
																		</span>
																	) : (
																		tokenName
																	) : (
																		tokenName
																	)}
																</span>
															</button>
														</div>
														<div style={{ marginTop: '10px' }}>
															<button
																disabled={netNameBtn}
																type="button"
																className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																onClick={this.onwithdrawNetName}
															>
																<span>withdraw {netName}</span>
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
									) : (
										''
									)}
								</div>
							) : (
								<div>
									<Link to="/PadList">
										<div className="has-text-left">
											<button className="back-button">
												<TiArrowBack />back
											</button>
										</div>
									</Link>
									<div className="columns mt-4">
										<div className="column is-flex-grow-2">
											<div className="img-header" />
											<div className="ant-card ant-card-bordered colum-back">
												<img
													src={logoUrl}
													width="80px"
													height="80px"
													alt="logo"
													style={{ marginTop: '-40px', float: 'left', marginLeft: '10px' }}
												/>
												<div className="ant-card-body">
													<div className="media-content text-center">
														<div
															className="is-align-items-center"
															style={{
																fontSize: '30px',
																marginBottom: '10px',
																marginRight: '50px'
															}}
														>
															{tokenName} Presale
														</div>
														<div>
															<div className="is-align-items-center">
																<div>
																	{website !== null ? (
																		<a
																			href={website}
																			style={{ marginRight: '5px' }}
																		>
																			<FaChrome
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{facebook !== null ? (
																		<a
																			href={facebook}
																			style={{ marginRight: '5px' }}
																		>
																			<FaFacebookSquare
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{twitter !== null ? (
																		<a
																			href={twitter}
																			style={{ marginRight: '5px' }}
																		>
																			<FaTwitter
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}

																	{github !== null ? (
																		<a href={github} style={{ marginRight: '5px' }}>
																			<FaGithub
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}

																	{telegram !== null ? (
																		<a
																			href={telegram}
																			style={{ marginRight: '5px' }}
																		>
																			<FaTelegram
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}

																	{instagram !== null ? (
																		<a
																			href={instagram}
																			style={{ marginRight: '5px' }}
																		>
																			<FaInstagram
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{discord !== null ? (
																		<a
																			href={discord}
																			style={{ marginRight: '5px' }}
																		>
																			<FaDiscord
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																	{reddit !== null ? (
																		<a href={reddit} style={{ marginRight: '5px' }}>
																			<FaReddit
																				size={20}
																				color={'rgb(245, 163, 12)'}
																			/>
																		</a>
																	) : (
																		''
																	)}
																</div>
															</div>
														</div>
														<div className="is-align-items-center">
															{whiteListState ? (
																<span className="card-whitelist-text">WHT</span>
															) : (
																''
															)}
															{kycState ? <span className="card-kyc-text">KYC</span> : ''}
															{auditState ? (
																<span className="card-audit-text">AUDIT</span>
															) : (
																''
															)}
															{safuState ? (
																<span className="card-safu-text">SAFU</span>
															) : (
																''
															)}
															{premium ? (
																<span className="card-premium-text">PRM</span>
															) : (
																''
															)}
															{privateSale ? (
																<span className="card-privateSale-text">PVT</span>
															) : (
																''
															)}
														</div>
													</div>
													<div
														className="text-center"
														style={{
															fontSize: '15px',
															marginTop: '30px',
															marginBottom: '30px'
														}}
													>
														{description}
													</div>
													<div className="table-container mt-2">
														<table>
															<tbody>
																<tr>
																	<td colSpan={2}>
																		<div className="divider flex flex-column">
																			<div
																				className="rounded-md"
																				style={{ fontSize: '18px' }}
																			>
																				Token Information
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Token Address
																	</td>
																	<td className="has-text-right addresses">
																		<a
																			href={tokenNameUrl + tokenAddress}
																			target="_blank"
																			rel="noreferrer nofollow"
																			id="pad-info-a"
																		>
																			{tokenAddresstemp}
																		</a>
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Token Name
																	</td>
																	<td className="has-text-right">{tokenName}</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Token Symbol
																	</td>
																	<td className="has-text-right">{tokenSymbol}</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Total Supply
																	</td>
																	<td className="has-text-right">{tokenSupply}</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Token Decimals
																	</td>
																	<td className="has-text-right">{tokenDecimal}</td>
																</tr>
															</tbody>
														</table>
														<table style={{ marginTop: '30px' }}>
															<tbody>
																<tr>
																	<td colSpan={2}>
																		<div className="divider flex flex-column">
																			<div
																				className="rounded-md"
																				style={{ fontSize: '18px' }}
																			>
																				Presale Information
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Presale Address
																	</td>
																	<td className="has-text-right">
																		<a
																			className="mr-1"
																			href={
																				tokenNameUrl +
																				this.props.match.params.id
																			}
																			target="_blank"
																			rel="noreferrer nofollow"
																			id="pad-info-a"
																		>
																			{presaleAddresstemp}
																		</a>
																		<br />
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Presale Rate
																	</td>
																	<td className="has-text-right">
																		1 {netName} = {presaleRate}
																		{tokenSymbol}
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Listing Rate
																	</td>
																	<td className="has-text-right">
																		{pancakeswapRate}
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Soft Cap
																	</td>
																	<td className="has-text-right">
																		{softCap} {netName}
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Hard Cap
																	</td>
																	<td className="has-text-right">
																		{hardCap} {netName}
																	</td>
																</tr>
																<tr>
																	<td width="50%" className="has-text-left launch-tr">
																		Tokens for Presale
																	</td>
																	<td className="has-text-info has-text-right">
																		{hardCap * presaleRate}
																	</td>
																</tr>
																<tr>
																	<td width="50%" className="has-text-left launch-tr">
																		Tokens for Liquidity
																	</td>
																	<td className="has-text-info has-text-right">
																		{hardCap *
																			presaleRate *
																			pancakeswapLiquidity /
																			100}
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Liquidity (%)
																	</td>
																	<td className="has-text-right">
																		{pancakeswapLiquidity}
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Presale Start Time
																	</td>
																	<td className="has-text-right">
																		<Moment format="YYYY-MM-DD HH:mm">
																			{from}
																		</Moment>
																	</td>
																</tr>
																<tr>
																	<td className="has-text-left launch-tr">
																		Presale End Time
																	</td>
																	<td className="has-text-right">
																		<Moment format="YYYY-MM-DD HH:mm">{to}</Moment>
																	</td>
																</tr>

																<tr>
																	<td className="has-text-left launch-tr">
																		Lockup (Minutes)
																	</td>
																	<td className="has-text-right">
																		{pancakeswapLockup}
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
													<div
														className="text-center"
														style={{ marginTop: '50px', marginBottom: '30px' }}
													>
														<video autoplay muted loop controls height="200" width="250">
															<source src={logoVideo} type="video/mp4" autostart />
															Your browser does not support HTML5 video.
														</video>
													</div>
												</div>
											</div>
										</div>

										<div className="column is-flex-grow-1">
											<div className="ant-card ant-card-bordered">
												<div className="padinfo-pannel">
													<div className="divider flex flex-column">
														<div className="rounded-md1">Presale Status Information</div>
													</div>
													<div className="ant-card-body1">
														<div className="padinfo-table">
															<Row>
																<Col md={12} className="has-text-left launch-tr">
																	Presale Status
																</Col>
																<Col
																	md={12}
																	className="has-text-right text-white"
																	style={{ fontSize: '15px' }}
																>
																	{dipTime}
																</Col>
															</Row>

															<Row>
																<Col md={16} className="has-text-left launch-tr">
																	Number of Buyers
																</Col>
																<Col md={8} className="has-text-right  text-white">
																	{this.state.numberBuyer}
																</Col>
															</Row>
															<Row>
																<Col md={8} className="has-text-left launch-tr">
																	Sold Tokens
																</Col>
																<Col md={16} className=" has-text-right text-white">
																	{this.state.soldTokens} {tokenSymbol}
																</Col>
															</Row>
															<Row>
																<Col md={12} className="has-text-left launch-tr">
																	Raised Amount
																</Col>
																<Col md={12} className=" has-text-right text-white">
																	{this.state.raisedAmount} {netName}
																</Col>
															</Row>
															<Row>
																<Col md={12} className="has-text-left launch-tr">
																	Raised by You
																</Col>
																<Col md={12} className=" has-text-right text-white">
																	{youRaise / 10 ** 18} {netName}
																</Col>
															</Row>
															<div
																style={{
																	marginTop: '20px',
																	paddingLeft: '10px',
																	paddingRight: '10px'
																}}
															>
																<ProgressBar
																	completed={(saleCount /
																		Number(hardCap) *
																		100).toFixed(0)}
																	bgColor={
																		saleCount <= softCap ? '#bf9d07' : '#2fbf07'
																	}
																	className="info-progressbar"
																	labelAlignment="center"
																	labelColor="rgb(0 51 255)"
																	customLabel={
																		(saleCount / Number(hardCap) * 100).toFixed(0) +
																		'%'
																	}
																	height="15px"
																/>
																<span className="float-left">0</span>
																<span className="float-right">
																	{hardCap} {netName}
																</span>
															</div>
														</div>
													</div>

													{whiteListState ? !whileListInputState ? (
														<p
															style={{
																color: 'red',
																marginTop: '30px',
																fontSize: '20px'
															}}
														>
															You are not a whitelisted user
														</p>
													) : (
														<p style={{ marginTop: '30px', fontSize: '20px' }}>
															You are a whitelisted user
														</p>
													) : (
														''
													)}
												</div>
												<div className="padinfo-pannel">
													<h4 style={{ marginTop: '10px', color: '#F5F5F5' }}>
														Token Supply Distribution
													</h4>
													<div className="divider1 flex flex-column text-white" />
													<div className="ant-card-body1">
														<h5 style={{ marginTop: '10px', marginBottom: '10px' }}>
															Market Cap: 150,000 $
														</h5>
														<Doughnut data={data} options={options} />
													</div>
												</div>
											</div>
										</div>

										<div className="column is-flex-grow-1">
											<div className="ant-card ant-card-bordered">
												<div className="padinfo-pannel">
													<div className="divider flex flex-column">
														<div className="rounded-md1">Sale Control</div>
													</div>
													<div
														className="ant-card-body1"
														style={{ paddingLeft: '20px', paddingRight: '20px' }}
													>
														<form onSubmit={this.onSubmit}>
															<label className="label" id="white">
																Amount should be more than {minBuy} {netName} and less
																than {(maxBuy - this.state.raisedAmount).toFixed(3)}{' '}
																{netName}
															</label>

															<Row>
																<Col md={12} className="has-text-left launch-tr">
																	Minimum Buy
																</Col>
																<Col
																	md={12}
																	className="text-white has-text-right"
																	style={{ fontSize: '15px' }}
																>
																	{minBuy} {netName}
																</Col>
															</Row>
															<Row>
																<Col md={12} className="has-text-left launch-tr">
																	Maximum Buy
																</Col>
																<Col md={12} className="text-white has-text-right">
																	{maxBuy} {netName}
																</Col>
															</Row>

															<Row>
																<Col md={12} xs={12}>
																	<input
																		value={this.state.buy}
																		onChange={(event) => this.handleInput(event)}
																		className={classnames(
																			'form-control form-control-lg pay-info-input',
																			{
																				'is-invalid': this.state.formErrors.buy
																			}
																		)}
																		id="buy"
																		name="buy"
																		type="number"
																		placeholder="0.0"
																	/>

																	<div className="invalid-feedback">
																		{this.state.formErrors.buy}
																	</div>
																</Col>
																<Col md={12} xs={24}>
																	<button
																		disabled={!this.state.buyValid}
																		type="submit"
																		className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																		style={{ marginTop: '15px' }}
																	>
																		<svg
																			stroke="currentColor"
																			fill="currentColor"
																			strokeWidth="0"
																			viewBox="0 0 1024 1024"
																			height="1em"
																			width="1em"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
																		</svg>
																		<span className="ml-2">Buy</span>
																	</button>
																</Col>
															</Row>
														</form>

														<div style={{ marginTop: '40px' }}>
															<button
																disabled={tokenNameBtn}
																onClick={this.onwithRawTokenName}
																type="button"
																className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																style={{ height: '28px' }}
															>
																<span>
																	withdraw{' '}
																	{finalizeBtnState ? lockCalcTime > 0 ? (
																		<span style={{ color: 'red' }}>
																			{formattedTime2}
																		</span>
																	) : (
																		tokenName
																	) : (
																		tokenName
																	)}
																</span>
															</button>
														</div>

														<div style={{ marginTop: '15px' }}>
															<button
																disabled={netNameBtn}
																type="button"
																className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																onClick={this.onwithdrawNetName}
																style={{ height: '28px' }}
															>
																<span>withdraw {netName}</span>
															</button>
														</div>
													</div>
												</div>

												<div className="ant-card ant-card-bordered">
													{ownerState ? (
														<div>
															<div className="padinfo-pannel">
																<div className="divider flex flex-column">
																	<div className="rounded-md1">Pool Actions</div>
																</div>
																<div className="ant-card-body">
																	<div className="my-2">
																		<button
																			disabled={finalizeBtn}
																			type="button"
																			className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																			onClick={this.onFinalizeClick}
																		>
																			<span>Finalize Pool</span>
																		</button>
																	</div>
																	<div className="my-2">
																		<button
																			disabled={cancelBtn}
																			type="button"
																			className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																			onClick={this.onCancelClick}
																		>
																			<span>Cancel Pool</span>
																		</button>
																	</div>
																	<div className="my-2">
																		<button
																			disabled={ownerWithDrawBtnState}
																			type="button"
																			className="ant-btn ant-btn-default ant-btn-block ant-btn-dangerous pay-info-action-button"
																			onClick={this.onWithDraw}
																		>
																			<span>withdraw ICO</span>
																		</button>
																	</div>
																</div>
															</div>
															<div className="padinfo-pannel yallow-border ">
																<div className="divider flex flex-column">
																	<div className="rounded-md1">Sale Type</div>
																</div>
																<div className="ant-card-body1">
																	<div>
																		<div>
																			<RadioGroup
																				style={{
																					width: '100%',
																					display: 'flex'
																				}}
																				value={whiteListState}
																				onChange={(value) => {
																					this.changeWhiteListState(value);
																				}}
																			>
																				<Row>
																					<Col md={12} xs={12}>
																						<Radio
																							value={false}
																							className="text-white"
																						>
																							Public
																						</Radio>
																					</Col>
																					<Col md={12} xs={12}>
																						<Radio
																							value={true}
																							className="text-white"
																						>
																							WhiteList
																						</Radio>
																					</Col>
																				</Row>
																			</RadioGroup>
																		</div>
																		<List autoScroll className="info-list">
																			{lister}
																		</List>
																		<h4 className="text-white">
																			{whitelist ? whitelist.length : 0}{' '}
																			whiteListed users
																		</h4>
																		{whiteListState ? (
																			<div>
																				<Input
																					placeholder="whitelist address"
																					id="pay-info-input-owner"
																					style={{
																						marginTop: '10px'
																					}}
																					value={this.state.address}
																					onChange={this.onChangeValue}
																				/>
																				<Button
																					disabled={this.state.address === ''}
																					className="pay-info-button-add"
																					style={{
																						marginTop: '20px'
																					}}
																					onClick={this.addAddress}
																				>
																					Add
																				</Button>
																				<Button
																					disabled={this.state.address === ''}
																					className="pay-info-button-add"
																					style={{
																						marginTop: '20px'
																					}}
																					onClick={this.RemoveAddress}
																				>
																					Remove
																				</Button>
																			</div>
																		) : (
																			''
																		)}
																		<hr />
																	</div>
																</div>
															</div>
														</div>
													) : (
														<div>
															{whileListInputState ? (
																<div>
																	<div className="padinfo-pannel  yallow-border">
																		<div className="divider flex flex-column">
																			<div className="rounded-md1">Sale Type</div>
																		</div>
																		<div className="ant-card-body1">
																			<List autoScroll className="info-list ">
																				{lister}
																			</List>
																			<h4 className="text-white">
																				{whitelist ? whitelist.length : 0}{' '}
																				whiteListed users
																			</h4>
																		</div>
																	</div>
																</div>
															) : (
																''
															)}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</main>
				</section>
			</div>
		);
	}
}

PadInfo.propTypes = {
	getWhitelistdata: PropTypes.func.isRequired,
	getWhitelist: PropTypes.func.isRequired,
	setWhiteListData: PropTypes.func.isRequired,
	getEscrowAddress: PropTypes.func.isRequired,
	pad: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	pad: state.pad,
	auth: state.auth
});

export default connect(mapStateToProps, { getWhitelist, setWhiteListData, getWhitelistdata, getEscrowAddress })(
	PadInfo
);
