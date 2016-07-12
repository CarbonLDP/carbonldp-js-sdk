import AppContext from "./App/Context";
import * as PersistedDocument from "./PersistedDocument";
import Context from "./Context";
import * as Response from "./HTTP/Response";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
import * as App from "./App";
import * as PersistedApp from "./PersistedApp";
import * as Errors from "./Errors";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	getContext( uri:string ):Promise<AppContext>;
	getContext( pointer:Pointer.Class ):Promise<AppContext>;
	getContext( pointerOrURI:any ):Promise<AppContext> {
		let pointer:Pointer.Class = ! Utils.isString( pointerOrURI ) ? pointerOrURI : null;

		if( ! pointer ) {
			let appsContainerURI:string = this.getAppsContainerURI();
			let uri:string = Utils.isString( pointerOrURI ) ? pointerOrURI : null;

			if( ! uri ) return Promise.reject<AppContext>( new Errors.IllegalArgumentError( "The application's URI cannot be null" ) );

			if( RDF.URI.Util.isRelative( uri ) ) {
				if( ! Utils.S.startsWith( uri, appsContainerURI ) ) uri = RDF.URI.Util.resolve( appsContainerURI, uri );
				uri = this.context.resolve( uri );
			}

			pointer = this.context.documents.getPointer( uri );
		}

		return pointer.resolve().then( ( [ app, response ]:[ PersistedApp.Class, Response.Class ] ) => {
			if( ! PersistedApp.Factory.is( app ) )
				return Promise.reject<AppContext>( new Errors.IllegalArgumentError( "The resource fetched is not a cs:Application." ) );

			return new AppContext( this.context, <PersistedApp.Class> app );
		} );
	}

	getAllContexts():Promise<AppContext[]> {
		return this.context.documents.getMembers( this.getAppsContainerURI(), false ).then(
			( [ members, response ]:[ Pointer.Class[], Response.Class ] ) => {
				return members.map( ( member:Pointer.Class ) => new AppContext( this.context, <any> member ) );
			}
		);
	}

	create( appDocument:App.Class ):Promise<[ Pointer.Class, Response.Class]>;
	create( slug:string, appDocument:App.Class ):Promise<[ Pointer.Class, Response.Class]>;
	create( slugOrApp:any, appDocument?:App.Class ):Promise<[ Pointer.Class, Response.Class]> {
		let appsContainerURI:string = this.context.resolve( this.getAppsContainerURI() );
		let slug:string = Utils.isString( slugOrApp ) ? slugOrApp : null;
		appDocument = appDocument || slugOrApp;

		if( ! App.Factory.is( appDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a `Carbon.App.Class` object." ) );

		return this.context.documents.createChild( appsContainerURI, slug, appDocument );
	}

	private getAppsContainerURI():string {
		if( ! this.context.hasSetting( "platform.apps.container" ) ) throw new Errors.IllegalStateError( "The apps container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.container" );
	}
}

export default Class;
