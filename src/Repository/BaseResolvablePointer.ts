import { BasePointer } from "../Pointer/BasePointer";

import { $Repository, Repository } from "./Repository";


export interface BaseResolvablePointer extends BasePointer {
	$repository:Repository | $Repository;
}
