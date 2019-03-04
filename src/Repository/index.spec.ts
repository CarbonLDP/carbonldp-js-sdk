import * as Module from "./index";
import { Repository } from "./Repository";
import { ResolvablePointer } from "./ResolvablePointer";

describe( "Repository/index", () => {

	it( "should reexport Repository", () => {
		expect( Module.Repository ).toBeDefined();
		expect( Module.Repository ).toBe( Repository );
	} );

	it( "should reexport ResolvablePointer", () => {
		expect( Module.ResolvablePointer ).toBeDefined();
		expect( Module.ResolvablePointer ).toBe( ResolvablePointer );
	} );

} );
