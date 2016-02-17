export interface SuiteDescriptor {
	access?:string;
	suiteType:string;
	name?:string;
	description?:string;
}

export interface SpecDescriptor {
	access?:string;
	specType:string;
	name?:string;
	description?:string;
}

export interface InterfaceDescriptor {
	parent?:string;
}

export interface InterfaceSuiteDescriptor extends SuiteDescriptor, InterfaceDescriptor {

}

export interface InterfaceSpecDescriptor extends SpecDescriptor, InterfaceDescriptor {

}

export interface ClassDescriptor extends InterfaceDescriptor {
	interfaces?:string[];
}

export interface ClassSuiteDescriptor extends SuiteDescriptor, ClassDescriptor {
}

export interface ClassSpecDescriptor extends SpecDescriptor, ClassDescriptor {
}

export interface PropertyDescriptor extends SpecDescriptor {
	type:string;
}

export interface MethodDescriptor extends SpecDescriptor {
	arguments?:MethodArgument[];
	returns?:MethodReturn;
}

export interface ReexportsDescriptor extends SpecDescriptor {
	originalLocation: string;
}

export interface MethodArgument {
	name:string;
	type:string;
	description?:string;
	optional?:boolean;
	default?:string;
}

export interface MethodReturn {
	type:string;
	description?:string;
}

export function serialize( descriptor:SuiteDescriptor ):string
export function serialize( descriptor:PropertyDescriptor ):string;
export function serialize( descriptor:MethodDescriptor ):string;
export function serialize( descriptor:any ):string {
	return "JSON" + JSON.stringify( descriptor );
}


function toJSON( descriptor:any ):string {
	return "JSON" + JSON.stringify( descriptor );
}

export const MODULE:string = "module";
export const CLASS:string = "class";
export const INTERFACE:string = "interface";


export const STATIC:string = "static";
export const INSTANCE:string = "instance";

export const CONSTRUCTOR:string = "constructor";
export const METHOD:string = "method";
export const SIGNATURE:string = "signature";
export const PROPERTY:string = "property";
export const SUPER_CLASS:string = "super-class";
export const REEXPORTS:string = "reexports";
export const DEFAULTEXPORT:string = "defaultExport";

export function module( name:string, description:string = null ):string {
	let descriptor:SuiteDescriptor = {
		suiteType: MODULE,
		name: name,
		description: description,
	};

	return toJSON( descriptor );
}

export function clazz( name:string, description:string, parent:string = null, interfaces:Array<string> = null ):string {
	let descriptor:ClassSuiteDescriptor = {
		suiteType: CLASS,
		name: name,
		description: description,
		parent: parent,
		interfaces: interfaces,
	};

	return toJSON( descriptor );
}

export function interfaze( name:string, description:string, parent:string = null ):string {
	let descriptor:InterfaceSuiteDescriptor = {
		suiteType: INTERFACE,
		name: name,
		description: description,
		parent: parent,
	};

	return toJSON( descriptor );
}

export function constructor( description:string = null ):string {
	let descriptor:SuiteDescriptor = {
		suiteType: CONSTRUCTOR,
		description: description,
	};

	return toJSON( descriptor );
}

export function reexports( access: string, name: string, originalLocation: string ): string {
	let descriptor:ReexportsDescriptor = {
		specType: REEXPORTS,
		access: access,
		name: name,
		originalLocation: originalLocation,
	};

	return toJSON( descriptor );
}

export function hasInterface( access:string, name:string ):string;
export function hasInterface( access:string, name:string, description:string = null ):string {
	let descriptor:InterfaceSpecDescriptor = {
		access: access,
		specType: INTERFACE,
		name: name,
		description: description,
	};

	return toJSON( descriptor );
}

export function isDefined():string {
	return "is defined";
}

export function hasConstructor():string;
export function hasConstructor( constructorArguments:MethodArgument[] ):string;
export function hasConstructor( description:string, constructorArguments:MethodArgument[] ):string
export function hasConstructor( argumentsOrDescription:any = null, constructorArguments:MethodArgument[] = null ):string {
	let description:string = null;

	if ( typeof argumentsOrDescription === "string" ) {
		description = argumentsOrDescription;
	} else if ( Object.prototype.toString.call( argumentsOrDescription ) === "[object Array]" ) {
		constructorArguments = argumentsOrDescription;
	}

	let descriptor:MethodDescriptor = {
		access: STATIC,
		specType: CONSTRUCTOR,
		description: description,
		arguments: constructorArguments,
	};

	return toJSON( descriptor );
}

export function hasMethod( access:string, name:string ):string;

export function hasMethod( access:string, name:string, description:string ):string;
export function hasMethod( access:string, name:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, description:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, description:string, returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	let description:string = null, methodArguments:MethodArgument[] = [];

	if ( typeof descriptionOrArgumentsOrReturns === "string" ) {
		description = descriptionOrArgumentsOrReturns;
	} else if ( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === "[object Array]" ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if ( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if ( Object.prototype.toString.call( argumentsOrReturns ) === "[object Array]" ) {
		methodArguments = argumentsOrReturns;
	} else if ( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	let descriptor:MethodDescriptor = {
		access: access,
		specType: METHOD,
		name: name,
		description: description,
		arguments: methodArguments,
		returns: returns,
	};

	return toJSON( descriptor );
}

export function method( access:string, name:string ):string;
export function method( access:string, name:string, description:string ):string;
export function method( access:string, name:string, description:string = null ):string {
	let descriptor:SuiteDescriptor = {
		access: access,
		suiteType: METHOD,
		name: name,
		description: description,
	};

	return toJSON( descriptor );
}

export function hasSignature():string;
export function hasSignature( description:string ):string;
export function hasSignature( description:string, methodArguments:MethodArgument[] ):string;
export function hasSignature( description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( methodArguments:MethodArgument[] ):string;
export function hasSignature( methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( returns:MethodReturn ):string;
export function hasSignature( descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	let description:string = null;
	let methodArguments:MethodArgument[] = null;

	if ( typeof descriptionOrArgumentsOrReturns === "string" ) {
		description = descriptionOrArgumentsOrReturns;
	} else if ( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === "[object Array]" ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if ( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if ( Object.prototype.toString.call( argumentsOrReturns ) === "[object Array]" ) {
		methodArguments = argumentsOrReturns;
	} else if ( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	let descriptor:MethodDescriptor = {
		specType: SIGNATURE,
		description: description,
		arguments: methodArguments,
		returns: returns,
	};

	return toJSON( descriptor );
}

export function hasProperty( access:string, name:string, type:string, description:string = null ):string {
	let descriptor:PropertyDescriptor = {
		access: access,
		specType: PROPERTY,
		name: name,
		type: type,
		description: description,
	};

	return toJSON( descriptor );
}

/* tslint:disable: typedef */
export let property = hasProperty;
/* tslint:enable: typedef */

export function extendsClass( name:string ):string {
	let descriptor:SpecDescriptor = {
		specType: SUPER_CLASS,
		name: name,
	};

	return toJSON( descriptor );
}

export function hasDefaultExport( exportName: string ): string {
	let descriptor:SpecDescriptor = {
		specType: DEFAULTEXPORT,
		name: exportName,
	};

	return toJSON( descriptor );
}
