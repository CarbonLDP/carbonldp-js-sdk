export function spyOnDecorated<T extends object>( object:T, method:keyof T ):jasmine.Spy {
	Object.defineProperty( object, method, { writable: true, enumerable: false, configurable: true } );
	return spyOn( object, method );
}
