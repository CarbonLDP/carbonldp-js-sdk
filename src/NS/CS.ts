const namespace:string = "https://carbonldp.com/ns/v1/security#";

class Class {
	static get Agent():string { return namespace + "Agent"; }

	static get AllOrigins():string { return namespace + "AllOrigins"; }

	static get Application():string { return namespace + "Application"; }

	static get AppRole():string { return namespace + "AppRole"; }

	static get Ticket():string { return namespace + "Ticket"; }
}

class Predicate {
	static get agent():string { return namespace + "agent"; }

	static get allowsOrigin():string { return namespace + "allowsOrigin"; }

	static get childRole():string { return namespace + "childRole"; }

	static get description():string { return namespace + "description"; }

	static get enabled():string { return namespace + "enabled"; }

	static get expirationTime():string { return namespace + "expirationTime"; }

	static get forIRI():string { return namespace + "forIRI"; }

	static get namae():string { return namespace + "name"; }

	static get parentRole():string { return namespace + "parentRole"; }

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
