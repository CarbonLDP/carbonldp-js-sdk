import {
	OptionalToken,
	PatternToken,
	SubjectToken
} from "sparqler/tokens";

import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryVariable from "./QueryVariable";
import {
	createGraphPattern,
	createTypesPattern
} from "./Utils";

export enum PropertyType {
	FULL,
	PARTIAL,
}

export class Class {
	readonly name:string;
	readonly variable:QueryVariable.Class;

	private _context:QueryContext.Class;

	private _optional:boolean;
	private _type?:PropertyType;

	private _patterns:PatternToken[];
	private _schema:DigestedObjectSchema;

	constructor( context:QueryContext.Class, name:string ) {
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
		let patterns:PatternToken[] = this._patterns.slice();

		if( this._type !== void 0 ) {
			const fn:typeof createTypesPattern | typeof createGraphPattern =
				this._type === PropertyType.PARTIAL ? createTypesPattern : createGraphPattern;

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

		this._schema = new DigestedObjectSchema();
		this._schema.vocab = this._context.expandIRI( "" ) || null;

		return this._schema;
	}

	isOptional():boolean {
		return this._optional;
	}

	setOptional( optional:boolean ):this {
		this._optional = optional;
		return this;
	}

	getType():PropertyType {
		return this._type;
	}

	setType( type:PropertyType ):this {
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

export default Class;
