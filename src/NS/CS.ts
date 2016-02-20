const namespace:string = "https://carbonldp.com/ns/v1/security#";

class Class {
	static get Application():string { return namespace + "Application"; }
	static get Token():string { return namespace + "Token"; }
	static get AllOrigins():string { return namespace + "AllOrigins"; }
}

class Predicate {
	static get name():string { return namespace + "name"; }
	static get allowsOrigin():string { return namespace + "allowsOrigin"; }
	static get rootContainer():string { return namespace + "rootContainer"; }
	static get tokenKey():string { return namespace + "tokenKey"; }
	static get expirationTime():string { return namespace + "expirationTime"; }
}

export {
	namespace,
	Class,
	Predicate
};
