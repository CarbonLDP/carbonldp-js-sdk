import { AuthService } from "./Auth";
import { Context } from "./Context";
import * as ObjectSchema from "./ObjectSchema";
import {
	globalContext,
	SDKContext,
} from "./SDKContext";

export abstract class AbstractContext extends SDKContext {
	protected abstract _baseURI:string;
	get baseURI():string { return this._baseURI; }

	protected _parentContext:Context;
	get parentContext():Context { return this._parentContext; }

	constructor( parentContext?:Context ) {
		super();

		this._parentContext = parentContext ? parentContext : globalContext;

		this.generalObjectSchema = null;
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();
	}

}
