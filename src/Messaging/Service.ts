import * as SockJS from "sockjs-client";
import * as webstomp from "webstomp-client";
import { Client, ConnectionHeaders, ExtendedHeaders, Frame } from "webstomp-client";

import Carbon from "../Carbon";
import { IllegalStateError } from "../Errors";
import JSONLDParser from "../JSONLD/Parser";
import RDFNode from "../RDF/Node";
import { UUID } from "../Utils";
import Options from "./Options";

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

export const DEFAULT_OPTIONS:Options = {
	maxReconnectAttempts: 10,
	reconnectDelay: 1000,
};

export interface Subscription {
	id:string;
	errorCallback:( error:Error ) => void;
}

export class Class {

	private context:Carbon;

	private _messagingOptions:Options;
	private _messagingClient?:Client;
	private _subscriptionsMap:Map<string, Map<Function, Subscription>>;
	private _subscriptionsQueue:Function[];

	constructor( context:Carbon ) {
		this.context = context;
		this._subscriptionsMap = new Map();
		this._subscriptionsQueue = [];
		this._messagingOptions = DEFAULT_OPTIONS;
	}

	setOptions( options:Options ):void {
		this._messagingOptions = {
			...DEFAULT_OPTIONS,
			...options,
		};
	}

	connect( onConnect?:() => void, onError?:( error:Error ) => void ):void {
		if( this._messagingClient ) {
			const error:Error = new IllegalStateError( `The messaging service is already connect${ this._messagingClient.connected ? "ed" : "ing"}.` );
			if( onError ) onError( error );
			throw error;
		}

		onError = onError ? onError : ( error:Error ):void => {
			this._subscriptionsMap.forEach( callbacksMap => {
				callbacksMap.forEach( subscription => subscription.errorCallback( error ) );
			} );
		};

		const sock:SockJS.Socket = new SockJS( this.context.resolve( "/broker" ) );
		this._messagingClient = webstomp.over( sock, {
			protocols: webstomp.VERSIONS.supportedProtocols(),
			debug: false,
			heartbeat: false,
			binary: false,
		} );

		this._messagingClient.connect( {}, () => {
			this._subscriptionsQueue.forEach( callback => callback() );
			this._subscriptionsQueue.length = 0;
			if( onConnect ) onConnect();

		}, ( errorFrameOrEvent:Frame | CloseEvent ) => {
			let errorMessage:string;
			if( isCloseError( errorFrameOrEvent ) ) {
				// TODO: Detect connection error to reconnect messaging
				this._messagingClient = null;
				errorMessage = `CloseEventError: ${ errorFrameOrEvent.reason }`;
			} else if( isFrameError( errorFrameOrEvent ) ) {
				errorMessage = `${ errorFrameOrEvent.headers[ "message" ] }: ${ errorFrameOrEvent.body.trim() }`;
			} else {
				errorMessage = `Unknown error: ${ errorFrameOrEvent }`;
			}
			onError( new Error( errorMessage ) );
		} );
	}

	subscribe( destination:string, onEvent:( data:RDFNode[] ) => void, onError:( error:Error ) => void ):void {
		if( ! this._subscriptionsMap.has( destination ) ) this._subscriptionsMap.set( destination, new Map() );
		const callbacksMap:Map<Function, Subscription> = this._subscriptionsMap.get( destination );

		if( callbacksMap.has( onEvent ) ) return;
		const subscriptionID:string = UUID.generate();
		callbacksMap.set( onEvent, {
			id: subscriptionID,
			errorCallback: onError,
		} );

		const subscribeTo:() => void = () => {
			this._messagingClient.subscribe( destination, message => {
				new JSONLDParser()
					.parse( message.body )
					.then( onEvent )
					.catch( onError );
			}, { id: subscriptionID } );
		};

		if( this._messagingClient ) {
			if( this._messagingClient.connected ) return subscribeTo();
		} else {
			this.connect();
		}
		this._subscriptionsQueue.push( subscribeTo );
	}

	unsubscribe( destination:string, onEvent:( data:RDFNode[] ) => void ):void {
		if( ! this._messagingClient || ! this._subscriptionsMap.has( destination ) ) return;

		const callbackMap:Map<Function, Subscription> = this._subscriptionsMap.get( destination );
		if( ! callbackMap.has( onEvent ) ) return;

		const subscriptionID:string = callbackMap.get( onEvent ).id;
		callbackMap.delete( onEvent );

		if( callbackMap.size === 0 ) this._subscriptionsMap.delete( destination );

		this._messagingClient.unsubscribe( subscriptionID );
	}

}

function isCloseError( object:any ):object is CloseEvent {
	return "reason" in object;
}

function isFrameError( object:any ):object is Frame {
	return "body" in object;
}

export default Class;
