import * as App from "./App";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";
import Pointer from "./Pointer";
import * as Utils from "./Utils";

// TODO Mark an error if it extends from App.Class
export interface Class extends PersistedProtectedDocument.Class {
	name:string;
	description?:string;
	rootContainer:Pointer;
	allowsOrigins?:(Pointer | string)[];
}

export class Factory {

	static hasClassProperties( resource:Object ):boolean {
		return Utils.hasPropertyDefined( resource, "rootContainer" );
	}

	static is( object:Object ):boolean {
		return App.Factory.is( object )
			&& PersistedProtectedDocument.Factory.is( object )
			&& Factory.hasClassProperties( object );
	}

}

export default Class;
