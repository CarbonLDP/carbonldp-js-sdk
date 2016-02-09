/// <reference path="../../typings/typings.d.ts" />

import * as Container from "./Container";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.C.Class.AccessPoint;

export interface Class extends Container.Class {
	membershipResource:string;
}

export const SCHEMA:ObjectSchema.Class = {
	"membershipResource": {
		"@id": NS.LDP.Predicate.membershipResource,
		"@type": "@id",
	},
};

export class Factory {
	hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "membershipResource" )
		);
	}
}

export default Class;
