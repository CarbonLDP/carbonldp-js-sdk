import * as Document from "./Document";
import * as Fragment from "./Fragment";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export const SCHEMA:ObjectSchema.Class = {
	"bNodeIdentifier": {
		"@id": NS.C.Predicate.bNodeIdentifier,
		"@type": NS.XSD.DataType.string,
	},
};

export interface Class extends Fragment.Class {
	bNodeIdentifier:string;
}

export class Factory {

	static createFrom<T extends Object>( object:T, document:Document.Class ):T & Class;
	static createFrom<T extends Object>( object:T, id:string, document:Document.Class ):T & Class;
	static createFrom<T extends Object>( object:T, idOrDocument:any, document?:Document.Class ):T & Class {
		let id:string = ! ! idOrDocument && Utils.isString( idOrDocument ) ? idOrDocument : RDF.URI.Util.generateBNodeID();
		document = document || idOrDocument;

		let fragment:T & Fragment.Class = Fragment.Factory.createFrom<T>( object, id, document );

		return Factory.decorate<T>( fragment, (<any> fragment).bNodeIdentifier );
	}

	static decorate<T extends Object>( object:T, bNodeIdentifier:string = Utils.UUID.generate() ):T & Class {
		let bNode:T & Class = <any> object;

		bNode.bNodeIdentifier = bNodeIdentifier;
		return bNode;
	}

}

export default Class;