'use strict';

async function init() {
	try {
		let platform = new CarbonLDP({
			virtualHost: 'dev.carbonldp.com',
			ssl: false,
			host: 'platform-domain.carbonldp.com',
			virtualSsl: false,
		});
		// let platform = new CarbonLDP('http://dev.carbonldp.com/');
		let root = await platform.documents.$get('/');

		let object = {
			name: 'Hi',
		};

		root.$createAndRetrieve(object, 'hi');
		let newDocument = await platform.documents.$createAndRetrieve('/', object, 'hi');
	} catch (error) {
		console.error(error.message);
	}
}
init();
