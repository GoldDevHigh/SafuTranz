import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Modal, FlexboxGrid } from 'rsuite';

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
					<div className="py-6 container">
						<div style={{ height: '16px' }} />

						<div
							className="bg-dark style-border ant-card ant-card-bordered"
							style={{ marginBottom: '100px' }}
						>
							<div className="ant-card-body">
								<h3
									className="dash-title text-center socials"
									style={{
										letterSpacing: '2.1px',
										margin: '10px',
										fontSize: '30px',
										color: '#ffaa00'
									}}
								>
									SaFuTrendzPad
								</h3>
								<h2 className="dash-title text-white">The Evolution of SaFu Projects</h2>
								<p className="lead text-center" style={{ marginTop: '50px' }}>
									SaFuTrendzPad gives you the best secure, fast, and reliable launchpad for your
									projects which all token needs to pass through a verification service before getting
									listed on our platform. We do this to create trust and secure trading for our
									investors, everyone can trade with no risk.
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
							</div>
						</div>
						<h3
							className="dash-title text-center socials"
							style={{ fontSize: '30px', marginBottom: '20px', color: '#ffaa00' }}
						>
							SaFuTrendzPad Ecosystem
						</h3>
						<div className="ant-card-body">
							<p className="lead text-center">
								<p>
									Suitable Tools To Get Started With Our LaunchPad, With Fast Efficiency and Support
									Towards Your Project And 100% Decentralized.
								</p>
								<Button
									className="db-button-color"
									style={{ margin: '2%', width: '180px' }}
									onClick={this.onExplorerScroll}
								>
									<strong>EXPLORE TOOLS</strong>
								</Button>
								<p>
									Launchpad | AirDrop | Marketing | Partnership | Mint Token | Custom Presale |
									Support 24/7 | Staking Platform For All Project Owners | Refer & Earn | KYC + Audit
									| Multi-Sig Wallet | Alarm ( Notification )
								</p>
							</p>
						</div>
						<div style={{ marginTop: '70px' }}>
							<Row>
								<div
									className=" bg-dark style-border ant-card ant-card-bordered"
									style={{ marginBottom: '70px' }}
								>
									<Col sm={12} xs={24}>
										<div className="lead ant-card-body card-dashboard">
											<h1
												className="dash-title text-center socials"
												style={{ fontSize: '30px', color: '#ffaa00' }}
											>
												LaunchPad
											</h1>
											<p className="text-center" style={{ fontSize: '20px' }}>
												Create a new launchpad for your project with just a single click away
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
									<Col sm={12} xs={24}>
										<div className="lead ant-card-body card-dashboard">
											<h1
												className="dash-title text-center socials"
												style={{ fontSize: '30px', color: '#ffaa00' }}
											>
												Mint Now
											</h1>
											<p className="text-center" style={{ fontSize: '20px' }}>
												Mint token on BSC, ETH, AVAX, POLYGON, CRONOS, PULSE
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
								</div>
							</Row>

							<Row style={{ marginTop: '30px' }}>
								<div
									className=" bg-dark style-border ant-card ant-card-bordered"
									style={{ marginBottom: '70px' }}
								>
									<Col sm={12} xs={24}>
										<div className="lead ant-card-body card-dashboard">
											<h1
												className="dash-title text-center socials"
												style={{ fontSize: '30px', color: '#ffaa00' }}
											>
												AirDrop
											</h1>
											<p className="text-center" style={{ fontSize: '20px' }}>
												Distribute Airdrop / Giveaway with a few clicks Supports only BSC Token,
												More chains coming soon on our Airdrop DAPP
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
									<Col sm={12} xs={24}>
										<div className="lead ant-card-body card-dashboard">
											<h1
												className="dash-title text-center socials"
												style={{ fontSize: '30px', color: '#ffaa00' }}
											>
												Staking
											</h1>
											<br />
											<p className="text-center" style={{ fontSize: '20px' }}>
												Launch a staking pool for your project with fast API & 24/7 support
											</p>
											<div className="has-text-centered" style={{ marginTop: '30px' }}>
												<Button className="db-button-color" onClick={this.handleOpen}>
													<strong>LAUNCH STAKE</strong>
												</Button>
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
									<Col sm={12} xs={24}>
										<div className="lead ant-card-body card-dashboard">
											<h1
												className="dash-title text-center socials"
												style={{ fontSize: '30px', color: '#ffaa00' }}
											>
												Refer & Earn
											</h1>
											<br />
											<p className="text-center" style={{ fontSize: '20px' }}>
												Earn 35% commission when you refer/bring clients to use our launchpad
												and other tools
											</p>
											<div className="has-text-centered" style={{ marginTop: '30px' }}>
												<a href="https://safutrendz-socialize-and-earn.gitbook.io/safutrendzpad-documentation/safutrendzpad-docs/referral-earning">
													<Button className="db-button-color">
														<strong>EARN NOW</strong>
													</Button>
												</a>
											</div>
										</div>
									</Col>
									<Col sm={12} xs={24}>
										<div className="lead ant-card-body card-dashboard">
											<h1
												className="dash-title text-center socials"
												style={{ fontSize: '30px', color: '#ffaa00' }}
											>
												Marketing
											</h1>
											<br />
											<p className="text-center" style={{ fontSize: '20px' }}>
												Get free marketing when you subscribe to premium features
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
								</div>
							</Row>
							<Row>
								<div
									className=" bg-dark style-border ant-card ant-card-bordered"
									style={{ marginBottom: '70px' }}
								>
									<FlexboxGrid justify="space-around">
										<Col sm={12} xs={24}>
											<div className="lead ant-card-body card-dashboard">
												<h1
													className="dash-title text-center socials"
													style={{ fontSize: '30px', color: '#ffaa00' }}
												>
													Multi-Sig wallet
												</h1>
												<br />
												<p className="text-center" style={{ fontSize: '20px' }}>
													Project owners can use this service to secure their marketing funds,
													private sale funds & seed phase funds.
												</p>
												<div className="has-text-centered" style={{ marginTop: '30px' }}>
													<Button className="db-button-color" onClick={this.handleOpen}>
														<strong>CREATE NOW</strong>
													</Button>
												</div>
											</div>
										</Col>
									</FlexboxGrid>
								</div>
							</Row>
						</div>
					</div>
				</main>
			</section>
		);
	}
}
export default Dashboard;
