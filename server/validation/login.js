const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
	let errors = {};
	data.password = !isEmpty(data.password) ? data.password : '';

	if (isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (
		!Validator.isLength(data.password, {
			min: 6,
			max: 50
		})
	) {
		errors.password = 'Password must be atleast 6 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
