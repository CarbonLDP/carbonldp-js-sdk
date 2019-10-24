import gulp from "gulp";
import DocsEngine from "carbonldp-ts-docs-engine";
import path from "path";
import del = require("del");
import fs from "fs";

const projectRootDir:string = path.resolve( __dirname, "../" );
const sourceDir:string = path.resolve( projectRootDir, "src/" );
const outputDir:string = path.resolve( projectRootDir, "api-docs/" );
const descriptionTemplateRoute:string = path.join(outputDir, "/templates/documentation-description.njk");

function getDescriptionTemplate():Promise<string> {

	return new Promise((resolve, reject) => {
		fs.readFile(descriptionTemplateRoute, "utf8",  async (err:Error, data:string) => {
			if (err) {
				console.log("Couldn't find file at", descriptionTemplateRoute );
				return reject(err);
			}
			return resolve(data);
		});
	});
}

export const docsClean:gulp.TaskFunction = () =>
	del( [
		`${outputDir}/**`, `!${outputDir}`,
		`!${outputDir}/templates`, `!${outputDir}/templates/**`,
	] );
docsClean.displayName = "docs:clean";

export const generateDocumentation:( env:"development" | "production", descriptionTemplateRoute:string ) => gulp.TaskFunction = env => {
	const fn:gulp.TaskFunction = async () => {

		let descriptionTemplate:string = await getDescriptionTemplate();

		const options:DocsEngine.Options = {
			src: sourceDir,
			out: outputDir,
			mode: env,
			logLevel: "info",
			descriptionTemplate: descriptionTemplate,
			npmName: "carbonldp",
			name: "CarbonLDP",
			mainClass: "CarbonLDP",
		};
		return DocsEngine.generate( options );
	};
	fn.displayName = "docs:generate";
	return fn;
};

export const docsBuildDev:gulp.TaskFunction = gulp.series(
	docsClean,
	generateDocumentation("development", descriptionTemplateRoute)
);
docsBuildDev.displayName = "docs:build|dev";

export const docsBuildProd:gulp.TaskFunction = gulp.series(
	docsClean,
	generateDocumentation("production", descriptionTemplateRoute)
);
docsBuildProd.displayName = "docs:build|prod";




