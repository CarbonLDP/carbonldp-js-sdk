export interface ModelFactory<MODEL extends object, BASE extends object = object> {
	create<W extends object>( data:W & BASE ):W & MODEL;

	createFrom<W extends object>( object:W & BASE ):W & MODEL;
}
