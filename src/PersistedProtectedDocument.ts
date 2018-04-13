import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { Pointer } from "./Pointer";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies";


export interface PersistedProtectedDocument extends PersistedDocument {
	accessControlList?:Pointer;

	getACL( requestOptions?:RequestOptions ):Promise<PersistedACL>;
}


export interface PersistedProtectedDocumentFactory extends ModelDecorator<PersistedProtectedDocument> {
	isDecorated( object:object ):object is PersistedProtectedDocument;

	is( object:object ):object is PersistedProtectedDocument;

	decorate<T extends object>( object:T, documents:Documents ):T & PersistedProtectedDocument;
}

export const PersistedProtectedDocument:PersistedProtectedDocumentFactory = {
	isDecorated( object:object ):object is PersistedProtectedDocument {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "getACL" )
			;
	},

	is( object:object ):object is PersistedProtectedDocument {
		return PersistedProtectedDocument.isDecorated( object )
			&& PersistedDocument.is( object )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & PersistedProtectedDocument {
		if( PersistedProtectedDocument.isDecorated( object ) ) return object;

		PersistedDocument.decorate( object, documents );

		const persistedProtectedDocument:T & PersistedProtectedDocument = object as T & PersistedProtectedDocument;
		Object.defineProperties( persistedProtectedDocument, {
			"getACL": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getACL,
			},
		} );

		return persistedProtectedDocument;
	},

};

function getACL( this:PersistedProtectedDocument, requestOptions:RequestOptions ):Promise<PersistedACL> {
	if( this.accessControlList ) return this._documents.get( this.accessControlList.id, requestOptions );

	return this.resolve( _ => _
		.withType( CS.ProtectedDocument )
		.properties( {
			accessControlList: {
				"query": __ => __
					.properties( __.full ),
			},
		} )
	).then( () => {
		return this.accessControlList as PersistedACL;
	} );
}
