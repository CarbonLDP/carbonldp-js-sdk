import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
import * as URI from "./../RDF/URI";


export const TICKETS_CONTAINER:string = "auth-tickets/";

export const RDF_CLASS:string = NS.CS.Class.Ticket;

export const SCHEMA:ObjectSchema.Class = {
	"forURI": {
		"@id": NS.CS.Predicate.forIRI,
		"@type": "@id",
	},
	"expirationTime": {
		"@id": NS.CS.Predicate.expirationTime,
		"@type": NS.XSD.DataType.dateTime,
	},
	"ticketKey": {
		"@id": NS.CS.Predicate.ticketKey,
		"@type": NS.XSD.DataType.string,
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
