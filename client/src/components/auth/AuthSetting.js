import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllData } from '../../actions/padActions';
import {
	registerUser,
	setEscrowAddress,
	getEscrowAddress,
	setRaisedFee,
	setNetFeeValueToken,
	getNetFeeValueToken,
	setNetFeeValueLaunch,
	getNetFeeValueLaunch
} from '../../actions/authActions';
import { Button, Col, Row, ButtonGroup, Toggle, InputGroup, List } from 'rsuite';
import SearchInput, { createFilter } from 'react-search-input';
import { withRouter } from 'react-router-dom';
import TableScrollbar from 'react-table-scrollbar';

import Spinner from '../common/Spinner';
import avax from '../assets/img/avax.png';
import bnb from '../assets/img/bnb.png';
import eth from '../assets/img/eth.png';
import cro from '../assets/img/cronos.png';
import pls from '../assets/img/PLS.png';
import matic from '../assets/img/matic.png';
import check from '../assets/img/check.png';
import uncheck from '../assets/img/uncheck.png';
import axios from 'axios';

import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';
import TextInput2 from '../common/TextInput2';

const KEYS_TO_FILTERS = [ 'title', 'symbol' ];
var items = [];

var editState = [],
	deleteState = [];

export class AuthSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			kycState: false,
			adtState: false,
			safuState: false,
			prmState: false,
			pvtState: false,
			editBtnState: false,
			deleteBtnState: false,
			advertise: false,
			nPassword: '',
			password: '',
			password2: '',
			feeValue: 0,
			netName: '',
			netTokenSelect: true,
			setRaisedValue: 0,
			errors: {}
		};
		this.handleChange = this.handleChange.bind(this);
		this.onEditState = this.onEditState.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onEditStateCancel = this.onEditStateCancel.bind(this);
		this.onEditStateSave = this.onEditStateSave.bind(this);
		this.onDeleteBtn = this.onDeleteBtn.bind(this);
		this.onDeleteState = this.onDeleteState.bind(this);
		this.onDeleteCancel = this.onDeleteCancel.bind(this);
		this.onPasswordInput = this.onPasswordInput.bind(this);
		this.onEscrowInput = this.onEscrowInput.bind(this);
		this.onChangeCheck = this.onChangeCheck.bind(this);
		this.onNetFeeInput = this.onNetFeeInput.bind(this);
		this.onToggleChange = this.onToggleChange.bind(this);
		this.onSetRaisedFee = this.onSetRaisedFee.bind(this);
	}

	componentDidMount() {
		this.props.getAllData();
		this.props.getEscrowAddress();
		window.scrollTo(0, 0);
		// axios.get('/api/')
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleChange = (event) => {
		this.setState({
			searchTerm: event
		});
	};

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onChangeCheck(e) {
		this.setState({ [e.target.name]: e.target.checked });
	}

	onEditState(e) {
		editState[e.target.value] = true;
		this.setState({
			kycState: false,
			adtState: false,
			safuState: false,
			prmState: false,
			pvtState: false,
			advertise: false,
			editBtnState: true
		});
	}

	onEditStateSave(e) {
		const id = e.target.value;
		const setData = {
			presaleAddress: e.target.name,
			kycState: this.state.kycState,
			auditState: this.state.adtState,
			safuState: this.state.safuState,
			premium: this.state.prmState,
			advertise: this.state.advertise,
			privateSale: this.state.pvtState
		};

		axios
			.post(`/api/setAuthSetting`, setData)
			.then((res) => {
				editState[id] = false;
				this.setState({
					editBtnState: false
				});
				this.props.getAllData();
			})
			.catch((res) => console.log(res));
	}

	onEditStateCancel(e) {
		editState[e.target.value] = false;
		this.setState({
			editBtnState: false
		});
	}

	onDeleteState(e) {
		deleteState[e.target.value] = true;
		this.setState({
			deleteBtnState: true
		});
	}

	onDeleteBtn(e) {
		var id = e.target.value;
		axios
			.delete(`/api/presaleDelete/${e.target.name}`)
			.then((res) => {
				this.props.getAllData();
				deleteState[id] = false;
				this.setState({
					deleteBtnState: false
				});
			})
			.catch((res) => console.log(res));
	}

	onDeleteCancel(e) {
		deleteState[e.target.value] = false;
		this.setState({
			deleteBtnState: false
		});
	}

	onPasswordInput() {
		const { nPassword, password, password2 } = this.state;
		const send = {
			nPassword,
			password,
			password2
		};
		this.props.registerUser(send);
	}

	onEscrowInput() {
		const { escrowAddress } = this.state;
		const send = {
			escrowAddress
		};
		this.props.setEscrowAddress(send);
	}

	onNetFeeInput() {
		const { netName, feeValue, netTokenSelect } = this.state;

		const send = { [netName]: feeValue };

		console.log(send);
		if (netTokenSelect) this.props.setNetFeeValueToken(send);
		else this.props.setNetFeeValueLaunch(send);
	}

	onToggleChange(e) {
		this.setState({ netTokenSelect: e });
	}

	onSetRaisedFee() {
		const send = {
			raisedFee: this.state.setRaisedValue * 10
		};
		this.props.setRaisedFee(send);
	}

	render() {
		const { pads, loading } = this.props.pad;
		const { errors } = this.state;

		let postContent;
		items = pads;
		if (pads !== null || !loading) {
			const filteredItems = items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
			postContent = filteredItems.map((item, i) => {
				var neticon = '';
				switch (item.chainID) {
					case 56:
						neticon = bnb;
						break;
					case 97:
						neticon = bnb;
						break;
					case 1:
						neticon = eth;
						break;
					case 3:
						neticon = eth;
						break;
					case 43114:
						neticon = avax;
						break;
					case 25:
						neticon = cro;
						break;
					case 941:
						neticon = pls;
						break;
					case 137:
						neticon = matic;
						break;
					default:
						neticon = bnb;
				}

				return (
					<tr key={i}>
						<td>{i + 1}</td>
						<td>{item.title}</td>
						<td>
							<a href={window.location.origin + '/PadInfo/' + item.presaleAddress}>
								{item.presaleAddress}
							</a>
						</td>
						<td>
							<img src={neticon} style={{ width: '25px' }} alt="logo" />
						</td>
						<td>{item.chainID}</td>
						<td>
							{editState[i] ? (
								<input
									type="checkbox"
									name="kycState"
									value={this.state.kycState}
									onChange={this.onChangeCheck}
									className="auth-checkbox"
								/>
							) : item.kycState ? (
								<img src={check} style={{ width: '25px' }} alt="check" />
							) : (
								<img src={uncheck} style={{ width: '25px' }} alt="uncheck" />
							)}
						</td>
						<td>
							{editState[i] ? (
								<input
									type="checkbox"
									name="adtState"
									value={this.state.adtState}
									onChange={this.onChangeCheck}
									className="auth-checkbox"
								/>
							) : item.auditState ? (
								<img src={check} style={{ width: '25px' }} alt="check" />
							) : (
								<img src={uncheck} style={{ width: '25px' }} alt="uncheck" />
							)}
						</td>
						<td>
							{editState[i] ? (
								<input
									type="checkbox"
									name="safuState"
									value={this.state.safuState}
									onChange={this.onChangeCheck}
									className="auth-checkbox"
								/>
							) : item.safuState ? (
								<img src={check} style={{ width: '25px' }} alt="check" />
							) : (
								<img src={uncheck} style={{ width: '25px' }} alt="uncheck" />
							)}
						</td>
						<td>
							{editState[i] ? (
								<input
									type="checkbox"
									name="prmState"
									value={this.state.prmState}
									onChange={this.onChangeCheck}
									className="auth-checkbox"
								/>
							) : item.premium ? (
								<img src={check} style={{ width: '25px' }} alt="check" />
							) : (
								<img src={uncheck} style={{ width: '25px' }} alt="uncheck" />
							)}
						</td>
						<td>
							{editState[i] ? (
								<input
									type="checkbox"
									name="pvtState"
									value={this.state.pvtState}
									onChange={this.onChangeCheck}
									className="auth-checkbox"
								/>
							) : item.privateSale ? (
								<img src={check} style={{ width: '25px' }} alt="check" />
							) : (
								<img src={uncheck} style={{ width: '25px' }} alt="uncheck" />
							)}
						</td>
						<td>
							{editState[i] ? (
								<input
									type="checkbox"
									name="advertise"
									value={this.state.advertise}
									onChange={this.onChangeCheck}
									className="auth-checkbox"
								/>
							) : item.advertise ? (
								<img src={check} style={{ width: '25px' }} alt="check" />
							) : (
								<img src={uncheck} style={{ width: '25px' }} alt="uncheck" />
							)}
						</td>
						<td style={{ minWidth: '150px' }}>
							{editState[i] ? (
								<ButtonGroup>
									<Button
										color="cyan"
										appearance="ghost"
										name={item.presaleAddress}
										value={i}
										onClick={this.onEditStateSave}
									>
										Save
									</Button>
									<Button color="cyan" appearance="ghost" value={i} onClick={this.onEditStateCancel}>
										Cancel
									</Button>
								</ButtonGroup>
							) : (
								<Button
									disabled={this.state.editBtnState}
									color="cyan"
									appearance="ghost"
									value={i}
									onClick={this.onEditState}
								>
									Edit
								</Button>
							)}
						</td>
						<td style={{ minWidth: '150px' }}>
							{deleteState[i] ? (
								<ButtonGroup>
									<Button
										color="red"
										appearance="ghost"
										name={item.presaleAddress}
										value={i}
										onClick={this.onDeleteBtn}
									>
										Yes
									</Button>
									<Button color="red" appearance="ghost" value={i} onClick={this.onDeleteCancel}>
										No
									</Button>
								</ButtonGroup>
							) : (
								<Button
									disabled={this.state.deleteBtnState}
									value={i}
									color="red"
									appearance="ghost"
									onClick={this.onDeleteState}
								>
									Delete
								</Button>
							)}
						</td>
					</tr>
				);
			});
		} else {
			postContent = <Spinner />;
		}
		// select options for status
		const options = [
			{ label: '* Select Net', value: 0 },
			{ label: 'BSC', value: 'BSC' },
			{ label: 'BSCTest', value: 'BSCTest' },
			{ label: 'ETH', value: 'ETH' },
			{ label: 'Ropsten', value: 'Ropsten' },
			{ label: 'Cronos', value: 'Cronos' },
			{ label: 'PulseTest', value: 'PulseTest' },
			{ label: 'Avalanche', value: 'Avalanche' },
			{ label: 'Polygon', value: 'Polygon' }
		];
		return (
			<section className="pt-4">
				<div className="pad-list-main">
					<div className="bg-dark p-4 p-lg-5  white-font rounded-3 text-center">
						<div className="m-4 m-lg-5 ">
							<h1 className="socials fw-bold" style={{ fontSize: '45px', marginBottom: '60px' }}>
								Admin Panel
							</h1>
							<div style={{ marginTop: '70px' }}>
								<Row>
									<div
										className=" bg-dark style-border ant-card ant-card-bordered"
										style={{ marginBottom: '70px' }}
									>
										<Col md={12} sm={24}>
											<div className="lead ant-card-body card-dashboard">
												<h1
													className="dash-title text-center socials"
													style={{ fontSize: '30px', color: '#ffaa00' }}
												>
													Set Password
												</h1>
												<div className="field">
													<label className="launch-label" htmlFor="presaleRate">
														Current Password
													</label>
													<TextInput
														type="password"
														error={errors.nPassword}
														placeholder="Password"
														name="nPassword"
														value={this.state.nPassword}
														onChange={this.onChange}
													/>
												</div>
												<div className="field">
													<label className="launch-label" htmlFor="presaleRate">
														Password
													</label>
													<div className="control">
														<TextInput
															type="password"
															error={errors.password}
															placeholder="Password"
															name="password"
															value={this.state.password}
															onChange={this.onChange}
														/>
													</div>
												</div>
												<div className="field">
													<label className="launch-label" htmlFor="presaleRate">
														Confirm Password
													</label>
													<div className="control">
														<TextInput
															type="password"
															error={errors.password2}
															placeholder="Password"
															name="password2"
															value={this.state.password2}
															onChange={this.onChange}
														/>
													</div>
												</div>
												<div
													className="has-text-centered"
													style={{ marginTop: '60px', marginBottom: '55px' }}
												>
													<Button
														className="db-button-color"
														style={{ width: '80%' }}
														onClick={this.onPasswordInput}
													>
														<strong>Change Password</strong>
													</Button>
												</div>
											</div>
										</Col>
										<Col md={12} sm={24}>
											<div
												className="lead ant-card-body card-dashboard"
												style={{ paddingTop: '30px' }}
											>
												<h1
													className="dash-title text-center socials"
													style={{ fontSize: '30px', color: '#ffaa00' }}
												>
													Fee Receiver
												</h1>
												<div className="field" style={{ marginTop: '30px' }}>
													<label className="launch-label" htmlFor="presaleRate">
														Fee Address
													</label>
													<div className="control">
														<TextInput
															type="text"
															error={errors.escrowAddress}
															placeholder="Address"
															name="escrowAddress"
															value={this.state.escrowAddress}
															onChange={this.onChange}
														/>
													</div>
												</div>

												<div
													className="has-text-centered"
													style={{ marginTop: '10px', marginBottom: '30px' }}
												>
													<Button
														className="db-button-color"
														style={{ width: '80%' }}
														onClick={this.onEscrowInput}
													>
														<strong>Set Fee Address</strong>
													</Button>
												</div>

												<div className="field" style={{ marginTop: '20px' }}>
													<label className="launch-label" htmlFor="presaleRate">
														Fee Value
													</label>
													<div className="control input-group ">
														<Toggle
															checked={this.state.netTokenSelect}
															size="lg"
															checkedChildren="Token"
															unCheckedChildren="Launch"
															onChange={this.onToggleChange}
														/>
														<SelectInput
															name="netName"
															value={this.state.netName}
															onChange={this.onChange}
															error={errors.netName}
															options={options}
														/>
														<div style={{ marginTop: '10px' }} />
														<TextInput2
															type="Number"
															error={errors.feeValue}
															placeholder="Value"
															name="feeValue"
															value={this.state.feeValue}
															onChange={this.onChange}
														/>
													</div>
												</div>

												<div
													className="has-text-centered input-group"
													style={{ marginTop: '10px', marginBottom: '25px' }}
												>
													<Button
														className="db-button-color"
														style={{ width: '80%' }}
														onClick={this.onNetFeeInput}
													>
														<strong>Set Fee Value</strong>
													</Button>
												</div>

												<div className="field" style={{ marginTop: '20px' }}>
													<label className="launch-label" htmlFor="presaleRate">
														Raised Token Fee
													</label>
													<div className="control">
														<InputGroup>
															<input
																type="number"
																error={errors.setRaisedValue}
																placeholder="Value"
																name="setRaisedValue"
																value={this.state.setRaisedValue}
																onChange={this.onChange}
																style={{ borderRadius: '5px' }}
																id="select-input"
															/>
															<Button
																className="db-button-color"
																style={{ height: '40px', borderRadius: '5px' }}
																onClick={this.onSetRaisedFee}
															>
																<strong>Set Raised</strong>
															</Button>
														</InputGroup>
													</div>
												</div>
											</div>
										</Col>
									</div>
								</Row>
							</div>
							<div className="input-group mb-3" style={{ marginTop: '50px', marginBottom: '40px' }}>
								<SearchInput
									className="search-input "
									placeholder="Enter token name or token symbol."
									value={this.state.searchTerm}
									onChange={this.handleChange}
								/>
							</div>
							<div className="auth-table">
								<TableScrollbar rows={15}>
									<table>
										<thead className="auth-table-header">
											<tr>
												<th> No </th>
												<th> Token Name </th>
												<th> Presale Address </th>
												<th> Net Icon </th>
												<th> Net ID </th>
												<th> KYC </th>
												<th> ADT </th>
												<th> SAFU </th>
												<th> PRM </th>
												<th> PVT </th>
												<th> ADVERTISE </th>
												<th> Save </th>
												<th> Delete </th>
											</tr>
										</thead>
										<tbody className="auth-table-body">{postContent}</tbody>
									</table>
								</TableScrollbar>
							</div>
							<h3 style={{ marginTop: '100px' }}>Subscriber List</h3>
							<List autoScroll className="info-list">
								{/* {lister} */}
							</List>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

AuthSetting.propTypes = {
	getAllData: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	setEscrowAddress: PropTypes.func.isRequired,
	getEscrowAddress: PropTypes.func.isRequired,
	setNetFeeValueToken: PropTypes.func.isRequired,
	setNetFeeValueLaunch: PropTypes.func.isRequired,
	getNetFeeValueToken: PropTypes.func.isRequired,
	getNetFeeValueLaunch: PropTypes.func.isRequired,
	setRaisedFee: PropTypes.func.isRequired,
	pad: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		pad: state.pad,
		auth: state.auth,
		errors: state.errors
	};
};

export default connect(mapStateToProps, {
	setRaisedFee,
	getAllData,
	registerUser,
	setEscrowAddress,
	getEscrowAddress,
	setNetFeeValueToken,
	getNetFeeValueToken,
	setNetFeeValueLaunch,
	getNetFeeValueLaunch
})(withRouter(AuthSetting));
