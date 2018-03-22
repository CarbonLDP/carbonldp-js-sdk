import { AbstractError } from "../../Errors";
import { Error } from "../../LDP/Error";
import { ErrorResponse } from "../../LDP/ErrorResponse";
import { PersistedDocument } from "../../PersistedDocument";
import { Resource } from "../../Resource";
import { Response } from "../Response";

export class HTTPError extends AbstractError implements ErrorResponse {
	static get statusCode():number { return null; }

	get name():string { return "HTTPError"; }

	_id:string;
	_resolved:boolean;

	id:string;
	errors:Error[];
	requestID:string;
	response:Response;
	statusCode:number;
	types:string[];

	isResolved:() => boolean;

	resolve:<T>() => Promise<T & PersistedDocument>;

	addType:( type:string ) => void;
	hasType:( type:string ) => boolean;
	removeType:( type:string ) => void;

	constructor( message:string, response:Response ) {
		super( message );

		Resource.createFrom( this );

		this.errors = [];
		this.requestID = null;
		this.response = response;
		this.statusCode = response.status;
	}
}

export default HTTPError;
