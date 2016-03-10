export interface BindingObject {
	// TODO: Remove any
	[ binding:string ]:any;
}

export interface Class {
	vars:string[];

	bindings:BindingObject[];
}

export default Class;
