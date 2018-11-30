/**
 * Base settings of every {@link AbstractContext}.
 */
export interface ContextSettings {
	/**
	 * Optional default vocabulary that will be used in the general schema
	 * of the associated context.
	 */
	vocabulary?:string;
}
