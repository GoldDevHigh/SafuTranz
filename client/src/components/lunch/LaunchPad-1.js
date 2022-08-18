import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getNetFeeValueLaunch } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import axios from 'axios';
import { Col, Row } from 'rsuite';
import lunchpadImg from '../assets/img/back/Spaceship_08-removebg-preview@2x.png';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';

var netValue = '';

class LaunchPad1 extends Component {
	constructor(props) {
		super(props);

		this.onSuccess = this.onSuccess.bind(this);

		this.state = {
			abi: '',
			tokenName: '',
			tokenSymbol: '',
			tokenDecimals: '',
			tokenSupply: '',
			tokenAddress: '',
			tokenAddressError: '',
			tokenAddressValid: false,
			formValid: false,
			tokenChainValid: false,
			tokenAddressOrig: []
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.getNetFeeValueLaunch();
		axios
			.get(`/api/getTokenContractAbi`)
			.then(async (res) => {
				const abi = res.data;
				this.state.abi = abi;
			})
			.catch((err) => console.log(err));

		axios
			.get(`/api/getAll`)
			.then(async (res) => {
				this.state.tokenAddressOrig = res.data;
			})
			.catch((err) => console.log(err));
	}

	handleInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	}

	validateField(fieldName, value) {
		let tokenAddressError = this.state.tokenAddressError;
		let tokenAddressValid = this.state.tokenAddressValid;

		tokenAddressValid = value.match(/^(0x[0-9a-f]{40})(,0x[0-9a-f]{40})*$/i);

		tokenAddressError = tokenAddressValid ? '' : ' is invalid';

		if (tokenAddressError == '') {
			tokenAddressValid = true;
		} else {
			tokenAddressValid = false;
		}

		this.setState(
			{
				tokenAddressError: tokenAddressError,
				tokenAddressValid: tokenAddressValid,
				formValid: false
			},
			this.validateForm
		);
	}

	validateForm() {
		if (this.state.tokenAddressValid) {
			const abi = this.state.abi;
			const web3 = new Web3(Web3.givenProvider);

			if (web3.utils.isAddress(this.state.tokenAddress)) {
				web3.eth
					.getCode(this.state.tokenAddress)
					.then((res) => {
						if (res != '0x') {
							const test = this.state.tokenAddressOrig.find(
								(element) => Number(element.tokenAddress) === Number(this.state.tokenAddress)
							);

							console.log(test);
							if (test !== undefined) {
								if (test.launchpadAddress)
									this.setState({
										tokenAddressError: 'This token already has presale',
										formValid: false
									});
							}

							if (this.state.tokenAddressValid == true) {
								const tokenContract = new web3.eth.Contract(abi, this.state.tokenAddress);
								tokenContract.methods.name().call().then((res) => {
									this.setState({ tokenName: res });
									window.localStorage.setItem('tokenName', res);
								});
								tokenContract.methods.symbol().call().then((res) => {
									this.setState({ tokenSymbol: res });
									window.localStorage.setItem('tokenSymbol', res);
								});
								tokenContract.methods.decimals().call().then((res) => {
									this.setState({ tokenDecimals: res });
									window.localStorage.setItem('tokenDecimals', res);
								});
								tokenContract.methods.totalSupply().call().then((res) => {
									const tot = res;
									this.setState({ tokenSupply: tot });
									window.localStorage.setItem('tokenSupply', tot);
								});
								this.setState({ tokenChainValid: true });
								if (this.state.tokenAddressError != 'This token already has presale') {
									this.setState({ formValid: this.state.tokenAddressValid });
								}
								window.localStorage.setItem('tokenAddress', this.state.tokenAddress);
							}
						} else {
							this.setState({
								formValid: false,
								tokenAddressError: 'this address is not a token',
								tokenAddressValid: false
							});
						}
					})
					.catch((err) => console.log(err));
			} else {
				this.setState({ formValid: false });
			}
		} else {
			this.setState({ formValid: false });
		}
	}

	onSuccess() {
		const data = {
			userAddress: localStorage.getItem('userAddress'),
			tokenAddress: this.state.tokenAddress,
			tokenName: this.state.tokenName,
			tokenSymbol: this.state.tokenSymbol,
			tokenDecimal: this.state.tokenDecimals,
			tokenSupply: this.state.tokenSupply,
			chainID: localStorage.getItem('chainId')
		};
		axios
			.post(`/api/addTokenAddress`, data)
			.then(() => {
				console.log('success');
			})
			.catch((err) => console.log(err));
	}

	render() {
		if (this.props.auth.netFeeLaunch !== undefined) {
			const { netFeeLaunch } = this.props.auth;

			if (netFeeLaunch !== undefined) {
				switch (window.localStorage.getItem('chainId')) {
					case '1':
						netValue = `${netFeeLaunch.data.ETH} ETH`;
						break;
					case '3':
						netValue = `${netFeeLaunch.data.Ropsten} ETH`;
						break;
					case '56':
						netValue = `${netFeeLaunch.data.BSC} BNB`;
						break;
					case '97':
						netValue = `${netFeeLaunch.data.BSCTest} tBNB`;
						break;
					case '43114':
						netValue = `${netFeeLaunch.data.Avalanche} AVAX`;
						break;
					case '43113':
						netValue = `${netFeeLaunch.data.AvalancheTest} TAVAX`;
						break;
					case '25':
						netValue = `${netFeeLaunch.data.Cronos} CRO`;
						break;
					case '941':
						netValue = `${netFeeLaunch.data.PulseTest} tPLS`;
						break;
					case '137':
						netValue = `${netFeeLaunch.data.Polygon} MATIC`;
						break;
					default:
						netValue = '0.7 BNB';
						break;
				}
			}
		}
		return (
			<div>
				<section className="ant-layout black-background">
					<main className="ant-layout-content MainLayout_content__2mZF9">
						<div className="py-6 container">
							<div style={{ height: '16px' }} />

							<div className="bg-dark  style-border ant-card ant-card-bordered">
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
													Get Started in 4 easy steps
												</p>
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
									<form style={{ marginTop: '180px' }}>
										<div className="field">
											<div className="row is-flex is-align-items-center mb-2 flex-wrap">
												<div className="is-flex-grow-1 mr-4" style={{ marginLeft: '10%' }}>
													<div className="token-buffey">
														<div>
															<div style={{ fontSize: '23px', marginBottom: '20px' }}>
																Enter The Token Address And Verify
															</div>
														</div>
													</div>
													<div
														className="has-text-left"
														style={{ fontSize: '18px', marginBottom: '20px' }}
													>
														Input Your Token Address*
													</div>
												</div>
											</div>
											<div className="form-group">
												<input
													name="tokenAddress"
													value={this.state.tokenAddress}
													onChange={(event) => this.handleInput(event)}
													className={classnames('form-control form-control-lg', {
														'is-invalid': this.state.tokenAddressError
													})}
													type="text"
													placeholder="Ex: 0x..."
													id="tokenAddress"
													autoComplete="off"
												/>

												<div className="invalid-feedback">{this.state.tokenAddressError}</div>
											</div>
										</div>

										<Link to={this.state.formValid ? '/LaunchPad2' : '#'}>
											<button
												className="launch-button"
												disabled={!this.state.formValid}
												style={{ marginTop: '180px' }}
												onClick={this.onSuccess}
											>
												<strong>NEXT</strong>
											</button>
										</Link>

										<p
											className="help is-info"
											style={{ fontSize: '18px', marginTop: '40px', marginBottom: '20px' }}
										>
											Create pool fee: {netValue}
										</p>
									</form>
									<div style={{ marginTop: '40px' }}>
										<p style={{ fontSize: '18px' }}>
											{this.state.formValid ? 'Token Name : ' + this.state.tokenName : ''}
										</p>
										<p style={{ fontSize: '18px' }}>
											{this.state.formValid ? 'Token Symbol : ' + this.state.tokenSymbol : ''}
										</p>
										<p style={{ fontSize: '18px' }}>
											{this.state.formValid ? 'Token Decimals : ' + this.state.tokenDecimals : ''}
										</p>
										<p className="addresses" style={{ fontSize: '18px', marginBottom: '70px' }}>
											{this.state.formValid ? (
												'Token Supply : ' +
												this.state.tokenSupply / 10 ** this.state.tokenDecimals
											) : (
												''
											)}
										</p>
									</div>
									<div className="launchbottom-text">
										<RiErrorWarningFill
											style={{
												height: '30px',
												width: '30px',
												color: '#FF0000',
												marginRight: '100px',
												marginBottom: '-8px'
											}}
										/>
										<span className="text-center">
											Make sure your token has 'exclude transfer fee' function if it has transfer
											fees
										</span>
									</div>
								</div>
							</div>
						</div>
					</main>
				</section>
			</div>
		);
	}
}

LaunchPad1.propTypes = {
	getNetFeeValueLaunch: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

export default connect(mapStateToProps, { getNetFeeValueLaunch })(LaunchPad1);
