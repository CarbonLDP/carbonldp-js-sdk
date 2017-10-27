import * as NamedFragment from "./NamedFragment";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedFragment from "./PersistedFragment";

export interface Class extends PersistedFragment.Class, NamedFragment.Class {
	document:PersistedDocument.Class;
}

export class Factory {
	static decorate<T extends NamedFragment.Class>( fragment:T, snapshot:Object = {} ):T & Class {
		PersistedFragment.Factory.decorate( fragment, snapshot );

		return <any> fragment;
	}
}

export default Class;
