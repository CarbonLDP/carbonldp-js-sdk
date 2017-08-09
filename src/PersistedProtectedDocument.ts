import * as HTTP from "./HTTP";
import * as Auth from "./Auth";
import * as NS from "./NS";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as Resource from "./Resource";
import SELECTResults from "./SPARQL/SELECTResults";
import * as Utils from "./Utils";

export interface Class extends PersistedDocument.Class {
	accessControlList?:Pointer.Class;

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

	static decorate<T extends PersistedDocument.Class>( document:T ):T & Class {
		if( Factory.hasClassProperties( document ) ) return <any> document;

		let rdfSource:T & Class = <any> document;

		Object.defineProperties( rdfSource, {
			"getACL": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getACL,
			},
		} );

		return rdfSource;
	}

}

interface ACLResult {
	acl:Pointer.Class;
}

function getACL( requestOptions?:HTTP.Request.Options ):Promise<[ Auth.PersistedACL.Class, HTTP.Response.Class ]> {
	let protectedDocument:Class = <Class> this;

	let aclPromise:Promise<Pointer.Class>;

	if( protectedDocument.isResolved() ) {
		aclPromise = Promise.resolve( protectedDocument.accessControlList );
	} else {
		aclPromise = protectedDocument.executeSELECTQuery<ACLResult>( `SELECT ?acl WHERE {
			<${ protectedDocument.id }> <${ NS.CS.Predicate.accessControlList }> ?acl.
		}` ).then( ( [ results ]:[ SELECTResults<ACLResult>, HTTP.Response.Class ] ) => {
			return results.bindings[ 0 ].acl;
		} );
	}

	return aclPromise.then( ( acl:Pointer.Class ) => {
		return protectedDocument._documents.get( acl.id, requestOptions );
	} ).then( ( [ acl, response ]:[ Auth.PersistedACL.Class, HTTP.Response.Class ] ) => {
		if( ! Resource.Util.hasType( acl, Auth.ACL.RDF_CLASS ) ) throw new HTTP.Errors.BadResponseError( `The response does not contains a ${ Auth.ACL.RDF_CLASS } object.`, response );
		return [ acl, response ] as [ Auth.PersistedACL.Class, HTTP.Response.Class ];
	} );
}

export default Class;
