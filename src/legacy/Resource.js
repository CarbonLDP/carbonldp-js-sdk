define(
	[
		'Carbon/utils', 'Carbon/constants', 'Carbon/Literal'
	], function( utils, constants, Literal ) {
		'use strict';
		var Resource = {};

		Resource.class = constants.Prefixes.ldp + 'Resource';

		Resource.Property = {
			type: constants.Prefixes.rdf + 'type'
		};

		function isPersisted() {
			return utils.isString( this.uri );
		}

		function hasType( type ) {
			var property = Resource.Property.type;
			if( ! this.hasOwnProperty( property ) ) {
				return false;
			}
			var values = this[ property ];
			return (function() {
				for( var i = 0, length = values.length; i < length; i ++ ) {
					var value = values[ i ];
					if( value[ "@id" ] == type ) return true;
				}
				return false;
			})();
		}

		function hasProperty( property ) {
			return utils.hasProperty( this, property );
		}

		function getProperty( property ) {
			if( ! this.hasProperty( property ) ) return null;

			var value = this[ property ];
			value = utils.isArray( this[ property ] ) ? value : [ value ];
			if( value.length == 0 ) return null;

			return value[ 0 ];
		}

		function getPropertyValue( property ) {
			var propertyObject = this.getProperty( property );

			if( utils.isNull( propertyObject ) ) return null;

			if( ! Literal.isLiteral( propertyObject ) ) return null;
			return Literal.parseLiteral( propertyObject );
		}

		function getPropertyURI( property ) {
			var propertyObject = this.getProperty( property );
			if( propertyObject === null ) return null;
			if( ! utils.hasProperty( propertyObject, '@id' ) ) return null;
			return propertyObject[ '@id' ];
		}

		function listProperties( property ) {
			if( ! this.hasProperty( property ) ) return [];
			return utils.isArray( this[ property ] ) ? this[ property ] : [ this[ property ] ];
		}

		function listPropertyValues( property ) {
			var values = [];

			if( this.hasProperty( property ) ) {
				var propertyArray = this.listProperties( property );
				for( var i = 0, length = propertyArray.length; i < length; i ++ ) {
					var propertyObject = propertyArray[ i ];
					if( Literal.isLiteral( propertyObject ) ) values.push( Literal.parseLiteral( propertyObject ) );
				}
			}

			values = tieArray( values, this, property );

			return values;
		}

		function listPropertyURIs( property ) {
			var uris = [];
			if( ! this.hasProperty( property ) ) return uris;
			var propertyArray = this.listProperties( property );

			for( var i = 0, length = propertyArray.length; i < length; i ++ ) {
				var propertyObject = propertyArray[ i ];
				if( utils.hasProperty( propertyObject, '@id' ) ) uris.push( propertyObject[ '@id' ] );
			}

			return uris;
		}

		function addProperty( property, value ) {
			var propertyArray = this.listProperties( property );

			var propertyValue;
			if( Resource.isResource( value ) ) {
				propertyValue = {
					'@id': value.getURI()
				};
			} else {
				propertyValue = Literal.toLiteral( value );
			}

			propertyArray.push( propertyValue );
			this[ property ] = propertyArray;
		}

		function setProperty( property, value ) {
			this.removeProperty( property );
			if( value === undefined || value === null ) return;
			this.addProperty( property, value );
		}

		function removeProperty( property ) {
			delete this[ property ];
		}

		function toJsonLD() {
			return JSON.stringify( this );
		}

		Resource.injectMethods = function( rdfResources ) {
			rdfResources = utils.isArray( rdfResources ) ? rdfResources : [ rdfResources ];

			(function() {
				for( var i = 0, length = rdfResources; i < length; i ++ ) {
					var rdfResource = rdfResources[ i ];

					Object.defineProperties(
						rdfResource, {
							'uri': {
								get:        function() {
									return this[ '@id' ];
								},
								set:        function( value ) {
									this[ '@id' ] = value;
								},
								enumerable: false
							}
						}
					);

					rdfResource.isPersisted = isPersisted;
					rdfResource.hasType = hasType;
					rdfResource.hasProperty = hasProperty;
					rdfResource.getProperty = getProperty;
					rdfResource.getPropertyValue = getPropertyValue;
					rdfResource.getPropertyURI = getPropertyURI;
					rdfResource.listProperties = listProperties;
					rdfResource.listPropertyValues = listPropertyValues;
					rdfResource.listPropertyURIs = listPropertyURIs;
					rdfResource.addProperty = addProperty;
					rdfResource.setProperty = setProperty;
					rdfResource.removeProperty = removeProperty;
					rdfResource.toJsonLD = toJsonLD;

				}
			}());

		};

		var defaultPropertyOptions = {
			multi:    true,
			readOnly: false,
			literal:  null,
			plural:   null
		};

		Resource.injectProperties = function( resources, propertiesObject ) {
			resources = utils.isArray( resources ) ? resources : [ resources ];

			for( var i = 0, length = resources.length; i < length; i ++ ) {
				var resource = resources[ i ];

				for( var name in propertiesObject ) {
					if( propertiesObject.hasOwnProperty( name ) ) {

						var description = propertiesObject[ name ];
						if( typeof description == 'string' || description instanceof String ) {
							var string = description;
							description = {};
							description.uri = string;
						}

						description = utils.extend( {}, defaultPropertyOptions, description );

						var getter, setter;

						if( utils.isNundefined( description.literal ) ) {
							// The type isn't known, inject all versions
							// TODO: Single-Simple-Getter
							getter = (function() {
								var uri = description.uri;
								return function() {
									return this.getProperty( uri );
								};
							})();
							// TODO: Single-Literal-Getter
							// TODO: Single-Resource-Getters

							if( description.multi ) {
								// Multiple-Simple-Getter
								getter = (function() {
									var uri = description.uri;
									return function() {
										return this.listProperties( uri );
									};
								})();
								// TODO: Multiple-Literal-Getter
								// TODO: Multiple-Resource-Getters
							}
						} else if( ! description.literal ) {
							// TODO: Single-Simple-Getter
							getter = (function() {
								var uri = description.uri;
								return function() {
									return this.getPropertyResource( uri );
								};
							})();
							// TODO: Single-Resource-Getters

							if( description.multi ) {
								// Multiple-Simple-Getter
								getter = (function() {
									var uri = description.uri;
									return function() {
										return this.listPropertyResources( uri );
									};
								})();
								// TODO: Multiple-Resource-Getters
							}
						} else {
							// TODO: Single-Simple-Getter
							getter = (function() {
								var uri = description.uri;
								return function() {
									return this.getPropertyValue( uri );
								};
							})();

							if( description.multi ) {
								// Multiple-Simple-Getter
								getter = (function() {
									var uri = description.uri;
									return function() {
										return this.listPropertyValues( uri );
									};
								})();
							}
						}

						if( ! description.readOnly ) {
							if( description.multi ) {
								// TODO: Adder
							}

							setter = (function() {
								var uri = description.uri;
								return function( value ) {
									this.setProperty( uri, value );
								};
							})();

							// TODO: DeleteAll method
						}

						Object.defineProperty(
							resource, name, {
								enumerable: false,
								get:        getter,
								set:        setter
							}
						);

					}
				}
			}
		};

		Resource.injectPropertyMethods = function( resources, propertiesObject ) {
			resources = utils.isArray( resources ) ? resources : [ resources ];

			for( var i = 0, length = resources.length; i < length; i ++ ) {
				var resource = resources[ i ];

				for( var property in propertiesObject ) {
					// This is needed so the Object properties don't get included
					if( propertiesObject.hasOwnProperty( property ) ) {
						var capitalizedProperty = property.charAt( 0 ).toUpperCase() + property.slice( 1 );

						var propertyValue = propertiesObject[ property ];
						if( typeof propertyValue == 'string' || propertyValue instanceof String ) {
							var stringValue = propertyValue;
							propertyValue = {};
							propertyValue.uri = stringValue;
						}
						propertyValue = utils.extend( {}, defaultPropertyOptions, propertyValue );

						var pluralProperty = utils.isNull( propertyValue.plural ) ? capitalizedProperty + 's' : propertyValue.plural;

						if( utils.isNundefined( propertyValue.literal ) ) {
							// The type isn't known, inject all versions
							// Single-Simple-Getter
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty ] = function() {
									return this.getProperty( _propertyURI );
								};
							})();
							// Single-Literal-Getter
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty + "Value" ] = function() {
									return this.getPropertyValue( _propertyURI );
								};
							})();
							// Single-Resource-Getters
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty + "URI" ] = function() {
									return this.getPropertyURI( _propertyURI );
								};
							})();
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty + "Resource" ] = function() {
									return this.getPropertyResource( _propertyURI );
								};
							})();

							if( propertyValue.multi ) {
								// Multiple-Simple-Getter
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + pluralProperty ] = function() {
										return this.listProperties( _propertyURI );
									};
								})();
								// Multiple-Literal-Getter
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + capitalizedProperty + "Values" ] = function() {
										return this.listPropertyValues( _propertyURI );
									};
								})();
								// Multiple-Resource-Getters
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + capitalizedProperty + "URIs" ] = function() {
										return this.listPropertyURIs( _propertyURI );
									};
								})();
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + capitalizedProperty + "Resources" ] = function() {
										return this.listPropertyResources( _propertyURI );
									};
								})();
							}
						} else if( ! propertyValue.literal ) {
							// Single-Simple-Getter
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty ] = function() {
									return this.getPropertyResource( _propertyURI );
								};
							})();
							// Single-Resource-Getters
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty + "URI" ] = function() {
									return this.getPropertyURI( _propertyURI );
								};
							})();

							if( propertyValue.multi ) {
								// Multiple-Simple-Getter
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + pluralProperty ] = function() {
										return this.listPropertyResources( _propertyURI );
									};
								})();
								// Multiple-Resource-Getters
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + capitalizedProperty + "URIs" ] = function() {
										return this.listPropertyURIs( _propertyURI );
									};
								})();
							}
						} else {
							// Single-Simple-Getter
							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "get" + capitalizedProperty ] = function() {
									return this.getPropertyValue( _propertyURI );
								};
							})();

							if( propertyValue.multi ) {
								// Multiple-Simple-Getter
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "list" + pluralProperty ] = function() {
										return this.listPropertyValues( _propertyURI );
									};
								})();
							}
						}

						if( ! propertyValue.readOnly ) {
							if( propertyValue.multi ) {
								(function() {
									var _propertyURI = propertyValue.uri;
									resource[ "add" + capitalizedProperty ] = function( value ) {
										this.addProperty( _propertyURI, value );
									};
								})();
							}

							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "set" + capitalizedProperty ] = function( value ) {
									this.setProperty( _propertyURI, value );
								};
							})();

							(function() {
								var _propertyURI = propertyValue.uri;
								resource[ "deleteAll" + pluralProperty ] = function() {
									this.removeProperty( _propertyURI );
								};
							})();
						}
					}
				}
			}
		};


		function tieArray( array, toObject, toProperty ) {
			array.push = (function() {
				return function( value ) {
					toObject.addProperty( toProperty, value );
					Array.prototype.push.call( array, value );
				};
			}());
			// TODO: concat
			// TODO: join
			// TODO: pop
			// TODO: reverse
			// TODO: shift
			// TODO: slice
			// TODO: sort
			// TODO: splice
			// TODO: unshift

			return array;
		}

		return Resource;
	}
)
;