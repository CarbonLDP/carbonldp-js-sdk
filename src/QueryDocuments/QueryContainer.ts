import { IRIResolver } from "sparqler/data";
import { isPrefixed } from "sparqler/iri";
import { DeniableFluentPath, FluentPath, FluentPathContainer } from "sparqler/patterns";
import { IRIRefToken, IRIToken, PrefixToken } from "sparqler/tokens";

import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";
import { ObjectSchemaProperty } from "../ObjectSchema/ObjectSchemaProperty";

import { QueryProperty2 } from "./QueryProperty2";
import { QueryVariable } from "./QueryVariable";


export abstract class QueryContainer extends FluentPathContainer<undefined> {
	readonly context:AbstractContext<any, any, any>;
	abstract readonly _queryProperty:QueryProperty2;

	private readonly _generalSchema:DigestedObjectSchema;
	private readonly _prefixesTuples:[ string, string ][];

	private readonly _variablesMap:Map<string, QueryVariable>;
	private _variablesCounter:number;


	protected constructor( context:AbstractContext<any, any, any> ) {
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
	}


	getVariable( name:string ):QueryVariable {
		if( this._variablesMap.has( name ) )
			return this._variablesMap.get( name );

		const variable:QueryVariable = new QueryVariable( name, this._variablesCounter ++ );
		this._variablesMap.set( name, variable );

		return variable;
	}


	compactIRI( iri:string ):IRIToken {
		const compactedIRI:string = this.__getCompactedIRI( iri );
		return this.iriResolver.resolve( compactedIRI );
	}

	protected __getCompactedIRI( iri:string ):string {
		if( isPrefixed( iri ) ) return iri;

		const prefix:[ string, string ] | undefined = this._prefixesTuples
			.find( ( [ , x ] ) => iri.startsWith( x ) );

		if( ! prefix ) return iri;

		const [ namespace, prefixIRI ] = prefix;
		return `${ namespace }:${ iri.substr( prefixIRI.length ) }`;
	}


	getPrologues():PrefixToken[] {
		return this._prefixesTuples
			.filter( this.__isUsedPrefix, this )
			.map( __createPrefixToken )
			;
	}

	protected __isUsedPrefix( [ namespace, ]:[ string, string ] ):boolean {
		return this.iriResolver.prefixes.get( namespace );
	}


	digestProperty( name:string, definition:ObjectSchemaProperty ):DigestedObjectSchemaProperty {
		return ObjectSchemaDigester
			.digestProperty( name, definition, this._generalSchema );
	}

	getGeneralSchema():DigestedObjectSchema {
		return ObjectSchemaDigester
			.combineDigestedObjectSchemas( [ this._generalSchema ] );
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
