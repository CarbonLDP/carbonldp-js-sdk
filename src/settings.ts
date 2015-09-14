import * as Auth from './Auth';

var settings = {};
settings[ "domain" ] = "carbonldp.com";
settings[ "http.ssl" ] = true;
settings[ "auth.method" ] = Auth.Method.Basic;
settings[ "platform.container" ] = "platform/";
settings[ "platform.apps.container" ] = settings[ "platform.container" ] + "apps/";

export default settings;