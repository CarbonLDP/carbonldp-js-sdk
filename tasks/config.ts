import fs from "fs";

const pkg:any = JSON.parse( fs.readFileSync( "./package.json", "utf8" ) );

export const SRC:string = "src/";
export const DIST:string = "dist/";

export default {
	version: pkg.version,
	mainName: `CarbonLDP`,
	src: [
		`${ SRC }**/*.ts`,
		`!${ SRC }**/*.spec.ts`,
	],
	dist: {
		esm2015: `${ DIST }.esm2015/`,
		esm5: `${ DIST }.esm5/`,
		cjs: `${ DIST }`,
		bundle: `${ DIST }bundles/`,
		types: `${ DIST }`,
	},
};
