import { BaseDocument } from "../Document/BaseDocument";

export interface BaseExecutableQueryDocument extends BaseDocument {
	storedQuery: string;
}
