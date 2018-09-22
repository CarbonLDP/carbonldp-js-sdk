export interface ModelTypeGuard<MODEL extends object> {
	is( value:any ):value is MODEL;
}
