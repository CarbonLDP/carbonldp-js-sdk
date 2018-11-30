import { Pointer } from "../Pointer/Pointer";


/**
 * Entry of a element asked in the SELECT query.
 */
export interface SPARQLBindingObject {
	/**
	 * An entry per every var selected, which contains a parsed value requested.
	 * This element can be from every literal type (`String`, `Number`, `Date`, etc.), to a {@link Pointer} if it's an URI.
	 */
	[ binding:string ]:string | number | boolean | Date | Pointer;
}

/**
 * Interface that represents a parsed response of a SELECT SPARQL query.
 */
export interface SPARQLSelectResults<T = SPARQLBindingObject> {
	/**
	 * Array of strings that contains the names of the elements asked in the query.
	 */
	vars:string[];

	/**
	 * Array with the entries of the parsed elements asked in the query.
	 */
	bindings:T[];
}
