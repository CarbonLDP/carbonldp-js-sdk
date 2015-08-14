(function( jasmineRequire ) {
	function createHTMLReporterClass( j$ ) {


		var createElement, createTextNode;
		var suites = {};
		var templates = {};
		var newTimer = {
			start  : function() {
			},
			elapsed: function() {
				return 0;
			}
		};
		var relatedObjects = {};

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
			suites[ result.id ] = { suite: result, children: [] };
			this.currentResult = this.currentResult.last();
		};

		HTMLReporter.prototype.suiteDone = function( result ) {
			//console.log( "suiteDone -> %o", arguments );
			if( this.currentResult == new j$.ResultsNode( {}, '', null ) ) {
				return;
			}
			this.currentResult.result.status = getSuiteStatus( this.currentResult );
			this.currentResult = this.currentResult.parent;
			convertDescriptionToObject( result );
			if( suites[ result.id ].suite.description.suiteType == 'submodule' ) {
				suites[ result.id ].suite.description.name = '';
				//Convert Suite JSON fullName to object
				var parts = suites[ result.id ].suite.fullName.replace( /JSON{/g, 'JSON{{' ).split( 'JSON{' );
				for( var i = 0; i < parts.length; i ++ ) {
					parts[ i ] = stringToObject( parts[ i ] );
					if( parts[ i ].name.length > 0 ) {
						// Sets the new Suite Name by adding its parent name
						suites[ result.id ].suite.description.name += '.' + parts[ i ].name.trim();
					}
				}
				suites[ result.id ].suite.description.name = suites[ result.id ].suite.description.name.replace( '.', '' );
			}
		};

		HTMLReporter.prototype.specStarted = function( result ) {
			//console.log( "specStarted -> %o %o", arguments, result.description );
			if( result.description != 'defined' ) {
				this.currentResult.addChild( result, 'spec' );
				result.parent = suites[ this.currentResult.result.id ].suite;
				suites[ this.currentResult.result.id ].children.push( result );
			}
		};

		HTMLReporter.prototype.specDone = function( result ) {
			//console.log( "specDone -> %o", arguments );
			convertDescriptionToObject( result );
			if( result.description.specType === 'interface' || result.description.specType === 'class' ) {
				relatedObjects[ result.description.specType + '_' + result.description.name ] = result;
			}
			if( result.description.name != 'defined' ) {
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
						console.log( "Unknown spec status\t\t -> %o", result.status )
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
			console.log( relatedObjects );
			var specs = { 'failedSpecs': this.failedSpecs, 'passedSpecs': this.passedSpecs, 'pendingSpecs': this.pendingSpecs, 'disabledSpecs': this.disabledSpecs };
			convertDescriptionsToObjects( specs );
			sortSuites( suites );

			var panelModules = find( '.api-container .navigation-panel #panel-modules .panel-body ul' );
			renderSuitesList( panelModules );

			var panelRelatedObjects = find( '.api-container .navigation-panel #panel-related-objects .panel-body ul' );
			renderRelatedObjectsList( panelRelatedObjects );

			var messageBox = find( '.api-container .results-message-box' );
			printTemplate_MessageBox( messageBox, this );

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
				find( '.results .suite-summary' ).innerHTML = templates.specs_summary( {
					title: title,
					specs: specs[ this.getAttribute( 'show' ) ]
				} );
			} );
			find( '.results .suite-summary' ).innerHTML = templates.specs_summary( {
				passedSpecs  : specs.passedSpecs,
				failedSpecs  : specs.failedSpecs,
				pendingSpecs : specs.pendingSpecs,
				disabledSpecs: specs.disabledSpecs
			} );
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
			for( var i = 0; i < suite.children.length; i ++ ) {
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
		 * @param obj
		 * @param suiteContainer
		 *
		 */
		function renderSuitesList( suitesContainer ) {
			for( var key in suites ) {
				printTemplate_SuiteList( suites[ key ], suitesContainer );
			}
			return suitesContainer;
		}

		function renderRelatedObjectsList( relatedObjectsContainer ) {
			for( var key in relatedObjects ) {
				printTemplate_ObjectsList( relatedObjects[ key ], relatedObjectsContainer );
			}
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
					console.log( '%s-> %s = %o', suites[ key ].children[ specKey ].description.specType, suites[ key ].children[ specKey ].description.name, suites[ key ].children[ specKey ] );
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
			spec.description.signatures = [];
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
						return 'regular';
					case 'empty':
						return 'regular';
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
			$.get( "templates/spec_card.html", function() {
			} ).done( function( template ) {
				(Handlebars.registerPartial( 'spec_card', ( template ) ));
			} );
			// Loads the template to list a suite as an element
			$.get( "templates/li_suite.html", function() {
			} ).done( function( template ) {
				templates[ 'li_suite' ] = (Handlebars.compile( template ));
			} );
			// Loads the template to list a related object as an element
			$.get( "templates/li_related_object.html", function() {
			} ).done( function( template ) {
				templates[ 'li_related_object' ] = (Handlebars.compile( template ));
			} );
			// Loads the template 'suite_summary' to show the content of a suite
			$.get( "templates/suite_summary.html", function() {
			} ).done( function( template ) {
				templates[ 'suite_summary' ] = (Handlebars.compile( template ));
			} );
			// Loads the template 'related_object_summary' to show the content of a related object
			$.get( "templates/related_object_summary.html", function() {
			} ).done( function( template ) {
				templates[ 'related_object_summary' ] = (Handlebars.compile( template ));
			} );
			// Loads the template 'message_box' to show a summary of the test
			$.get( "templates/message_box.html", function() {
			} ).done( function( template ) {
				templates[ 'message_box' ] = (Handlebars.compile( template ));
			} );
			// Loads the template 'specs_summary' to show a summary of all the specs
			$.get( "templates/specs_summary.html", function() {
			} ).done( function( template ) {
				templates[ 'specs_summary' ] = (Handlebars.compile( template ));
			} );

		}


		function showRelatedObject( a ) {
			var relatedObjectSummaryContainer = find( '.api-container .results .related-object-summary' );
			var object = relatedObjects[ a.getAttribute( 'related-object-id' ) ];

			relatedObjectSummaryContainer.innerHTML = templates.related_object_summary( {
				object_id         : object.id,
				object_name       : object.description.name,
				object_description: null,
				object_access     : object.description.access,
				object_type       : object.description.specType,
				object_specs      : object.children,
				object_attributes : object.description.arguments
			} );
			$( '.results .related-object-summary' ).show();
			$( '.results .suite-summary' ).hide();
			$( '.results .related-object-summary .methods-list ul li a' ).on( 'click', function() {

			} );
			return false;
		}

		/**
		 * Method that prints the suite_summary template
		 *
		 * @param suite
		 * @param suiteSummaryContainer
		 *
		 */
		function printTemplate_SuiteSummary( suite, suiteSummaryContainer ) {
			suiteSummaryContainer.innerHTML = templates.suite_summary( {
				suite_id            : suite.suite.id,
				suite_name          : suite.suite.description.name,
				suite_description   : suite.suite.description.description,
				suite_access        : suite.suite.description.access,
				suite_type          : suite.suite.description.suiteType,
				suite_status        : getStatusClass( suite.suite.status ),
				suite_specs         : suite.children,
				suite_relatedClasses: suite.suite.description.relatedClasses
			} );
		}

		function printTemplate_ObjectsList( object, container ) {
			container.innerHTML += templates.li_related_object( {
				object_id  : object.id,
				object_type: object.description.specType,
				object_name: object.description.name
			} );
			$( '.api-container .navigation-panel #panel-related-objects .panel-body ul li.related_object a' ).click( function() {
				showRelatedObject( this );
			} );
		}

		function printTemplate_SuiteList( result, container ) {
			container.innerHTML += templates.li_suite( {
				id    : result.suite.id,
				name  : result.suite.description.name,
				specs : result.children.length,
				status: getStatusClass( result.suite.status )
			} );
			$( '.api-container .navigation-panel #panel-modules .panel-body ul li.suite_element a' ).click( function() {
				var a = this;
				//console.log( suites[ a.getAttribue( 'suite_id' ) ] );
				var suiteSummaryContainer = find( '.api-container .results .suite-summary' );
				printTemplate_SuiteSummary( suites[ a.getAttribute( 'suite_id' ) ], suiteSummaryContainer );
				$( '.results .related-object-summary' ).hide();
				$( '.results .suite-summary' ).show();
				$( '.results .suite-summary .methods-list ul li a' ).on( 'click', function() {
					//console.log( '%o', this );
					/*find this.getAttribute( 'card' ) ).style.borderColor = '#008CBA';
					find( this.getAttribute( 'card' ) ).style.borderWidth = '3px';*/
					var presentingCard = $( this.getAttribute( 'card' ) );
					presentingCard.toggleClass( 'presenting-card' );
					setTimeout( function() {
						presentingCard.toggleClass( 'presenting-card' );
					}, 2000 );
				} );

				$( '.results .suite-summary .spec-card .arguments p.type a' ).click( function() {
					showRelatedObject( this );
					return false;
				} );
				return false;
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
		function sortSuites( suites ) {
			var sortedSuitesIndex = []
			for( var suite in suites ) {
				sortedSuitesIndex.push( [ suites[ suite ].suite.description.name, suites[ suite ] ] );
				//sortedSuitesIndex.push( [ suite, suites[ suite ] ] );
			}
			sortedSuitesIndex = sortedSuitesIndex.sort( function( a, b ) {
				if( a[ 0 ] < b[ 0 ] )return - 1;
				if( a[ 0 ] > b[ 0 ] )return 1;
				return 0;
			} );
			suites = {};
			for( var i = 0; i < sortedSuitesIndex.length; i ++ ) {
				suites[ sortedSuitesIndex[ i ][ 1 ].suite.id ] = sortedSuitesIndex[ i ][ 1 ];
			}
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
}( jasmineRequire ));