import gulp from "gulp";
import DocsEngine from "carbonldp-ts-docs-engine";
import path from "path";
import del = require('del');

const projectRootDir:string = path.resolve( __dirname, "../" );
const sourceDir:string = path.resolve( projectRootDir, "src/" );
const outputDir:string = path.resolve( projectRootDir, "api-docs/" );

let environment: "development" | "production";

export const docsClean:gulp.TaskFunction = () =>
	del( [ outputDir ] );
docsClean.displayName = "docs:clean";

const setENV:( env:"development" | "production" ) => gulp.TaskFunction = env => {
	const fn:gulp.TaskFunction = () => {
		environment = env;
		return Promise.resolve();
	};

	fn.displayName = "docs:set-env";

	return fn;
};

export const generateDocumentation:gulp.TaskFunction = () => {

	let options:DocsEngine.Options = {
		src: sourceDir,
		out: outputDir,
		mode: environment,
		logLevel: "info",
	};

	return DocsEngine.generate(options);
};
generateDocumentation.displayName = "docs:build|prod";

export const docsBuildDev:gulp.TaskFunction = gulp.series(
	setENV("development"),
	docsClean,
	generateDocumentation
);
docsBuildDev.displayName = "docs:build|dev";

export const docsBuildProd:gulp.TaskFunction = gulp.series(
	setENV("production"),
	docsClean,
	generateDocumentation
);
docsBuildDev.displayName = "docs:build|prod";




