import { ACL } from "./Auth/ACL";
import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { BadResponseError } from "./HTTP/Errors";
import { RequestOptions } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { PersistedDocument } from "./PersistedDocument";
import { Pointer } from "./Pointer";
import SELECTResults from "./SPARQL/SelectResults";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

export interface Class extends PersistedDocument {
	accessControlList?:Pointer;

	getACL( requestOptions?:RequestOptions ):Promise<[ PersistedACL, Response ]>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "getACL" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedDocument.is( object )
			;
	}

	static decorate<T extends object>( document:T, documents:Documents ):T & Class {
		const persistedProtectedDocument:T & Class = document as T & Class;

		if( Factory.hasClassProperties( document ) ) return persistedProtectedDocument;
		PersistedDocument.decorate( document, documents );

		Object.defineProperties( persistedProtectedDocument, {
			"getACL": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getACL,
			},
		} );

		return persistedProtectedDocument;
	}

}

interface ACLResult {
	acl:Pointer;
}

function getACL( requestOptions?:RequestOptions ):Promise<[ PersistedACL, Response ]> {
	let protectedDocument:Class = <Class> this;

	let aclPromise:Promise<Pointer>;

	if( protectedDocument.isResolved() ) {
		aclPromise = Promise.resolve( protectedDocument.accessControlList );
	} else {
		aclPromise = protectedDocument.executeSELECTQuery<ACLResult>( `SELECT ?acl WHERE {
			<${ protectedDocument.id }> <${ CS.accessControlList }> ?acl.
		}` ).then( ( [ results ]:[ SELECTResults<ACLResult>, Response ] ) => {
			return results.bindings[ 0 ].acl;
		} );
	}

	return aclPromise.then( ( acl:Pointer ) => {
		return protectedDocument._documents.get( acl.id, requestOptions );
	} ).then<[ PersistedACL, Response ]>( ( [ acl, response ]:[ PersistedACL, Response ] ) => {
		if( ! acl.hasType( ACL.TYPE ) ) throw new BadResponseError( `The response does not contains a ${ ACL.TYPE } object.`, response );
		return [ acl, response ];
	} );
}

export default Class;
