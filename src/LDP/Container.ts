import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

import * as RDFSource from "./RDFSource";

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
	memberOfRelation:Pointer.Class;
	hasMemberRelation:Pointer.Class;
}

export class Factory {
	static hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
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
