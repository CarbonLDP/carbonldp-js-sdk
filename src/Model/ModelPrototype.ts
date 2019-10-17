// Workaround for TS2.8 Exclude
export type DiffKeys<T, U> = ({ [P in keyof T]:P } & { [P in keyof U]:never } & { [ x:string ]:never })[keyof T];

/**
 * Interface with the property for describing a model prototype.
 * - The `MODEL` generic specifies the interface of the model.
 * - The `EXTENDED` has all the interfaces that the model is extending so the prototype has not to re-implements that methods.
 * - And the `OVERRIDDEN` one are the names of the methods the prototype must override/re-implement.
 */
export interface ModelPrototype<MODEL extends object, EXTENDED extends object = {}, OVERRIDDEN extends keyof MODEL = never> {
	/**
	 * The object with the properties/methods to use in the decoration of a model.
	 */
	PROTOTYPE:Pick<MODEL, DiffKeys<MODEL, EXTENDED> | OVERRIDDEN>;
}
