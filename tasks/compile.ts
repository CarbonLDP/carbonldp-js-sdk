import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import ts from "gulp-typescript";

import { cleaner, CONFIG, tasker } from "./common";

const compiler = ( dist:string, options:ts.Settings ) => tasker( () => {
	const tsProject = ts.createProject( "tsconfig.json", options );

	const files = [
		...CONFIG.src.files,
		...dist !== CONFIG.dist.esm5 ? [ `!${ CONFIG.src.bundle }` ] : []
	];

	const tsResults = gulp.src( files )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
	;

	return tsResults.js
		.pipe( sourcemaps.write( ".", { sourceRoot: "../src" } ) )
		.pipe( gulp.dest( dist ) )
		;
} );

const baseSettings:ts.Settings = {
	module: "es2015",
	target: "es5",
	importHelpers: true,
	removeComments: true,
};

export const cleanESM5 = cleaner( CONFIG.dist.esm5 )( "cleanESM5" );
export const generateESM5 = compiler( CONFIG.dist.esm5, { ...baseSettings } )( "generateESM5" );
export const cleanESM5UMD = cleaner( [ `${ CONFIG.dist.esm5 }umd.js`, `${ CONFIG.dist.esm5 }umd.js.map` ] )( "clean:esm5-umd" );
export const buildESM5 = gulp.series( cleanESM5, generateESM5, cleanESM5UMD );

export const cleanESM2015 = cleaner( CONFIG.dist.esm2015 )( "cleanESM2015" );
export const generateESM2015 = compiler( CONFIG.dist.esm2015, { ...baseSettings, target: "es2015" } )( "generateESM2015" );
export const buildESM2015 = gulp.series( cleanESM2015, generateESM2015, );

export const cleanCJS = cleaner( CONFIG.dist.cjs )( "cleanCJS" );
export const generateCJS = compiler( CONFIG.dist.cjs, { ...baseSettings, module: "commonjs" } )( "generateCJS" );
export const buildCJS = gulp.series( cleanESM5, generateCJS, );


export function generateTypes() {
	const tsProject = ts.createProject( "tsconfig.json", {
		target: "es2015",
		module: "es2015",
		declaration: true,
	} );

	const files = [
		...CONFIG.src.files,
		`!${ CONFIG.src.bundle }`,
	];

	const tsResults = gulp.src( files )
		.pipe( tsProject() )
	;

	return tsResults.dts
		.pipe( gulp.dest( CONFIG.dist.types ) )
		;
}

export const cleanTypes = cleaner( CONFIG.dist.types )( "cleanTypes" );
export const buildTypes = gulp.series( cleanTypes, generateTypes );
