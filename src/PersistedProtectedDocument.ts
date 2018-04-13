import {
	ConstructToken,
	GraphToken,
	IRIToken,
	PredicateToken,
	QueryToken,
	SubjectToken,
	VariableToken,
} from "sparqler/tokens";

import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { RequestOptions } from "./HTTP/Request";
import { ModelDecorator } from "./ModelDecorator";
import { PersistedDocument } from "./PersistedDocument";
import { Pointer } from "./Pointer";
import * as Utils from "./Utils";
import { CS } from "./Vocabularies/CS";


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

function getACL( this:PersistedProtectedDocument, requestOptions:RequestOptions = {} ):Promise<PersistedACL> {
	if( this.isResolved() ) return this._documents.get( this.accessControlList.id, requestOptions );

	const aclGraphVar:VariableToken = new VariableToken( "g" );

	const aclGetter:SubjectToken = new SubjectToken( new IRIToken( this.id ) )
		.addPredicate( new PredicateToken( new IRIToken( CS.accessControlList ) )
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
		._getConstructDocuments<PersistedACL>( this.id, requestOptions, query )
		.then( documents => documents[ 0 ] )
		;
}
