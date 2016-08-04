import * as HTTP from "./HTTP";
import * as Auth from "./Auth";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as ProtectedDocument from "./ProtectedDocument";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends PersistedDocument.Class {
	accessControlList:Pointer.Class;

	getACL( requestOptions?:HTTP.Request.Options ):Promise<[ Auth.PersistedACL.Class, HTTP.Response.Class ]>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "accessControlList" )
			&& Utils.hasFunction( object, "getACL" )
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

function getACL( requestOptions?:HTTP.Request.Options ):Promise<[ Auth.PersistedACL.Class, HTTP.Response.Class ]> {
	let that:Class = <Class> this;
	return that._documents.get( that.accessControlList.id, requestOptions ).then( ( [ acl, response ]:[ Auth.PersistedACL.Class, HTTP.Response.Class ] ) => {
		if( ! Resource.Util.hasType( acl, Auth.ACL.RDF_CLASS ) ) throw new HTTP.Errors.BadResponseError( `The response does not contains a ${ Auth.ACL.RDF_CLASS } object.`, response );
		return [ acl, response ];
	} );
}

export default Class;
