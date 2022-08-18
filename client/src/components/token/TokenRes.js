import React from 'react';
import { Col, Row } from 'rsuite';
import capImg from '../assets/img/back/Nature_Concept-removebg-preview-1@2x.png';
import successfullImg from '../assets/img/back/Nature_Concept-removebg-preview@2x(1).png';
import { RiErrorWarningFill } from 'react-icons/ri';
import { AiOutlineCopy } from 'react-icons/ai';

const TokenRes = () => {
	const tokenAddress = window.localStorage.getItem('tokenAddress');

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
												style={{ fontSize: '20px', marginTop: '30px' }}
											>
												You Have Successfully Created A New Token
											</p>
											<p className="text-center socials" style={{ fontSize: '20px' }}>
												Your Token Address Is The Following Below
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
								className="text-center addresses token-res"
								style={{ fontSize: '20px', marginTop: '100px', color: '#FFAA00' }}
							>
								<i>{tokenAddress}</i>
								<button align="right" className="button-copy">
									Copy<AiOutlineCopy color="white" />
								</button>
							</p>

							<div className="launchbottom-text" style={{ marginTop: '100px' }}>
								<RiErrorWarningFill
									style={{
										height: '30px',
										width: '30px',
										color: '#FF0000',
										marginRight: '100px',
										marginBottom: '-8px'
									}}
								/>
								<span className="text-center" style={{ color: '#FFAA00' }}>
									Please Don't Add Liquidity To Your Token Before Creating A Presale / Fair Launch
								</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
};

export default TokenRes;
