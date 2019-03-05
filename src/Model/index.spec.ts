import * as Module from "./index";
import { ModelDecorator } from "./ModelDecorator";
import { ModelSchema } from "./ModelSchema";

describe( "Model/index", () => {

	it( "should reexport ModelDecorator", () => {
		expect( Module.ModelDecorator ).toBeDefined();
		expect( Module.ModelDecorator ).toBe( ModelDecorator );
	} );

	it( "should reexport ModelSchema", () => {
		expect( Module.ModelSchema ).toBeDefined();
		expect( Module.ModelSchema ).toBe( ModelSchema );
	} );

} );
