import * as Auth from "./Auth";
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

	getACL( requestOptions?:RequestOptions ):Promise<[ Auth.PersistedACL.Class, Response ]>;
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

function getACL( requestOptions?:RequestOptions ):Promise<[ Auth.PersistedACL.Class, Response ]> {
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
	} ).then<[ Auth.PersistedACL.Class, Response ]>( ( [ acl, response ]:[ Auth.PersistedACL.Class, Response ] ) => {
		if( ! acl.hasType( Auth.ACL.RDF_CLASS ) ) throw new BadResponseError( `The response does not contains a ${ Auth.ACL.RDF_CLASS } object.`, response );
		return [ acl, response ];
	} );
}

export default Class;
