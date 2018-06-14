export type AnyJasmineBase<T> =
	| T
	| jasmine.Any
	;

export type AnyJasmineValue<T> = T extends object ?
	T extends any[] ?
		| AnyJasmineBase<T>
		| jasmine.ArrayContaining<T[any]>
		| { [K in keyof T]:AnyJasmineBase<T[K]> | AnyJasmineValue<T[K]> }
		:
		| AnyJasmineBase<T>
		| jasmine.ObjectContaining<T>
		| { [K in keyof T]?:AnyJasmineBase<T[K]> | AnyJasmineValue<T[K]> }
	:
	| AnyJasmineBase<T>
	;

export type Diff<T extends string, U extends string> = ({ [P in T]:P } & { [P in U]:never } & { [ x:string ]:never })[T];

export type StrictMinus<T, U> = { [P in Diff<keyof T, keyof U>]:T[P] };
