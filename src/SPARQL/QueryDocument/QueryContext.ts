import { isPrefixed, isRelative } from "sparqler/iri";
import { IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";

import * as Context from "../../Context";
import { DigestedObjectSchema, Resolver, Util as SchemaUtils } from "../../ObjectSchema";
import * as QueryVariable from "./QueryVariable";

export class Class implements Resolver {
	readonly context?:Context.Class;

	private _variablesCounter:number;
	private _variablesMap:Map<string, QueryVariable.Class>;

	private _prefixesMap:Map<string, PrefixToken>;

	constructor( context?:Context.Class ) {
		this.context = context;

		this._variablesCounter = 0;
		this._variablesMap = new Map();

		this._prefixesMap = new Map();
	}

	getVariable( name:string ):QueryVariable.Class {
		if( this._variablesMap.has( name ) ) return this._variablesMap.get( name );

		const variable:QueryVariable.Class = new QueryVariable.Class( name, this._variablesCounter ++ );
		this._variablesMap.set( name, variable );
		return variable;
	}

	serializeLiteral( type:string, value:any ):string {
		type = this.expandIRI( type );

		if( ! this.context || ! this.context.documents.jsonldConverter.literalSerializers.has( type ) ) return "" + value;
		return this.context.documents.jsonldConverter.literalSerializers.get( type ).serialize( value );
	}

	expandIRI( iri:string ):string {
		if( this.context ) {
			const vocab:string = this.context.hasSetting( "vocabulary" ) ? this.context.resolve( this.context.getSetting( "vocabulary" ) ) : void 0;
			iri = SchemaUtils.resolveURI( iri, this.context.getObjectSchema(), vocab );
		}

		if( isPrefixed( iri ) ) throw new Error( `Prefix "${ iri.split( ":" )[ 0 ] }" has not been declared.` );

		return iri;
	}

	compactIRI( iri:string ):IRIToken | PrefixedNameToken {
		if( ! this.context ) {
			if( isPrefixed( iri ) ) throw new Error( `Prefixed iri "${ iri }" is not supported without a context.` );
			if( isRelative( iri ) ) throw new Error( `Relative iri "${ iri }" is not supported without a context.` );
			return new IRIToken( iri );
		}

		const schema:DigestedObjectSchema = this.context.getObjectSchema();

		let namespace:string;
		let localName:string;
		if( ! isPrefixed( iri ) ) {
			for( const [ prefixName, { stringValue: prefixURI } ] of Array.from( schema.prefixes.entries() ) ) {
				if( ! iri.startsWith( prefixURI ) ) continue;
				namespace = prefixName;
				localName = iri.substr( prefixURI.length );
				break;
			}
			if( namespace === void 0 ) return new IRIToken( iri );
		}

		const prefixedName:PrefixedNameToken = new PrefixedNameToken( namespace || iri, localName );

		namespace = prefixedName.namespace;
		if( ! this._prefixesMap.has( namespace ) ) {
			if( ! schema.prefixes.has( namespace ) ) throw new Error( `Prefix "${ namespace }" has not been declared.` );
			const prefixIRI:IRIToken = new IRIToken( schema.prefixes.get( namespace ).stringValue );
			this._prefixesMap.set( namespace, new PrefixToken( namespace, prefixIRI ) );
		}

		return prefixedName;
	}

	getPrologues():PrefixToken[] {
		return Array.from( this._prefixesMap.values() );
	}

	getGeneralSchema():DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.documents.getGeneralSchema();
	}

	getSchemaFor( object:Object, path?:string ):DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.documents.getSchemaFor( object );
	}

}

export default Class;
