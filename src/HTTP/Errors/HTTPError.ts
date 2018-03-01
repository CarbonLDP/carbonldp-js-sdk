import { AbstractError } from "../../Errors";
import { Resource } from "../../Resource";
import { Response } from "../Response";
import * as LDP from "../../LDP";
import { PersistedDocument } from "./../../PersistedDocument";

export class HTTPError extends AbstractError implements LDP.ErrorResponse.Class {
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

	resolve:<T>() => Promise<[ T & PersistedDocument, Response ]>;

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
