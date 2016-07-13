import * as Agent from "./Agent";
import * as Utils from "./../Utils";
import * as PersistedDocument from "./../PersistedDocument";

export interface Class extends PersistedDocument.Class {
	name:string;
	email:string;
	enabled:boolean;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return Utils.hasPropertyDefined( object, "name" )
			&& Utils.hasPropertyDefined( object, "email" )
			&& Utils.hasPropertyDefined( object, "enabled" )
			;
	}

	static is( object:Object ):boolean {
		return Factory.hasClassProperties( object )
			&& PersistedDocument.Factory.is( object )
			// TODO Use (<Document.Class> object).hasType( Agent.RDF_CLASS ), when available
			&& ( <Class> object ).types.indexOf( Agent.RDF_CLASS ) !== - 1
			;
	}
}

export default Class;
