import IllegalArgumentError from "./Errors/IllegalArgumentError";
import * as ObjectSchema from "./ObjectSchema";
import * as XSD from "./NS/XSD";
import {hasPropertyDefined} from "./Utils";
import * as URI from "./RDF/URI";

export interface Class {
	orderBy?:OrderByProperty[];
	limit?:number;
	offset?:number;
}

const allowedTypes:string[] = [ "numeric", "string", "boolean", "dateTime" ];

export interface OrderByProperty {
	"@id":string;
	"@type"?:"numeric" | "string" | "boolean" | "dateTime";
	"@language"?:string;
}


export class Factory {
	static is( object:Object ):boolean {
		return hasPropertyDefined( object, "orderBy" )
			|| hasPropertyDefined( object, "limit" )
			|| hasPropertyDefined( object, "offset" );
	}
}

export class Util {

	static stringifyRetrievalPreferences( retrievalPreferences:Class, digestedSchema?:ObjectSchema.DigestedObjectSchema ):string {
		let stringPreferences:string = "";

		if( "limit" in retrievalPreferences ) {
			stringPreferences += `limit=${ retrievalPreferences.limit }`;
		}

		if( "offset" in retrievalPreferences ) {
			stringPreferences += `${ stringPreferences ? "&" : "" }offset=${ retrievalPreferences.offset }`;
		}

		if( "orderBy" in retrievalPreferences && retrievalPreferences.orderBy.length > 0 ) {
			stringPreferences += `${ stringPreferences ? "&" : "" }orderBy=`;
			let stringOrders:string[] = [];

			for( let orderBy of retrievalPreferences.orderBy ) {
				let stringOrder:string = "";

				if( "@id" in orderBy ) {
					let id:string = orderBy[ "@id" ];
					let descending:boolean = false;
					if( id.startsWith( "-" ) ) {
						descending = true;
						id = id.substr( 1 );
					}

					if( ! ! digestedSchema && URI.Util.isRelative( id ) ) {
						id = ObjectSchema.Digester.resolvePrefixedURI( new URI.Class( id ), digestedSchema ).stringValue;
						if( ! ! digestedSchema.vocab ) id = URI.Util.resolve( digestedSchema.vocab, id );
					}

					stringOrder += `${ descending ? "-" : "" }<${ encodeURI( id ).replace( "#", "%23" ) }>`;
				}

				if( "@type" in orderBy ) {
					if( ! stringOrder ) throw new IllegalArgumentError( "The @id property is missing in OrderBy property." );

					let type:string = orderBy[ "@type" ];
					if( allowedTypes.indexOf( type ) === - 1 ) throw new IllegalArgumentError( "The @type value specified is not valid." );

					if( type !== "numeric" ) type = `<${ encodeURI( XSD.DataType[ type ] ).replace( "#", "%23" ) }>`;
					stringOrder += `;${ type }`;
				}

				if( "@language" in orderBy ) {
					if( ! stringOrder ) throw new IllegalArgumentError( "The @id property is missing in OrderBy property." );
					stringOrder += `;${ orderBy[ "@language" ] }`;
				}

				stringOrders.push( stringOrder );
			}

			stringPreferences += stringOrders.join( "," );
		}

		return stringPreferences ? "?" + stringPreferences : stringPreferences;
	}

}

export default Class;
