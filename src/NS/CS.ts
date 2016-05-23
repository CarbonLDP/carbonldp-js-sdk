const namespace:string = "https://carbonldp.com/ns/v1/security#";

class Class {
	static get AccessControlEntry():string { return namespace + "AccessControlEntry"; }
	static get AccessControlList():string { return namespace + "AccessControlList"; }
	static get Agent():string { return namespace + "Agent"; }
	static get AllOrigins():string { return namespace + "AllOrigins"; }
	static get Application():string { return namespace + "Application"; }
	static get Token():string { return namespace + "Token"; }
}

class Predicate {
	static get accessControlEntry():string { return namespace + "accessControlEntry"; }
	static get accessControlList():string { return namespace + "accessControlList"; }
	static get accessTo():string { return namespace + "accessTo"; }
	static get allowsOrigin():string { return namespace + "allowsOrigin"; }
	static get description():string { return namespace + "description"; }
	static get expirationTime():string { return namespace + "expirationTime"; }
	static get granting():string { return namespace + "granting"; }
	static get inheritableEntry():string { return namespace + "inheritableEntry"; }
	static get namae():string { return namespace + "name"; }
	static get password():string { return namespace + "password"; }
	static get permission():string { return namespace + "permission"; }
	static get rootContainer():string { return namespace + "rootContainer"; }
	static get subject():string { return namespace + "subject"; }
	static get subjectClass():string { return namespace + "subjectClass"; }
	static get tokenKey():string { return namespace + "tokenKey"; }
}

export {
	namespace,
	Class,
	Predicate
};
