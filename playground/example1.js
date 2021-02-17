async function createPerson(instance, name) {
	let person = {
		name: name,
		age: '50',
	};
	return await instance.documents.$createAndRetrieve('/', person, person.name);
}
async function init() {
	try {
		let carbonLDP = new CarbonLDP({
			exposedHost: 'dev.cldp.com',
			ssl: false,
			host: 'platform-domain.cldp.com',
			exposedSsl: false,
		});
		let root = await carbonLDP.documents.$get('/');
		let members = await root.$getMembers();
		debugger;

		// await root.$create('/', project, 'project-1');)
		// createPerson(carbonLDP, 'joe')
		// 	.then((retrieval) => {
		// 		console.log('retrieve:', retrieval);
		// 	})
		// 	.catch((err) => console.error(err));

		// let joe = await carbonLDP.documents.$get('joe/');
		// let resolvedURI = await joe.$resolve('/');
		// console.log('resolved', resolvedURI);
		// joe.age = 60;
		// joe.$save();
	} catch (error) {
		console.error(error);
	}
}

// carbonldp.documents
// 	.$create('/', objectToCreate)
// 	.then((persistedDocument) => {
// 		return persistedDocument.$resolve(); // or $refresh()
// 	})
// 	.then((resolvedDocument) => {
// 		console.log(resolvedDocument.$id);
// 	})
// 	.catch((error) => {
// 		console.error(error.message);
// 	});
init();
