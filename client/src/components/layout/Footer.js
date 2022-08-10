import React from 'react';
import Logo from '../assets/img/logo.png';
import { FaGlobe, FaTwitter, FaTelegram } from 'react-icons/fa';

const Footer = () => {
	return (
		<div className="footer flex text-center" style={{ backgorundColor: '#000' }}>
			<div
				className="footer-wrapper container flex-column"
				style={{
					marginBottom: '0px',
					marginTop: '0px',
					paddingTop: '32px',
					paddingBottom: '32px'
				}}
			>
				<div className="footer-logo flex-center" style={{ paddingBottom: '32px' }}>
					<a href="https://safutrendz.com/">
						<img src={Logo} className="photo" alt="logo" style={{ width: '120px', height: '120px' }} />
					</a>
				</div>
				<div className="footer-copyright text-white" style={{ paddingBottom: '32px' }}>
					<strong className="text-white" style={{ color: 'white' }}>
						Copyright Reserved @{new Date().getFullYear()} SafuTrendz
					</strong>
				</div>
				<div className="flex-center">
					<a href="https://twitter.com/safu_trendz" style={{ marginTop: '15px' }}>
						<FaTwitter size={35} color={'rgb(235,209,95)'} style={{ marginLeft: '7px' }} />
					</a>
					<a href="https://t.me/safu_trendz" style={{ marginTop: '10px' }}>
						<FaTelegram size={35} color={'rgb(235,209,95)'} style={{ marginLeft: '7px' }} />
					</a>
					<a href="https://safutrendz.com">
						<FaGlobe size={35} color={'rgb(235,209,95)'} style={{ marginLeft: '7px' }} />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
