//@formatter:off
import {
	Persisted,
	PropertyDescription,
	RDFNode,
	Resource
} from '../../RDF';
import * as CP from '../../namespaces/CP';
//@formatter:on


interface PATCHRequest extends Resource.Class {
	addAction:Map<string, RDFNode.Class>;
	setAction:Map<string, RDFNode.Class>;
	deleteAction:Map<string, RDFNode.Class>;
}

class Factory {
	static create():PATCHRequest;
	static create( object:Persisted.Class ):PATCHRequest;
	static create( objects:Persisted.Class[] ):PATCHRequest;
	static create( objectOrObjects:any = [] ):PATCHRequest {
		var patch:PATCHRequest = <any> Resource.Factory.create();

		// TODO: Implement
		return null;
	}

	private static injectBehaviour( value:PATCHRequest ):PATCHRequest {
		// TODO: Implement
		return null;
	}
}

//@formatter:off
export {
	PATCHRequest as Class,
	Factory
};
//@formatter:on