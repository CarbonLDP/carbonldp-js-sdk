import { Server } from "mock-socket";
import { Frame } from "webstomp-client";

import { DocumentsContext } from "../Context/DocumentsContext";

import { IllegalStateError } from "../Errors/IllegalStateError";

import { Pointer } from "../Pointer/Pointer";

import { Resource } from "../Resource/Resource";

import { EventMessage } from "./EventMessage";
import { MessagingService } from "./MessagingService";


describe( "MessagingService", () => {

	it( "should exist", () => {
		expect( MessagingService ).toBeDefined();
		expect( MessagingService ).toEqual( jasmine.any( Function ) );
	} );


	let service:MessagingService;
	beforeEach( () => {
		const context:DocumentsContext = new DocumentsContext( "https://example.com" );
		service = new MessagingService( context );
	} );

	describe( "MessagingService.constructor", () => {

		it( "should be instantiable", () => {
			expect( service ).toEqual( jasmine.any( MessagingService ) );
		} );


		it( "should initialize options with the default options", () => {
			expect( service[ "_options" ] ).toBeDefined();
			expect( service[ "_options" ] ).toEqual( {
				maxReconnectAttempts: 10,
				reconnectDelay: 1000,
			} );
		} );

		it( "should initialize subscriptions queue", () => {
			expect( service[ "_subscriptionsQueue" ] ).toBeDefined();
			expect( service[ "_subscriptionsQueue" ] ).toEqual( [] );
		} );

	} );

	describe( "MessagingService.setOptions", () => {

		it( "should exist", () => {
			expect( service.setOptions ).toBeDefined();
			expect( service.setOptions ).toEqual( jasmine.any( Function ) );
		} );


		it( "should use DEFAULT_OPTIONS for undefined properties", () => {
			service.setOptions( {} );
			expect( service[ "_options" ] ).toEqual( {
				maxReconnectAttempts: 10,
				reconnectDelay: 1000,
			} );

			service.setOptions( {
				maxReconnectAttempts: 25,
			} );
			expect( service[ "_options" ] ).toEqual( {
				maxReconnectAttempts: 25,
				reconnectDelay: 1000,
			} );
			service.setOptions( {
				maxReconnectAttempts: null,
			} );
			expect( service[ "_options" ] ).toEqual( {
				maxReconnectAttempts: null,
				reconnectDelay: 1000,
			} );

			service.setOptions( {
				reconnectDelay: 5000,
			} );
			expect( service[ "_options" ] ).toEqual( {
				maxReconnectAttempts: 10,
				reconnectDelay: 5000,
			} );

			service.setOptions( {
				maxReconnectAttempts: 25,
				reconnectDelay: 5000,
			} );
			expect( service[ "_options" ] ).toEqual( {
				maxReconnectAttempts: 25,
				reconnectDelay: 5000,
			} );
		} );

	} );

	describe( "MessagingService.connect", () => {

		it( "should exist", () => {
			expect( service.connect ).toBeDefined();
			expect( service.connect ).toEqual( jasmine.any( Function ) );
		} );


		it( "should call the reconnect method", () => {
			const reconnectSpy:jasmine.Spy = spyOn( service, "reconnect" );

			service.connect();
			expect( reconnectSpy ).toHaveBeenCalledWith( void 0, void 0 );
			reconnectSpy.calls.reset();

			const onConnect:() => void = () => {};
			service.connect( onConnect );
			expect( reconnectSpy ).toHaveBeenCalledWith( onConnect, void 0 );
			reconnectSpy.calls.reset();

			const onError:( error:Error ) => void = () => void 0;
			service.connect( onConnect, onError );
			expect( reconnectSpy ).toHaveBeenCalledWith( onConnect, onError );
		} );

		it( "should initialize the subscription map", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );

			expect( service[ "_subscriptionsMap" ] ).toBeUndefined();

			service.connect();
			expect( service[ "_subscriptionsMap" ] ).toEqual( new Map() );

			mockServer.stop( done );
		} );

		it( "should reset the subscription map", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );

			expect( service[ "_subscriptionsMap" ] ).toBeUndefined();
			service[ "_subscriptionsMap" ] = new Map();
			service[ "_subscriptionsMap" ].set( "topic/*.*", new Map() );

			service.connect();
			expect( service[ "_subscriptionsMap" ] ).toEqual( new Map() );

			mockServer.stop( done );
		} );

		it( "should initialize the connection/reconnection attempts counter", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );

			expect( service[ "_attempts" ] ).toBeUndefined();

			service.connect();
			expect( service[ "_attempts" ] ).toBe( 0 );

			mockServer.stop( done );
		} );

		it( "should reset the connection/reconnection attempts counter", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );

			expect( service[ "_attempts" ] ).toBeUndefined();
			service[ "_attempts" ] = 10;

			service.connect();
			expect( service[ "_attempts" ] ).toBe( 0 );

			mockServer.stop( done );
		} );

		it( "should throw an error when service is already connected", () => {
			service[ "_client" ] = {} as any;
			expect( () => service.connect() ).toThrowError( IllegalStateError, "The messaging service is already connecting." );

			service[ "_client" ] = { connected: true } as any;
			expect( () => service.connect() ).toThrowError( IllegalStateError, "The messaging service is already connected." );
		} );

	} );

	describe( "MessagingService.reconnect", () => {

		it( "should exist", () => {
			expect( service.reconnect ).toBeDefined();
			expect( service.reconnect ).toEqual( jasmine.any( Function ) );
		} );


		it( "should not change the subscription map", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );

			expect( service[ "_subscriptionsMap" ] ).toBeUndefined();

			service.reconnect();
			expect( service[ "_subscriptionsMap" ] ).toEqual( new Map() );

			service[ "_subscriptionsMap" ].set( "/topic/*.*", new Map() );
			service.reconnect();
			expect( service[ "_subscriptionsMap" ] ).toEqual( new Map( [ [ "/topic/*.*", new Map() ] ] ) );

			mockServer.stop( done );
		} );

		it( "should connect to the broker", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );

			service.reconnect( () => {
				expect( service[ "_client" ].connected ).toBe( true );
				mockServer.stop( done );
			}, ( error ) => {
				done.fail( error );
			} );
		} );

		it( "should be able to reconnect automatically", ( done:DoneFn ) => {
			let mockServer:any;

			function connectServer():void {
				mockServer = new Server( "https://example.com/broker" );
				mockServer.on( "connection", server => {
					server.send( Frame.marshall( "CONNECTED", {
						"server": "MockSocket-Server/**",
						"session": "session-1",
						"heart-beat": "0,0",
						"version": "1.2",
					} ) );
				} );
			}

			connectServer();

			let reconnected:boolean = false;
			service.reconnect( () => {
				expect( service[ "_client" ].connected ).toBe( true );
				if( reconnected ) mockServer.stop( done );
				else {
					mockServer.close( {
						code: 1006,
					} );
					expect( service[ "_client" ].connected ).toBe( false );
					connectServer();
					reconnected = true;
				}

			}, ( error ) => {
				done.fail( error );
			} );
		} );

		it( "should still reconnect on maxReconnectAttempts", ( done:DoneFn ) => {
			const maxAttempts:number = 5;
			service.setOptions( {
				reconnectDelay: 1,
				maxReconnectAttempts: maxAttempts,
			} );
			let mockServer:any;

			function connectServer():void {
				mockServer = new Server( "https://example.com/broker" );
				mockServer.on( "connection", server => {
					server.send( Frame.marshall( "CONNECTED", {
						"server": "MockSocket-Server/**",
						"session": "session-1",
						"heart-beat": "0,0",
						"version": "1.2",
					} ) );
				} );
			}

			let reconnected:boolean = false;
			let attempts:number = 0;
			spyOn( service, "reconnect" ).and.callFake( ( ...args:any[] ) => {
				++ attempts;
				if( attempts === 1 || attempts === maxAttempts + 1 ) {
					reconnected = attempts === maxAttempts + 1;
					connectServer();
				} else {
					expect( service[ "_client" ].connected ).toBe( false );
				}

				MessagingService.prototype.reconnect.call( service, ...args );
			} );

			service.reconnect( () => {
				expect( service[ "_client" ].connected ).toBe( true );
				if( reconnected ) mockServer.stop( done );
				else mockServer.close( {
					code: 1006,
				} );

			}, ( error ) => {
				done.fail( error );
			} );
		} );

		it( "should throw error if surpassed the maxReconnectAttempts", ( done:DoneFn ) => {
			const maxAttempts:number = 5;
			service.setOptions( {
				reconnectDelay: 1,
				maxReconnectAttempts: maxAttempts,
			} );
			let mockServer:any;

			function connectServer():void {
				mockServer = new Server( "https://example.com/broker" );
				mockServer.on( "connection", server => {
					server.send( Frame.marshall( "CONNECTED", {
						"server": "MockSocket-Server/**",
						"session": "session-1",
						"heart-beat": "0,0",
						"version": "1.2",
					} ) );
				} );
			}

			let attempts:number = 0;
			spyOn( service, "reconnect" ).and.callFake( ( ...args:any[] ) => {
				++ attempts;
				if( attempts === 1 ) {
					connectServer();
				} else {
					expect( service[ "_client" ].connected ).toBe( false );
				}

				MessagingService.prototype.reconnect.call( service, ...args );
			} );

			let reconnected:boolean = false;
			service.reconnect( () => {
				expect( service[ "_client" ].connected ).toBe( true );

				if( reconnected ) done.fail( "No should be reconnected" );

				mockServer.close( {
					code: 1006,
				} );
				reconnected = true;
			}, ( error ) => {
				expect( error ).toEqual( jasmine.any( Error ) );
				mockServer.stop( done );
			} );
		} );

		it( "should disconnect if already connected", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );
			mockServer.on( "message", ( framesString:string ) => {
				const frame:Frame = Frame.unmarshallSingle( framesString );
				if( frame.command === "CONNECT" ) return;

				expect( frame.command ).toBe( "DISCONNECT" );
			} );

			service.reconnect( () => {
				const previousClient:any = service[ "_client" ];
				expect( service[ "_client" ].connected ).toBe( true );
				service.reconnect( () => {
					expect( previousClient ).not.toBe( service[ "_client" ] );
					mockServer.stop( done );
				} );
			}, ( error ) => {
				done.fail( error );
			} );
		} );

	} );

	describe( "MessagingService.subscribe", () => {

		it( "should exist", () => {
			expect( service.subscribe ).toBeDefined();
			expect( service.subscribe ).toEqual( jasmine.any( Function ) );
		} );


		it( "should be able to subscribe and parse its data", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );
			mockServer.on( "message", ( framesString:string ) => {
				const frames:Frame[] = Frame.unmarshall( framesString ).frames;
				frames.forEach( frame => {
					if( frame.command !== "SUBSCRIBE" ) return;
					mockServer.send( Frame.marshall( "MESSAGE", {
						"subscription": frame.headers.id,
						"destination": "/topic/*.*.some",
						"id": frame.headers.id + "@session-1@@1",
						"redelivered": "false",
						"content-type": "application/json+ld",
					}, `[ {
							"@id": "_:1",
							"@type": [ "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" ],
							"https://carbonldp.com/ns/v1/platform#target": {
								"@id": "https://example.com/created-child/"
							}
						} ]` ) );
				} );
			} );

			service.subscribe( "destination/", ( message:EventMessage ) => {
				expect( service[ "_client" ].connected ).toBe( true );

				expect( message ).toEqual( {
					target: jasmine.any( Object ),
				} as any );

				expect( Resource.is( message ) ).toBe( true );
				expect( message.$id ).toBe( "_:1" );
				expect( message.$hasType( "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" ) ).toBe( true );

				expect( Pointer.is( message.target ) ).toBe( true );
				expect( message.target.$id ).toBe( "https://example.com/created-child/" );

				mockServer.stop( done );
			}, ( error ) => {
				done.fail( error );
			} );
		} );

		it( "should be able add subscriptions in queue until connection is established", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );
			mockServer.on( "message", ( framesString:string ) => {
				const frames:Frame[] = Frame.unmarshall( framesString ).frames;
				frames.forEach( frame => {
					if( frame.command !== "SUBSCRIBE" ) return;
					mockServer.send( Frame.marshall( "MESSAGE", {
						"subscription": frame.headers.id,
						"destination": frame.headers.destination,
						"id": frame.headers.id + "@session-1@@1",
						"redelivered": "false",
						"content-type": "application/json+ld",
					}, `[ {
							"@id": "_:1",
							"@type": [ "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" ],
							"https://carbonldp.com/ns/v1/platform#target": {
								"@id": "https://example.com/created-child-${frame.headers.destination.split( "/" ).reverse()[ 1 ].split( "-" ).reverse()[ 0 ]}/"
							}
						} ]` ) );
				} );
			} );

			function addSubscription( index:number ):void {
				service.subscribe( `/topic/*.*.destination-${index}/`, ( message:EventMessage ) => {
					expect( service[ "_client" ].connected ).toBe( true );

					expect( message ).toEqual( {
						target: jasmine.any( Object ),
					} as any );

					expect( Resource.is( message ) ).toBe( true );
					expect( message.$id ).toBe( "_:1" );
					expect( message.$hasType( "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" ) ).toBe( true );

					expect( Pointer.is( message.target ) ).toBe( true );
					expect( message.target.$id ).toBe( `https://example.com/created-child-${index}/` );

					if( ++ receivedData === 2 ) mockServer.stop( done );
				}, ( error ) => {
					done.fail( error );
				} );
			}

			let receivedData:number = 0;
			addSubscription( 1 );
			expect( service[ "_client" ].connected ).toBe( false );

			addSubscription( 2 );
			expect( service[ "_client" ].connected ).toBe( false );
		} );

		it( "should receive broadcasted errors", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );
			mockServer.on( "message", ( framesString:string ) => {
				const frames:Frame[] = Frame.unmarshall( framesString ).frames;
				frames.forEach( frame => {
					if( frame.command !== "SUBSCRIBE" ) return;
					mockServer.send( Frame.marshall( "ERROR", {
						"message": "Connection closed.",
						"content-length": "0",
					} ) );
				} );
			} );

			function addSubscription( index:number ):void {
				service.subscribe( `/topic/*.*.destination-${index}/`, () => {
					done.fail( "Should not receive successfully any data." );
				}, ( error ) => {
					expect( error ).toEqual( jasmine.any( Error ) );
					expect( error.message ).toContain( "Connection closed" );

					if( ++ receivedData === 2 ) mockServer.stop( done );
				} );
			}

			let receivedData:number = 0;
			addSubscription( 1 );
			addSubscription( 2 );
		} );

		it( "should silently fail when no error callback in broadcasting", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );
			mockServer.on( "message", ( framesString:string ) => {
				const frames:Frame[] = Frame.unmarshall( framesString ).frames;
				frames.forEach( frame => {
					if( frame.command !== "SUBSCRIBE" ) return;
					mockServer.send( Frame.marshall( "ERROR", {
						"message": "Connection closed.",
						"content-length": "0",
					} ) );
				} );
			} );


			try {
				service.subscribe( `/topic/*.*.destination/`, () => {
					done.fail( "Should not receive successfully any data." );
				} );
			} catch( error ) {
				done.fail( "Should not throw an error." );
			}

			mockServer.stop();
			done();
		} );

	} );

	describe( "MessagingService.unsubscribe", () => {

		it( "should exist", () => {
			expect( service.unsubscribe ).toBeDefined();
			expect( service.unsubscribe ).toEqual( jasmine.any( Function ) );
		} );


		it( "should remove the matched subscription", ( done:DoneFn ) => {
			const mockServer:any = new Server( "https://example.com/broker" );
			mockServer.on( "connection", server => {
				server.send( Frame.marshall( "CONNECTED", {
					"server": "MockSocket-Server/**",
					"session": "session-1",
					"heart-beat": "0,0",
					"version": "1.2",
				} ) );
			} );

			let targetID:string;
			mockServer.on( "message", ( framesString:string ) => {
				const frames:Frame[] = Frame.unmarshall( framesString ).frames;
				frames.forEach( frame => {
					if( frame.command === "UNSUBSCRIBE" ) {
						expect( frame.headers.id ).toBe( targetID );
						expect( service[ "_subscriptionsMap" ].size ).toBe( 2 );
						done();
						return;
					}


					if( frame.command !== "SUBSCRIBE" ) return;
					const index:string = frame.headers.destination.split( "/" ).reverse()[ 1 ].split( "-" ).reverse()[ 0 ];

					if( index === "2" ) targetID = frame.headers.id;

					mockServer.send( Frame.marshall( "MESSAGE", {
						"subscription": frame.headers.id,
						"destination": frame.headers.destination,
						"id": frame.headers.id + "@session-1@@1",
						"redelivered": "false",
						"content-type": "application/json+ld",
					}, `[ {
							"@id": "_:1",
							"@type": [ "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" ],
							"https://carbonldp.com/ns/v1/platform#target": {
								"@id": "https://example.com/created-child-${index}/"
							}
						} ]` ) );
				} );
			} );

			let finishCallback:Function;
			let responded:number = 0;

			function addSubscription( index:number ):( message:EventMessage ) => void {
				let callback:( message:EventMessage ) => void;
				service.subscribe( `/topic/*.*.destination-${index}/`, callback = ( message:EventMessage ) => {
					expect( service[ "_client" ].connected ).toBe( true );

					expect( message ).toEqual( {
						target: jasmine.any( Object ),
					} as any );

					expect( Resource.is( message ) ).toBe( true );
					expect( message.$id ).toBe( "_:1" );
					expect( message.$hasType( "https://carbonldp.com/ns/v1/platform#ChildCreatedEvent" ) ).toBe( true );

					expect( Pointer.is( message.target ) ).toBe( true );
					expect( message.target.$id ).toBe( `https://example.com/created-child-${index}/` );

					if( ++ responded === 3 ) finishCallback();
				}, ( error ) => {
					done.fail( error );
				} );

				return callback;
			}

			addSubscription( 1 );
			const secondCallback:( message:EventMessage ) => void = addSubscription( 2 );
			addSubscription( 3 );

			finishCallback = () => {
				service.unsubscribe( `/topic/*.*.destination-2/`, secondCallback );
			};
		} );

	} );

} );
