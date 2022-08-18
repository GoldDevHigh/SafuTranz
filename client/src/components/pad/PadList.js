import React, { Component } from 'react';
import Pads from './Pads';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPads } from '../../actions/padActions';
import { setAlaramData, getAlaramData } from '../../actions/alarmActions';
import { FlexboxGrid, Col, Row } from 'rsuite';
import SearchInput, { createFilter } from 'react-search-input';
import Spinner from '../common/Spinner';
import launchHeaderImg from '../assets/img/back/lauchpad-img.jfif';
import roketImg from '../assets/img/back/roket.jpg';

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
		if (e.target.value === 'All status') {
			this.setState({
				kycState: false,
				adtState: false,
				safuState: false,
				prmState: false,
				pvtState: false,
				whiteListState: false,
				currentState: false
			});
		} else {
			this.setState({ [e.target.value]: true });
		}
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
		var buffer = [];
		let postContent;

		items = pads;
		if (pads.length !== 0) {
			const alarmValue = alarmData.data;
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
					<img
						src={launchHeaderImg}
						alt="launch header image"
						style={{ width: '60%', height: '20rem', borderRadius: '1rem' }}
					/>
					<div className="bg-dark p-4 p-lg-5  white-font rounded-3 text-center">
						<div className="m-4 m-lg-5 ">
							<div className="lead2">
								<div
									className=" fw-bold"
									style={{ fontSize: '45px', marginBottom: '20px', marginTop: '100px' }}
								>
									CURRENT PRESALE
								</div>

								<p className="fs-4 socials" style={{ fontSize: '20px' }}>
									Presale Are Usually Sold In A Separate Allocation Of Sit
								</p>

								<img
									src={roketImg}
									alt="roket image"
									style={{ width: '200px', height: '200px', marginTop: '60px' }}
								/>
							</div>

							<div className="input-group mb-3" style={{ marginTop: '50px', marginBottom: '180px' }}>
								<Row>
									<Col md={14} xs={24}>
										<SearchInput
											className="search-input"
											placeholder="Enter token name or token symbol."
											value={this.state.searchTerm}
											onChange={this.handleChange}
										/>
									</Col>
									<Col md={6} xs={24}>
										<button className="list-button-left">My Contribute</button>
										<button className="list-button-right">My Favorite</button>
									</Col>
									<Col md={4} xs={24}>
										<select id="state" className="padlist-select" onChange={this.onChange}>
											<option value="All status">All Status</option>
											<option value="kycState">KYC</option>
											<option value="adtState">ADT</option>
											<option value="whiteListState">WHT</option>
											<option value="safuState">SAFU</option>
											<option value="pvtState">PVT</option>
											<option value="prmState">PRM</option>
										</select>
									</Col>
								</Row>
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
