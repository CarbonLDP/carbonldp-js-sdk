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
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "document" )
		);
	}

	static create( id:string, document:Document.Class ):Class;
	static create( document:Document.Class ):Class;
	static create( idOrDocument:any, document:Document.Class = null ):Class {
		return this.createFrom( {}, idOrDocument, document );
	}

	static createFrom<T extends Object>( object:T, id:string, document:Document.Class ):T & Class;
	static createFrom<T extends Object>( object:T, document:Document.Class ):T & Class;
	static createFrom<T extends Object>( object:T, idOrDocument:any, document:Document.Class = null ):T & Class {
		let id:string = !! document ? idOrDocument : Util.generateID();
		document = document || idOrDocument;

		let resource:Resource.Class = Resource.Factory.createFrom( object, id );

		if( Factory.hasClassProperties( resource ) ) return <any> resource;

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

export class Util {
	static generateID():string {
		return "_:" + Utils.UUID.generate();
	}
}

export default Class;
