const namespace:string = "https://carbonldp.com/ns/v1/platform#";

class Class {
	static get AccessPoint():string { return namespace + "AccessPoint"; }
	static get API():string { return namespace + "API"; }
	static get VolatileResource():string { return namespace + "VolatileResource"; }
}

class Predicate {
	static get accessPoint():string { return namespace + "accessPoint"; }
	static get buildDate():string { return namespace + "buildDate"; }
	static get created():string { return namespace + "created"; }
	static get modified():string { return namespace + "modified"; }
	static get version():string { return namespace + "version"; }
}

export {
	namespace,
	Class,
	Predicate
};
