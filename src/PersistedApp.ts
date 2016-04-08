import * as LDP from "./LDP";
import * as App from "./App";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";

// TODO Mark as error if it extends from App.Class
export interface Class extends PersistedDocument.Class {
	name:string;
	description?:string;
	rootContainer:LDP.PersistedContainer.Class;
}

export class Factory {

	static hasClassProperties( resource:Object ):boolean {
		return Utils.hasPropertyDefined( resource, "rootContainer" );
	}

	static is( object:Object ):boolean {
		return App.Factory.is( object )
			&& PersistedDocument.Factory.hasClassProperties( <App.Class> object )
			&& Factory.hasClassProperties( object );
	}

}

export default Class;
