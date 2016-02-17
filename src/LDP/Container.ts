/// <reference path="../../typings/typings.d.ts" />

import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as RDFSource from "./RDFSource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.Container;

export const SCHEMA:ObjectSchema.Class = {
	"contains": {
		"@id": NS.LDP.Predicate.contains,
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
};

export interface Class extends RDFSource.Class {
	memberOfRelation:Pointer.Class;
	hasMemberRelation:Pointer.Class;
}

export class Factory {
	hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	hasRDFClass( pointer:Pointer.Class ):boolean;
	hasRDFClass( expandedObject:Object ):boolean;
	hasRDFClass( pointerOrExpandedObject:Object ):boolean {
		let types:string[] = [];
		if( "@type" in pointerOrExpandedObject ) {
			types = pointerOrExpandedObject[ "@type" ];
		} else if( "types" in pointerOrExpandedObject ) {
			// TODO: Use proper class
			let resource:{ types: Pointer.Class[] } = <any> pointerOrExpandedObject;
			types = Pointer.Util.getIDs( resource.types );
		}

		return (
			types.indexOf( RDF_CLASS ) !== - 1 ||
			types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1 ||
			types.indexOf( NS.LDP.Class.DirectContainer ) !== - 1 ||
			types.indexOf( NS.LDP.Class.IndirectContainer ) !== - 1
		);
	}
}

export let factory:Factory = new Factory();

export default Class;
