import { Authenticator } from "./Auth";
import { Context } from "./Context";
import {
	IllegalArgumentError,
	IllegalStateError
} from "./Errors";
import {
	DigestedObjectSchema,
	ObjectSchema,
	ObjectSchemaDigester,
	ObjectSchemaUtils,
} from "./ObjectSchema";
import { Pointer } from "./Pointer";
import { URI } from "./RDF";
import { RegistryService } from "./Registry";
import {
	ContextSettings,
	DocumentPaths,
} from "./Settings";
import {
	isObject,
	isString,
} from "./Utils";


export abstract class AbstractContext<M extends Pointer, P extends AbstractContext<any, any>> implements Context {
	abstract readonly registry:RegistryService<M, AbstractContext<M, P>>;
	abstract readonly auth:Authenticator<any> | undefined;

	protected abstract _baseURI:string;
	get baseURI():string { return this._baseURI; }

	protected _parentContext:P | undefined;
	get parentContext():P | undefined { return this._parentContext; }

	protected _settings?:ContextSettings;

	protected _generalObjectSchema?:DigestedObjectSchema;
	protected _typeObjectSchemaMap:Map<string, DigestedObjectSchema>;


	constructor( parentContext?:P ) {
		this._parentContext = parentContext;
		this._typeObjectSchemaMap = new Map<string, DigestedObjectSchema>();
	}


	resolve( relativeURI:string ):string {
		return URI.resolve( this.baseURI, relativeURI );
	}

	/**
	 * Resolves the path provided into an URL using the `path` settings of the context.
	 * If such path does hasn't been declared an IllegalStateError will be thrown.
	 *
	 * Example: The path `system.platform` with the default setting:
	 * ```javascript
	 * {
	 *  paths: {
	 *      system: {
	 *          slug: ".system/",
	 *          paths: { platform: "platform/" }
	 *      }
	 *  }
	 * }```,
	 * This should resolve to something like `https://example.com/.system/platform/`.
	 *
	 * @param path The dot notation string that refers the path declared in the settings
	 * of the context.
	 *
	 * @returns The absolute URI of the path provided.
	 */
	_resolvePath( path:string ):string {
		const leftSearchedPaths:string[] = path.split( "." );
		const currentSearchedPaths:string[] = [];

		let url:string = "";
		let documentPaths:DocumentPaths[ "paths" ] = this._settings && this._settings.paths;
		while( leftSearchedPaths.length ) {
			const containerKey:string = leftSearchedPaths.shift();
			currentSearchedPaths.push( containerKey );

			const containerPath:string | DocumentPaths = documentPaths ? documentPaths[ containerKey ] : null;
			if( ! containerPath ) throw new IllegalStateError( `The path "${ currentSearchedPaths.join( "." ) }" hasn't been declared.` );

			const slug:string = isString( containerPath ) ? containerPath : containerPath.slug;
			if( ! slug ) throw new IllegalStateError( `The path "${ currentSearchedPaths.join( "." ) }" doesn't have a slug set.` );

			url = URI.resolve( url, slug );
			documentPaths = isObject( containerPath ) ? containerPath.paths : null;
		}

		return this.resolve( url );
	}


	hasObjectSchema( type:string ):boolean {
		type = this._resolveTypeURI( type );
		if( this._typeObjectSchemaMap.has( type ) ) return true;
		return ! ! this.parentContext && this.parentContext.hasObjectSchema( type );
	}

	getObjectSchema( type?:string ):DigestedObjectSchema {
		if( ! ! type ) {
			// Type specific schema
			type = this._resolveTypeURI( type );
			if( this._typeObjectSchemaMap.has( type ) ) return this._typeObjectSchemaMap.get( type );
			if( this.parentContext && this.parentContext.hasObjectSchema( type ) ) return this.parentContext.getObjectSchema( type );

			throw new IllegalArgumentError( `"${ type }" hasn't an object schema.` );
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
	extendObjectSchema( objectSchema:ObjectSchema ):this;
	extendObjectSchema( typeOrObjectSchema:any, objectSchema?:ObjectSchema ):this {
		const type:string = objectSchema ? typeOrObjectSchema : null;
		objectSchema = objectSchema ? objectSchema : typeOrObjectSchema;

		const digestedSchema:DigestedObjectSchema = ObjectSchemaDigester.digestSchema( objectSchema );

		if( ! type ) {
			this._extendGeneralSchema( digestedSchema );
		} else {
			this._extendTypeSchema( digestedSchema, type );
		}

		return this;
	}

	clearObjectSchema( type?:string ):void {
		if( ! type ) {
			this._generalObjectSchema = this.parentContext ? null : new DigestedObjectSchema();
		} else {
			type = this._resolveTypeURI( type );
			this._typeObjectSchemaMap.delete( type );
		}
	}

	_getTypeObjectSchemas():DigestedObjectSchema[] {
		const types:string[] = this._getObjectSchemasTypes();
		return types.map( this.getObjectSchema, this );
	}

	protected _getObjectSchemasTypes():string[] {
		const localTypes:string[] = Array.from( this._typeObjectSchemaMap.keys() );

		if( ! this._parentContext ) return localTypes;

		const allTypes:string[] = this._parentContext._getObjectSchemasTypes();
		for( const type of localTypes ) {
			if( allTypes.indexOf( type ) !== - 1 ) continue;
			allTypes.push( type );
		}

		return allTypes;
	}

	protected _extendGeneralSchema( digestedSchema:DigestedObjectSchema ):void {
		let digestedSchemaToExtend:DigestedObjectSchema;
		if( ! ! this._generalObjectSchema ) {
			digestedSchemaToExtend = this._generalObjectSchema;
		} else if( ! ! this.parentContext ) {
			digestedSchemaToExtend = this.parentContext.getObjectSchema();
		} else {
			digestedSchemaToExtend = new DigestedObjectSchema();
		}

		this._generalObjectSchema = ObjectSchemaDigester._combineSchemas( [
			digestedSchemaToExtend,
			digestedSchema,
		] );
	}

	protected _extendTypeSchema( digestedSchema:DigestedObjectSchema, type:string ):void {
		type = this._resolveTypeURI( type );
		let digestedSchemaToExtend:DigestedObjectSchema;

		if( this._typeObjectSchemaMap.has( type ) ) {
			digestedSchemaToExtend = this._typeObjectSchemaMap.get( type );
		} else if( ! ! this.parentContext && this.parentContext.hasObjectSchema( type ) ) {
			digestedSchemaToExtend = this.parentContext.getObjectSchema( type );
		} else {
			digestedSchemaToExtend = new DigestedObjectSchema();
		}

		let extendedDigestedSchema:DigestedObjectSchema = ObjectSchemaDigester.combineDigestedObjectSchemas( [
			digestedSchemaToExtend,
			digestedSchema,
		] );

		this._typeObjectSchemaMap.set( type, extendedDigestedSchema );
	}

	private _resolveTypeURI( uri:string ):string {
		return ObjectSchemaUtils.resolveURI( uri, this.getObjectSchema(), { vocab: true } );
	}
}
