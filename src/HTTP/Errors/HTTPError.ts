import AbstractError from "./../../Errors/AbstractError";
import * as Pointer from "./../../Pointer";
import * as LDP from "./../../LDP";
import * as Resource from "./../../Resource";
import Response from "./../Response";

class HTTPError extends AbstractError implements LDP.ErrorResponse.Class {
	static get statusCode():number { return null; }

	get name():string { return "HTTPError"; }

	_id:string;
	_resolved:boolean;

	id:string;
	errors:LDP.Error.Class[];
	requestID:string;
	response:Response;
	statusCode:number;
	types:string[];

	isResolved:() => boolean;

	resolve:() => Promise<[ Pointer.Class, Response ]>;

	addType:( type:string ) => void;
	hasType:( type:string ) => boolean;
	removeType:( type:string ) => void;

	constructor( message:string, response:Response ) {
		super( message );

		Resource.Factory.createFrom( this );

		this.errors = [];
		this.requestID = null;
		this.response = response;
		this.statusCode = response.status;
	}
}

export default HTTPError;
