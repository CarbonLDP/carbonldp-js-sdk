import * as Resource from "./Resource";
import * as Utils from "./../Utils";

export abstract class AbstractInjector<I> {
	protected _RDF_CLASS:string;
	protected parentInjectors:AbstractInjector<any>[];

	constructor( RDF_CLASS:string, parentInjectors:AbstractInjector<any>[] = [] ) {
		this._RDF_CLASS = RDF_CLASS;
		this.parentInjectors = parentInjectors;
	}

	get RDF_CLASS():string {
		return this._RDF_CLASS;
	}

	abstract hasClassProperties( resource:Object ):boolean;

	hasRDFClass( resource:Resource.Class ):boolean {
		if( this.RDF_CLASS === null ) return true;
		return resource.types.indexOf( this.RDF_CLASS ) !== - 1;
	}

	is( object:Object ):boolean {
		for( let parentInjector of this.parentInjectors ) {
			if( ! parentInjector.is( object ) ) return false;
		}
	}


	from<T extends Object>( nodes:T[] ):( T & I )[];
	from<T extends Object>( node:T ):( T & I );
	from( nodeOrNodes:any ):any {
		if( ! Utils.isArray( nodeOrNodes ) ) return this.singleFrom( nodeOrNodes );

		for( let node of nodeOrNodes ) {
			this.singleFrom( node );
		}

		return <any> nodeOrNodes;
	}

	protected singleFrom<T extends Object>( node:T ):( T & I ) {
		for( let parentInjector of this.parentInjectors ) {
			parentInjector.from( node );
		}

		if ( ! this.hasClassProperties( node ) ) this.injectBehavior( node );

		return <any> node;
	}

	protected injectBehavior<T extends Object>( node:T ):( T & I ) {
		return <any> node;
	}
}

export default AbstractInjector;
