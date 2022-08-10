import React from 'react';

const LaunchRes = () => {
	const presaleAddress = window.localStorage.getItem('presaleAddress');

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
									You have successfully created a new presale launchpad. The smart contract address of
									your new launchpad is the following.
								</i>
							</p>
							<p className="text-center addresses" style={{ fontSize: '20px' }}>
								<i>{presaleAddress}</i>
							</p>
							<p>
								<a href={window.location.origin + '/PadInfo/' + presaleAddress}>
									<h3 style={{ color: '#fff' }}>
										{window.location.origin}/PadInfo/{presaleAddress}
									</h3>
								</a>
							</p>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
};

export default LaunchRes;
