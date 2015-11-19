import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.RDFSource;

export interface Class extends RDF.Resource.Class {

}

export class Factory extends RDF.Resource.Factory {
	static hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
				Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
				Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			(<RDF.Resource.Class> object).types.indexOf( RDF_CLASS ) !== -1
		);
	}

	from( resource:RDF.Node.Class ):Class;
	from( resources:RDF.Node.Class[] ):Class[];
	from( resourceOrResources:any ):any {
		let superResult:(RDF.Resource.Class | RDF.Resource.Class[]) = super.from( resourceOrResources );
		let resources:RDF.Resource.Class[] = Utils.isArray( superResult ) ? <RDF.Resource.Class[]> superResult : <RDF.Resource.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:RDF.Resource.Class = resources[ i ];
			if ( ! Factory.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Class[]> resources;
		return <Class> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDF_CLASS ) !== - 1
		);
	}

	protected injectBehaviour( resource:RDF.Resource.Class ):Class {
		return <Class> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
