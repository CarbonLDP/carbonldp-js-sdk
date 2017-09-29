import * as SDKContext from "./SDKContext";
import Context from "./Context";
import * as ObjectSchema from "./ObjectSchema";
import * as RDF from "./RDF";

export abstract class Class extends SDKContext.Class {
	protected abstract _baseURI:string;
	get baseURI():string { return this._baseURI; }

	protected _parentContext:Context;
	get parentContext():Context { return this._parentContext; }

	constructor( parentContext:Context = null ) {
		super();

		this._parentContext = ! ! parentContext ? parentContext : SDKContext.instance;

		this.generalObjectSchema = null;
		this.typeObjectSchemaMap = new Map<string, ObjectSchema.DigestedObjectSchema>();
	}

	resolve( relativeURI:string ):string {
		return RDF.URI.Util.resolve( this.baseURI, relativeURI );
	}
}

export default Class;
