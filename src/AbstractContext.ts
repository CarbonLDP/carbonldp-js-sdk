import Auth from "./Auth";
import Context from "./Context";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as JSONLDConverter from "./JSONLDConverter";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as SDKContext from "./SDKContext";
import * as Utils from "./Utils";
import * as ObjectSchema from "./ObjectSchema";

abstract class AbstractContext extends SDKContext.Class {
	_parentContext:Context;
	get parentContext():Context { return this._parentContext; };

	constructor( parentContext:Context = null ) {
		super();

		this._parentContext = !! parentContext ? parentContext : SDKContext.instance;

		this.generalObjectSchema = !! parentContext ? null : new ObjectSchema.DigestedObjectSchema();
	}

	abstract resolve( relativeURI:string ):string;
}

export default AbstractContext;
