import { Filter } from "./Filter";

export function nullifyEmptyFilter():Filter {
	return {
		name: "nullifyEmpty",
		process( array:any[] ):any[] {
			if( ! array ) return null;

			array = array.filter( x => x );
			if( array.length === 0 ) return null;

			return array;
		},
	};
}
