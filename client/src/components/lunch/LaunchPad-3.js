import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import isEmpty from '../../validation/isEmpty';
import { IconButton, ButtonToolbar, Row, Col } from 'rsuite';
import PauseIcon from '@rsuite/icons/PagePrevious';
import PlayIcon from '@rsuite/icons/PageNext';
import { setReduxValue1 } from '../../actions/padActions';
import PropTypes from 'prop-types';
import lunchpadImg from '../assets/img/back/Spaceship_08-removebg-preview@2x.png';
import { BsFillPatchCheckFill } from 'react-icons/bs';

class LaunchPad3 extends Component {
	constructor(props) {
		super(props);

		this.nextPage = this.nextPage.bind(this);
		this.state = {
			logoUrl: '',
			website: '',

			formErrors: { logoUrl: '', website: '' },
			logoUrlValid: false,
			websiteValid: false,
			formValid: false
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}
	handleInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
		// window.localStorage.setItem(name, value);
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let logoUrlValid = this.state.logoUrlValid;
		let websiteValid = this.state.websiteValid;

		switch (fieldName) {
			case 'logoUrl':
				logoUrlValid = isEmpty(value) ? '' : 'have url';
				fieldValidationErrors.logoUrl = logoUrlValid ? '' : ' must input logo url.';
				logoUrlValid = value.match(/^((http|https):\/\/)/);
				fieldValidationErrors.logoUrl = logoUrlValid ? '' : ' is invalid';
				break;
			case 'website':
				websiteValid = isEmpty(value) ? '' : 'have url';
				logoUrlValid = value.match(/^((http|https):\/\/)/);
				fieldValidationErrors.website = websiteValid ? '' : 'must input website url.';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				logoUrlValid: logoUrlValid,
				websiteValid: websiteValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid: this.state.logoUrlValid && this.state.websiteValid
		});
	}

	nextPage() {
		const data = {
			logoUrl: this.state.logoUrl,
			website: this.state.website,
			facebook: this.state.facebook,
			twitter: this.state.twitter,
			github: this.state.github,
			telegram: this.state.telegram,
			instagram: this.state.instagram,
			discord: this.state.discord,
			reddit: this.state.reddit,
			description: this.state.description,
			youtube: this.state.youtube,
			bannel: this.state.bannel
		};

		console.log(data);
		this.props.setReduxValue1(data);
	}

	render() {
		return (
			<section className="ant-layout black-background">
				<main className="ant-layout-content MainLayout_content__2mZF9">
					<div className="py-6 container">
						<div style={{ height: '16px' }} />

						<div className="bg-dark style-border ant-card ant-card-bordered">
							<div className="ant-card-body">
								<div className="lead2" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
									<Row>
										<Col md={12} xs={24}>
											<h1
												className=" text-center"
												style={{ fontSize: '40px', marginTop: '10px' }}
											>
												VERIFY TOKEN{' '}
												<BsFillPatchCheckFill
													style={{
														marginBottom: '20px',
														marginLeft: '-10px',
														height: '20px',
														width: '20px',
														color: '#0F3CB2'
													}}
												/>
											</h1>
											<p className="text-center socials" style={{ fontSize: '20px' }}>
												Ensure you fill all the fields below
											</p>
											<h4>Step 3</h4>
										</Col>
										<Col md={12} xs={24}>
											<img
												src={lunchpadImg}
												alt="launchpad image"
												style={{ width: '150px', height: '150px' }}
											/>
										</Col>
									</Row>
								</div>

								<div className="lead2" style={{ marginTop: '100px' }}>
									<form>
										<Row>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="logoUrl">
														Logo URL<sup className="has-text-danger">*</sup>
													</label>
													<div className="form-group">
														<input
															value={this.state.logoUrl}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.logoUrl
															})}
															type="text"
															placeholder="Ex: https://..."
															id="tokenAddress"
															name="logoUrl"
															autoComplete="off"
														/>

														<div className="invalid-feedback">
															{this.state.formErrors.logoUrl}
														</div>
														<p className="help">URL must end with jpg, png, gif, jpeg</p>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="website">
														Website<sup className="has-text-danger">*</sup>
													</label>
													<div className="form-group">
														<input
															value={this.state.website}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.website
															})}
															type="text"
															placeholder="Ex: https://..."
															id="tokenAddress"
															name="website"
															autoComplete="off"
														/>

														<div className="invalid-feedback">
															{this.state.formErrors.website}
														</div>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="facebook">
														Facebook
													</label>
													<div className="form-group">
														<input
															value={this.state.facebook}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.facebook
															})}
															type="text"
															placeholder="Ex: https://facebook.com/..."
															id="tokenAddress"
															name="facebook"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
										</Row>
										<Row style={{ marginTop: '50px' }}>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="twitter">
														Twitter
													</label>
													<div className="form-group">
														<input
															value={this.state.twitter}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.twitter
															})}
															type="text"
															placeholder="Ex: https://twitter.com/..."
															id="tokenAddress"
															name="twitter"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="github">
														Github
													</label>
													<div className="form-group">
														<input
															value={this.state.github}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.github
															})}
															type="text"
															placeholder="Ex: https://github.com/..."
															id="tokenAddress"
															name="github"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="telegram">
														Telegram
													</label>
													<div className="form-group">
														<input
															value={this.state.telegram}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.telegram
															})}
															type="text"
															placeholder="Ex: https://t.me/..."
															id="tokenAddress"
															name="telegram"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
										</Row>

										<Row style={{ marginTop: '50px' }}>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="instagram">
														Instagram
													</label>
													<div className="form-group">
														<input
															value={this.state.instagram}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.instagram
															})}
															type="text"
															placeholder="Ex: https://instagram.com/..."
															id="tokenAddress"
															name="instagram"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="discord">
														Discord
													</label>
													<div className="form-group">
														<input
															value={this.state.discord}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.discord
															})}
															type="text"
															placeholder="Ex: https://t.me/..."
															id="tokenAddress"
															name="discord"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="reddit">
														Reddit
													</label>
													<div className="form-group">
														<input
															value={this.state.reddit}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.reddit
															})}
															type="text"
															placeholder="Ex: https://reddit.com/..."
															id="tokenAddress"
															name="reddit"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
										</Row>
										<Row style={{ marginTop: '50px' }}>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="reddit">
														YouTube Video URL
													</label>
													<div className="form-group">
														<input
															value={this.state.youtube}
															onChange={(event) => this.handleInput(event)}
															type="text"
															placeholder="Ex: https://youtube.com/..."
															id="tokenAddress"
															name="youtube"
															autoComplete="off"
														/>
													</div>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="reddit">
														Banner URL
													</label>
													<div className="form-group">
														<input
															value={this.state.bannel}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.reddit
															})}
															type="text"
															placeholder="Ex: https://reddit.com/..."
															id="tokenAddress"
															name="bannel"
															autoComplete="off"
														/>
													</div>
													<p className="help">URL must end with jpg, png, gif, jpeg</p>
												</div>
											</Col>
											<Col md={8} xs={24}>
												<div className="field">
													<label style={{ fontSize: '20px' }} htmlFor="description">
														Description
													</label>
													<div className="form-group">
														<textarea
															value={this.state.description}
															onChange={(event) => this.handleInput(event)}
															className={classnames('form-control form-control-lg', {
																'is-invalid': this.state.formErrors.descrition
															})}
															type="text"
															placeholder="Ex: This is the best project..."
															id="description"
															name="description"
														/>
													</div>
												</div>
											</Col>
										</Row>
										<ButtonToolbar style={{ marginTop: '100px', marginBottom: '50px' }}>
											<Link to="/LaunchPad2">
												<button placement="left" className="launch-button">
													<strong>BACK</strong>
												</button>
											</Link>
											<Link to={this.state.formValid ? '/LaunchPad4' : '#'}>
												<button
													disabled={!this.state.formValid}
													placement="right"
													className="launch-button"
													onClick={this.nextPage}
												>
													<strong>NEXT</strong>
												</button>
											</Link>
										</ButtonToolbar>
									</form>
								</div>
							</div>
						</div>
					</div>
				</main>
			</section>
		);
	}
}
LaunchPad3.propTypes = {
	// profile: PropTypes.object.isRequired,
	// errors: PropTypes.object.isRequired
	setReduxValue1: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	//
});

export default connect(mapStateToProps, { setReduxValue1 })(withRouter(LaunchPad3));
