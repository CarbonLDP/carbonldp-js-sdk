import Value from "./Value";
import * as Utils from "./../Utils";

export interface Class {
	"@list":Array<Value>;
}

export class Factory {
	static is( value:any ):boolean {
		return Utils.hasPropertyDefined( value, "@list" );
	}
}

export default Class;
