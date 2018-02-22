import { Document } from "./Document";
import { Class as Documents } from "./Documents";
import { isObject } from "./Utils";

export interface Class extends Document {
	_documents:Documents;
}

export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return isObject( object )
			&& object.hasOwnProperty( "_documents" )
			;
	}

	static decorate<T extends Document>( document:T, documents:Documents ):T & Class {
		if( Factory.hasClassProperties( document ) ) return document;

		return Object.defineProperties( document, {
			"_documents": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: documents,
			},
		} );
	}
}

export default Class;
