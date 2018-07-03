import { ModelDecorator } from "../core";

export interface TypedModelDecorator extends ModelDecorator<any, any> {
	TYPE:string;
}
