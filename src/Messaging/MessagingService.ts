import SockJS from "sockjs-client";
import * as webstomp from "webstomp-client";

import { DocumentsContext } from "../Context/DocumentsContext";

import { IllegalStateError } from "../Errors/IllegalStateError";

import { FreeResources } from "../FreeResources/FreeResources";

import { JSONLDParser } from "../JSONLD/JSONLDParser";
import { RDFDocument } from "../RDF/Document";

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
	errorCallback?:( error:Error ) => void;
}

/**
 * Service that manages the messaging client, connecting and subscriptions.
 */
export class MessagingService {
	readonly context:DocumentsContext;

	private _options:MessagingOptions;
	private _attempts:number;
	private _client?:webstomp.Client;
	private _subscriptionsMap!:Map<string, Map<( data:EventMessage ) => void, Subscription>>;
	private _subscriptionsQueue:Function[];

	constructor( context:DocumentsContext ) {
		this.context = context;

		this._options = DEFAULT_OPTIONS;
		this._attempts = 0;

		this._subscriptionsQueue = [];
	}

	/**
	 * Updates the messaging service options.
	 *
	 * If any property is no defined the default is used:
	 * ```typescript
	 * {
	 *     maxReconnectAttempts: 10,
	 *     reconnectDelay: 1000
	 * }
	 * ```
	 *
	 * @param options The options to be updated.
	 */
	setOptions( options:MessagingOptions ):void {
		this._options = {
			...DEFAULT_OPTIONS,
			...options,
		};
	}

	/**
	 * Connects to the platform's messaging broker.
	 * If the service is already connected, an error will be thrown.
	 * @param onConnect Callback to be invoked when the client has established a connection. It will be invoked again when a reconnection is been executed.
	 * @param onError Callback to be invoked when a error has occurred in the connection or server. If none is provided, the errors will be broadcasted to every connected subscription.
	 */
	connect( onConnect?:() => void, onError?:( error:Error ) => void ):void {
		if( this._client ) {
			const error:Error = new IllegalStateError( `The messaging service is already connect${this._client.connected ? "ed" : "ing"}.` );
			if( onError ) onError( error );
			throw error;
		}

		if( this._subscriptionsMap ) this._subscriptionsMap.clear();
		this.reconnect( onConnect, onError );
	}

	/**
	 * Reconnects the service to the platform broker.
	 * If the service is already connected, it will be closed and opened again.
	 * @param onConnect Callback to be invoked when the client has established a connection. It will be invoked again when a reconnection is been executed.
	 * @param onError Callback to be invoked when a error has occurred in the connection or server. If none is provided, the errors will be broadcasted to every connected subscription.
	 */
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
			const canReconnect:boolean = this._options.maxReconnectAttempts === null || this._options.maxReconnectAttempts! >= this._attempts;
			let errorMessage:string;
			if( "reason" in errorFrameOrEvent ) {
				if( canReconnect ) {
					if( ++ this._attempts === 1 ) this.__saveSubscriptions();
					setTimeout( () => this.reconnect( onConnect, onError ), this._options.reconnectDelay );
					return;
				}
				this._client = undefined;
				this._subscriptionsQueue.length = 0;
				errorMessage = `CloseEventError: ${errorFrameOrEvent.reason}`;
			} else if( "body" in errorFrameOrEvent ) {
				if( ! this._client || ! this._client.connected && canReconnect ) return;
				errorMessage = `${errorFrameOrEvent.headers[ "message" ]}: ${errorFrameOrEvent.body.trim()}`;
			} else {
				errorMessage = `Unknown error: ${errorFrameOrEvent}`;
			}
			onError( new Error( errorMessage ) );
		} );
	}

	/**
	 * Subscribes to the destination provided.
	 * @param destination The destination to subscribe.
	 * @param onEvent Callback to be invoked in every notification and will be provided with the data message of the notification.
	 * @param onError Callback to be invoked when a error has occurred in the subscription.
	 */
	subscribe( destination:string, onEvent:( data:EventMessage ) => void, onError?:( error:Error ) => void ):void {
		if( ! this._client ) this.connect();
		if( ! this._subscriptionsMap.has( destination ) ) this._subscriptionsMap.set( destination, new Map() );
		const callbacksMap:Map<( data:EventMessage ) => void, Subscription> = this._subscriptionsMap.get( destination )!;

		if( callbacksMap.has( onEvent ) ) return;
		const subscriptionID:string = UUIDUtils.generate();
		callbacksMap.set( onEvent, {
			id: subscriptionID,
			errorCallback: onError,
		} );

		const subscribeTo:() => void = this.__makeSubscription( subscriptionID, destination, onEvent, onError );
		if( this._client!.connected ) return subscribeTo();
		this._subscriptionsQueue.push( subscribeTo );
	}

	/**
	 * Removes the subscription set for the specific destination and onEvent callback.
	 * @param destination The destination of the subscription to remove.
	 * @param onEvent Callback used in the subscription to remove.
	 */
	unsubscribe( destination:string, onEvent:( data:EventMessage ) => void ):void {
		if( ! this._client || ! this._subscriptionsMap || ! this._subscriptionsMap.has( destination ) ) return;

		const callbackMap:Map<( data:EventMessage ) => void, Subscription> = this._subscriptionsMap.get( destination )!;
		if( ! callbackMap.has( onEvent ) ) return;

		const subscriptionID:string = callbackMap.get( onEvent )!.id;
		callbackMap.delete( onEvent );

		if( callbackMap.size === 0 ) this._subscriptionsMap.delete( destination );

		this._client.unsubscribe( subscriptionID );
	}

	private __broadcastError( error:Error ):void {
		if( ! this._subscriptionsMap ) return;

		this._subscriptionsMap
			.forEach( callbacksMap => callbacksMap
				.forEach( subscription => {
					// TODO: Warn error not been broadcasted
					if( ! subscription.errorCallback ) return;

					subscription.errorCallback( error );
				} )
			);
	}

	private __makeSubscription( id:string, destination:string, eventCallback:( data:EventMessage ) => void, errorCallback?:( error:Error ) => void ):() => void {
		return () => this._client!.subscribe( destination, message => {
			new JSONLDParser()
				.parse( message.body )
				.then( ( data:object[] ) => {
					const nodes:RDFNode[] = RDFDocument.getResources( data );

					const freeResources:FreeResources = FreeResources
						.parseFreeNodes( this.context.registry, nodes );

					const eventMessage:EventMessage | undefined = freeResources
						.getPointers( true )
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
