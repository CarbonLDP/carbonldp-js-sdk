import { Document } from "./Document";
import * as Fragment from "./Fragment";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Fragment.Class {
}

export class Factory {

	static createFrom<T extends Object>( object:T, document:Document ):T & Class;
	static createFrom<T extends Object>( object:T, id:string, document:Document ):T & Class;
	static createFrom<T extends Object>( object:T, idOrDocument:any, document?:Document ):T & Class {
		let id:string = ! ! idOrDocument && Utils.isString( idOrDocument ) ? idOrDocument : RDF.URI.Util.generateBNodeID();
		document = document || idOrDocument;
		return Fragment.Factory.createFrom<T>( object, id, document );
	}

}

export default Class;
