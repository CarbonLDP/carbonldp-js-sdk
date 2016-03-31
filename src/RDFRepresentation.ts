import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";
import Resource from "./Resource";
import * as HTTP from "./HTTP";

export const RDF_CLASS:string = NS.C.Class.RDFRepresentation;

export const SCHEMA:ObjectSchema.Class = {
	"fileIdentifier": {
		"@id": NS.C.Predicate.fileIdentifier,
		"@type": NS.XSD.DataType.string,
	},
	"mediaType": {
		"@id": NS.C.Predicate.mediaType,
		"@type": NS.XSD.DataType.string,
	},
	"size": {
		"@id": NS.C.Predicate.size,
		"@type": NS.XSD.DataType.long,
	},
};

export interface Class extends PersistedDocument.Class {
	fileIdentifier:string;
	mediaType:string;
	size:number;

	getFile:() => Promise<[ Blob, HTTP.Response.Class ]>;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "fileIdentifier" )
			&& Utils.hasPropertyDefined( object, "mediaType" )
			&& Utils.hasPropertyDefined( object, "size" )
			&& Utils.hasPropertyDefined( object, "getFile" );
	}

	static is( object:Object ):boolean {
		return PersistedDocument.Factory.is( object )
			&& ( <PersistedDocument.Class> object ).types.indexOf( RDF_CLASS ) !== -1
			&& Factory.hasClassProperties( object );
	}

	static decorate<T extends PersistedDocument.Class>( persistedDocument:T ): T & Class {
		if( Factory.hasClassProperties( persistedDocument ) ) return <any> persistedDocument;

		Object.defineProperties( persistedDocument, {
			"getFile": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getFile,
			},
		} );

		return <any> persistedDocument;
	}

	static hasRDFClass( resource:Resource ):boolean;
	static hasRDFClass( expandedObject:Object ):boolean;
	static hasRDFClass( resourceOrExpandedObject:Object ):boolean {
		let types:string[] = [];
		if( "@type" in resourceOrExpandedObject ) {
			types = resourceOrExpandedObject[ "@type" ];
		} else if( "types" in resourceOrExpandedObject ) {
			let resource:Resource = <any> resourceOrExpandedObject;
			types = resource.types;
		}

		return types.indexOf( RDF_CLASS ) !== - 1 ;
	}
}

function getFile():Promise<[ Blob, HTTP.Response.Class ]> {
	let that:Class = ( <Class> this );
	return that._documents.getFile( that );
}

export default Class;
