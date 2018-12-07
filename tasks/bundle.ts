import gulp from "gulp";
import path from "path";
import webpack from "webpack";


export const bundleSFX:gulp.TaskFunction = ( done ) => {
	const configPath:string = path.resolve( process.cwd(), "webpack.config.js" );
	const compiler:webpack.Compiler = webpack( require( configPath ) );

	compiler.run( ( error ) => {
		if( error ) done( error );
		else done();
	} );
};
bundleSFX.displayName = "bundle:sfx";
