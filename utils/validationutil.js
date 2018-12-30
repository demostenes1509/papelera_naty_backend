const ValidationError = require('./exceptions/ValidationError');

module.exports = {

    notEmptyValidation : (req,fields) => {
        for(const field of fields) {
            req.assert(field, `${field} is required`).notEmpty();
        }

        const valerrors = req.validationErrors();
		if(valerrors) {
			throw new ValidationError(valerrors);
		}        
    }
}