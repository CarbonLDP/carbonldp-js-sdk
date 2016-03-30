export const namespace:string = "http://www.w3.org/2001/vcard-rdf/3.0#";

export class Predicate {
	static get email():string { return namespace + "email"; }
}
