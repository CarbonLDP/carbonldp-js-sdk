import { anyThatMatches } from "../../test/helpers/jasmine/equalities";

import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { DocumentsRepository } from "../DocumentsRepository/DocumentsRepository";

import { IllegalStateError } from "../Errors/IllegalStateError";

import { MessagingService } from "../Messaging/MessagingService";

import { constructor, hasProperty, hasSignature, INSTANCE, interfaze, method, module } from "../test/JasmineExtender";

import { DocumentsContext } from "./DocumentsContext";
import { DocumentsContextSettings } from "./DocumentsContextSettings";


function createMock( data?:{
	uri?:string;
	settings?:DocumentsContextSettings,
} ):DocumentsContext {
	return new class extends DocumentsContext {
		constructor() {
			const uri:string = data && "uri" in data ? data.uri : "https://example.com/";
			super( uri );

			this._settings = data && data.settings;
		}
	};
}

describe( module( "carbonldp/DocumentsContext" ), () => {

	describe( interfaze(
		"CarbonLDP.DocumentsContext",
		"Context that manages the `CarbonLDP.Documents` objects."
	), () => {

		it( hasProperty(
			INSTANCE,
			"messaging",
			"CarbonLDP.Messaging.MessagingService",
			"Service that contains the RAW methods to manage the messaging/real-time features."
		), ():void => {
			const target:DocumentsContext[ "messaging" ] = {} as MessagingService;
			expect( target ).toBeDefined();
		} );


		describe( constructor(), () => {

			it( hasSignature(
				[
					{ name: "url", type: "string", description: "The base URL of the context." },
					{ name: "settings", type: "CarbonLDP.ContextSettings", optional: true, description: "Customizable settings of the context" },
				]
			), () => {} );

			it( "should be instantiable", () => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
				expect( context ).toEqual( jasmine.any( DocumentsContext ) );
			} );


			it( "should initialize CarbonLDP.registry", ():void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
				expect( context.registry ).toEqual( anyThatMatches( DocumentsRegistry.isDecorated, "isDocumentRegistry" ) );
			} );

			it( "should initialize CarbonLDP.repository", ():void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
				expect( context.repository ).toEqual( anyThatMatches( DocumentsRepository.is, "isDocumentRepository" ) );
			} );

			it( "should initialize CarbonLDP.messaging", ():void => {
				const context:DocumentsContext = new DocumentsContext( "https://example.com/" );
				expect( context.messaging ).toEqual( jasmine.any( MessagingService ) );
			} );

		} );


		describe( method( INSTANCE, "_resolvePath" ), ():void => {

			it( hasSignature(
				"Resolves the path provided into an URL using the `path` settings of the context.",
				[
					{ name: "path", type: "string", description: "The dot notation string that refers the path declared in the settings of the context." },
				],
				{ type: "string", description: "The absolute URI of the path provided." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( DocumentsContext.prototype._resolvePath ).toBeDefined();
				expect( DocumentsContext.prototype._resolvePath ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when no settings", ():void => {
				const context:DocumentsContext = createMock( {} );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when no settings paths", ():void => {
				const context:DocumentsContext = createMock( { settings: {} } );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when path not found in first level", ():void => {
				const context:DocumentsContext = createMock( { settings: { paths: {} } } );
				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
			} );

			it( "should throw error when path not found in second level string", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: "document/",
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object without paths", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object with empty paths", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when path not found in parent level object with not target path", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									another: "another/",
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" hasn't been declared.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" hasn't been declared.` );
			} );

			it( "should throw error when no slug in parent level object", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								paths: {
									subDocument: "document-1/",
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
			} );

			it( "should throw error when no slug in target level object", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									subDocument: {},
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" doesn't have a slug set.` );
			} );

			it( "should throw error when no slug in target level object", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									subDocument: {} as any,
								},
							},
						},
					},
				} );

				const helper:( path:string ) => void = path => () => {
					context._resolvePath( path );
				};

				expect( helper( "document" ) ).not.toThrowError( IllegalStateError, `The path "document" doesn't have a slug set.` );
				expect( helper( "document.subDocument" ) ).toThrowError( IllegalStateError, `The path "document.subDocument" doesn't have a slug set.` );
			} );


			it( "should resolve first level path string", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: "document/",
						},
					},
				} );

				expect( context._resolvePath( "document" ) ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve first level path object", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
							},
						},
					},
				} );

				expect( context._resolvePath( "document" ) ).toBe( "https://example.com/document/" );
			} );

			it( "should resolve second level path string", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: { subDocument: "sub-document-1/" },
							},
						},
					},
				} );

				expect( context._resolvePath( "document.subDocument" ) ).toBe( "https://example.com/document/sub-document-1/" );
			} );

			it( "should resolve second level path object", ():void => {
				const context:DocumentsContext = createMock( {
					settings: {
						paths: {
							document: {
								slug: "document/",
								paths: {
									subDocument: {
										slug: "sub-document-1/",
									},
								},
							},
						},
					},
				} );

				expect( context._resolvePath( "document.subDocument" ) ).toBe( "https://example.com/document/sub-document-1/" );
			} );

		} );

	} );

} );
