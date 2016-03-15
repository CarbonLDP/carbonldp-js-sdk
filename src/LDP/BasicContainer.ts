/// <reference path="./../../typings/typings.d.ts" />

import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as RDF from "./../RDF";
import * as Container from "./Container";
import * as Utils from "./../Utils";
import * as Resource from "./../Resource";

export const RDF_CLASS:string = NS.LDP.Class.BasicContainer;

export interface Class extends Container.Class {

}

export class Factory {
	static hasRDFClass( pointer:Pointer.Class ):boolean;
	static hasRDFClass( expandedObject:Object ):boolean;
	static hasRDFClass( pointerOrExpandedObject:Object ):boolean {
		let types:string[] = [];
		if( "@type" in pointerOrExpandedObject ) {
			types = pointerOrExpandedObject[ "@type" ];
		} else if( "types" in pointerOrExpandedObject ) {
			types = ( <Resource.Class> pointerOrExpandedObject ).types ;
		}

		return types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1;
	}
}

export default Class;
