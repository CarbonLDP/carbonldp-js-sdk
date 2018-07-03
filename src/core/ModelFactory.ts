export interface ModelFactory<M extends object, B extends object = object> {
	create<W extends object>( data:W & B ):W & M;

	createFrom<W extends object>( object:W & B ):W & M;
}
