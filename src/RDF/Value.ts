import * as Literal from "./Literal";
import * as RDFNode from "./RDFNode";

export interface Class {
	"@id"?:string;
	"@type"?:string;
	"@value"?:string;
}

export class Util {
	static areEqual( value1:Class, value2:Class ):boolean {
		if ( Literal.Factory.is( value1 ) && Literal.Factory.is( value2 ) ) {
			return Literal.Util.areEqual( <Literal.Class> value1, <Literal.Class> value2 );
		} else if ( RDFNode.Factory.is( value1 ) && RDFNode.Factory.is( value2 ) ) {
			return RDFNode.Util.areEqual( <RDFNode.Class> value1, <RDFNode.Class> value2 );
		} else return false;
	}
}
