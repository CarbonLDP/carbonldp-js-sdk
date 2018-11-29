export interface TemplateEngine {
	config?:{};

	getRenderer():( template:string, data:any ) => string;
}
