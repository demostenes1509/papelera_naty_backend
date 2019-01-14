const crypto	= require('crypto');
const password	= 'natalita'; 

module.exports = (text) => {
	const hash = crypto.createHmac('sha256', password)
											.update(text)
											.digest('hex');
	return hash;
}
