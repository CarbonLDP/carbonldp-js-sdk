import { ACL } from "./Auth/ACL";
import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { BadResponseError } from "./HTTP/Errors";
import { RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { Pointer } from "./Pointer";
import { SPARQLSelectResults } from "./SPARQL/SelectResults";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

export interface PersistedProtectedDocument extends PersistedDocument {
	accessControlList?:Pointer;

	getACL( requestOptions?:RequestOptions ):Promise<[ PersistedACL, Response ]>;
}


export interface PersistedProtectedDocumentConstant extends ModelDecorator<PersistedProtectedDocument> {
	isDecorated( object:object ):object is PersistedProtectedDocument;

	is( object:object ):object is PersistedProtectedDocument;

	decorate<T extends object>( object:T, documents:Documents ):T & PersistedProtectedDocument;
}

export const PersistedProtectedDocument:PersistedProtectedDocumentConstant = {
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

interface ACLResult {
	acl:Pointer;
}

function getACL( this:PersistedProtectedDocument, requestOptions?:RequestOptions ):Promise<[ PersistedACL, Response ]> {
	let aclPromise:Promise<Pointer>;
	if( this.isResolved() ) {
		aclPromise = Promise.resolve( this.accessControlList );
	} else {
		aclPromise = this.executeSELECTQuery<ACLResult>( `SELECT ?acl WHERE {
			<${ this.id }> <${ CS.accessControlList }> ?acl.
		}` ).then( ( [ results ]:[ SPARQLSelectResults<ACLResult>, Response ] ) => {
			return results.bindings[ 0 ].acl;
		} );
	}

	return aclPromise.then( ( acl:Pointer ) => {
		return this._documents.get( acl.id, requestOptions );
	} ).then<[ PersistedACL, Response ]>( ( [ acl, response ]:[ PersistedACL, Response ] ) => {
		if( ! acl.hasType( ACL.TYPE ) ) throw new BadResponseError( `The response does not contains a ${ ACL.TYPE } object.`, response );
		return [ acl, response ];
	} );
}

export default PersistedProtectedDocument;
