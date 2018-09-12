import { QueryBuilderProperty } from "./QueryBuilderProperty";
import { QueryPropertyData } from "./QueryPropertyData";


export interface QueryBuilderPropertyData extends QueryPropertyData {
	parent?:QueryBuilderProperty;
}
