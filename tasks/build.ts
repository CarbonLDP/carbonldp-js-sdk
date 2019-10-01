import del from "del";
import gulp from "gulp";

import { bundleSFX } from "./bundle";
import { generateCJS, generateESM2015, generateTypes } from "./compile";
import { DIST } from "./config";
import { preparePackage } from "./package";
import { docsBuildProd } from './documentation';


export const cleanDist:gulp.TaskFunction = () => del( DIST );
cleanDist.displayName = "clean:dist";

export const build:gulp.TaskFunction = gulp.series(
	cleanDist,
	gulp.parallel(
		gulp.series(
			gulp.parallel( generateCJS, generateESM2015, generateTypes ),
		),
		bundleSFX,
		docsBuildProd
	),
	preparePackage
);
build.displayName = "build";

