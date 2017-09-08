const webpackConfig = require( "./config/webpack.prod.js" );

module.exports = webpackConfig( { env: "prod" } );
