import React, { Component } from 'react';
import classnames from 'classnames';
import isEmpty from '../../validation/isEmpty';
import axios from 'axios';
import Web3 from 'web3';
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { getEscrowAddress, getNetFeeValueToken } from '../../actions/authActions';
import { connect } from 'react-redux';

var limitData = '';
var createTokenPanel;
var valCreateTokenSTate = false;
var receiverAddress;
var netFeeValue;

class CreateToken extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenAddress: '',
			tokenType: '',
			tokenName: '',
			symbol: '',
			decimals: '',
			totalSupply: '',
			formErrors: {
				tokenType: '',
				tokenName: '',
				symbol: '',
				decimals: '',
				totalSupply: ''
			},
			tokenTypeValid: false,
			nameValid: false,
			symbolValid: false,
			decimalsValid: false,
			totalSupplyValid: false,

			formValid: false
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getEscrowAddress();
		this.props.getNetFeeValueToken();
		window.scrollTo(0, 0);
	}

	onSubmit(e) {
		e.preventDefault();

		valCreateTokenSTate = true;

		const tokenName = this.state.tokenName;
		const symbol = this.state.symbol;
		const decimals = this.state.decimals;
		const totalSupply = this.state.totalSupply;
		if (window.localStorage.getItem('isAuthenticated') === 'true') {
			const userAddress = window.localStorage.getItem('userAddress');
			//
			axios
				.get(`/api/getTokenContractAbi`)
				.then(async (res) => {
					const abi = res.data;
					axios
						.get(`/api/getTokenContractBytecode`)
						.then(async (res) => {
							const bytecode = res.data.object;
							const chainID = window.localStorage.getItem('chainId');

							var tokenFee = 0;

							switch (chainID) {
								case '56':
									tokenFee = Number(netFeeValue.data.BSC);
									break;
								case '97':
									tokenFee = Number(netFeeValue.data.BSCTest);
									break;
								case '1':
									tokenFee = Number(netFeeValue.data.ETH);
									break;
								case '3':
									tokenFee = Number(netFeeValue.data.Ropsten);
									break;
								case '25':
									tokenFee = Number(netFeeValue.data.Cronos);
									break;
								case '941':
									tokenFee = Number(netFeeValue.data.PulseTest);
									break;
								case '43114':
									tokenFee = Number(netFeeValue.data.Avalanche);
									break;
								case '43113':
									tokenFee = Number(netFeeValue.data.AvalancheTest);
									break;
								case '137':
									tokenFee = Number(netFeeValue.data.Polygon);
									break;
								default:
									tokenFee = 0.15;
							}

							const web3 = new Web3(Web3.givenProvider);
							const deploy_contract = new web3.eth.Contract(abi);

							let payload = {
								data: '0x' + bytecode,
								arguments: [
									tokenName,
									symbol,
									decimals,
									(totalSupply * 10 ** decimals).toString(),
									receiverAddress,
									// web3.utils.toWei(String(0.01), 'ether')
									web3.utils.toWei(String(tokenFee), 'ether')
								]
							};

							let parameter = {
								from: userAddress,
								// value: web3.utils.toWei(String(0.01), 'ether')
								value: web3.utils.toWei(String(tokenFee), 'ether')
							};

							deploy_contract
								.deploy(payload)
								.send(parameter, (err, transactionHash) => {
									console.log('Transaction Hash :', transactionHash);
								})
								.on('confirmation', () => {})
								.then((newContractInstance) => {
									// console.log(newContractInstance);
									console.log('Deployed Contract Address : ', newContractInstance.options.address);
									// newContractInstance.methods.totalSupply().call().then(res=>{
									//   console.log(res);
									// })
									this.setState({
										tokenAddress: newContractInstance.options.address
									});
									window.localStorage.setItem('tokenAddress', newContractInstance.options.address);
									window.location.href = `/TokenRes`;
								});
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		} else {
			alert('You must connect a wallet!');
		}
		valCreateTokenSTate = false;
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

		let tokenTypeValid = this.state.tokenTypeValid;
		let tokenNameValid = this.state.tokenNameValid;
		let symbolValid = this.state.symbolValid;
		let decimalsValid = this.state.decimalsValid;
		let totalSupplyValid = this.state.totalSupplyValid;

		switch (fieldName) {
			case 'tokenType':
				tokenTypeValid = isEmpty(value) ? '' : 'have value';
				fieldValidationErrors.tokenType = tokenTypeValid ? '' : ' is invalid';
				break;
			case 'tokenName':
				tokenNameValid = isEmpty(value) ? '' : 'have value';
				fieldValidationErrors.tokenName = tokenNameValid ? '' : ' is invalid';
				break;
			case 'symbol':
				symbolValid = isEmpty(value) ? '' : 'have value';
				fieldValidationErrors.symbol = symbolValid ? '' : ' is invalid';
				break;
			case 'decimals':
				decimalsValid = value > 0;
				fieldValidationErrors.decimals = decimalsValid ? '' : ' is invalid';
				break;
			case 'totalSupply':
				totalSupplyValid = value > 0;
				fieldValidationErrors.totalSupply = totalSupplyValid ? '' : ' is invalid';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				tokenTypeValid: tokenTypeValid,
				tokenNameValid: tokenNameValid,
				symbolValid: symbolValid,
				decimalsValid: decimalsValid,
				totalSupplyValid: totalSupplyValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid:
				this.state.tokenTypeValid &&
				this.state.tokenNameValid &&
				this.state.symbolValid &&
				this.state.decimalsValid &&
				this.state.totalSupplyValid
		});
	}

	render() {
		if (this.props.auth.escrowAddress !== undefined) {
			const { escrowAddress } = this.props.auth.escrowAddress.data;
			const { netFeeToken } = this.props.auth;

			receiverAddress = escrowAddress;

			netFeeValue = netFeeToken;

			if (netFeeValue !== undefined) {
				switch (window.localStorage.getItem('chainId')) {
					case '1':
						limitData = netFeeValue.data.ETH + ' ETH';
						break;
					case '3':
						limitData = netFeeValue.data.Ropsten + ' ETH';
						break;
					case '56':
						limitData = netFeeValue.data.BSC + ' BNB';
						break;
					case '97':
						limitData = netFeeValue.data.BSCTest + ' tBNB';
						break;
					case '43114':
						limitData = netFeeValue.data.Avalanche + ' AVAX';
						break;
					case '43113':
						limitData = netFeeValue.data.AvalancheTest + ' tAVAX';
						break;
					case '25':
						limitData = netFeeValue.data.Cronos + ' CRO';
						break;
					case '941':
						limitData = netFeeValue.data.PulseTest + ' tPLS';
						break;
					case '137':
						limitData = netFeeValue.data.Polygon + ' MATIC';
						break;
					default:
						limitData = '0.3 BNB';
						break;
				}
			}
		}
		if (valCreateTokenSTate) {
			createTokenPanel = <Spinner />;
		} else {
			createTokenPanel = (
				<form onSubmit={this.onSubmit}>
					<p className="has-text-primary is-size-5">(*) is required field.</p>
					<div className="field">
						<label htmlFor="tokenName" id="token-text">
							Name<sup className="has-text-danger">*</sup>
						</label>
						<div className="control">
							<input
								label="Standard"
								value={this.state.tokenName}
								onChange={(event) => this.handleInput(event)}
								className={classnames('form-control form-control-lg', {
									'is-invalid': this.state.formErrors.tokenName
								})}
								type="text"
								id="tokenName"
								name="tokenName"
								placeholder="Ex: Ethereum"
								maxLength="255"
							/>
							<div className="invalid-feedback">{this.state.formErrors.tokenName}</div>
						</div>
					</div>
					<div className="field">
						<label htmlFor="symbol" id="token-text">
							Symbol<sup className="has-text-danger">*</sup>
						</label>
						<div className="control">
							<input
								value={this.state.symbol}
								onChange={(event) => this.handleInput(event)}
								className={classnames('form-control form-control-lg', {
									'is-invalid': this.state.formErrors.symbol
								})}
								type="text"
								id="tokenName"
								name="symbol"
								placeholder="Ex: ETH"
								maxLength="255"
							/>

							<div className="invalid-feedback">{this.state.formErrors.symbol}</div>
						</div>
					</div>
					<div className="field">
						<label htmlFor="decimals" id="token-text">
							Decimals<sup className="has-text-danger">*</sup>
						</label>
						<div className="control">
							<input
								value={this.state.decimals}
								onChange={(event) => this.handleInput(event)}
								className={classnames('form-control form-control-lg', {
									'is-invalid': this.state.formErrors.decimals
								})}
								type="text"
								id="tokenName"
								name="decimals"
								placeholder="Ex: 18"
							/>

							<div className="invalid-feedback">{this.state.formErrors.decimals}</div>
						</div>
					</div>

					<div className="field">
						<label htmlFor="totalSupply" id="token-text">
							Total supply<sup className="has-text-danger">*</sup>
						</label>
						<div className="control">
							<input
								value={this.state.totalSupply}
								onChange={(event) => this.handleInput(event)}
								className={classnames('form-control form-control-lg', {
									'is-invalid': this.state.formErrors.totalSupply
								})}
								type="text"
								id="tokenName"
								name="totalSupply"
								placeholder="Ex: 100000000000"
							/>

							<div className="invalid-feedback">{this.state.formErrors.totalSupply}</div>
						</div>
					</div>
					<div className="has-text-centered mt-6 pt-4 mb-4">
						<button type="submit" className="token-button" onClick={this.onSubmit}>
							<stron>Create token</stron>
						</button>
					</div>
					<p className="token-info">Create token fee: {limitData}</p>
				</form>
			);
		}

		return (
			<div className="py-6 container">
				<div style={{ height: '16px' }} />

				<div className="bg-dark  style-border ant-card ant-card-bordered">
					<div className="ant-card-body" id="createToken">
						<h1 className="socials text-center" style={{ fontSize: '40px' }}>
							Create Token
						</h1>
						<br />
						{createTokenPanel}
					</div>
				</div>
			</div>
		);
	}
}

CreateToken.propTypes = {
	getEscrowAddress: PropTypes.func.isRequired,
	getNetFeeValueToken: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

export default connect(mapStateToProps, { getEscrowAddress, getNetFeeValueToken })(CreateToken);
