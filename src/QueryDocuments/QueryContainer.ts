import { IRIResolver } from "sparqler/data";
import { isPrefixed } from "sparqler/iri";
import { DeniableFluentPath, FluentPath, FluentPathContainer } from "sparqler/patterns";
import { IRIRefToken, IRIToken, PrefixToken } from "sparqler/tokens";

import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";
import { ObjectSchemaProperty } from "../ObjectSchema/ObjectSchemaProperty";
import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { QueryRootProperty } from "./QueryRootProperty";
import { QueryRootPropertyType } from "./QueryRootPropertyType";
import { QueryVariable } from "./QueryVariable";


/**
 * Container of the query data specialized with elements for the custom querying of documents.
 */
export class QueryContainer extends FluentPathContainer<undefined> {
	readonly context:AbstractContext<RegisteredPointer, any, any>;
	readonly _queryProperty:QueryRootProperty;

	private readonly _generalSchema:DigestedObjectSchema;
	private readonly _prefixesTuples:[ string, string ][];

	private readonly _variablesMap:Map<string, QueryVariable>;
	private _variablesCounter:number;


	constructor( context:AbstractContext<any, any, any>, propertyData:{ rootPropertyType:QueryRootPropertyType, uri?:string, uris?:string[] } ) {
		const schema:DigestedObjectSchema = context.getObjectSchema();
		super( {
			iriResolver: __createIRIResolver( schema ),
			targetToken: void 0,
			fluentPathFactory: FluentPath.createFrom,
			deniableFluentPathFactory: DeniableFluentPath.createFrom,
		} );

		this.context = context;

		this._generalSchema = schema;
		this._prefixesTuples = Array.from( schema.prefixes );

		this._variablesCounter = 0;
		this._variablesMap = new Map();

		const values:IRIToken[] | undefined = propertyData.uris ?
			propertyData.uris.map( this.compactIRI, this )
			: undefined;

		const containerIRI:IRIToken | undefined = propertyData.uri ?
			this.compactIRI( propertyData.uri )
			: undefined;

		this._queryProperty = new QueryRootProperty( {
			queryContainer: this,
			rootPropertyType: propertyData.rootPropertyType,
			values,
			containerIRI,
		} );
	}


	/**
	 * Returns a variable from the specified name.
	 * If a variable with the same name has already been created, it will be returned.
	 * @param name Name of the variable to get.
	 */
	getVariable( name:string ):QueryVariable {
		if( this._variablesMap.has( name ) )
			return this._variablesMap.get( name )!;

		const variable:QueryVariable = new QueryVariable( name, this._variablesCounter ++ );
		this._variablesMap.set( name, variable );

		return variable;
	}


	/**
	 * Created the minimal form of the specified IRI,
	 * and transform into its corresponding token.
	 * @param iri The iri to compact into a token.
	 */
	compactIRI( iri:string ):IRIToken {
		const compactedIRI:string = this.__getCompactedIRI( iri );
		return this.iriResolver.resolve( compactedIRI );
	}

	protected __getCompactedIRI( iri:string ):string {
		if( isPrefixed( iri ) ) return iri;

		const prefix:[ string, string ] | undefined = this._prefixesTuples
			.find( ( [ , x ] ) => iri.startsWith( x ) );

		if( !prefix ) return iri;

		const [ namespace, prefixIRI ] = prefix;
		return `${ namespace }:${ iri.substr( prefixIRI.length ) }`;
	}


	/**
	 * Returns an array with the used prefixes in all the query.
	 */
	getPrologues():PrefixToken[] {
		return this._prefixesTuples
			.filter( this.__isUsedPrefix, this )
			.map( __createPrefixToken )
			;
	}

	protected __isUsedPrefix( [ namespace, ]:[ string, string ] ):boolean {
		return !!this.iriResolver.prefixes.get( namespace );
	}


	/**
	 * Standardizes the provided property definition using the schema associated of the container.
	 * @param name The name of the property to process.
	 * @param definition The definition of the property to process.
	 */
	digestProperty( name:string, definition:ObjectSchemaProperty ):DigestedObjectSchemaProperty {
		return ObjectSchemaDigester
			.digestProperty( name, definition, this._generalSchema );
	}

	/**
	 * Gets a copy of the associated schema of the container.
	 */
	getGeneralSchema():DigestedObjectSchema {
		return ObjectSchemaDigester
			.combineDigestedObjectSchemas( [ this._generalSchema ] );
	}


	/**
	 * Serializes a value using the specified type and the associated context's serializers.
	 * @param type The type of the value to serialize.
	 * @param value The value to serialize.
	 */
	serializeLiteral( type:string, value:any ):string {
		if( !this.context.jsonldConverter.literalSerializers.has( type ) )
			throw new IllegalArgumentError( `Type "${ type }" hasn't a defined serializer.` );

		return this.context.jsonldConverter
			.literalSerializers
			.get( type )!
			.serialize( value );
	}

}


function __createIRIResolver( schema:DigestedObjectSchema ):IRIResolver {
	const iriResolver:IRIResolver = new IRIResolver( void 0, schema.vocab );

	Array.from( schema.prefixes.keys() )
		.forEach( key => iriResolver.prefixes.set( key, false ) );

	return iriResolver;
}

function __createPrefixToken( [ namespace, iri ]:[ string, string ] ):PrefixToken {
	return new PrefixToken( namespace, new IRIRefToken( iri ) );
}
