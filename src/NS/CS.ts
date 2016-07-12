const namespace:string = "https://carbonldp.com/ns/v1/security#";

class Class {
	static get AllOrigins():string { return namespace + "AllOrigins"; }

	static get Agent():string { return namespace + "Agent"; }

	static get Application():string { return namespace + "Application"; }

	static get Ticket():string { return namespace + "Ticket"; }

	static get Token():string { return namespace + "Token"; }
}

class Predicate {
	static get allowsOrigin():string { return namespace + "allowsOrigin"; }

	static get description():string { return namespace + "description"; }

	static get enabled():string { return namespace + "enabled"; }

	static get expirationTime():string { return namespace + "expirationTime"; }

	static get forIRI():string { return namespace + "forIRI"; }

	static get namae():string { return namespace + "name"; }

	static get password():string { return namespace + "password"; }

	static get rootContainer():string { return namespace + "rootContainer"; }

	static get ticketKey():string { return namespace + "ticketKey"; }

	static get tokenKey():string { return namespace + "tokenKey"; }
}

export {
	namespace,
	Class,
	Predicate
};
