import React, { Component } from 'react';
import Pads from './Pads';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPads } from '../../actions/padActions';
import { setAlaramData, getAlaramData } from '../../actions/alarmActions';
import { FlexboxGrid, Col, Row } from 'rsuite';
import SearchInput, { createFilter } from 'react-search-input';
import Spinner from '../common/Spinner';

const KEYS_TO_FILTERS = [ 'title', 'symbol' ];
var items = [];

class PadList extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			kycState: false,
			adtState: false,
			safuState: false,
			prmState: false,
			pvtState: false,
			whiteListState: false,
			currentState: false,
			searchTerm: ''
		};
	}

	onChange(e) {
		this.setState({ ...this.state, [e.target.name]: e.target.checked });
	}
	componentDidMount() {
		window.scrollTo(0, 0);

		setInterval(() => {
			this.props.getPads();
			this.props.getAlaramData({ userAddress: localStorage.getItem('userAddress') });
			this.setState((prevState) => {
				return {};
			});
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval();
	}

	handleChange = (event) => {
		this.setState({
			searchTerm: event
		});
	};

	render() {
		const { pads, loading } = this.props.pad;
		const { alarmData } = this.props.alarm;
		const alarmValue = alarmData.data;
		var buffer = [];
		let postContent;

		items = pads;
		if (pads !== null || !loading || localStorage.getItem('userAddress') !== null) {
			const filteredItems = items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
			if (
				this.state.kycState ||
				this.state.adtState ||
				this.state.whiteListState ||
				this.state.safuState ||
				this.state.prmState ||
				this.state.pvtState ||
				this.state.currentState
			) {
				filteredItems.map((item) => {
					if (this.state.kycState) {
						if (item.kycState) buffer.push(item);
					} else if (this.state.adtState) {
						if (item.auditState) buffer.push(item);
					} else if (this.state.whiteListState) {
						if (item.whiteListState) buffer.push(item);
					} else if (this.state.safuState) {
						if (item.safuState) buffer.push(item);
					} else if (this.state.prmState) {
						if (item.premium) buffer.push(item);
					} else if (this.state.pvtState) {
						if (item.privateSale) buffer.push(item);
					} else if (this.state.currentState) {
						if (Number(item.user) === Number(window.localStorage.getItem('userAddress'))) buffer.push(item);
					}
				});
				postContent = <Pads pads={buffer} alarm={alarmValue} />;
			} else postContent = <Pads pads={filteredItems} alarm={alarmValue} />;
		} else {
			postContent = <Spinner />;
		}

		return (
			<section className="pt-4">
				<div className="pad-list-main">
					<div className="bg-dark style-border p-4 p-lg-5  white-font rounded-3 text-center">
						<div className="m-4 m-lg-5 ">
							<h1 className="socials fw-bold" style={{ fontSize: '45px', marginBottom: '60px' }}>
								Current Presale
							</h1>

							<p className="fs-4" style={{ fontSize: '20px' }}>
								Presales are usually sold from a separate allocation of seats, which may not be the same
								as the tickets being released to the general public.
							</p>
							<div className="input-group mb-3" style={{ marginTop: '50px', marginBottom: '30px' }}>
								<Col sm={3} xs={8}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="whiteListState"
											value={this.state.whiteListState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">WHT</span>
									</span>
								</Col>
								<Col sm={3} xs={8}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="kycState"
											value={this.state.kycState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">KYC</span>
									</span>
								</Col>
								<Col sm={3} xs={8}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="adtState"
											value={this.state.adtState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">ADT</span>
									</span>
								</Col>

								<Col sm={3} xs={8} style={{ padding: '0px' }}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="safuState"
											value={this.state.safuState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">SAFU</span>
									</span>
								</Col>
								<Col sm={3} xs={8}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="prmState"
											value={this.state.prmState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">PRM</span>
									</span>
								</Col>
								<Col sm={3} xs={8}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="pvtState"
											value={this.state.pvtState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">PVT</span>
									</span>
								</Col>

								<Col sm={6} xs={24}>
									<span className="pad-checkbox">
										<input
											type="checkbox"
											name="currentState"
											value={this.state.currentState}
											onChange={this.onChange}
											className="pad-checkbox-sm"
										/>
										<span class="custom">My Contributions</span>
									</span>
								</Col>
							</div>
							<p className="fs-4" style={{ fontSize: '10px' }}>
								{'-'}
							</p>
							<div className="input-group mb-3" style={{ marginTop: '10px', marginBottom: '40px' }}>
								<SearchInput
									className="search-input"
									placeholder="Enter token name or token symbol."
									value={this.state.searchTerm}
									onChange={this.handleChange}
								/>
							</div>
						</div>
					</div>
				</div>
				<FlexboxGrid justify="space-around">{postContent}</FlexboxGrid>
			</section>
		);
	}
}

PadList.propTypes = {
	getPads: PropTypes.func.isRequired,
	pad: PropTypes.object.isRequired,
	alarm: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	pad: state.pad,
	alarm: state.alarm
});

export default connect(mapStateToProps, { getPads, setAlaramData, getAlaramData })(PadList);
