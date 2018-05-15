export type AnyJasmineValue<T extends object> = { [P in keyof T]?: T[P] | jasmine.Any };

export type Diff<T extends string, U extends string> = ( { [P in T]: P } & { [P in U]: never } & { [x:string]:never } )[T];

export type StrictMinus<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] };
