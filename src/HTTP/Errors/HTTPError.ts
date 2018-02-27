import { Resource } from "../../Resource";
import { Response } from "../Response";
import AbstractError from "./../../Errors/AbstractError";
import * as LDP from "./../../LDP";
import * as PersistedDocument from "./../../PersistedDocument";

export class Class extends AbstractError implements LDP.ErrorResponse.Class {
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

	resolve:<T>() => Promise<[ T & PersistedDocument.Class, Response ]>;

	addType:( type:string ) => void;
	hasType:( type:string ) => boolean;
	removeType:( type:string ) => void;

	constructor( message:string, response:Response ) {
		super( message );
		Object.setPrototypeOf( this, Class.prototype );

		Resource.createFrom( this );

		this.errors = [];
		this.requestID = null;
		this.response = response;
		this.statusCode = response.status;
	}
}

export default Class;
