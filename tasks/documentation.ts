import gulp from "gulp";
import DocsEngine from "carbonldp-ts-docs-engine";
import path from "path";

const projectRootDir:string = path.resolve( __dirname, "../" );
const sourceDir:string = path.resolve( projectRootDir, "src/" );
const outputDir:string = path.resolve( projectRootDir, "api-docs/" );

export const docsBuildProd:gulp.TaskFunction = () => {

	let options:DocsEngine.Options = {
		src: sourceDir,
		out: outputDir,
		mode: "production" as "production",
		logLevel: "info" as "info",
	};

	return DocsEngine.generate(options);
};
docsBuildProd.displayName = "docs:build|prod";

export const docsBuildDev:gulp.TaskFunction = () => {

	let options:DocsEngine.Options = {
		src: sourceDir,
		out: outputDir,
		mode: "development" as "development",
		logLevel: "info" as "info",
	};

	return DocsEngine.generate(options);
};
docsBuildDev.displayName = "docs:build|dev";




