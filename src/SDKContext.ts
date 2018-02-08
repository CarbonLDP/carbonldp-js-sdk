import * as Auth from "./Auth";
import * as Context from "./Context";
import * as Document from "./Document";
import * as Documents from "./Documents";
import * as Errors from "./Errors";
import * as LDP from "./LDP";
import * as Messaging from "./Messaging";
import * as ObjectSchema from "./ObjectSchema";
import * as ProtectedDocument from "./ProtectedDocument";
import * as RDF from "./RDF";
import * as RDFRepresentation from "./RDFRepresentation";
import * as Settings from "./Settings";
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import {
	isObject,
	isString,
} from "./Utils";

export class Class implements Context.Class {
	auth:Auth.Class;
	documents:Documents.Class;

	get baseURI():string { return ""; }

	get parentContext():Context.Class { return null; }

	protected settings:Settings.ContextSettings;

	protected generalObjectSchema:ObjectSchema.DigestedObjectSchema;
	protected typeObjectSchemaMap:Map<string, ObjectSchema.DigestedObjectSchema>;

	constructor() {
		this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();

		this.auth = new Auth.Class( this );
		this.documents = new Documents.Class( this );

		this.registerDefaultObjectSchemas();
	}

	resolve( relativeURI:string ):string {
		return RDF.URI.Util.resolve( this.baseURI, relativeURI );
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
		let documentPaths:Settings.DocumentPaths[ "paths" ] = this.settings && this.settings.paths;
		while( leftSearchedPaths.length ) {
			const containerKey:string = leftSearchedPaths.shift();
			currentSearchedPaths.push( containerKey );

			const containerPath:string | Settings.DocumentPaths = documentPaths ? documentPaths[ containerKey ] : null;
			if( ! containerPath ) throw new Errors.IllegalStateError( `The path "${ currentSearchedPaths.join( "." ) }" hasn't been declared.` );

			const slug:string = isString( containerPath ) ? containerPath : containerPath.slug;
			if( ! slug ) throw new Errors.IllegalStateError( `The path "${ currentSearchedPaths.join( "." ) }" doesn't have a slug set.` );

			url = RDF.URI.Util.resolve( url, slug );
			documentPaths = isObject( containerPath ) ? containerPath.paths : null;
		}

		return this.resolve( url );
	}

	hasObjectSchema( type:string ):boolean {
		type = this._resolveTypeURI( type );
		if( this.typeObjectSchemaMap.has( type ) ) return true;
		return ! ! this.parentContext && this.parentContext.hasObjectSchema( type );
	}

	getObjectSchema( type:string = null ):ObjectSchema.DigestedObjectSchema {
		if( ! ! type ) {
			// Type specific schema
			type = this._resolveTypeURI( type );
			if( this.typeObjectSchemaMap.has( type ) ) return this.typeObjectSchemaMap.get( type );
			if( ! ! this.parentContext && this.parentContext.hasObjectSchema( type ) ) return this.parentContext.getObjectSchema( type );

			return null;
		} else {
			// General schema
			if( ! this.generalObjectSchema && ! this.parentContext )
				throw new Errors.IllegalStateError();

			const generalSchema:ObjectSchema.DigestedObjectSchema = this.generalObjectSchema || this.parentContext.getObjectSchema();
			const clonedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester
				.combineDigestedObjectSchemas( [ generalSchema ] );

			if( clonedSchema.vocab === null && this.settings && this.settings.vocabulary )
				clonedSchema.vocab = this.resolve( this.settings.vocabulary );

			if( ! clonedSchema.base )
				clonedSchema.base = this.baseURI;

			return clonedSchema;
		}
	}

	extendObjectSchema( type:string, objectSchema:ObjectSchema.Class ):void;
	extendObjectSchema( objectSchema:ObjectSchema.Class ):void;
	extendObjectSchema( typeOrObjectSchema:any, objectSchema:ObjectSchema.Class = null ):void {
		const type:string = objectSchema ? typeOrObjectSchema : null;
		objectSchema = ! ! objectSchema ? objectSchema : typeOrObjectSchema;

		const digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( objectSchema );

		if( ! type ) {
			this.extendGeneralObjectSchema( digestedSchema );
		} else {
			this.extendTypeObjectSchema( digestedSchema, type );
		}
	}

	clearObjectSchema( type:string = null ):void {
		if( ! type ) {
			this.generalObjectSchema = ! ! this.parentContext ? null : new ObjectSchema.DigestedObjectSchema();
		} else {
			type = this._resolveTypeURI( type );
			this.typeObjectSchemaMap.delete( type );
		}
	}

	protected extendGeneralObjectSchema( digestedSchema:ObjectSchema.DigestedObjectSchema ):void {
		let digestedSchemaToExtend:ObjectSchema.DigestedObjectSchema;
		if( ! ! this.generalObjectSchema ) {
			digestedSchemaToExtend = this.generalObjectSchema;
		} else if( ! ! this.parentContext ) {
			digestedSchemaToExtend = this.parentContext.getObjectSchema();
		} else {
			digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
		}

		this.generalObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
			digestedSchemaToExtend,
			digestedSchema,
		] );
	}

	protected extendTypeObjectSchema( digestedSchema:ObjectSchema.DigestedObjectSchema, type:string ):void {
		type = this._resolveTypeURI( type );
		let digestedSchemaToExtend:ObjectSchema.DigestedObjectSchema;

		if( this.typeObjectSchemaMap.has( type ) ) {
			digestedSchemaToExtend = this.typeObjectSchemaMap.get( type );
		} else if( ! ! this.parentContext && this.parentContext.hasObjectSchema( type ) ) {
			digestedSchemaToExtend = this.parentContext.getObjectSchema( type );
		} else {
			digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
		}

		let extendedDigestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
			digestedSchemaToExtend,
			digestedSchema,
		] );

		this.typeObjectSchemaMap.set( type, extendedDigestedSchema );
	}

	private registerDefaultObjectSchemas():void {
		this.extendObjectSchema( Document.RDF_CLASS, Document.SCHEMA );
		this.extendObjectSchema( ProtectedDocument.RDF_CLASS, ProtectedDocument.SCHEMA );

		this.extendObjectSchema( System.PlatformMetadata.RDF_CLASS, System.PlatformMetadata.SCHEMA );
		this.extendObjectSchema( System.InstanceMetadata.RDF_CLASS, System.InstanceMetadata.SCHEMA );

		this.extendObjectSchema( RDFRepresentation.RDF_CLASS, RDFRepresentation.SCHEMA );

		this.extendObjectSchema( LDP.Entry.SCHEMA );
		this.extendObjectSchema( LDP.Error.RDF_CLASS, LDP.Error.SCHEMA );
		this.extendObjectSchema( LDP.ErrorResponse.RDF_CLASS, LDP.ErrorResponse.SCHEMA );
		this.extendObjectSchema( LDP.ResponseMetadata.RDF_CLASS, LDP.ResponseMetadata.SCHEMA );
		this.extendObjectSchema( LDP.DocumentMetadata.RDF_CLASS, LDP.DocumentMetadata.SCHEMA );
		this.extendObjectSchema( LDP.AddMemberAction.RDF_CLASS, LDP.AddMemberAction.SCHEMA );
		this.extendObjectSchema( LDP.RemoveMemberAction.RDF_CLASS, LDP.RemoveMemberAction.SCHEMA );
		this.extendObjectSchema( LDP.Map.RDF_CLASS, LDP.Map.SCHEMA );
		this.extendObjectSchema( LDP.ValidationError.RDF_CLASS, LDP.ValidationError.SCHEMA );

		this.extendObjectSchema( Auth.Role.RDF_CLASS, Auth.Role.SCHEMA );
		this.extendObjectSchema( Auth.ACE.RDF_CLASS, Auth.ACE.SCHEMA );
		this.extendObjectSchema( Auth.ACL.RDF_CLASS, Auth.ACL.SCHEMA );
		this.extendObjectSchema( Auth.User.RDF_CLASS, Auth.User.SCHEMA );
		this.extendObjectSchema( Auth.Credentials.RDF_CLASS, Auth.Credentials.SCHEMA );
		this.extendObjectSchema( Auth.Ticket.RDF_CLASS, Auth.Ticket.SCHEMA );
		this.extendObjectSchema( Auth.Token.RDF_CLASS, Auth.Token.SCHEMA );

		this.extendObjectSchema( SHACL.ValidationReport.RDF_CLASS, SHACL.ValidationReport.SCHEMA );
		this.extendObjectSchema( SHACL.ValidationResult.RDF_CLASS, SHACL.ValidationResult.SCHEMA );

		this.extendObjectSchema( SPARQL.QueryDocument.QueryMetadata.RDF_CLASS, SPARQL.QueryDocument.QueryMetadata.SCHEMA );

		this.extendObjectSchema( Messaging.AccessPointCreated.RDF_CLASS, Messaging.AccessPointCreated.SCHEMA );
		this.extendObjectSchema( Messaging.ChildCreated.RDF_CLASS, Messaging.ChildCreated.SCHEMA );
		this.extendObjectSchema( Messaging.DocumentCreatedDetails.RDF_CLASS, Messaging.DocumentCreatedDetails.SCHEMA );
		this.extendObjectSchema( Messaging.DocumentDeleted.RDF_CLASS, Messaging.DocumentDeleted.SCHEMA );
		this.extendObjectSchema( Messaging.DocumentModified.RDF_CLASS, Messaging.DocumentModified.SCHEMA );
		this.extendObjectSchema( Messaging.MemberAdded.RDF_CLASS, Messaging.MemberAdded.SCHEMA );
		this.extendObjectSchema( Messaging.MemberAddedDetails.RDF_CLASS, Messaging.MemberAddedDetails.SCHEMA );
		this.extendObjectSchema( Messaging.MemberRemoved.RDF_CLASS, Messaging.MemberRemoved.SCHEMA );
		this.extendObjectSchema( Messaging.MemberRemovedDetails.RDF_CLASS, Messaging.MemberRemovedDetails.SCHEMA );
	}

	private _resolveTypeURI( uri:string ):string {
		return ObjectSchema.Util.resolveURI( uri, this.getObjectSchema(), { vocab: true } );
	}
}

export const instance:Class = new Class();

export default instance;
