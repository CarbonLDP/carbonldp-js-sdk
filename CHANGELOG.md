#0.11.0 (November 12, 2015)
* Changed RequireJS for JSPM in karma runner

#0.10.0 (October 31, 2015)
* Changed building process to use gulp instead of grunt
* Added new build form to use Carbon with JSPM and TypeScript
* Added new bundle to import Carbon as a SFX package

#0.9.0 (October 31, 2015)
* Add initial support for BNods
* Changed interface to revolve around the Document concept
* Added APIDescription functionality to retrieve CarbonLDP's API description

#0.8.2 (October 23, 2015)
* Created system to compile distribution files when committing code
* Applied convention of mimicking folder structure with aggregator files

#0.8.1 (September 14, 2015)
* Added LICENSE files

#0.8.0 (September 14, 2015)
* Changed source code to Typescript
* Carbon can now be imported as an AMD module

#0.7.1 (October 16, 2014)
* ETags are now being stored as Date objects.
# 0.7.0 (October 16, 2014)
* SourceLibrary now offers ETag resource verification (resourceHasChanged())
* Retrieving a resource using the cache now validates that it hasn't changed in the server side
# 0.6.0 (October 15, 2014)
* All Applications available can be pulled one or all at the same time.
# 0.5.0 (October 13, 2014)
* Multiple RDF Sources can be pulled at the same time.
* The Literal module supports objects.
* Created the App module for the Auth module.
# 0.4.0 (October 2, 2014)
* RDF Sources can now be created
* Started the support for BasicContainer
* Literals can now be properly casted
* SPARQL SELECT and ASK queries can now be executed
* Started the modularization of the SDK
* More stuff...

# 0.3.0 (September 19, 2014)
* RDF Sources can be retrieved
* RDF Sources keep track on their changes
* RDF Sources can be committed (and use PATCH to do it)
# 0.2.0 (September 18, 2014)
* Carbon can now be initialized.
* Carbon's API version can now be retrieved.
# 0.1.0 (August 06, 2014)
* Creation of the project