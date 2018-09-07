import { IRIResolver } from "sparqler/data";
import { isPrefixed } from "sparqler/iri";
import { DeniableFluentPath, FluentPath, FluentPathContainer } from "sparqler/patterns";
import { IRIRefToken, IRIToken, PrefixToken } from "sparqler/tokens";

import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";

import { QueryProperty2 } from "./QueryProperty2";
import { QueryVariable } from "./QueryVariable";
import { _getMatchDefinition } from "./Utils";


export abstract class QueryContainer extends FluentPathContainer<undefined> implements ObjectSchemaResolver {
	readonly context:AbstractContext<any, any, any>;
	abstract readonly _queryProperty:QueryProperty2;

	private readonly _prefixesTuples:[ string, string ][];

	private readonly _variablesMap:Map<string, QueryVariable>;
	private _variablesCounter:number;

	private _typeSchemas:DigestedObjectSchema[];


	constructor( context:AbstractContext<any, any, any> ) {
		const schema:DigestedObjectSchema = context.getObjectSchema();
		super( {
			iriResolver: __createIRIResolver( schema ),
			targetToken: void 0,
			fluentPathFactory: FluentPath.createFrom,
			deniableFluentPathFactory: DeniableFluentPath.createFrom,
		} );

		this.context = context;
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


	getGeneralSchema():DigestedObjectSchema {
		return this.context.registry.getGeneralSchema();
	}

	hasSchemaFor( object:object, path?:string ):boolean {
		return this.context.registry.hasSchemaFor( object );
	}

	getSchemaFor( object:object, path?:string ):DigestedObjectSchema {
		return this.context.registry.getSchemaFor( object );
	}


	_getInheritDefinition( propertyName:string, propertyURI?:string ):DigestedObjectSchemaProperty {
		for( const schema of this.__getTypeSchemas() ) {
			const definition:DigestedObjectSchemaProperty | undefined =
				_getMatchDefinition( schema, propertyName, propertyURI );

			if( definition ) return definition;
		}
	}

	protected __getTypeSchemas():DigestedObjectSchema[] {
		if( this._typeSchemas ) return this._typeSchemas;

		return this._typeSchemas = this.context
			._getTypeObjectSchemas();
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
