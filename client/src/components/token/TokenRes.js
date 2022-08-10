import React from 'react';

const TokenRes = () => {
	const tokenAddress = window.localStorage.getItem('tokenAddress');

	return (
		<section className="ant-layout black-background">
			<main className="ant-layout-content MainLayout_content__2mZF9">
				<div className="py-6 container">
					<div style={{ height: '16px' }} />

					<div className="bg-dark style-border ant-card ant-card-bordered" style={{ marginBottom: '100px' }}>
						<div className="ant-card-body">
							<h3 className="text-center socials" style={{ fontSize: '40px' }}>
								Congratulations
							</h3>
							<p className="lead text-center" style={{ color: 'white', fontSize: '18px' }}>
								<i>
									You have successfully created a new token. The smart contract address of your new
									token is the following.
								</i>
							</p>
							<p className="text-center addresses" style={{ fontSize: '20px' }}>
								<i>{tokenAddress}</i>
							</p>
							<p style={{ marginTop: '30px', fontSize: '20px' }} className="socials">
								Please don't add liquidity for your token before creating a presale launch and fair
								launch
							</p>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
};

export default TokenRes;
