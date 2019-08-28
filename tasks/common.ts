import path from "path";

import del from "del";
import gulp from "gulp";


export const tasker = <T extends gulp.TaskFunction & Function>( fn:T ) => ( name?:string ) => {
	if( typeof name !== "string" ) return fn.call( null, name );

	fn.displayName = name;
	return fn;
};


const SRC:string = "src/";
const DIST:string = "dist/";

const PATHS = {
	test: {
		files: [
			`{src,test}/**/*.ts`,
		],
	},
	src: {
		dir: path.resolve( SRC ),
		files: [
			`${ SRC }**/*.ts`,
			`!${ SRC }**/*.spec.ts`,
		],
		bundle: `${ SRC }umd.ts`,
	},
	dist: {
		dir: path.resolve( DIST ),
		esm2015: `${ DIST }.esm2015/`,
		esm5: `${ DIST }.esm5/`,
		cjs: `${ DIST }`,
		bundle: `${ DIST }bundles/`,
		types: `${ DIST }`,
	},
};


export const CONFIG = {
	...PATHS,
};


export const cleaner = ( path:string | string[] ) => tasker( () => del( path ) );
