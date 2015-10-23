import * as Literal from './Literal';
import * as RDFNode from './RDFNode';

interface Value {
	'@id'?:string;
	'@type'?:string;
	'@value'?:string;
}

class Util {
	static areEqual( value1:Value, value2:Value ):boolean {
		if ( Literal.Factory.is( value1 ) && Literal.Factory.is( value2 ) ) {
			return Literal.Util.areEqual( <Literal.Class> value1, <Literal.Class> value2 );
		} else if ( RDFNode.Factory.is( value1 ) && RDFNode.Factory.is( value2 ) ) {
			return RDFNode.Util.areEqual( <RDFNode.Class> value1, <RDFNode.Class> value2 );
		} else return false;
	}
}

export { Value as Class, Util };