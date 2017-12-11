import {
	ConstructToken,
	GraphToken,
	IRIToken,
	PredicateToken,
	QueryToken,
	SubjectToken,
	VariableToken,
} from "sparqler/tokens";

import * as Auth from "./Auth";
import * as Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as NS from "./NS";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
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

function getACL( this:Class, requestOptions:HTTP.Request.Options = {} ):Promise<[ Auth.PersistedACL.Class, HTTP.Response.Class ]> {
	if( this.isResolved() ) return this._documents.get( this.accessControlList.id, requestOptions );

	const aclGraphVar:VariableToken = new VariableToken( "g" );

	const aclGetter:SubjectToken = new SubjectToken( new IRIToken( this.id ) )
		.addPredicate( new PredicateToken( new IRIToken( NS.CS.Predicate.accessControlList ) )
			.addObject( aclGraphVar ) );

	const aclContent:SubjectToken = new SubjectToken( new VariableToken( "s" ) )
		.addPredicate( new PredicateToken( new VariableToken( "p" ) )
			.addObject( new VariableToken( "o" ) ) );

	const query:QueryToken = new QueryToken( new ConstructToken()
		.addTriple( aclContent )
		.addPattern( aclGetter )
		.addPattern( new GraphToken( aclGraphVar )
			.addPattern( aclContent )
		)
	);

	return this._documents
		._getConstructDocuments<Auth.PersistedACL.Class>( this.id, requestOptions, query )
		.then<[ Auth.PersistedACL.Class, HTTP.Response.Class ]>( ( [ documents, response ] ) => {
			return [ documents[ 0 ], response ];
		} );
}

export default Class;
