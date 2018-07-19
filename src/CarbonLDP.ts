import { hasProtocol } from "sparqler/iri";

import { AccessPoint } from "./AccessPoint/AccessPoint";
import { TransientAccessPoint } from "./AccessPoint/TransientAccessPoint";

import { CarbonLDPSettings } from "./CarbonLDPSettings";

import { AbstractContext } from "./Context/AbstractContext";
import { DocumentsContext } from "./Context/DocumentsContext";
import { DocumentsContextSettings } from "./Context/DocumentsContextSettings";
import { GlobalContext } from "./Context/GlobalContext";

import { Document } from "./Document/Document";

import * as Errors from "./Errors";
import { IllegalArgumentError } from "./Errors/IllegalArgumentError";

import { Fragment } from "./Fragment/Fragment";
import { TransientFragment } from "./Fragment/TransientFragment";

import { FreeResources } from "./FreeResources/FreeResources";

import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as LDP from "./LDP";
import * as LDPatch from "./LDPatch";
import * as Messaging from "./Messaging";

import { ContainerType } from "./ObjectSchema/ContainerType";
import { DigestedObjectSchema } from "./ObjectSchema/DigestedObjectSchema";
import { DigestedObjectSchemaProperty } from "./ObjectSchema/DigestedObjectSchemaProperty";
import { ObjectSchemaDigester } from "./ObjectSchema/ObjectSchemaDigester";
import { ObjectSchemaUtils } from "./ObjectSchema/ObjectSchemaUtils";
import { PointerType } from "./ObjectSchema/PointerType";

import { Pointer } from "./Pointer/Pointer";

import * as RDF from "./RDF";

import { Resource } from "./Resource/Resource";

import * as SHACL from "./SHACL";
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import * as Utils from "./Utils";
import * as Vocabularies from "./Vocabularies";

export class CarbonLDP extends DocumentsContext {

	static AbstractContext:typeof AbstractContext = AbstractContext;
	static AccessPoint:typeof AccessPoint = AccessPoint;
	static TransientAccessPoint:typeof TransientAccessPoint = TransientAccessPoint;
	static Errors:typeof Errors = Errors;
	static FreeResources:typeof FreeResources = FreeResources;
	static HTTP:typeof HTTP = HTTP;
	static JSONLD:typeof JSONLD = JSONLD;
	static LDP:typeof LDP = LDP;
	static LDPatch:typeof LDPatch = LDPatch;
	static Messaging:typeof Messaging = Messaging;
	static Vocabularies:typeof Vocabularies = Vocabularies;
	static ObjectSchemaUtils:typeof ObjectSchemaUtils = ObjectSchemaUtils;
	static ObjectSchemaDigester:typeof ObjectSchemaDigester = ObjectSchemaDigester;
	static DigestedObjectSchemaProperty:typeof DigestedObjectSchemaProperty = DigestedObjectSchemaProperty;
	static PointerType:typeof PointerType = PointerType;
	static ContainerType:typeof ContainerType = ContainerType;
	static DigestedObjectSchema:typeof DigestedObjectSchema = DigestedObjectSchema;
	static Document:typeof Document = Document;
	static Fragment:typeof Fragment = Fragment;
	static TransientFragment:typeof TransientFragment = TransientFragment;
	static Pointer:typeof Pointer = Pointer;
	static RDF:typeof RDF = RDF;
	static TransientResource:typeof Resource = Resource;
	static GlobalContext:typeof GlobalContext = GlobalContext;
	static SHACL:typeof SHACL = SHACL;
	static SPARQL:typeof SPARQL = SPARQL;
	static System:typeof System = System;
	static Utils:typeof Utils = Utils;


	static get version():string { return "5.0.0-alpha.1"; }

	// noinspection JSMethodCanBeStatic
	get version():string { return CarbonLDP.version; }

	protected _baseURI:string;

	readonly documents:Document;

	constructor( url:string );
	constructor( settings:CarbonLDPSettings );
	constructor( urlOrSettings:string | CarbonLDPSettings ) {
		super( __getURLFrom( urlOrSettings ) );

		this._settings = {
			vocabulary: "vocabularies/main/#",
			paths: {
				system: {
					slug: ".system/",
					paths: {
						platform: "platform/",
						credentials: "credentials/",
						roles: "roles/",
					},
				},
				users: {
					slug: "users/",
					paths: {
						me: "me/",
					},
				},
			},
		};
		this._extendsSettings( __getSettingsFrom( urlOrSettings ) );

		// Root document
		this.documents = this.registry.getPointer( this._baseURI, true );
	}

	/**
	 * Retrieves the Metadata related to the CarbonLDP Platform.
	 */
	getPlatformMetadata():Promise<System.PlatformMetadata> {
		return Utils.promiseMethod( () => {
			const uri:string = this._resolvePath( "system.platform" );
			return this.documents.get<System.PlatformMetadata>( uri );
		} );
	}

}


function __getURLFrom( this:void, urlOrSettings:string | CarbonLDPSettings ):string {
	return Utils.isString( urlOrSettings ) ?
		__getURLFromString( urlOrSettings ) :
		__getURLFromSettings( urlOrSettings )
		;
}

function __getURLFromString( this:void, url:string ):string {
	if( ! RDF.URI.hasProtocol( url ) )
		throw new IllegalArgumentError( `The URL must contain a valid protocol: "http://", "https://".` );

	if( url.endsWith( "/" ) ) return url;
	return url + "/";
}

function __getURLFromSettings( this:void, settings:CarbonLDPSettings ):string {
	if( ! Utils.isString( settings.host ) )
		throw new IllegalArgumentError( `The settings object must contains a valid host string.` );

	if( hasProtocol( settings.host ) )
		throw new IllegalArgumentError( `The host must not contain a protocol.` );

	if( settings.host.includes( ":" ) )
		throw new IllegalArgumentError( `The host must not contain a port.` );

	const protocol:string = settings.ssl === false ? "http://" : "https://";
	const host:string = settings.host.endsWith( "/" ) ? settings.host.slice( 0, - 1 ) : settings.host;
	const url:string = `${ protocol }${ host }/`;

	if( ! Utils.isNumber( settings.port ) ) return url;
	return url.slice( 0, - 1 ) + `:${ settings.port }/`;
}


function __getSettingsFrom( this:void, urlOrSettings:string | CarbonLDPSettings ):DocumentsContextSettings {
	if( Utils.isString( urlOrSettings ) ) return {};
	return Object.assign( {}, urlOrSettings, { ssl: null, host: null, port: null } );
}
