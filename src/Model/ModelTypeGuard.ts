/**
 * Interface to define the type-guard of a model factory.
 */
export interface ModelTypeGuard<MODEL extends object> {
	/**
	 * Returns true when the value provided is considered to be a `MODEL`.
	 * @param value The value to check.
	 */
	is( value:any ):value is MODEL;
}
