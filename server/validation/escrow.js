const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEscrowInput(data) {
	let errors = {};
	data.escrowAddress = !isEmpty(data.escrowAddress) ? data.escrowAddress : '';

	if (isEmpty(data.escrowAddress)) {
		errors.escrowAddress = 'Address field is required';
	}
	if (
		!Validator.isLength(data.escrowAddress, {
			min: 40
		})
	) {
		errors.escrowAddress = 'Address must be atleast 40 characters';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
