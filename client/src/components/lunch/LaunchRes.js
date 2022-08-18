import React from 'react';
import { Col, Row } from 'rsuite';
import capImg from '../assets/img/back/Nature_Concept-removebg-preview-1@2x.png';
import successfullImg from '../assets/img/back/Nature_Concept-removebg-preview@2x(1).png';
import { RiErrorWarningFill } from 'react-icons/ri';
import { AiOutlineCopy } from 'react-icons/ai';

const LaunchRes = () => {
	const presaleAddress = window.localStorage.getItem('presaleAddress');

	return (
		<section className="ant-layout black-background">
			<main className="ant-layout-content MainLayout_content__2mZF9">
				<div className="py-6 container">
					<div style={{ height: '16px' }} />

					<div className="bg-dark style-border ant-card ant-card-bordered" style={{ marginBottom: '100px' }}>
						<div className="ant-card-body">
							<div className="lead2">
								<Row>
									<Col md={12} xs={24}>
										<div
											className="text-center "
											style={{
												fontSize: '40px',
												font: 'normal normal bold 40px/40px Rajdhani',
												paddingTop: '50px',
												paddingBottom: '50px'
											}}
										>
											CONGRATULATIONS<img
												src={capImg}
												alt="cap image"
												style={{ width: '20px', height: '20px', marginBottom: '30px' }}
											/>
											<p
												className="text-center socials"
												style={{ fontSize: '15px', marginTop: '15px' }}
											>
												You have successfully created a new presale launchpad.
											</p>
											<p className="text-center socials" style={{ fontSize: '15px' }}>
												The smart contract address of your new launchpad is the following.
											</p>
										</div>
									</Col>
									<Col md={12} xs={24}>
										<img
											src={successfullImg}
											alt="successfully image"
											style={{ width: '200px', height: '200px', marginTop: '20px' }}
										/>
									</Col>
								</Row>
							</div>
							<p
								className="text-center addresses  token-res"
								style={{ fontSize: '20px', marginTop: '100px', color: '#FFAA00' }}
							>
								<i>{presaleAddress}</i>
							</p>

							<div className="launchbottom-text" style={{ marginTop: '100px' }}>
								<span className="text-center" style={{ color: '#FFAA00' }}>
									<a href={window.location.origin + '/PadInfo/' + presaleAddress}>
										<h4 style={{ color: '#fff' }}>
											{window.location.origin}/PadInfo/{presaleAddress}
										</h4>
									</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
};

export default LaunchRes;
