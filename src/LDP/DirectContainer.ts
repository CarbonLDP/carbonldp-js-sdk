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

		let container:T & Class = <any> object;
		if( ! Document.Factory.is( object ) ) container = <any> Document.Factory.createFrom( object );

		container.types.push( NS.LDP.Class.Container );
		container.types.push( NS.LDP.Class.DirectContainer );

		container.membershipResource = membershipResource;

		if( hasMemberRelation !== null ) {
			container.hasMemberRelation = Pointer.Factory.is( hasMemberRelation ) ? <Pointer.Class> hasMemberRelation : Pointer.Factory.create( <string> hasMemberRelation );
		}

		if( memberOfRelation !== null ) {
			container.memberOfRelation = Pointer.Factory.is( memberOfRelation ) ? <Pointer.Class> memberOfRelation : Pointer.Factory.create( <string> memberOfRelation );
		}

		return container;
	}
}

export default Class;
