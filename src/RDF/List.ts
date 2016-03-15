import Value from "./Value";
import * as Utils from "./../Utils";

export interface Class {
	"@list":Array<Value>;
}

export class Factory {
	static is( value:any ):boolean {
		return Utils.isObject( value )
			&& Utils.hasProperty( value, "@list" )
			&& Utils.isArray( value[ "@list" ] );
	}
}

export default Class;
