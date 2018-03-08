import { hasProtocol } from "sparqler/iri";

import { AbstractContext } from "./AbstractContext";
import { AccessPoint } from "./AccessPoint";
import * as Auth from "./Auth";
import { BlankNode } from "./BlankNode";
import { Document } from "./Document";
import { Documents } from "./Documents";
import * as Errors from "./Errors";
import { Fragment } from "./Fragment";
import { FreeResources } from "./FreeResources";
import { PersistedProtectedDocument } from "./PersistedProtectedDocument";
import { ProtectedDocument } from "./ProtectedDocument";
import { ServiceAwareDocument } from "./ServiceAwareDocument";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";
import { NamedFragment } from "./NamedFragment";
import {
	ContainerType,
	DigestedObjectSchema,
	DigestedObjectSchemaProperty,
	ObjectSchemaDigester,
	ObjectSchemaUtils,
	PointerType,
} from "./ObjectSchema";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedFragment } from "./PersistedFragment";
import { PersistedNamedFragment } from "./PersistedNamedFragment";
import { PersistedResource } from "./PersistedResource";
import { Pointer } from "./Pointer";
import * as RDF from "./RDF";
import { Resource } from "./Resource";
import {
	globalContext,
	SDKContext,
} from "./SDKContext";
import {
	CarbonSettings,
	ContextSettings,
} from "./Settings";
import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import * as Utils from "./Utils";
import * as Vocabularies from "./Vocabularies";

export class CarbonLDP extends AbstractContext {

	static AbstractContext:typeof AbstractContext = AbstractContext;
	static AccessPoint:typeof AccessPoint = AccessPoint;
	static Auth:typeof Auth = Auth;
	static BlankNode:typeof BlankNode = BlankNode;
	static Document:typeof Document = Document;
	static Documents:typeof Documents = Documents;
	static Errors:typeof Errors = Errors;
	static Fragment:typeof Fragment = Fragment;
	static FreeResources:typeof FreeResources = FreeResources;
	static HTTP:typeof HTTP = HTTP;
	static JSONLD:typeof JSONLD = JSONLD;
	static LDP:typeof LDP = LDP;
	static LDPatch:typeof LDPatch = LDPatch;
	static Messaging:typeof Messaging = Messaging;
	static NamedFragment:typeof NamedFragment = NamedFragment;
	static Vocabularies:typeof Vocabularies = Vocabularies;
	static ObjectSchemaUtils:typeof ObjectSchemaUtils = ObjectSchemaUtils;
	static ObjectSchemaDigester:typeof ObjectSchemaDigester = ObjectSchemaDigester;
	static DigestedObjectSchemaProperty:typeof DigestedObjectSchemaProperty = DigestedObjectSchemaProperty;
	static PointerType:typeof PointerType = PointerType;
	static ContainerType:typeof ContainerType = ContainerType;
	static DigestedObjectSchema:typeof DigestedObjectSchema = DigestedObjectSchema;
	static PersistedDocument:typeof PersistedDocument = PersistedDocument;
	static PersistedFragment:typeof PersistedFragment = PersistedFragment;
	static PersistedNamedFragment:typeof PersistedNamedFragment = PersistedNamedFragment;
	static PersistedProtectedDocument:typeof PersistedProtectedDocument = PersistedProtectedDocument;
	static PersistedResource:typeof PersistedResource = PersistedResource;
	static Pointer:typeof Pointer = Pointer;
	static ProtectedDocument:typeof ProtectedDocument = ProtectedDocument;
	static RDF:typeof RDF = RDF;
	static Resource:typeof Resource = Resource;
	static SDKContext:typeof SDKContext = SDKContext;
	static globalContext:typeof globalContext = globalContext;
	static ServiceAwareDocument:typeof ServiceAwareDocument = ServiceAwareDocument;
	static SHACL:typeof SHACL = SHACL;
	static SPARQL:typeof SPARQL = SPARQL;
	static System:typeof System = System;
	static Utils:typeof Utils = Utils;


	static get version():string { return "1.0.0-alpha.11"; }

	// noinspection JSMethodCanBeStatic
	get version():string { return CarbonLDP.version; }

	protected _baseURI:string;
	protected settings:ContextSettings = {
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

	messaging:Messaging.MessagingService;

	constructor( url:string );
	constructor( settings:CarbonSettings );
	constructor( urlOrSettings:string | CarbonSettings ) {
		super();

		if( Utils.isString( urlOrSettings ) ) {
			if( ! RDF.URI.hasProtocol( urlOrSettings ) ) throw new Errors.IllegalArgumentError( `The URL must contain a valid protocol: "http://", "https://".` );
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

		this.messaging = new Messaging.MessagingService( this );
	}

	/**
	 * Retrieves the Metadata related to the CarbonLDP Platform.
	 */
	getPlatformMetadata():Promise<[ System.PlatformMetadata, HTTP.Response ]> {
		return Utils.promiseMethod( () => {
			const uri:string = this._resolvePath( "system.platform" );
			return this.documents.get<System.PlatformMetadata>( uri );
		} );
	}

}
