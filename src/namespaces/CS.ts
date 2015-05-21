const namespace:string = "http://carbonldp.com/ns/v1/security#";

class Class {
	static get Application():string { return namespace + "Application"; }
}

class Predicate {
	static get contains():string { return namespace + "contains"; }

	static get rootContainer():string { return namespace + "rootContainer"; }
}

//@formatter:off
export {
	namespace,
	Class,
	Predicate
};
//@formatter:on