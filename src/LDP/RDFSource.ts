import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as RDF from "./../RDF";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.RDFSource;

export const SCHEMA:ObjectSchema.Class = {

};

export interface Class extends Resource.Class {

}

export class Factory {

}

export let factory:Factory = new Factory();

export default Class;
