import del from "del";
import gulp from "gulp";

import { bundleSFX } from "./bundle";
import { generateCJS, generateESM2015, generateTypes } from "./compile";
import config, { DIST } from "./config";
// import { compileDocumentation } from "./documentation";
import { preparePackage } from "./package";


export const cleanDist:gulp.TaskFunction = () => del( DIST );
cleanDist.displayName = "clean:dist";

export const build:gulp.TaskFunction = gulp.series(
	cleanDist,
	gulp.parallel(
		gulp.series(
			gulp.parallel( generateCJS, generateESM2015, generateTypes ),
		),
		bundleSFX,
		// compileDocumentation
	),
	preparePackage
);
build.displayName = "build";

