import AbstractContext from "./AbstractContext";
import Context from "./Context";
import * as Document from "./Document";
import * as LDP from "./LDP";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as RDF from "./RDF";
import * as Utils from "./Utils";
import Agents from "./Agents";

export interface Class extends Document.Class {
	rootContainer:LDP.PersistedContainer.Class;
}

export const RDF_CLASS:string = NS.CS.Class.Application;

export const SCHEMA:ObjectSchema.Class = {
	"name": {
		"@id": NS.CS.Predicate.name,
		"@type": NS.XSD.DataType.string,
	},
	"rootContainer": {
		"@id": NS.CS.Predicate.rootContainer,
		"@type": "@id",
	},
	"allowsOrigin": {
		"@id": NS.CS.Predicate.allowsOrigin,
	},
};

class AppContext extends AbstractContext {
	agents:Agents;
	
	private app:Class;
	private base:string;

	constructor( parentContext:Context, app:Class ) {
		super( parentContext );
		this.app = app;

		this.base = this.getBase( this.app );
		this.agents = new Agents( this );
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
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "rootContainer" )
		);
	}
}

export default Class;
