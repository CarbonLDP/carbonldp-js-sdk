import * as Module from "./index";
import { ExecutableQueryDocument, TransientExecutableQueryDocument } from "./index";


describe( "ExecutableQueryDocument/index", () => {

	it( "should reexport ExecutableQueryDocument", () => {
		expect( Module.ExecutableQueryDocument ).toBeDefined();
		expect( Module.ExecutableQueryDocument ).toBe( ExecutableQueryDocument );
	} );

	it( "should reexport TransientExecutableQueryDocument", () => {
		expect( Module.TransientExecutableQueryDocument ).toBeDefined();
		expect( Module.TransientExecutableQueryDocument ).toBe( TransientExecutableQueryDocument );
	} );

} );
