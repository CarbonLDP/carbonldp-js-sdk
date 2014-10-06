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
				return this.hasOwnProperty( property );
			};

			rdfResource.getProperty = function ( property ) {
				if ( ! this.hasProperty( property ) ) return null;
				if ( this[property] instanceof Array ) {
					if ( this[property].length < 1 ) return null;
					return this[property][0];
				}
				return this[property];
			};

			rdfResource.getPropertyValue = function ( property ) {
				var propertyObject = this.getProperty( property );
				if ( propertyObject === null ) return null;
				if ( propertyObject.hasOwnProperty( '@value' ) ) return propertyObject['@value'];
				return null;
			};

			rdfResource.getPropertyURI = function ( property ) {
				var propertyObject = this.getProperty( property );
				if ( propertyObject === null ) return null;
				if ( propertyObject.hasOwnProperty( '@id' ) ) return propertyObject['@id'];
				return null;
			};

			rdfResource.listProperties = function ( property ) {
				if ( ! this.hasProperty( property ) ) return null;
				if ( this[property] instanceof Array ) {
					if ( this[property].length < 1 ) return null;
					return this[property];
				}
				return null;
			};

			rdfResource.listPropertyValues = function ( property ) {
				var values = [];
				if ( ! this.hasProperty( property ) ) return values;
				var propertyArray = _shared.isArray( this[property] ) ? this[property] : [this[property]];
				var length = propertyArray.length;
				for ( var i = 0; i < length; i ++ ) {
					var propertyObject = propertyArray[i];
					if ( property ) {
						if ( propertyObject.hasOwnProperty( '@value' ) ) values.push( propertyObject['@value'] );
					}
				}
				return values;
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

	_resource.injectPropertyMethods = function ( resource, propertiesObject ) {
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
					literal : null
				};
				$.extend( defaultPropertyOptions, propertyValue );
				propertyValue = defaultPropertyOptions;

				if ( propertyValue.multi ) {
					// Adder
					(function () {
						var _propertyURI = propertyValue.uri;
						resource["add" + capitalizedProperty] = function ( value ) {
							this.addProperty( _propertyURI, value );
						};
					})();
				}
				// Single-Getter
				if ( propertyValue.literal === null ) {
					if ( propertyValue.multi ) {
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["list" + capitalizedProperty + "s"] = function () {
								return this.listProperties( _propertyURI );
							};
						})();
					}

					(function () {
						var _propertyURI = propertyValue.uri;
						resource["get" + capitalizedProperty] = function () {
							return this.getProperty( _propertyURI );
						};
					})();
				} else if ( propertyValue.literal ) {
					(function () {
						var _propertyURI = propertyValue.uri;
						resource["get" + capitalizedProperty] = function () {
							return this.getPropertyValue( _propertyURI );
						};
					})();

					if ( propertyValue.multi ) {
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["list" + capitalizedProperty + "s"] = function () {
								return this.listPropertyValues( _propertyURI );
							};
						})();
					}
				} else {
					if ( propertyValue.multi ) {
						(function () {
							var _propertyURI = propertyValue.uri;
							resource["list" + capitalizedProperty + "s"] = function () {
								return this.listProperties( _propertyURI );
							};
						})();
					}

					(function () {
						var _propertyURI = propertyValue.uri;
						resource["get" + capitalizedProperty + "URI"] = function () {
							return this.getPropertyURI( _propertyURI );
						};
					})();
				}

				if ( ! propertyValue.readOnly ) {
					// Setter
					(function () {
						var _propertyURI = propertyValue.uri;
						resource["set" + capitalizedProperty] = function ( value ) {
							this.setProperty( _propertyURI, value );
						};
					})();

					(function () {
						var _propertyURI = propertyValue.uri;
						resource["deleteAll" + capitalizedProperty + "s"] = function () {
							this.removeProperty( _propertyURI );
						};
					})();
				}
			}
		}
	};

	Carbon.Resource = _resource;
}( Carbon, $, jsonld, Map, _shared ));