import * as Auth from "./Auth";
import * as Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import { Pointer } from "./Pointer";
import SELECTResults from "./SPARQL/SELECTResults";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";

export interface Class extends PersistedDocument.Class {
	accessControlList?:Pointer;

	getACL( requestOptions?:HTTP.Request.Options ):Promise<[ Auth.PersistedACL.Class, HTTP.Response.Class ]>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "getACL" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedDocument.Factory.is( object )
			;
	}

	static decorate<T extends object>( document:T, documents:Documents.Class ):T & Class {
		const persistedProtectedDocument:T & Class = document as T & Class;

		if( Factory.hasClassProperties( document ) ) return persistedProtectedDocument;
		PersistedDocument.Factory.decorate( document, documents );

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

function getACL( requestOptions?:HTTP.Request.Options ):Promise<[ Auth.PersistedACL.Class, HTTP.Response.Class ]> {
	let protectedDocument:Class = <Class> this;

	let aclPromise:Promise<Pointer>;

	if( protectedDocument.isResolved() ) {
		aclPromise = Promise.resolve( protectedDocument.accessControlList );
	} else {
		aclPromise = protectedDocument.executeSELECTQuery<ACLResult>( `SELECT ?acl WHERE {
			<${ protectedDocument.id }> <${ CS.accessControlList }> ?acl.
		}` ).then( ( [ results ]:[ SELECTResults<ACLResult>, HTTP.Response.Class ] ) => {
			return results.bindings[ 0 ].acl;
		} );
	}

	return aclPromise.then( ( acl:Pointer ) => {
		return protectedDocument._documents.get( acl.id, requestOptions );
	} ).then<[ Auth.PersistedACL.Class, HTTP.Response.Class ]>( ( [ acl, response ]:[ Auth.PersistedACL.Class, HTTP.Response.Class ] ) => {
		if( ! acl.hasType( Auth.ACL.RDF_CLASS ) ) throw new HTTP.Errors.BadResponseError( `The response does not contains a ${ Auth.ACL.RDF_CLASS } object.`, response );
		return [ acl, response ];
	} );
}

export default Class;
