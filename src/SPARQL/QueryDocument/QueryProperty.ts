import {
	OptionalToken,
	PatternToken,
	SubjectToken
} from "sparqler/tokens";

import { DigestedObjectSchema } from "../../ObjectSchema";
import { QueryContext } from "./QueryContext";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import { QueryVariable } from "./QueryVariable";
import {
	createAllPattern,
	createGraphPattern,
	createTypesPattern
} from "./Utils";

export enum QueryPropertyType {
	FULL,
	PARTIAL,
	ALL,
	EMPTY,
}

export class QueryProperty {
	readonly name:string;
	readonly variable:QueryVariable;

	_builder:QueryDocumentBuilder;

	private _context:QueryContext;

	private _optional:boolean;
	private _type?:QueryPropertyType;

	private _patterns:PatternToken[];
	private _schema:DigestedObjectSchema;

	constructor( context:QueryContext, name:string ) {
		this.name = name;
		this.variable = context.getVariable( name );

		this._optional = true;

		this._context = context;
		this._patterns = [];
	}

	addPattern( ...patterns:PatternToken[] ):this {
		this._patterns.push( ...patterns );
		return this;
	}

	getPatterns():PatternToken[] {
		const patterns:PatternToken[] = this._patterns.slice();

		const fn:FunctionPattern = getFunctionPattern( this.getType() );
		if( fn ) {
			const index:number = patterns.findIndex( pattern => pattern === void 0 );
			patterns[ index ] = fn( this._context, this.name );
		}

		if( ! this._optional ) return patterns;

		return [ new OptionalToken()
			.addPattern( ...patterns ),
		];
	}

	getSchema():DigestedObjectSchema {
		if( this._schema ) return this._schema;
		return this._schema = new DigestedObjectSchema();
	}

	isOptional():boolean {
		return this._optional;
	}

	setOptional( optional:boolean ):this {
		this._optional = optional;
		return this;
	}

	getType():QueryPropertyType {
		return this._type;
	}

	setType( type:QueryPropertyType ):this {
		if( this._type === void 0 ) this._patterns.push( void 0 );
		this._type = type;

		return this;
	}

	getTriple():SubjectToken {
		return this._patterns
			.find( pattern => pattern instanceof SubjectToken ) as SubjectToken;
	}

	toString():string {
		return `${ this.variable }`;
	}
}

type FunctionPattern = ( context:QueryContext, resourcePath:string ) => PatternToken;

function getFunctionPattern( type:QueryPropertyType | undefined ):null | FunctionPattern {
	switch( type ) {
		case QueryPropertyType.ALL:
			return createAllPattern;

		case QueryPropertyType.FULL:
			return createGraphPattern;

		case QueryPropertyType.EMPTY:
		case QueryPropertyType.PARTIAL:
			return createTypesPattern;

		default:
			return null;
	}
}
