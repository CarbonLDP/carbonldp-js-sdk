import { QueryablePropertyData } from "./QueryablePropertyData";
import { QueryBuilderProperty } from "./QueryBuilderProperty";


export interface QueryBuilderPropertyData extends QueryablePropertyData {
	parent?:QueryBuilderProperty;
}
