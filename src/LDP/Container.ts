import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDFSource from "./RDFSource";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.Container;

export const SCHEMA:ObjectSchema.Class = {
	"contains": {
		"@id": NS.LDP.Predicate.contains,
		"@container": "@set",
		"@type": "@id",
	},
	"members": {
		"@id": NS.LDP.Predicate.member,
		"@container": "@set",
		"@type": "@id",
	},
	"membershipResource": {
		"@id": NS.LDP.Predicate.membershipResource,
		"@type": "@id",
	},
	"memberOfRelation": {
		"@id": NS.LDP.Predicate.memberOfRelation,
		"@type": "@id",
	},
	"hasMemberRelation": {
		"@id": NS.LDP.Predicate.hasMemberRelation,
		"@type": "@id",
	},
	"insertedContentRelation": {
		"@id": NS.LDP.Predicate.insertedContentRelation,
		"@type": "@id",
	},
};

export interface Class extends RDFSource.Class {
	memberOfRelation?:Pointer.Class;
	hasMemberRelation?:Pointer.Class;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "memberOfRelation" ) ||
			Utils.hasPropertyDefined( object, "hasMemberRelation" )
		);
	}

	static decorate<T extends Object>( object:T, hasMemberRelation?:string | Pointer.Class, memberOfRelation?:string | Pointer.Class ):T & Class {
		Resource.Factory.decorate( object );
		let container:T & Class = <any> object;

		hasMemberRelation = hasMemberRelation || container.hasMemberRelation;
		memberOfRelation = memberOfRelation || container.memberOfRelation;

		container.types.push( NS.LDP.Class.Container );

		if( !! hasMemberRelation ) {
			container.hasMemberRelation = Pointer.Factory.is( hasMemberRelation ) ? <Pointer.Class> hasMemberRelation : Pointer.Factory.create( <string> hasMemberRelation );
		}

		if( !! memberOfRelation ) {
			container.memberOfRelation = Pointer.Factory.is( memberOfRelation ) ? <Pointer.Class> memberOfRelation : Pointer.Factory.create( <string> memberOfRelation );
		}
		
		return container;
	}

	static hasRDFClass( resource:Resource.Class ):boolean;
	static hasRDFClass( expandedObject:Object ):boolean;
	static hasRDFClass( resourceOrExpandedObject:Object ):boolean {
		let types:string[] = [];
		if( "@type" in resourceOrExpandedObject ) {
			types = resourceOrExpandedObject[ "@type" ];
		} else if( "types" in resourceOrExpandedObject ) {
			let resource:Resource.Class = <any> resourceOrExpandedObject;
			types = resource.types;
		}

		return (
			types.indexOf( RDF_CLASS ) !== - 1 ||
			types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1 ||
			types.indexOf( NS.LDP.Class.DirectContainer ) !== - 1 ||
			types.indexOf( NS.LDP.Class.IndirectContainer ) !== - 1
		);
	}
}

export default Class;
