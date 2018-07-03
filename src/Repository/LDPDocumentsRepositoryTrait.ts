import { Document } from "../Document";
import { RequestOptions } from "../HTTP";
import { Repository } from "./Repository";


export interface LDPDocumentsRepositoryTrait extends Repository {
	get( uri:string, requestOptions?:RequestOptions ):Promise<Document>;

	resolve( document:Document, requestOptions?:RequestOptions ):Promise<Document>;
}
