import * as App from "./App";
import AppContext from "./App/Context";
import Context from "./Context";
import * as Errors from "./Errors";
import * as PersistedApp from "./PersistedApp";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
import * as URI from "./RDF/URI";
import * as Utils from "./Utils";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	getContext( uri:string ):Promise<AppContext>;
	getContext( pointer:Pointer.Class ):Promise<AppContext>;
	getContext( pointerOrURI:any ):Promise<AppContext> {
		let pointer:Pointer.Class = ! Utils.isString( pointerOrURI ) ? pointerOrURI : null;
		let uri:string = !! pointer ? pointer.id : pointerOrURI;

		if( ! uri ) return Promise.reject<AppContext>( new Errors.IllegalArgumentError( "The application's URI must be defined." ) );

		return this.resolveURI( uri ).then( ( appURI:string ) => {
			if( ! pointer ) {
				pointer = this.context.documents.getPointer( appURI );
			} else {
				pointer.id = appURI;
			}

			return pointer.resolve().then( ( [ app, response ]:[ PersistedApp.Class, Response.Class ] ) => {
				if ( ! PersistedApp.Factory.is( app ) )
					return Promise.reject<AppContext>( new Errors.IllegalArgumentError( "The resource fetched is not a cs:Application." ) );

				return new AppContext( this.context, app );
			});
		});

	}

	getAllContexts():Promise<AppContext[]> {
		return this.resolveURI( "" ).then( ( appsContainerURI:string ) => {
			return this.context.documents.getMembers( appsContainerURI, false ).then(
				( [ members, response ]:[ Pointer.Class[], Response.Class ] ) => {
					return members.map( ( member:Pointer.Class ) => new AppContext( this.context, <any> member ) );
				}
			);
		});
	}

	create( appDocument:App.Class ):Promise<[ Pointer.Class, Response.Class]>;
	create( slug:string, appDocument:App.Class ):Promise<[ Pointer.Class, Response.Class]>;
	create( slugOrApp:any, appDocument?:App.Class ):Promise<[ Pointer.Class, Response.Class]> {
		return this.resolveURI( "" ).then( ( appsContainerURI:string ) => {
			let slug:string = Utils.isString( slugOrApp ) ? slugOrApp : null;
			appDocument = appDocument || slugOrApp;

			if ( ! App.Factory.is( appDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a `Carbon.App.Class` object." ) );

			return this.context.documents.createChild( appsContainerURI, slug, appDocument );
		});
	}

	private resolveURI( appURI:string ):Promise<string> {
		return new Promise<string>( ( resolve:( uri:string ) => void ) => {
			let containerURI:string = this.context.resolve( this.getContainerURI() );
			let uri:string = URI.Util.resolve( containerURI, appURI );

			if ( ! URI.Util.isBaseOf( containerURI, uri ) ) throw new Errors.IllegalArgumentError( "The URI provided is not a valid app of the current context." );

			resolve( uri );
		});

	}

	private getContainerURI():string {
		if ( ! this.context.hasSetting( "platform.apps.container" ) ) throw new Errors.IllegalStateError( "The apps container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.container" );
	}
}

export default Class;
