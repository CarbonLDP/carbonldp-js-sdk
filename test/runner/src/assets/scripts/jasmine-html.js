(function( jasmineRequire ) {

		var templatesDirectory = '../src/templates/';

		function createHTMLReporterClass( j$ ) {
			var createElement, createTextNode;
			var suites = {};
			var modules = {};
			var classes = {};
			var interfaces = {};
			var properties = {};
			var methods = {};
			var constructors = {};
			var specsResults = {};
			var templates = {};
			var newTimer = {
				start  : function() {
				},
				elapsed: function() {
					return 0;
				}
			};
			var relatedObjects = {};
			var topResults = new j$.ResultsNode( {}, '', null ),
				currentParent = topResults;

			function HTMLReporter( options ) {
				console.log( "HTMLReporter -> %o", arguments );
				this.totalSpecsDefined = 0;
				this.failedSpecs = [];
				this.pendingSpecs = [];
				this.passedSpecs = [];
				this.disabledSpecs = [];
				this.emptySpecs = [];
				this.resultsTree = new j$.ResultsNode( {}, '', null );
				this.current = [];
				this.timer = options.timer || newTimer;
				createElement = options.createElement;
				createTextNode = options.createTextNode;
			}

			HTMLReporter.prototype.initialize = function() {
				console.log( "initialize -> %o", arguments );
				console.log( "initialize -> %o", j$ );
				compileHandleBarsTemplates();
			};

			HTMLReporter.prototype.jasmineStarted = function( options ) {
				console.log( "jasmineStarted -> %o", arguments );
				this.totalSpecsDefined = options.totalSpecsDefined || 0;
				this.currentResult = this.resultsTree;
				this.timer.start();
			};

			HTMLReporter.prototype.suiteStarted = function( result ) {
				//console.log( "suiteStarted -> %o", arguments );
				this.currentResult.addChild( result, 'suite' );
				result.parent = this.currentResult;
				//console.log( 'Suite: %o', result );
				convertDescriptionToObject( result );
				//suites[ result.description.name ] = { suite: result, children: [] };
				suites[ result.description.name ] = { suite: result, children: [] };
				this.currentResult = this.currentResult.last();
			};

			HTMLReporter.prototype.suiteDone = function( result ) {
				//console.log( "suiteDone -> %o", arguments );
				if( this.currentResult == new j$.ResultsNode( {}, '', null ) ) {
					return;
				}
				this.currentResult.result.status = getSuiteStatus( this.currentResult );
				this.currentResult = this.currentResult.parent;
				//convertDescriptionToObject( result );
				var type = result.description.specType;
				if( suites[ result.description.name ].suite.description.suiteType == null )
					type = suites[ result.description.name ].suite.description.specType;
				else
					type = suites[ result.description.name ].suite.description.suiteType;


				switch( type ) {
					case 'module':
						modules[ result.description.name ] = result;
						break;
					case 'class':
						classes[ result.description.name ] = result;
						break;
					case 'interface':
						interfaces[ result.description.name ] = result;
						break;
					case 'property':
						properties[ result.description.name ] = result;
						break;
					case 'method':
						methods[ result.description.name ] = result;
						break;
					case 'constructor':
						constructors[ result.description.name ] = result;
						break;
				}
			};

			HTMLReporter.prototype.specStarted = function( result ) {
				//console.log( "specStarted -> %o %o", arguments, result.description );
				if( result.description !== 'defined' ) {
					this.currentResult.addChild( result, 'spec' );
					convertDescriptionToObject( result );
					result.parent = suites[ this.currentResult.result.description.name ].suite;
					suites[ this.currentResult.result.description.name ].children.push( result );
				}
			};

			HTMLReporter.prototype.specDone = function( result ) {
				//console.log( "specDone -> %o, %o", result.description.name, result );
				if( result.description != 'defined' ) {
					//if( result.description.specType == undefined )console.log( result );
					switch( result.status ) {
						case 'failed':
							this.failedSpecs.push( result );
							break;
						case 'pending':
							this.pendingSpecs.push( result );
							break;
						case 'passed':
							this.passedSpecs.push( result );
							break;
						case 'disabled':
							this.disabledSpecs.push( result );
							break;
						case 'empty':
							this.emptySpecs.push( result );
							break;
						default:
							console.log( "Unknown spec status\t\t -> %o", result.status );
							break;
					}
				}
			};

			HTMLReporter.prototype.jasmineDone = function() {
				console.log( "jasmineDone -> %o", arguments );
				console.log( "Total Specs: %o", this.totalSpecsDefined );
				console.log( "Failed: %o, pending: %o, passed: %o, disabled: %o, empty: %o", this.failedSpecs.length, this.pendingSpecs.length, this.passedSpecs.length, this.disabledSpecs.length, this.emptySpecs.length );
				this.timer = this.timer.elapsed() / 1000;
				console.log( this.timer );
				console.log( 'Suites: %o', suites );
				console.log( 'Modules: %o', modules );
				console.log( 'Classes: %o', classes );
				console.log( 'Interfaces: %o', interfaces );
				console.log( 'Properties: %o', properties );
				console.log( 'Methods: %o', methods );
				console.log( 'Constructors: %o', constructors );
				console.log( 'RelatedObjects: %o', relatedObjects );
				specsResults = { 'failedSpecs': this.failedSpecs, 'passedSpecs': this.passedSpecs, 'pendingSpecs': this.pendingSpecs, 'disabledSpecs': this.disabledSpecs };
				convertDescriptionsToObjects( specsResults );

				suites = sortSuites( suites );
				modules = sortSuites( modules );
				classes = sortSuites( classes );
				interfaces = sortSuites( interfaces );

				var panelModules = find( '.api-container .navigation-panel #panel-modules ul' );
				var panelClasses = find( '.api-container .navigation-panel #panel-classes ul' );
				var panelInterfaces = find( '.api-container .navigation-panel #panel-interfaces ul' );
				var messageBox = find( '.api-container .results-message-box' );


				renderModulesList( panelModules );
				renderClassesList( panelClasses );
				renderInterfacesList( panelInterfaces );
				renderMessageBox( messageBox, this );

				// Display Results Box
				find( '.results .results-summary' ).innerHTML = templates.specs_summary( {
					passedSpecs  : specsResults.passedSpecs,
					failedSpecs  : specsResults.failedSpecs,
					pendingSpecs : specsResults.pendingSpecs,
					disabledSpecs: specsResults.disabledSpecs
				} );
				var title;
				$( '.results-message-box a.status-box' ).on( 'click', function() {
					//find( '.results .suite-summary' ).innerHTML = specs[ this.getAttribute( 'show' ) ].length;
					switch( this.getAttribute( 'show' ) ) {
						case 'passedSpecs':
							title = 'Passed Specs';
							break;
						case 'failedSpecs':
							title = 'Failed Specs';
							break;
						case 'pendingSpecs':
							title = 'Pending Specs';
							break;
						case 'disabledSpecs':
							title = 'Disabled Specs';
							break;
					}
					find( '.results .results-summary' ).innerHTML = templates.specs_summary( {
						title: title,
						specs: specsResults[ this.getAttribute( 'show' ) ]
					} );
					$( '.results-summary table a' ).on( 'click', function() {
						var scrollTo = $( $( this ).attr( 'href' ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
						var container = $( 'div.suites-summary' );
						$( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
						//return false;
					} );
				} );

				// Add smooth scroll to list elements
				$( '.api-container .navigation-panel ul.side-nav li a, .results-summary table a' ).on( 'click', function() {
					var scrollTo = $( $( this ).attr( 'href' ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
					var container = $( 'div.suites-summary' );
					//jQuery( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() + 30 }, 500 );
					$( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
					//return false;
				} );
				$( '.suites-summary .methods-list a' ).on( 'click', function() {
					/*var tab = $( this ).data( 'methodstabid' );
					$( 'a[href="#' + tab + '"]' ).click();
					var scrollTo = $( $( this ).attr( 'href' ) );
					var container = $( 'div.suites-summary' );
					jQuery( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
					return false;*/

					var tab = $( this ).data( 'methodstabid' );
					var selector = 'a[href="#' + tab + '"]';
					$( selector ).click();

					var scrollTo = $( $( this ).attr( 'href' ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
					var container = $( 'div.suites-summary' );
					$( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
				} );
				$( '.suites-summary .classes-list a' ).on( 'click', function() {
					var scrollTo = $( $( this ).attr( 'href' ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
					var container = $( 'div.suites-summary' );
					$( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
					//return false;
				} );
				$( '.suites-summary .interfaces-list a' ).on( 'click', function() {
					var scrollTo = $( $( this ).attr( 'href' ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
					var container = $( 'div.suites-summary' );
					$( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
					//return false;
				} );
				$( '.suites-summary .properties-list a' ).on( 'click', function() {
					var tab = $( this ).data( 'propertiestabid' );
					var selector = 'a[href="#' + tab + '"]';
					$( selector ).click();

					var scrollTo = $( $( this ).attr( 'href' ).replace( /[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&" ) );
					var container = $( 'div.suites-summary' );
					$( 'html, body' ).animate( { scrollTop: scrollTo.offset().top - container.position().top + container.scrollTop() - 30 }, 500 );
					//return false;
				} );

				Foundation.libs.tab.init();
			};


			/**
			 * Calculates the status of the Suite by checking the result of its specs
			 *
			 * @param suite
			 *
			 */
			function getSuiteStatus( suite ) {
				var suiteStatus = '',
					empty = false,
					disabled = false,
					passed = false,
					pending = false,
					failed = false;
				for( var i = 0, length = suite.children.length; i < length; i ++ ) {
					if( suite.children[ i ].type == 'spec' ) {
						var specStatus = noExpectations( suite.children[ i ].result ) ? 'empty' : suite.children[ i ].result.status;
						if( specStatus == "failed" ) {
							suiteStatus = specStatus;
							failed = true;
							empty = false;
							disabled = false;
							passed = false;
							pending = false;
						} else if( specStatus == "pending" && ! failed ) {
							suiteStatus = specStatus;
							pending = true;
							passed = false;
							empty = false;
							disabled = false;
						} else if( specStatus == "passed" && ! pending && ! failed ) {
							suiteStatus = specStatus;
							passed = true;
							empty = false;
							disabled = false;
						} else if( specStatus == "disabled" && ! passed && ! pending && ! failed ) {
							suiteStatus = specStatus;
							disabled = true;
							empty = false;
						} else if( specStatus == "empty" && ! disabled && ! passed && ! pending && ! failed ) {
							suiteStatus = specStatus;
							empty = true;
						}
					}
				}
				//console.log( empty, failed, pending, passed, disabled )
				return suiteStatus;
			}


			/**
			 * Print Suites to a ul container
			 *
			 *
			 */
			function renderModulesList( modulesListContainer ) {
				for( var key in modules ) {
					if( modules.hasOwnProperty( key ) ) {
						printTemplate_ModulesList( modules[ key ], modulesListContainer );
						printTemplate_ModuleSummary( suites[ modules[ key ].description.name ], $( '.api-container .results .suites-summary .modules' ) );
					}
				}
			}

			function renderClassesList( classesListContainer ) {
				for( var key in classes ) {
					if( classes.hasOwnProperty( key ) ) {
						printTemplate_ClassesList( classes[ key ], classesListContainer );
						printTemplate_ClassSummary( suites[ classes[ key ].description.name ], $( '.api-container .results .suites-summary .classes' ) );
					}
				}
			}

			function renderInterfacesList( interfacesListContainer ) {
				for( var key in interfaces ) {
					if( interfaces.hasOwnProperty( key ) ) {
						printTemplate_InterfacesList( interfaces[ key ], interfacesListContainer );
						printTemplate_InterfaceSummary( suites[ interfaces[ key ].description.name ], $( '.api-container .results .suites-summary .interfaces' ) );
					}
				}
			}

			function renderMessageBox( messageBox, obj ) {
				printTemplate_MessageBox( messageBox, obj );
			}

			/**
			 *
			 *
			 *
			 */
			function convertDescriptionsToObjects( specs ) {
				for( var key in suites ) {
					suites[ key ].suite.description.relatedClasses = [];
					var specsToRemove = [];
					//
					for( var specKey in suites[ key ].children ) {
						//console.log( '%s-> %s = %o', suites[ key ].children[ specKey ].description.specType, suites[ key ].children[ specKey ].description.name, suites[ key ].children[ specKey ] );
						if( suites[ key ].children[ specKey ].description.specType == 'interface' ) {
							console.log( suites[ key ].children[ specKey ] );
							//suites[ key ].suite.description.relatedClasses.push( suites[ key ].children[ specKey ] );
							//specsToRemove.push( suites[ key ].children[ specKey ] );
							suites[ key ].children.pop( suites[ key ].children[ specKey ] );
							specs.passedSpecs.pop( suites[ key ].children[ specKey ] );
						}
					}
					/*for( var spec in specsToRemove ) {
						suites[ key ].children.pop( spec );
						specs.passedSpecs.pop( spec );
					}*/
					// Sort Specs alphabetically
					sortSpecs( suites[ key ].children );
				}
			}

			function convertDescriptionToObject( spec ) {
				// Convert Spec description to Object
				spec.description = spec.description.replace( 'JSON{', '{' );
				spec.description = stringToObject( spec.description );
				//spec.description.nameId = spec.description.name.replace( '/', '\\/' ).replace( /(:|\.\[|\]|,)/g, "\\$1" );
				//spec.description.nameId = spec.description.name.replace( '/', '\\/' ).replace( '.','\\\\' );
				//spec.description.signatures = [];
			}


			/*----------------------------
			HandleBars & Templates
			----------------------------*/
			/**
			 * Method that loads the HandleBars templates and compiles them after generation
			 *
			 *
			 */
			function compileHandleBarsTemplates() {
				// Helper to convert spec status to a check mark or fail mark
				Handlebars.registerHelper( 'getSpecStatusColor', function( status ) {
					switch( status ) {
						case '':
							return 'minus';
						case 'empty':
							return 'minus';
						case 'passed':
							return 'check';
						case 'failed':
							return 'x';
						case 'disabled':
							return 'info';
						case 'pending':
							return 'warning'
					}
				} );
				// Allows Handlebars to manage logical operators on if conditions
				Handlebars.registerHelper( 'ifCond', function( v1, operator, v2, options ) {
					switch( operator ) {
						case '==':
							return (v1 == v2) ? options.fn( this ) : options.inverse( this );
						case '===':
							return (v1 === v2) ? options.fn( this ) : options.inverse( this );
						case '<':
							return (v1 < v2) ? options.fn( this ) : options.inverse( this );
						case '<=':
							return (v1 <= v2) ? options.fn( this ) : options.inverse( this );
						case '>':
							return (v1 > v2) ? options.fn( this ) : options.inverse( this );
						case '>=':
							return (v1 >= v2) ? options.fn( this ) : options.inverse( this );
						case '&&':
							return (v1 && v2) ? options.fn( this ) : options.inverse( this );
						case '||':
							return (v1 || v2) ? options.fn( this ) : options.inverse( this );
						default:
							return options.inverse( this );
					}
				} );
				Handlebars.registerHelper( 'debug', function( something ) {
					console.log( 'Handlebar: %o %o,', this, something );
				} );
				// Loads the template 'spec_card' of a spec
				/*
				// Loads the template 'related_object_summary' to show the content of a related object
				$.get( "templates/related_object_summary.html", function() {
				} ).done( function( template ) {
					templates[ 'related_object_summary' ] = (Handlebars.compile( template ));
				} );
				*/
				// Loads the template 'specs_summary' to show a summary of all the specs
				$.get( templatesDirectory + "specs_summary.html", function() {
				} ).done( function( template ) {
					templates[ 'specs_summary' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'li_module' to list a module
				$.get( templatesDirectory + "li_module.html", function() {
				} ).done( function( template ) {
					templates[ 'li_module' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'li_class' to list a class
				$.get( templatesDirectory + "li_class.html", function() {
				} ).done( function( template ) {
					templates[ 'li_class' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'li_interface' to list a interface
				$.get( templatesDirectory + "li_interface.html", function() {
				} ).done( function( template ) {
					templates[ 'li_interface' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'module_summary' to show the content of a module
				$.get( templatesDirectory + "module_summary.html", function() {
				} ).done( function( template ) {
					templates[ 'module_summary' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'class_summary' to show the content of a class
				$.get( templatesDirectory + "class_summary.html", function() {
				} ).done( function( template ) {
					templates[ 'class_summary' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'interface_summary' to show the content of an interface
				$.get( templatesDirectory + "interface_summary.html", function() {
				} ).done( function( template ) {
					templates[ 'interface_summary' ] = (Handlebars.compile( template ));
				} );
				// Loads the template 'method_summary' to show the content of a method
				$.get( templatesDirectory + "method_summary.html", function() {
				} ).done( function( template ) {
					(Handlebars.registerPartial( 'method_summary', ( template ) ));
				} );
				// Loads the template 'property_summary' to show the content of a property
				$.get( templatesDirectory + "property_summary.html", function() {
				} ).done( function( template ) {
					(Handlebars.registerPartial( 'property_summary', ( template ) ));
				} );
				// Loads the template 'message_box' to show a summary of the test
				$.get( templatesDirectory + "message_box.html", function() {
				} ).done( function( template ) {
					templates[ 'message_box' ] = (Handlebars.compile( template ));
				} );
			}


			/**
			 * Method that prints the suite_summary template
			 *
			 * @param suite
			 * @param suiteSummaryContainer
			 *
			 */
			function printTemplate_ModuleSummary( module, moduleSummaryContainer ) {
				//console.log( '%o', module.suite );
				moduleSummaryContainer.append( templates.module_summary( {
					module_id         : module.suite.description.name,
					module_name       : module.suite.description.name,
					module_nameId     : module.suite.description.nameId,
					module_description: module.suite.description.description,
					module_classes    : findClasses( module.suite.description.name ),
					module_methods    : findMethods( module.suite.description.name ),
					module_specs      : findSpecs( module.suite.description.name ),
					module_properties : findProperties( module.suite.description.name ),
					module_interfaces : findInterfaces( module.suite.description.name ),
					module_suiteid    : module.suite.id
				} ) );
			}

			/**
			 * Method that prints the suite_summary template
			 *
			 * @param suite
			 * @param suiteSummaryContainer
			 *
			 */
			function printTemplate_ClassSummary( classs, classSummaryContainer ) {
				//console.log( '%o', classs );
				classSummaryContainer.append( templates.class_summary( {
					class_id          : classs.suite.description.name,
					class_name        : classs.suite.description.name,
					class_description : classs.suite.description.description,
					class_methods     : findMethods( classs.suite.description.name ),
					class_properties  : findProperties( classs.suite.description.name ),
					class_constructors: findConstructors( classs.suite.description.name ),
					class_suiteid     : classs.suite.id
				} ) );
			}

			function printTemplate_InterfaceSummary( interface, interfaceSummaryContainer ) {
				//console.log( '%o', interface );
				interfaceSummaryContainer.append( templates.interface_summary( {
					interface_id         : interface.suite.description.name,
					interface_name       : interface.suite.description.name,
					interface_description: interface.suite.description.description,
					interface_methods    : findMethods( interface.suite.description.name ),
					interface_properties : findProperties( interface.suite.description.name )
				} ) );
			}

			function printTemplate_ModulesList( result, container ) {
				container.innerHTML += templates.li_module( {
					id    : result.description.name,
					name  : result.description.name,
					specs : suites[ result.description.name ].children.length,
					status: getStatusClass( result.status )
				} );
			}

			function printTemplate_ClassesList( result, container ) {
				//console.log( '%o', result );
				container.innerHTML += templates.li_class( {
					id    : result.description.name,
					name  : result.description.name,
					specs : suites[ result.description.name ].children.length,
					status: getStatusClass( result.status )
				} );
			}

			function printTemplate_InterfacesList( result, container ) {
				//console.log( '%o', result );
				container.innerHTML += templates.li_interface( {
					id    : result.description.name,
					name  : result.description.name,
					specs : suites[ result.description.name ].children.length,
					status: getStatusClass( result.status )
				} );
			}

			/**
			 * Method that prints the suite_summary template
			 *
			 * @param suite
			 * @param suiteSummaryContainer
			 *
			 */
			function printTemplate_MessageBox( messageBox, obj ) {
				messageBox.innerHTML = templates.message_box( {
					finishTime   : obj.timer,
					failedSpecs  : obj.failedSpecs,
					passedSpecs  : obj.passedSpecs,
					pendingSpecs : obj.pendingSpecs,
					disabledSpecs: obj.disabledSpecs,
					totalSpecs   : obj.passedSpecs + obj.failedSpecs + obj.failedSpecs + obj.pendingSpecs + obj.disabledSpecs
				} );
			}

			/**
			 * Method that finds a given selector inside index.html
			 *
			 * @param selector
			 *
			 */
			function find( selector ) {
				return document.querySelector( selector );
			}


			function findClasses( resultId ) {
				var resultClasses = [];
				for( var key in classes ) {
					if( classes[ key ].parent.result.description.name == resultId ) {
						resultClasses.push( classes[ key ] );
					}
				}
				//console.log( "%o= %o", resultId, suites[ resultId ].children );
				return resultClasses;
			}

			function findMethods( resultId ) {
				var children = findSpecs( resultId );
				var resultMethods = [];
				var length = children.length;
				for( var i = 0; i < length; i ++ ) {
					if( children[ i ].description.specType === "method" ) {
						resultMethods.push( children[ i ] );
					}
				}
				for( var key in methods ) {
					if( methods[ key ].parent.result.description.name === resultId ) {
						if( ! methods[ key ].signatures )
						{
							methods[ key ].signatures = [];
						}
						console.log( methods[ key ] );
						methods[ key ].signatures = methods[ key ].signatures.concat( suites[ methods[ key ].description.name ].children );
						resultMethods.push( methods[ key ] );
					}
				}
				return resultMethods;
			}

			function findSpecs( resultId ) {
				return suites[ resultId ].children;
			}

			function findProperties( resultId ) {
				var resultProperties = [];
				var children = findSpecs( resultId );
				var length = children.length;
				for( var i = 0; i < length; i ++ ) {
					if( children[ i ].description.specType === "property" ) {
						resultProperties.push( children[ i ] );
					}
				}
				for( var key in properties ) {
					if( properties[ key ].parent.result.description.name === resultId ) {
						resultProperties.push( properties[ key ] );
					}
				}
				return resultProperties;
			}

			function findInterfaces( resultId ) {
				var resultInterfaces = [];
				for( var key in interfaces ) {
					if( interfaces[ key ].parent.result.description.name === resultId ) {
						resultInterfaces.push( interfaces[ key ] );
					}
				}
				return resultInterfaces;
			}

			function findConstructors( resultId ) {
				var children = findSpecs( resultId );
				var resultConstructors = [];
				var length = children.length;
				for( var i = 0; i < length; i ++ ) {
					if( children[ i ].description.specType === "constructor" ) {
						resultConstructors.push( children[ i ] );
					}
				}
				for( var key in constructors ) {
					if( constructors[ key ].parent.result.description.name === resultId ) {
						if( ! constructors[ key ].signatures )
						{
							constructors[ key ].signatures = [];
						}
						constructors[ key ].signatures = constructors[ key ].signatures.concat( suites[ constructors[ key ].description.name ].children );
						resultConstructors.push( constructors[ key ] );
					}
				}

				return resultConstructors;
			}


			/**
			 * Method that creates an HTML element
			 *
			 * @param type
			 * @param attrs
			 * @param childrenVarArgs
			 *
			 */
			function createDom( type, attrs, childrenVarArgs ) {
				var el = createElement( type );

				for( var i = 2; i < arguments.length; i ++ ) {
					var child = arguments[ i ];

					if( typeof child === 'string' ) {
						el.appendChild( createTextNode( child ) );
					} else {
						if( child ) {
							el.appendChild( child );
						}
					}
				}

				for( var attr in attrs ) {
					if( attr == 'className' ) {
						el[ attr ] = attrs[ attr ];
					} else {
						el.setAttribute( attr, attrs[ attr ] );
					}
				}

				return el;
			}

			function pluralize( singular, count ) {
				var word = (count == 1 ? singular : singular + 's');

				return '' + count + ' ' + word;
			}

			function specHref( result ) {
				return '?spec=' + encodeURIComponent( result.fullName );
			}

			function countSpecs( specs ) {
				var count = 0;
				for( var i = 0; i < specs.length; i ++ ) {
					if( specs[ i ].type == 'spec' ) {
						count ++;
					}
				}
				return count;
			}

			/**
			 * Method that sorts the Suites alphabetically
			 *
			 * @param suites
			 *
			 */
			function sortSuites( collection ) {
				var keysSorted = Object.keys( collection ).sort( function( a, b ) {
					if( collection[ a ].description == null )
						return collection[ a ] - collection[ b ];
					if( collection[ a ].description.name < collection[ b ].description.name )return - 1;
					if( collection[ a ].description.name > collection[ b ].description.name )return 1;
					return 0;
				} );
				var collection2 = {};
				for( var i = 0; i < keysSorted.length; i ++ ) {
					collection2[ keysSorted[ i ] ] = collection[ keysSorted[ i ] ];
				}
				//console.log( collection );
				collection = collection2;
				//console.log( collection );
				return collection;
			}

			/**
			 * Method that sorts the Specs alphabetically
			 *
			 * @param array
			 *
			 */
			function sortSpecs( array ) {
				return array.sort( function( a, b ) {
					if( a.description.name < b.description.name )return - 1;
					if( a.description.name > b.description.name )return 1;
					return 0;
				} );
			}

			function noExpectations( result ) {
				return (result.failedExpectations.length + result.passedExpectations.length) === 0 && result.status === 'passed';
			}

			/**
			 * Method that returns a CSS style matching the status of the Suite with a color
			 *
			 * @param result
			 *
			 */
			function getStatusClass( status ) {
				//noExpectations( result ) ? 'empty' : result.status
				switch( status ) {
					case '':
						return 'regular';
					case 'empty':
						return 'regular';
					case 'passed':
						return 'success';
					case 'failed':
						return 'alert';
					case 'disabled':
						return 'info';
					case 'pending':
						return 'warning'
				}
			}

			function stringToObject( string ) {
				if( isJsonString( string ) ) {
					return JSON.parse( string );
				} else {
					return { name: string };
				}
			}

			/**
			 * Method that returns a CSS style matching the status of the Suite with a color
			 *
			 * @param result
			 *
			 */
			function isJsonString( str ) {
				try {
					JSON.parse( str );
				} catch( e ) {
					return false;
				}
				return true;
			}

			return HTMLReporter;
		}

		var ResultsNode = (function() {
			function ResultsNode( result, type, parent ) {
				this.result = result;
				this.type = type;
				this.parent = parent;
				this.children = [];
			}

			ResultsNode.prototype.addChild = function( result, type ) {
				this.children.push( new ResultsNode( result, type, this ) );
			};

			ResultsNode.prototype.last = function() {
				return this.children[ this.children.length - 1 ];
			};

			ResultsNode.prototype.equals = function( node ) {
				return (
					this.result.description === node.result.description &&
					this.type.fullName === node.type.fullName
				);
			};

			return ResultsNode;
		}());
		var QueryString = (function() {
			function QueryString( options ) {

			}

			QueryString.prototype.getParam = function( key ) {
			};

			QueryString.prototype.setParam = function( key, value ) {
			};

			return QueryString;
		}());
		var HtmlSpecFilter = (function() {
			function HtmlSpecFilter( options ) {
				/*console.log( "HtmlSpecFilter -> %o", arguments );*/
				this.filterString = options && options.filterString() && options.filterString().replace( /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&' );
				this.filterPattern = new RegExp( this.filterString );
			}

			HtmlSpecFilter.prototype.matches = function( specName ) {
				/*console.log( "matches -> %o", arguments );*/
				return this.filterPattern.test( specName );
			};

			return HtmlSpecFilter;
		}());

		jasmineRequire.html = function( j$ ) {
			j$.ResultsNode = ResultsNode;
			j$.HtmlReporter = createHTMLReporterClass( j$ );
			j$.QueryString = QueryString;
			j$.HtmlSpecFilter = HtmlSpecFilter;
		};
	}
	( jasmineRequire )
)
;