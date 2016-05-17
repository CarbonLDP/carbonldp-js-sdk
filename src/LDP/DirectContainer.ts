import * as Container from "./Container";
import * as Document from "./../Document";
import * as Errors from "./../Errors";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.DirectContainer;

export interface Class extends Container.Class {
	membershipResource:Pointer.Class;
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "membershipResource" )
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

		return types.indexOf( NS.LDP.Class.DirectContainer ) !== - 1;
	}

	static is( object:Object ):boolean {
		return (
			Document.Factory.is( object ) &&
			Factory.hasClassProperties( object ) &&
			Factory.hasRDFClass( object )
		);
	}

	static create( membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, memberOfRelation?:string | Pointer.Class ):Class {
		return Factory.createFrom( {}, membershipResource, hasMemberRelation, memberOfRelation );
	}

	static createFrom<T extends Object>( object:T, membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, memberOfRelation?:string | Pointer.Class ):T & Class {
		if( Factory.is( object ) ) throw new Errors.IllegalArgumentError( "The base object is already a DirectContainer" );
		if( ! membershipResource ) throw new Errors.IllegalArgumentError( "membershipResource cannot be null" );

		if( ! Document.Factory.is( object ) ) object = <any> Document.Factory.createFrom( object );
		let container:T & Class = Container.Factory.decorate( <any> object, hasMemberRelation, memberOfRelation );

		container.types.push( NS.LDP.Class.DirectContainer );
		container.membershipResource = membershipResource;

		return container;
	}
}

export default Class;
