/// <reference path="./../typings/tsd.d.ts" />

import Auth from "./Auth";
import * as ContextDigester from "./ContextDigester";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as JSONLDConverter from "./JSONLDConverter";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

abstract class Context {
	/* tslint:disable: variable-name */
	Auth:Auth;
	Documents:Documents;
	/* tslint:enable: variable-name */

	parentContext:Context;

	protected settings:Map<string, any>;

	protected mainContext:ContextDigester.DigestedContext;
	protected classContexts:Map<string, ContextDigester.DigestedContext>;

	constructor( parentContext:Context = null ) {
		this.parentContext = parentContext;

		this.settings = new Map<string, any>();

		this.mainContext = new ContextDigester.DigestedContext();
		this.classContexts = new Map<string, ContextDigester.DigestedContext>();

		this.Auth = new Auth( this );
		this.Documents = new Documents( this );
	}

	getBaseURI():string {
		return this.resolve( "" );
	}

	abstract resolve( relativeURI:string ):string;

	hasSetting( name:string ):boolean {
		return (
			this.settings.has( name ) ||
			( this.parentContext && this.parentContext.hasSetting( name ) )
		);
	}

	getSetting( name:string ):any {
		if( this.settings.has( name ) ) return this.settings.get( name );
		if( this.parentContext && this.parentContext.hasSetting( name ) ) return this.parentContext.getSetting( name );
		return null;
	}

	setSetting( name:string, value:any ):any {
		this.settings.set( name, value );
	}

	deleteSetting( name:string ):any {
		this.settings.delete( name );
	}

	getMainContext():ContextDigester.DigestedContext {
		return this.mainContext;
	}

	expandMainContext( contexts:ContextDigester.Context[] ):void;
	expandMainContext( context:ContextDigester.Context ):void;
	expandMainContext( contextOrContexts:any ):void {
		let digestedContext:ContextDigester.DigestedContext = ContextDigester.Class.digestContext( contextOrContexts );
		this.mainContext = ContextDigester.Class.combineDigestedContexts( [ this.mainContext, digestedContext ] );
	}

	setMainContext( contexts:ContextDigester.Context[] ):void;
	setMainContext( context:ContextDigester.Context ):void;
	setMainContext( contextOrContexts:any ):void {
		this.mainContext = ContextDigester.Class.digestContext( contextOrContexts );
	}

	hasClassContext( classURI:string ):boolean {
		return this.classContexts.has( classURI );
	}

	getClassContext( classURI:string ):ContextDigester.DigestedContext {
		return this.classContexts.get( classURI );
	}

	expandClassContext( classURI:string, contexts:ContextDigester.Context[] ):void;
	expandClassContext( classURI:string, context:ContextDigester.Context ):void;
	expandClassContext( classURI:string, contextOrContexts:any ):void {
		if( ! this.classContexts.has( classURI ) ) {
			this.setClassContext( classURI, contextOrContexts );
			return;
		}

		let digestedContext:ContextDigester.DigestedContext = ContextDigester.Class.digestContext( contextOrContexts );
		digestedContext = ContextDigester.Class.combineDigestedContexts( [ this.classContexts.get( classURI ), digestedContext ] );
		this.classContexts.set( classURI, digestedContext );
	}

	setClassContext( classURI:string, contexts:ContextDigester.Context[] ):void;
	setClassContext( classURI:string, context:ContextDigester.Context ):void;
	setClassContext( classURI:string, contextOrContexts:any ):void {
		let digestedContext:ContextDigester.DigestedContext = ContextDigester.Class.digestContext( contextOrContexts );
		digestedContext = ContextDigester.Class.combineDigestedContexts( [ this.mainContext, digestedContext ] );

		this.classContexts.set( classURI, digestedContext );
	}
}

export default Context;
