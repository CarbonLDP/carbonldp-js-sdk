/// <reference path="./../../typings/tsd.d.ts" />

import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Container from "./Container";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.BasicContainer;

export interface Class extends Container.Class {

}

export class Factory {
	hasRDFClass( pointer:Pointer.Class ):boolean;
	hasRDFClass( expandedObject:Object ):boolean;
	hasRDFClass( pointerOrExpandedObject:Object ):boolean {
		let types:string[] = [];
		if( "@type" in pointerOrExpandedObject ) {
			types = pointerOrExpandedObject[ "@type" ];
		} else if( "types" in pointerOrExpandedObject ) {
			// TODO: Use proper class
			let resource:{ types: Pointer.Class[] } = <any> pointerOrExpandedObject;
			types = Pointer.Util.getIDs( resource.types );
		}

		return types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1;
	}
}

export let factory:Factory = new Factory();

export default Class;
