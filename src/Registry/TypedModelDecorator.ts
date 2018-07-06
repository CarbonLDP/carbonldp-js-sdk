import { ModelDecorator } from "../Model";

export interface TypedModelDecorator extends ModelDecorator<any, any> {
	TYPE:string;
}
