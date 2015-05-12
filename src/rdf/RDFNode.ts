import * as Utils from '../Utils';

interface RDFNode {
	'@id':string;
}

class Factory {
	static is( value:any ):boolean {
		if ( ! Utils.isObject( value ) ) return false;
		if ( ! Utils.hasProperty( value, '@id' ) ) return false;

		return true;
	}
}

export { RDFNode as Class, Factory };