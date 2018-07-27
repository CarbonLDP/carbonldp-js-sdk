// Workaround for TS2.8 Exclude
export type DiffKeys<T, U> = ({ [P in keyof T]:P } & { [P in keyof U]:never } & { [ x:string ]:never })[keyof T];

export interface ModelPrototype<MODEL extends object, EXTENDED extends object = {}, OVERRIDDEN extends keyof MODEL = never> {
	PROTOTYPE:Pick<MODEL, DiffKeys<MODEL, EXTENDED> | OVERRIDDEN>;
}
