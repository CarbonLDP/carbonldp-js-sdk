import { isPrefixed } from "sparqler/iri";
import { IRIRefToken, IRIToken, PrefixedNameToken, PrefixToken } from "sparqler/tokens";

import { AbstractContext } from "../Context/AbstractContext";

import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { QueryVariable } from "./QueryVariable";


export class QueryContext implements ObjectSchemaResolver {
	readonly context?:AbstractContext<Document, Document, any>;

	private _variablesCounter:number;
	private _variablesMap:Map<string, QueryVariable>;

	private _prefixesMap:Map<string, PrefixToken>;

	constructor( context?:AbstractContext<Document, Document, any> ) {
		this.context = context;

		this._variablesCounter = 0;
		this._variablesMap = new Map();

		this._prefixesMap = new Map();
	}

	getVariable( name:string ):QueryVariable {
		if( this._variablesMap.has( name ) ) return this._variablesMap.get( name );

		const variable:QueryVariable = new QueryVariable( name, this._variablesCounter ++ );
		this._variablesMap.set( name, variable );
		return variable;
	}

	serializeLiteral( type:string, value:any ):string {
		if( ! this.context || ! this.context.jsonldConverter.literalSerializers.has( type ) ) return "" + value;
		return this.context.jsonldConverter.literalSerializers.get( type ).serialize( value );
	}

	compactIRI( iri:string ):IRIToken {
		if( ! this.context ) {
			if( isPrefixed( iri ) ) return new PrefixedNameToken( iri );
			return new IRIRefToken( iri );
		}

		const schema:DigestedObjectSchema = this.context.getObjectSchema();

		let namespace:string;
		let localName:string;
		if( ! isPrefixed( iri ) ) {
			for( const [ prefixName, prefixURI ] of Array.from( schema.prefixes.entries() ) ) {
				if( ! iri.startsWith( prefixURI ) ) continue;
				namespace = prefixName;
				localName = iri.substr( prefixURI.length );
				break;
			}
			if( namespace === void 0 ) return new IRIRefToken( iri );
		}

		const prefixedName:PrefixedNameToken = new PrefixedNameToken( namespace || iri, localName );

		namespace = prefixedName.namespace;
		if( ! this._prefixesMap.has( namespace ) ) {
			if( ! schema.prefixes.has( namespace ) ) throw new IllegalArgumentError( `Prefix "${ namespace }" has not been declared.` );
			const prefixIRI:IRIRefToken = new IRIRefToken( schema.prefixes.get( namespace ) );
			this._prefixesMap.set( namespace, new PrefixToken( namespace, prefixIRI ) );
		}

		return prefixedName;
	}

	getPrologues():PrefixToken[] {
		return Array.from( this._prefixesMap.values() );
	}

	getGeneralSchema():DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.registry.getGeneralSchema();
	}

	hasSchemaFor( object:object, path?:string ):boolean {
		if( ! this.context ) return false;
		return this.context.registry.hasSchemaFor( object );
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		if( ! this.context ) return new DigestedObjectSchema();
		return this.context.registry.getSchemaFor( object );
	}

}
