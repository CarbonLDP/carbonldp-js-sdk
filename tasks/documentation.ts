import gulp from "gulp";
import DocsEngine from "carbonldp-ts-docs-engine";
import path from "path";
import del = require('del');

const projectRootDir:string = path.resolve( __dirname, "../" );
const sourceDir:string = path.resolve( projectRootDir, "src/" );
const outputDir:string = path.resolve( projectRootDir, "api-docs/" );

export const docsClean:gulp.TaskFunction = () =>
	del( [ outputDir ] );
docsClean.displayName = "docs:clean";

export const generateDocumentation:( env:"development" | "production" ) => gulp.TaskFunction = env => {
	const fn:gulp.TaskFunction = () => {
		const options:DocsEngine.Options = {
			src: sourceDir,
			out: outputDir,
			mode: env,
			logLevel: "info",
		};
		return DocsEngine.generate( options );
	};
	fn.displayName = "docs:generate";
	return fn;
};

export const docsBuildDev:gulp.TaskFunction = gulp.series(
	docsClean,
	generateDocumentation("development")
);
docsBuildDev.displayName = "docs:build|dev";

export const docsBuildProd:gulp.TaskFunction = gulp.series(
	docsClean,
	generateDocumentation("production")
);
docsBuildDev.displayName = "docs:build|prod";




