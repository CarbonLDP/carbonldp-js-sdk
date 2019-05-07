import del from "del";
import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import ts from "gulp-typescript";

import CONFIG from "./config";


/**
 * Removes all the files from a dist folder with the specified extension.
 * @param folder The dist folder to removes the files.
 * @param extension The extension of the files to remove.
 */
const cleaner:( folder:keyof typeof CONFIG["dist"], extension:string ) => Promise<string[]> = ( folder, extension ) => {
	const ignoreFolders:string[] = Object
		.keys( CONFIG.dist )
		.filter( _ => ! (_ !== folder) )
		.map( _ => `!${ CONFIG.dist[ _ ] } ` )
	;

	const folders:string[] = [ folder, ...ignoreFolders ]
		.map( _ => `${ _ }/**/*.${ extension }` );

	return del( folders );
};

export const cleanESM5:gulp.TaskFunction = () => cleaner( "esm5", "{js,map}" );
cleanESM5.displayName = "clean:esm5";

export const cleanESM2015:gulp.TaskFunction = () => cleaner( "esm2015", "{js,map}" );
cleanESM2015.displayName = "clean:esm2015";

export const cleanCJS:gulp.TaskFunction = () => cleaner( "cjs", "{js,map}" );
cleanCJS.displayName = "clean:cjs";

export const cleanTypes:gulp.TaskFunction = () => cleaner( "types", "d.ts" );
cleanTypes.displayName = "clean:types";


/**
 * Compile the TS project into the dist folder.
 * @param folder Folder to put the compiled files
 * @param options TS options and the type of files to create specified by the property `stream`.
 * - `js`: Will create JavaScript and its respective maps
 * - `dts`: Will create TS Types
 */
const compiler:( folder:string, options:ts.Settings & { stream:"js" | "dts" } ) => gulp.TaskFunction = ( folder, options ) => () => {
	const stream:string = options.stream;
	delete options.stream;

	const tsProject:ts.Project = ts
		.createProject( "tsconfig.json", options );

	const tsResults:ts.CompileStream = gulp.src( CONFIG.src )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );


	switch( stream ) {
		case "js":
			return tsResults
				.js
				.pipe( sourcemaps.write( ".", { sourceRoot: "../src" } ) )
				.pipe( gulp.dest( folder ) );

		case "dts":
			return tsResults
				.dts
				.pipe( gulp.dest( folder ) );

		default:
			throw new Error( `Invalid stream "${ stream }"` );
	}
};

export const compileESM5:gulp.TaskFunction = compiler( CONFIG.dist.esm5, {
	module: "es2015",
	target: "es5",
	allowSyntheticDefaultImports: true,
	stream: "js",
} );
compileESM5.displayName = "compile:esm5";

export const compileESM2015:gulp.TaskFunction = compiler( CONFIG.dist.esm2015, {
	module: "es2015",
	target: "es2015",
	allowSyntheticDefaultImports: true,
	stream: "js",
} );
compileESM2015.displayName = "compile:esm2015";

export const compileCJS5:gulp.TaskFunction = compiler( CONFIG.dist.cjs, {
	module: "commonjs",
	target: "es5",
	stream: "js",
} );
compileCJS5.displayName = "compile:cjs5";

export const compileTypes:gulp.TaskFunction = compiler( CONFIG.dist.types, {
	target: "es2015",
	declaration: true,
	removeComments: false,
	stream: "dts",
} );
compileTypes.displayName = "compile:types";


// Builders that merge the cleaning and compilation

export const buildESM2015:gulp.TaskFunction = gulp.series( cleanESM2015, compileESM2015 );
buildESM2015.displayName = "build:esm2015";

export const buildESM5:gulp.TaskFunction = gulp.series( cleanESM5, compileESM5 );
buildESM5.displayName = "build:esm5";

export const buildCJS5:gulp.TaskFunction = gulp.series( cleanESM5, compileCJS5 );
buildCJS5.displayName = "build:cjs5";

export const buildTypes:gulp.TaskFunction = gulp.series( cleanESM5, compileTypes );
buildTypes.displayName = "build:types";
