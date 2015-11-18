/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as App from "./App";
import * as Document from "./Document";
import Context from "./Context";
import * as HTTP from "./HTTP";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
import * as CS from "./NS/CS";

export class Apps {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	get( uri:string ):Promise<App.Class> {
		let appsContainerURI:string = this.getAppsContainerURI();
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! Utils.S.startsWith( uri, appsContainerURI ) ) uri = RDF.URI.Util.resolve( appsContainerURI, uri );
			this.context.resolve( uri );
		}

		return this.context.Documents.get( uri ).then(
			( processedResponse:HTTP.ProcessedResponse<Document.Class> ) => {
				let document:Document.Class = processedResponse.result;

				if ( ! document.types.indexOf( CS.Class.Application ) ) throw new Error( "The resource fetched is not a cs:Application." );

				let appResource:App.Resource = App.factory.from( document );
				return new App.Class( this.context, appResource );
			}
		);
	}

	private getAppsContainerURI():string {
		if ( ! this.context.hasSetting( "platform.apps.container" ) ) throw new Error( "The apps container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.container" );
	}
}

export default Apps;
