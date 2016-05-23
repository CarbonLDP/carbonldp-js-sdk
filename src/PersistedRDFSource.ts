import * as AccessPoint from "./AccessPoint";
import * as ACL from "./Auth/ACL";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends PersistedDocument.Class {
	defaultInteractionModel: Pointer.Class;
	accessPoints: Pointer.Class[];
	accessControlList: Pointer.Class;

	createAccessPoint( accessPoint:AccessPoint.Class, slug?:string, requestOptions?:HTTP.Request.Options ):Promise<[ Pointer.Class, HTTP.Response.Class ]>;

	getACL( requestOptions?:HTTP.Request.Options ):Promise<[ ACL.Class, HTTP.Response.Class ]>;
}

export class Factory {

	static hasClassProperties( object:Object ):boolean {
		return Utils.isObject( object )
			&& Utils.hasFunction( object, "createAccessPoint" )
			&& Utils.hasFunction( object, "getACL" )
		;
	}

	static decorate<T extends Object>( document:T ):T & Class {
		if( Factory.hasClassProperties( document ) ) return <any> document;

		let rdfSource:T & Class = <any> document;

		Object.defineProperties( rdfSource, {
			"getACL": {
				writable: false,
					enumerable: false,
					configurable: true,
					value: getACL,
			},
			"createAccessPoint": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createAccessPoint,
			},
		});

		return rdfSource;
	}

}

function getACL( requestOptions?:HTTP.Request.Options ):Promise<[ ACL.Class, HTTP.Response.Class ]> {
	let that:Class = <Class> this;
	return that._documents.get( that.accessControlList.id, requestOptions ).then( ( [ acl, response ]:[ ACL.Class, HTTP.Response.Class ] ) => {
		if ( ! Resource.Util.hasType( acl, ACL.RDF_CLASS ) ) throw new HTTP.Errors.BadResponseError( "The response does not contains a cs:AccessControlList object.", response );
		return [ acl, response ];
	});
}

function createAccessPoint( accessPoint:AccessPoint.Class, slug:string = null, requestOptions:HTTP.Request.Options = {}):Promise<[ Pointer.Class, HTTP.Response.Class ]> {
	return this._documents.createAccessPoint( accessPoint, slug, requestOptions );
}
