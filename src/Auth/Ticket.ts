import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
import * as URI from "./../RDF/URI";


export const TICKETS_CONTAINER:string = "auth-tickets/";

export const RDF_CLASS:string = NS.CS.Ticket;

export const SCHEMA:ObjectSchema.Class = {
	"forURI": {
		"@id": NS.CS.forIRI,
		"@type": "@id",
	},
	"expirationTime": {
		"@id": NS.CS.expirationTime,
		"@type": NS.XSD.dateTime,
	},
	"ticketKey": {
		"@id": NS.CS.ticketKey,
		"@type": NS.XSD.string,
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
