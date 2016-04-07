import * as DirectContainer from "./DirectContainer";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.IndirectContainer;

export interface Class extends DirectContainer.Class {
	insertedContentRelation:Pointer.Class;
}

export class Factory {
	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "insertedContentRelation" )
		);
	}
}

export default Class;
