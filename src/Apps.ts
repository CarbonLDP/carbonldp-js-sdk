/// <reference path="./../typings/typings.d.ts" />

import * as App from "./App";
import * as Document from "./Document";
import Context from "./Context";
import * as HTTP from "./HTTP";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
import * as CS from "./NS/CS";

class Apps {
	private context:Context;

	constructor( context:Context ) {
		this.context = context;
	}

	get( uri:string ):Promise<App.Context> {
		let appsContainerURI:string = this.getAppsContainerURI();
		if ( RDF.URI.Util.isRelative( uri ) ) {
			if ( ! Utils.S.startsWith( uri, appsContainerURI ) ) uri = RDF.URI.Util.resolve( appsContainerURI, uri );
			uri = this.context.resolve( uri );
		}

		return this.context.documents.get( uri ).then(
			( [ document, response ]:[ Document.Class, HTTP.Response.Class ] ) => {
				if ( ! document.types.indexOf( CS.Class.Application ) ) throw new Error( "The resource fetched is not a cs:Application." );

				return new App.Context( this.context, <any> document );
			}
		);
	}

	getAll():Promise<App.Context[]> {
		return this.context.documents.getMembers( this.getAppsContainerURI(), false ).then(
			( [ members, response ]:[ Pointer.Class[], HTTP.Response.Class ] ) => {
				return Pointer.Util.resolveAll( members );
			}
		).then(
			( [ members, responses ]:[ Pointer.Class[], HTTP.Response.Class[] ] ) => {
				return members.map( ( member:Pointer.Class ) => new App.Context( this.context, <any> member ) );
			}
		);
	}

	private getAppsContainerURI():string {
		if ( ! this.context.hasSetting( "platform.apps.container" ) ) throw new Error( "The apps container URI hasn't been set." );
		return this.context.getSetting( "platform.apps.container" );
	}
}

export default Apps;
