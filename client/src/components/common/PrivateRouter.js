import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authAddress = '0xf282003da9c996c1c3f783afe33e296b8f742ec7';
const authAddress1 = '0x9CfC9B378B9CA8D835cC6BD85655BFa6BE252419';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			auth.isAuthenticated === true &&
			(Number(authAddress) === Number(window.localStorage.getItem('userAddress')) ||
				Number(authAddress1) === Number(window.localStorage.getItem('userAddress'))) ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
