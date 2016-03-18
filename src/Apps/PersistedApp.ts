import * as LDP from "./../LDP";
import * as App from "./App";
import * as Utils from "./../Utils";

export interface Class extends App.Class {
	rootContainer:LDP.PersistedContainer.Class;
}

export class Factory {

	static hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "rootContainer" )
		);
	}

	static is( object:Object ):boolean {
		return App.Factory.is( object )
			&& Factory.hasClassProperties( object );
	}

}

export default Class;
