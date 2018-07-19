export function createNonEnumerable<T extends object>( object:T ):T {
	Object
		.keys( object )
		.forEach( key => {
			const descriptor:PropertyDescriptor | undefined = Object
				.getOwnPropertyDescriptor( object, key );

			if( ! descriptor ) return;

			descriptor.enumerable = false;
			Object.defineProperty( object, key, descriptor );
		} );

	return object;
}
