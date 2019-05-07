# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog], and this project adheres to [Semantic Versioning].

<!-- ## [Unreleased] -->

<!-- ### Added -->

<!-- ### Fixed -->

<!-- ### Breaking Changes -->

## [Unreleased]

### Added

- [#376](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/376) - Add doc comments to the types files

## [5.2.0] - 2019-04-10

### Added

- [#336](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/336) - Support TypeScript's strict mode
- [#345](https://github.com/CarbonLDP/carbonldp-js-sdk/pull/345) - Support for TypeScript 3.2
- [#337](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/337) - Retrieve all properties of a document with additional sub-properties<br>
	Example:<br>
	```typescript
    carbonldp.documents.$get( "posts/a-post/", _ => _
        .properties( _.all )
        .properties( {
            "comments": {
            "query": _ => _
                .properties( {
                    "author": _.inherit,
                    "content": _.inherit,
                } ),
            },
        } )
    );
	```
- Improve bundle size using rollup

### Fixed

- [#338](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/338) - Fix `$removeMember()`/`$removeMembers()` in Node.js
- [#366](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/366) - Fix error in bundle with undefined `global` variable 
- [#368](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/368) - Fix ignore of `_.withType()` filter when used along `_.properties( _.all )` 

## [5.1.0] - 2018-12-06

### Added

- [#332](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/332) - Retrieve multiple documents using the `$get` method<br>
	Example:<br>
	```typescript
	// Retrieve them with all their properties
    carbonldp.documents.$get( [ "posts/post-634534/", "posts/post-875623/" ] );
    
    // Selectively retrieve parts of them, nested documents, etc.
    carbonldp.documents.$get(  [ "posts/post-634534/", "posts/post-875623/" ], _ => _
        .properties( {
            "title": _.inherit,
            "content": _.inherit,
            "comments": {
           	    "query": _ => _
          	        .properties( {
         	            "author": _.inherit,
        	            "content": _.inherit,
         	        } ),
           	},
        } )
    );
	```
- [#331](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/331) - Add distribution files for `esm5` and `esm2015` targets so modern
	environments can use modern code
- [#275](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/275) - Add `tslib` as a dependency to reduce library size
- [#306](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/306) - Parse errors returned by the platform when executing SPARQL queries
- [#319](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/319) - Configure properties as required when querying documents<br>
	Example:<br>
	```typescript
	carbonldp.documents.$get( "project/", _ => _.properties( {
        "property": {
            "@id": "ex:title",
            "@type": "string",
            "required": true,
        }
    } ) );
	```

### Fixes

- [#324](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/324) - `QueryDocumentsBuilder.all` not retrieving properties that aren't defined in the
	object schemas
- [#325](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/325) - Properties defined on a document query that were not defined in the object schema
	aren't being retrieved
- [#307](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/307) - Not passing an onError callback to an event listener (e.g. `subscribe`), 
	causes the SDK to throw an undefined error on subscription errors
- [#314](https://github.com/CarbonLDP/carbonldp-js-sdk/issues/314) - Pieces of documentation are not being rendered

## [5.0.0] - 2018-09-22

New version out! This version brings structural changes to the SDK so for more information please check out [https://carbonldp.com/5.0.x/javascript-sdk/].

[Unreleased]: https://github.com/CarbonLDP/carbonldp-js-sdk/compare/v5.2.0...HEAD

[5.2.0]: https://github.com/CarbonLDP/carbonldp-js-sdk/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/CarbonLDP/carbonldp-js-sdk/compare/v5.0.0...v5.1.0
[5.0.0]: https://github.com/CarbonLDP/carbonldp-js-sdk/compare/v0.42.0...v5.0.0

[Keep a Changelog]: https://keepachangelog.com/en/1.0.0/
[Semantic Versioning]: https://semver.org/spec/v2.0.0.html