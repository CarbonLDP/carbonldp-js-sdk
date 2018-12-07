import { build } from "./tasks/build";

export default build;


export {
	buildESM5,
	buildESM2015,
	buildCJS5,
	buildTypes,
} from "./tasks/compile";

export {
	bundleSFX,
} from "./tasks/bundle";

export {
	version,
	cleanDist,
	build,
} from "./tasks/build";

export {
	copyPackage,
	copyMarkdowns,
	makeDirPackages,
	preparePackage,
} from "./tasks/package";

export {
	cleanSRC,
} from "./tasks/src";

export {
	test,
	testNode,
	testBrowser,
	testBrowserWatch,
} from "./tasks/test";

export {
	compileDocumentation,
	compileDgeni,
	documentationMinify,
} from "./tasks/documentation";

export {
	lint,
	lintTypescript,
} from "./tasks/lint";
