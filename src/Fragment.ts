import * as Document from "./Document";
import * as Errors from "./Errors";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends Resource.Class {
	document:Document.Class;
}

export class Factory {
	hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "document" )
		);
	}

	create( id:string, document:Document.Class ):Class;
	create( document:Document.Class ):Class;
	create( idOrDocument:any, document:Document.Class = null ):Class {
		return this.createFrom( {}, idOrDocument, document );
	}

	createFrom<T extends Object>( object:T, id:string, document:Document.Class ):T & Class;
	createFrom<T extends Object>( object:T, document:Document.Class ):T & Class;
	createFrom<T extends Object>( object:T, idOrDocument:any, document:Document.Class = null ):T & Class {
		let id:string = !! document ? idOrDocument : Util.generateID();

		let resource:Resource.Class = Resource.factory.createFrom( object, id );

		if( this.hasClassProperties( resource ) ) return <any> resource;

		Object.defineProperties( resource, {
			"document": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: document,
			},
		} );

		return <any> resource;
	}
}

export var factory:Factory = new Factory();

export class Util {
	static generateID():string {
		return "_:" + Utils.UUID.generate();
	}
}

export default Class;
