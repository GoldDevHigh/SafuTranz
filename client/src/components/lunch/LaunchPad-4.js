import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3';
import { IconButton, ButtonToolbar, Button, Col, Row } from 'rsuite';
import PauseIcon from '@rsuite/icons/PagePrevious';
import Moment from 'react-moment';
import { setWhiteListData, setReduxValue, setReduxValue1 } from '../../actions/padActions';
import { getEscrowAddress, getNetFeeValueLaunch, getRaisedFee } from '../../actions/authActions';
import PropTypes from 'prop-types';
import lunchpadImg from '../assets/img/back/Spaceship_08-removebg-preview@2x.png';
import { BsFillPatchCheckFill } from 'react-icons/bs';

var presaleRate,
	softCap,
	hardCap,
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
	youtube,
	bannel,
	whiteListState;
var tokenName, tokenSymbol, tokenDecimals, tokenSupply, pancakeswapLiquidity, pancakeswapRate, pancakeswapLockup, unit;
var tokenFee = 0;
var receiverAddress;
var valRaisedFee = 17;

class LaunchPad4 extends Component {
	constructor(props) {
		super(props);
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
									web3.utils.toWei(hardCap),
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
											hardCap: hardCap,
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
											pancakeswapLockup: pancakeswapLockup
										})
										.then(() => {
											console.log('success');
											window.location.href = `/LaunchRes`;
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
					case '43113':
						tokenFee = Number(netFeeLaunch.data.AvalancheTest);
						unit = 'TAVAX';
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
		hardCap = whiteData.hardCap;
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
		youtube = whiteData1.youtube;
		bannel = whiteData.bannel;

		whiteListState = whiteData.whiteListState;
		pancakeswapLiquidity = whiteData.pancakeswapLiquidity;
		pancakeswapRate = whiteData.pancakeswapRate;
		pancakeswapLockup = whiteData.pancakeswapLockup;
		pancakeswapLockup = whiteData.pancakeswapLockup;
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
								<div className="lead2" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
									<Row>
										<Col md={12} xs={24}>
											<h1
												className=" text-center"
												style={{ fontSize: '40px', marginTop: '10px' }}
											>
												VERIFY TOKEN{' '}
												<BsFillPatchCheckFill
													style={{
														marginBottom: '20px',
														marginLeft: '-10px',
														height: '20px',
														width: '20px',
														color: '#0F3CB2'
													}}
												/>
											</h1>
											<p className="text-center socials" style={{ fontSize: '20px' }}>
												Review your information
											</p>
											<h4>Step 4</h4>
										</Col>
										<Col md={12} xs={24}>
											<img
												src={lunchpadImg}
												alt="launchpad image"
												style={{ width: '150px', height: '150px' }}
											/>
										</Col>
									</Row>
								</div>

								<div className="lead3" style={{ marginTop: '100px' }}>
									<form onSubmit={this.onSubmit} style={{ marginTop: '30px' }}>
										<div>
											<div>
												<table className="launch4">
													<tbody>
														<tr>
															<td width="50%" className="has-text-left">
																Token name
															</td>
															<td className="has-text-info has-text-right">
																{tokenName}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Token symbol
															</td>
															<td className="has-text-info has-text-right">
																{tokenSymbol}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Token decimals
															</td>
															<td className="has-text-info has-text-right">
																{tokenDecimals}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Total Supply
															</td>
															<td className="has-text-info has-text-right">
																{(tokenSupply / 10 ** tokenDecimals).toFixed(0)}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Presale rate
															</td>
															<td className="has-text-info has-text-right">
																{presaleRate}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Soft Cap
															</td>
															<td className="has-text-info has-text-right">
																{softCap} {unit}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Hard Cap
															</td>
															<td className="has-text-info has-text-right">
																{hardCap} {unit}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Minimum Buy
															</td>
															<td className="has-text-info has-text-right">
																{minBuy} {unit}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Maximum Buy
															</td>
															<td className="has-text-info has-text-right">
																{maxBuy} {unit}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Start Time
															</td>
															<td className="has-text-info has-text-right">
																<Moment format="YYYY-MM-DD HH:mm">{from}</Moment>
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																End Time
															</td>
															<td className="has-text-info has-text-right">
																<Moment format="YYYY-MM-DD HH:mm">{to}</Moment>
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Whitelist
															</td>
															<td className="has-text-info has-text-right">
																{whiteListState === true ? 'Yes' : 'No'}
															</td>
														</tr>

														<tr>
															<td width="50%" className="has-text-left">
																Auto Add Liquidity (%)
															</td>
															<td className="has-text-info has-text-right">
																{pancakeswapLiquidity}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Liquidity (%)
															</td>
															<td className="has-text-info has-text-right">
																{pancakeswapLiquidity}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Swap Listing Rate
															</td>
															<td className="has-text-info has-text-right">
																{pancakeswapRate}
															</td>
														</tr>

														<tr>
															<td width="50%" className="has-text-left">
																Presale Token Lockup (minutes)
															</td>
															<td className="has-text-info has-text-right">
																{pancakeswapLockup}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Tokens for Presale
															</td>
															<td className="has-text-info has-text-right">
																{hardCap * presaleRate}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Tokens for Liquidity
															</td>
															<td className="has-text-info has-text-right">
																{hardCap * presaleRate * pancakeswapLiquidity / 100}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Website
															</td>
															<td className="has-text-info has-text-right">{website}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Banner URL
															</td>
															<td className="has-text-info has-text-right">{bannel}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Twitter
															</td>
															<td className="has-text-info has-text-right">{twitter}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Github
															</td>
															<td className="has-text-info has-text-right">{github}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Telegram
															</td>
															<td className="has-text-info has-text-right">{telegram}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Facebook
															</td>
															<td className="has-text-info has-text-right">{facebook}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Instagram
															</td>
															<td className="has-text-info has-text-right">
																{instagram}
															</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Discord
															</td>
															<td className="has-text-info has-text-right">{discord}</td>
														</tr>
														<tr>
															<td width="50%" className="has-text-left">
																Reddit
															</td>
															<td className="has-text-info has-text-right">{reddit}</td>
														</tr>
													</tbody>
												</table>
												<div
													className="has-text-left"
													style={{ fontSize: '20px', margin: '20px' }}
												>
													Description
												</div>
												<div>
													<textarea
														disabled
														value={description}
														type="text"
														id="description"
														name="description"
													/>
												</div>
											</div>
										</div>

										<ButtonToolbar style={{ marginBottom: '50px', marginTop: '100px' }}>
											<Link to="/LaunchPad3">
												<button className="launch-button">
													<strong>BACK</strong>
												</button>
											</Link>

											<button type="submit" className="launch-button">
												<strong>NEXT</strong>
											</button>
										</ButtonToolbar>
									</form>
								</div>
							</div>
						</div>
					</div>
				</main>
			</section>
		);
	}
}

LaunchPad4.propTypes = {
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
})(LaunchPad4);
