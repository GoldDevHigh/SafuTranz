import React from 'react';

// var opt = {
// 	type: "basic",
// 	title: "Primary Title",
// 	message: "Primary message to display",
// 	iconUrl: "url_to_small_icon"
//  }

//  chrome.notifications.create(id?, opt, creationCallback?);
function Staking() {
	return (
		<div>
			<div className="py-6 container">
				<div style={{ height: '16px' }} />

				<div className="bg-dark  style-border ant-card ant-card-bordered">
					<div className="ant-card-body" id="createToken">
						<h1 className="socials text-center" style={{ fontSize: '40px' }}>
							Create Token
						</h1>
						<br />
						<form onSubmit={this.onSubmit}>
							<p className="has-text-primary is-size-5">(*) is required field.</p>
							<div className="field">
								<label htmlFor="tokenName" id="token-text">
									Name<sup className="has-text-danger">*</sup>
								</label>
								<div className="control">
									<input
										label="Standard"
										// value={this.state.tokenName}
										onChange={(event) => this.handleInput(event)}
										// className={classnames('form-control form-control-lg', {
										// 	'is-invalid': this.state.formErrors.tokenName
										// })}
										type="text"
										id="tokenName"
										name="tokenName"
										placeholder="Ex: Ethereum"
										maxLength="255"
									/>
									{/* <div className="invalid-feedback">{this.state.formErrors.tokenName}</div> */}
								</div>
							</div>
							<div className="field">
								<label htmlFor="symbol" id="token-text">
									Symbol<sup className="has-text-danger">*</sup>
								</label>
								<div className="control">
									<input
										// value={this.state.symbol}
										onChange={(event) => this.handleInput(event)}
										// className={classnames('form-control form-control-lg', {
										// 	'is-invalid': this.state.formErrors.symbol
										// })}
										type="text"
										id="tokenName"
										name="symbol"
										placeholder="Ex: ETH"
										maxLength="255"
									/>

									{/* <div className="invalid-feedback">{this.state.formErrors.symbol}</div> */}
								</div>
							</div>
							<div className="field">
								<label htmlFor="decimals" id="token-text">
									Decimals<sup className="has-text-danger">*</sup>
								</label>
								<div className="control">
									<input
										// value={this.state.decimals}
										onChange={(event) => this.handleInput(event)}
										// className={classnames('form-control form-control-lg', {
										// 	'is-invalid': this.state.formErrors.decimals
										// })}
										type="text"
										id="tokenName"
										name="decimals"
										placeholder="Ex: 18"
									/>

									{/* <div className="invalid-feedback">{this.state.formErrors.decimals}</div> */}
								</div>
							</div>

							<div className="field">
								<label htmlFor="totalSupply" id="token-text">
									Total supply<sup className="has-text-danger">*</sup>
								</label>
								<div className="control">
									<input
										// value={this.state.totalSupply}
										onChange={(event) => this.handleInput(event)}
										// className={classnames('form-control form-control-lg', {
										// 	'is-invalid': this.state.formErrors.totalSupply
										// })}
										type="text"
										id="tokenName"
										name="totalSupply"
										placeholder="Ex: 100000000000"
									/>

									{/* <div className="invalid-feedback">{this.state.formErrors.totalSupply}</div> */}
								</div>
							</div>
							<div className="has-text-centered mt-6 pt-4 mb-4">
								<button type="submit" className="token-button" onClick={this.onSubmit}>
									<stron>Create token</stron>
								</button>
							</div>
							<p className="token-info">Create token fee: {limitData}</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Staking;
