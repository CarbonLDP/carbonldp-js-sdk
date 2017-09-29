export const namespace:string = "http://www.w3.org/ns/shacl#";

export class Class {
	static get ValidationReport():string { return namespace + "ValidationReport"; }
}

export class Predicate {
	static get conforms():string { return namespace + "conforms"; }

	static get result():string { return namespace + "result"; }

	static get shapesGraphWellFormed():string { return namespace + "shapesGraphWellFormed"; }
}
