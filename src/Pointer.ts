import * as Utils from "./Utils";

export interface Class {
	id:string;
	resolve():Promise<void>;
}

export interface Library {
	hasPointer( id:string ):boolean;
	getPointer( id:string ):Class;
}

export class Factory {
	is( value:any ):boolean {
		return !! (
			Utils.isObject( value ) &&
			Utils.hasProperty( value, "id" ) &&
			Utils.hasFunction( value, "resolve" )
		);
	}
}

export let factory:Factory = new Factory();

export class Util {
	static getIDs( pointers:Class[] ):string[] {
		let ids:string[] = [];
		for( let pointer of pointers ) {
			ids.push( pointer.id );
		}
		return ids;
	}
}

export interface Validator {
	inScope( id:string ):boolean;
	inScope( pointer:Class ):boolean;
}

export default Class;
