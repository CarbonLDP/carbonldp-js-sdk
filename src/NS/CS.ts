const namespace:string = "https://carbonldp.com/ns/v1/security#";

class Class {
	static get AccessControlEntry():string { return namespace + "AccessControlEntry"; }

	static get AccessControlList():string { return namespace + "AccessControlList"; }

	static get Agent():string { return namespace + "Agent"; }

	static get AllOrigins():string { return namespace + "AllOrigins"; }

	static get CreateAccessPoint():string { return namespace + "CreateAccessPoint"; }

	static get CreateChild():string { return namespace + "CreateChild"; }

	static get Delete():string { return namespace + "Delete"; }

	static get Download():string { return namespace + "Download"; }

	static get Extend():string { return namespace + "Extend"; }

	static get ManageSecurity():string { return namespace + "ManageSecurity"; }

	static get ProtectedDocument():string { return namespace + "ProtectedDocument"; }

	static get Read():string { return namespace + "Read"; }

	static get RemoveMember():string { return namespace + "RemoveMember"; }

	static get Role():string { return namespace + "Role"; }

	static get Ticket():string { return namespace + "Ticket"; }

	static get Token():string { return namespace + "Token"; }

	static get Update():string { return namespace + "Update"; }

	static get Upload():string { return namespace + "Upload"; }
}

class Predicate {
	static get accessControlEntry():string { return namespace + "accessControlEntry"; }

	static get accessControlList():string { return namespace + "accessControlList"; }

	static get accessTo():string { return namespace + "accessTo"; }

	static get agent():string { return namespace + "agent"; }

	static get allowsOrigin():string { return namespace + "allowsOrigin"; }

	static get childRole():string { return namespace + "childRole"; }

	static get credentialsOf():string { return namespace + "credentialsOf"; }

	static get description():string { return namespace + "description"; }

	static get enabled():string { return namespace + "enabled"; }

	static get expirationTime():string { return namespace + "expirationTime"; }

	static get forIRI():string { return namespace + "forIRI"; }

	static get granting():string { return namespace + "granting"; }

	static get inheritableEntry():string { return namespace + "inheritableEntry"; }

	static get namae():string { return namespace + "name"; }

	static get parentRole():string { return namespace + "parentRole"; }

	static get password():string { return namespace + "password"; }

	static get permission():string { return namespace + "permission"; }

	static get rootContainer():string { return namespace + "rootContainer"; }

	static get subject():string { return namespace + "subject"; }

	static get subjectClass():string { return namespace + "subjectClass"; }

	static get ticketKey():string { return namespace + "ticketKey"; }

	static get tokenKey():string { return namespace + "tokenKey"; }
}

export {
	namespace,
	Class,
	Predicate
};
