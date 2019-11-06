import del from "del";
import gulp from "gulp";
import replace from "gulp-token-replace";

import { bundleSFX } from "./bundle";
import { compileCJS5, compileESM2015, compileESM5, compileTypes } from "./compile";
import config, { DIST } from "./config";
import { docsBuildProd } from "./documentation";
import { preparePackage } from "./package";

export const version:gulp.TaskFunction = () => {
	return gulp.src( [
		`${ DIST }**/${ config.mainName }.js`,
		`${ DIST }.**/${ config.mainName }.js`,
	] )
		.pipe( replace( {
			prefix: "{{",
			suffix: "}}",
			global: {
				VERSION: config.version,
			},
		} ) )
		.pipe( gulp.dest( DIST ) )
		;
};
version.displayName = "version";


export const cleanDist:gulp.TaskFunction = () => del( DIST );
cleanDist.displayName = "clean:dist";

export const build:gulp.TaskFunction = gulp.series(
	cleanDist,
	gulp.parallel(
		gulp.series(
			gulp.parallel( compileESM5, compileESM2015, compileCJS5, compileTypes ),
			version
		),
		bundleSFX,
		docsBuildProd
	),
	preparePackage
);
build.displayName = "build";

