export interface ModelTypeGuard<T extends object> {
	is( value:any ):value is T;
}
