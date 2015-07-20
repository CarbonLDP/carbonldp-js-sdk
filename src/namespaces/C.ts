const namespace:string = "http://carbonldp.com/ns/v1/platform#";

class Class {
	static get AccessPoint():string { return namespace + "AccessPoint"; }
}

class Predicate {
	static get accessPoint():string { return namespace + "accessPoint"; }
}

//@formatter:off
export {
	namespace,
	Class,
	Predicate
};
//@formatter:on