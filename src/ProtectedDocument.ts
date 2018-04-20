import { ACL } from "./Auth/ACL";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { ModelDecorator } from "./core/ModelDecorator";
import { Document } from "./Document";
import { Pointer } from "./Pointer";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

export interface ProtectedDocument extends Document {
	accessControlList?:Pointer;

	getACL( requestOptions?:RequestOptions ):Promise<ACL>;
}


export interface ProtectedDocumentFactory extends ModelDecorator<ProtectedDocument> {
	isDecorated( object:object ):object is ProtectedDocument;

	is( object:object ):object is ProtectedDocument;

	decorate<T extends object>( object:T, documents:Documents ):T & ProtectedDocument;
}

export const ProtectedDocument:ProtectedDocumentFactory = {
	isDecorated( object:object ):object is ProtectedDocument {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "getACL" )
			;
	},

	is( object:object ):object is ProtectedDocument {
		return ProtectedDocument.isDecorated( object )
			&& Document.is( object )
			;
	},

	decorate<T extends object>( object:T, documents:Documents ):T & ProtectedDocument {
		if( ProtectedDocument.isDecorated( object ) ) return object;

		Document.decorate( object, documents );

		const persistedProtectedDocument:T & ProtectedDocument = object as T & ProtectedDocument;
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

interface ACLResult {
	acl:Pointer;
}

function getACL( this:ProtectedDocument, requestOptions?:RequestOptions ):Promise<ACL> {
	const aclPromise:Promise<Pointer> = this.isResolved() ?
		Promise.resolve( this.accessControlList ) :
		this.executeSELECTQuery<ACLResult>( `SELECT ?acl WHERE {<${ this.id }> <${ CS.accessControlList }> ?acl}` )
			.then( results => results.bindings[ 0 ].acl );

	return aclPromise.then( ( acl:Pointer ) => {
		return this._documents.get<ACL>( acl.id, requestOptions );
	} );
}
