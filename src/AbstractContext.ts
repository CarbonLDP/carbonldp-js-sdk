import Auth from "./Auth";
import Context from "./Context";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as JSONLDConverter from "./JSONLD/Converter";
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

		this._parentContext = ! ! parentContext ? parentContext : SDKContext.instance;

		this.generalObjectSchema = null;
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();
	}

	abstract resolve( relativeURI:string ):string;
}

export default AbstractContext;
