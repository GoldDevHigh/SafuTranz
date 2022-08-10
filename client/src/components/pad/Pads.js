import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';

var buffer = {};
var alarmValue = [];

class Pads extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		const { pads } = this.props;
		const test = this.props.alarm;

		return pads.map((pad) => {
			if (test !== null) {
				alarmValue = test.alarmValue;
				buffer = alarmValue.find((e) => e.tokenAddress === pad.tokenAddress);
			}
			return (
				<Card
					presaleAddress={pad.presaleAddress}
					tokenAddress={pad.tokenAddress}
					title={pad.title}
					symbol={pad.symbol}
					decimal={pad.decimal}
					total={pad.total}
					rate={pad.rate}
					softCap={pad.softCap}
					hardCap={pad.hardCap}
					minBuy={pad.minBuy}
					maxBuy={pad.maxBuy}
					from={pad.from}
					to={pad.to}
					whiteListState={pad.whiteListState}
					whitelist={pad.whitelist}
					user={pad.user}
					chainID={pad.chainID}
					chainName={pad.chainName}
					logoUrl={pad.logoUrl}
					website={pad.website}
					facebook={pad.facebook}
					twitter={pad.twitter}
					github={pad.github}
					telegram={pad.telegram}
					instagram={pad.instagram}
					discord={pad.discord}
					reddit={pad.reddit}
					description={pad.description}
					saleCount={pad.saleCount}
					kycState={pad.kycState}
					auditState={pad.auditState}
					safuState={pad.safuState}
					premium={pad.premium}
					privateSale={pad.privateSale}
					presaleState={pad.presaleState}
					pancakeswapLiquidity={pad.pancakeswapLiquidity}
					pancakeswapRate={pad.pancakeswapRate}
					pancakeswapLockup={pad.pancakeswapLockup}
					withDrawBtnName={pad.withDrawBtnName}
					withDrawBtnToken={pad.withDrawBtnToken}
					finalizeBtn={pad.finalizeBtn}
					FairState={pad.FairState}
					startAlarmState={buffer ? buffer.startAlarmState : false}
					startAlarmTime5={buffer ? buffer.startAlarmTime5 : false}
					startAlarmTime15={buffer ? buffer.startAlarmTime15 : false}
					startAlarmTime30={buffer ? buffer.startAlarmTime30 : false}
					endAlarmState={buffer ? buffer.endAlarmState : false}
					endAlarmTime5={buffer ? buffer.endAlarmTime5 : false}
					endAlarmTime15={buffer ? buffer.endAlarmTime15 : false}
					endAlarmTime30={buffer ? buffer.endAlarmTime30 : false}
				/>
			);
		});
	}
}

Pads.propTypes = {
	pads: PropTypes.array.isRequired,
	alarm: PropTypes.object.isRequired
};

export default Pads;
