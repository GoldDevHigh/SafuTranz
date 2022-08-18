import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import isEmpty from '../../validation/isEmpty';
import { IconButton, ButtonToolbar, Checkbox, Col, Row } from 'rsuite';
import PauseIcon from '@rsuite/icons/PagePrevious';
import PlayIcon from '@rsuite/icons/PageNext';
import { setWhiteListData, setReduxValue } from '../../actions/padActions';
import PropTypes from 'prop-types';
import lunchpadImg from '../assets/img/back/Spaceship_08-removebg-preview@2x.png';
import { BsFillPatchCheckFill } from 'react-icons/bs';

var valNetState = '';
class LaunchPad2 extends Component {
	constructor(props) {
		super(props);

		this.changeWhitelise = this.changeWhitelise.bind(this);
		this.nextPage = this.nextPage.bind(this);

		this.state = {
			presaleRate: undefined,
			softCap: undefined,
			hardCap: undefined,
			minBuy: undefined,
			maxBuy: undefined,
			from: '',
			to: '',
			formErrors: {
				presaleRate: '',
				softCap: '',
				hardCap: '',
				minBuy: '',
				maxBuy: '',
				from: '',
				to: '',
				pancakeswapLiquidity: '',
				pancakeswapRate: '',
				pancakeswapLockup: ''
			},
			presaleRateValid: false,
			softCapValid: false,
			hardCapValid: false,
			minBuyValid: false,
			maxBuyValid: false,
			fromValid: false,
			pancakeswapLiquidity: undefined,
			pancakeswapRate: undefined,
			pancakeswapLockup: undefined,
			toValid: false,
			formValid: false,
			isChecked: false
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
		if (e.target.name == 'to' || e.target.name == 'from') {
			const dateX = new Date(e.target.value);
			window.localStorage.setItem(name + 'TS', dateX.getTime() / 1000);
		}
		// window.localStorage.setItem(name, value);
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;

		let presaleRateValid = this.state.presaleRateValid;
		let softCapValid = this.state.softCapValid;
		let hardCapValid = this.state.hardCapValid;
		let minBuyValid = this.state.minBuyValid;
		let maxBuyValid = this.state.maxBuyValid;
		let fromValid = this.state.fromValid;
		let toValid = this.state.toValid;
		let pancakeswapLiquidity = this.state.pancakeswapLiquidity;
		let pancakeswapRate = this.state.pancakeswapRate;
		let pancakeswapLockup = this.state.pancakeswapLockup;

		switch (fieldName) {
			case 'presaleRate':
				presaleRateValid = value > 0;
				fieldValidationErrors.presaleRate = presaleRateValid ? '' : ' is invalid';
				break;
			case 'softCap':
				softCapValid =
					Number(value) >= Number(this.state.hardCap) * 0.4 && Number(value) < Number(this.state.hardCap);
				fieldValidationErrors.softCap = softCapValid ? '' : ' is invalid';
				break;
			case 'hardCap':
				hardCapValid = value > 0;
				fieldValidationErrors.hardCap = hardCapValid ? '' : ' is invalid';
				break;
			case 'minBuy':
				minBuyValid = value > 0;
				fieldValidationErrors.minBuy = minBuyValid ? '' : ' is invalid';
				break;
			case 'maxBuy':
				maxBuyValid = value > 0;
				fieldValidationErrors.maxBuy = maxBuyValid ? '' : ' is invalid';
				break;
			case 'from':
				fromValid = isEmpty(value) ? '' : 'have value';
				fieldValidationErrors.from = fromValid ? '' : 'must have start time.';
				break;
			case 'to':
				toValid = isEmpty(value) ? '' : 'have value';
				fieldValidationErrors.to = toValid ? '' : 'must have end time.';
				fieldValidationErrors.to = this.state.to > this.state.from ? '' : 'end time must be after start time.';
				break;
			case 'pancakeswapLiquidity':
				pancakeswapLiquidity = Number(value) >= 40;
				fieldValidationErrors.pancakeswapLiquidity = pancakeswapLiquidity ? '' : ' is invalid';
				break;
			case 'pancakeswapRate':
				pancakeswapRate = value > 0;
				fieldValidationErrors.pancakeswapRate = pancakeswapRate ? '' : ' is invalid';
				break;
			case 'pancakeswapLockup':
				pancakeswapLockup = value > 0;
				fieldValidationErrors.pancakeswapLockup = pancakeswapLockup ? '' : ' is invalid';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				presaleRateValid: presaleRateValid,
				softCapValid: softCapValid,
				hardCapValid: hardCapValid,
				minBuyValid: minBuyValid,
				maxBuyValid: maxBuyValid,
				fromValid: fromValid,
				toValid: toValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid:
				this.state.presaleRateValid &&
				this.state.softCapValid &&
				this.state.hardCapValid &&
				this.state.minBuyValid &&
				this.state.maxBuyValid
		});
	}

	changeWhitelise() {
		this.setState({
			isChecked: !this.state.isChecked
		});

		const data = {
			whiteListState: this.state.isChecked,
			tokenAddress: window.localStorage.getItem('tokenAddress')
		};
		this.props.setWhiteListData(data);
	}

	nextPage() {
		const data = {
			presaleRate: this.state.presaleRate,
			softCap: this.state.softCap,
			hardCap: this.state.hardCap,
			minBuy: this.state.minBuy,
			maxBuy: this.state.maxBuy,
			from: this.state.from,
			to: this.state.to,
			pancakeswapLiquidity: this.state.pancakeswapLiquidity,
			pancakeswapRate: this.state.pancakeswapRate,
			pancakeswapLockup: this.state.pancakeswapLockup,
			whiteListState: this.state.isChecked
		};

		this.props.setReduxValue(data);
	}

	render() {
		switch (window.localStorage.getItem('chainId')) {
			case '1':
				valNetState = 'ETH';
				break;
			case '3':
				valNetState = 'ETH';
				break;
			case '56':
				valNetState = 'BNB';
				break;
			case '97':
				valNetState = 'tBNB';
				break;
			case '43114':
				valNetState = 'AVAX';
				break;
			case '43113':
				valNetState = 'AVAX';
				break;
			case '941':
				valNetState = 'tPLS';
				break;
			case '25':
				valNetState = 'CRO';
				break;
			case '137':
				valNetState = 'MATIC';
				break;
			default:
				valNetState = 'BNB';
				break;
		}

		return (
			<section className="ant-layout  black-background">
				<main className="ant-layout-content MainLayout_content__2mZF9">
					<div className="py-6 container">
						<div style={{ height: '16px' }} />
						<div className="bg-dark style-border  ant-card ant-card-bordered">
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
												Ensure you fill all the fields below
											</p>
											<h4>Step 2</h4>
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
								<div className="lead2" style={{ marginTop: '100px' }}>
									<form>
										<Row>
											<Col md={8} xs={24}>
												<div className="field">
													<label className="has-text-left">Presale rate *</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.presaleRate
															})}
															type="number"
															placeholder="100"
															id="tokenAddress"
															name="presaleRate"
															autoComplete="on"
															value={this.state.presaleRate}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.presaleRate}
														</div>

														<p className="help">
															If I spend 1 {valNetState} how many tokens will I receive?
														</p>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label>Whitelist *</label>
													<div className="control">
														<div className="checkbox-input has-text-left">
															<input
																type="checkbox"
																name="checkbox"
																id="checkboxInput"
																defaultChecked={this.state.isChecked}
																onChange={this.changeWhitelise}
															/>
															<span class="checkmark" />
														</div>
														<p className="help">Leave untick if not whitelist</p>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="softCap">Softcap ({valNetState})*</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.softCap
															})}
															type="number"
															placeholder="Ex: 10"
															id="tokenAddress"
															name="softCap"
															autoComplete="on"
															value={this.state.softCap}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.softCap}
														</div>
														<p className="help">Softcap must be &gt;= 40% of Hardcap!</p>
													</div>
												</div>
											</Col>
										</Row>
										<Row style={{ marginTop: '50px' }}>
											<Col xs={24} md={8}>
												<div className="field">
													<label htmlFor="hardCap">HardCap ({valNetState})*</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.hardCap
															})}
															type="number"
															placeholder="Ex: 10"
															id="tokenAddress"
															name="hardCap"
															autoComplete="on"
															value={this.state.hardCap}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.hardCap}
														</div>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="minBuy">Minimum buy ({valNetState})*</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.minBuy
															})}
															type="number"
															placeholder={valNetState}
															id="tokenAddress"
															name="minBuy"
															autoComplete="on"
															value={this.state.minBuy}
															onChange={(event) => this.handleInput(event)}
														/>
													</div>
													<div className="invalid-feedback">
														{this.state.formErrors.minBuy}
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="maxBuy">Maximum buy ({valNetState})*</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.maxBuy
															})}
															type="number"
															placeholder={valNetState}
															id="tokenAddress"
															name="maxBuy"
															autoComplete="on"
															value={this.state.maxBuy}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.maxBuy}
														</div>
													</div>
												</div>
											</Col>
										</Row>
										<Row style={{ marginTop: '50px' }}>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="pancakeswapLiquidity">Liquidity (%)*</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.pancakeswapLiquidity
															})}
															type="number"
															placeholder="Ex:10"
															id="tokenAddress"
															name="pancakeswapLiquidity"
															autoComplete="on"
															value={this.state.pancakeswapLiquidity}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.pancakeswapLiquidity}
														</div>
														<p className="help">
															Liquidity must be equal to or greater than 40%
														</p>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label>Auto Add Liquidity *</label>
													<div className="control">
														<div className="checkbox-input has-text-left">
															<input
																type="checkbox"
																name="checkbox"
																id="checkboxInput"
																defaultChecked={this.state.isChecked}
																onChange={this.changeWhitelise}
																className="has-text-left"
															/>
														</div>
														<p className="help">
															This will automatic create liquidity after presale as been
															finalize
														</p>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="pancakeswapRate">Swap Listing Rate*</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.pancakeswapRate
															})}
															type="number"
															placeholder="Ex:10"
															id="tokenAddress"
															name="pancakeswapRate"
															autoComplete="on"
															value={this.state.pancakeswapRate}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.pancakeswapRate}
														</div>
													</div>
												</div>
											</Col>
										</Row>
										<Row style={{ marginTop: '50px' }}>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="startTime">Start time (Your Local Time)*</label>
													<div>
														<input
															id="launch-month"
															type="datetime-local"
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.from
															})}
															name="from"
															value={this.state.from}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.from}
														</div>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="endTime">End time (Your Local Time)*</label>
													<div>
														<input
															id="launch-month"
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.to
															})}
															name="to"
															type="datetime-local"
															value={this.state.to}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.to}
														</div>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label htmlFor="pancakeswapLockup">
														Presale Token Lockup (minutes)*
													</label>
													<div className="control">
														<input
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.pancakeswapLockup
															})}
															type="number"
															placeholder="Ex:10"
															id="tokenAddress"
															name="pancakeswapLockup"
															autoComplete="on"
															value={this.state.pancakeswapLockup}
															onChange={(event) => this.handleInput(event)}
														/>
														<div className="invalid-feedback">
															{this.state.formErrors.pancakeswapLockup}
														</div>
													</div>
												</div>
											</Col>
										</Row>
										<div
											className="has-text-centered"
											style={{ marginTop: '100px', marginBottom: '50px' }}
										>
											<h4 style={{ marginBottom: '50px' }}>
												Need {this.state.hardCap * this.state.presaleRate}{' '}
												{window.localStorage.getItem('tokenSymbol')} to create launchpad.
											</h4>
											<ButtonToolbar>
												<Link to={this.state.formValid ? '/LaunchPad3' : '#'}>
													<button
														disabled={!this.state.formValid}
														placement="next"
														className="launch-button"
														onClick={this.nextPage}
													>
														<strong>Next</strong>
													</button>
												</Link>
											</ButtonToolbar>
										</div>
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

LaunchPad2.propTypes = {
	tokenAddress: PropTypes.object.isRequired,
	setWhiteListData: PropTypes.func.isRequired,
	setReduxValue: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		tokenAddress: state.verify.tokenAddress
	};
};

export default connect(mapStateToProps, { setWhiteListData, setReduxValue })(LaunchPad2);
