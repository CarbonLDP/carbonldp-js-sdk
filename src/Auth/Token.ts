import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.Token;

export const DEFINITION:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"key": {
		"uri": NS.CS.Predicate.tokenKey,
		"multi": false,
		"literal": true
	},
	"expirationTime": {
		"uri": NS.CS.Predicate.expirationTime,
		"multi": false,
		"literal": true
	}
} );

export interface Class extends RDF.Resource.Class {
	key:string;
	expirationDate:Date;
}

export class Factory extends RDF.Resource.Factory {
	from( object:Array<Object> ):Class[];
	from( object:Object ):Class;
	from( objects:any ):any {
		if( ! Utils.isArray( objects ) ) return this.singleFrom( objects );

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let resource:RDF.Node.Class = <RDF.Node.Class> objects[ i ];
			this.injectBehavior( resource );
		}

		return objects;
	}

	hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return resource.types.indexOf( RDF_CLASS ) !== -1;
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "key" ) &&
			Utils.hasPropertyDefined( resource, "expirationTime" )
		);
	}

	protected injectBehavior( node:Object ):Class {
		let token:Class = <Class> node;
		super.injectBehavior( node );

		if( this.hasClassProperties( token ) ) return token;

		RDF.Resource.Factory.injectDescriptions( token, DEFINITION );

		return token;
	}
}

export let factory:Factory = new Factory();

export default Class;
