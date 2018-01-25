import * as AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Auth from "./Auth";
import * as Document from "./Document";
import * as Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import * as NamedFragment from "./NamedFragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as PersistedResource from "./PersistedResource";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as SDKContext from "./SDKContext";
import * as Settings from "./Settings";
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import * as Utils from "./Utils";

export class Class extends AbstractContext.Class {

	/* tslint:disable: variable-name */
	static AccessPoint:typeof AccessPoint = AccessPoint;
	static Auth:typeof Auth = Auth;
	static Document:typeof Document = Document;
	static Documents:typeof Documents = Documents;
	static Errors:typeof Errors = Errors;
	static Fragment:typeof Fragment = Fragment;
	static HTTP:typeof HTTP = HTTP;
	static JSONLD:typeof JSONLD = JSONLD;
	static LDP:typeof LDP = LDP;
	static LDPatch:typeof LDPatch = LDPatch;
	static Messaging:typeof Messaging = Messaging;
	static NamedFragment:typeof NamedFragment = NamedFragment;
	static NS:typeof NS = NS;
	static ObjectSchema:typeof ObjectSchema = ObjectSchema;
	static PersistedDocument:typeof PersistedDocument = PersistedDocument;
	static PersistedFragment:typeof PersistedFragment = PersistedFragment;
	static PersistedNamedFragment:typeof PersistedNamedFragment = PersistedNamedFragment;
	static PersistedResource:typeof PersistedResource = PersistedResource;
	static Pointer:typeof Pointer = Pointer;
	static RDF:typeof RDF = RDF;
	static Resource:typeof Resource = Resource;
	static SDKContext:typeof SDKContext = SDKContext;
	static Settings:typeof Settings = Settings;
	static SHACL:typeof SHACL = SHACL;
	static SPARQL:typeof SPARQL = SPARQL;
	static System:typeof System = System;
	static Utils:typeof Utils = Utils;

	/* tslint:enable: variable-name */

	static get version():string { return "1.0.0-alpha.9"; }

	// noinspection JSMethodCanBeStatic
	get version():string { return Class.version; }

	protected _baseURI:string;

	messaging:Messaging.Service.Class;

	constructor( domain:string, ssl:boolean = true, settings?:Settings.Class ) {
		super();
		domain = RDF.URI.Util.removeProtocol( domain );
		if( ! domain.endsWith( "/" ) ) domain = domain + "/";
		this._baseURI = ( ssl ? "https://" : "http://" ) + domain;

		settings = settings ? Utils.extend( {}, Settings.defaultSettings, settings ) : Settings.defaultSettings;
		Utils.M.extend( this.settings, Utils.M.from( settings ) );

		this.messaging = new Messaging.Service.Class( this );
	}

	/**
	 * Retrieves the Metadata related to the CarbonLDP Platform.
	 */
	getPlatformMetadata():Promise<System.PlatformMetadata.Class> {
		return this.getDocumentMetadata<System.PlatformMetadata.Class>( "system.platform.metadata" );
	}

	/**
	 * Retrieves the Metadata related to your instance of the Carbon LDP Platform.
	 */
	getInstanceMetadata():Promise<System.InstanceMetadata.Class> {
		return this.getDocumentMetadata<System.InstanceMetadata.Class>( "system.instance.metadata" );
	}

	private getDocumentMetadata<T extends object>( metadataSetting:"system.platform.metadata" | "system.instance.metadata" ):Promise<T> {
		if( ! this.hasSetting( metadataSetting ) )
			return Promise.reject( new Errors.IllegalStateError( `The "${ metadataSetting }" setting hasn't been defined.` ) );

		return Promise.resolve()
			.then( () => this.resolveSystemURI( this.getSetting( metadataSetting ) ) )
			.then( metadataURI => this.documents.get<T>( metadataURI ) )
			.then( ( [ metadataDocument ] ) => metadataDocument );
	}
}

export default Class;
