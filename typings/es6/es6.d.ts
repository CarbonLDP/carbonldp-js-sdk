declare
class Map<K, V> {
	constructor();

	size():number;

	clear():void;

	delete( key:K ):boolean;

	entries():Iterator<Array<(K|V)>>;

	forEach( callback:( key:K, value:V ) => void, thisArg?:any ):void;

	get( key:K ):V;

	has( key:K ):boolean;

	keys():Iterator<K>;

	set( key:K, value:V ):Map<K, V>;

	values():Iterator<V>;
}

interface Iterator<T> {
	next():IteratorValue<T>;
}

interface IteratorValue<T> {
	value:T;
	done:boolean;
}