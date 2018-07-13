import { ModelDecorator } from "../Model/ModelDecorator";


export interface TypedModelDecorator extends ModelDecorator<any, any> {
	TYPE:string;
}
