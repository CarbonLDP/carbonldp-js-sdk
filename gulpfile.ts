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
