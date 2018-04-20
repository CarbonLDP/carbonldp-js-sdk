import { AbstractError } from "../../Errors";
import { Error } from "../../LDP/Error";
import { ErrorResponse } from "../../LDP/ErrorResponse";
import { Document } from "../../Document";
import { TransientResource } from "../../TransientResource";
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

	resolve:<T>() => Promise<T & Document>;

	addType:( type:string ) => void;
	hasType:( type:string ) => boolean;
	removeType:( type:string ) => void;

	constructor( message:string, response:Response ) {
		super( message );

		TransientResource.createFrom( this );

		this.errors = [];
		this.requestID = null;
		this.response = response;
		this.statusCode = response.status;
	}
}
