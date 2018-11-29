import { ClassLikeDoc } from "./ClassLikeDoc";
import { MethodDoc } from "./MethodDoc";
import { PropertyDoc } from "./PropertyDoc";

export interface ClassDoc extends ClassLikeDoc {
	constructors?:MethodDoc;

	properties:{
		static:PropertyDoc[];
		instance:PropertyDoc[];
	};
	methods:{
		static:MethodDoc[];
		instance:MethodDoc[];
	};
}
