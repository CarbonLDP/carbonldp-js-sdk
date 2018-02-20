import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as URI from "./../RDF/URI";
import * as Resource from "./../Resource";


export const TICKETS_CONTAINER:string = "auth-tickets/";

export const RDF_CLASS:string = CS.Ticket;

export const SCHEMA:ObjectSchema.Class = {
	"forURI": {
		"@id": CS.forIRI,
		"@type": "@id",
	},
	"expirationTime": {
		"@id": CS.expirationTime,
		"@type": XSD.dateTime,
	},
	"ticketKey": {
		"@id": CS.ticketKey,
		"@type": XSD.string,
	},
};

export interface Class extends Resource.Class {
	forURI:Pointer.Class;
	expirationTime:Date;
	ticketKey:string;
}

export class Factory {

	static create( uri:string ):Class {
		return Factory.createFrom( Resource.Factory.create( URI.Util.generateBNodeID() ), uri );
	}

	static createFrom<T extends Resource.Class>( object:T, uri:string ):Class & T {
		let ticket:Class & T = <any> object;
		ticket.forURI = Pointer.Factory.create( uri );
		ticket.types.push( RDF_CLASS );

		return ticket;
	}

}

export default Class;
