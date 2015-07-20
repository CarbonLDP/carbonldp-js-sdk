/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as App from './App';
import Parent from './Parent';
import * as HTTP from './HTTP';
import * as RDF from './RDF';
import * as Utils from './Utils';
import * as CS from './namespaces/CS';

class Apps {
	private parent:Parent;

	constructor( parent:Parent ) {
		this.parent = parent;
	}

	get( uri:string ):Promise<App.Class> {
		var appsContainerURI:string = this.getAppsContainerURI();
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! Utils.S.startsWith( uri, appsContainerURI ) ) uri = RDF.URI.Util.resolve( appsContainerURI, uri );
			this.parent.resolve( uri )
		}

		return this.parent.Resources.get( uri ).then(
			( processedResponse:HTTP.ProcessedResponse<RDF.PersistedDocumentResource.Class> ) => {
				var resource:RDF.PersistedDocumentResource.Class = processedResponse.result;
				if ( ! resource.types.indexOf( CS.Class.Application ) ) {
					throw new Error( 'The resource fetched is not a cs:Application.' );
				}

				var appResource:App.Resource = App.factory.from( resource );
				var app:App.Class = new App.Class( this.parent, appResource );

				return app;
			}
		);
	}

	private getAppsContainerURI():string {
		if ( ! this.parent.hasSetting( "platform.apps.container" ) ) throw new Error( "The apps container URI hasn't been set." );
		return this.parent.getSetting( "platform.apps.container" );
	}
}

export default Apps;