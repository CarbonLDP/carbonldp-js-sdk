import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import SDKContext from "./../SDKContext";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.CS.Class.Token;

export const CONTEXT:ObjectSchema.Class = {
	"key": {
		"@id": NS.CS.Predicate.tokenKey,
		"@type": NS.XSD.DataType.string,
	},
	"expirationTime": {
		"@id": NS.CS.Predicate.expirationTime,
		"@type": NS.XSD.DataType.dateTime,
	},
};

export interface Class extends Pointer.Class {
	key:string;
	expirationTime:Date;
}

export class Factory {
	static is( value:any ):boolean {
		return (
			Utils.isObject( value ) &&
			Factory.hasClassProperties( value )
		);
	}

	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "key" ) &&
			Utils.hasPropertyDefined( object, "expirationTime" )
		);
	}

	static decorate<T extends Object>( object:T ):T & Class {
		if( this.hasClassProperties( object ) ) return <any> object;

		return <any> object;
	}

	static hasRDFClass( pointer:Pointer.Class ):boolean;
	static hasRDFClass( expandedObject:Object ):boolean;
	static hasRDFClass( pointerOrExpandedObject:Object ):boolean {
		let types:string[] = [];
		if( "@type" in pointerOrExpandedObject ) {
			types = pointerOrExpandedObject[ "@type" ];
		} else if( "types" in pointerOrExpandedObject ) {
			// TODO: Use proper class
			let resource:{ types: Pointer.Class[] } = <any> pointerOrExpandedObject;
			types = Pointer.Util.getIDs( resource.types );
		}

		return types.indexOf( RDF_CLASS ) !== -1;
	}
}

export default Class;
