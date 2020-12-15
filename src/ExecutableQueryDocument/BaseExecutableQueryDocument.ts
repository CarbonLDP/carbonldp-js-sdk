import { BaseDocument } from "../Document/BaseDocument";

export interface BaseExecutableQueryDocument extends BaseDocument {
	readonly storedQuery: string;
}
