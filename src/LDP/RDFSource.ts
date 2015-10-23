import * as NS from './../NS';
import * as RDF from './../RDF';
import * as Utils from './../Utils';

const RDFClass:string = NS.LDP.Class.RDFSource;

interface RDFSource extends RDF.Resource.Class {

}

class Factory extends RDF.Resource.Factory {
	is( object:Object ):boolean {
		//@formatter:off
		return (
			super.is( object ) &&
			(<RDF.Resource.Class> object).types.indexOf( RDFClass ) !== -1
		);
		//@formatter:on
	}

	from( resource:RDF.Node.Class ):RDFSource;
	from( resources:RDF.Node.Class[] ):RDFSource[];
	from( resourceOrResources:any ):any {
		var superResult:(RDF.Resource.Class | RDF.Resource.Class[]) = super.from( resourceOrResources );
		var resources:RDF.Resource.Class[] = Utils.isArray( superResult ) ? <RDF.Resource.Class[]> superResult : <RDF.Resource.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDF.Resource.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <RDFSource[]> resources;
		else return <RDFSource> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDFClass ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	protected injectBehaviour( resource:RDF.Resource.Class ):RDFSource {
		return <RDFSource> resource;
	}
}

var factory = new Factory();

//@formatter:off
export {
	RDFSource as Class,
	Factory,
	factory
};
//@formatter:on