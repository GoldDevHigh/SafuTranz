import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Modal, FlexboxGrid } from 'rsuite';
import roketImage from '../assets/img/back/freepik--Character--inject-47.svg';
import tophard from '../assets/img/back/blob-1.svg';
import bottomhard from '../assets/img/back/blob.svg';
import triAngleLeft from '../assets/img/back/Polygon 2.svg';
import triAngleRight from '../assets/img/back/Polygon 3.svg';
import lunchpadImg from '../assets/img/back/Spaceship_08-removebg-preview@2x.png';
import lockImg from '../assets/img/back/Combination_Lock-removebg-preview@2x.png';
import mintImg from '../assets/img/back/Nature_Concept-removebg-preview@2x.png';
import airdropImg from '../assets/img/back/Shopping_cart@2x.png';
import stakingImg from '../assets/img/back/Flourishing_dollar-removebg-preview@2x.png';
import marketingImg from '../assets/img/back/Green_house-removebg-preview@2x.png';
import multiWallet from '../assets/img/back/3d_office_supplies_model_05_vector-removebg-preview@2x.png';
import dashboardImg2 from '../assets/img/back/Coins-amico.svg';
import dashboardImg3 from '../assets/img/back/48-removebg-preview@2x.png';
import dashboardImg4 from '../assets/img/back/play-svgrepo-com.svg';
import birdImg from '../assets/img/back/CALLS_ASSEMBLE-12@2x.png';
import sailBoatImg from '../assets/img/back/SEVEN SEAS TRANSPARENT-1@2x.png';
import todayMoonImg from '../assets/img/back/today-moon-1@2x.png';
import sonicWhalesImg from '../assets/img/back/sonic-whales@2x.png';
import waveImage from '../assets/img/back/wavesNegative.svg';
import waveImage1 from '../assets/img/back/wavesNegative-1.svg';
import waveImage2 from '../assets/img/back/waves (1).svg';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.onExplorerScroll = this.onExplorerScroll.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);

		this.state = {
			open: false
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	onExplorerScroll() {
		window.scrollTo(0, 1150);
	}

	handleClose() {
		this.setState({
			open: false
		});
	}
	handleOpen() {
		this.setState({
			open: true
		});
	}
	render() {
		return (
			<section className="ant-layout black-background">
				<Modal size="xs" open={this.state.open} onClose={this.handleClose}>
					<Modal.Header />
					<Modal.Body>
						<h1>Coming Soon!</h1>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose} appearance="primary">
							Ok
						</Button>
					</Modal.Footer>
				</Modal>
				<main className="ant-layout-content MainLayout_content__2mZF9" style={{ fontSize: '20px' }}>
					<div className="py-6 ">
						<div style={{ height: '16px' }} />
						<div>
							<div className="dashboard-title">
								<Row>
									<Col xs={24} md={12}>
										<div align="left">
											<img
												src={tophard}
												style={{ height: '50px', width: '50px', left: '0px !important' }}
											/>
										</div>
										<div style={{ padding: '50px' }}>
											<img src={roketImage} className="dashboard-img1" />
										</div>
									</Col>
									<Col xs={24} md={12}>
										<div className="text-center title-safu-sub">SaFuTrendzPad</div>
										<h2 className="dash-title text-white">The Evolution of SaFu Projects</h2>
										<p className=" text-center" style={{ marginTop: '50px' }}>
											SaFuTrendzPad gives you the best secure, fast, and reliable launchpad for
											your projects which all token needs to pass through a verification service
											before getting listed on our platform. We do this to create trust and secure
											trading for our investors, everyone can trade with no risk.
										</p>
										<div style={{ marginTop: '20px' }}>
											<Link to="/LaunchPad1">
												<Button className="db-button">
													<strong>LAUNCH NOW</strong>
												</Button>
											</Link>

											<Button
												className="db-button-color"
												style={{ margin: '20px' }}
												onClick={this.handleOpen}
											>
												<strong>BUY $STZ</strong>
											</Button>

											<Link to="/PadList">
												<Button className="db-button">
													<strong>EXPLORE</strong>
												</Button>
											</Link>
										</div>
									</Col>
								</Row>
								<div align="right" style={{ marginBottom: '-60px' }}>
									<img src={bottomhard} style={{ height: '50px', width: '50px' }} />
								</div>
							</div>
						</div>
						<img src={waveImage} height="96px" width={'100%'} style={{ marginBottom: '100px' }} />
						<div className="container">
							<div className="ant-card-body">
								<p className="lead text-center">
									<div
										className="dash-title text-center socials"
										style={{ fontSize: '30px', marginBottom: '20px', color: '#ffaa00' }}
									>
										SAFUTRENDZPAD ECOSYSTEM
									</div>
									<p style={{ fontSize: '20px' }}>
										Suitable Tools To Get Started With Our Launchpad, With Efficiency And Support
										Towards Your Project And 100% Decentralized.
									</p>
									<Button
										className="db-button-color1"
										style={{ margin: '2%', width: '180px' }}
										onClick={this.onExplorerScroll}
									>
										<strong>EXPLORE TOOLS</strong>
									</Button>
									<p style={{ fontSize: '20px' }}>
										Launchpad | Airdrop | Marketing | Partnership | Mint Token | Custom Presale |
										Support 24/7 | Staking Platform | Refer & Earn | KYC + Audit | Multi-Sig Wallet
										| Alarm (Notification)
									</p>
								</p>
							</div>
							<div style={{ marginTop: '70px' }}>
								<Row>
									<div
										className=" bg-dark style-border ant-card ant-card-bordered"
										style={{ marginBottom: '70px' }}
									>
										<Col sm={6} xs={24}>
											<div className="lead1 ant-card-body card-dashboard">
												<img src={lunchpadImg} alt="lunchpad image" className="icon-img" />
												<div className="dash-title text-center" style={{ fontSize: '20px' }}>
													LAUNCHPAD
												</div>
												<br />
												<p className="text-center" style={{ fontSize: '15px' }}>
													We Don't Take Tokens. Use Our Service With Lower Fee & Fast API
												</p>
												<div className="has-text-centered" style={{ marginTop: '30px' }}>
													<Link to="/LaunchPad1">
														<Button className="db-button-color">
															<strong>LAUNCH NOW</strong>
														</Button>
													</Link>
												</div>
											</div>
										</Col>
										<Col sm={6} xs={24}>
											<div className="lead1 ant-card-body card-dashboard">
												<img src={lockImg} alt="mint image" className="icon-img" />
												<div className="dash-title  text-center" style={{ fontSize: '20px' }}>
													LOCK
												</div>
												<br />
												<br />
												<p className="text-center" style={{ fontSize: '15px' }}>
													Lock Your Tokens & Liquidity Easily With Safutrendzpad
												</p>
												<div className="has-text-centered" style={{ marginTop: '30px' }}>
													<a href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/referral-earning">
														<Button className="db-button-color">
															<strong>LOCK NOW</strong>
														</Button>
													</a>
												</div>
											</div>
										</Col>
										<Col sm={6} xs={24}>
											<div className="lead1 ant-card-body card-dashboard">
												<img src={mintImg} alt="mint img" className="icon-img" />
												<div className="dash-title  text-center" style={{ fontSize: '20px' }}>
													MINT
												</div>
												<br />
												<p className="text-center" style={{ fontSize: '15px' }}>
													Mint token on bsc, eth, cronos, avax, polygon, PulseChain
												</p>
												<div className="has-text-centered" style={{ marginTop: '30px' }}>
													<Link to="/CreateToken">
														<Button className="db-button-color">
															<strong>MINT NOW</strong>
														</Button>
													</Link>
												</div>
											</div>
										</Col>
										<Col sm={6} xs={24}>
											<div className="lead1 ant-card-body card-dashboard">
												<img src={airdropImg} alt="air drop image" className="icon-img" />
												<div className="dash-title  text-center" style={{ fontSize: '20px' }}>
													AIRDROP
												</div>
												<br />
												<br />
												<p className="text-center" style={{ fontSize: '15px' }}>
													Create Airdrop easily which supports BSC
												</p>
												<div className="has-text-centered" style={{ marginTop: '30px' }}>
													<a href="https://multisender.safutrendz.com">
														<Button className="db-button-color">
															<strong>SEND NOW</strong>
														</Button>
													</a>
												</div>
											</div>
										</Col>
									</div>
								</Row>
								<Row style={{ marginTop: '30px' }}>
									<div
										className=" bg-dark style-border ant-card ant-card-bordered"
										style={{ marginBottom: '70px' }}
									>
										<FlexboxGrid justify="space-around">
											<Col sm={6} xs={24}>
												<div className="lead1 ant-card-body card-dashboard">
													<img src={stakingImg} alt="staking image" className="icon-img" />
													<div
														className="dash-title  text-center"
														style={{ fontSize: '20px' }}
													>
														STAKING
													</div>
													<br />
													<p className="text-center" style={{ fontSize: '15px' }}>
														Launch Staking Pool For Your Project
													</p>
													<div className="has-text-centered" style={{ marginTop: '30px' }}>
														<Button className="db-button-color" onClick={this.handleOpen}>
															<strong>STAKE NOW</strong>
														</Button>
													</div>
												</div>
											</Col>
											<Col sm={6} xs={24}>
												<div className="lead1 ant-card-body card-dashboard">
													<img
														src={marketingImg}
														alt="marketing image"
														className="icon-img"
													/>
													<div
														className="dash-title  text-center"
														style={{ fontSize: '20px' }}
													>
														MARKETING
													</div>
													<br />
													<p className="text-center" style={{ fontSize: '15px' }}>
														Get your project broadcasted with Free email marketing
													</p>
													<div className="has-text-centered" style={{ marginTop: '30px' }}>
														<a href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/hire-marketer">
															<Button className="db-button-color">
																<strong>SUBSCRIBE</strong>
															</Button>
														</a>
													</div>
												</div>
											</Col>

											<Col sm={6} xs={24}>
												<div className="lead1 ant-card-body card-dashboard">
													<img
														src={multiWallet}
														alt="multi wallet img"
														className="icon-img"
													/>
													<div
														className="dash-title  text-center"
														style={{ fontSize: '20px' }}
													>
														MULTI-SIG WALLET
													</div>
													<p className="text-center" style={{ fontSize: '15px' }}>
														Keep your funds safe with multiple signature
													</p>
													<div className="has-text-centered" style={{ marginTop: '30px' }}>
														<Button className="db-button-color" onClick={this.handleOpen}>
															<strong>SECURE NOW</strong>
														</Button>
													</div>
												</div>
											</Col>
										</FlexboxGrid>
									</div>
								</Row>
							</div>
						</div>
						<img src={waveImage2} alt="wavimage" height={'96px'} width={'100%'} />
						<Row>
							<Col xs={24} md={12}>
								<div className="dash2">
									<img src={dashboardImg2} alt="dolla img" className="dashboardimg2" />
								</div>
							</Col>
							<Col xs={24} md={12}>
								<div className="dashboard2-panel">
									<div className="dashboard2-title">WHY CHOOSE US?</div>
									<br />
									<div className="dashboard2-text">o Zero Token Charge</div>
									<div className="dashboard2-text">o Lowest LaunchPad Fee</div>
									<div className="dashboard2-text">o ZSecure With Fast API Request</div>
									<div className="dashboard2-text">o Project Support</div>
									<div className="dashboard2-text">o Dev Support</div>
									<div className="dashboard2-text">o Unique Tools For Projects</div>
								</div>
							</Col>
						</Row>
						<img
							src={waveImage2}
							alt="wavimage"
							height={'96px'}
							width={'100%'}
							style={{ transform: 'matrix(-1, 0, 0, -1, 0, 0)' }}
						/>
						<div align="left">
							<img src={triAngleRight} alt="triangle img" />
						</div>
						<img src={dashboardImg3} alt="dashboard bottom image" className="dashboard-img3" />
						<h2>Watch our video to learn more about us</h2>
						<img src={dashboardImg4} alt="paly image" className="dasboard-img4" />
						<div align="right">
							<img src={triAngleLeft} alt="triangle img" width={'50px'} />
						</div>
						<img src={waveImage1} height="96px" width={'100%'} style={{ marginTop: '20px' }} />

						<h1 className="dashboard-bottom-title1">MEET OUR PARTNERS</h1>
						<div style={{ marginTop: '50px' }}>
							<img src={birdImg} alt="bird image" className="dashbord-img-bottom" />
							<img src={sailBoatImg} alt="sail boat image" className="dashbord-img-bottom" />
							<img src={todayMoonImg} alt="today moon image" className="dashbord-img-bottom" />
							<img src={sonicWhalesImg} alt="sonic whales image" className="dashbord-img-bottom" />
						</div>
					</div>
				</main>
			</section>
		);
	}
}
export default Dashboard;
