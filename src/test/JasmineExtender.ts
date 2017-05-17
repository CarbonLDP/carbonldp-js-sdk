import { Url } from "url";
import * as Utils from "../Utils";

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
	generics?:string[];
}

export interface InterfaceSuiteDescriptor extends SuiteDescriptor, InterfaceDescriptor {
}

export interface ClassDescriptor {
	generics:string[];
	interfaces:string[];
}

export interface ClassSuiteDescriptor extends SuiteDescriptor, ClassDescriptor {
}

export interface PropertyDescriptor extends SpecDescriptor {
	type:string;
	optional?:boolean;
}

export interface MethodSuiteDescriptor extends SuiteDescriptor {
	optional?:boolean;
}

export interface MethodDescriptor extends SpecDescriptor {
	generics?:string[];
	arguments?:MethodArgument[];
	returns?:MethodReturn;
	optional?:boolean;
}

export interface ReexportsDescriptor extends SpecDescriptor {
	originalLocation:string;
}

export interface EnumDescriptor extends SpecDescriptor {
}

export interface MethodArgument {
	name:string;
	type:string;
	description?:string;
	optional?:boolean;
	defaultValue?:string;
}

export interface MethodReturn {
	type:string;
	description?:string;
}

export interface DecorateDescriptor extends SuiteDescriptor {
	type:string[];
}

export function serialize( descriptor:SuiteDescriptor ):string;
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

export const OPTIONAL:boolean = true;
export const OBLIGATORY:boolean = false;

export const CONSTRUCTOR:string = "constructor";
export const METHOD:string = "method";
export const SIGNATURE:string = "signature";
export const PROPERTY:string = "property";
export const SUPER_CLASS:string = "super-class";
export const REEXPORTS:string = "reexports";
export const DEFAULTEXPORT:string = "defaultExport";
export const ENUM:string = "enum";
export const DECORATED:string = "decoratedObject";

export function module( name:string, description:string = null ):string {
	let descriptor:SuiteDescriptor = {
		suiteType: MODULE,
		name: name,
		description: description,
	};

	return toJSON( descriptor );
}

export function clazz( name:string, description:string, interfaces?:string[] ):string;
export function clazz( name:string, generics:string[], description:string, interfaces?:string[] ):string;
export function clazz( name:string, descriptionOrGenerics:any, interfacesOrDescription?:any, interfaces:string[] = null ):string {
	interfaces = Utils.isArray( interfacesOrDescription ) ? interfacesOrDescription : interfaces;
	let description:string = Utils.isArray( descriptionOrGenerics ) ? interfacesOrDescription : descriptionOrGenerics;
	let generics:string[] = Utils.isArray( descriptionOrGenerics ) ? descriptionOrGenerics : null;


	let descriptor:ClassSuiteDescriptor = {
		suiteType: CLASS,
		name: name,
		description: description,
		generics: generics,
		interfaces: interfaces,
	};

	return toJSON( descriptor );
}

export function interfaze( name:string, description:string ):string;
export function interfaze( name:string, generics:string[], description:string ):string;
export function interfaze( name:string, descriptionOrGenerics:any, description?:string ):string {
	let generics:string[] = null;
	if( Utils.isArray( descriptionOrGenerics ) ) {
		generics = descriptionOrGenerics;
	} else {
		description = descriptionOrGenerics;
	}

	let descriptor:InterfaceSuiteDescriptor = {
		suiteType: INTERFACE,
		name: name,
		description: description,
		generics: generics,
	};

	return toJSON( descriptor );
}

export function enumeration( name:string, description:string = null ):string {
	let descriptor:SuiteDescriptor = {
		suiteType: ENUM,
		name: name,
		description: description,
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

export function reexports( access:string, name:string, originalLocation:string ):string {
	let descriptor:ReexportsDescriptor = {
		specType: REEXPORTS,
		access: access,
		name: name,
		originalLocation: originalLocation,
	};

	return toJSON( descriptor );
}

export function decoratedObject( description:string, type:string[] ):string {
	let descriptor:DecorateDescriptor = {
		suiteType: DECORATED,
		type: type,
		description: description,
	};

	return toJSON( descriptor );
}

export function isDefined():string {
	return "is defined";
}

export function hasConstructor():string;
export function hasConstructor( constructorArguments:MethodArgument[] ):string;
export function hasConstructor( description:string, constructorArguments:MethodArgument[] ):string;
export function hasConstructor( argumentsOrDescription:any = null, constructorArguments:MethodArgument[] = null ):string {
	let description:string = null;

	if( typeof argumentsOrDescription === "string" ) {
		description = argumentsOrDescription;
	} else if( Object.prototype.toString.call( argumentsOrDescription ) === "[object Array]" ) {
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

// Interface versions
export function hasMethod( optional:boolean, name:string ):string;

export function hasMethod( optional:boolean, name:string, description:string ):string;
export function hasMethod( optional:boolean, name:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( optional:boolean, name:string, generics:string[], methodArguments:MethodArgument[] ):string;
export function hasMethod( optional:boolean, name:string, returns:MethodReturn ):string;
export function hasMethod( optional:boolean, name:string, generics:string[], returns:MethodReturn ):string;

export function hasMethod( optional:boolean, name:string, description:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( optional:boolean, name:string, generics:string[], description:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( optional:boolean, name:string, description:string, returns:MethodReturn ):string;
export function hasMethod( optional:boolean, name:string, generics:string[], description:string, returns:MethodReturn ):string;
export function hasMethod( optional:boolean, name:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasMethod( optional:boolean, name:string, generics:string[], methodArguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( optional:boolean, name:string, description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasMethod( optional:boolean, name:string, generics:string[], description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;

// Class versions

export function hasMethod( access:string, name:string ):string;

export function hasMethod( access:string, name:string, description:string ):string;
export function hasMethod( access:string, name:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, generics:string[], methodArguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, generics:string[], returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, description:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, generics:string[], description:string, methodArguments:MethodArgument[] ):string;
export function hasMethod( access:string, name:string, description:string, returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, generics:string[], description:string, returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, generics:string[], methodArguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( access:string, name:string, description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasMethod( access:string, name:string, generics:string[], description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;

export function hasMethod( accessOrOptional:string | boolean, name:string, genericsOrDescriptionOrArgumentsOrReturns:any = null, descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	let access:string = null;
	let optional:boolean = null;
	if( Utils.isBoolean( accessOrOptional ) ) {
		optional = <boolean> accessOrOptional;
	} else {
		access = <string> accessOrOptional;
	}

	let generics:string[] = null;
	let description:string = null;
	let methodArguments:MethodArgument[] = [];

	if( Object.prototype.toString.call( genericsOrDescriptionOrArgumentsOrReturns ) === "[object Array]" && typeof genericsOrDescriptionOrArgumentsOrReturns[ 0 ] === "string" ) {
		generics = genericsOrDescriptionOrArgumentsOrReturns;
	} else {
		returns = argumentsOrReturns;
		argumentsOrReturns = descriptionOrArgumentsOrReturns;
		descriptionOrArgumentsOrReturns = genericsOrDescriptionOrArgumentsOrReturns;
	}

	if( typeof descriptionOrArgumentsOrReturns === "string" ) {
		description = descriptionOrArgumentsOrReturns;
	} else if( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === "[object Array]" ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if( Object.prototype.toString.call( argumentsOrReturns ) === "[object Array]" ) {
		methodArguments = argumentsOrReturns;
	} else if( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	let descriptor:MethodDescriptor = {
		access: access,
		specType: METHOD,
		name: name,
		generics: generics,
		description: description,
		arguments: methodArguments,
		returns: returns,
		optional: optional,
	};

	return toJSON( descriptor );
}

// Interface versions
export function method( optional:boolean, name:string ):string;
export function method( optional:boolean, name:string, description:string ):string;

// Class versions
export function method( access:string, name:string ):string;
export function method( access:string, name:string, description:string ):string;

export function method( accessOrOptional:string | boolean, name:string, description:string = null ):string {
	let access:string = null;
	let optional:boolean = null;
	if( Utils.isBoolean( accessOrOptional ) ) {
		optional = <boolean> accessOrOptional;
	} else {
		access = <string> accessOrOptional;
	}

	let descriptor:MethodSuiteDescriptor = {
		access: access,
		suiteType: METHOD,
		name: name,
		description: description,
		optional: optional,
	};

	return toJSON( descriptor );
}

export function hasSignature():string;
export function hasSignature( description:string ):string;
export function hasSignature( description:string, returns:MethodReturn ):string;
export function hasSignature( generics:string[], description:string, returns:MethodReturn ):string;
export function hasSignature( description:string, methodArguments:MethodArgument[] ):string;
export function hasSignature( generics:string[], description:string, methodArguments:MethodArgument[] ):string;
export function hasSignature( description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( generics:string[], description:string, methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( methodArguments:MethodArgument[] ):string;
export function hasSignature( generics:string[], methodArguments:MethodArgument[] ):string;
export function hasSignature( methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( generics:string[], methodArguments:MethodArgument[], returns:MethodReturn ):string;
export function hasSignature( returns:MethodReturn ):string;
export function hasSignature( generics:string[], returns:MethodReturn ):string;
export function hasSignature( genericsOrDescriptionOrArgumentsOrReturns:any = null, descriptionOrArgumentsOrReturns:any = null, argumentsOrReturns:any = null, returns:MethodReturn = null ):string {
	let generics:string[] = null;
	let description:string = null;
	let methodArguments:MethodArgument[] = null;

	if( Object.prototype.toString.call( genericsOrDescriptionOrArgumentsOrReturns ) === "[object Array]" && typeof genericsOrDescriptionOrArgumentsOrReturns[ 0 ] === "string" ) {
		generics = genericsOrDescriptionOrArgumentsOrReturns;
	} else {
		returns = argumentsOrReturns;
		argumentsOrReturns = descriptionOrArgumentsOrReturns;
		descriptionOrArgumentsOrReturns = genericsOrDescriptionOrArgumentsOrReturns;
	}

	if( typeof descriptionOrArgumentsOrReturns === "string" ) {
		description = descriptionOrArgumentsOrReturns;
	} else if( Object.prototype.toString.call( descriptionOrArgumentsOrReturns ) === "[object Array]" ) {
		methodArguments = descriptionOrArgumentsOrReturns;
	} else if( descriptionOrArgumentsOrReturns ) {
		returns = descriptionOrArgumentsOrReturns;
	}

	if( Object.prototype.toString.call( argumentsOrReturns ) === "[object Array]" ) {
		methodArguments = argumentsOrReturns;
	} else if( argumentsOrReturns ) {
		returns = argumentsOrReturns;
	}

	let descriptor:MethodDescriptor = {
		specType: SIGNATURE,
		generics: generics,
		description: description,
		arguments: methodArguments,
		returns: returns,
	};

	return toJSON( descriptor );
}

// Interface versions
export function hasProperty( optional:boolean, name:string, type:string ):string;
export function hasProperty( optional:boolean, name:string, type:string, description:string ):string;

// Class versions
export function hasProperty( access:string, name:string, type:string ):string;
export function hasProperty( access:string, name:string, type:string, description:string ):string;

export function hasProperty( accessOrOptional:string | boolean, name:string, type:string, description:string = null ):string {
	let access:string = null;
	let optional:boolean = null;
	if( Utils.isBoolean( accessOrOptional ) ) {
		optional = <boolean> accessOrOptional;
	} else {
		access = <string> accessOrOptional;
	}

	let descriptor:PropertyDescriptor = {
		access: access,
		specType: PROPERTY,
		name: name,
		type: type,
		description: description,
		optional: optional,
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

export function hasDefaultExport( exportName:string, description:string = null ):string {
	let descriptor:SpecDescriptor = {
		specType: DEFAULTEXPORT,
		name: exportName,
		description: description,
	};

	return toJSON( descriptor );
}

export function hasEnumeral( name:string, description:string = null ):string {
	let descriptor:EnumDescriptor = {
		specType: ENUM,
		name: name,
		description: description,
	};

	return toJSON( descriptor );
}

if( typeof XMLHttpRequest === "undefined" ) {
	/* tslint:disable */
	const nock:any = require( "nock" );
	const URL:any = require( "url" );
	/* tslint:enable */

	const METHODS:string[] = [ "OPTIONS", "HEAD", "GET", "POST", "PUT", "PATCH", "DELETE" ];

	(jasmine as any).Ajax = (() => {
		let installed:boolean = false;

		let requests:any[] = [];

		let scopes:any[] = [];

		function createScope( basePath:string | RegExp ):any {
			const scope:any = new nock( basePath );
			scope.persist();
			scope.on( "request", updateRequests );
			scopes.push( scope );
			return scope;
		}

		function install():void {
			installed = true;
			nock.disableNetConnect();
			createScope( /.*/ );
		}

		function uninstall():void {
			installed = false;
			requests = [];
			nock.cleanAll();
			nock.enableNetConnect();
			scopes.length = 0;
		}

		function andReturn( interceptors:any[] ):Function {
			return ( options:JasmineAjaxRequestStubReturnOptions ) => {
				for( let req of interceptors ) {
					req.reply( options.status || 200, options.responseText || options.response || "", options.responseHeaders || {} );
				}
			};
		}

		function stubRequest( url:string, data:string, methods:string = "*" ):any {
			if( ! installed ) throw new Error( "Jasmine Ajax not installed" );
			data = data || undefined;

			let applicableScopes:any[] = scopes;
			if( Utils.isString( url ) ) {
				const parsedURL:Url = URL.parse( url );
				const port:string = parsedURL.port || parsedURL.protocol === "http:" ? "80" : "443";
				const basePath:string = parsedURL.protocol + "//" + parsedURL.hostname + ":" + port;

				applicableScopes = scopes.filter( scope => scope.basePath === basePath );
				if( applicableScopes.length === 0 )
					applicableScopes = [ createScope( basePath ) ];

				url = parsedURL.path || "" + parsedURL.hash || "";
			}

			let currentInterceptors:any[] = [];
			let currentMethods:string[] = [ methods ];
			if( methods === "*" ) currentMethods = METHODS;

			for( let method of currentMethods ) {
				applicableScopes.forEach( scope => {
					scope.interceptors
						.filter( interceptor => interceptor.uri === url )
						.filter( interceptor => interceptor.method === method )
						.filter( interceptor => interceptor._requestBody === data )
						.forEach( interceptor => nock.removeInterceptor( interceptor ) )
					;

					currentInterceptors.push( scope.intercept( url, method, data ) );
				} );
			}

			return {
				method: methods,
				andReturn: andReturn( currentInterceptors ),
			};
		}

		function updateRequests( req:any, interceptor:any ):void {
			requests.push( {
				url: req.path,
				method: interceptor.method,
				requestHeaders: req.headers,
			} );
		}


		function requestMostRecent():any {
			return requests[ requests.length - 1 ];
		}

		function requestAt( index:number ):any {
			return requests[ index ];
		}

		function requestFilter( urlToMatch:string | RegExp | Function ):any[] {
			let results:any[] = [];

			for( let request of requests ) {
				let url:string | RegExp = request.url;
				if( urlToMatch instanceof RegExp && urlToMatch.test( <string> url )
					|| urlToMatch instanceof Function && (<Function> urlToMatch)( request )
					|| urlToMatch === url ) {
					results.push( request );
				}
			}

			return results;
		}

		return {
			install: install,
			uninstall: uninstall,
			stubRequest: stubRequest,
			requests: {
				mostRecent: requestMostRecent,
				at: requestAt,
				filter: requestFilter,
			},
		};
	})();

}
