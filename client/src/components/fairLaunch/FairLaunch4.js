import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';
import { parse, stringify } from 'flatted';
import { IconButton, ButtonToolbar, Button } from 'rsuite';
import PauseIcon from '@rsuite/icons/PagePrevious';
import Moment from 'react-moment';
import { setWhiteListData, setReduxValue, setReduxValue1 } from '../../actions/padActions';
import { getEscrowAddress, getNetFeeValueLaunch, getRaisedFee } from '../../actions/authActions';
import PropTypes from 'prop-types';

var presaleRate,
	softCap,
	minBuy,
	maxBuy,
	from,
	to,
	logoUrl,
	website,
	facebook,
	twitter,
	telegram,
	instagram,
	github,
	discord,
	reddit,
	description,
	whiteListState;
var tokenName, tokenSymbol, tokenDecimals, tokenSupply, pancakeswapLiquidity, pancakeswapRate, pancakeswapLockup, unit;
var tokenFee = 0;
var receiverAddress;
var valRaisedFee = 17;

class FairLaunch4 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			presaleAddress: '',
			logoUrl: '',
			website: '',
			formErrors: { logoUrl: '', website: '' },
			logoUrlValid: false,
			websiteValid: false,
			formValid: false
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		// this.props.getRaisedFee();
		this.props.getNetFeeValueLaunch();
		this.props.getEscrowAddress();
	}
	onSubmit(e) {
		e.preventDefault();

		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const userAddress = window.localStorage.getItem('userAddress');

			axios
				.get(`/api/getPresaleContractAbi`)
				.then(async (res) => {
					const abi = res.data;
					axios
						.get('/api/getPresaleContractBytecode')
						.then(async (res) => {
							const bytecode = res.data.object;
							const web3 = new Web3(Web3.givenProvider);
							const deploy_contract = new web3.eth.Contract(abi);

							let payload = {
								data: '0x' + bytecode,
								arguments: [
									window.localStorage.getItem('tokenAddress'),
									presaleRate,
									web3.utils.toWei(minBuy),
									web3.utils.toWei(maxBuy),
									web3.utils.toWei(softCap),
									web3.utils.toWei('1000000000000'),
									window.localStorage.getItem('fromTS'),
									window.localStorage.getItem('toTS'),
									receiverAddress,
									web3.utils.toWei(String(tokenFee), 'ether'),
									valRaisedFee
									// web3.utils.toWei(String(0.01), 'ether')
								]
							};

							let parameter = {
								from: userAddress,
								value: web3.utils.toWei(String(tokenFee), 'ether')
								// value: web3.utils.toWei(String(0.01), 'ether')
							};

							deploy_contract
								.deploy(payload)
								.send(parameter, (err, transactionHash) => {
									console.log('Transaction Hash :', transactionHash);
								})
								.on('confirmation', () => {})
								.then((newContractInstance) => {
									console.log('Deployed Contract Address : ', newContractInstance.options.address);
									this.setState({
										presaleAddress: newContractInstance.options.address
									});
									window.localStorage.setItem('presaleAddress', newContractInstance.options.address);

									axios
										.post(`/api/addPresaleAddress`, {
											userAddress: userAddress,
											tokenAddress: window.localStorage.getItem('tokenAddress'),
											presaleAddress: newContractInstance.options.address,
											presaleRate: presaleRate,
											minBuy: minBuy,
											maxBuy: maxBuy,
											softCap: softCap,
											hardCap: '10000000000000',
											from: new Date(from),
											to: new Date(to),
											logoUrl: logoUrl,
											website: website,
											facebook: facebook,
											twitter: twitter,
											github: github,
											telegram: telegram,
											instagram: instagram,
											discord: discord,
											reddit: reddit,
											description: description,
											whiteListState: whiteListState,
											pancakeswapLiquidity: pancakeswapLiquidity,
											pancakeswapRate: pancakeswapRate,
											pancakeswapLockup: pancakeswapLockup,
											FairState: true
										})
										.then(() => {
											console.log('success');
											window.location.href = `/FairlaunchRes`;
										})
										.catch((err) => console.log(err));
								});
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		} else {
			alert('You must connect a wallet!');
		}
	}

	render() {
		const { whiteData, whiteData1 } = this.props.pad;
		if (this.props.auth.escrowAddress !== undefined) {
			const { escrowAddress } = this.props.auth.escrowAddress.data;
			const { netFeeLaunch, raisedFee } = this.props.auth;

			receiverAddress = escrowAddress;
			if (netFeeLaunch !== undefined) {
				switch (window.localStorage.getItem('chainId')) {
					case '56':
						tokenFee = Number(netFeeLaunch.data.BSC);
						unit = 'BNB';
						break;
					case '97':
						tokenFee = Number(netFeeLaunch.data.BSCTest);
						unit = 'tBNB';
						break;
					case '1':
						tokenFee = Number(netFeeLaunch.data.ETH);
						unit = 'ETH';
						break;
					case '3':
						tokenFee = Number(netFeeLaunch.data.Ropsten);
						unit = 'ETH';
						break;
					case '43114':
						tokenFee = Number(netFeeLaunch.data.Avalanche);
						unit = 'AVAX';
						break;
					case '25':
						tokenFee = Number(netFeeLaunch.data.Cronos);
						unit = 'CRO';
						break;
					case '941':
						tokenFee = Number(netFeeLaunch.data.PulseTest);
						unit = 'tPLS';
						break;
					case '137':
						tokenFee = Number(netFeeLaunch.data.Polygon);
						unit = 'MATIC';
						break;
					default:
						tokenFee = 0.7;
						unit = 'BNB';
				}

				if (raisedFee !== undefined) valRaisedFee = raisedFee.data;
			}
		}

		presaleRate = whiteData.presaleRate;
		softCap = whiteData.softCap;
		minBuy = whiteData.minBuy;
		maxBuy = whiteData.maxBuy;
		from = whiteData.from;
		to = whiteData.to;
		website = whiteData1.website;
		logoUrl = whiteData1.logoUrl;
		facebook = whiteData1.facebook;
		twitter = whiteData1.twitter;
		github = whiteData1.github;
		telegram = whiteData1.telegram;
		instagram = whiteData1.instagram;
		discord = whiteData1.discord;
		reddit = whiteData1.reddit;
		description = whiteData1.description;
		whiteListState = whiteData.whiteListState;
		pancakeswapLiquidity = whiteData.pancakeswapLiquidity;
		pancakeswapRate = whiteData.pancakeswapRate;
		pancakeswapLockup = whiteData.pancakeswapLockup;

		tokenName = window.localStorage.tokenName;
		tokenSymbol = window.localStorage.tokenSymbol;
		tokenSupply = window.localStorage.tokenSupply;
		tokenDecimals = window.localStorage.tokenDecimals;

		return (
			<section className="ant-layout black-background">
				<main className="ant-layout-content MainLayout_content__2mZF9">
					<div className="py-6 container">
						<div style={{ height: '16px' }} />
						<div className="bg-dark style-border ant-card ant-card-bordered">
							<div className="ant-card-body">
								<h1 className="socials text-center" style={{ fontSize: '50px' }}>
									Finish
								</h1>
								<p className="lead text-center" style={{ marginTop: '50px', fontSize: '18px' }}>
									<i>Review your information</i>
								</p>
								<form onSubmit={this.onSubmit} style={{ marginTop: '30px' }}>
									<div className="table-container">
										<div>
											<table>
												<tbody>
													<tr>
														<td width="50%" className="launch-tr">
															Token name
														</td>
														<td className="has-text-info has-text-right">{tokenName}</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Token symbol
														</td>
														<td className="has-text-info has-text-right">{tokenSymbol}</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Token decimals
														</td>
														<td className="has-text-info has-text-right">
															{tokenDecimals}
														</td>
													</tr>
													<tr className="launch-tr">
														<td width="50%" className="launch-tr">
															Total token
														</td>
														<td className="has-text-info has-text-right">
															{(tokenSupply / 10 ** tokenDecimals).toFixed(0)}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Presale rate
														</td>
														<td className="has-text-info has-text-right">{presaleRate}</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Softcap
														</td>
														<td className="has-text-info has-text-right">
															{softCap} {unit}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Minimum buy
														</td>
														<td className="has-text-info has-text-right">
															{minBuy} {unit}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Maximum buy
														</td>
														<td className="has-text-info has-text-right">
															{maxBuy} {unit}
														</td>
													</tr>

													<tr>
														<td width="50%" className="launch-tr">
															Start time
														</td>
														<td className="has-text-info has-text-right">
															<Moment format="YYYY-MM-DD HH:mm">{from}</Moment>
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															End time
														</td>
														<td className="has-text-info has-text-right">
															<Moment format="YYYY-MM-DD HH:mm">{to}</Moment>
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Whitelist
														</td>
														<td className="has-text-info has-text-right">
															{whiteListState === true ? 'Yes' : 'No'}
														</td>
													</tr>

													<tr>
														<td width="50%" className="launch-tr">
															Website
														</td>
														<td className="has-text-info has-text-right">{website}</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Liquidity (%)
														</td>
														<td className="has-text-info has-text-right">
															{pancakeswapLiquidity}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Swap Listing Rate
														</td>
														<td className="has-text-info has-text-right">
															{pancakeswapRate}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Presale Token Lockup (minutes)
														</td>
														<td className="has-text-info has-text-right">
															{pancakeswapLockup}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Tokens for Presale
														</td>
														<td className="has-text-info has-text-right">
															{softCap * presaleRate}
														</td>
													</tr>
													<tr>
														<td width="50%" className="launch-tr">
															Tokens for Liquidity
														</td>
														<td className="has-text-info has-text-right">
															{softCap * presaleRate * pancakeswapLiquidity / 100}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<ButtonToolbar>
										<Link to="/FairLaunch3">
											<IconButton
												icon={<PauseIcon className="icon" />}
												placement="left"
												id="launch-tool-button"
											>
												<strong>Back</strong>
											</IconButton>
										</Link>

										<Button type="submit" id="launch-tool-button">
											<strong>Submit</strong>
										</Button>
									</ButtonToolbar>
								</form>
							</div>
						</div>
					</div>
				</main>
			</section>
		);
	}
}

FairLaunch4.propTypes = {
	// verify: PropTypes.string.isRequired
	pad: PropTypes.object.isRequired,
	setReduxValue: PropTypes.func.isRequired,
	setReduxValue1: PropTypes.func.isRequired,
	getEscrowAddress: PropTypes.func.isRequired,
	getNetFeeValueLaunch: PropTypes.func.isRequired,
	getRaisedFee: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	presaleAddress: state.presaleAddress,
	pad: state.pad,
	auth: state.auth
	// errors: state.errors
});

export default connect(mapStateToProps, {
	getRaisedFee,
	setReduxValue,
	setReduxValue1,
	getEscrowAddress,
	getNetFeeValueLaunch
})(FairLaunch4);
