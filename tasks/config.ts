export const SRC:string = "src/";
export const DIST:string = "dist/";

export default {
	main: `${ SRC }CarbonLDP.ts`,
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
