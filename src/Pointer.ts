import * as Utils from "./Utils";

export interface Class {
	uri:string;
	resolve():Promise<void>;
}

export interface Library {
	hasPointer( id:string ):boolean;
	getPointer( id:string ):Class;
}

export class Factory {
	static is( value:any ):boolean {
		return !! (
			Utils.isObject( value ) &&
			Utils.hasProperty( value, "uri" ) &&
			Utils.hasFunction( value, "resolve" )
		);
	}
}

export interface Validator {
	inScope( pointer:Class ):boolean;
}

export default Class;
