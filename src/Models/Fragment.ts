import * as Document from './Document';
import * as RDF from './../RDF';
import * as Utils from './../Utils';

interface Fragment extends RDF.Resource.Class{
	document:Document.Class
}

interface DocumentHolder extends Object {
	document:Document.Class;
}

class Factory extends RDF.Resource.Factory {
	from( object:Array<Object & DocumentHolder> ):Fragment[];
	from( object:Object & DocumentHolder ):Fragment;
	from( objects ):any {
		if( ! Utils.isArray( objects ) ) return this.singleFrom( <Object & DocumentHolder>objects );

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let object:(Object & DocumentHolder) = <(Object & DocumentHolder)> objects[ i ];

			this.singleFrom( object );
		}

		return <Fragment[]> objects;
	}

	protected singleFrom( object:Object & DocumentHolder ):Fragment {
		return this.injectBehavior( object );
	}

	protected injectBehavior( object:(Object & DocumentHolder) ):Fragment {
		let fragment = <Fragment> super.injectBehavior( object );
		if( this.hasClassProperties( fragment ) ) return fragment;

		let document:Document.Class = fragment.document;
		delete fragment.document;

		Object.defineProperties( fragment, {
			'document': {
				writable: false,
				enumerable: false,
				value: document
			}
		} );

		return fragment;
	}

	protected hasClassProperties( resource:RDF.Resource.Class ):boolean {
		return false;
	}
}

let factory:Factory = new Factory();

class Util {
	static generateID():string {
		return '_:' + Utils.UUID.generate();
	}
}

export default Fragment;

export {
	Fragment as Class,
	factory,
	Factory,
	Util
};