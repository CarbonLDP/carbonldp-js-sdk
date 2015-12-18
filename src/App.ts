/// <reference path="./../typings/tsd.d.ts" />

import AbstractContext from "./AbstractContext";
import Context from "./Context";
import * as Document from "./Document";
import Documents from "./Documents";
import * as LDP from "./LDP";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Document.Class {
	rootContainer:LDP.PersistedContainer.Class;
}

export const RDF_CLASS:string = NS.CS.Class.Application;

export const SCHEMA:ObjectSchema.Class = {
	"rootContainer": {
		"@id": NS.CS.Predicate.rootContainer,
		"@type": "@id",
	},
};

class AppContext extends AbstractContext {
	private app:Class;
	private base:string;

	constructor( parentContext:Context, app:Class ) {
		super( parentContext );
		this.app = app;

		this.base = this.getBase( this.app );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.parentContext.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	private getBase( resource:Class ):string {
		return resource.rootContainer.id;
	}
}

export {
	AppContext as Context
};

export class Factory {
	hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "rootContainer" )
		);
	}
}

export let factory:Factory = new Factory();

export default Class;
