import { Context } from "../../Context";
import { AbstractError } from "../../Errors";
import {
	Error,
	ErrorResponse
} from "../../LDP";
import { RDFNode } from "../../RDF";
import { Resource } from "../../Resource";
import { Response } from "../Response";


export class HTTPError extends AbstractError implements ErrorResponse {
	static get statusCode():number { return null; }

	get name():string { return "HTTPError"; }

	$registry:undefined;
	$id:string;
	$slug:string;

	errors:Error[];
	requestID:string;
	response:Response;
	statusCode:number;

	types:string[];

	addType:( type:string ) => void;
	hasType:( type:string ) => boolean;
	removeType:( type:string ) => void;
	toJSON:( registryOrKey:Context | string ) => RDFNode;

	constructor( message:string, response:Response ) {
		super( message );

		Resource.createFrom( this );

		this.errors = [];
		this.requestID = null;
		this.response = response;
		this.statusCode = response.status;
	}
}
