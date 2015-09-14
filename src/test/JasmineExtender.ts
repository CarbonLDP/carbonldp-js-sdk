export interface SuiteDescriptor {
	access:string;
	name:string;
	description?:string;
}

export interface SpecDescriptor {
	access:string;
	specType:string;
	name:string;
	description?:string;
}

export interface PropertyDescriptor extends SpecDescriptor {
	type:string;
}

export interface MethodDescriptor extends SpecDescriptor {
	arguments?:MethodArgument[];
	result?:MethodReturn;
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

export const MODULE = 'module';
export const SUBMODULE = 'submodule';
export const CLASS = 'class';
export const INTERFACE = 'interface';


export const STATIC:string = 'static';
export const INSTANCE:string = 'instance';

export const CONSTRUCTOR:string = 'constructor';
export const METHOD:string = 'method';
export const PROPERTY:string = 'property';

export function module( name:string, description:string = null ):string {
	var descriptor = {
		suiteType: MODULE,
		name: name,
		description: description
	};

	return toJSON( descriptor );
}

export function submodule( access:string, name:string, description:string = null ):string {
	var descriptor = {
		suiteType: SUBMODULE,
		access: access,
		name: name,
		description: description
	};

	return toJSON( descriptor );
}

export function clazz( name:string, description:string, parent:string = null, interfaces:Array<string> = null ):string {
	var descriptor = {
		suiteType: CLASS,
		name: name,
		description: description,
		parent: parent,
		interfaces: interfaces
	};

	return toJSON( descriptor );
}

export function interfaze( name:string, description:string, parent:string = null ):string {
	var descriptor = {
		suiteType: INTERFACE,
		name: name,
		description: description,
		parent: parent
	};

	return toJSON( descriptor );
}

export function constructor( name:string, description:string, parent:string = null ):string {
	var descriptor = {
		suiteType: CONSTRUCTOR,
		name: name,
		description: description,
		parent: parent
	};

	return toJSON( descriptor );
}

export function hasInterface( access:string, name:string ):string;
export function hasInterface( access:string, name:string, description:string ):string;
export function hasInterface( access:string, name:string, properties:MethodArgument[] ):string;
export function hasInterface( access:string, name:string, returns:MethodReturn ):string;
export function hasInterface( access:string, name:string, description:string, properties:MethodArgument[] ):string;
export function hasInterface( access:string, name:string, description:string, returns:MethodReturn ):string;
export function hasInterface( access:string, name:string, arguments:MethodArgument[], returns:MethodReturn ):string;
export function hasInterface( access:string, name:string, description:string, arguments:MethodArgument[], returns:MethodReturn ):string;
export function hasInterface( access:string, name:string, descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	var description = null, methodArguments = [];

	if ( typeof descriptionOrArgumentsOrReturns === 'string' ) {
		description = descriptionOrArgumentsOrReturns;
	} else if ( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === '[object Array]' ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if ( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if ( Object.prototype.toString.call( argumentsOrReturns ) === '[object Array]' ) {
		methodArguments = argumentsOrReturns;
	} else if ( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	var descriptor = {
		access: access,
		specType: INTERFACE,
		name: name,
		description: description,
		arguments: methodArguments,
		returns: returns
	};

	return toJSON( descriptor );
}

export function isDefined():string {
	return 'defined';
}

export function hasConstructor():string;
export function hasConstructor( arguments:MethodArgument[] ):string;
export function hasConstructor( description:string, arguments:MethodArgument[] ):string
export function hasConstructor( argumentsOrDescription:any = null, arguments:MethodArgument[] = null ):string {
	var description = null;

	if ( typeof argumentsOrDescription === 'string' ) {
		description = argumentsOrDescription;
	} else if ( Object.prototype.toString.call( argumentsOrDescription ) === '[object Array]' ) {
		arguments = argumentsOrDescription;
	}

	var descriptor = {
		access: STATIC,
		specType: CONSTRUCTOR,
		description: description,
		arguments: arguments
	};

	return toJSON( descriptor );
}

export function hasMethod( access:string, name:string ):string;

export function hasMethod( access:string, name:string, description:string ):string;
export function hasMethod( access:string, name:string, arguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, description:string, arguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, description:string, returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, arguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, description:string, arguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	var description = null, methodArguments = [];

	if ( typeof descriptionOrArgumentsOrReturns === 'string' ) {
		description = descriptionOrArgumentsOrReturns;
	} else if ( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === '[object Array]' ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if ( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if ( Object.prototype.toString.call( argumentsOrReturns ) === '[object Array]' ) {
		methodArguments = argumentsOrReturns;
	} else if ( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	var descriptor = {
		access: access,
		specType: METHOD,
		name: name,
		description: description,
		arguments: methodArguments,
		returns: returns
	};

	return toJSON( descriptor );
}

export var method = hasMethod;

export function hasSignature();
export function hasSignature( description:string ):string;
export function hasSignature( description:string, arguments:MethodArgument[] ):string;
export function hasSignature( description:string, arguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( arguments:MethodArgument[] ):string;
export function hasSignature( arguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( returns:MethodReturn ):string;
export function hasSignature( descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	var description = null;
	var methodArguments = null;

	if ( typeof descriptionOrArgumentsOrReturns === 'string' ) {
		description = descriptionOrArgumentsOrReturns;
	} else if ( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === '[object Array]' ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if ( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if ( Object.prototype.toString.call( argumentsOrReturns ) === '[object Array]' ) {
		methodArguments = argumentsOrReturns;
	} else if ( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	var descriptor = {
		description: description,
		arguments: methodArguments,
		returns: returns
	};

	return toJSON( descriptor );
}

export function hasProperty( access:string, name:string, type:string, description:string = null ):string {
	var descriptor = {
		access: access,
		specType: PROPERTY,
		name: name,
		type: type,
		description: description
	};

	return toJSON( descriptor );
}

export var property = hasProperty;