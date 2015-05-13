import * as Utils from '../Utils';

interface RDFNode {
	'@id':string;
}

class Factory {
	static is( value:any ):boolean {
		//@formatter:off
		return (
			( ! Utils.isNull( value ) ) &&
			Utils.isObject( value ) &&
			Utils.hasProperty( value, '@id' )
		);
		//@formatter:on
	}
}

class Util {
	static areEqual( node1:RDFNode, node2:RDFNode ):boolean {
		return node1[ '@id' ] === node2[ '@id' ];
	}
}

export { RDFNode as Class, Factory, Util };