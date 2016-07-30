import * as App from "./App";
import AppContext from "./App/Context";
import Context from "./Context";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as NS from "./NS";
import * as PersistedApp from "./PersistedApp";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as SPARQL from "./SPARQL";
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
		let uri:string = ! ! pointer ? pointer.id : pointerOrURI;

		if( ! uri ) return Promise.reject<AppContext>( new Errors.IllegalArgumentError( "The application's URI must be defined." ) );

		return this.resolveURI( uri ).then( ( appURI:string ) => {
			pointer = this.context.documents.getPointer( appURI );
			return pointer.resolve<PersistedApp.Class>();

		} ).then( ( [ app, response ]:[ PersistedApp.Class, HTTP.Response.Class ] ) => {
			if( ! PersistedApp.Factory.is( app ) ) throw new Errors.IllegalArgumentError( "The resource fetched is not a cs:Application." );
			return new AppContext( this.context, app );
		} );

	}

	getAllContexts():Promise<AppContext[]> {
		return this.resolveURI( "" ).then( ( appsContainerURI:string ) => {
			if( ! this.context.auth.isAuthenticated() ) return this.context.documents.getMembers<PersistedApp.Class>( this.getContainerURI(), false );

			let agentID:string = this.context.auth.authenticatedAgent.id;
			return this.context.documents.executeSELECTQuery( agentID, `
				SELECT ?app WHERE {
					<${ agentID }> <${ NS.C.Predicate.appRoleMap }> ?roleMap.
					?roleMap <${ NS.C.Predicate.entry }> ?appEntry.
					?appEntry <${ NS.C.Predicate.key }> ?app.
				}
			` ).then( ( [ results, response ]:[ SPARQL.SELECTResults.Class, HTTP.Response.Class ] ) => {
				let apps:Pointer.Class[] = results.bindings.map( binding => <Pointer.Class> binding[ "app" ] );
				return <Promise<[PersistedApp.Class[], any]>> Pointer.Util.resolveAll<PersistedApp.Class>( apps );
			} );

		} ).then( ( [ apps, response ]:[ PersistedApp.Class[], any ] ) => {
			return apps.map( ( app:Pointer.Class ) => new AppContext( this.context, <any> app ) );
		} );
	}

	create( appDocument:App.Class ):Promise<[ PersistedDocument.Class, HTTP.Response.Class]>;
	create( slug:string, appDocument:App.Class ):Promise<[ PersistedDocument.Class, HTTP.Response.Class]>;
	create( slugOrApp:any, appDocument?:App.Class ):Promise<[ PersistedDocument.Class, HTTP.Response.Class]> {
		return this.resolveURI( "" ).then( ( appsContainerURI:string ) => {
			let slug:string = Utils.isString( slugOrApp ) ? slugOrApp : null;
			appDocument = appDocument || slugOrApp;

			if( ! App.Factory.is( appDocument ) ) throw new Errors.IllegalArgumentError( "The Document is not a `Carbon.App.Class` object." );

			return this.context.documents.createChild( appsContainerURI, slug, appDocument );
		} );
	}

	private resolveURI( appURI:string ):Promise<string> {
		return new Promise<string>( ( resolve:( uri:string ) => void ) => {
			let containerURI:string = this.context.resolve( this.getContainerURI() );
			let uri:string = RDF.URI.Util.resolve( containerURI, appURI );

			if( ! RDF.URI.Util.isBaseOf( containerURI, uri ) ) throw new Errors.IllegalArgumentError( "The URI provided is not a valid app of the current context." );

			resolve( uri );
		} );

	}

	private getContainerURI():string {
		if( ! this.context.hasSetting( "platform.apps.container" ) ) throw new Errors.IllegalStateError( "The apps container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.container" );
	}
}

export default Class;
