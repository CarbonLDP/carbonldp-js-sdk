import * as RDFNode from "./RDFNode";

interface MixinFactory<C> {
	is( object:Object ):boolean;

	from( resource:RDFNode.Class ):C;
	from( resources:RDFNode.Class[] ):C[];
	from( resourceOrResources:any ):any;
}
