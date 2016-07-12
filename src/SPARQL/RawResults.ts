import * as Utils from "./../Utils";

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
	"head":{ "vars"?:string[], "links"?:string[] };
	"results"?:{
		"bindings":BindingObject[],
	};
	"boolean"?:boolean;
}

export class Factory {
	static hasClassProperties( value:Object ):boolean {
		return (
			Utils.hasPropertyDefined( value, "head" )
		);
	}

	static is( value:any ):boolean {
		return (
			Utils.isObject( value ) &&
			Factory.hasClassProperties( value )
		);
	}
}

export default Class;
