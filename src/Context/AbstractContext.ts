import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { GeneralRepository } from "../GeneralRepository/GeneralRepository";

import { JSONLDConverter } from "../JSONLD/JSONLDConverter";

import { ModelSchema } from "../Model/ModelSchema";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { ObjectSchemaDigester } from "../ObjectSchema/ObjectSchemaDigester";

import { URI } from "../RDF/URI";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { isString } from "../Utils";

import { Context } from "./Context";
import { ContextSettings } from "./ContextSettings";


export abstract class AbstractContext<REGISTRY extends RegisteredPointer = RegisteredPointer, REPOSITORY extends ResolvablePointer = ResolvablePointer, PARENT extends AbstractContext = undefined> implements Context {
	abstract readonly registry:GeneralRegistry<REGISTRY> | undefined;
	abstract readonly repository:GeneralRepository<REPOSITORY> | undefined;

	readonly jsonldConverter:JSONLDConverter;

	protected abstract _baseURI:string;
	get baseURI():string { return this._baseURI; }

	protected readonly _parentContext:PARENT | undefined;
	get parentContext():PARENT | undefined { return this._parentContext; }

	protected _settings?:ContextSettings;

	protected _generalObjectSchema?:DigestedObjectSchema;
	protected _typeObjectSchemaMap:Map<string, DigestedObjectSchema>;


	constructor( parentContext?:PARENT ) {
		this._parentContext = parentContext;
		this._typeObjectSchemaMap = new Map<string, DigestedObjectSchema>();

		this.jsonldConverter = new JSONLDConverter( parentContext && parentContext.jsonldConverter.literalSerializers );
	}


	resolve( relativeURI:string ):string {
		return URI.resolve( this.baseURI, relativeURI );
	}


	hasObjectSchema( type:string ):boolean {
		type = this.__resolveTypeURI( type );
		if( this._typeObjectSchemaMap.has( type ) ) return true;
		return ! ! this.parentContext && this.parentContext.hasObjectSchema( type );
	}


	getObjectSchema( type?:string ):DigestedObjectSchema {
		if( ! ! type ) {
			// Type specific schema
			type = this.__resolveTypeURI( type );
			if( this._typeObjectSchemaMap.has( type ) ) return this._typeObjectSchemaMap.get( type );
			if( this.parentContext && this.parentContext.hasObjectSchema( type ) ) return this.parentContext.getObjectSchema( type );

			throw new IllegalArgumentError( `"${type}" hasn't an object schema.` );
		} else {
			// General schema
			const generalSchema:DigestedObjectSchema = ! this._generalObjectSchema ?
				this.parentContext ?
					this.parentContext.getObjectSchema() :
					new DigestedObjectSchema() :
				ObjectSchemaDigester
					.combineDigestedObjectSchemas( [ this._generalObjectSchema ] )
			;

			if( generalSchema.vocab === void 0 && this._settings && this._settings.vocabulary )
				generalSchema.vocab = this.resolve( this._settings.vocabulary );

			if( ! generalSchema.base )
				generalSchema.base = this.baseURI;

			return generalSchema;
		}
	}


	extendObjectSchema( type:string, objectSchema:ObjectSchema ):this;
	extendObjectSchema( modelSchema:ModelSchema ):this;
	extendObjectSchema( objectSchema:ObjectSchema ):this;
	extendObjectSchema( schemas:(ModelSchema | ObjectSchema)[] ):this;
	extendObjectSchema( objectSchemaOrTypeOrModelSchema:string | ModelSchema | (ModelSchema | ObjectSchema)[] | ObjectSchema, objectSchema?:ObjectSchema ):this {
		if( isString( objectSchemaOrTypeOrModelSchema ) )
			return this.__extendTypeSchema( objectSchema, objectSchemaOrTypeOrModelSchema );

		if( ModelSchema.is( objectSchemaOrTypeOrModelSchema ) )
			return this.__extendTypeSchema( objectSchemaOrTypeOrModelSchema.SCHEMA, objectSchemaOrTypeOrModelSchema.TYPE );

		if( Array.isArray( objectSchemaOrTypeOrModelSchema ) ) {
			objectSchemaOrTypeOrModelSchema.forEach( this.extendObjectSchema, this );
			return this;
		}

		return this.__extendGeneralSchema( objectSchemaOrTypeOrModelSchema );
	}


	clearObjectSchema( type?:string ):void {
		if( type === void 0 ) {
			this._generalObjectSchema = this.parentContext ? null : new DigestedObjectSchema();
		} else {
			type = this.__resolveTypeURI( type );
			this._typeObjectSchemaMap.delete( type );
		}
	}

	_getTypeObjectSchemas( excepts:string[] = [] ):DigestedObjectSchema[] {
		const exceptsSet:Set<string> = new Set( excepts );

		const types:string[] = this
			.__getObjectSchemasTypes()
			.filter( type => ! exceptsSet.has( type ) )
		;

		return types.map( this.getObjectSchema, this );
	}

	protected __getObjectSchemasTypes():string[] {
		const localTypes:string[] = Array.from( this._typeObjectSchemaMap.keys() );

		if( ! this._parentContext ) return localTypes;

		const allTypes:string[] = this._parentContext.__getObjectSchemasTypes();
		for( const type of localTypes ) {
			if( allTypes.indexOf( type ) !== - 1 ) continue;
			allTypes.push( type );
		}

		return allTypes;
	}


	protected __extendGeneralSchema( objectSchema:ObjectSchema ):this {
		const digestedSchemaToExtend:DigestedObjectSchema = this.__getInheritGeneralSchema();

		this._generalObjectSchema = ObjectSchemaDigester._combineSchemas( [
			digestedSchemaToExtend,
			ObjectSchemaDigester.digestSchema( objectSchema ),
		] );

		return this;
	}

	protected __extendTypeSchema( objectSchema:ObjectSchema, type:string ):this {
		type = this.__resolveTypeURI( type );
		const digestedSchemaToExtend:DigestedObjectSchema = this.__getInheritTypeSchema( type );

		const extendedDigestedSchema:DigestedObjectSchema = ObjectSchemaDigester
			.combineDigestedObjectSchemas( [
				digestedSchemaToExtend,
				ObjectSchemaDigester.digestSchema( objectSchema ),
			] );

		this._typeObjectSchemaMap
			.set( type, extendedDigestedSchema );

		return this;
	}


	protected __getInheritGeneralSchema():DigestedObjectSchema {
		if( this._generalObjectSchema )
			return this._generalObjectSchema;

		if( this.parentContext )
			return this.parentContext.getObjectSchema();

		return new DigestedObjectSchema();
	}

	protected __getInheritTypeSchema( type:string ):DigestedObjectSchema {
		if( this._typeObjectSchemaMap.has( type ) )
			return this._typeObjectSchemaMap.get( type );

		if( this.parentContext && this.parentContext.hasObjectSchema( type ) )
			return this.parentContext.getObjectSchema( type );

		return new DigestedObjectSchema();
	}


	private __resolveTypeURI( uri:string ):string {
		return this.getObjectSchema()
			.resolveURI( uri, { vocab: true } );
	}
}
