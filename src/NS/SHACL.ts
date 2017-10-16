export const namespace:string = "http://www.w3.org/ns/shacl#";

export class Class {
	static get ValidationReport():string { return namespace + "ValidationReport"; }

	static get ValidationResult():string { return namespace + "ValidationResult"; }
}

export class Predicate {
	static get conforms():string { return namespace + "conforms"; }

	static get detail():string { return namespace + "detail"; }

	static get focusNode():string { return namespace + "focusNode"; }

	static get result():string { return namespace + "result"; }

	static get resultMessage():string { return namespace + "resultMessage"; }

	static get resultPath():string { return namespace + "resultPath"; }

	static get resultSeverity():string { return namespace + "resultSeverity"; }

	static get shapesGraphWellFormed():string { return namespace + "shapesGraphWellFormed"; }

	static get sourceConstraintComponent():string { return namespace + "sourceConstraintComponent"; }

	static get sourceShape():string { return namespace + "sourceShape"; }

	static get value():string { return namespace + "value"; }
}
