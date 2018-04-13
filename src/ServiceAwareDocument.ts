import { Document } from "./Document";
import { Documents } from "./Documents";
import { ModelDecorator } from "./ModelDecorator";
import { isObject } from "./Utils";


export interface ServiceAwareDocument extends Document {
	_documents:Documents;
}


export interface ServiceAwareDocumentFactory extends ModelDecorator<ServiceAwareDocument> {
	isDecorated( object:object ):object is ServiceAwareDocument;

	decorate<T extends object>( object:T, documents:Documents ):T & ServiceAwareDocument;
}

export const ServiceAwareDocument:ServiceAwareDocumentFactory = {
	isDecorated( object:object ):object is ServiceAwareDocument {
		return isObject( object )
			&& object.hasOwnProperty( "_documents" )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & ServiceAwareDocument {
		if( ServiceAwareDocument.isDecorated( object ) ) return object;

		Document.decorate( object );

		return Object.defineProperties( object, {
			"_documents": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: documents,
			},
		} );
	},
};

