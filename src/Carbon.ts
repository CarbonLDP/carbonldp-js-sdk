import * as SockJS from "sockjs-client";
import * as webstomp from "webstomp-client";
import { Client, Frame } from "webstomp-client";

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
import * as SPARQL from "./SPARQL";
import * as System from "./System";
import * as Utils from "./Utils";

// Fix of incorrect webstomp-client typings
declare module "webstomp-client" {
	// noinspection TsLint
	export interface Client {
		connected:boolean;

		connect( headers:ConnectionHeaders, connectCallback:( frame?:Frame ) => any, errorCallback?:( error:Frame | CloseEvent ) => any ):void;
	}

	// noinspection TsLint
	export interface Frame {
		command:string;
		body:string;
		headers:ExtendedHeaders,
	}
}

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
	static SPARQL:typeof SPARQL = SPARQL;
	static System:typeof System = System;
	static Utils:typeof Utils = Utils;

	/* tslint:enable: variable-name */

	static get version():string { return "1.0.0-alpha.1"; }

	// noinspection JSMethodCanBeStatic
	get version():string { return Class.version; }

	protected _baseURI:string;

	protected _messagingOptions?:Messaging.Options;
	protected _messagingClient?:Client;
	get messagingClient():Client { return this._messagingClient; }

	constructor( domain:string, ssl?:boolean, settings?:Settings.Class );
	constructor( domain:string, ssl:boolean = true, settings?:Settings.Class ) {
		super();
		domain = RDF.URI.Util.hasProtocol( domain ) ? RDF.URI.Util.removeProtocol( domain ) : domain;
		domain = Utils.S.endsWith( domain, "/" ) ? domain : domain + "/";
		this._baseURI = ( ssl ? "https://" : "http://" ) + domain;

		settings = settings ? Utils.extend( {}, Settings.defaultSettings, settings ) : Settings.defaultSettings;
		Utils.M.extend( this.settings, Utils.M.from( settings ) );
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

	connectMessaging( options:Messaging.Options, onConnect:() => void, onError?:( error:Error ) => void ):void;
	connectMessaging( onConnect:() => void, onError?:( error:Error ) => void ):void;
	connectMessaging( optionsOrOnConnect:Messaging.Options | ( () => void ), onConnectOrOnError?:( () => void ) | ( ( error:Error ) => void ), onError?:( error:Error ) => void ):void {
		if( ! onError ) onError = onConnectOrOnError;
		if( this._messagingClient ) {
			const error:Error = new Errors.IllegalStateError( "The messaging service is already connected." );
			if( onError ) onError( error );
			throw error;
		}

		this._messagingOptions = {
			maxReconnectAttempts: 10,
			reconnectDelay: 1000,
			...Utils.isObject( optionsOrOnConnect ) ? optionsOrOnConnect : {},
		};

		const onConnect:() => void = Utils.isFunction( optionsOrOnConnect ) ? optionsOrOnConnect : onConnectOrOnError as () => void;
		onError = onConnectOrOnError ? onConnectOrOnError : ( error:Error ):void => {
			// TODO: Broadcast the error
		};

		const sock:SockJS.Socket = new SockJS( this.resolve( "/broker" ) );
		this._messagingClient = webstomp.over( sock, {
			protocols: webstomp.VERSIONS.supportedProtocols(),
			debug: false,
			heartbeat: false,
			binary: false,
		} );
		this._messagingClient.connect( {}, () => {
			onConnect.call( void 0 );
		}, ( errorFrameOrEvent:Frame | CloseEvent ) => {
			let errorMessage:string;
			if( isCloseError( errorFrameOrEvent ) ) {
				// TODO: Detect connection error to reconnect messaging
				this._messagingClient = null;
				errorMessage = `CloseEventError: ${ errorFrameOrEvent.reason }`;
			} else if( isFrameError( errorFrameOrEvent ) ) {
				errorMessage = `${ errorFrameOrEvent.headers[ "message" ]}: ${ errorFrameOrEvent.body.trim() }`;
			} else {
				errorMessage = `Unknown error: ${ errorFrameOrEvent }`;
			}
			onError( new Error( errorMessage ) );
		} );
	}

	private getDocumentMetadata<T>( metadataSetting:"system.platform.metadata" | "system.instance.metadata" ):Promise<T> {
		if( ! this.hasSetting( metadataSetting ) )
			return Promise.reject( new Errors.IllegalStateError( `The "${ metadataSetting }" setting hasn't been defined.` ) );

		return Promise.resolve()
			.then( () => this.resolveSystemURI( this.getSetting( metadataSetting ) ) )
			.then( metadataURI => this.documents.get<T>( metadataURI ) )
			.then( ( [ metadataDocument ] ) => metadataDocument );
	}
}

function isCloseError( object:any ):object is CloseEvent {
	return "reason" in object;
}

function isFrameError( object:any ):object is Frame {
	return "body" in object;
}

export default Class;
