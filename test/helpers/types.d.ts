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
