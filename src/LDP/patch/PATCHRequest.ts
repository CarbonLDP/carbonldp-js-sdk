//@formatter:off
import * as RDF from '../../RDF';
import * as CP from '../../NS/CP';
//@formatter:on


interface PATCHRequest extends RDF.Resource.Class {
	addAction:Map<string, RDF.Node.Class>;
	setAction:Map<string, RDF.Node.Class>;
	deleteAction:Map<string, RDF.Node.Class>;
}

class Factory {
	static create():PATCHRequest;
	static create( object:RDF.Persisted.Class ):PATCHRequest;
	static create( objects:RDF.Persisted.Class[] ):PATCHRequest;
	static create( objectOrObjects:any = [] ):PATCHRequest {
		var patch:PATCHRequest = <any> RDF.Resource.factory.create();

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