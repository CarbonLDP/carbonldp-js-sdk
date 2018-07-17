import SockJS from "sockjs-client";
import * as webstomp from "webstomp-client";

import { DocumentsContext } from "../Context/DocumentsContext";

import { IllegalStateError } from "../Errors/IllegalStateError";

import { FreeResources } from "../FreeResources/FreeResources";

import { JSONLDParser } from "../JSONLD/JSONLDParser";

import { RDFNode } from "../RDF/Node";

import { UUIDUtils } from "../Utils";

import { EventMessage } from "./EventMessage";
import { MessagingOptions } from "./MessagingOptions";


const DEFAULT_OPTIONS:Readonly<MessagingOptions> = {
	maxReconnectAttempts: 10,
	reconnectDelay: 1000,
};

interface Subscription {
	id:string;
	errorCallback:( error:Error ) => void;
}

export class MessagingService {
	readonly context:DocumentsContext;

	private _options:MessagingOptions;
	private _attempts:number;
	private _client?:webstomp.Client;
	private _subscriptionsMap:Map<string, Map<( data:EventMessage ) => void, Subscription>>;
	private _subscriptionsQueue:Function[];

	constructor( context:DocumentsContext ) {
		this.context = context;
		this._subscriptionsQueue = [];
		this._options = DEFAULT_OPTIONS;
	}

	setOptions( options:MessagingOptions ):void {
		this._options = {
			...DEFAULT_OPTIONS,
			...options,
		};
	}

	connect( onConnect?:() => void, onError?:( error:Error ) => void ):void {
		if( this._client ) {
			const error:Error = new IllegalStateError( `The messaging service is already connect${ this._client.connected ? "ed" : "ing"}.` );
			if( onError ) onError( error );
			throw error;
		}

		if( this._subscriptionsMap ) this._subscriptionsMap.clear();
		this.reconnect( onConnect, onError );
	}

	reconnect( onConnect?:() => void, onError:( error:Error ) => void = this.__broadcastError.bind( this ) ):void {
		if( ! this._client ) this._attempts = 0;
		else if( this._client.connected ) this._client.disconnect();
		if( ! this._subscriptionsMap ) this._subscriptionsMap = new Map();

		const sock:SockJS.Socket = new SockJS( this.context.resolve( "/broker" ) );
		this._client = webstomp.over( sock, {
			debug: false,
			heartbeat: false,
		} );

		this._client.connect( {}, () => {
			this._subscriptionsQueue.forEach( callback => callback() );
			this._subscriptionsQueue.length = 0;
			this._attempts = 0;
			if( onConnect ) onConnect();

		}, ( errorFrameOrEvent:webstomp.Frame | CloseEvent ) => {
			const canReconnect:boolean = this._options.maxReconnectAttempts === null || this._options.maxReconnectAttempts >= this._attempts;
			let errorMessage:string;
			if( "reason" in errorFrameOrEvent ) {
				if( canReconnect ) {
					if( ++ this._attempts === 1 ) this.__saveSubscriptions();
					setTimeout( () => this.reconnect( onConnect, onError ), this._options.reconnectDelay );
					return;
				}
				this._client = null;
				this._subscriptionsQueue.length = 0;
				errorMessage = `CloseEventError: ${ errorFrameOrEvent.reason }`;
			} else if( "body" in errorFrameOrEvent ) {
				if( ! this._client.connected && canReconnect ) return;
				errorMessage = `${ errorFrameOrEvent.headers[ "message" ] }: ${ errorFrameOrEvent.body.trim() }`;
			} else {
				errorMessage = `Unknown error: ${ errorFrameOrEvent }`;
			}
			onError( new Error( errorMessage ) );
		} );
	}

	subscribe( destination:string, onEvent:( data:EventMessage ) => void, onError:( error:Error ) => void ):void {
		if( ! this._client ) this.connect();
		if( ! this._subscriptionsMap.has( destination ) ) this._subscriptionsMap.set( destination, new Map() );
		const callbacksMap:Map<( data:EventMessage ) => void, Subscription> = this._subscriptionsMap.get( destination );

		if( callbacksMap.has( onEvent ) ) return;
		const subscriptionID:string = UUIDUtils.generate();
		callbacksMap.set( onEvent, {
			id: subscriptionID,
			errorCallback: onError,
		} );

		const subscribeTo:() => void = this.__makeSubscription( subscriptionID, destination, onEvent, onError );
		if( this._client.connected ) return subscribeTo();
		this._subscriptionsQueue.push( subscribeTo );
	}

	unsubscribe( destination:string, onEvent:( data:EventMessage ) => void ):void {
		if( ! this._client || ! this._subscriptionsMap || ! this._subscriptionsMap.has( destination ) ) return;

		const callbackMap:Map<( data:EventMessage ) => void, Subscription> = this._subscriptionsMap.get( destination );
		if( ! callbackMap.has( onEvent ) ) return;

		const subscriptionID:string = callbackMap.get( onEvent ).id;
		callbackMap.delete( onEvent );

		if( callbackMap.size === 0 ) this._subscriptionsMap.delete( destination );

		this._client.unsubscribe( subscriptionID );
	}

	private __broadcastError( error:Error ):void {
		if( ! this._subscriptionsMap ) return;
		this._subscriptionsMap.forEach( callbacksMap => callbacksMap.forEach( subscription => {
			subscription.errorCallback( error );
		} ) );
	}

	private __makeSubscription( id:string, destination:string, eventCallback:( data:EventMessage ) => void, errorCallback:( error:Error ) => void ):() => void {
		return () => this._client.subscribe( destination, message => {
			new JSONLDParser()
				.parse( message.body )
				.then( ( data:RDFNode[] ) => {
					const freeResources:FreeResources = FreeResources
						.parseFreeNodes( this.context.registry, data );

					const eventMessage:EventMessage | undefined = freeResources
						.$getPointers( true )
						.find( EventMessage.is );

					// TODO: Implement specific error
					if( ! eventMessage )
						throw new Error( "No message was returned by the notification." );

					return eventMessage;
				} )
				.then( eventCallback )
				.catch( errorCallback );
		}, { id } );
	}

	private __saveSubscriptions():void {
		if( this._subscriptionsQueue.length || ! this._subscriptionsMap ) return;
		this._subscriptionsMap.forEach( ( callbackMap, destination ) => callbackMap.forEach( ( subscription, eventCallback ) => {
			const subscribeTo:() => void = this.__makeSubscription( subscription.id, destination, eventCallback, subscription.errorCallback );
			this._subscriptionsQueue.push( subscribeTo );
		} ) );
	}

}
