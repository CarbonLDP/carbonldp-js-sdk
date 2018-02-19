import SockJS from "sockjs-client";
import * as webstomp from "webstomp-client";
import { Client, Frame } from "webstomp-client";

import Carbon from "../Carbon";
import { IllegalStateError } from "../Errors";
import JSONLDParser from "../JSONLD/Parser";
import RDFNode from "../RDF/Node";
import { UUID } from "../Utils";
import * as FreeResources from "./../FreeResources";
import * as Message from "./Message";
import Options from "./Options";

export const DEFAULT_OPTIONS:Options = {
	maxReconnectAttempts: 10,
	reconnectDelay: 1000,
};

interface Subscription {
	id:string;
	errorCallback:( error:Error ) => void;
}

export class Class {

	private context:Carbon;

	private _options:Options;
	private _attempts:number;
	private _client?:Client;
	private _subscriptionsMap:Map<string, Map<( data:Message.Class ) => void, Subscription>>;
	private _subscriptionsQueue:Function[];

	constructor( context:Carbon ) {
		this.context = context;
		this._subscriptionsQueue = [];
		this._options = DEFAULT_OPTIONS;
	}

	setOptions( options:Options ):void {
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

	reconnect( onConnect?:() => void, onError:( error:Error ) => void = this.broadcastError.bind( this ) ):void {
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

		}, ( errorFrameOrEvent:Frame | CloseEvent ) => {
			const canReconnect:boolean = this._options.maxReconnectAttempts === null || this._options.maxReconnectAttempts >= this._attempts;
			let errorMessage:string;
			if( isCloseError( errorFrameOrEvent ) ) {
				if( canReconnect ) {
					if( ++ this._attempts === 1 ) this.storeSubscriptions();
					setTimeout( () => this.reconnect( onConnect, onError ), this._options.reconnectDelay );
					return;
				}
				this._client = null;
				this._subscriptionsQueue.length = 0;
				errorMessage = `CloseEventError: ${ errorFrameOrEvent.reason }`;
			} else if( isFrameError( errorFrameOrEvent ) ) {
				if( ! this._client.connected && canReconnect ) return;
				errorMessage = `${ errorFrameOrEvent.headers[ "message" ] }: ${ errorFrameOrEvent.body.trim() }`;
			} else {
				errorMessage = `Unknown error: ${ errorFrameOrEvent }`;
			}
			onError( new Error( errorMessage ) );
		} );
	}

	subscribe( destination:string, onEvent:( data:Message.Class ) => void, onError:( error:Error ) => void ):void {
		if( ! this._client ) this.connect();
		if( ! this._subscriptionsMap.has( destination ) ) this._subscriptionsMap.set( destination, new Map() );
		const callbacksMap:Map<( data:Message.Class ) => void, Subscription> = this._subscriptionsMap.get( destination );

		if( callbacksMap.has( onEvent ) ) return;
		const subscriptionID:string = UUID.generate();
		callbacksMap.set( onEvent, {
			id: subscriptionID,
			errorCallback: onError,
		} );

		const subscribeTo:() => void = this.makeSubscription( subscriptionID, destination, onEvent, onError );
		if( this._client.connected ) return subscribeTo();
		this._subscriptionsQueue.push( subscribeTo );
	}

	unsubscribe( destination:string, onEvent:( data:Message.Class ) => void ):void {
		if( ! this._client || ! this._subscriptionsMap || ! this._subscriptionsMap.has( destination ) ) return;

		const callbackMap:Map<( data:Message.Class ) => void, Subscription> = this._subscriptionsMap.get( destination );
		if( ! callbackMap.has( onEvent ) ) return;

		const subscriptionID:string = callbackMap.get( onEvent ).id;
		callbackMap.delete( onEvent );

		if( callbackMap.size === 0 ) this._subscriptionsMap.delete( destination );

		this._client.unsubscribe( subscriptionID );
	}

	private broadcastError( error:Error ):void {
		if( ! this._subscriptionsMap ) return;
		this._subscriptionsMap.forEach( callbacksMap => callbacksMap.forEach( subscription => {
			subscription.errorCallback( error );
		} ) );
	}

	private makeSubscription( id:string, destination:string, eventCallback:( data:Message.Class ) => void, errorCallback:( error:Error ) => void ):() => void {
		return () => this._client.subscribe( destination, message => {
			new JSONLDParser()
				.parse( message.body )
				.then( ( data:RDFNode[] ) => {
					const freeResources:FreeResources.Class = this.context.documents._getFreeResources( data );
					return freeResources.getResources().find( Message.Factory.hasClassProperties );
				} )
				.then( eventCallback )
				.catch( errorCallback );
		}, { id } );
	}

	private storeSubscriptions():void {
		if( this._subscriptionsQueue.length || ! this._subscriptionsMap ) return;
		this._subscriptionsMap.forEach( ( callbackMap, destination ) => callbackMap.forEach( ( subscription, eventCallback ) => {
			const subscribeTo:() => void = this.makeSubscription( subscription.id, destination, eventCallback, subscription.errorCallback );
			this._subscriptionsQueue.push( subscribeTo );
		} ) );
	}

}

function isCloseError( object:any ):object is CloseEvent {
	return "reason" in object;
}

function isFrameError( object:any ):object is Frame {
	return "body" in object;
}

export default Class;
