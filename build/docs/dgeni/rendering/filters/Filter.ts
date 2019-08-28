export interface Filter {
	name:string;
	process( ...params:any[] ):any;
}
