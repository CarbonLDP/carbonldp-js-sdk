import * as Fragment from "./Fragment";
import * as Errors from "./Errors";
import * as PersistedResource from "./PersistedResource";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends PersistedResource.Class, Fragment.Class {

}

export class Factory {
	static decorate<T extends Fragment.Class>( fragment:T, snapshot:Object = {} ):T & Class {
		PersistedResource.Factory.decorate( fragment, snapshot );

		return <any> fragment;
	}
}

export default Class;
