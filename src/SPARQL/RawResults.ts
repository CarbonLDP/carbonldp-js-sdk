/**
 * Interface that represents every entry of a {@link SPARQLRawBindingObject}.
 */
export interface SPARQLRawBindingProperty {
	/**
	 * The type of binding property, it could be `uri`, `literal` or `bnode`.
	 */
	"type":string;
	/**
	 * The string value of binding property.
	 */
	"value":string;
	/**
	 * The URI of the type of the binding property.
	 * This is only present when the property is of type `literal`.
	 */
	"datatype"?:string;
	/**
	 * If the property is a `literal` and of data type `xsd:string`, this property indicates if it has an specific language.
	 */
	"xml:lang"?:string;
}

/**
 * Interface that represents the raw response of a SPARQL query.
 */
export interface SPARQLRawBindingObject {
	/**
	 * An entry of every `vars` requested as the `name` variable, containing the binding property with its value.
	 */
	[ name:string ]:SPARQLRawBindingProperty;
}

/**
 * Interface that represents the raw response of a SPARQL query.
 */
export interface SPARQLRawResults {
	/**
	 * Contains an array `vars` with the possible elements inside the results bindings properties.
	 * This can also contains an array `link`, that contains URI to further information about the results.
	 */
	"head":{ "vars"?:string[], "links"?:string[] };
	/**
	 * The bound results of a `SELECT` query.
	 */
	"results"?:{
		"bindings":SPARQLRawBindingObject[],
	};
	/**
	 * The result of an `ASK` query.
	 */
	"boolean"?:boolean;
}
