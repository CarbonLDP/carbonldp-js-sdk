import * as APIDescription from "./APIDescription";
import * as Auth from "./Auth";
import Context from "./Context";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as LDP from "./LDP";
import * as NS from "./NS";
import * as PersistedBlankNode from "./PersistedBlankNode";
import * as ProtectedDocument from "./ProtectedDocument";
import * as ObjectSchema from "./ObjectSchema";
import * as Agent from "./Agent";
import * as RDFRepresentation from "./RDFRepresentation";
import * as ErrorResponse from "./LDP/ErrorResponse";
import * as Error from "./LDP/Error";

export class Class implements Context {
	auth:Auth.Class;
	documents:Documents;

	get parentContext():Context { return null; }

	protected settings:Map<string, any>;

	protected generalObjectSchema:ObjectSchema.DigestedObjectSchema;
	protected typeObjectSchemaMap:Map<string, ObjectSchema.DigestedObjectSchema>;

	constructor() {
		this.settings = new Map<string, any>();

		this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();

		this.auth = new Auth.Class( this );
		this.documents = new Documents( this );

		this.registerDefaultObjectSchemas();
	}

	getBaseURI():string {
		return this.resolve( "" );
	}

	resolve( relativeURI:string ):string {
		return relativeURI;
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
		if( this.typeObjectSchemaMap.has( type ) ) return true;
		if( ! ! this.parentContext && this.parentContext.hasObjectSchema( type ) ) return true;

		return false;
	}

	getObjectSchema( type:string = null ):ObjectSchema.DigestedObjectSchema {
		if( ! ! type ) {
			// Type specific schema
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
		let digestedSchemaToExtend:ObjectSchema.DigestedObjectSchema;
		if( this.typeObjectSchemaMap.has( type ) ) {
			digestedSchemaToExtend = this.typeObjectSchemaMap.get( type );
		} else if( ! ! this.parentContext && this.parentContext.hasObjectSchema( type ) ) {
			digestedSchemaToExtend = this.parentContext.getObjectSchema( type );
		} else {
			digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
		}

		let extendedDigestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas( [
			new ObjectSchema.DigestedObjectSchema(),
			digestedSchemaToExtend,
			digestedSchema,
		] );

		this.typeObjectSchemaMap.set( type, extendedDigestedSchema );
	}

	private registerDefaultObjectSchemas():void {
		this.extendObjectSchema( PersistedBlankNode.SCHEMA );

		this.extendObjectSchema( ProtectedDocument.RDF_CLASS, ProtectedDocument.SCHEMA );

		this.extendObjectSchema( RDFRepresentation.RDF_CLASS, RDFRepresentation.SCHEMA );
		this.extendObjectSchema( APIDescription.RDF_CLASS, APIDescription.SCHEMA );
		this.extendObjectSchema( Error.RDF_CLASS, Error.SCHEMA );
		this.extendObjectSchema( ErrorResponse.RDF_CLASS, ErrorResponse.SCHEMA );

		// TODO Fix error of cycle reference because the App module dependency of AbstractClass which has a dependency with SDKContext. For now add manual data
		/* this.extendObjectSchema( App.RDF_CLASS, App.SCHEMA ); */
		this.extendObjectSchema( NS.CS.Class.Application, {
			"name": {
				"@id": NS.CS.Predicate.namae,
				"@type": NS.XSD.DataType.string,
			},
			"description": {
				"@id": NS.CS.Predicate.description,
				"@type": NS.XSD.DataType.string,
			},
			"rootContainer": {
				"@id": NS.CS.Predicate.rootContainer,
				"@type": "@id",
			},
			"allowsOrigins": {
				"@id": NS.CS.Predicate.allowsOrigin,
				"@container": "@set",
			},
		} );

		this.extendObjectSchema( LDP.ResponseMetadata.RDF_CLASS, LDP.ResponseMetadata.SCHEMA );
		this.extendObjectSchema( LDP.ResourceMetadata.RDF_CLASS, LDP.ResourceMetadata.SCHEMA );
		this.extendObjectSchema( LDP.AddMemberAction.RDF_CLASS, LDP.AddMemberAction.SCHEMA );
		this.extendObjectSchema( LDP.RemoveMemberAction.RDF_CLASS, LDP.RemoveMemberAction.SCHEMA );

		this.extendObjectSchema( Auth.ACE.RDF_CLASS, Auth.ACE.SCHEMA );
		this.extendObjectSchema( Auth.ACL.RDF_CLASS, Auth.ACL.SCHEMA );
		this.extendObjectSchema( Auth.Ticket.RDF_CLASS, Auth.Ticket.SCHEMA );
		this.extendObjectSchema( Auth.Token.RDF_CLASS, Auth.Token.SCHEMA );

		this.extendObjectSchema( Agent.RDF_CLASS, Agent.SCHEMA );
	}
}

export const instance:Class = new Class();

export default instance;
