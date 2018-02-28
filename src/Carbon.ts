import { hasProtocol } from "sparqler/iri";

import * as AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as Auth from "./Auth";
import * as BlankNode from "./BlankNode";
import * as Document from "./Document";
import * as Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import * as ModelFactory from "./ModelFactory";
import * as NamedFragment from "./NamedFragment";
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
import * as Vocabularies from "./Vocabularies";

export class Carbon extends AbstractContext.AbstractContext {

	/* tslint:disable: variable-name */
	static AbstractContext:typeof AbstractContext = AbstractContext;
	static AccessPoint:typeof AccessPoint = AccessPoint;
	static Auth:typeof Auth = Auth;
	static BlankNode:typeof BlankNode = BlankNode;
	static Document:typeof Document = Document;
	static Documents:typeof Documents = Documents;
	static Errors:typeof Errors = Errors;
	static Fragment:typeof Fragment = Fragment;
	static HTTP:typeof HTTP = HTTP;
	static JSONLD:typeof JSONLD = JSONLD;
	static LDP:typeof LDP = LDP;
	static LDPatch:typeof LDPatch = LDPatch;
	static Messaging:typeof Messaging = Messaging;
	static ModelFactory:typeof ModelFactory = ModelFactory;
	static NamedFragment:typeof NamedFragment = NamedFragment;
	static Vocabularies:typeof Vocabularies = Vocabularies;
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

	static get version():string { return "1.0.0-alpha.11"; }

	// noinspection JSMethodCanBeStatic
	get version():string { return Carbon.version; }

	protected _baseURI:string;
	protected settings:Settings.ContextSettings = {
		vocabulary: "vocabulary/#",
		paths: {
			system: {
				slug: ".system/",
				paths: {
					platform: "platform/",
					credentials: "credentials/",
					users: "users/",
					roles: "roles/",
				},
			},
		},
	};

	messaging:Messaging.Service.MessagingService;

	constructor( url:string );
	constructor( settings:Settings.CarbonSettings );
	constructor( urlOrSettings:string | Settings.CarbonSettings ) {
		super();

		if( Utils.isString( urlOrSettings ) ) {
			if( ! RDF.URI.Util.hasProtocol( urlOrSettings ) ) throw new Errors.IllegalArgumentError( `The URL must contain a valid protocol: "http://", "https://".` );
			this._baseURI = urlOrSettings;

		} else {
			if( ! Utils.isString( urlOrSettings.host ) ) throw new Errors.IllegalArgumentError( `The settings object must contains a valid host string.` );
			if( hasProtocol( urlOrSettings.host ) ) throw new Errors.IllegalArgumentError( `The host must not contain a protocol.` );
			if( urlOrSettings.host.includes( ":" ) ) throw new Errors.IllegalArgumentError( `The host must not contain a port.` );

			this._baseURI = `${ urlOrSettings.ssl === false ? "http://" : "https://" }${ urlOrSettings.host }`;

			if( Utils.isNumber( urlOrSettings.port ) ) {
				if( this._baseURI.endsWith( "/" ) ) this._baseURI = this._baseURI.slice( 0, - 1 );
				this._baseURI += `:${ urlOrSettings.port }`;
			}

			urlOrSettings.ssl = urlOrSettings.host = urlOrSettings.port = null;
			this.settings = Utils.ObjectUtils.extend( this.settings, urlOrSettings, { objects: true } );
		}

		if( ! this._baseURI.endsWith( "/" ) ) this._baseURI = this._baseURI + "/";

		this.messaging = new Messaging.Service.MessagingService( this );
	}

	/**
	 * Retrieves the Metadata related to the CarbonLDP Platform.
	 */
	getPlatformMetadata():Promise<[ System.PlatformMetadata.Class, HTTP.Response.Response ]> {
		return Utils.promiseMethod( () => {
			const uri:string = this._resolvePath( "system.platform" );
			return this.documents.get<System.PlatformMetadata.Class>( uri );
		} );
	}

}

export default Carbon;
