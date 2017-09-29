import * as Documents from "./Documents";
import * as Auth from "./Auth";
import * as Context from "./Context";
import * as Errors from "./Errors";
import * as LDP from "./LDP";
import * as ObjectSchema from "./ObjectSchema";
import * as ProtectedDocument from "./ProtectedDocument";
import * as RDF from "./RDF";
import * as RDFRepresentation from "./RDFRepresentation";
import * as System from "./System";
import * as SHACL from "./SHACL";

export class Class implements Context.Class {
	auth:Auth.Class;
	documents:Documents.Class;

	get baseURI():string { return ""; }

	get parentContext():Context.Class { return null; }

	protected settings:Map<string, any>;

	protected generalObjectSchema:ObjectSchema.DigestedObjectSchema;
	protected typeObjectSchemaMap:Map<string, ObjectSchema.DigestedObjectSchema>;

	constructor() {
		this.settings = new Map<string, any>();

		this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();

		this.auth = new Auth.Class( this );
		this.documents = new Documents.Class( this );

		this.registerDefaultObjectSchemas();
	}

	resolve( relativeURI:string ):string {
		return relativeURI;
	}

	/**
	 * Resolve the URI provided in the scope of the system container of a Carbon LDP.
	 *
	 * If no `system.container` setting has been set an IllegalStateError will be thrown.
	 * If the URI provided is outside the system container an IllegalArgumentError will be thrown.
	 *
	 * @param relativeURI Relative URI to be resolved.
	 * @returns The absolute URI that has been resolved.
	 */
	resolveSystemURI( relativeURI:string ):string {
		if( ! this.hasSetting( "system.container" ) ) throw new Errors.IllegalStateError( `The "system.container" setting hasn't been defined.` );
		const systemContainer:string = this.resolve( this.getSetting( "system.container" ) );

		const systemURI:string = RDF.URI.Util.resolve( systemContainer, relativeURI );
		if( ! systemURI.startsWith( systemContainer ) ) throw new Errors.IllegalArgumentError( `The provided URI "${ relativeURI }" doesn't belong to the system container of your Carbon LDP.` );

		return systemURI;
	}

	hasSetting( name:string ):boolean {
		return ( this.settings.has( name ) )
			|| ( ! ! this.parentContext && this.parentContext.hasSetting( name ) );
	}

	getSetting( name:string ):any {
		if( this.settings.has( name ) ) return this.settings.get( name );
		if( this.parentContext && this.parentContext.hasSetting( name ) ) return this.parentContext.getSetting( name );
		return null;
	}

	setSetting( name:string, value:any ):void {
		this.settings.set( name, value );
	}

	deleteSetting( name:string ):void {
		this.settings.delete( name );
	}

	hasObjectSchema( type:string ):boolean {
		type = this.resolveTypeURI( type );
		if( this.typeObjectSchemaMap.has( type ) ) return true;
		return ! ! this.parentContext && this.parentContext.hasObjectSchema( type );
	}

	getObjectSchema( type:string = null ):ObjectSchema.DigestedObjectSchema {
		if( ! ! type ) {
			// Type specific schema
			type = this.resolveTypeURI( type );
			if( this.typeObjectSchemaMap.has( type ) ) return this.typeObjectSchemaMap.get( type );
			if( ! ! this.parentContext && this.parentContext.hasObjectSchema( type ) ) return this.parentContext.getObjectSchema( type );

			return null;
		} else {
			// General schema
			if( ! ! this.generalObjectSchema ) return this.generalObjectSchema;
			if( ! ! this.parentContext ) return this.parentContext.getObjectSchema();

			throw new Errors.IllegalStateError();
		}
	}

	extendObjectSchema( type:string, objectSchema:ObjectSchema.Class ):void;
	extendObjectSchema( objectSchema:ObjectSchema.Class ):void;
	extendObjectSchema( typeOrObjectSchema:any, objectSchema:ObjectSchema.Class = null ):void {
		let type:string = objectSchema ? typeOrObjectSchema : null;
		objectSchema = ! ! objectSchema ? objectSchema : typeOrObjectSchema;
		let digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( objectSchema );

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
			type = this.resolveTypeURI( type );
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
			new ObjectSchema.DigestedObjectSchema(),
			digestedSchemaToExtend,
			digestedSchema,
		] );
	}

	protected extendTypeObjectSchema( digestedSchema:ObjectSchema.DigestedObjectSchema, type:string ):void {
		type = this.resolveTypeURI( type );
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

		// TODO: carbonldp-platform.private#198
		this.extendObjectSchema( /*SHACL.ValidationReport.RDF_CLASS,*/ SHACL.ValidationReport.SCHEMA );
	}

	private resolveTypeURI( uri:string ):string {
		if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let schema:ObjectSchema.DigestedObjectSchema = this.getObjectSchema();
		let vocab:string;
		if( this.hasSetting( "vocabulary" ) ) vocab = this.resolve( this.getSetting( "vocabulary" ) );


		if( RDF.URI.Util.isPrefixed( uri ) ) {
			uri = ObjectSchema.Digester.resolvePrefixedURI( uri, schema );
		} else if( vocab ) {
			uri = vocab + uri;
		}

		return uri;
	}
}

export const instance:Class = new Class();

export default instance;
