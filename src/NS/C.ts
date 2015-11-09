const namespace:string = "https://carbonldp.com/ns/v1/platform#";

class Class {
	static get AccessPoint():string { return namespace + "AccessPoint"; }
	static get API():string { return namespace + "API"; }
	static get VolatileResource():string { return namespace + "VolatileResource"; }
}

class Predicate {
	static get accessPoint():string { return namespace + "accessPoint"; }
	static get version():string { return namespace + "version"; }
	static get buildDate():string { return namespace + "buildDate"; }
}

export {
	namespace,
	Class,
	Predicate
};
