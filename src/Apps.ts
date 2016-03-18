import AppContext from "./Apps/AppContext";
import * as Document from "./Document";
import Context from "./Context";
import * as Response from "./HTTP/Response";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
import * as App from "./Apps/App";
import * as PersistedApp from "./Apps/PersistedApp";
import * as Errors from "./Errors";

export class Class {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	getAppContext( uri:string ):Promise<AppContext> {
		let appsContainerURI:string = this.getAppsContainerURI();
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! Utils.S.startsWith( uri, appsContainerURI ) ) uri = RDF.URI.Util.resolve( appsContainerURI, uri );
			uri = this.context.resolve( uri );
		}

		return this.context.documents.get( uri ).then(
			( [ document, response ]:[ Document.Class, Response.Class ] ) => {
				if ( ! PersistedApp.Factory.is( document ) ) throw new Errors.IllegalArgumentError( "The resource fetched is not a cs:Application." );

				return new AppContext( this.context, <PersistedApp.Class> document );
			}
		);
	}

	getAllAppContext():Promise<AppContext[]> {
		return this.context.documents.getMembers( this.getAppsContainerURI(), false ).then(
			( [ members, response ]:[ Pointer.Class[], Response.Class ] ) => {
				return Pointer.Util.resolveAll( members );
			}
		).then(
			( [ members, responses ]:[ Pointer.Class[], Response.Class[] ] ) => {
				return members.map( ( member:Pointer.Class ) => new AppContext( this.context, <any> member ) );
			}
		);
	}

	createApp( appDocument:App.Class ):Promise<[ Pointer.Class, Response.Class]>;
	createApp( slug:string, appDocument:App.Class ):Promise<[ Pointer.Class, Response.Class]>;
	createApp( slugOrApp:any, appDocument?:App.Class ):Promise<[ Pointer.Class, Response.Class]> {
		let appsContainerURI:string = this.context.resolve( this.getAppsContainerURI() );
		let slug:string = Utils.isString( slugOrApp ) ? slugOrApp : null;
		appDocument = appDocument || slugOrApp;

		if ( ! App.Factory.is( appDocument ) ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The Document is not a `Carbon.App.Class` object." ) );

		return this.context.documents.createChild( appsContainerURI, slug, appDocument );
	}

	private getAppsContainerURI():string {
		if ( ! this.context.hasSetting( "platform.apps.container" ) ) throw new Errors.IllegalStateError( "The apps container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.container" );
	}
}

export {
	App,
	PersistedApp,
	AppContext
};

export default Class;
