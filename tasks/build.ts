import del from "del";
import fs from "fs";
import gulp from "gulp";
import replace from "gulp-replace";

import { bundleSFX } from "./bundle";
import { compileCJS5, compileESM2015, compileESM5, compileTypes } from "./compile";
import CONFIG, { DIST } from "./config";
import { compileDocumentation } from "./documentation";
import { preparePackage } from "./package";


export const version:gulp.TaskFunction = () => {
	const pk:any = JSON.parse( fs.readFileSync( "./package.json", "utf8" ) );

	return gulp.src( CONFIG.main )
		.pipe( replace( /(static get version\(\):string \{ return ")(.*)("; })/g, `$1${ pk.version }$3` ) )
		.pipe( gulp.dest( "src/" ) )
		;
};
version.displayName = "version";


export const cleanDist:gulp.TaskFunction = () => del( DIST );
cleanDist.displayName = "clean:dist";

export const build:gulp.TaskFunction = gulp.series(
	version,
	cleanDist,
	gulp.parallel(
		gulp.parallel( compileESM5, compileESM2015, compileCJS5, compileTypes ),
		bundleSFX,
		compileDocumentation
	),
	preparePackage
);
build.displayName = "build";

