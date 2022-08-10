import React, { useState, useEffect } from 'react';
import { useToaster, FlexboxGrid, Message } from 'rsuite';
import { useDispatch } from 'react-redux';

import avax from '../assets/img/avax.png';
import bnb from '../assets/img/bnb.png';
import eth from '../assets/img/eth.png';
import cro from '../assets/img/cronos.png';
import pls from '../assets/img/PLS.png';
import matic from '../assets/img/matic.png';
import Moment from 'react-moment';
import ProgressBar from '@ramonak/react-progress-bar';
import { FaBell, FaArrowLeft } from 'react-icons/fa';
import { TbBellRinging } from 'react-icons/tb';
import { setAlaramData } from '../../actions/alarmActions';

var unit;
var logoimg;
var btnState;
var dipTime;
var minSelect1, minSelect2, minSelect3;

function Card(props) {
	const dispatch = useDispatch();
	const toaster = useToaster();

	const [ alarmShow, setAlarmShow ] = useState(false);
	const [ minClassState1, setMinClassState1 ] = React.useState('');
	const [ minClassState2, setMinClassState2 ] = React.useState('');
	const [ minClassState3, setMinClassState3 ] = React.useState('');
	const [ startState, setStartState ] = React.useState(true);

	const [ startClass, setStartClass ] = React.useState('');
	const [ endClass, setEndClass ] = React.useState('');

	function viewPool() {
		window.localStorage.setItem('presaleAddress', props.presaleAddress);
		window.localStorage.setItem('tokenAddress', props.tokenAddress);
		window.localStorage.setItem('tokenOwner', props.user);
		window.location.href = `/PadInfo/${props.presaleAddress}`;
	}

	switch (props.chainID) {
		case 56:
			unit = 'BNB';
			logoimg = bnb;
			break;
		case 97:
			unit = 'tBNB';
			logoimg = bnb;
			break;
		case 1:
			unit = 'ETH';
			logoimg = eth;
			break;
		case 3:
			unit = 'ETH';
			logoimg = eth;
			break;
		case 43114:
			unit = 'AVAX';
			logoimg = avax;
			break;
		case 25:
			unit = 'CRO';
			logoimg = cro;
			break;
		case 941:
			unit = 'tPLS';
			logoimg = pls;
			break;
		case 137:
			unit = 'MATIC';
			logoimg = matic;
			break;
		default:
			unit = 'BNB';
			logoimg = bnb;
	}

	if (window.localStorage.getItem('chainId') === props.chainID) {
		btnState = true;
	} else {
		btnState = false;
	}

	const onAlarmDisplay = () => {
		setAlarmShow(true);
		minSelect1 = props.startAlarmTime5;
		minSelect2 = props.startAlarmTime15;
		minSelect3 = props.startAlarmTime30;
		minSelect1 ? setMinClassState1('active') : setMinClassState1('');
		minSelect2 ? setMinClassState2('active') : setMinClassState2('');
		minSelect3 ? setMinClassState3('active') : setMinClassState3('');
		setStartClass('active');
		setEndClass('');
		setStartState(true);
	};
	const offAlarmDisplay = () => setAlarmShow(false);

	const successMessage = (
		<Message showIcon type="success">
			success :Alarm Time set successfully.
		</Message>
	);
	const successMessageRemove = (
		<Message showIcon type="warning">
			success :Alarm Time remove successfully.
		</Message>
	);
	const warnningMessage = (
		<Message showIcon type="warning">
			warning : This token no active state.
		</Message>
	);
	const warnningMessage1 = (
		<Message showIcon type="warning">
			warning : This start alarm no active state.
		</Message>
	);
	const errorMessage = (
		<Message showIcon type="error">
			Warning : Please connect wallet!
		</Message>
	);

	var hardCapTime = new Date(props.to);
	var softCapTime = new Date(props.from);
	var nowTime = new Date();
	var calcTime = new Date();
	var startTime = new Date();

	calcTime = hardCapTime.getTime() - nowTime.getTime();
	startTime = softCapTime.getTime() - nowTime.getTime();

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

	if (props.presaleState === '3') {
		dipTime = <span>FAILED</span>;
	} else if (props.presaleState === '2') {
		dipTime = <span>SUCCESS</span>;
	} else if (softCapTime > nowTime) {
		dipTime = <span>UPCOMING:{formattedTime1}</span>;
	} else if (hardCapTime < nowTime) {
		if (props.hardCap <= props.saleCount) dipTime = <span>SUCCESS</span>;
		else if (props.softCap <= props.saleCount) dipTime = <span>SUCCESS</span>;
		else dipTime = <span>FAILED</span>;
	} else if (props.saleCount >= props.hardCap) {
		dipTime = <span>SUCCESS</span>;
	} else {
		dipTime = <span className="endTime-font">ACTIVE:{formattedTime}</span>;
	}

	function removeMinutes(numOfMinutes, date = new Date()) {
		date.setMinutes(date.getMinutes() - numOfMinutes);

		return date;
	}

	useEffect(() => {
		if (props.startAlarmState && props.presaleState !== '2' && props.presaleState !== '3') {
			var start = new Date(softCapTime);
			var startalarm = softCapTime;
			if (props.startAlarmTime5) startalarm = removeMinutes(5, startalarm);
			if (props.startAlarmTime15) startalarm = removeMinutes(15, startalarm);
			if (props.startAlarmTime30) startalarm = removeMinutes(30, startalarm);

			var buf = new Date(start.getTime() - nowTime.getTime());
			if (startalarm < nowTime && nowTime < start)
				alert(`${props.title} Token ${buf.getMinutes()} minutes start sale!`);
		}
		if (props.endAlarmState && props.presaleState !== '2' && props.presaleState !== '3') {
			var end = new Date(hardCapTime);
			var endAlarm = hardCapTime;
			if (props.endAlarmTime5) endAlarm = removeMinutes(5, endAlarm);
			if (props.endAlarmTime15) endAlarm = removeMinutes(15, endAlarm);
			if (props.endAlarmTime30) endAlarm = removeMinutes(30, endAlarm);

			var bufs = new Date(end.getTime() - nowTime.getTime());
			if (endAlarm < nowTime && nowTime < end)
				alert(`${props.title} Token ${bufs.getMinutes()} minutes end sale!`);
		}
	}, []);

	const onSelected = (e) => {
		var st = true;
		if (props.presaleState === '2' || props.presaleState === '3' || nowTime > hardCapTime) {
			toaster.push(warnningMessage, { placement: 'topEnd' });
		} else {
			if (startState && nowTime > softCapTime) {
				toaster.push(warnningMessage1, { placement: 'topEnd' });
			} else {
				switch (e.target.value) {
					case '1':
						if (minSelect1) {
							setMinClassState1('');
							minSelect1 = false;
						} else {
							setMinClassState1('active');
							minSelect1 = true;
						}
						break;
					case '2':
						if (minSelect2) {
							setMinClassState2('');
							minSelect2 = false;
						} else {
							setMinClassState2('active');
							minSelect2 = true;
						}
						break;
					case '3':
						if (minSelect3) {
							setMinClassState3('');
							minSelect3 = false;
						} else {
							setMinClassState3('active');
							minSelect3 = true;
						}
						break;

					default:
						break;
				}

				if (!minSelect1 && !minSelect2 && !minSelect3) {
					st = false;
				}

				var buffer = {};

				if (startState) {
					if (st)
						buffer = {
							userAddress: localStorage.getItem('userAddress'),
							tokenAddress: props.tokenAddress,
							startAlarmTime5: minSelect1,
							startAlarmTime15: minSelect2,
							startAlarmTime30: minSelect3,
							startAlarmState: true
						};
					else
						buffer = {
							userAddress: localStorage.getItem('userAddress'),
							tokenAddress: props.tokenAddress,
							startAlarmTime5: false,
							startAlarmTime15: false,
							startAlarmTime30: false,
							startAlarmState: false
						};
				} else {
					if (st)
						buffer = {
							userAddress: localStorage.getItem('userAddress'),
							tokenAddress: props.tokenAddress,
							endAlarmTime5: minSelect1,
							endAlarmTime15: minSelect2,
							endAlarmTime30: minSelect3,
							endAlarmState: true
						};
					else
						buffer = {
							userAddress: localStorage.getItem('userAddress'),
							tokenAddress: props.tokenAddress,
							endAlarmTime5: false,
							endAlarmTime15: false,
							endAlarmTime30: false,
							endAlarmState: false
						};
				}

				if (localStorage.getItem('isAuthenticated') === 'true') {
					if (st) {
						toaster.push(successMessage, { placement: 'topEnd' });
					} else {
						toaster.push(successMessageRemove, { placement: 'topEnd' });
					}
					dispatch(setAlaramData(buffer));
				} else {
					toaster.push(errorMessage, { placement: 'topEnd' });
				}
			}
		}
	};
	const onStartTimeSet = () => {
		setStartClass('active');
		setEndClass('');
		minSelect1 = props.startAlarmTime5;
		minSelect2 = props.startAlarmTime15;
		minSelect3 = props.startAlarmTime30;
		minSelect1 ? setMinClassState1('active') : setMinClassState1('');
		minSelect2 ? setMinClassState2('active') : setMinClassState2('');
		minSelect3 ? setMinClassState3('active') : setMinClassState3('');
		setStartState(true);
	};

	const onEndTimeSet = () => {
		setStartClass('');
		setEndClass('active');
		setStartState(false);
		minSelect1 = props.endAlarmTime5;
		minSelect2 = props.endAlarmTime15;
		minSelect3 = props.endAlarmTime30;
		minSelect1 ? setMinClassState1('active') : setMinClassState1('');
		minSelect2 ? setMinClassState2('active') : setMinClassState2('');
		minSelect3 ? setMinClassState3('active') : setMinClassState3('');
	};

	const Fair = props.FairState;
	const NormalDisplay = Fair ? (
		<div className="card-fair">
			<img
				src={props.logoUrl}
				style={{ width: '50px', marginLeft: '5px', marginTop: '5px' }}
				alt="logo"
				align="left"
			/>
			<img
				src={logoimg}
				alt="net"
				style={{ width: '30px', marginRight: '5px', marginTop: '5px' }}
				align="right"
			/>

			<div className="card-body text-center p-6 p-lg-5 pt-0 pt-lg-0">
				<div className="content-title">
					<h2>
						<p className="title">
							<span>
								<strong>
									{props.title} ({props.symbol})
								</strong>
							</span>
						</p>
					</h2>
					<p className="subtitle">
						1 {unit} = {props.rate}
						{props.symbol}
						<p className="card-fair-title">Fair LaunchPad</p>
					</p>
				</div>
				<div className="soft-hard-cap" style={{ marginTop: '20px' }}>
					<p>
						<span>
							0 ~ Soft:{props.softCap} {unit}
							<ProgressBar
								completed={(props.saleCount / props.softCap * 100).toFixed(0)}
								bgColor={props.saleCount <= props.softCap ? '#bf9d07' : '#2fbf07'}
							/>
						</span>
					</p>
				</div>
				<div className="soft-hard-cap">
					<p>
						MinBuy:{props.minBuy} {unit}
					</p>
					<p>
						MaxBuy:{props.maxBuy} {unit}
					</p>
				</div>
				<div className="soft-hard-cap">
					<p>
						From:
						<strong>
							<span>
								<Moment format="YYYY-MM-DD HH:mm">{props.from}</Moment>
							</span>
						</strong>
					</p>
					<p>
						To:
						<strong>
							<span>
								<Moment format="YYYY-MM-DD HH:mm">{props.to}</Moment>
							</span>
						</strong>
					</p>
				</div>
				<div className="card-limit-time">{dipTime}</div>
				<div>
					{props.whiteListState ? <span className="card-whitelist-text">WHT</span> : ''}
					{props.kycState ? <span className="card-kyc-text">KYC</span> : ''}
					{props.auditState ? <span className="card-audit-text">AUDIT</span> : ''}
					{props.safuState ? <span className="card-safu-text">SAFU</span> : ''}
					{props.premium ? <span className="card-premium-text">PRM</span> : ''}
					{props.privateSale ? <span className="card-privateSale-text">PVT</span> : ''}
				</div>
				<button className="card-btn" disabled={btnState} onClick={viewPool}>
					<strong>View Pool</strong>
				</button>
				<button className="card-alarm-button" onClick={onAlarmDisplay}>
					<FaBell className="card-alarm-icon" size={'2rem'} />
				</button>
			</div>
		</div>
	) : (
		<div className="card">
			<img
				src={props.logoUrl}
				style={{ width: '50px', marginLeft: '5px', marginTop: '5px' }}
				alt="logo"
				align="left"
			/>
			<img
				src={logoimg}
				alt="net"
				style={{ width: '30px', marginRight: '5px', marginTop: '5px' }}
				align="right"
			/>

			<div className="card-body text-center p-6 p-lg-5 pt-0 pt-lg-0">
				<div className="content-title">
					<h2>
						<p className="title">
							<span>
								<strong>
									{props.title} ({props.symbol})
								</strong>
							</span>
						</p>
					</h2>
					<p className="subtitle">
						1 {unit} = {props.rate}
						{props.symbol}
					</p>
				</div>
				<div className="soft-hard-cap" style={{ marginTop: '20px' }}>
					<p>
						<span>
							Soft:{props.softCap} ~ Hard:{props.hardCap} {unit}
							<ProgressBar
								completed={(props.saleCount / props.hardCap * 100).toFixed(0)}
								bgColor={props.saleCount <= props.softCap ? '#bf9d07' : '#2fbf07'}
							/>
						</span>
					</p>
				</div>
				<div className="soft-hard-cap">
					<p>
						MinBuy:{props.minBuy} {unit}
					</p>
					<p>
						MaxBuy:{props.maxBuy} {unit}
					</p>
				</div>
				<div className="soft-hard-cap">
					<p>
						From:
						<strong>
							<span>
								<Moment format="YYYY-MM-DD HH:mm">{props.from}</Moment>
							</span>
						</strong>
					</p>
					<p>
						To:
						<strong>
							<span>
								<Moment format="YYYY-MM-DD HH:mm">{props.to}</Moment>
							</span>
						</strong>
					</p>
				</div>
				<div className="card-limit-time">{dipTime}</div>
				<div>
					{props.whiteListState ? <span className="card-whitelist-text">WHT</span> : ''}
					{props.kycState ? <span className="card-kyc-text">KYC</span> : ''}
					{props.auditState ? <span className="card-audit-text">AUDIT</span> : ''}
					{props.safuState ? <span className="card-safu-text">SAFU</span> : ''}
					{props.premium ? <span className="card-premium-text">PRM</span> : ''}
					{props.privateSale ? <span className="card-privateSale-text">PVT</span> : ''}
				</div>
				<button className="card-btn" disabled={btnState} onClick={viewPool}>
					<strong>View Pool</strong>
				</button>
				<button className="card-alarm-button" onClick={onAlarmDisplay}>
					<TbBellRinging className="card-alarm-icon" size={'2rem'} />
				</button>
			</div>
		</div>
	);
	const AlarmDisplay = (
		<div className="card">
			<div>
				<button className="card-alarm-back-button" onClick={offAlarmDisplay}>
					<FaArrowLeft />Back
				</button>
			</div>
			<br />
			<div style={{ width: '100%', marginTop: '80px' }}>
				<h3>REMIND ME </h3>
				<button className={`card-btn-min ${minClassState1}`} value="1" onClick={onSelected}>
					5 Min
				</button>
				<button className={`card-btn-min ${minClassState2}`} value="2" onClick={onSelected}>
					15 Min
				</button>
				<button className={`card-btn-min ${minClassState3}`} value="3" onClick={onSelected}>
					30 Min
				</button>
			</div>
			<div style={{ width: '100%', marginTop: '80px' }}>
				<h3>BEFORE</h3>
				<button className={`card-btn-start ${startClass}`} onClick={onStartTimeSet}>
					Presale
				</button>
				<button className={`card-btn-start ${endClass}`} onClick={onEndTimeSet}>
					Dex Listing
				</button>
			</div>
		</div>
	);

	return (
		<FlexboxGrid.Item colspan={4} style={{ width: '250px' }}>
			{alarmShow ? AlarmDisplay : NormalDisplay}
		</FlexboxGrid.Item>
	);
}

export default Card;
