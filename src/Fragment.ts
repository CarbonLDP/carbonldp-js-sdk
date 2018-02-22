import { Document } from "./Document";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends Resource.Class {
	document:Document;
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "document" )
		);
	}

	static create( id:string, document:Document ):Class;
	static create( document:Document ):Class;
	static create( idOrDocument:any, document?:Document ):Class {
		return this.createFrom( {}, idOrDocument, document );
	}

	static createFrom<T extends Object>( object:T, id:string, document:Document ):T & Class;
	static createFrom<T extends Object>( object:T, document:Document ):T & Class;
	static createFrom<T extends Object>( object:T, idOrDocument:any, document:Document = null ):T & Class {
		let id:string = ! ! idOrDocument && Utils.isString( idOrDocument ) ? idOrDocument : "";
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

export default Class;
