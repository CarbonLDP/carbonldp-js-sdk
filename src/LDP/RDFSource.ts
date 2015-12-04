import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.RDFSource;

export interface Class extends RDF.Resource.Class {

}

export class Injector extends RDF.AbstractInjector<Class> {
	constructor() {
		super( RDF_CLASS, [ RDF.Resource.factory ] );
	}

	hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	is( object:Object ):boolean {
		return (
			this.hasRDFClass( <RDF.Resource.Class> object )
		);
	}
}

export let injector:Injector = new Injector();

export default Class;
