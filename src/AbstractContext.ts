import Context from "./Context";
import * as SDKContext from "./SDKContext";
import * as ObjectSchema from "./ObjectSchema";

export abstract class Class extends SDKContext.Class {
	_parentContext:Context;
	get parentContext():Context { return this._parentContext; };

	// TODO: Make the property `auth:Auth.Class` abstract. In TSC 2.0 https://github.com/Microsoft/TypeScript/issues/4669;

	constructor( parentContext:Context = null ) {
		super();

		this._parentContext = ! ! parentContext ? parentContext : SDKContext.instance;

		this.generalObjectSchema = null;
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();
	}

	abstract resolve( relativeURI:string ):string;
}

export default Class;
