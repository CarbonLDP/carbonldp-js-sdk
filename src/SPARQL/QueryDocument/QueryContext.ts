import { isBNodeLabel, isPrefixed } from "sparqler/iri";
import { BlankNodeToken, IRIToken, PatternToken, PrefixedNameToken } from "sparqler/tokens";

import * as AbstractContext from "../../AbstractContext";
import { DigestedObjectSchema, DigestedPropertyDefinition } from "../../ObjectSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryVariable from "./QueryVariable";

export class Class {
	protected _context:AbstractContext.Class;
	get context():AbstractContext.Class { return this._context; }

	protected _propertiesMap:Map<string, QueryProperty.Class>;

	private _variablesCounter:number;
	private _variablesMap:Map<string, QueryVariable.Class>;

	constructor( context:AbstractContext.Class ) {
		this._context = context;
		this._propertiesMap = new Map();

		this._variablesCounter = 0;
		this._variablesMap = new Map();
	}

	getVariable( name:string ):QueryVariable.Class {
		if( this._variablesMap.has( name ) ) return this._variablesMap.get( name );

		const variable:QueryVariable.Class = new QueryVariable.Class( name, this._variablesCounter ++ );
		this._variablesMap.set( name, variable );
		return variable;
	}

	addProperty( name:string, pattern:PatternToken ):QueryProperty.Class {
		const property:QueryProperty.Class = new QueryProperty.Class( this, name, pattern );
		this._propertiesMap.set( name, property );
		return property;
	}

	getProperty( name:string ):QueryProperty.Class {
		if( ! this._propertiesMap.has( name ) ) throw new Error( `The "${ name }" property was not declared.` );
		return this._propertiesMap.get( name );
	}

	serializeLiteral( type:string, value:any ):string {
		type = this.expandIRI( type );

		if( ! this._context.documents.jsonldConverter.literalSerializers.has( type ) ) return "" + value;
		return this._context.documents.jsonldConverter.literalSerializers.get( type ).serialize( value );
	}

	expandIRI( iri:string ):string {
		// TODO: Implement
		return iri;
	}

	compactIRI( iri:string ):IRIToken | PrefixedNameToken {
		// TODO: Implement correctly
		return isPrefixed( iri ) ? new PrefixedNameToken( iri ) : new IRIToken( iri );
	}

	getInheritTypeDefinition( propertyName:string, propertyURI?:string, context:AbstractContext.Class = this._context ):DigestedPropertyDefinition {
		if( context === null ) return null;

		const typeSchemas:DigestedObjectSchema[] = Array.from( context[ "typeObjectSchemaMap" ].values() );
		for( const schema of typeSchemas ) {
			if( ! schema.properties.has( propertyName ) ) continue;
			const digestedProperty:DigestedPropertyDefinition = schema.properties.get( propertyName );

			if( propertyURI && digestedProperty.uri.stringValue !== propertyURI ) continue;
			return digestedProperty;
		}

		return this.getInheritTypeDefinition( propertyName, propertyURI, context.parentContext as AbstractContext.Class );
	}

}

export default Class;
