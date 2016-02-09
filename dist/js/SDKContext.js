"use strict";

System.register(["./App", "./APIDescription", "./Auth", "./Documents", "./Errors", "./LDP", "./ObjectSchema"], function (_export, _context) {
    var App, APIDescription, Auth, Documents, Errors, LDP, ObjectSchema, _createClass, Class, instance;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_App) {
            App = _App;
        }, function (_APIDescription) {
            APIDescription = _APIDescription;
        }, function (_Auth) {
            Auth = _Auth;
        }, function (_Documents) {
            Documents = _Documents.default;
        }, function (_Errors) {
            Errors = _Errors;
        }, function (_LDP) {
            LDP = _LDP;
        }, function (_ObjectSchema) {
            ObjectSchema = _ObjectSchema;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Class", Class = function () {
                function Class() {
                    _classCallCheck(this, Class);

                    this.settings = new Map();
                    this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
                    this.typeObjectSchemaMap = new Map();
                    this.Auth = new Auth.Class(this);
                    this.Documents = new Documents(this);
                    this.registerDefaultObjectSchemas();
                }

                _createClass(Class, [{
                    key: "getBaseURI",
                    value: function getBaseURI() {
                        return this.resolve("");
                    }
                }, {
                    key: "resolve",
                    value: function resolve(relativeURI) {
                        return relativeURI;
                    }
                }, {
                    key: "hasSetting",
                    value: function hasSetting(name) {
                        return this.settings.has(name) || this.parentContext && this.parentContext.hasSetting(name);
                    }
                }, {
                    key: "getSetting",
                    value: function getSetting(name) {
                        if (this.settings.has(name)) return this.settings.get(name);
                        if (this.parentContext && this.parentContext.hasSetting(name)) return this.parentContext.getSetting(name);
                        return null;
                    }
                }, {
                    key: "setSetting",
                    value: function setSetting(name, value) {
                        this.settings.set(name, value);
                    }
                }, {
                    key: "deleteSetting",
                    value: function deleteSetting(name) {
                        this.settings.delete(name);
                    }
                }, {
                    key: "hasObjectSchema",
                    value: function hasObjectSchema(type) {
                        if (this.typeObjectSchemaMap.has(type)) return true;
                        if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) return true;
                        return false;
                    }
                }, {
                    key: "getObjectSchema",
                    value: function getObjectSchema() {
                        var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                        if (!!type) {
                            if (this.typeObjectSchemaMap.has(type)) return this.typeObjectSchemaMap.get(type);
                            if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) return this.parentContext.getObjectSchema(type);
                            return null;
                        } else {
                            if (!!this.generalObjectSchema) return this.generalObjectSchema;
                            if (!!this.parentContext) return this.parentContext.getObjectSchema();
                            throw new Errors.IllegalStateError();
                        }
                    }
                }, {
                    key: "extendObjectSchema",
                    value: function extendObjectSchema(typeOrObjectSchema) {
                        var objectSchema = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                        var type = objectSchema ? typeOrObjectSchema : null;
                        objectSchema = !!objectSchema ? objectSchema : typeOrObjectSchema;
                        var digestedSchema = ObjectSchema.Digester.digestSchema(objectSchema);

                        if (!type) {
                            this.extendGeneralObjectSchema(digestedSchema);
                        } else {
                            this.extendTypeObjectSchema(digestedSchema, type);
                        }
                    }
                }, {
                    key: "clearObjectSchema",
                    value: function clearObjectSchema() {
                        var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                        if (!type) {
                            this.generalObjectSchema = !!this.parentContext ? null : new ObjectSchema.DigestedObjectSchema();
                        } else {
                            this.typeObjectSchemaMap.delete(type);
                        }
                    }
                }, {
                    key: "extendGeneralObjectSchema",
                    value: function extendGeneralObjectSchema(digestedSchema) {
                        var digestedSchemaToExtend = undefined;

                        if (!!this.generalObjectSchema) {
                            digestedSchemaToExtend = this.generalObjectSchema;
                        } else if (!!this.parentContext) {
                            digestedSchemaToExtend = this.parentContext.getObjectSchema();
                        } else {
                            digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
                        }

                        this.generalObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([new ObjectSchema.DigestedObjectSchema(), digestedSchemaToExtend, digestedSchema]);
                    }
                }, {
                    key: "extendTypeObjectSchema",
                    value: function extendTypeObjectSchema(digestedSchema, type) {
                        var digestedSchemaToExtend = undefined;

                        if (this.typeObjectSchemaMap.has(type)) {
                            digestedSchemaToExtend = this.typeObjectSchemaMap.get(type);
                        } else if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) {
                            digestedSchemaToExtend = this.parentContext.getObjectSchema(type);
                        } else {
                            digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
                        }

                        var extendedDigestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([new ObjectSchema.DigestedObjectSchema(), digestedSchemaToExtend, digestedSchema]);
                        this.typeObjectSchemaMap.set(type, extendedDigestedSchema);
                    }
                }, {
                    key: "registerDefaultObjectSchemas",
                    value: function registerDefaultObjectSchemas() {
                        this.extendObjectSchema(LDP.RDFSource.RDF_CLASS, LDP.RDFSource.SCHEMA);
                        this.extendObjectSchema(LDP.Container.RDF_CLASS, LDP.Container.SCHEMA);
                        this.extendObjectSchema(LDP.BasicContainer.RDF_CLASS, LDP.Container.SCHEMA);
                        this.extendObjectSchema(APIDescription.RDF_CLASS, APIDescription.SCHEMA);
                        this.extendObjectSchema(App.RDF_CLASS, App.SCHEMA);
                        this.extendObjectSchema(Auth.Token.RDF_CLASS, Auth.Token.CONTEXT);
                    }
                }, {
                    key: "parentContext",
                    get: function get() {
                        return null;
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("instance", instance = new Class());

            _export("instance", instance);

            _export("default", instance);
        }
    };
});
//# sourceMappingURL=SDKContext.js.map
