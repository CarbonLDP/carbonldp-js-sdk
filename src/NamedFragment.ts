import * as Document from './Document';
import * as Fragment from './Fragment';
import * as RDF from './RDF';
import * as Utils from './Utils';

export interface Class extends Fragment.Class {
	slug:string
}

export class Factory extends Fragment.Factory {
	from( object:Array<Object & { document:Document.Class }> ):Class[];
	from( object:Object & { document:Document.Class } ):Class;
	from( objects ):any {
		if( ! Utils.isArray( objects ) ) return this.singleFrom( <Object & { document:Document.Class }>objects );

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let object:(Object & { document:Document.Class }) = <(Object & { document:Document.Class })> objects[ i ];

			this.singleFrom( object );
		}

		return <Class[]> objects;
	}

	protected singleFrom( object:Object & { document:Document.Class } ):Class {
		return this.injectBehavior( object );
	}

	protected injectBehavior( node:(Object & { document:Document.Class }) ):Class {
		let fragment = <Class> super.injectBehavior( node );
		if( this.hasClassProperties( fragment ) ) return fragment;

		Object.defineProperties( fragment, {
			'slug': {
				get: function () {
					return RDF.URI.Util.getFragment( fragment.uri )
				},
				set: function ( slug ) {
					this.uri = this.document.uri + '#' + slug;
				},
				enumerable: false
			}
		} );

		return fragment;
	}

	protected hasClassProperties( resource:Fragment.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, 'slug' )
		);
	}
}

export var factory:Factory = new Factory();

export default Class;