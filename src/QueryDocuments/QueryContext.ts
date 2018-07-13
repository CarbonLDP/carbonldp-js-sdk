import { isPrefixed } from "sparqler/iri";
import {
	IRIToken,
	PrefixedNameToken,
	PrefixToken
} from "sparqler/tokens";

import { AbstractContext } from "../Context";
import { IllegalArgumentError } from "../Errors";
import {
	DigestedObjectSchema,
	ObjectSchemaResolver,
} from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { QueryVariable } from "./QueryVariable";


export class QueryContext implements ObjectSchemaResolver {
	readonly context?:AbstractContext<Pointer, any>;

	private _variablesCounter:number;
	private _variablesMap:Map<string, QueryVariable>;

	private _prefixesMap:Map<string, PrefixToken>;

	constructor( context?:AbstractContext<Pointer, any> ) {
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
		if( ! this.context || ! this.context.registry.jsonldConverter.literalSerializers.has( type ) ) return "" + value;
		return this.context.registry.jsonldConverter.literalSerializers.get( type ).serialize( value );
	}

	compactIRI( iri:string ):IRIToken | PrefixedNameToken {
		if( ! this.context ) {
			if( isPrefixed( iri ) ) return new PrefixedNameToken( iri );
			return new IRIToken( iri );
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
			if( namespace === void 0 ) return new IRIToken( iri );
		}

		const prefixedName:PrefixedNameToken = new PrefixedNameToken( namespace || iri, localName );

		namespace = prefixedName.namespace;
		if( ! this._prefixesMap.has( namespace ) ) {
			if( ! schema.prefixes.has( namespace ) ) throw new IllegalArgumentError( `Prefix "${ namespace }" has not been declared.` );
			const prefixIRI:IRIToken = new IRIToken( schema.prefixes.get( namespace ) );
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