import { ClassLikeDoc } from "./ClassLikeDoc";
import { MethodDoc } from "./MethodDoc";
import { PropertyDoc } from "./PropertyDoc";

export interface InterfaceDoc extends ClassLikeDoc {
	properties:PropertyDoc[];
	methods:MethodDoc[];
}
