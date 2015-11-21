import * as Fragment from "./Fragment";
import * as Errors from "./Errors";
import * as PersistedResource from "./PersistedResource";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends PersistedResource.Class, Fragment.Class {

}

export class Factory {
	static hasClassProperties( fragment:Fragment.Class ):boolean {
		return (
			true
		);
	}

	static from( fragments:Fragment.Class[] ):Class[];
	static from( fragment:Fragment.Class ):Class;
	static from( fragments:any ):any {
		if( ! Utils.isArray( fragments ) ) return Factory.singleFrom( <Fragment.Class> fragments );

		let persistedFragments:Class[] = [];
		for ( let i:number = 0, length:number = fragments.length; i < length; i ++ ) {
			let fragment:Fragment.Class = fragments[ i ];

			persistedFragments.push( Factory.singleFrom( fragment ) );
		}

		return persistedFragments;
	}

	protected static singleFrom( fragment:Fragment.Class ):Class {
		let persisted:( Fragment.Class & PersistedResource.Class ) = PersistedResource.Factory.from<Fragment.Class>( fragment );

		return Factory.hasClassProperties( fragment ) ? <any> persisted : Factory.injectBehavior( persisted );
	}

	protected static injectBehavior( persisted:( Fragment.Class & PersistedResource.Class ) ):Class {
		if( Factory.hasClassProperties( persisted ) ) return <any> persisted;

		return <any> persisted;
	}
}

export default Class;
