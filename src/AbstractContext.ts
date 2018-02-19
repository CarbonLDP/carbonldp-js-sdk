import Context from "./Context";
import * as ObjectSchema from "./ObjectSchema";
import * as SDKContext from "./SDKContext";

export abstract class AbstractContext extends SDKContext.Class {
	protected abstract _baseURI:string;
	get baseURI():string { return this._baseURI; }

	protected _parentContext:Context;
	get parentContext():Context { return this._parentContext; }

	constructor( parentContext?:Context ) {
		super();

		this._parentContext = parentContext ? parentContext : SDKContext.instance;

		this.generalObjectSchema = null;
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();
	}

}

export default AbstractContext;
