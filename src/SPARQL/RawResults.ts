export interface SPARQLRawBindingProperty {
	"type":string;
	"value":string;
	"datatype"?:string;
	"xml:lang"?:string;
}

export interface SPARQLRawBindingObject {
	[ name:string ]:SPARQLRawBindingProperty;
}

export interface SPARQLRawResults {
	"head":{ "vars"?:string[], "links"?:string[] };
	"results"?:{
		"bindings":SPARQLRawBindingObject[],
	};
	"boolean"?:boolean;
}

export default SPARQLRawResults;
