// Load all specs into one bundle
let testsContext:any = (require as any).context( "./../src/", true, /\.spec\.ts/ ); console.log( testsContext );
testsContext.keys().forEach( testsContext );
