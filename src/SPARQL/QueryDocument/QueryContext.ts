import * as AbstractContext from "../../AbstractContext";
import * as QueryProperty from "./QueryProperty";
import * as QueryVariable from "./QueryVariable";

export class Class {
	protected _context:AbstractContext.Class;
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

	compactIRI( iri:string ):string {
		// TODO: Implement
		return iri;
	}

}

export default Class;
