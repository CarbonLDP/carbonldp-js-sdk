import {
	OptionalToken,
	PatternToken,
	SubjectToken
} from "sparqler/tokens";

import { DigestedObjectSchema } from "../../ObjectSchema";
import * as QueryContext from "./QueryContext";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryVariable from "./QueryVariable";
import {
	createAllPattern,
	createGraphPattern,
	createTypesPattern
} from "./Utils";

export enum PropertyType {
	FULL,
	PARTIAL,
	ALL,
}

export class Class {
	readonly name:string;
	readonly variable:QueryVariable.Class;

	_builder:QueryDocumentBuilder.Class;

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
			const fn:( context:QueryContext.Class, resourcePath:string ) => PatternToken =
				this._type === PropertyType.PARTIAL ? createTypesPattern :
					this._type === PropertyType.FULL ? createGraphPattern : createAllPattern;

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
