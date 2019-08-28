import { build } from "./tasks/build";

export default build;


export {
	buildCJS,
	buildESM2015,
	buildESM5,
	buildTypes,
} from "./tasks/compile";

export {
	bundleSFX,
} from "./tasks/bundle";

export {
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
	docsBuildDev,
	docsBuildProd,
	docsHTML,
	docsBundle,
	docsImages,
	docsCleanImages,
	docsAddImages,
} from "./tasks/documentation";

export {
	lint,
	lintTypescript,
} from "./tasks/lint";
