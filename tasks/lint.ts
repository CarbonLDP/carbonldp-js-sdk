import gulp from "gulp";
import tslint from "gulp-tslint";
import { Linter } from "tslint";
import ts from "typescript";

import CONFIG from "./config";


export const lintTypescript:gulp.TaskFunction = () => {
	const program:ts.Program = Linter.createProgram( "./tsconfig.json" );

	return gulp.src( CONFIG.src )
		.pipe( tslint( {
			formatter: "prose",
			program,
		} ) )
		.pipe( tslint.report() )
		;
};
lintTypescript.displayName = "lint:typescript";


export const lint:gulp.TaskFunction = gulp.series( lintTypescript );
lint.displayName = "lint";
