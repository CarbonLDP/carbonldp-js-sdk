export class ValueTypes {
	static get URI():string { return "uri"; }
	static get LITERAL():string { return "literal"; }
	static get BNODE():string { return "bnode"; }
}

export interface BindingObject {
	[ name:string ]:BindingProperty;
}

export interface BindingProperty {
	"type":string;
	"value":string;
	"datatype"?:string;
	"xml:lang"?:string;
}

export interface Class {
	"head":{ "vars":string[], "links"?:string[] };
	"results"?:{
		"bindings":BindingObject[],
	};
	"boolean"?:boolean;
}

export default Class;
