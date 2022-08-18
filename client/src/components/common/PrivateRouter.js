import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminAddress, authAddress } from '../../config';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			// auth.isAuthenticated === true ? (
			auth.isAuthenticated === true &&
			(Number(authAddress) === Number(window.localStorage.getItem('userAddress')) ||
				Number(adminAddress) === Number(window.localStorage.getItem('userAddress'))) ? (
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
