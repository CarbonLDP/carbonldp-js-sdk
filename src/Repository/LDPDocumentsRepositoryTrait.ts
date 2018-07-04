import { Context } from "../Context";
import { Document } from "../Document";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import { ProtectedDocument } from "../ProtectedDocument";
import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";


export interface LDPDocumentsRepositoryTrait extends HTTPRepositoryTrait {
	$context:Context<Document, Document>;

	get( uri:string, requestOptions?:GETOptions ):Promise<Document>;

	resolve( document:Document, requestOptions?:RequestOptions ):Promise<Document>;


	create<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	create<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	create<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	create<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;

	createAndRetrieve<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	createAndRetrieve<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	createAndRetrieve<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	createAndRetrieve<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;


	refresh( document:Document, requestOptions?:RequestOptions ):Promise<Document>;

	save( document:Document, requestOptions?:RequestOptions ):Promise<Document>;

	saveAndRefresh( document:Document, requestOptions?:RequestOptions ):Promise<Document>;


	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


export type OverloadedMembers =
	| "get"
	| "resolve"
	| "refresh"
	| "save"
	| "saveAndRefresh"
	| "delte"
;
