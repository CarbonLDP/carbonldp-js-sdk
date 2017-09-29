// Load all specs into one bundle
let testsContext = require.context( "./../src/", true, /\.spec\.ts/ );
testsContext.keys().forEach( testsContext );
