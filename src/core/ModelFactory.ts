export interface ModelFactory<M extends object, B extends object = object> {
	is( value:any ):value is M;

	create<W extends B>( data:W ):W & M;

	createFrom<W extends B>( object:W ):W & M;
}
