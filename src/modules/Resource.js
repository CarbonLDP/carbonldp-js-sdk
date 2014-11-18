(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _resource = {};

	_resource.class = Carbon.DefaultPrefixes.ldp + 'Resource';

	_resource.Property = {
		type: Carbon.DefaultPrefixes.rdf + 'type'
	};

	_resource.isResource = function ( rdfResource ) {
		if ( ! rdfResource ) return false;
		return rdfResource.hasOwnProperty( "@id" );
	};

	_resource.create = function ( uri ) {
		var newResource = {};
		_resource.injectMethods( newResource );
		newResource._setURI( uri );
		return newResource;
	};

	_resource.injectMethods = function ( rdfResources ) {
		if ( ! _shared.isArray( rdfResources ) ) {
			rdfResources = [ rdfResources ];
		}

		rdfResources.forEach( function ( rdfResource ) {

			rdfResource.getURI = function () {
				return this["@id"];
			};
			rdfResource._setURI = function ( uri ) {
				this["@id"] = uri;
			};

			rdfResource.isPersisted = function () {
				return ! ! this.getURI();
			};

			rdfResource.isOfType = function ( type ) {
				var property = Carbon.Resource.Property.type;
				if ( ! this.hasOwnProperty( property ) ) {
					return false;
				}
				var values = this[property];
				var isOfType = false;
				values.some( function ( value ) {
					if ( Carbon.Resource.isResource( value ) ) {
						if ( value["@id"] == type ) {
							isOfType = true;
							return true;
						}
					}
				} );
				return isOfType;
			};

			rdfResource.addType = function ( type ) {
				var typeResource = Carbon.Resource.create( type );
				this.addProperty( Carbon.Resource.Property.type, typeResource );
			};

			rdfResource.hasProperty = function ( property ) {
				return _shared.hasProperty( this, property );
			};

			rdfResource.getProperty = function ( property ) {
				if ( ! this.hasProperty( property ) ) return null;
				var value = this[property];
				value = _shared.isArray( this[property] ) ? value : [value];
				if ( value.length == 0 ) return null;
				return value[0];
			};

			rdfResource.getPropertyValue = function ( property ) {
				var propertyObject = this.getProperty( property );
				if ( propertyObject === null ) return null;
				if ( ! Carbon.Literal.isLiteral( propertyObject ) ) return null;
				return Carbon.Literal.parseLiteral( propertyObject );
			};

			rdfResource.getPropertyURI = function ( property ) {
				var propertyObject = this.getProperty( property );
				if ( propertyObject === null ) return null;
				if ( ! _shared.hasProperty( propertyObject, '@id' ) ) return null;
				return propertyObject['@id'];
			};

			rdfResource.getPropertyResource = function ( property ) {
				// TODO: Use the SourceLibrary to return a promise with the resource the property points to
			};

			rdfResource.listProperties = function ( property ) {
				if ( ! this.hasProperty( property ) ) return [];
				return _shared.isArray( this[property] ) ? this[property] : [this[property]];
			};

			rdfResource.listPropertyValues = function ( property ) {
				var values = [];

				if ( this.hasProperty( property ) ) {
					var propertyArray = this.listProperties( property );
					var length = propertyArray.length;
					for ( var i = 0; i < length; i ++ ) {
						var propertyObject = propertyArray[i];
						if ( Carbon.Literal.isLiteral( propertyObject ) ) values.push( Carbon.Literal.parseLiteral( propertyObject ) );
					}
				}

				values.push = (function() {
					return function( value ) {
						rdfResource.addProperty( property, value );
						Array.prototype.push.call( values, value );
					};
				}());
				return values;
			};

			rdfResource.listPropertyURIs = function ( property ) {
				var uris = [];
				if ( ! this.hasProperty( property ) ) return uris;
				var propertyArray = this.listProperties( property );
				var length = propertyArray.length;
				for ( var i = 0; i < length; i ++ ) {
					var propertyObject = propertyArray[i];
					if ( _shared.hasProperty( propertyObject, '@id' ) ) uris.push( propertyObject['@id'] );
				}
				return uris;
			};

			rdfResource.listPropertyResources = function ( property ) {
				// TODO: Use the SourceLibrary to return a promise of an array with all the resources the property points to
			};

			var _propertyCallbacks = {
				add   : [],
				remove: []
			};
			rdfResource._getAddCallbacks = function () {
				return _propertyCallbacks.add;
			};
			rdfResource._addAddCallback = function ( callback ) {
				_propertyCallbacks.add.push( callback );
			};
			rdfResource._getRemoveCallbacks = function () {
				return _propertyCallbacks.remove;
			};
			rdfResource._addRemoveCallback = function ( callback ) {
				_propertyCallbacks.remove.push( callback );
			};

			rdfResource.addProperty = function ( property, value ) {
				var propertyArray;
				if ( this.hasProperty( property ) ) {
					propertyArray = this.listProperties( property );
				} else {
					propertyArray = [];
				}

				var propertyValue = {};
				if ( Carbon.Resource.isResource( value ) ) {
					propertyValue["@id"] = value.getURI();
				} else {
					propertyValue = Carbon.Literal.toLiteral( value );
				}

				// Execute callbacks
				var addCallbacks = rdfResource._getAddCallbacks();
				var addIt = true;
				for ( var i = 0; i < addCallbacks.length; i ++ ) {
					var addCallback = addCallbacks[i];
					if ( ! addCallback( property, value ) ) {
						addIt = false;
						break;
					}
				}

				if ( addIt ) {
					propertyArray.push( propertyValue );
					this[property] = propertyArray;
				}
			};

			rdfResource.setProperty = function ( property, value ) {
				this.removeProperty( property );
				if ( value === undefined || value === null ) return;
				this.addProperty( property, value );
			};

			// TODO: Add remove by value
			rdfResource.removeProperty = function ( property ) {
				// Execute callbacks
				var removeCallbacks = rdfResource._getRemoveCallbacks();
				var removeIt = true;
				for ( var i = 0; i < removeCallbacks.length; i ++ ) {
					var removeCallback = removeCallbacks[i];
					if ( ! removeCallback( property ) ) {
						removeIt = false;
						break;
					}
				}

				if ( ! this.hasOwnProperty( property ) ) {
					return;
				}

				if ( removeIt ) {
					delete this[property];
				}
			};

			rdfResource.toJsonLD = function () {
				return JSON.stringify( rdfResource );
			};
		} );
	};

	_resource.injectProperties = function( resources, propertiesObject ) {
		resources = _shared.isArray(resources) ? resources : [resources];

		for( var i = 0, length = resources.length; i < length; i++) {
			var resource = resources[i];

			for ( var name in propertiesObject ) {
				if ( propertiesObject.hasOwnProperty( name ) ) {

					var description = propertiesObject[name];
					if ( typeof description == 'string' || description instanceof String ) {
						var string = description;
						description = {};
						description.uri = string;
					}
					var defaultPropertyOptions = {
						multi   : true,
						readOnly: false,
						literal : null,
						plural  : null
					};
					$.extend( defaultPropertyOptions, description );
					description = defaultPropertyOptions;

					var getter, setter;

					if ( _shared.isNundefined( description.literal ) ) {
						// The type isn't known, inject all versions
						// TODO: Single-Simple-Getter
						getter = (function () {
							var uri = description.uri;
							return function () {
								return this.getProperty( uri );
							};
						})();
						// TODO: Single-Literal-Getter
						// TODO: Single-Resource-Getters

						if ( description.multi ) {
							// Multiple-Simple-Getter
							getter = (function () {
								var uri = description.uri;
								return function () {
									return this.listProperties( uri );
								};
							})();
							// TODO: Multiple-Literal-Getter
							// TODO: Multiple-Resource-Getters
						}
					} else if ( ! description.literal ) {
						// TODO: Single-Simple-Getter
						getter = (function () {
							var uri = description.uri;
							return function () {
								return this.getPropertyResource( uri );
							};
						})();
						// TODO: Single-Resource-Getters

						if ( description.multi ) {
							// Multiple-Simple-Getter
							getter = (function () {
								var uri = description.uri;
								return function () {
									return this.listPropertyResources( uri );
								};
							})();
							// TODO: Multiple-Resource-Getters
						}
					} else {
						// TODO: Single-Simple-Getter
						getter = (function () {
							var uri = description.uri;
							return function () {
								return this.getPropertyValue( uri );
							};
						})();

						if ( description.multi ) {
							// Multiple-Simple-Getter
							getter = (function () {
								var uri = description.uri;
								return function () {
									return this.listPropertyValues( uri );
								};
							})();
						}
					}

					if ( ! description.readOnly ) {
						if ( description.multi ) {
							// TODO: Adder
						}

						setter = (function () {
							var uri = description.uri;
							return function ( value ) {
								this.setProperty( uri, value );
							};
						})();

						// TODO: DeleteAll method
					}

					Object.defineProperty(resource, name, {
						enumerable: false,
						get: getter,
						set: setter
					});

				}
			}
		}
	};

	_resource.injectPropertyMethods = function ( resources, propertiesObject ) {
		resources = _shared.isArray(resources) ? resources : [resources];

		for( var i = 0, length = resources.length; i < length; i++) {
			var resource = resources[i];

			for ( var property in propertiesObject ) {
				// This is needed so the Object properties don't get included
				if ( propertiesObject.hasOwnProperty( property ) ) {
					var capitalizedProperty = property.charAt( 0 ).toUpperCase() + property.slice( 1 );

					var propertyValue = propertiesObject[property];
					if ( typeof propertyValue == 'string' || propertyValue instanceof String ) {
						var stringValue = propertyValue;
						propertyValue = {};
						propertyValue.uri = stringValue;
					}
					var defaultPropertyOptions = {
						multi   : true,
						readOnly: false,
						literal : null,
						plural  : null
					};
					$.extend( defaultPropertyOptions, propertyValue );
					propertyValue = defaultPropertyOptions;

					var pluralProperty = _shared.isNull( propertyValue.plural ) ? capitalizedProperty + 's' : propertyValue.plural;

					if ( _shared.isNundefined( propertyValue.literal ) ) {
						// The type isn't known, inject all versions
						// Single-Simple-Getter
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty] = function () {
								return this.getProperty( _propertyURI );
							};
						})();
						// Single-Literal-Getter
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty + "Value"] = function () {
								return this.getPropertyValue( _propertyURI );
							};
						})();
						// Single-Resource-Getters
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty + "URI"] = function () {
								return this.getPropertyURI( _propertyURI );
							};
						})();
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty + "Resource"] = function () {
								return this.getPropertyResource( _propertyURI );
							};
						})();

						if ( propertyValue.multi ) {
							// Multiple-Simple-Getter
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + pluralProperty] = function () {
									return this.listProperties( _propertyURI );
								};
							})();
							// Multiple-Literal-Getter
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + capitalizedProperty + "Values"] = function () {
									return this.listPropertyValues( _propertyURI );
								};
							})();
							// Multiple-Resource-Getters
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + capitalizedProperty + "URIs"] = function () {
									return this.listPropertyURIs( _propertyURI );
								};
							})();
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + capitalizedProperty + "Resources"] = function () {
									return this.listPropertyResources( _propertyURI );
								};
							})();
						}
					} else if ( ! propertyValue.literal ) {
						// Single-Simple-Getter
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty] = function () {
								return this.getPropertyResource( _propertyURI );
							};
						})();
						// Single-Resource-Getters
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty + "URI"] = function () {
								return this.getPropertyURI( _propertyURI );
							};
						})();

						if ( propertyValue.multi ) {
							// Multiple-Simple-Getter
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + pluralProperty] = function () {
									return this.listPropertyResources( _propertyURI );
								};
							})();
							// Multiple-Resource-Getters
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + capitalizedProperty + "URIs"] = function () {
									return this.listPropertyURIs( _propertyURI );
								};
							})();
						}
					} else {
						// Single-Simple-Getter
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["get" + capitalizedProperty] = function () {
								return this.getPropertyValue( _propertyURI );
							};
						})();

						if ( propertyValue.multi ) {
							// Multiple-Simple-Getter
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + pluralProperty] = function () {
									return this.listPropertyValues( _propertyURI );
								};
							})();
						}
					}

					if ( ! propertyValue.readOnly ) {
						if ( propertyValue.multi ) {
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["add" + capitalizedProperty] = function ( value ) {
									this.addProperty( _propertyURI, value );
								};
							})();
						}

						(function () {
							var _propertyURI = propertyValue.uri;
							resource["set" + capitalizedProperty] = function ( value ) {
								this.setProperty( _propertyURI, value );
							};
						})();

						(function () {
							var _propertyURI = propertyValue.uri;
							resource["deleteAll" + pluralProperty] = function () {
								this.removeProperty( _propertyURI );
							};
						})();
					}
				}
			}
		}
	};

	Carbon.Resource = _resource;
}( Carbon, $, jsonld, Map, _shared ));