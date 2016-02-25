"format global";
(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var getOwnPropertyDescriptor = true;
  try {
    Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
  }
  catch(e) {
    getOwnPropertyDescriptor = false;
  }

  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry;

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;

      if (typeof name == 'object') {
        for (var p in name)
          exports[p] = name[p];
      }
      else {
        exports[name] = value;
      }

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          for (var j = 0; j < importerModule.dependencies.length; ++j) {
            if (importerModule.dependencies[j] === module) {
              importerModule.setters[j](exports);
            }
          }
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      entry.esModule = {};
      
      // don't trigger getters/setters in environments that support them
      if ((typeof exports == 'object' || typeof exports == 'function') && exports !== global) {
        if (getOwnPropertyDescriptor) {
          var d;
          for (var p in exports)
            if (d = Object.getOwnPropertyDescriptor(exports, p))
              defineProperty(entry.esModule, p, d);
        }
        else {
          var hasOwnProperty = exports && exports.hasOwnProperty;
          for (var p in exports) {
            if (!hasOwnProperty || exports.hasOwnProperty(p))
              entry.esModule[p] = exports[p];
          }
         }
       }
      entry.esModule['default'] = exports;
      defineProperty(entry.esModule, '__useDefault', {
        value: true
      });
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    // node core modules
    if (name.substr(0, 6) == '@node/')
      return require(name.substr(6));

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // exported modules get __esModule defined for interop
    if (entry.declarative)
      defineProperty(entry.module.exports, '__esModule', { value: true });

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, depNames, declare) {
    return function(formatDetect) {
      formatDetect(function(deps) {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        // register external dependencies
        for (var i = 0; i < depNames.length; i++) (function(depName, dep) {
          if (dep && dep.__esModule)
            System.register(depName, [], function(_export) {
              return {
                setters: [],
                execute: function() {
                  for (var p in dep)
                    if (p != '__esModule' && !(typeof p == 'object' && p + '' == 'Module'))
                      _export(p, dep[p]);
                }
              };
            });
          else
            System.registerDynamic(depName, [], false, function() {
              return dep;
            });
        })(depNames[i], arguments[i]);

        // register modules in this bundle
        declare(System);

        // load mains
        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        if (firstLoad.__useDefault)
          return firstLoad['default'];
        else
          return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], ['external-dep'], function($__System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(['external-dep'], factory);
  // etc UMD / module pattern
})*/

(['1'], [], function($__System) {

(function(__global) {
  var loader = $__System;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
  var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
  var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
  var fnBracketRegEx = /\(([^\)]*)\)/;
  var wsRegEx = /^\s+|\s+$/g;
  
  var requireRegExs = {};

  function getCJSDeps(source, requireIndex) {

    // remove comments
    source = source.replace(commentRegEx, '');

    // determine the require alias
    var params = source.match(fnBracketRegEx);
    var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

    // find or generate the regex for this requireAlias
    var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

    requireRegEx.lastIndex = 0;

    var deps = [];

    var match;
    while (match = requireRegEx.exec(source))
      deps.push(match[2] || match[3]);

    return deps;
  }

  /*
    AMD-compatible require
    To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
  */
  function require(names, callback, errback, referer) {
    // in amd, first arg can be a config object... we just ignore
    if (typeof names == 'object' && !(names instanceof Array))
      return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

    // amd require
    if (typeof names == 'string' && typeof callback == 'function')
      names = [names];
    if (names instanceof Array) {
      var dynamicRequires = [];
      for (var i = 0; i < names.length; i++)
        dynamicRequires.push(loader['import'](names[i], referer));
      Promise.all(dynamicRequires).then(function(modules) {
        if (callback)
          callback.apply(null, modules);
      }, errback);
    }

    // commonjs require
    else if (typeof names == 'string') {
      var module = loader.get(names);
      return module.__useDefault ? module['default'] : module;
    }

    else
      throw new TypeError('Invalid require');
  }

  function define(name, deps, factory) {
    if (typeof name != 'string') {
      factory = deps;
      deps = name;
      name = null;
    }
    if (!(deps instanceof Array)) {
      factory = deps;
      deps = ['require', 'exports', 'module'].splice(0, factory.length);
    }

    if (typeof factory != 'function')
      factory = (function(factory) {
        return function() { return factory; }
      })(factory);

    // in IE8, a trailing comma becomes a trailing undefined entry
    if (deps[deps.length - 1] === undefined)
      deps.pop();

    // remove system dependencies
    var requireIndex, exportsIndex, moduleIndex;
    
    if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
      
      deps.splice(requireIndex, 1);

      // only trace cjs requires for non-named
      // named defines assume the trace has already been done
      if (!name)
        deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
    }

    if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
      deps.splice(exportsIndex, 1);
    
    if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
      deps.splice(moduleIndex, 1);

    var define = {
      name: name,
      deps: deps,
      execute: function(req, exports, module) {

        var depValues = [];
        for (var i = 0; i < deps.length; i++)
          depValues.push(req(deps[i]));

        module.uri = module.id;

        module.config = function() {};

        // add back in system dependencies
        if (moduleIndex != -1)
          depValues.splice(moduleIndex, 0, module);
        
        if (exportsIndex != -1)
          depValues.splice(exportsIndex, 0, exports);
        
        if (requireIndex != -1) 
          depValues.splice(requireIndex, 0, function(names, callback, errback) {
            if (typeof names == 'string' && typeof callback != 'function')
              return req(names);
            return require.call(loader, names, callback, errback, module.id);
          });

        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

        if (typeof output == 'undefined' && module)
          output = module.exports;

        if (typeof output != 'undefined')
          return output;
      }
    };

    // anonymous define
    if (!name) {
      // already defined anonymously -> throw
      if (lastModule.anonDefine)
        throw new TypeError('Multiple defines for anonymous module');
      lastModule.anonDefine = define;
    }
    // named define
    else {
      // if we don't have any other defines,
      // then let this be an anonymous define
      // this is just to support single modules of the form:
      // define('jquery')
      // still loading anonymously
      // because it is done widely enough to be useful
      if (!lastModule.anonDefine && !lastModule.isBundle) {
        lastModule.anonDefine = define;
      }
      // otherwise its a bundle only
      else {
        // if there is an anonDefine already (we thought it could have had a single named define)
        // then we define it now
        // this is to avoid defining named defines when they are actually anonymous
        if (lastModule.anonDefine && lastModule.anonDefine.name)
          loader.registerDynamic(lastModule.anonDefine.name, lastModule.anonDefine.deps, false, lastModule.anonDefine.execute);

        lastModule.anonDefine = null;
      }

      // note this is now a bundle
      lastModule.isBundle = true;

      // define the module through the register registry
      loader.registerDynamic(name, define.deps, false, define.execute);
    }
  }
  define.amd = {};

  // adds define as a global (potentially just temporarily)
  function createDefine(loader) {
    lastModule.anonDefine = null;
    lastModule.isBundle = false;

    // ensure no NodeJS environment detection
    var oldModule = __global.module;
    var oldExports = __global.exports;
    var oldDefine = __global.define;

    __global.module = undefined;
    __global.exports = undefined;
    __global.define = define;

    return function() {
      __global.define = oldDefine;
      __global.module = oldModule;
      __global.exports = oldExports;
    };
  }

  var lastModule = {
    isBundle: false,
    anonDefine: null
  };

  loader.set('@@amd-helpers', loader.newModule({
    createDefine: createDefine,
    require: require,
    define: define,
    lastModule: lastModule
  }));
  loader.amdDefine = define;
  loader.amdRequire = require;
})(typeof self != 'undefined' ? self : global);

"bundle";
/// <reference path="./../typings/typings.d.ts" />
$__System.register("2", ["3", "4", "5", "6", "7"], function(exports_1) {
    var App, Pointer, RDF, Utils, CS;
    var Apps;
    return {
        setters:[
            function (App_1) {
                App = App_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (CS_1) {
                CS = CS_1;
            }],
        execute: function() {
            Apps = (function () {
                function Apps(context) {
                    this.context = context;
                }
                Apps.prototype.get = function (uri) {
                    var _this = this;
                    var appsContainerURI = this.getAppsContainerURI();
                    if (RDF.URI.Util.isRelative(uri)) {
                        if (!Utils.S.startsWith(uri, appsContainerURI))
                            uri = RDF.URI.Util.resolve(appsContainerURI, uri);
                        uri = this.context.resolve(uri);
                    }
                    return this.context.documents.get(uri).then(function (_a) {
                        var document = _a[0], response = _a[1];
                        if (!document.types.indexOf(CS.Class.Application))
                            throw new Error("The resource fetched is not a cs:Application.");
                        return new App.Context(_this.context, document);
                    });
                };
                Apps.prototype.getAll = function () {
                    var _this = this;
                    return this.context.documents.getMembers(this.getAppsContainerURI(), false).then(function (_a) {
                        var members = _a[0], response = _a[1];
                        return Pointer.Util.resolveAll(members);
                    }).then(function (_a) {
                        var members = _a[0], responses = _a[1];
                        return members.map(function (member) { return new App.Context(_this.context, member); });
                    });
                };
                Apps.prototype.getAppsContainerURI = function () {
                    if (!this.context.hasSetting("platform.apps.container"))
                        throw new Error("The apps container URI hasn't been set.");
                    return this.context.getSetting("platform.apps.container");
                };
                return Apps;
            })();
            exports_1("Apps", Apps);
            exports_1("default",Apps);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("3", ["8", "9", "5", "6"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractContext_1, NS, RDF, Utils;
    var RDF_CLASS, SCHEMA, AppContext, Factory, factory;
    return {
        setters:[
            function (AbstractContext_1_1) {
                AbstractContext_1 = AbstractContext_1_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.CS.Class.Application);
            exports_1("SCHEMA", SCHEMA = {
                "rootContainer": {
                    "@id": NS.CS.Predicate.rootContainer,
                    "@type": "@id",
                },
            });
            AppContext = (function (_super) {
                __extends(AppContext, _super);
                function AppContext(parentContext, app) {
                    _super.call(this, parentContext);
                    this.app = app;
                    this.base = this.getBase(this.app);
                }
                AppContext.prototype.resolve = function (uri) {
                    if (RDF.URI.Util.isAbsolute(uri))
                        return uri;
                    var finalURI = this.parentContext.resolve(this.base);
                    return RDF.URI.Util.resolve(finalURI, uri);
                };
                AppContext.prototype.getBase = function (resource) {
                    return resource.rootContainer.id;
                };
                return AppContext;
            })(AbstractContext_1.default);
            exports_1("Context", AppContext);
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "rootContainer"));
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

$__System.register("a", ["9"], function(exports_1) {
    var NS;
    var RDF_CLASS, SCHEMA;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.C.Class.API);
            exports_1("SCHEMA", SCHEMA = {
                "version": {
                    "@id": NS.C.Predicate.version,
                    "@type": NS.XSD.DataType.string,
                },
                "buildDate": {
                    "@id": NS.C.Predicate.buildDate,
                    "@type": NS.XSD.DataType.dateTime,
                },
            });
        }
    }
});

/// <reference path="../../typings/typings.d.ts" />
$__System.register("b", ["9", "6"], function(exports_1) {
    var NS, Utils;
    var RDF_CLASS, SCHEMA, Factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.C.Class.AccessPoint);
            exports_1("SCHEMA", SCHEMA = {
                "membershipResource": {
                    "@id": NS.LDP.Predicate.membershipResource,
                    "@type": "@id",
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "membershipResource"));
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

/// <reference path="./../../typings/typings.d.ts" />
$__System.register("c", ["9", "4"], function(exports_1) {
    var NS, Pointer;
    var RDF_CLASS, Factory, factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.BasicContainer);
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasRDFClass = function (pointerOrExpandedObject) {
                    var types = [];
                    if ("@type" in pointerOrExpandedObject) {
                        types = pointerOrExpandedObject["@type"];
                    }
                    else if ("types" in pointerOrExpandedObject) {
                        // TODO: Use proper class
                        var resource = pointerOrExpandedObject;
                        types = Pointer.Util.getIDs(resource.types);
                    }
                    return types.indexOf(NS.LDP.Class.BasicContainer) !== -1;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

/// <reference path="../../typings/typings.d.ts" />
$__System.register("d", ["9", "4", "6"], function(exports_1) {
    var NS, Pointer, Utils;
    var RDF_CLASS, SCHEMA, Factory, factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.Container);
            exports_1("SCHEMA", SCHEMA = {
                "contains": {
                    "@id": NS.LDP.Predicate.contains,
                    "@container": "@set",
                    "@type": "@id",
                },
                "members": {
                    "@id": NS.LDP.Predicate.member,
                    "@container": "@set",
                    "@type": "@id",
                },
                "memberOfRelation": {
                    "@id": NS.LDP.Predicate.memberOfRelation,
                    "@type": "@id",
                },
                "hasMemberRelation": {
                    "@id": NS.LDP.Predicate.hasMemberRelation,
                    "@type": "@id",
                },
                "insertedContentRelation": {
                    "@id": NS.LDP.Predicate.insertedContentRelation,
                    "@type": "@id",
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
                        Utils.hasPropertyDefined(resource, "hasMemberRelation"));
                };
                Factory.prototype.hasRDFClass = function (pointerOrExpandedObject) {
                    var types = [];
                    if ("@type" in pointerOrExpandedObject) {
                        types = pointerOrExpandedObject["@type"];
                    }
                    else if ("types" in pointerOrExpandedObject) {
                        // TODO: Use proper class
                        var resource = pointerOrExpandedObject;
                        types = Pointer.Util.getIDs(resource.types);
                    }
                    return (types.indexOf(RDF_CLASS) !== -1 ||
                        types.indexOf(NS.LDP.Class.BasicContainer) !== -1 ||
                        types.indexOf(NS.LDP.Class.DirectContainer) !== -1 ||
                        types.indexOf(NS.LDP.Class.IndirectContainer) !== -1);
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

$__System.register("e", ["6"], function(exports_1) {
    var Utils;
    var Factory;
    function createChild(slugOrObject, object) {
        if (slugOrObject === void 0) { slugOrObject = null; }
        if (object === void 0) { object = null; }
        var slug = Utils.isString(slugOrObject) ? slugOrObject : null;
        object = !!slugOrObject && !Utils.isString(slugOrObject) ? slugOrObject : (!!object ? object : null);
        // TODO: Check if the object is a document
        // TODO: If it's not a document turn it and any of the objects related to it into document/fragments
        var document = object;
        if (slug !== null) {
            return this._documents.createChild(this.id, slug, document);
        }
        else
            return this._documents.createChild(this.id, document);
    }
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (document) {
                    return (Utils.hasFunction(document, "createChild"));
                };
                Factory.decorate = function (persistedDocument) {
                    if (Factory.hasClassProperties(persistedDocument))
                        return persistedDocument;
                    Object.defineProperties(persistedDocument, {
                        "createChild": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: createChild,
                        },
                    });
                    return persistedDocument;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

$__System.register("f", ["9"], function(exports_1) {
    var NS;
    var RDF_CLASS, SCHEMA, Factory, factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.RDFSource);
            exports_1("SCHEMA", SCHEMA = {
                "created": {
                    "@id": NS.C.Predicate.created,
                    "@type": NS.XSD.DataType.dateTime,
                },
                "modified": {
                    "@id": NS.C.Predicate.modified,
                    "@type": NS.XSD.DataType.dateTime,
                },
            });
            Factory = (function () {
                function Factory() {
                }
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

$__System.register("10", ["b", "c", "d", "e", "f"], function(exports_1) {
    var AccessPoint, BasicContainer, Container, PersistedContainer, RDFSource;
    return {
        setters:[
            function (AccessPoint_1) {
                AccessPoint = AccessPoint_1;
            },
            function (BasicContainer_1) {
                BasicContainer = BasicContainer_1;
            },
            function (Container_1) {
                Container = Container_1;
            },
            function (PersistedContainer_1) {
                PersistedContainer = PersistedContainer_1;
            },
            function (RDFSource_1) {
                RDFSource = RDFSource_1;
            }],
        execute: function() {
            exports_1("AccessPoint", AccessPoint);
            exports_1("BasicContainer", BasicContainer);
            exports_1("Container", Container);
            exports_1("PersistedContainer", PersistedContainer);
            exports_1("RDFSource", RDFSource);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("11", ["3", "a", "12", "13", "14", "10", "15"], function(exports_1) {
    var App, APIDescription, Auth, Documents_1, Errors, LDP, ObjectSchema;
    var Class, instance;
    return {
        setters:[
            function (App_1) {
                App = App_1;
            },
            function (APIDescription_1) {
                APIDescription = APIDescription_1;
            },
            function (Auth_1) {
                Auth = Auth_1;
            },
            function (Documents_1_1) {
                Documents_1 = Documents_1_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (LDP_1) {
                LDP = LDP_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                    this.settings = new Map();
                    this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
                    this.typeObjectSchemaMap = new Map();
                    this.auth = new Auth.Class(this);
                    this.documents = new Documents_1.default(this);
                    this.registerDefaultObjectSchemas();
                }
                Object.defineProperty(Class.prototype, "parentContext", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Class.prototype.getBaseURI = function () {
                    return this.resolve("");
                };
                Class.prototype.resolve = function (relativeURI) {
                    return relativeURI;
                };
                Class.prototype.hasSetting = function (name) {
                    return (this.settings.has(name) ||
                        (this.parentContext && this.parentContext.hasSetting(name)));
                };
                Class.prototype.getSetting = function (name) {
                    if (this.settings.has(name))
                        return this.settings.get(name);
                    if (this.parentContext && this.parentContext.hasSetting(name))
                        return this.parentContext.getSetting(name);
                    return null;
                };
                Class.prototype.setSetting = function (name, value) {
                    this.settings.set(name, value);
                };
                Class.prototype.deleteSetting = function (name) {
                    this.settings.delete(name);
                };
                Class.prototype.hasObjectSchema = function (type) {
                    if (this.typeObjectSchemaMap.has(type))
                        return true;
                    if (!!this.parentContext && this.parentContext.hasObjectSchema(type))
                        return true;
                    return false;
                };
                Class.prototype.getObjectSchema = function (type) {
                    if (type === void 0) { type = null; }
                    if (!!type) {
                        // Type specific schema
                        if (this.typeObjectSchemaMap.has(type))
                            return this.typeObjectSchemaMap.get(type);
                        if (!!this.parentContext && this.parentContext.hasObjectSchema(type))
                            return this.parentContext.getObjectSchema(type);
                        return null;
                    }
                    else {
                        // General schema
                        if (!!this.generalObjectSchema)
                            return this.generalObjectSchema;
                        if (!!this.parentContext)
                            return this.parentContext.getObjectSchema();
                        throw new Errors.IllegalStateError();
                    }
                };
                Class.prototype.extendObjectSchema = function (typeOrObjectSchema, objectSchema) {
                    if (objectSchema === void 0) { objectSchema = null; }
                    var type = objectSchema ? typeOrObjectSchema : null;
                    objectSchema = !!objectSchema ? objectSchema : typeOrObjectSchema;
                    var digestedSchema = ObjectSchema.Digester.digestSchema(objectSchema);
                    if (!type) {
                        this.extendGeneralObjectSchema(digestedSchema);
                    }
                    else {
                        this.extendTypeObjectSchema(digestedSchema, type);
                    }
                };
                Class.prototype.clearObjectSchema = function (type) {
                    if (type === void 0) { type = null; }
                    if (!type) {
                        this.generalObjectSchema = !!this.parentContext ? null : new ObjectSchema.DigestedObjectSchema();
                    }
                    else {
                        this.typeObjectSchemaMap.delete(type);
                    }
                };
                Class.prototype.extendGeneralObjectSchema = function (digestedSchema) {
                    var digestedSchemaToExtend;
                    if (!!this.generalObjectSchema) {
                        digestedSchemaToExtend = this.generalObjectSchema;
                    }
                    else if (!!this.parentContext) {
                        digestedSchemaToExtend = this.parentContext.getObjectSchema();
                    }
                    else {
                        digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
                    }
                    this.generalObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
                        new ObjectSchema.DigestedObjectSchema(),
                        digestedSchemaToExtend,
                        digestedSchema,
                    ]);
                };
                Class.prototype.extendTypeObjectSchema = function (digestedSchema, type) {
                    var digestedSchemaToExtend;
                    if (this.typeObjectSchemaMap.has(type)) {
                        digestedSchemaToExtend = this.typeObjectSchemaMap.get(type);
                    }
                    else if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) {
                        digestedSchemaToExtend = this.parentContext.getObjectSchema(type);
                    }
                    else {
                        digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
                    }
                    var extendedDigestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
                        new ObjectSchema.DigestedObjectSchema(),
                        digestedSchemaToExtend,
                        digestedSchema,
                    ]);
                    this.typeObjectSchemaMap.set(type, extendedDigestedSchema);
                };
                Class.prototype.registerDefaultObjectSchemas = function () {
                    this.extendObjectSchema(LDP.RDFSource.RDF_CLASS, LDP.RDFSource.SCHEMA);
                    this.extendObjectSchema(LDP.Container.RDF_CLASS, LDP.Container.SCHEMA);
                    this.extendObjectSchema(LDP.BasicContainer.RDF_CLASS, LDP.Container.SCHEMA);
                    this.extendObjectSchema(APIDescription.RDF_CLASS, APIDescription.SCHEMA);
                    this.extendObjectSchema(App.RDF_CLASS, App.SCHEMA);
                    this.extendObjectSchema(Auth.Token.RDF_CLASS, Auth.Token.CONTEXT);
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("instance", instance = new Class());
            exports_1("default",instance);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("8", ["11", "15"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var SDKContext, ObjectSchema;
    var AbstractContext;
    return {
        setters:[
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            }],
        execute: function() {
            AbstractContext = (function (_super) {
                __extends(AbstractContext, _super);
                function AbstractContext(parentContext) {
                    if (parentContext === void 0) { parentContext = null; }
                    _super.call(this);
                    this._parentContext = !!parentContext ? parentContext : SDKContext.instance;
                    this.generalObjectSchema = !!parentContext ? null : new ObjectSchema.DigestedObjectSchema();
                }
                Object.defineProperty(AbstractContext.prototype, "parentContext", {
                    get: function () { return this._parentContext; },
                    enumerable: true,
                    configurable: true
                });
                ;
                return AbstractContext;
            })(SDKContext.Class);
            exports_1("default",AbstractContext);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("16", ["14", "15", "9", "4", "5", "6"], function(exports_1) {
    var Errors, ObjectSchema, NS, Pointer, RDF, Utils;
    var Class;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(literalSerializers) {
                    if (literalSerializers === void 0) { literalSerializers = null; }
                    this._literalSerializers = !!literalSerializers ? literalSerializers : Class.getDefaultSerializers();
                }
                Object.defineProperty(Class.prototype, "literalSerializers", {
                    get: function () { return this._literalSerializers; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Class.getDefaultSerializers = function () {
                    var literalSerializers = new Map();
                    literalSerializers.set(NS.XSD.DataType.date, RDF.Literal.Serializers.XSD.dateSerializer);
                    literalSerializers.set(NS.XSD.DataType.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer);
                    literalSerializers.set(NS.XSD.DataType.time, RDF.Literal.Serializers.XSD.timeSerializer);
                    literalSerializers.set(NS.XSD.DataType.integer, RDF.Literal.Serializers.XSD.integerSerializer);
                    literalSerializers.set(NS.XSD.DataType.int, RDF.Literal.Serializers.XSD.integerSerializer);
                    literalSerializers.set(NS.XSD.DataType.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer);
                    literalSerializers.set(NS.XSD.DataType.float, RDF.Literal.Serializers.XSD.floatSerializer);
                    literalSerializers.set(NS.XSD.DataType.double, RDF.Literal.Serializers.XSD.floatSerializer);
                    literalSerializers.set(NS.XSD.DataType.boolean, RDF.Literal.Serializers.XSD.booleanSerializer);
                    literalSerializers.set(NS.XSD.DataType.string, RDF.Literal.Serializers.XSD.stringSerializer);
                    return literalSerializers;
                };
                Class.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjectsOrDigestedContext, digestedSchemaOrPointerLibrary, pointerLibrary) {
                    if (pointerLibrary === void 0) { pointerLibrary = null; }
                    var targetObjectOrObjects = !pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
                    var digestedSchema = !pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
                    pointerLibrary = !pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;
                    if (!Utils.isArray(expandedObjectOrObjects))
                        return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary);
                    var expandedObjects = expandedObjectOrObjects;
                    var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
                    for (var i = 0, length = expandedObjects.length; i < length; i++) {
                        var expandedObject = expandedObjects[i];
                        var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
                        this.compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary);
                    }
                    return targetObjects;
                };
                Class.prototype.expand = function (compactedObjectOrObjects, digestedSchema, pointerValidator) {
                    if (pointerValidator === void 0) { pointerValidator = null; }
                    if (!Utils.isArray(compactedObjectOrObjects))
                        return this.expandSingle(compactedObjectOrObjects, digestedSchema, pointerValidator);
                };
                Class.prototype.expandSingle = function (compactedObject, digestedSchema, pointerValidator) {
                    var _this = this;
                    var expandedObject = {};
                    expandedObject["@id"] = !!compactedObject["id"] ? compactedObject["id"] : "";
                    if (!!compactedObject["types"])
                        expandedObject["@type"] = compactedObject["types"];
                    Utils.forEachOwnProperty(compactedObject, function (propertyName, value) {
                        if (propertyName === "id")
                            return;
                        if (digestedSchema.properties.has(propertyName)) {
                            var definition = digestedSchema.properties.get(propertyName);
                            var expandedValue = _this.expandProperty(value, definition, pointerValidator);
                            if (!expandedValue)
                                return;
                            expandedObject[definition.uri.toString()] = expandedValue;
                        }
                        else {
                        }
                    });
                    return expandedObject;
                };
                Class.prototype.expandProperty = function (propertyValue, propertyDefinition, pointerValidator) {
                    switch (propertyDefinition.containerType) {
                        case null:
                            // Property is not a list
                            if (propertyDefinition.literal) {
                                return this.expandPropertyLiteral(propertyValue, propertyDefinition.literalType.toString());
                            }
                            else if (propertyDefinition.literal === false) {
                                return this.expandPropertyPointer(propertyValue, pointerValidator);
                            }
                            else {
                                return this.expandPropertyValue(propertyValue, pointerValidator);
                            }
                            break;
                        case ObjectSchema.ContainerType.LIST:
                            if (propertyDefinition.literal) {
                                return this.expandPropertyLiteralList(propertyValue, propertyDefinition.literalType.toString());
                            }
                            else if (propertyDefinition.literal === false) {
                                return this.expandPropertyPointerList(propertyValue, pointerValidator);
                            }
                            else {
                                return this.expandPropertyList(propertyValue, pointerValidator);
                            }
                            break;
                        case ObjectSchema.ContainerType.SET:
                            if (propertyDefinition.literal) {
                                return this.expandPropertyLiterals(propertyValue, propertyDefinition.literalType.toString());
                            }
                            else if (propertyDefinition.literal === false) {
                                return this.expandPropertyPointers(propertyValue, pointerValidator);
                            }
                            else {
                                return this.expandPropertyValues(propertyValue, pointerValidator);
                            }
                            break;
                        case ObjectSchema.ContainerType.LANGUAGE:
                            return this.expandPropertyLanguageMap(propertyValue);
                        default:
                            throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
                    }
                };
                Class.prototype.expandPropertyValue = function (propertyValue, pointerValidator) {
                    if (Utils.isArray(propertyValue)) {
                        return this.expandPropertyValues(propertyValue, pointerValidator);
                    }
                    else {
                        var expandedValue = this.expandValue(propertyValue, pointerValidator);
                        if (!expandedValue)
                            return null;
                        return [expandedValue];
                    }
                };
                Class.prototype.expandPropertyPointer = function (propertyValue, pointerValidator) {
                    var expandedPointer = this.expandPointer(propertyValue, pointerValidator);
                    if (!expandedPointer)
                        return null;
                    return [expandedPointer];
                };
                Class.prototype.expandPropertyLiteral = function (propertyValue, literalType) {
                    // TODO: Language
                    var serializedValue = this.serializeLiteral(propertyValue, literalType);
                    if (serializedValue === null)
                        return null;
                    return [
                        { "@value": serializedValue, "@type": literalType },
                    ];
                };
                Class.prototype.expandPropertyList = function (propertyValues, pointerValidator) {
                    propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
                    var expandedArray = this.expandArray(propertyValues, pointerValidator);
                    if (!expandedArray)
                        return null;
                    return [
                        { "@list": expandedArray },
                    ];
                };
                Class.prototype.expandPropertyPointerList = function (propertyValues, pointerValidator) {
                    var listValues = this.expandPropertyPointers(propertyValues, pointerValidator);
                    return [
                        { "@list": listValues },
                    ];
                };
                Class.prototype.expandPropertyLiteralList = function (propertyValues, literalType) {
                    var listValues = this.expandPropertyLiterals(propertyValues, literalType);
                    return [
                        { "@list": listValues },
                    ];
                };
                Class.prototype.expandPropertyValues = function (propertyValue, pointerValidator) {
                    var expandedArray = this.expandArray(propertyValue, pointerValidator);
                    if (!expandedArray)
                        return null;
                    return expandedArray;
                };
                Class.prototype.expandPropertyPointers = function (propertyValues, pointerValidator) {
                    propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
                    var expandedPointers = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        var expandedPointer = this.expandPointer(propertyValue, pointerValidator);
                        if (!expandedPointer)
                            continue;
                        expandedPointers.push(expandedPointer);
                    }
                    return expandedPointers;
                };
                Class.prototype.expandPropertyLiterals = function (propertyValues, literalType) {
                    propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
                    var listValues = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        var serializedValue = this.serializeLiteral(propertyValue, literalType);
                        if (!serializedValue)
                            continue;
                        listValues.push({ "@value": serializedValue, "@type": literalType });
                    }
                    return listValues;
                };
                Class.prototype.expandPropertyLanguageMap = function (propertyValue) {
                    var _this = this;
                    if (!Utils.isObject(propertyValue)) {
                        // TODO: Warn of data loss
                        return null;
                    }
                    var mapValues = [];
                    Utils.forEachOwnProperty(propertyValue, function (languageTag, value) {
                        // TODO: Validate language tags
                        var serializedValue = _this.literalSerializers.get(NS.XSD.DataType.string).serialize(value);
                        mapValues.push({ "@value": serializedValue, "@type": NS.XSD.DataType.string, "@language": languageTag });
                    });
                    return mapValues;
                };
                Class.prototype.serializeLiteral = function (propertyValue, literalType) {
                    if (Pointer.Factory.is(propertyValue)) {
                        // TODO: Warn of data loss
                        return null;
                    }
                    if (!this.literalSerializers.has(literalType)) {
                        // TODO: Warn of data loss
                        return null;
                    }
                    try {
                        return this.literalSerializers.get(literalType).serialize(propertyValue);
                    }
                    catch (error) {
                        // TODO: Warn of data loss
                        return null;
                    }
                };
                Class.prototype.expandPointer = function (propertyValue, pointerValidator) {
                    if (!Pointer.Factory.is(propertyValue)) {
                        // TODO: Warn of data loss
                        return null;
                    }
                    if (!!pointerValidator && !pointerValidator.inScope(propertyValue)) {
                        // TODO: Warn of data loss
                        return null;
                    }
                    return { "@id": propertyValue.id };
                };
                Class.prototype.expandArray = function (propertyValue, pointerValidator) {
                    var listValues = [];
                    for (var _i = 0; _i < propertyValue.length; _i++) {
                        var listValue = propertyValue[_i];
                        var expandedValue = this.expandValue(listValue, pointerValidator);
                        if (!expandedValue)
                            continue;
                        listValues.push(expandedValue);
                    }
                    if (!listValues.length)
                        return null;
                    return listValues;
                };
                Class.prototype.expandValue = function (propertyValue, pointerValidator) {
                    if (Utils.isArray(propertyValue)) {
                        // TODO: Lists of lists are not currently supported by the spec
                        return null;
                    }
                    else if (Pointer.Factory.is(propertyValue)) {
                        return this.expandPointer(propertyValue, pointerValidator);
                    }
                    else {
                        return this.expandLiteral(propertyValue);
                    }
                };
                Class.prototype.expandLiteral = function (literalValue) {
                    var serializedValue;
                    var literalType;
                    switch (true) {
                        case Utils.isFunction(literalValue):
                            return null;
                        case Utils.isDate(literalValue):
                            literalType = NS.XSD.DataType.dateTime;
                            break;
                        case Utils.isNumber(literalValue):
                            literalType = NS.XSD.DataType.float;
                            break;
                        case Utils.isBoolean(literalValue):
                            literalType = NS.XSD.DataType.boolean;
                            break;
                        case Utils.isString(literalValue):
                            literalType = NS.XSD.DataType.string;
                            break;
                        default:
                            // TODO: Warn of data loss
                            return null;
                    }
                    serializedValue = this.literalSerializers.get(literalType).serialize(literalValue);
                    return { "@value": serializedValue, "@type": literalType };
                };
                Class.prototype.compactSingle = function (expandedObject, targetObject, digestedSchema, pointerLibrary) {
                    var _this = this;
                    var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
                    if (!expandedObject["@id"])
                        throw new Errors.IllegalArgumentError("The expandedObject doesn't have an @id defined.");
                    targetObject["id"] = expandedObject["@id"];
                    targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
                    Utils.forEachOwnProperty(expandedObject, function (propertyURI, value) {
                        if (propertyURI === "@id")
                            return;
                        if (propertyURI === "@type")
                            return;
                        if (propertyURINameMap.has(propertyURI)) {
                            var propertyName = propertyURINameMap.get(propertyURI);
                            _this.assignProperty(targetObject, expandedObject, propertyName, digestedSchema, pointerLibrary);
                        }
                        else {
                            _this.assignURIProperty(targetObject, expandedObject, propertyURI, pointerLibrary);
                        }
                    });
                    return targetObject;
                };
                Class.prototype.assignProperty = function (compactedObject, expandedObject, propertyName, digestedSchema, pointerLibrary) {
                    var propertyDefinition = digestedSchema.properties.get(propertyName);
                    compactedObject[propertyName] = this.getPropertyValue(expandedObject, propertyDefinition, pointerLibrary);
                };
                Class.prototype.assignURIProperty = function (compactedObject, expandedObject, propertyURI, pointerLibrary) {
                    var guessedDefinition = new ObjectSchema.DigestedPropertyDefinition();
                    guessedDefinition.uri = new RDF.URI.Class(propertyURI);
                    guessedDefinition.containerType = this.getPropertyContainerType(expandedObject[propertyURI]);
                    compactedObject[propertyURI] = this.getPropertyValue(expandedObject, guessedDefinition, pointerLibrary);
                };
                Class.prototype.getPropertyContainerType = function (propertyValues) {
                    if (propertyValues.length === 1) {
                        if (RDF.List.Factory.is(propertyValues[0]))
                            return ObjectSchema.ContainerType.LIST;
                    }
                    else {
                        return ObjectSchema.ContainerType.SET;
                    }
                    return null;
                };
                Class.prototype.getPropertyValue = function (expandedObject, propertyDefinition, pointerLibrary) {
                    var propertyURI = propertyDefinition.uri.toString();
                    switch (propertyDefinition.containerType) {
                        case null:
                            // Property is not a list
                            if (propertyDefinition.literal) {
                                return this.getPropertyLiteral(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                            }
                            else if (propertyDefinition.literal === false) {
                                return this.getPropertyPointer(expandedObject, propertyURI, pointerLibrary);
                            }
                            else {
                                return this.getProperty(expandedObject, propertyURI, pointerLibrary);
                            }
                            break;
                        case ObjectSchema.ContainerType.LIST:
                            if (propertyDefinition.literal) {
                                return this.getPropertyLiteralList(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                            }
                            else if (propertyDefinition.literal === false) {
                                return this.getPropertyPointerList(expandedObject, propertyURI, pointerLibrary);
                            }
                            else {
                                return this.getPropertyList(expandedObject, propertyURI, pointerLibrary);
                            }
                            break;
                        case ObjectSchema.ContainerType.SET:
                            if (propertyDefinition.literal) {
                                return this.getPropertyLiterals(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                            }
                            else if (propertyDefinition.literal === false) {
                                return this.getPropertyPointers(expandedObject, propertyURI, pointerLibrary);
                            }
                            else {
                                return this.getProperties(expandedObject, propertyURI, pointerLibrary);
                            }
                            break;
                        case ObjectSchema.ContainerType.LANGUAGE:
                            return this.getPropertyLanguageMap(expandedObject, propertyURI);
                        default:
                            throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
                    }
                };
                Class.prototype.getProperty = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyValue = propertyValues[0];
                    return this.parseValue(propertyValue, pointerLibrary);
                };
                Class.prototype.getPropertyPointer = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDF.Node.Factory.is(propertyValue))
                            continue;
                        return pointerLibrary.getPointer(propertyValue["@id"]);
                    }
                    return null;
                };
                Class.prototype.getPropertyLiteral = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDF.Literal.Factory.is(propertyValue))
                            continue;
                        if (!RDF.Literal.Factory.hasType(propertyValue, literalType))
                            continue;
                        return RDF.Literal.Factory.parse(propertyValue);
                    }
                    return null;
                };
                Class.prototype.getPropertyList = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyList = this.getList(propertyValues);
                    if (!propertyList)
                        return null;
                    var listValues = [];
                    for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
                        var listValue = _a[_i];
                        listValues.push(this.parseValue(listValue, pointerLibrary));
                    }
                    return listValues;
                };
                Class.prototype.getPropertyPointerList = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyList = this.getList(propertyValues);
                    if (!propertyList)
                        return null;
                    var listPointers = [];
                    for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
                        var listValue = _a[_i];
                        if (!RDF.Node.Factory.is(listValue))
                            continue;
                        var pointer = pointerLibrary.getPointer(listValue["@id"]);
                        listPointers.push(pointer);
                    }
                    return listPointers;
                };
                Class.prototype.getPropertyLiteralList = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyList = this.getList(propertyValues);
                    if (!propertyList)
                        return null;
                    var listLiterals = [];
                    for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
                        var listValue = _a[_i];
                        if (!RDF.Literal.Factory.is(listValue))
                            continue;
                        if (!RDF.Literal.Factory.hasType(listValue, literalType))
                            continue;
                        listLiterals.push(RDF.Literal.Factory.parse(listValue));
                    }
                    return listLiterals;
                };
                Class.prototype.getProperties = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var properties = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        properties.push(this.parseValue(propertyValue, pointerLibrary));
                    }
                    return properties;
                };
                Class.prototype.getPropertyPointers = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyPointers = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDF.Node.Factory.is(propertyValue))
                            continue;
                        var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
                        propertyPointers.push(pointer);
                    }
                    return propertyPointers;
                };
                Class.prototype.getPropertyLiterals = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyLiterals = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDF.Literal.Factory.is(propertyValue))
                            continue;
                        if (!RDF.Literal.Factory.hasType(propertyValue, literalType))
                            continue;
                        propertyLiterals.push(RDF.Literal.Factory.parse(propertyValue));
                    }
                    return propertyLiterals;
                };
                Class.prototype.getPropertyLanguageMap = function (expandedObject, propertyURI) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyLanguageMap = {};
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDF.Literal.Factory.is(propertyValue))
                            continue;
                        if (!RDF.Literal.Factory.hasType(propertyValue, NS.XSD.DataType.string))
                            continue;
                        var languageTag = propertyValue["@language"];
                        if (!languageTag)
                            continue;
                        propertyLanguageMap[languageTag] = RDF.Literal.Factory.parse(propertyValue);
                    }
                    return propertyLanguageMap;
                };
                Class.prototype.getList = function (propertyValues) {
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDF.List.Factory.is(propertyValue))
                            continue;
                        return propertyValue;
                    }
                    return null;
                };
                Class.prototype.getPropertyURINameMap = function (digestedSchema) {
                    var map = new Map();
                    digestedSchema.properties.forEach(function (definition, propertyName) {
                        map.set(definition.uri.toString(), propertyName);
                    });
                    return map;
                };
                Class.prototype.parseValue = function (propertyValue, pointerLibrary) {
                    if (RDF.Literal.Factory.is(propertyValue)) {
                        return RDF.Literal.Factory.parse(propertyValue);
                    }
                    else if (RDF.Node.Factory.is(propertyValue)) {
                        return pointerLibrary.getPointer(propertyValue["@id"]);
                    }
                    else if (RDF.List.Factory.is(propertyValue)) {
                        var parsedValue = [];
                        var listValues = propertyValue["@list"];
                        for (var _i = 0; _i < listValues.length; _i++) {
                            var listValue = listValues[_i];
                            parsedValue.push(this.parseValue(listValue, pointerLibrary));
                        }
                        return parsedValue;
                    }
                    else {
                    }
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("17", ["18", "6"], function(exports_1) {
    var Resource, Utils;
    var Factory, factory, Util;
    return {
        setters:[
            function (Resource_1) {
                Resource = Resource_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "document"));
                };
                Factory.prototype.create = function (idOrDocument, document) {
                    if (document === void 0) { document = null; }
                    return this.createFrom({}, idOrDocument, document);
                };
                Factory.prototype.createFrom = function (object, idOrDocument, document) {
                    if (document === void 0) { document = null; }
                    var id = !!document ? idOrDocument : Util.generateID();
                    var resource = Resource.Factory.createFrom(object, id);
                    if (this.hasClassProperties(resource))
                        return resource;
                    Object.defineProperties(resource, {
                        "document": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: document,
                        },
                    });
                    return resource;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
            Util = (function () {
                function Util() {
                }
                Util.generateID = function () {
                    return "_:" + Utils.UUID.generate();
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

$__System.register("19", ["17", "5", "6"], function(exports_1) {
    var Fragment, RDF, Utils;
    var Factory, factory;
    return {
        setters:[
            function (Fragment_1) {
                Fragment = Fragment_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "slug"));
                };
                Factory.prototype.create = function (slug, document) {
                    return this.createFrom({}, slug, document);
                };
                Factory.prototype.createFrom = function (object, slug, document) {
                    var uri = document.id + "#" + slug;
                    var fragment = Fragment.factory.createFrom(object, uri, document);
                    if (this.hasClassProperties(fragment))
                        return fragment;
                    Object.defineProperties(fragment, {
                        "slug": {
                            enumerable: false,
                            configurable: true,
                            get: function () {
                                return RDF.URI.Util.getFragment(fragment.id);
                            },
                            set: function (value) {
                                this.id = this.document.id + "#" + value;
                            },
                        },
                    });
                    return fragment;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

$__System.register("18", ["4", "6"], function(exports_1) {
    var Pointer, Utils;
    var Factory;
    function hasType(type) {
        return this.types.indexOf(type) !== -1;
    }
    return {
        setters:[
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "types"));
                };
                Factory.create = function (id, types) {
                    if (id === void 0) { id = null; }
                    if (types === void 0) { types = null; }
                    return Factory.createFrom({}, id, types);
                };
                Factory.createFrom = function (object, id, types) {
                    if (id === void 0) { id = null; }
                    if (types === void 0) { types = null; }
                    id = !!id ? id : "";
                    types = !!types ? types : [];
                    var resource = Factory.decorate(object);
                    resource.id = id;
                    resource.types = types;
                    return resource;
                };
                Factory.decorate = function (object) {
                    Pointer.Factory.decorate(object);
                    if (Factory.hasClassProperties(object))
                        return object;
                    Object.defineProperties(object, {
                        "types": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: [],
                        },
                    });
                    return object;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("1a", ["14", "17", "16", "19", "15", "4", "5", "18", "6"], function(exports_1) {
    var Errors, Fragment, JSONLDConverter_1, NamedFragment, ObjectSchema, Pointer, RDF, Resource, Utils;
    var Factory, factory;
    function hasPointer(id) {
        var document = this;
        if (!document.inScope(id))
            return false;
        return !!document.getFragment(id);
    }
    function getPointer(id) {
        var document = this;
        if (!document.inScope(id))
            return null;
        if (id === document.id)
            return document;
        var fragment = document.getFragment(id);
        fragment = !fragment ? document.createFragment(id) : fragment;
        return fragment;
    }
    function inScope(idOrPointer) {
        var document = this;
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (id === document.id)
            return true;
        if (RDF.URI.Util.isBNodeID(id))
            return true;
        if (RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isFragmentOf(id, document.id))
            return true;
        if (!RDF.URI.Util.isAbsolute(document.id) && !RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isFragmentOf(id, document.id))
            return true;
        return false;
    }
    function hasFragment(id) {
        var document = this;
        if (!document.inScope(id))
            return false;
        return !!document._fragmentsIndex.has(id);
    }
    function getFragment(id) {
        var document = this;
        if (!RDF.URI.Util.isBNodeID(id))
            return document.getNamedFragment(id);
        return document._fragmentsIndex.get(id);
    }
    function getNamedFragment(id) {
        var document = this;
        if (RDF.URI.Util.isBNodeID(id))
            throw new Errors.IllegalArgumentError("Named fragments can't have a id that starts with '_:'.");
        if (RDF.URI.Util.isAbsolute(id)) {
            if (!RDF.URI.Util.isFragmentOf(id, document.id))
                throw new Errors.IllegalArgumentError("The id is out of scope.");
            id = RDF.URI.Util.hasFragment(id) ? RDF.URI.Util.getFragment(id) : id;
        }
        else if (Utils.S.startsWith(id, "#"))
            id = id.substring(1);
        return document._fragmentsIndex.get(id);
    }
    function getFragments() {
        var document = this;
        return Utils.A.from(document._fragmentsIndex.values());
    }
    function createFragment(slug) {
        var document = this;
        var id;
        if (slug) {
            if (!RDF.URI.Util.isBNodeID(slug))
                return document.createNamedFragment(slug);
            id = slug;
            if (this._fragmentsIndex.has(id))
                return this.getFragment(id);
        }
        else {
            id = Fragment.Util.generateID();
        }
        var fragment = Fragment.factory.create(id, document);
        document._fragmentsIndex.set(id, fragment);
        return fragment;
    }
    function createNamedFragment(slug) {
        var document = this;
        if (RDF.URI.Util.isBNodeID(slug))
            throw new Errors.IllegalArgumentError("Named fragments can't have a slug that starts with '_:'.");
        if (RDF.URI.Util.isAbsolute(slug)) {
            if (!RDF.URI.Util.isFragmentOf(slug, document.id))
                throw new Errors.IllegalArgumentError("The slug is out of scope.");
            slug = RDF.URI.Util.hasFragment(slug) ? RDF.URI.Util.getFragment(slug) : slug;
        }
        else if (Utils.S.startsWith(slug, "#"))
            slug = slug.substring(1);
        if (document._fragmentsIndex.has(slug))
            throw new Errors.IDAlreadyInUseError("The slug provided is already being used by a fragment.");
        var fragment = NamedFragment.factory.create(slug, document);
        document._fragmentsIndex.set(slug, fragment);
        return fragment;
    }
    function removeFragment(fragmentOrSlug) {
        // TODO: FT
    }
    function toJSON(objectSchemaResolver, jsonldConverter) {
        if (objectSchemaResolver === void 0) { objectSchemaResolver = null; }
        if (jsonldConverter === void 0) { jsonldConverter = null; }
        jsonldConverter = !!jsonldConverter ? jsonldConverter : new JSONLDConverter_1.default();
        var resources = [];
        resources.push(this);
        resources = resources.concat(this.getFragments());
        var expandedResources = [];
        for (var _i = 0; _i < resources.length; _i++) {
            var resource = resources[_i];
            var digestedContext = objectSchemaResolver ? objectSchemaResolver.getSchemaFor(resource) : new ObjectSchema.DigestedObjectSchema();
            expandedResources.push(jsonldConverter.expand(resource, digestedContext, this));
        }
        var graph = {
            "@id": this.id,
            "@graph": expandedResources,
        };
        return JSON.stringify(graph);
    }
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Fragment_1) {
                Fragment = Fragment_1;
            },
            function (JSONLDConverter_1_1) {
                JSONLDConverter_1 = JSONLDConverter_1_1;
            },
            function (NamedFragment_1) {
                NamedFragment = NamedFragment_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Resource_1) {
                Resource = Resource_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (documentResource) {
                    return (Utils.isObject(documentResource) &&
                        Utils.hasPropertyDefined(documentResource, "_fragmentsIndex") &&
                        Utils.hasFunction(documentResource, "hasFragment") &&
                        Utils.hasFunction(documentResource, "getFragment") &&
                        Utils.hasFunction(documentResource, "getNamedFragment") &&
                        Utils.hasFunction(documentResource, "getFragments") &&
                        Utils.hasFunction(documentResource, "createFragment") &&
                        Utils.hasFunction(documentResource, "createNamedFragment") &&
                        Utils.hasFunction(documentResource, "removeFragment") &&
                        Utils.hasFunction(documentResource, "toJSON"));
                };
                Factory.prototype.create = function (uri) {
                    if (uri === void 0) { uri = null; }
                    return this.createFrom({}, uri);
                };
                Factory.prototype.createFrom = function (object, uri) {
                    if (uri === void 0) { uri = null; }
                    if (!!uri && RDF.URI.Util.isBNodeID(uri))
                        throw new Errors.IllegalArgumentError("Documents cannot have a BNodeID as a uri.");
                    var resource = Resource.Factory.createFrom(object, uri);
                    var document = this.decorate(resource);
                    return document;
                };
                Factory.prototype.decorate = function (object) {
                    if (this.hasClassProperties(object))
                        return object;
                    Object.defineProperties(object, {
                        "_fragmentsIndex": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: new Map(),
                        },
                        "hasPointer": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: hasPointer,
                        },
                        "getPointer": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getPointer,
                        },
                        "inScope": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: inScope,
                        },
                        "hasFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: hasFragment,
                        },
                        "getFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getFragment,
                        },
                        "getNamedFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getNamedFragment,
                        },
                        "getFragments": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: getFragments,
                        },
                        "createFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: createFragment,
                        },
                        "createNamedFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: createNamedFragment,
                        },
                        "removeFragment": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: removeFragment,
                        },
                        "toJSON": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: toJSON,
                        },
                    });
                    return object;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
            exports_1("default",Document);
        }
    }
});

$__System.register("1b", ["1a", "6"], function(exports_1) {
    var Document, Utils;
    var Factory;
    function isDirty() {
        // TODO
        return null;
    }
    function refresh() {
        // TODO
        return null;
    }
    function save() {
        var _this = this;
        return this._documents.save(this).then(function (response) {
            return [_this, response];
        });
    }
    function destroy() {
        return this._documents.delete(this);
    }
    function executeRawASKQuery(askQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawASKQuery(this.id, askQuery, requestOptions);
    }
    function executeRawSELECTQuery(selectQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawSELECTQuery(this.id, selectQuery, requestOptions);
    }
    function executeRawCONSTRUCTQuery(constructQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawCONSTRUCTQuery(this.id, constructQuery, requestOptions);
    }
    function executeRawDESCRIBEQuery(describeQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawDESCRIBEQuery(this.id, describeQuery, requestOptions);
    }
    return {
        setters:[
            function (Document_1) {
                Document = Document_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (document) {
                    return (Utils.hasPropertyDefined(document, "_documents") &&
                        Utils.hasPropertyDefined(document, "_etag") &&
                        Utils.hasFunction(document, "refresh") &&
                        Utils.hasFunction(document, "save") &&
                        Utils.hasFunction(document, "destroy") &&
                        Utils.hasFunction(document, "executeRawASKQuery") &&
                        Utils.hasFunction(document, "executeRawSELECTQuery") &&
                        Utils.hasFunction(document, "executeRawDESCRIBEQuery") &&
                        Utils.hasFunction(document, "executeRawCONSTRUCTQuery"));
                };
                Factory.is = function (object) {
                    return (
                    // TODO: Add Document.Class check
                    Factory.hasClassProperties(object));
                };
                Factory.create = function (uri, documents) {
                    var document = Document.factory.create(uri);
                    return Factory.decorate(document, documents);
                };
                Factory.createFrom = function (object, uri, documents) {
                    var document = Document.factory.createFrom(object, uri);
                    return Factory.decorate(document, documents);
                };
                Factory.decorate = function (document, documents) {
                    if (Factory.hasClassProperties(document))
                        return document;
                    var persistedDocument = document;
                    Object.defineProperties(persistedDocument, {
                        "_documents": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: documents,
                        },
                        "_etag": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: null,
                        },
                        "hasPointer": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: (function () {
                                var superFunction = persistedDocument.hasPointer;
                                return function (id) {
                                    if (superFunction.call(this, id))
                                        return true;
                                    return this._documents.hasPointer(id);
                                };
                            })(),
                        },
                        "getPointer": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: (function () {
                                var superFunction = persistedDocument.getPointer;
                                var inScopeFunction = persistedDocument.inScope;
                                return function (id) {
                                    if (inScopeFunction.call(this, id))
                                        return superFunction.call(this, id);
                                    return this._documents.getPointer(id);
                                };
                            })(),
                        },
                        "inScope": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: (function () {
                                var superFunction = persistedDocument.inScope;
                                return function (id) {
                                    if (superFunction.call(this, id))
                                        return true;
                                    return this._documents.inScope(id);
                                };
                            })(),
                        },
                        "refresh": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: refresh,
                        },
                        "save": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: save,
                        },
                        "destroy": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: destroy,
                        },
                        "executeRawASKQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawASKQuery,
                        },
                        "executeRawSELECTQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawSELECTQuery,
                        },
                        "executeRawCONSTRUCTQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawCONSTRUCTQuery,
                        },
                        "executeRawDESCRIBEQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawDESCRIBEQuery,
                        },
                    });
                    /*
            
                    // TODO: Overwrite isDirty to also take into account the fragments state
                    // TODO: Update with the new comparison system
                    persistedDocument.isDirty = (function():() => boolean {
                        let superFunction:() => boolean = persistedDocument.isDirty;
                        return function():boolean {
                            return superFunction.call( this ) || isDirty.call( this );
                        };
                    })();
            
                    */
                    return persistedDocument;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("15", ["14", "5", "6"], function(exports_1) {
    var Errors, RDF, Utils;
    var ContainerType, DigestedObjectSchema, DigestedPropertyDefinition, Digester;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            (function (ContainerType) {
                ContainerType[ContainerType["SET"] = 0] = "SET";
                ContainerType[ContainerType["LIST"] = 1] = "LIST";
                ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
            })(ContainerType || (ContainerType = {}));
            exports_1("ContainerType", ContainerType);
            DigestedObjectSchema = (function () {
                function DigestedObjectSchema() {
                    this.base = "";
                    this.prefixes = new Map();
                    this.properties = new Map();
                    this.prefixedURIs = new Map();
                }
                return DigestedObjectSchema;
            })();
            exports_1("DigestedObjectSchema", DigestedObjectSchema);
            DigestedPropertyDefinition = (function () {
                function DigestedPropertyDefinition() {
                    this.uri = null;
                    this.literal = null;
                    this.literalType = null;
                    this.language = null;
                    this.containerType = null;
                }
                return DigestedPropertyDefinition;
            })();
            exports_1("DigestedPropertyDefinition", DigestedPropertyDefinition);
            Digester = (function () {
                function Digester() {
                }
                Digester.digestSchema = function (schemaOrSchemas) {
                    if (!Utils.isArray(schemaOrSchemas))
                        return Digester.digestSingleSchema(schemaOrSchemas);
                    var digestedSchemas = [];
                    for (var _i = 0, _a = schemaOrSchemas; _i < _a.length; _i++) {
                        var schema = _a[_i];
                        digestedSchemas.push(Digester.digestSingleSchema(schema));
                    }
                    return Digester.combineDigestedObjectSchemas(digestedSchemas);
                };
                Digester.combineDigestedObjectSchemas = function (digestedSchemas) {
                    if (digestedSchemas.length === 0)
                        throw new Errors.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
                    var combinedSchema = digestedSchemas.shift();
                    for (var _i = 0; _i < digestedSchemas.length; _i++) {
                        var digestedSchema = digestedSchemas[_i];
                        Utils.M.extend(combinedSchema.prefixes, digestedSchema.prefixes);
                        Utils.M.extend(combinedSchema.prefixedURIs, digestedSchema.prefixedURIs);
                        Utils.M.extend(combinedSchema.properties, digestedSchema.properties);
                    }
                    Digester.resolvePrefixedURIs(combinedSchema);
                    return combinedSchema;
                };
                Digester.digestSingleSchema = function (schema) {
                    var digestedSchema = new DigestedObjectSchema();
                    for (var propertyName in schema) {
                        if (!schema.hasOwnProperty(propertyName))
                            continue;
                        if (propertyName === "@reverse")
                            continue;
                        if (propertyName === "@index")
                            continue;
                        if (propertyName === "@base")
                            continue;
                        if (propertyName === "@vocab")
                            continue;
                        var propertyValue = schema[propertyName];
                        if (Utils.isString(propertyValue)) {
                            if (RDF.URI.Util.isPrefixed(propertyName))
                                throw new Errors.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                            var uri = new RDF.URI.Class(propertyValue);
                            if (RDF.URI.Util.isPrefixed(uri.stringValue))
                                uri = Digester.resolvePrefixedURI(uri, digestedSchema);
                            digestedSchema.prefixes.set(propertyName, uri);
                        }
                        else if (!!propertyValue && Utils.isObject(propertyValue)) {
                            var schemaDefinition = propertyValue;
                            var digestedDefinition = new DigestedPropertyDefinition();
                            if ("@id" in schemaDefinition) {
                                if (RDF.URI.Util.isPrefixed(propertyName))
                                    throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
                                if (!Utils.isString(schemaDefinition["@id"]))
                                    throw new Errors.IllegalArgumentError("@id needs to point to a string");
                                digestedDefinition.uri = Digester.resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@id"]), digestedSchema);
                            }
                            else if (RDF.URI.Util.isPrefixed(propertyName)) {
                                digestedDefinition.uri = Digester.resolvePrefixedURI(new RDF.URI.Class(propertyName), digestedSchema);
                            }
                            else {
                                // TODO: Handle @vocab or @base case
                                throw new Errors.IllegalArgumentError("Every property definition needs to have a uri defined.");
                            }
                            if ("@type" in schemaDefinition) {
                                if (!Utils.isString(schemaDefinition["@type"]))
                                    throw new Errors.IllegalArgumentError("@type needs to point to a string");
                                if (schemaDefinition["@type"] === "@id") {
                                    digestedDefinition.literal = false;
                                }
                                else {
                                    digestedDefinition.literal = true;
                                    digestedDefinition.literalType = Digester.resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@type"]), digestedSchema);
                                }
                            }
                            if ("@language" in schemaDefinition) {
                                if (!Utils.isString(schemaDefinition["@language"]))
                                    throw new Errors.IllegalArgumentError("@language needs to point to a string");
                                digestedDefinition.language = schemaDefinition["@language"];
                            }
                            if ("@container" in schemaDefinition) {
                                switch (schemaDefinition["@container"]) {
                                    case "@set":
                                        digestedDefinition.containerType = ContainerType.SET;
                                        break;
                                    case "@list":
                                        digestedDefinition.containerType = ContainerType.LIST;
                                        break;
                                    case "@language":
                                        if (digestedDefinition.language !== null)
                                            throw new Errors.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                                        digestedDefinition.containerType = ContainerType.LANGUAGE;
                                        break;
                                    default:
                                        throw new Errors.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
                                }
                            }
                            digestedSchema.properties.set(propertyName, digestedDefinition);
                        }
                        else {
                            throw new Errors.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
                        }
                    }
                    Digester.resolvePrefixedURIs(digestedSchema);
                    return digestedSchema;
                };
                Digester.resolvePrefixedURIs = function (digestedSchema) {
                    digestedSchema.prefixes.forEach(function (prefixValue, prefixName) {
                        if (!digestedSchema.prefixedURIs.has(prefixName))
                            return;
                        var prefixedURIs = digestedSchema.prefixedURIs.get(prefixName);
                        for (var _i = 0; _i < prefixedURIs.length; _i++) {
                            var prefixedURI = prefixedURIs[_i];
                            Digester.resolvePrefixedURI(prefixedURI, digestedSchema);
                        }
                        digestedSchema.prefixedURIs.delete(prefixName);
                    });
                    return digestedSchema;
                };
                Digester.resolvePrefixedURI = function (uri, digestedSchema) {
                    if (!RDF.URI.Util.isPrefixed(uri.stringValue))
                        return uri;
                    var uriParts = uri.stringValue.split(":");
                    var prefix = uriParts[0];
                    var slug = uriParts[1];
                    if (digestedSchema.prefixes.has(prefix)) {
                        uri.stringValue = digestedSchema.prefixes.get(prefix) + slug;
                    }
                    else {
                        if (!digestedSchema.prefixedURIs.has(prefix))
                            digestedSchema.prefixedURIs.set(prefix, []);
                        digestedSchema.prefixedURIs.get(prefix).push(uri);
                    }
                    return uri;
                };
                return Digester;
            })();
            exports_1("Digester", Digester);
        }
    }
});

$__System.register("1c", ["6"], function(exports_1) {
    var Utils;
    var ValueTypes, Factory;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            ValueTypes = (function () {
                function ValueTypes() {
                }
                Object.defineProperty(ValueTypes, "URI", {
                    get: function () { return "uri"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValueTypes, "LITERAL", {
                    get: function () { return "literal"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValueTypes, "BNODE", {
                    get: function () { return "bnode"; },
                    enumerable: true,
                    configurable: true
                });
                return ValueTypes;
            })();
            exports_1("ValueTypes", ValueTypes);
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (value) {
                    return (Utils.hasPropertyDefined(value, "head"));
                };
                Factory.is = function (value) {
                    return (Utils.isObject(value) &&
                        Factory.hasClassProperties(value));
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

/// <reference path="./../../typings/typings.d.ts" />
$__System.register("1d", ["1e"], function(exports_1) {
    var JSONParser_1;
    var Class;
    return {
        setters:[
            function (JSONParser_1_1) {
                JSONParser_1 = JSONParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (input) {
                    var jsonParser = new JSONParser_1.default();
                    return jsonParser.parse(input).then(function (parsedObject) {
                        return parsedObject;
                    });
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

/// <reference path="./../../typings/typings.d.ts" />
$__System.register("1f", ["20", "6", "1d"], function(exports_1) {
    var HTTP, Utils, RawResultsParser_1;
    var Class;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (RawResultsParser_1_1) {
                RawResultsParser_1 = RawResultsParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.executeRawASKQuery = function (url, askQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, askQuery, options, Class.resultsParser);
                };
                Class.executeRawSELECTQuery = function (url, selectQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, selectQuery, options, Class.resultsParser);
                };
                Class.executeRawCONSTRUCTQuery = function (url, constructQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    if (HTTP.Request.Util.getHeader("Accept", options) === undefined)
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, constructQuery, options, Class.stringParser);
                };
                Class.executeRawDESCRIBEQuery = function (url, describeQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    if (HTTP.Request.Util.getHeader("Accept", options) === undefined)
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, describeQuery, options, Class.stringParser);
                };
                Class.defaultOptions = {};
                Class.resultsParser = new RawResultsParser_1.default();
                Class.stringParser = new HTTP.StringParser.Class();
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("21", ["1c", "1d", "1f"], function(exports_1) {
    var RawResults, RawResultsParser, Service_1;
    return {
        setters:[
            function (RawResults_1) {
                RawResults = RawResults_1;
            },
            function (RawResultsParser_1) {
                RawResultsParser = RawResultsParser_1;
            },
            function (Service_1_1) {
                Service_1 = Service_1_1;
            }],
        execute: function() {
            exports_1("RawResults", RawResults);
            exports_1("RawResultsParser", RawResultsParser);
            exports_1("Service", Service_1.default);
        }
    }
});

/// <reference path="../typings/typings.d.ts" />
$__System.register("13", ["22", "14", "20", "5", "6", "16", "1b", "4", "9", "15", "23", "21"], function(exports_1) {
    var jsonld, Errors, HTTP, RDF, Utils, JSONLDConverter, PersistedDocument, Pointer, NS, ObjectSchema, LDP, SPARQL;
    var Documents;
    function parse(input) {
        try {
            return JSON.parse(input);
        }
        catch (error) {
            // TODO: Handle SyntaxError
            throw error;
        }
    }
    function expand(_a, options) {
        var result = _a[0], response = _a[1];
        return new Promise(function (resolve, reject) {
            jsonld.expand(result, options, function (error, expanded) {
                if (error) {
                    // TODO: Handle jsonld.expand error
                    throw error;
                }
                result = expanded;
                resolve([result, response]);
            });
        });
    }
    return {
        setters:[
            function (jsonld_1) {
                jsonld = jsonld_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (JSONLDConverter_1) {
                JSONLDConverter = JSONLDConverter_1;
            },
            function (PersistedDocument_1) {
                PersistedDocument = PersistedDocument_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            },
            function (LDP_1) {
                LDP = LDP_1;
            },
            function (SPARQL_1) {
                SPARQL = SPARQL_1;
            }],
        execute: function() {
            Documents = (function () {
                function Documents(context) {
                    if (context === void 0) { context = null; }
                    this.context = context;
                    this.pointers = new Map();
                    if (!!this.context && !!this.context.parentContext) {
                        var contextJSONLDConverter = this.context.parentContext.documents.jsonldConverter;
                        this._jsonldConverter = new JSONLDConverter.Class(contextJSONLDConverter.literalSerializers);
                    }
                    else {
                        this._jsonldConverter = new JSONLDConverter.Class();
                    }
                }
                Object.defineProperty(Documents.prototype, "jsonldConverter", {
                    get: function () { return this._jsonldConverter; },
                    enumerable: true,
                    configurable: true
                });
                Documents.prototype.inScope = function (idOrPointer) {
                    var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
                    if (RDF.URI.Util.isBNodeID(id))
                        return false;
                    if (!!this.context) {
                        var baseURI = this.context.getBaseURI();
                        if (RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isBaseOf(baseURI, id))
                            return true;
                    }
                    else {
                        if (RDF.URI.Util.isAbsolute(id))
                            return true;
                    }
                    if (!!this.context && !!this.context.parentContext)
                        return this.context.parentContext.documents.inScope(id);
                    return false;
                };
                Documents.prototype.hasPointer = function (id) {
                    id = this.getPointerID(id);
                    if (this.pointers.has(id))
                        return true;
                    if (!!this.context && !!this.context.parentContext)
                        return this.context.parentContext.documents.hasPointer(id);
                    return false;
                };
                Documents.prototype.getPointer = function (id) {
                    var localID = this.getPointerID(id);
                    if (!localID) {
                        if (!!this.context && !!this.context.parentContext)
                            return this.context.parentContext.documents.getPointer(id);
                        throw new Errors.IllegalArgumentError("The pointer id is not supported by this module.");
                    }
                    var pointer;
                    if (!this.pointers.has(localID)) {
                        pointer = this.createPointer(localID);
                        this.pointers.set(localID, pointer);
                    }
                    return this.pointers.get(localID);
                };
                Documents.prototype.get = function (uri, requestOptions) {
                    var _this = this;
                    if (requestOptions === void 0) { requestOptions = {}; }
                    var pointerID = this.getPointerID(uri);
                    if (!!this.context)
                        uri = this.context.resolve(uri);
                    if (this.pointers.has(pointerID)) {
                        var pointer = this.getPointer(uri);
                        if (pointer.isResolved()) {
                            return new Promise(function (resolve, reject) {
                                resolve([pointer, null]);
                            });
                        }
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
                    return HTTP.Request.Service.get(uri, requestOptions).then(function (response) {
                        var parsedObject = parse(response.data);
                        return expand([parsedObject, response]);
                    }).then(function (_a) {
                        var expandedResult = _a[0], response = _a[1];
                        var etag = HTTP.Response.Util.getETag(response);
                        if (etag === null)
                            throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
                        var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
                        var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
                        if (rdfDocument === null)
                            throw new HTTP.Errors.BadResponseError("No document was returned.", response);
                        var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
                        if (documentResources.length > 1)
                            throw new HTTP.Errors.BadResponseError("The RDFDocument contains more than one document resource.", response);
                        if (documentResources.length === 0)
                            throw new HTTP.Errors.BadResponseError("The RDFDocument doesn\'t contain a document resource.", response);
                        var documentResource = documentResources[0];
                        var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
                        var namedFragmentResources = RDF.Document.Util.getFragmentResources(rdfDocument);
                        var documentPointer = _this.getPointer(uri);
                        documentPointer._resolved = true;
                        var document = PersistedDocument.Factory.createFrom(documentPointer, uri, _this);
                        document._etag = etag;
                        var fragments = [];
                        for (var _i = 0; _i < fragmentResources.length; _i++) {
                            var fragmentResource = fragmentResources[_i];
                            fragments.push(document.createFragment(fragmentResource["@id"]));
                        }
                        var namedFragments = [];
                        for (var _b = 0; _b < namedFragmentResources.length; _b++) {
                            var namedFragmentResource = namedFragmentResources[_b];
                            namedFragments.push(document.createNamedFragment(namedFragmentResource["@id"]));
                        }
                        _this.compact(documentResource, document, document);
                        _this.compact(fragmentResources, fragments, document);
                        _this.compact(namedFragmentResources, namedFragments, document);
                        // TODO: Decorate additional behavior (container, app, etc.)
                        return [document, response];
                    });
                };
                Documents.prototype.createChild = function (parentURI, slugOrChildDocument, childDocumentOrRequestOptions, requestOptions) {
                    var _this = this;
                    if (childDocumentOrRequestOptions === void 0) { childDocumentOrRequestOptions = {}; }
                    if (requestOptions === void 0) { requestOptions = {}; }
                    var slug = Utils.isString(slugOrChildDocument) ? slugOrChildDocument : null;
                    var childDocument = !Utils.isString(slugOrChildDocument) ? slugOrChildDocument : childDocumentOrRequestOptions;
                    requestOptions = !Utils.isString(slugOrChildDocument) ? childDocumentOrRequestOptions : requestOptions;
                    if (PersistedDocument.Factory.is(childDocument))
                        return Utils.P.createRejectedPromise(new Errors.IllegalArgumentError("The childDocument provided has been already persisted."));
                    if (childDocument.id) {
                        if (!RDF.URI.Util.isBaseOf(parentURI, childDocument.id))
                            return Utils.P.createRejectedPromise(new Errors.IllegalArgumentError("The childDocument's URI is not relative to the parentURI specified"));
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.Container, requestOptions);
                    if (slug !== null)
                        HTTP.Request.Util.setSlug(slug, requestOptions);
                    var body = childDocument.toJSON(this, this.jsonldConverter);
                    return HTTP.Request.Service.post(parentURI, body, requestOptions).then(function (response) {
                        var locationHeader = response.headers.get("Location");
                        if (locationHeader === null || locationHeader.values.length < 1)
                            throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
                        if (locationHeader.values.length !== 1)
                            throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
                        var locationURI = locationHeader.values[0].toString();
                        var pointer = _this.getPointer(locationURI);
                        return [
                            pointer,
                            response,
                        ];
                    });
                };
                Documents.prototype.getMembers = function (uri, includeNonReadableOrRequestOptions, requestOptions) {
                    var _this = this;
                    if (includeNonReadableOrRequestOptions === void 0) { includeNonReadableOrRequestOptions = null; }
                    if (requestOptions === void 0) { requestOptions = {}; }
                    var includeNonReadable = Utils.isBoolean(includeNonReadableOrRequestOptions) ? includeNonReadableOrRequestOptions : true;
                    requestOptions = Utils.isObject(includeNonReadableOrRequestOptions) && includeNonReadableOrRequestOptions !== null ? includeNonReadableOrRequestOptions : requestOptions;
                    if (!RDF.URI.Util.isAbsolute(uri)) {
                        if (!this.context)
                            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                        uri = this.context.resolve(uri);
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.Container, requestOptions);
                    var containerRetrievalPreferences = {
                        include: [
                            NS.LDP.Class.PreferMinimalContainer,
                            NS.LDP.Class.PreferMembership,
                        ],
                        omit: [
                            NS.LDP.Class.PreferContainment,
                            NS.C.Class.PreferContainmentResources,
                            NS.C.Class.PreferMembershipResources,
                        ],
                    };
                    if (includeNonReadable) {
                        containerRetrievalPreferences.include.push(NS.C.Class.NonReadableMembershipResourceTriples);
                    }
                    else {
                        containerRetrievalPreferences.omit.push(NS.C.Class.NonReadableMembershipResourceTriples);
                    }
                    return HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
                        var rdfDocuments = _a[0], response = _a[1];
                        var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
                        if (rdfDocument === null)
                            throw new HTTP.Errors.BadResponseError("No document was returned.", response);
                        var documentResource = _this.getDocumentResource(rdfDocument, response);
                        var membershipResourceURI = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.membershipResource);
                        var membershipResource;
                        if (documentResource["@id"] === membershipResourceURI) {
                            membershipResource = documentResource;
                        }
                        else if (membershipResourceURI === null) {
                            if (documentResource["@type"].contains(NS.LDP.Class.BasicContainer)) {
                                membershipResource = documentResource;
                            }
                            else {
                                throw new HTTP.Errors.BadResponseError("The document is not an ldp:BasicContainer and it doesn't contain an ldp:membershipResource triple.", response);
                            }
                        }
                        else {
                            var membershipResourceDocument = _this.getRDFDocument(membershipResourceURI, rdfDocuments, response);
                            if (membershipResourceDocument === null)
                                throw new HTTP.Errors.BadResponseError("The membershipResource document was not included in the response.", response);
                            membershipResource = _this.getDocumentResource(membershipResourceDocument, response);
                        }
                        var hasMemberRelation = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.hasMemberRelation);
                        var memberPointers = RDF.Value.Util.getPropertyPointers(membershipResource, hasMemberRelation, _this);
                        return [memberPointers, response];
                    });
                };
                Documents.prototype.save = function (persistedDocument, requestOptions) {
                    // TODO: Check if the document isDirty
                    /*
                    if( ! persistedDocument.isDirty() ) return new Promise<HTTP.Response.Class>( ( resolve:( result:HTTP.Response.Class ) => void ) => {
                        resolve( null );
                    });
                    */
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
                    HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
                    var body = persistedDocument.toJSON(this, this.jsonldConverter);
                    return HTTP.Request.Service.put(persistedDocument.id, body, requestOptions).then(function (response) {
                        return [persistedDocument, response];
                    });
                };
                Documents.prototype.delete = function (persistedDocument, requestOptions) {
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
                    HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
                    return HTTP.Request.Service.delete(persistedDocument.id, persistedDocument.toJSON(), requestOptions);
                };
                Documents.prototype.getSchemaFor = function (object) {
                    if ("@id" in object) {
                        return this.getDigestedObjectSchemaForExpandedObject(object);
                    }
                    else {
                        return this.getDigestedObjectSchemaForDocument(object);
                    }
                };
                Documents.prototype.executeRawASKQuery = function (documentURI, askQuery, requestOptions) {
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (!RDF.URI.Util.isAbsolute(documentURI)) {
                        if (!this.context)
                            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                        documentURI = this.context.resolve(documentURI);
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    return SPARQL.Service.executeRawASKQuery(documentURI, askQuery, requestOptions);
                };
                Documents.prototype.executeRawSELECTQuery = function (documentURI, selectQuery, requestOptions) {
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (!RDF.URI.Util.isAbsolute(documentURI)) {
                        if (!this.context)
                            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                        documentURI = this.context.resolve(documentURI);
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    return SPARQL.Service.executeRawSELECTQuery(documentURI, selectQuery, requestOptions);
                };
                Documents.prototype.executeRawCONSTRUCTQuery = function (documentURI, constructQuery, requestOptions) {
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (!RDF.URI.Util.isAbsolute(documentURI)) {
                        if (!this.context)
                            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                        documentURI = this.context.resolve(documentURI);
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    return SPARQL.Service.executeRawCONSTRUCTQuery(documentURI, constructQuery, requestOptions);
                };
                Documents.prototype.executeRawDESCRIBEQuery = function (documentURI, constructQuery, requestOptions) {
                    if (requestOptions === void 0) { requestOptions = {}; }
                    if (!RDF.URI.Util.isAbsolute(documentURI)) {
                        if (!this.context)
                            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                        documentURI = this.context.resolve(documentURI);
                    }
                    if (this.context && this.context.auth.isAuthenticated())
                        this.context.auth.addAuthentication(requestOptions);
                    return SPARQL.Service.executeRawDESCRIBEQuery(documentURI, constructQuery, requestOptions);
                };
                Documents.prototype.getRDFDocument = function (requestURL, rdfDocuments, response) {
                    rdfDocuments = rdfDocuments.filter(function (rdfDocument) { return rdfDocument["@id"] === requestURL; });
                    if (rdfDocuments.length > 1)
                        throw new HTTP.Errors.BadResponseError("Several documents share the same id.", response);
                    return rdfDocuments.length > 0 ? rdfDocuments[0] : null;
                };
                Documents.prototype.getDocumentResource = function (rdfDocument, response) {
                    var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
                    if (documentResources.length === 0)
                        throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", doesn't contain a document resource.", response);
                    if (documentResources.length > 1)
                        throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", contains more than one document resource.", response);
                    return documentResources[0];
                };
                Documents.prototype.getPointerID = function (uri) {
                    if (RDF.URI.Util.isBNodeID(uri))
                        throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");
                    // TODO: Make named fragments independently resolvable
                    /*
                        if( RDF.URI.Util.hasFragment( uri ) ) throw new Errors.IllegalArgumentError( "Fragment URI's cannot be fetched directly." );
                    */
                    if (!!this.context) {
                        // TODO: Check this, it may be incorrect
                        if (RDF.URI.Util.isRelative(uri)) {
                            var baseURI = this.context.getBaseURI();
                            if (!RDF.URI.Util.isBaseOf(baseURI, uri))
                                return null;
                            return uri.substring(baseURI.length);
                        }
                        else {
                            return uri;
                        }
                    }
                    else {
                        if (RDF.URI.Util.isRelative(uri))
                            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                        return uri;
                    }
                };
                Documents.prototype.createPointer = function (localID) {
                    var _this = this;
                    var id = !!this.context ? this.context.resolve(localID) : localID;
                    var pointer = Pointer.Factory.create(id);
                    Object.defineProperty(pointer, "resolve", {
                        writable: false,
                        enumerable: false,
                        configurable: true,
                        value: function () {
                            return _this.get(id);
                        },
                    });
                    return pointer;
                };
                Documents.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary) {
                    if (!Utils.isArray(expandedObjectOrObjects))
                        return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary);
                    var expandedObjects = expandedObjectOrObjects;
                    var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
                    for (var i = 0, length = expandedObjects.length; i < length; i++) {
                        var expandedObject = expandedObjects[i];
                        var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
                        this.compactSingle(expandedObject, targetObject, pointerLibrary);
                    }
                    return targetObjects;
                };
                Documents.prototype.compactSingle = function (expandedObject, targetObject, pointerLibrary) {
                    var digestedSchema = this.getDigestedObjectSchemaForExpandedObject(expandedObject);
                    return this.jsonldConverter.compact(expandedObject, targetObject, digestedSchema, pointerLibrary);
                };
                Documents.prototype.getDigestedObjectSchemaForExpandedObject = function (expandedObject) {
                    var types = this.getExpandedObjectTypes(expandedObject);
                    return this.getDigestedObjectSchema(types);
                };
                Documents.prototype.getDigestedObjectSchemaForDocument = function (document) {
                    var types = this.getDocumentTypes(document);
                    return this.getDigestedObjectSchema(types);
                };
                Documents.prototype.getDigestedObjectSchema = function (objectTypes) {
                    var digestedSchema;
                    if (!!this.context) {
                        var typesDigestedObjectSchemas = [this.context.getObjectSchema()];
                        for (var _i = 0; _i < objectTypes.length; _i++) {
                            var type = objectTypes[_i];
                            if (this.context.getObjectSchema(type))
                                typesDigestedObjectSchemas.push(this.context.getObjectSchema(type));
                        }
                        if (typesDigestedObjectSchemas.length > 1) {
                            digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas(typesDigestedObjectSchemas);
                        }
                        else {
                            digestedSchema = typesDigestedObjectSchemas[0];
                        }
                    }
                    else {
                        digestedSchema = new ObjectSchema.DigestedObjectSchema();
                    }
                    return digestedSchema;
                };
                Documents.prototype.getExpandedObjectTypes = function (expandedObject) {
                    if (!expandedObject["@type"])
                        return [];
                    return expandedObject["@type"];
                };
                Documents.prototype.getDocumentTypes = function (document) {
                    if (!document.types)
                        return [];
                    return document.types;
                };
                return Documents;
            })();
            exports_1("default",Documents);
        }
    }
});

$__System.register("24", [], function(exports_1) {
    return {
        setters:[],
        execute: function() {
        }
    }
});

$__System.register("25", [], function(exports_1) {
    return {
        setters:[],
        execute: function() {
        }
    }
});

$__System.register("26", [], function(exports_1) {
    var PropertyDescription;
    return {
        setters:[],
        execute: function() {
            PropertyDescription = (function () {
                function PropertyDescription() {
                    this.multi = true;
                    this.literal = null;
                }
                return PropertyDescription;
            })();
            exports_1("default",PropertyDescription);
        }
    }
});

$__System.register("27", ["20", "28", "6", "29", "14"], function(exports_1) {
    var HTTP, RDFNode, Utils, URI, Errors;
    var Factory, Util, Parser;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (RDFNode_1) {
                RDFNode = RDFNode_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (object) {
                    return Utils.hasProperty(object, "@graph")
                        && Utils.isArray(object["@graph"]);
                };
                Factory.create = function (resources, uri) {
                    var document = uri ? RDFNode.Factory.create(uri) : {};
                    document["@graph"] = resources;
                    return document;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.getDocuments = function (value) {
                    if (Utils.isArray(value)) {
                        if (value.length === 0)
                            return value;
                        if (Factory.is(value[0]))
                            return value;
                        if (RDFNode.Factory.is(value[0]))
                            return [Factory.create(value)];
                    }
                    else if (Utils.isObject(value)) {
                        if (Factory.is(value))
                            return [value];
                        if (RDFNode.Factory.is(value))
                            return [Factory.create([value])];
                    }
                    throw new Errors.IllegalArgumentError("The value structure isn't valid.");
                };
                Util.getResources = function (value) {
                    var documents = Util.getDocuments(value);
                    var resources = [];
                    for (var _i = 0; _i < documents.length; _i++) {
                        var document = documents[_i];
                        resources = resources.concat(document["@graph"]);
                    }
                    return resources;
                };
                Util.getDocumentResources = function (document) {
                    var resources = Util.getResources(document);
                    var documentResources = [];
                    for (var i = 0, length = resources.length; i < length; i++) {
                        var resource = resources[i];
                        var uri = resource["@id"];
                        if (!uri)
                            continue;
                        if (!URI.Util.hasFragment(uri) && !URI.Util.isBNodeID(uri))
                            documentResources.push(resource);
                    }
                    return documentResources;
                };
                Util.getFragmentResources = function (document, documentResource) {
                    var resources = Util.getResources(document);
                    var documentURIToMatch = null;
                    if (documentResource) {
                        if (Utils.isString(documentResource)) {
                            documentURIToMatch = documentResource;
                        }
                        else
                            documentURIToMatch = documentResource["@id"];
                    }
                    var fragmentResources = [];
                    for (var i = 0, length = resources.length; i < length; i++) {
                        var resource = resources[i];
                        var uri = resource["@id"];
                        if (!uri)
                            continue;
                        if (!URI.Util.hasFragment(uri))
                            continue;
                        if (!documentURIToMatch) {
                            fragmentResources.push(resource);
                        }
                        else {
                            var documentURI = URI.Util.getDocumentURI(uri);
                            if (documentURI === documentURIToMatch)
                                fragmentResources.push(resource);
                        }
                    }
                    return fragmentResources;
                };
                Util.getBNodeResources = function (document) {
                    var resources = Util.getResources(document);
                    var bnodes = [];
                    for (var i = 0, length = resources.length; i < length; i++) {
                        var resource = resources[i];
                        if (!("@id" in resource) || URI.Util.isBNodeID(resource["@id"]))
                            bnodes.push(resource);
                    }
                    return bnodes;
                };
                return Util;
            })();
            exports_1("Util", Util);
            Parser = (function () {
                function Parser() {
                }
                Parser.prototype.parse = function (input) {
                    var jsonLDParser = new HTTP.JSONLDParser.Class();
                    return jsonLDParser.parse(input).then(function (expandedResult) {
                        return Util.getDocuments(expandedResult);
                    });
                };
                return Parser;
            })();
            exports_1("Parser", Parser);
        }
    }
});

$__System.register("29", ["6"], function(exports_1) {
    var Utils;
    var Class, Util;
    function prefixWithObjectSchema(uri, objectSchema) {
        var prefixEntries = objectSchema.prefixes.entries();
        while (true) {
            var result = prefixEntries.next();
            if (result.done)
                return uri;
            var _a = result.value, prefix = _a[0], prefixURI = _a[1];
            if (!Util.isAbsolute(prefixURI.toString()))
                continue;
            if (!uri.startsWith(prefixURI.toString()))
                continue;
            return Util.prefix(uri, prefix, prefixURI.toString());
        }
    }
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(stringValue) {
                    this.stringValue = stringValue;
                }
                Class.prototype.toString = function () {
                    return this.stringValue;
                };
                return Class;
            })();
            exports_1("Class", Class);
            Util = (function () {
                function Util() {
                }
                Util.hasFragment = function (uri) {
                    return uri.indexOf("#") !== -1;
                };
                Util.hasProtocol = function (uri) {
                    return Utils.S.startsWith(uri, "https://") || Utils.S.startsWith(uri, "http://");
                };
                Util.isAbsolute = function (uri) {
                    return Utils.S.startsWith(uri, "http://")
                        || Utils.S.startsWith(uri, "https://")
                        || Utils.S.startsWith(uri, "://");
                };
                Util.isRelative = function (uri) {
                    return !Util.isAbsolute(uri);
                };
                Util.isBNodeID = function (uri) {
                    return Utils.S.startsWith(uri, "_:");
                };
                Util.isPrefixed = function (uri) {
                    return !Util.isAbsolute(uri) && !Util.isBNodeID(uri) && Utils.S.contains(uri, ":");
                };
                Util.isFragmentOf = function (fragmentURI, uri) {
                    if (!Util.hasFragment(fragmentURI))
                        return false;
                    return Util.getDocumentURI(fragmentURI) === uri;
                };
                Util.isBaseOf = function (baseURI, uri) {
                    if (baseURI === uri)
                        return true;
                    if (baseURI === "")
                        return true;
                    if (uri.startsWith(baseURI)) {
                        if (Utils.S.endsWith(baseURI, "/"))
                            return true;
                        var relativeURI = uri.substring(baseURI.length);
                        if (Utils.S.startsWith(relativeURI, "/") || Utils.S.startsWith(relativeURI, "#"))
                            return true;
                    }
                    return false;
                };
                Util.getRelativeURI = function (absoluteURI, base) {
                    if (!absoluteURI.startsWith(base))
                        return absoluteURI;
                    return absoluteURI.substring(base.length);
                };
                Util.getDocumentURI = function (uri) {
                    var parts = uri.split("#");
                    if (parts.length > 2)
                        throw new Error("IllegalArgument: The URI provided has more than one # sign.");
                    return parts[0];
                };
                Util.getFragment = function (uri) {
                    var parts = uri.split("#");
                    if (parts.length < 2)
                        return null;
                    if (parts.length > 2)
                        throw new Error("IllegalArgument: The URI provided has more than one # sign.");
                    return parts[1];
                };
                Util.resolve = function (parentURI, childURI) {
                    if (Util.isAbsolute(childURI) || Util.isPrefixed(childURI))
                        return childURI;
                    var finalURI = parentURI;
                    if (!Utils.S.endsWith(parentURI, "/"))
                        finalURI += "/";
                    if (Utils.S.startsWith(childURI, "/")) {
                        finalURI = finalURI + childURI.substr(1, childURI.length);
                    }
                    else
                        finalURI += childURI;
                    return finalURI;
                };
                Util.removeProtocol = function (uri) {
                    if (Utils.S.startsWith(uri, "https://"))
                        return uri.substr(5, uri.length);
                    if (Utils.S.startsWith(uri, "http://"))
                        return uri.substr(4, uri.length);
                    return uri;
                };
                Util.prefix = function (uri, prefixOrObjectSchema, prefixURI) {
                    if (prefixURI === void 0) { prefixURI = null; }
                    var objectSchema = !Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
                    var prefix = Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
                    if (objectSchema !== null)
                        return prefixWithObjectSchema(uri, objectSchema);
                    if (Util.isPrefixed(uri) || !uri.startsWith(prefixURI))
                        return uri;
                    return prefix + ":" + uri.substring(prefixURI.length);
                };
                return Util;
            })();
            exports_1("Util", Util);
            exports_1("default",Class);
        }
    }
});

$__System.register("2a", ["6"], function(exports_1) {
    var Utils;
    var Factory;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (value) {
                    return ((!Utils.isNull(value)) &&
                        Utils.isObject(value) &&
                        Utils.hasProperty(value, "@list"));
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

$__System.register("2b", [], function(exports_1) {
    return {
        setters:[],
        execute: function() {
        }
    }
});

$__System.register("2c", ["14", "6"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Errors, Utils;
    var DateSerializer, dateSerializer, DateTimeSerializer, dateTimeSerializer, TimeSerializer, timeSerializer, IntegerSerializer, integerSerializer, UnsignedIntegerSerializer, unsignedIntegerSerializer, FloatSerializer, floatSerializer, BooleanSerializer, booleanSerializer, StringSerializer, stringSerializer;
    function pad(value) {
        var paddedValue = String(value);
        if (paddedValue.length === 1)
            paddedValue = "0" + paddedValue;
        return paddedValue;
    }
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            DateSerializer = (function () {
                function DateSerializer() {
                }
                DateSerializer.prototype.serialize = function (value) {
                    if (!Utils.isDate(value))
                        throw new Errors.IllegalArgumentError("The value is not a Date object.");
                    return value.getUTCFullYear() + "-" + pad((value.getUTCMonth() + 1)) + "-" + pad(value.getUTCDate());
                };
                return DateSerializer;
            })();
            exports_1("DateSerializer", DateSerializer);
            exports_1("dateSerializer", dateSerializer = new DateSerializer());
            DateTimeSerializer = (function () {
                function DateTimeSerializer() {
                }
                DateTimeSerializer.prototype.serialize = function (value) {
                    if (!Utils.isDate(value))
                        throw new Errors.IllegalArgumentError("The value is not a Date object.");
                    return value.toISOString();
                };
                return DateTimeSerializer;
            })();
            exports_1("DateTimeSerializer", DateTimeSerializer);
            exports_1("dateTimeSerializer", dateTimeSerializer = new DateTimeSerializer());
            TimeSerializer = (function () {
                function TimeSerializer() {
                }
                TimeSerializer.prototype.serialize = function (value) {
                    if (!Utils.isDate(value))
                        throw new Errors.IllegalArgumentError("The value is not a Date object.");
                    return pad(value.getUTCHours())
                        + ":" + pad(value.getUTCMinutes())
                        + ":" + pad(value.getUTCSeconds())
                        + "." + String((value.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                        + "Z";
                };
                return TimeSerializer;
            })();
            exports_1("TimeSerializer", TimeSerializer);
            exports_1("timeSerializer", timeSerializer = new TimeSerializer());
            IntegerSerializer = (function () {
                function IntegerSerializer() {
                }
                IntegerSerializer.prototype.serialize = function (value) {
                    if (!Utils.isNumber(value))
                        throw new Errors.IllegalArgumentError("The value is not a number.");
                    // Negative truncate
                    return (~~value).toString();
                };
                return IntegerSerializer;
            })();
            exports_1("IntegerSerializer", IntegerSerializer);
            exports_1("integerSerializer", integerSerializer = new IntegerSerializer());
            UnsignedIntegerSerializer = (function (_super) {
                __extends(UnsignedIntegerSerializer, _super);
                function UnsignedIntegerSerializer() {
                    _super.apply(this, arguments);
                }
                UnsignedIntegerSerializer.prototype.serialize = function (value) {
                    var stringValue = _super.prototype.serialize.call(this, value);
                    stringValue = Utils.S.startsWith(stringValue, "-") ? stringValue.substring(1) : stringValue;
                    return stringValue;
                };
                return UnsignedIntegerSerializer;
            })(IntegerSerializer);
            exports_1("UnsignedIntegerSerializer", UnsignedIntegerSerializer);
            exports_1("unsignedIntegerSerializer", unsignedIntegerSerializer = new UnsignedIntegerSerializer());
            FloatSerializer = (function () {
                function FloatSerializer() {
                }
                FloatSerializer.prototype.serialize = function (value) {
                    if (!Utils.isNumber(value))
                        throw new Errors.IllegalArgumentError("The value is not a number.");
                    if (value === Number.POSITIVE_INFINITY)
                        return "INF";
                    if (value === Number.NEGATIVE_INFINITY)
                        return "-INF";
                    return value.toString();
                };
                return FloatSerializer;
            })();
            exports_1("FloatSerializer", FloatSerializer);
            exports_1("floatSerializer", floatSerializer = new FloatSerializer());
            BooleanSerializer = (function () {
                function BooleanSerializer() {
                }
                BooleanSerializer.prototype.serialize = function (value) {
                    return (!!value).toString();
                };
                return BooleanSerializer;
            })();
            exports_1("BooleanSerializer", BooleanSerializer);
            exports_1("booleanSerializer", booleanSerializer = new BooleanSerializer());
            StringSerializer = (function () {
                function StringSerializer() {
                }
                StringSerializer.prototype.serialize = function (value) {
                    return String(value);
                };
                return StringSerializer;
            })();
            exports_1("StringSerializer", StringSerializer);
            exports_1("stringSerializer", stringSerializer = new StringSerializer());
        }
    }
});

$__System.register("2d", ["2c"], function(exports_1) {
    var XSD;
    return {
        setters:[
            function (XSD_1) {
                XSD = XSD_1;
            }],
        execute: function() {
            exports_1("XSD", XSD);
        }
    }
});

$__System.register("2e", ["6", "2f", "2b", "2d"], function(exports_1) {
    var Utils, XSD, Serializer_1, Serializers;
    var Factory, Util;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (XSD_1) {
                XSD = XSD_1;
            },
            function (Serializer_1_1) {
                Serializer_1 = Serializer_1_1;
            },
            function (Serializers_1) {
                Serializers = Serializers_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.from = function (value) {
                    if (Utils.isNull(value))
                        throw new Error("IllegalArgument: null cannot be converted into a Literal");
                    var type;
                    switch (true) {
                        case Utils.isDate(value):
                            type = XSD.DataType.dateTime;
                            value = value.toISOString();
                            break;
                        case Utils.isNumber(value):
                            if (Utils.isInteger(value)) {
                                type = XSD.DataType.integer;
                            }
                            else
                                type = XSD.DataType.double;
                            break;
                        case Utils.isString(value):
                            type = XSD.DataType.string;
                            break;
                        case Utils.isBoolean(value):
                            type = XSD.DataType.boolean;
                            break;
                        default:
                            // Treat it as an unknown object
                            type = XSD.DataType.object;
                            value = JSON.stringify(value);
                            break;
                    }
                    var literal = { "@value": value };
                    if (type)
                        literal["@type"] = type;
                    return literal;
                };
                Factory.parse = function (literal) {
                    if (!literal)
                        return null;
                    if (!Utils.hasProperty(literal, "@value"))
                        return null;
                    if (!Utils.hasProperty(literal, "@type"))
                        return literal["@value"];
                    var type = literal["@type"];
                    // The DataType isn't supported
                    if (!Utils.hasProperty(XSD.DataType, type))
                        return literal["@value"];
                    var valueString = literal["@value"];
                    var value;
                    switch (type) {
                        // Dates
                        case XSD.DataType.date:
                        case XSD.DataType.dateTime:
                        case XSD.DataType.time:
                            value = new Date(valueString);
                            break;
                        case XSD.DataType.duration:
                            // TODO: Support duration values (create a class or something...)
                            break;
                        case XSD.DataType.gDay:
                        case XSD.DataType.gMonth:
                        case XSD.DataType.gMonthDay:
                        case XSD.DataType.gYear:
                        case XSD.DataType.gYearMonth:
                            // TODO: Decide. Should we return it as a Date?
                            break;
                        // Numbers
                        case XSD.DataType.byte:
                        case XSD.DataType.decimal:
                        case XSD.DataType.int:
                        case XSD.DataType.integer:
                        case XSD.DataType.long:
                        case XSD.DataType.negativeInteger:
                        case XSD.DataType.nonNegativeInteger:
                        case XSD.DataType.nonPositiveInteger:
                        case XSD.DataType.positiveInteger:
                        case XSD.DataType.short:
                        case XSD.DataType.unsignedLong:
                        case XSD.DataType.unsignedInt:
                        case XSD.DataType.unsignedShort:
                        case XSD.DataType.unsignedByte:
                        case XSD.DataType.double:
                        case XSD.DataType.float:
                            value = parseFloat(valueString);
                            break;
                        // Misc
                        case XSD.DataType.boolean:
                            value = Utils.parseBoolean(valueString);
                            break;
                        case XSD.DataType.string:
                            value = valueString;
                            break;
                        case XSD.DataType.object:
                            value = JSON.parse(valueString);
                            break;
                        default:
                            break;
                    }
                    return value;
                };
                Factory.is = function (value) {
                    if (!value)
                        return false;
                    if (!Utils.isObject(value))
                        return false;
                    return Utils.hasProperty(value, "@value");
                };
                Factory.hasType = function (value, type) {
                    if (!value["@type"] && type === XSD.DataType.string)
                        return true;
                    return value["@type"] === type;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.areEqual = function (literal1, literal2) {
                    // TODO: Implement
                    return false;
                };
                return Util;
            })();
            exports_1("Util", Util);
            exports_1("Serializer", Serializer_1.default);
            exports_1("Serializers", Serializers);
        }
    }
});

$__System.register("28", ["6"], function(exports_1) {
    var Utils;
    var Factory, Util;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (value) {
                    return Utils.hasProperty(value, "@id")
                        && Utils.isString(value["@id"]);
                };
                Factory.create = function (uri) {
                    return {
                        "@id": uri,
                    };
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.areEqual = function (node1, node2) {
                    return node1["@id"] === node2["@id"];
                };
                Util.getPropertyURI = function (node, predicate) {
                    if (!(predicate in node))
                        return null;
                    if (!Utils.isArray(node[predicate]))
                        return null;
                    var uri = node[predicate].find(function (value) { return Factory.is(value); });
                    return typeof uri !== "undefined" ? uri["@id"] : null;
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

$__System.register("30", ["2a", "2e", "9", "28"], function(exports_1) {
    var List, Literal, NS, RDFNode;
    var Util;
    return {
        setters:[
            function (List_1) {
                List = List_1;
            },
            function (Literal_1) {
                Literal = Literal_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDFNode_1) {
                RDFNode = RDFNode_1;
            }],
        execute: function() {
            // TODO: Move all getters and setters to RDFNode.Util
            Util = (function () {
                function Util() {
                }
                Util.areEqual = function (value1, value2) {
                    if (Literal.Factory.is(value1) && Literal.Factory.is(value2)) {
                        return Literal.Util.areEqual(value1, value2);
                    }
                    else if (RDFNode.Factory.is(value1) && RDFNode.Factory.is(value2)) {
                        return RDFNode.Util.areEqual(value1, value2);
                    }
                    else
                        return false;
                };
                Util.getProperty = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyValue = propertyValues[0];
                    return Util.parseValue(propertyValue, pointerLibrary);
                };
                Util.getPropertyPointer = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDFNode.Factory.is(propertyValue))
                            continue;
                        return pointerLibrary.getPointer(propertyValue["@id"]);
                    }
                    return null;
                };
                Util.getPropertyLiteral = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!Literal.Factory.is(propertyValue))
                            continue;
                        if (!Literal.Factory.hasType(propertyValue, literalType))
                            continue;
                        return Literal.Factory.parse(propertyValue);
                    }
                    return null;
                };
                Util.getPropertyList = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyList = Util.getList(propertyValues);
                    if (!propertyList)
                        return null;
                    var listValues = [];
                    for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
                        var listValue = _a[_i];
                        listValues.push(Util.parseValue(listValue, pointerLibrary));
                    }
                    return listValues;
                };
                Util.getPropertyPointerList = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyList = Util.getList(propertyValues);
                    if (!propertyList)
                        return null;
                    var listPointers = [];
                    for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
                        var listValue = _a[_i];
                        if (!RDFNode.Factory.is(listValue))
                            continue;
                        var pointer = pointerLibrary.getPointer(listValue["@id"]);
                        listPointers.push(pointer);
                    }
                    return listPointers;
                };
                Util.getPropertyLiteralList = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyList = Util.getList(propertyValues);
                    if (!propertyList)
                        return null;
                    var listLiterals = [];
                    for (var _i = 0, _a = propertyList["@list"]; _i < _a.length; _i++) {
                        var listValue = _a[_i];
                        if (!Literal.Factory.is(listValue))
                            continue;
                        if (!Literal.Factory.hasType(listValue, literalType))
                            continue;
                        listLiterals.push(Literal.Factory.parse(listValue));
                    }
                    return listLiterals;
                };
                Util.getProperties = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var properties = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        properties.push(Util.parseValue(propertyValue, pointerLibrary));
                    }
                    return properties;
                };
                Util.getPropertyPointers = function (expandedObject, propertyURI, pointerLibrary) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyPointers = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDFNode.Factory.is(propertyValue))
                            continue;
                        var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
                        propertyPointers.push(pointer);
                    }
                    return propertyPointers;
                };
                Util.getPropertyURIs = function (expandedObject, propertyURI) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    if (!propertyValues.length)
                        return null;
                    var propertyURIs = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!RDFNode.Factory.is(propertyValue))
                            continue;
                        propertyURIs.push(propertyValue["@id"]);
                    }
                    return propertyURIs;
                };
                Util.getPropertyLiterals = function (expandedObject, propertyURI, literalType) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyLiterals = [];
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!Literal.Factory.is(propertyValue))
                            continue;
                        if (!Literal.Factory.hasType(propertyValue, literalType))
                            continue;
                        propertyLiterals.push(Literal.Factory.parse(propertyValue));
                    }
                    return propertyLiterals;
                };
                Util.getPropertyLanguageMap = function (expandedObject, propertyURI) {
                    var propertyValues = expandedObject[propertyURI];
                    if (!propertyValues)
                        return null;
                    var propertyLanguageMap = {};
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!Literal.Factory.is(propertyValue))
                            continue;
                        if (!Literal.Factory.hasType(propertyValue, NS.XSD.DataType.string))
                            continue;
                        var languageTag = propertyValue["@language"];
                        if (!languageTag)
                            continue;
                        propertyLanguageMap[languageTag] = Literal.Factory.parse(propertyValue);
                    }
                    return propertyLanguageMap;
                };
                Util.getList = function (propertyValues) {
                    for (var _i = 0; _i < propertyValues.length; _i++) {
                        var propertyValue = propertyValues[_i];
                        if (!List.Factory.is(propertyValue))
                            continue;
                        return propertyValue;
                    }
                    return null;
                };
                Util.parseValue = function (propertyValue, pointerLibrary) {
                    if (Literal.Factory.is(propertyValue)) {
                        return Literal.Factory.parse(propertyValue);
                    }
                    else if (RDFNode.Factory.is(propertyValue)) {
                        return pointerLibrary.getPointer(propertyValue["@id"]);
                    }
                    else if (List.Factory.is(propertyValue)) {
                        var parsedValue = [];
                        var listValues = propertyValue["@list"];
                        for (var _i = 0; _i < listValues.length; _i++) {
                            var listValue = listValues[_i];
                            parsedValue.push(this.parseValue(listValue, pointerLibrary));
                        }
                        return parsedValue;
                    }
                    else {
                    }
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

$__System.register("5", ["2e", "26", "27", "2a", "28", "29", "30"], function(exports_1) {
    var Literal, PropertyDescription_1, Document, List, Node, URI, Value;
    return {
        setters:[
            function (Literal_1) {
                Literal = Literal_1;
            },
            function (PropertyDescription_1_1) {
                PropertyDescription_1 = PropertyDescription_1_1;
            },
            function (Document_1) {
                Document = Document_1;
            },
            function (List_1) {
                List = List_1;
            },
            function (Node_1) {
                Node = Node_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (Value_1) {
                Value = Value_1;
            }],
        execute: function() {
            exports_1("Literal", Literal);
            exports_1("PropertyDescription", PropertyDescription_1.default);
            exports_1("Document", Document);
            exports_1("List", List);
            exports_1("Node", Node);
            exports_1("URI", URI);
            exports_1("Value", Value);
        }
    }
});

(function() {
var _removeDefine = $__System.get("@@amd-helpers").createDefine();
(function() {
  var _nodejs = (typeof process !== 'undefined' && process.versions && process.versions.node);
  var _browser = !_nodejs && (typeof window !== 'undefined' || typeof self !== 'undefined');
  if (_browser) {
    if (typeof global === 'undefined') {
      if (typeof window !== 'undefined') {
        global = window;
      } else if (typeof self !== 'undefined') {
        global = self;
      } else if (typeof $ !== 'undefined') {
        global = $;
      }
    }
  }
  var wrapper = function(jsonld) {
    jsonld.compact = function(input, ctx, options, callback) {
      if (arguments.length < 2) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not compact, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (ctx === null) {
        return jsonld.nextTick(function() {
          callback(new JsonLdError('The compaction context must not be null.', 'jsonld.CompactError', {code: 'invalid local context'}));
        });
      }
      if (input === null) {
        return jsonld.nextTick(function() {
          callback(null, null);
        });
      }
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('compactArrays' in options)) {
        options.compactArrays = true;
      }
      if (!('graph' in options)) {
        options.graph = false;
      }
      if (!('skipExpansion' in options)) {
        options.skipExpansion = false;
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      if (!('link' in options)) {
        options.link = false;
      }
      if (options.link) {
        options.skipExpansion = true;
      }
      var expand = function(input, options, callback) {
        jsonld.nextTick(function() {
          if (options.skipExpansion) {
            return callback(null, input);
          }
          jsonld.expand(input, options, callback);
        });
      };
      expand(input, options, function(err, expanded) {
        if (err) {
          return callback(new JsonLdError('Could not expand input before compaction.', 'jsonld.CompactError', {cause: err}));
        }
        var activeCtx = _getInitialContext(options);
        jsonld.processContext(activeCtx, ctx, options, function(err, activeCtx) {
          if (err) {
            return callback(new JsonLdError('Could not process context before compaction.', 'jsonld.CompactError', {cause: err}));
          }
          var compacted;
          try {
            compacted = new Processor().compact(activeCtx, null, expanded, options);
          } catch (ex) {
            return callback(ex);
          }
          cleanup(null, compacted, activeCtx, options);
        });
      });
      function cleanup(err, compacted, activeCtx, options) {
        if (err) {
          return callback(err);
        }
        if (options.compactArrays && !options.graph && _isArray(compacted)) {
          if (compacted.length === 1) {
            compacted = compacted[0];
          } else if (compacted.length === 0) {
            compacted = {};
          }
        } else if (options.graph && _isObject(compacted)) {
          compacted = [compacted];
        }
        if (_isObject(ctx) && '@context' in ctx) {
          ctx = ctx['@context'];
        }
        ctx = _clone(ctx);
        if (!_isArray(ctx)) {
          ctx = [ctx];
        }
        var tmp = ctx;
        ctx = [];
        for (var i = 0; i < tmp.length; ++i) {
          if (!_isObject(tmp[i]) || Object.keys(tmp[i]).length > 0) {
            ctx.push(tmp[i]);
          }
        }
        var hasContext = (ctx.length > 0);
        if (ctx.length === 1) {
          ctx = ctx[0];
        }
        if (_isArray(compacted)) {
          var kwgraph = _compactIri(activeCtx, '@graph');
          var graph = compacted;
          compacted = {};
          if (hasContext) {
            compacted['@context'] = ctx;
          }
          compacted[kwgraph] = graph;
        } else if (_isObject(compacted) && hasContext) {
          var graph = compacted;
          compacted = {'@context': ctx};
          for (var key in graph) {
            compacted[key] = graph[key];
          }
        }
        callback(null, compacted, activeCtx);
      }
    };
    jsonld.expand = function(input, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not expand, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      if (!('keepFreeFloatingNodes' in options)) {
        options.keepFreeFloatingNodes = false;
      }
      jsonld.nextTick(function() {
        if (typeof input === 'string') {
          var done = function(err, remoteDoc) {
            if (err) {
              return callback(err);
            }
            try {
              if (!remoteDoc.document) {
                throw new JsonLdError('No remote document found at the given URL.', 'jsonld.NullRemoteDocument');
              }
              if (typeof remoteDoc.document === 'string') {
                remoteDoc.document = JSON.parse(remoteDoc.document);
              }
            } catch (ex) {
              return callback(new JsonLdError('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                cause: ex,
                remoteDoc: remoteDoc
              }));
            }
            expand(remoteDoc);
          };
          var promise = options.documentLoader(input, done);
          if (promise && 'then' in promise) {
            promise.then(done.bind(null, null), done);
          }
          return;
        }
        expand({
          contextUrl: null,
          documentUrl: null,
          document: input
        });
      });
      function expand(remoteDoc) {
        if (!('base' in options)) {
          options.base = remoteDoc.documentUrl || '';
        }
        var input = {
          document: _clone(remoteDoc.document),
          remoteContext: {'@context': remoteDoc.contextUrl}
        };
        if ('expandContext' in options) {
          var expandContext = _clone(options.expandContext);
          if (typeof expandContext === 'object' && '@context' in expandContext) {
            input.expandContext = expandContext;
          } else {
            input.expandContext = {'@context': expandContext};
          }
        }
        _retrieveContextUrls(input, options, function(err, input) {
          if (err) {
            return callback(err);
          }
          var expanded;
          try {
            var processor = new Processor();
            var activeCtx = _getInitialContext(options);
            var document = input.document;
            var remoteContext = input.remoteContext['@context'];
            if (input.expandContext) {
              activeCtx = processor.processContext(activeCtx, input.expandContext['@context'], options);
            }
            if (remoteContext) {
              activeCtx = processor.processContext(activeCtx, remoteContext, options);
            }
            expanded = processor.expand(activeCtx, null, document, options, false);
            if (_isObject(expanded) && ('@graph' in expanded) && Object.keys(expanded).length === 1) {
              expanded = expanded['@graph'];
            } else if (expanded === null) {
              expanded = [];
            }
            if (!_isArray(expanded)) {
              expanded = [expanded];
            }
          } catch (ex) {
            return callback(ex);
          }
          callback(null, expanded);
        });
      }
    };
    jsonld.flatten = function(input, ctx, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not flatten, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (typeof ctx === 'function') {
        callback = ctx;
        ctx = null;
        options = {};
      }
      options = options || {};
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      jsonld.expand(input, options, function(err, _input) {
        if (err) {
          return callback(new JsonLdError('Could not expand input before flattening.', 'jsonld.FlattenError', {cause: err}));
        }
        var flattened;
        try {
          flattened = new Processor().flatten(_input);
        } catch (ex) {
          return callback(ex);
        }
        if (ctx === null) {
          return callback(null, flattened);
        }
        options.graph = true;
        options.skipExpansion = true;
        jsonld.compact(flattened, ctx, options, function(err, compacted) {
          if (err) {
            return callback(new JsonLdError('Could not compact flattened output.', 'jsonld.FlattenError', {cause: err}));
          }
          callback(null, compacted);
        });
      });
    };
    jsonld.frame = function(input, frame, options, callback) {
      if (arguments.length < 2) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not frame, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      if (!('embed' in options)) {
        options.embed = '@last';
      }
      options.explicit = options.explicit || false;
      if (!('requireAll' in options)) {
        options.requireAll = true;
      }
      options.omitDefault = options.omitDefault || false;
      jsonld.nextTick(function() {
        if (typeof frame === 'string') {
          var done = function(err, remoteDoc) {
            if (err) {
              return callback(err);
            }
            try {
              if (!remoteDoc.document) {
                throw new JsonLdError('No remote document found at the given URL.', 'jsonld.NullRemoteDocument');
              }
              if (typeof remoteDoc.document === 'string') {
                remoteDoc.document = JSON.parse(remoteDoc.document);
              }
            } catch (ex) {
              return callback(new JsonLdError('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                cause: ex,
                remoteDoc: remoteDoc
              }));
            }
            doFrame(remoteDoc);
          };
          var promise = options.documentLoader(frame, done);
          if (promise && 'then' in promise) {
            promise.then(done.bind(null, null), done);
          }
          return;
        }
        doFrame({
          contextUrl: null,
          documentUrl: null,
          document: frame
        });
      });
      function doFrame(remoteFrame) {
        var frame = remoteFrame.document;
        var ctx;
        if (frame) {
          ctx = frame['@context'];
          if (remoteFrame.contextUrl) {
            if (!ctx) {
              ctx = remoteFrame.contextUrl;
            } else if (_isArray(ctx)) {
              ctx.push(remoteFrame.contextUrl);
            } else {
              ctx = [ctx, remoteFrame.contextUrl];
            }
            frame['@context'] = ctx;
          } else {
            ctx = ctx || {};
          }
        } else {
          ctx = {};
        }
        jsonld.expand(input, options, function(err, expanded) {
          if (err) {
            return callback(new JsonLdError('Could not expand input before framing.', 'jsonld.FrameError', {cause: err}));
          }
          var opts = _clone(options);
          opts.isFrame = true;
          opts.keepFreeFloatingNodes = true;
          jsonld.expand(frame, opts, function(err, expandedFrame) {
            if (err) {
              return callback(new JsonLdError('Could not expand frame before framing.', 'jsonld.FrameError', {cause: err}));
            }
            var framed;
            try {
              framed = new Processor().frame(expanded, expandedFrame, opts);
            } catch (ex) {
              return callback(ex);
            }
            opts.graph = true;
            opts.skipExpansion = true;
            opts.link = {};
            jsonld.compact(framed, ctx, opts, function(err, compacted, ctx) {
              if (err) {
                return callback(new JsonLdError('Could not compact framed output.', 'jsonld.FrameError', {cause: err}));
              }
              var graph = _compactIri(ctx, '@graph');
              opts.link = {};
              compacted[graph] = _removePreserve(ctx, compacted[graph], opts);
              callback(null, compacted);
            });
          });
        });
      }
    };
    jsonld.link = function(input, ctx, options, callback) {
      var frame = {};
      if (ctx) {
        frame['@context'] = ctx;
      }
      frame['@embed'] = '@link';
      jsonld.frame(input, frame, options, callback);
    };
    jsonld.objectify = function(input, ctx, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      jsonld.expand(input, options, function(err, _input) {
        if (err) {
          return callback(new JsonLdError('Could not expand input before linking.', 'jsonld.LinkError', {cause: err}));
        }
        var flattened;
        try {
          flattened = new Processor().flatten(_input);
        } catch (ex) {
          return callback(ex);
        }
        options.graph = true;
        options.skipExpansion = true;
        jsonld.compact(flattened, ctx, options, function(err, compacted, ctx) {
          if (err) {
            return callback(new JsonLdError('Could not compact flattened output before linking.', 'jsonld.LinkError', {cause: err}));
          }
          var graph = _compactIri(ctx, '@graph');
          var top = compacted[graph][0];
          var recurse = function(subject) {
            if (!_isObject(subject) && !_isArray(subject)) {
              return;
            }
            if (_isObject(subject)) {
              if (recurse.visited[subject['@id']]) {
                return;
              }
              recurse.visited[subject['@id']] = true;
            }
            for (var k in subject) {
              var obj = subject[k];
              var isid = (jsonld.getContextValue(ctx, k, '@type') === '@id');
              if (!_isArray(obj) && !_isObject(obj) && !isid) {
                continue;
              }
              if (_isString(obj) && isid) {
                subject[k] = obj = top[obj];
                recurse(obj);
              } else if (_isArray(obj)) {
                for (var i = 0; i < obj.length; ++i) {
                  if (_isString(obj[i]) && isid) {
                    obj[i] = top[obj[i]];
                  } else if (_isObject(obj[i]) && '@id' in obj[i]) {
                    obj[i] = top[obj[i]['@id']];
                  }
                  recurse(obj[i]);
                }
              } else if (_isObject(obj)) {
                var sid = obj['@id'];
                subject[k] = obj = top[sid];
                recurse(obj);
              }
            }
          };
          recurse.visited = {};
          recurse(top);
          compacted.of_type = {};
          for (var s in top) {
            if (!('@type' in top[s])) {
              continue;
            }
            var types = top[s]['@type'];
            if (!_isArray(types)) {
              types = [types];
            }
            for (var t = 0; t < types.length; ++t) {
              if (!(types[t] in compacted.of_type)) {
                compacted.of_type[types[t]] = [];
              }
              compacted.of_type[types[t]].push(top[s]);
            }
          }
          callback(null, compacted);
        });
      });
    };
    jsonld.normalize = function(input, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not normalize, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('algorithm' in options)) {
        options.algorithm = 'URGNA2012';
      }
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      if ('inputFormat' in options) {
        if (options.inputFormat !== 'application/nquads') {
          return callback(new JsonLdError('Unknown normalization input format.', 'jsonld.NormalizeError'));
        }
        var parsedInput = _parseNQuads(input);
        new Processor().normalize(parsedInput, options, callback);
      } else {
        var opts = _clone(options);
        delete opts.format;
        opts.produceGeneralizedRdf = false;
        jsonld.toRDF(input, opts, function(err, dataset) {
          if (err) {
            return callback(new JsonLdError('Could not convert input to RDF dataset before normalization.', 'jsonld.NormalizeError', {cause: err}));
          }
          new Processor().normalize(dataset, options, callback);
        });
      }
    };
    jsonld.fromRDF = function(dataset, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not convert from RDF, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('useRdfType' in options)) {
        options.useRdfType = false;
      }
      if (!('useNativeTypes' in options)) {
        options.useNativeTypes = false;
      }
      if (!('format' in options) && _isString(dataset)) {
        if (!('format' in options)) {
          options.format = 'application/nquads';
        }
      }
      jsonld.nextTick(function() {
        var rdfParser;
        if (options.format) {
          rdfParser = options.rdfParser || _rdfParsers[options.format];
          if (!rdfParser) {
            return callback(new JsonLdError('Unknown input format.', 'jsonld.UnknownFormat', {format: options.format}));
          }
        } else {
          rdfParser = function() {
            return dataset;
          };
        }
        var callbackCalled = false;
        try {
          dataset = rdfParser(dataset, function(err, dataset) {
            callbackCalled = true;
            if (err) {
              return callback(err);
            }
            fromRDF(dataset, options, callback);
          });
        } catch (e) {
          if (!callbackCalled) {
            return callback(e);
          }
          throw e;
        }
        if (dataset) {
          if ('then' in dataset) {
            return dataset.then(function(dataset) {
              fromRDF(dataset, options, callback);
            }, callback);
          }
          fromRDF(dataset, options, callback);
        }
        function fromRDF(dataset, options, callback) {
          new Processor().fromRDF(dataset, options, callback);
        }
      });
    };
    jsonld.toRDF = function(input, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not convert to RDF, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      jsonld.expand(input, options, function(err, expanded) {
        if (err) {
          return callback(new JsonLdError('Could not expand input before serialization to RDF.', 'jsonld.RdfError', {cause: err}));
        }
        var dataset;
        try {
          dataset = Processor.prototype.toRDF(expanded, options);
          if (options.format) {
            if (options.format === 'application/nquads') {
              return callback(null, _toNQuads(dataset));
            }
            throw new JsonLdError('Unknown output format.', 'jsonld.UnknownFormat', {format: options.format});
          }
        } catch (ex) {
          return callback(ex);
        }
        callback(null, dataset);
      });
    };
    jsonld.createNodeMap = function(input, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not create node map, too few arguments.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      options = options || {};
      if (!('base' in options)) {
        options.base = (typeof input === 'string') ? input : '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      jsonld.expand(input, options, function(err, _input) {
        if (err) {
          return callback(new JsonLdError('Could not expand input before creating node map.', 'jsonld.CreateNodeMapError', {cause: err}));
        }
        var nodeMap;
        try {
          nodeMap = new Processor().createNodeMap(_input, options);
        } catch (ex) {
          return callback(ex);
        }
        callback(null, nodeMap);
      });
    };
    jsonld.merge = function(docs, ctx, options, callback) {
      if (arguments.length < 1) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not merge, too few arguments.'));
        });
      }
      if (!_isArray(docs)) {
        return jsonld.nextTick(function() {
          callback(new TypeError('Could not merge, "docs" must be an array.'));
        });
      }
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (typeof ctx === 'function') {
        callback = ctx;
        ctx = null;
        options = {};
      }
      options = options || {};
      var expanded = [];
      var error = null;
      var count = docs.length;
      for (var i = 0; i < docs.length; ++i) {
        var opts = {};
        for (var key in options) {
          opts[key] = options[key];
        }
        jsonld.expand(docs[i], opts, expandComplete);
      }
      function expandComplete(err, _input) {
        if (error) {
          return;
        }
        if (err) {
          error = err;
          return callback(new JsonLdError('Could not expand input before flattening.', 'jsonld.FlattenError', {cause: err}));
        }
        expanded.push(_input);
        if (--count === 0) {
          merge(expanded);
        }
      }
      function merge(expanded) {
        var mergeNodes = true;
        if ('mergeNodes' in options) {
          mergeNodes = options.mergeNodes;
        }
        var issuer = options.namer || options.issuer || new IdentifierIssuer('_:b');
        var graphs = {'@default': {}};
        var defaultGraph;
        try {
          for (var i = 0; i < expanded.length; ++i) {
            var doc = expanded[i];
            doc = jsonld.relabelBlankNodes(doc, {issuer: new IdentifierIssuer('_:b' + i + '-')});
            var _graphs = (mergeNodes || i === 0) ? graphs : {'@default': {}};
            _createNodeMap(doc, _graphs, '@default', issuer);
            if (_graphs !== graphs) {
              for (var graphName in _graphs) {
                var _nodeMap = _graphs[graphName];
                if (!(graphName in graphs)) {
                  graphs[graphName] = _nodeMap;
                  continue;
                }
                var nodeMap = graphs[graphName];
                for (var key in _nodeMap) {
                  if (!(key in nodeMap)) {
                    nodeMap[key] = _nodeMap[key];
                  }
                }
              }
            }
          }
          defaultGraph = _mergeNodeMaps(graphs);
        } catch (ex) {
          return callback(ex);
        }
        var flattened = [];
        var keys = Object.keys(defaultGraph).sort();
        for (var ki = 0; ki < keys.length; ++ki) {
          var node = defaultGraph[keys[ki]];
          if (!_isSubjectReference(node)) {
            flattened.push(node);
          }
        }
        if (ctx === null) {
          return callback(null, flattened);
        }
        options.graph = true;
        options.skipExpansion = true;
        jsonld.compact(flattened, ctx, options, function(err, compacted) {
          if (err) {
            return callback(new JsonLdError('Could not compact merged output.', 'jsonld.MergeError', {cause: err}));
          }
          callback(null, compacted);
        });
      }
    };
    jsonld.relabelBlankNodes = function(input, options) {
      options = options || {};
      var issuer = options.namer || options.issuer || new IdentifierIssuer('_:b');
      return _labelBlankNodes(issuer, input);
    };
    jsonld.prependBase = function(base, iri) {
      return _prependBase(base, iri);
    };
    jsonld.documentLoader = function(url, callback) {
      var err = new JsonLdError('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', {code: 'loading document failed'});
      if (_nodejs) {
        return callback(err, {
          contextUrl: null,
          documentUrl: url,
          document: null
        });
      }
      return jsonld.promisify(function(callback) {
        callback(err);
      });
    };
    jsonld.loadDocument = function(url, callback) {
      var promise = jsonld.documentLoader(url, callback);
      if (promise && 'then' in promise) {
        promise.then(callback.bind(null, null), callback);
      }
    };
    jsonld.promises = function(options) {
      options = options || {};
      var slice = Array.prototype.slice;
      var promisify = jsonld.promisify;
      var api = options.api || {};
      var version = options.version || 'jsonld.js';
      if (typeof options.api === 'string') {
        if (!options.version) {
          version = options.api;
        }
        api = {};
      }
      api.expand = function(input) {
        if (arguments.length < 1) {
          throw new TypeError('Could not expand, too few arguments.');
        }
        return promisify.apply(null, [jsonld.expand].concat(slice.call(arguments)));
      };
      api.compact = function(input, ctx) {
        if (arguments.length < 2) {
          throw new TypeError('Could not compact, too few arguments.');
        }
        var compact = function(input, ctx, options, callback) {
          jsonld.compact(input, ctx, options, function(err, compacted) {
            callback(err, compacted);
          });
        };
        return promisify.apply(null, [compact].concat(slice.call(arguments)));
      };
      api.flatten = function(input) {
        if (arguments.length < 1) {
          throw new TypeError('Could not flatten, too few arguments.');
        }
        return promisify.apply(null, [jsonld.flatten].concat(slice.call(arguments)));
      };
      api.frame = function(input, frame) {
        if (arguments.length < 2) {
          throw new TypeError('Could not frame, too few arguments.');
        }
        return promisify.apply(null, [jsonld.frame].concat(slice.call(arguments)));
      };
      api.fromRDF = function(dataset) {
        if (arguments.length < 1) {
          throw new TypeError('Could not convert from RDF, too few arguments.');
        }
        return promisify.apply(null, [jsonld.fromRDF].concat(slice.call(arguments)));
      };
      api.toRDF = function(input) {
        if (arguments.length < 1) {
          throw new TypeError('Could not convert to RDF, too few arguments.');
        }
        return promisify.apply(null, [jsonld.toRDF].concat(slice.call(arguments)));
      };
      api.normalize = function(input) {
        if (arguments.length < 1) {
          throw new TypeError('Could not normalize, too few arguments.');
        }
        return promisify.apply(null, [jsonld.normalize].concat(slice.call(arguments)));
      };
      if (version === 'jsonld.js') {
        api.link = function(input, ctx) {
          if (arguments.length < 2) {
            throw new TypeError('Could not link, too few arguments.');
          }
          return promisify.apply(null, [jsonld.link].concat(slice.call(arguments)));
        };
        api.objectify = function(input) {
          return promisify.apply(null, [jsonld.objectify].concat(slice.call(arguments)));
        };
        api.createNodeMap = function(input) {
          return promisify.apply(null, [jsonld.createNodeMap].concat(slice.call(arguments)));
        };
        api.merge = function(input) {
          return promisify.apply(null, [jsonld.merge].concat(slice.call(arguments)));
        };
      }
      try {
        jsonld.Promise = global.Promise || require('es6-promise').Promise;
      } catch (e) {
        var f = function() {
          throw new Error('Unable to find a Promise implementation.');
        };
        for (var method in api) {
          api[method] = f;
        }
      }
      return api;
    };
    jsonld.promisify = function(op) {
      if (!jsonld.Promise) {
        try {
          jsonld.Promise = global.Promise || require('es6-promise').Promise;
        } catch (e) {
          throw new Error('Unable to find a Promise implementation.');
        }
      }
      var args = Array.prototype.slice.call(arguments, 1);
      return new jsonld.Promise(function(resolve, reject) {
        op.apply(null, args.concat(function(err, value) {
          if (!err) {
            resolve(value);
          } else {
            reject(err);
          }
        }));
      });
    };
    jsonld.promises({api: jsonld.promises});
    function JsonLdProcessor() {}
    JsonLdProcessor.prototype = jsonld.promises({version: 'json-ld-1.0'});
    JsonLdProcessor.prototype.toString = function() {
      if (this instanceof JsonLdProcessor) {
        return '[object JsonLdProcessor]';
      }
      return '[object JsonLdProcessorPrototype]';
    };
    jsonld.JsonLdProcessor = JsonLdProcessor;
    var canDefineProperty = !!Object.defineProperty;
    if (canDefineProperty) {
      try {
        Object.defineProperty({}, 'x', {});
      } catch (e) {
        canDefineProperty = false;
      }
    }
    if (canDefineProperty) {
      Object.defineProperty(JsonLdProcessor, 'prototype', {
        writable: false,
        enumerable: false
      });
      Object.defineProperty(JsonLdProcessor.prototype, 'constructor', {
        writable: true,
        enumerable: false,
        configurable: true,
        value: JsonLdProcessor
      });
    }
    if (_browser && typeof global.JsonLdProcessor === 'undefined') {
      if (canDefineProperty) {
        Object.defineProperty(global, 'JsonLdProcessor', {
          writable: true,
          enumerable: false,
          configurable: true,
          value: JsonLdProcessor
        });
      } else {
        global.JsonLdProcessor = JsonLdProcessor;
      }
    }
    var _setImmediate = typeof setImmediate === 'function' && setImmediate;
    var _delay = _setImmediate ? function(fn) {
      _setImmediate(fn);
    } : function(fn) {
      setTimeout(fn, 0);
    };
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      jsonld.nextTick = process.nextTick;
    } else {
      jsonld.nextTick = _delay;
    }
    jsonld.setImmediate = _setImmediate ? _delay : jsonld.nextTick;
    jsonld.parseLinkHeader = function(header) {
      var rval = {};
      var entries = header.match(/(?:<[^>]*?>|"[^"]*?"|[^,])+/g);
      var rLinkHeader = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
      for (var i = 0; i < entries.length; ++i) {
        var match = entries[i].match(rLinkHeader);
        if (!match) {
          continue;
        }
        var result = {target: match[1]};
        var params = match[2];
        var rParams = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;
        while (match = rParams.exec(params)) {
          result[match[1]] = (match[2] === undefined) ? match[3] : match[2];
        }
        var rel = result['rel'] || '';
        if (_isArray(rval[rel])) {
          rval[rel].push(result);
        } else if (rel in rval) {
          rval[rel] = [rval[rel], result];
        } else {
          rval[rel] = result;
        }
      }
      return rval;
    };
    jsonld.RequestQueue = function() {
      this._requests = {};
    };
    jsonld.RequestQueue.prototype.wrapLoader = function(loader) {
      this._loader = loader;
      this._usePromise = (loader.length === 1);
      return this.add.bind(this);
    };
    jsonld.RequestQueue.prototype.add = function(url, callback) {
      var self = this;
      if (!callback && !self._usePromise) {
        throw new Error('callback must be specified.');
      }
      if (self._usePromise) {
        return new jsonld.Promise(function(resolve, reject) {
          var load = self._requests[url];
          if (!load) {
            load = self._requests[url] = self._loader(url).then(function(remoteDoc) {
              delete self._requests[url];
              return remoteDoc;
            }).catch(function(err) {
              delete self._requests[url];
              throw err;
            });
          }
          load.then(function(remoteDoc) {
            resolve(remoteDoc);
          }).catch(function(err) {
            reject(err);
          });
        });
      }
      if (url in self._requests) {
        self._requests[url].push(callback);
      } else {
        self._requests[url] = [callback];
        self._loader(url, function(err, remoteDoc) {
          var callbacks = self._requests[url];
          delete self._requests[url];
          for (var i = 0; i < callbacks.length; ++i) {
            callbacks[i](err, remoteDoc);
          }
        });
      }
    };
    jsonld.DocumentCache = function(size) {
      this.order = [];
      this.cache = {};
      this.size = size || 50;
      this.expires = 30 * 1000;
    };
    jsonld.DocumentCache.prototype.get = function(url) {
      if (url in this.cache) {
        var entry = this.cache[url];
        if (entry.expires >= +new Date()) {
          return entry.ctx;
        }
        delete this.cache[url];
        this.order.splice(this.order.indexOf(url), 1);
      }
      return null;
    };
    jsonld.DocumentCache.prototype.set = function(url, ctx) {
      if (this.order.length === this.size) {
        delete this.cache[this.order.shift()];
      }
      this.order.push(url);
      this.cache[url] = {
        ctx: ctx,
        expires: (+new Date() + this.expires)
      };
    };
    jsonld.ActiveContextCache = function(size) {
      this.order = [];
      this.cache = {};
      this.size = size || 100;
    };
    jsonld.ActiveContextCache.prototype.get = function(activeCtx, localCtx) {
      var key1 = JSON.stringify(activeCtx);
      var key2 = JSON.stringify(localCtx);
      var level1 = this.cache[key1];
      if (level1 && key2 in level1) {
        return level1[key2];
      }
      return null;
    };
    jsonld.ActiveContextCache.prototype.set = function(activeCtx, localCtx, result) {
      if (this.order.length === this.size) {
        var entry = this.order.shift();
        delete this.cache[entry.activeCtx][entry.localCtx];
      }
      var key1 = JSON.stringify(activeCtx);
      var key2 = JSON.stringify(localCtx);
      this.order.push({
        activeCtx: key1,
        localCtx: key2
      });
      if (!(key1 in this.cache)) {
        this.cache[key1] = {};
      }
      this.cache[key1][key2] = _clone(result);
    };
    jsonld.cache = {activeCtx: new jsonld.ActiveContextCache()};
    jsonld.documentLoaders = {};
    jsonld.documentLoaders.jquery = function($, options) {
      options = options || {};
      var queue = new jsonld.RequestQueue();
      var usePromise = ('usePromise' in options ? options.usePromise : (typeof Promise !== 'undefined'));
      if (usePromise) {
        return queue.wrapLoader(function(url) {
          return jsonld.promisify(loader, url);
        });
      }
      return queue.wrapLoader(loader);
      function loader(url, callback) {
        if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
          return callback(new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        }
        if (options.secure && url.indexOf('https') !== 0) {
          return callback(new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        }
        $.ajax({
          url: url,
          accepts: {json: 'application/ld+json, application/json'},
          headers: {'Accept': 'application/ld+json, application/json'},
          dataType: 'json',
          crossDomain: true,
          success: function(data, textStatus, jqXHR) {
            var doc = {
              contextUrl: null,
              documentUrl: url,
              document: data
            };
            var contentType = jqXHR.getResponseHeader('Content-Type');
            var linkHeader = jqXHR.getResponseHeader('Link');
            if (linkHeader && contentType !== 'application/ld+json') {
              linkHeader = jsonld.parseLinkHeader(linkHeader)[LINK_HEADER_REL];
              if (_isArray(linkHeader)) {
                return callback(new JsonLdError('URL could not be dereferenced, it has more than one ' + 'associated HTTP Link Header.', 'jsonld.InvalidUrl', {
                  code: 'multiple context link headers',
                  url: url
                }), doc);
              }
              if (linkHeader) {
                doc.contextUrl = linkHeader.target;
              }
            }
            callback(null, doc);
          },
          error: function(jqXHR, textStatus, err) {
            callback(new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
              code: 'loading document failed',
              url: url,
              cause: err
            }), {
              contextUrl: null,
              documentUrl: url,
              document: null
            });
          }
        });
      }
    };
    jsonld.documentLoaders.node = function(options) {
      options = options || {};
      var strictSSL = ('strictSSL' in options) ? options.strictSSL : true;
      var maxRedirects = ('maxRedirects' in options) ? options.maxRedirects : -1;
      var request = require('request');
      var http = require('http');
      var queue = new jsonld.RequestQueue();
      if (options.usePromise) {
        return queue.wrapLoader(function(url) {
          return jsonld.promisify(loadDocument, url, []);
        });
      }
      return queue.wrapLoader(function(url, callback) {
        loadDocument(url, [], callback);
      });
      function loadDocument(url, redirects, callback) {
        if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
          return callback(new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        }
        if (options.secure && url.indexOf('https') !== 0) {
          return callback(new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        }
        var doc = null;
        if (doc !== null) {
          return callback(null, doc);
        }
        request({
          url: url,
          headers: {'Accept': 'application/ld+json, application/json'},
          strictSSL: strictSSL,
          followRedirect: false
        }, handleResponse);
        function handleResponse(err, res, body) {
          doc = {
            contextUrl: null,
            documentUrl: url,
            document: body || null
          };
          if (err) {
            return callback(new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
              code: 'loading document failed',
              url: url,
              cause: err
            }), doc);
          }
          var statusText = http.STATUS_CODES[res.statusCode];
          if (res.statusCode >= 400) {
            return callback(new JsonLdError('URL could not be dereferenced: ' + statusText, 'jsonld.InvalidUrl', {
              code: 'loading document failed',
              url: url,
              httpStatusCode: res.statusCode
            }), doc);
          }
          if (res.headers.link && res.headers['content-type'] !== 'application/ld+json') {
            var linkHeader = jsonld.parseLinkHeader(res.headers.link)[LINK_HEADER_REL];
            if (_isArray(linkHeader)) {
              return callback(new JsonLdError('URL could not be dereferenced, it has more than one associated ' + 'HTTP Link Header.', 'jsonld.InvalidUrl', {
                code: 'multiple context link headers',
                url: url
              }), doc);
            }
            if (linkHeader) {
              doc.contextUrl = linkHeader.target;
            }
          }
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            if (redirects.length === maxRedirects) {
              return callback(new JsonLdError('URL could not be dereferenced; there were too many redirects.', 'jsonld.TooManyRedirects', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: res.statusCode,
                redirects: redirects
              }), doc);
            }
            if (redirects.indexOf(url) !== -1) {
              return callback(new JsonLdError('URL could not be dereferenced; infinite redirection was detected.', 'jsonld.InfiniteRedirectDetected', {
                code: 'recursive context inclusion',
                url: url,
                httpStatusCode: res.statusCode,
                redirects: redirects
              }), doc);
            }
            redirects.push(url);
            return loadDocument(res.headers.location, redirects, callback);
          }
          redirects.push(url);
          callback(err, doc);
        }
      }
    };
    jsonld.documentLoaders.xhr = function(options) {
      options = options || {};
      var rlink = /(^|(\r\n))link:/i;
      var queue = new jsonld.RequestQueue();
      var usePromise = ('usePromise' in options ? options.usePromise : (typeof Promise !== 'undefined'));
      if (usePromise) {
        return queue.wrapLoader(function(url) {
          return jsonld.promisify(loader, url);
        });
      }
      return queue.wrapLoader(loader);
      function loader(url, callback) {
        if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
          return callback(new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        }
        if (options.secure && url.indexOf('https') !== 0) {
          return callback(new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        }
        var xhr = options.xhr || XMLHttpRequest;
        var req = new xhr();
        req.onload = function() {
          if (req.status >= 400) {
            return callback(new JsonLdError('URL could not be dereferenced: ' + req.statusText, 'jsonld.LoadDocumentError', {
              code: 'loading document failed',
              url: url,
              httpStatusCode: req.status
            }), {
              contextUrl: null,
              documentUrl: url,
              document: null
            });
          }
          var doc = {
            contextUrl: null,
            documentUrl: url,
            document: req.response
          };
          var contentType = req.getResponseHeader('Content-Type');
          var linkHeader;
          if (rlink.test(req.getAllResponseHeaders())) {
            linkHeader = req.getResponseHeader('Link');
          }
          if (linkHeader && contentType !== 'application/ld+json') {
            linkHeader = jsonld.parseLinkHeader(linkHeader)[LINK_HEADER_REL];
            if (_isArray(linkHeader)) {
              return callback(new JsonLdError('URL could not be dereferenced, it has more than one ' + 'associated HTTP Link Header.', 'jsonld.InvalidUrl', {
                code: 'multiple context link headers',
                url: url
              }), doc);
            }
            if (linkHeader) {
              doc.contextUrl = linkHeader.target;
            }
          }
          callback(null, doc);
        };
        req.onerror = function() {
          callback(new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
            code: 'loading document failed',
            url: url
          }), {
            contextUrl: null,
            documentUrl: url,
            document: null
          });
        };
        req.open('GET', url, true);
        req.setRequestHeader('Accept', 'application/ld+json, application/json');
        req.send();
      }
    };
    jsonld.useDocumentLoader = function(type) {
      if (!(type in jsonld.documentLoaders)) {
        throw new JsonLdError('Unknown document loader type: "' + type + '"', 'jsonld.UnknownDocumentLoader', {type: type});
      }
      jsonld.documentLoader = jsonld.documentLoaders[type].apply(jsonld, Array.prototype.slice.call(arguments, 1));
    };
    jsonld.processContext = function(activeCtx, localCtx) {
      var options = {};
      var callbackArg = 2;
      if (arguments.length > 3) {
        options = arguments[2] || {};
        callbackArg += 1;
      }
      var callback = arguments[callbackArg];
      if (!('base' in options)) {
        options.base = '';
      }
      if (!('documentLoader' in options)) {
        options.documentLoader = jsonld.loadDocument;
      }
      if (localCtx === null) {
        return callback(null, _getInitialContext(options));
      }
      localCtx = _clone(localCtx);
      if (!(_isObject(localCtx) && '@context' in localCtx)) {
        localCtx = {'@context': localCtx};
      }
      _retrieveContextUrls(localCtx, options, function(err, ctx) {
        if (err) {
          return callback(err);
        }
        try {
          ctx = new Processor().processContext(activeCtx, ctx, options);
        } catch (ex) {
          return callback(ex);
        }
        callback(null, ctx);
      });
    };
    jsonld.hasProperty = function(subject, property) {
      var rval = false;
      if (property in subject) {
        var value = subject[property];
        rval = (!_isArray(value) || value.length > 0);
      }
      return rval;
    };
    jsonld.hasValue = function(subject, property, value) {
      var rval = false;
      if (jsonld.hasProperty(subject, property)) {
        var val = subject[property];
        var isList = _isList(val);
        if (_isArray(val) || isList) {
          if (isList) {
            val = val['@list'];
          }
          for (var i = 0; i < val.length; ++i) {
            if (jsonld.compareValues(value, val[i])) {
              rval = true;
              break;
            }
          }
        } else if (!_isArray(value)) {
          rval = jsonld.compareValues(value, val);
        }
      }
      return rval;
    };
    jsonld.addValue = function(subject, property, value, options) {
      options = options || {};
      if (!('propertyIsArray' in options)) {
        options.propertyIsArray = false;
      }
      if (!('allowDuplicate' in options)) {
        options.allowDuplicate = true;
      }
      if (_isArray(value)) {
        if (value.length === 0 && options.propertyIsArray && !(property in subject)) {
          subject[property] = [];
        }
        for (var i = 0; i < value.length; ++i) {
          jsonld.addValue(subject, property, value[i], options);
        }
      } else if (property in subject) {
        var hasValue = (!options.allowDuplicate && jsonld.hasValue(subject, property, value));
        if (!_isArray(subject[property]) && (!hasValue || options.propertyIsArray)) {
          subject[property] = [subject[property]];
        }
        if (!hasValue) {
          subject[property].push(value);
        }
      } else {
        subject[property] = options.propertyIsArray ? [value] : value;
      }
    };
    jsonld.getValues = function(subject, property) {
      var rval = subject[property] || [];
      if (!_isArray(rval)) {
        rval = [rval];
      }
      return rval;
    };
    jsonld.removeProperty = function(subject, property) {
      delete subject[property];
    };
    jsonld.removeValue = function(subject, property, value, options) {
      options = options || {};
      if (!('propertyIsArray' in options)) {
        options.propertyIsArray = false;
      }
      var values = jsonld.getValues(subject, property).filter(function(e) {
        return !jsonld.compareValues(e, value);
      });
      if (values.length === 0) {
        jsonld.removeProperty(subject, property);
      } else if (values.length === 1 && !options.propertyIsArray) {
        subject[property] = values[0];
      } else {
        subject[property] = values;
      }
    };
    jsonld.compareValues = function(v1, v2) {
      if (v1 === v2) {
        return true;
      }
      if (_isValue(v1) && _isValue(v2) && v1['@value'] === v2['@value'] && v1['@type'] === v2['@type'] && v1['@language'] === v2['@language'] && v1['@index'] === v2['@index']) {
        return true;
      }
      if (_isObject(v1) && ('@id' in v1) && _isObject(v2) && ('@id' in v2)) {
        return v1['@id'] === v2['@id'];
      }
      return false;
    };
    jsonld.getContextValue = function(ctx, key, type) {
      var rval = null;
      if (key === null) {
        return rval;
      }
      if (type === '@language' && (type in ctx)) {
        rval = ctx[type];
      }
      if (ctx.mappings[key]) {
        var entry = ctx.mappings[key];
        if (_isUndefined(type)) {
          rval = entry;
        } else if (type in entry) {
          rval = entry[type];
        }
      }
      return rval;
    };
    var _rdfParsers = {};
    jsonld.registerRDFParser = function(contentType, parser) {
      _rdfParsers[contentType] = parser;
    };
    jsonld.unregisterRDFParser = function(contentType) {
      delete _rdfParsers[contentType];
    };
    if (_nodejs) {
      if (typeof XMLSerializer === 'undefined') {
        var XMLSerializer = null;
      }
      if (typeof Node === 'undefined') {
        var Node = {
          ELEMENT_NODE: 1,
          ATTRIBUTE_NODE: 2,
          TEXT_NODE: 3,
          CDATA_SECTION_NODE: 4,
          ENTITY_REFERENCE_NODE: 5,
          ENTITY_NODE: 6,
          PROCESSING_INSTRUCTION_NODE: 7,
          COMMENT_NODE: 8,
          DOCUMENT_NODE: 9,
          DOCUMENT_TYPE_NODE: 10,
          DOCUMENT_FRAGMENT_NODE: 11,
          NOTATION_NODE: 12
        };
      }
    }
    var XSD_BOOLEAN = 'http://www.w3.org/2001/XMLSchema#boolean';
    var XSD_DOUBLE = 'http://www.w3.org/2001/XMLSchema#double';
    var XSD_INTEGER = 'http://www.w3.org/2001/XMLSchema#integer';
    var XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';
    var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    var RDF_LIST = RDF + 'List';
    var RDF_FIRST = RDF + 'first';
    var RDF_REST = RDF + 'rest';
    var RDF_NIL = RDF + 'nil';
    var RDF_TYPE = RDF + 'type';
    var RDF_PLAIN_LITERAL = RDF + 'PlainLiteral';
    var RDF_XML_LITERAL = RDF + 'XMLLiteral';
    var RDF_OBJECT = RDF + 'object';
    var RDF_LANGSTRING = RDF + 'langString';
    var LINK_HEADER_REL = 'http://www.w3.org/ns/json-ld#context';
    var MAX_CONTEXT_URLS = 10;
    var JsonLdError = function(msg, type, details) {
      if (_nodejs) {
        Error.call(this);
        Error.captureStackTrace(this, this.constructor);
      } else if (typeof Error !== 'undefined') {
        this.stack = (new Error()).stack;
      }
      this.name = type || 'jsonld.Error';
      this.message = msg || 'An unspecified JSON-LD error occurred.';
      this.details = details || {};
    };
    if (_nodejs) {
      require('util').inherits(JsonLdError, Error);
    } else if (typeof Error !== 'undefined') {
      JsonLdError.prototype = new Error();
    }
    var Processor = function() {};
    Processor.prototype.compact = function(activeCtx, activeProperty, element, options) {
      if (_isArray(element)) {
        var rval = [];
        for (var i = 0; i < element.length; ++i) {
          var compacted = this.compact(activeCtx, activeProperty, element[i], options);
          if (compacted !== null) {
            rval.push(compacted);
          }
        }
        if (options.compactArrays && rval.length === 1) {
          var container = jsonld.getContextValue(activeCtx, activeProperty, '@container');
          if (container === null) {
            rval = rval[0];
          }
        }
        return rval;
      }
      if (_isObject(element)) {
        if (options.link && '@id' in element && element['@id'] in options.link) {
          var linked = options.link[element['@id']];
          for (var i = 0; i < linked.length; ++i) {
            if (linked[i].expanded === element) {
              return linked[i].compacted;
            }
          }
        }
        if (_isValue(element) || _isSubjectReference(element)) {
          var rval = _compactValue(activeCtx, activeProperty, element);
          if (options.link && _isSubjectReference(element)) {
            if (!(element['@id'] in options.link)) {
              options.link[element['@id']] = [];
            }
            options.link[element['@id']].push({
              expanded: element,
              compacted: rval
            });
          }
          return rval;
        }
        var insideReverse = (activeProperty === '@reverse');
        var rval = {};
        if (options.link && '@id' in element) {
          if (!(element['@id'] in options.link)) {
            options.link[element['@id']] = [];
          }
          options.link[element['@id']].push({
            expanded: element,
            compacted: rval
          });
        }
        var keys = Object.keys(element).sort();
        for (var ki = 0; ki < keys.length; ++ki) {
          var expandedProperty = keys[ki];
          var expandedValue = element[expandedProperty];
          if (expandedProperty === '@id' || expandedProperty === '@type') {
            var compactedValue;
            if (_isString(expandedValue)) {
              compactedValue = _compactIri(activeCtx, expandedValue, null, {vocab: (expandedProperty === '@type')});
            } else {
              compactedValue = [];
              for (var vi = 0; vi < expandedValue.length; ++vi) {
                compactedValue.push(_compactIri(activeCtx, expandedValue[vi], null, {vocab: true}));
              }
            }
            var alias = _compactIri(activeCtx, expandedProperty);
            var isArray = (_isArray(compactedValue) && expandedValue.length === 0);
            jsonld.addValue(rval, alias, compactedValue, {propertyIsArray: isArray});
            continue;
          }
          if (expandedProperty === '@reverse') {
            var compactedValue = this.compact(activeCtx, '@reverse', expandedValue, options);
            for (var compactedProperty in compactedValue) {
              if (activeCtx.mappings[compactedProperty] && activeCtx.mappings[compactedProperty].reverse) {
                var value = compactedValue[compactedProperty];
                var container = jsonld.getContextValue(activeCtx, compactedProperty, '@container');
                var useArray = (container === '@set' || !options.compactArrays);
                jsonld.addValue(rval, compactedProperty, value, {propertyIsArray: useArray});
                delete compactedValue[compactedProperty];
              }
            }
            if (Object.keys(compactedValue).length > 0) {
              var alias = _compactIri(activeCtx, expandedProperty);
              jsonld.addValue(rval, alias, compactedValue);
            }
            continue;
          }
          if (expandedProperty === '@index') {
            var container = jsonld.getContextValue(activeCtx, activeProperty, '@container');
            if (container === '@index') {
              continue;
            }
            var alias = _compactIri(activeCtx, expandedProperty);
            jsonld.addValue(rval, alias, expandedValue);
            continue;
          }
          if (expandedProperty !== '@graph' && expandedProperty !== '@list' && _isKeyword(expandedProperty)) {
            var alias = _compactIri(activeCtx, expandedProperty);
            jsonld.addValue(rval, alias, expandedValue);
            continue;
          }
          if (expandedValue.length === 0) {
            var itemActiveProperty = _compactIri(activeCtx, expandedProperty, expandedValue, {vocab: true}, insideReverse);
            jsonld.addValue(rval, itemActiveProperty, expandedValue, {propertyIsArray: true});
          }
          for (var vi = 0; vi < expandedValue.length; ++vi) {
            var expandedItem = expandedValue[vi];
            var itemActiveProperty = _compactIri(activeCtx, expandedProperty, expandedItem, {vocab: true}, insideReverse);
            var container = jsonld.getContextValue(activeCtx, itemActiveProperty, '@container');
            var isList = _isList(expandedItem);
            var list = null;
            if (isList) {
              list = expandedItem['@list'];
            }
            var compactedItem = this.compact(activeCtx, itemActiveProperty, isList ? list : expandedItem, options);
            if (isList) {
              if (!_isArray(compactedItem)) {
                compactedItem = [compactedItem];
              }
              if (container !== '@list') {
                var wrapper = {};
                wrapper[_compactIri(activeCtx, '@list')] = compactedItem;
                compactedItem = wrapper;
                if ('@index' in expandedItem) {
                  compactedItem[_compactIri(activeCtx, '@index')] = expandedItem['@index'];
                }
              } else if (itemActiveProperty in rval) {
                throw new JsonLdError('JSON-LD compact error; property has a "@list" @container ' + 'rule but there is more than a single @list that matches ' + 'the compacted term in the document. Compaction might mix ' + 'unwanted items into the list.', 'jsonld.SyntaxError', {code: 'compaction to list of lists'});
              }
            }
            if (container === '@language' || container === '@index') {
              var mapObject;
              if (itemActiveProperty in rval) {
                mapObject = rval[itemActiveProperty];
              } else {
                rval[itemActiveProperty] = mapObject = {};
              }
              if (container === '@language' && _isValue(compactedItem)) {
                compactedItem = compactedItem['@value'];
              }
              jsonld.addValue(mapObject, expandedItem[container], compactedItem);
            } else {
              var isArray = (!options.compactArrays || container === '@set' || container === '@list' || (_isArray(compactedItem) && compactedItem.length === 0) || expandedProperty === '@list' || expandedProperty === '@graph');
              jsonld.addValue(rval, itemActiveProperty, compactedItem, {propertyIsArray: isArray});
            }
          }
        }
        return rval;
      }
      return element;
    };
    Processor.prototype.expand = function(activeCtx, activeProperty, element, options, insideList) {
      var self = this;
      if (element === null || element === undefined) {
        return null;
      }
      if (!_isArray(element) && !_isObject(element)) {
        if (!insideList && (activeProperty === null || _expandIri(activeCtx, activeProperty, {vocab: true}) === '@graph')) {
          return null;
        }
        return _expandValue(activeCtx, activeProperty, element);
      }
      if (_isArray(element)) {
        var rval = [];
        var container = jsonld.getContextValue(activeCtx, activeProperty, '@container');
        insideList = insideList || container === '@list';
        for (var i = 0; i < element.length; ++i) {
          var e = self.expand(activeCtx, activeProperty, element[i], options);
          if (insideList && (_isArray(e) || _isList(e))) {
            throw new JsonLdError('Invalid JSON-LD syntax; lists of lists are not permitted.', 'jsonld.SyntaxError', {code: 'list of lists'});
          }
          if (e !== null) {
            if (_isArray(e)) {
              rval = rval.concat(e);
            } else {
              rval.push(e);
            }
          }
        }
        return rval;
      }
      if ('@context' in element) {
        activeCtx = self.processContext(activeCtx, element['@context'], options);
      }
      var expandedActiveProperty = _expandIri(activeCtx, activeProperty, {vocab: true});
      var rval = {};
      var keys = Object.keys(element).sort();
      for (var ki = 0; ki < keys.length; ++ki) {
        var key = keys[ki];
        var value = element[key];
        var expandedValue;
        if (key === '@context') {
          continue;
        }
        var expandedProperty = _expandIri(activeCtx, key, {vocab: true});
        if (expandedProperty === null || !(_isAbsoluteIri(expandedProperty) || _isKeyword(expandedProperty))) {
          continue;
        }
        if (_isKeyword(expandedProperty)) {
          if (expandedActiveProperty === '@reverse') {
            throw new JsonLdError('Invalid JSON-LD syntax; a keyword cannot be used as a @reverse ' + 'property.', 'jsonld.SyntaxError', {
              code: 'invalid reverse property map',
              value: value
            });
          }
          if (expandedProperty in rval) {
            throw new JsonLdError('Invalid JSON-LD syntax; colliding keywords detected.', 'jsonld.SyntaxError', {
              code: 'colliding keywords',
              keyword: expandedProperty
            });
          }
        }
        if (expandedProperty === '@id' && !_isString(value)) {
          if (!options.isFrame) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value must a string.', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value: value
            });
          }
          if (!_isObject(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value must be a string or an ' + 'object.', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value: value
            });
          }
        }
        if (expandedProperty === '@type') {
          _validateTypeValue(value);
        }
        if (expandedProperty === '@graph' && !(_isObject(value) || _isArray(value))) {
          throw new JsonLdError('Invalid JSON-LD syntax; "@graph" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
            code: 'invalid @graph value',
            value: value
          });
        }
        if (expandedProperty === '@value' && (_isObject(value) || _isArray(value))) {
          throw new JsonLdError('Invalid JSON-LD syntax; "@value" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
            code: 'invalid value object value',
            value: value
          });
        }
        if (expandedProperty === '@language') {
          if (value === null) {
            continue;
          }
          if (!_isString(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@language" value must be a string.', 'jsonld.SyntaxError', {
              code: 'invalid language-tagged string',
              value: value
            });
          }
          value = value.toLowerCase();
        }
        if (expandedProperty === '@index') {
          if (!_isString(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@index" value must be a string.', 'jsonld.SyntaxError', {
              code: 'invalid @index value',
              value: value
            });
          }
        }
        if (expandedProperty === '@reverse') {
          if (!_isObject(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must be an object.', 'jsonld.SyntaxError', {
              code: 'invalid @reverse value',
              value: value
            });
          }
          expandedValue = self.expand(activeCtx, '@reverse', value, options);
          if ('@reverse' in expandedValue) {
            for (var property in expandedValue['@reverse']) {
              jsonld.addValue(rval, property, expandedValue['@reverse'][property], {propertyIsArray: true});
            }
          }
          var reverseMap = rval['@reverse'] || null;
          for (var property in expandedValue) {
            if (property === '@reverse') {
              continue;
            }
            if (reverseMap === null) {
              reverseMap = rval['@reverse'] = {};
            }
            jsonld.addValue(reverseMap, property, [], {propertyIsArray: true});
            var items = expandedValue[property];
            for (var ii = 0; ii < items.length; ++ii) {
              var item = items[ii];
              if (_isValue(item) || _isList(item)) {
                throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
                  code: 'invalid reverse property value',
                  value: expandedValue
                });
              }
              jsonld.addValue(reverseMap, property, item, {propertyIsArray: true});
            }
          }
          continue;
        }
        var container = jsonld.getContextValue(activeCtx, key, '@container');
        if (container === '@language' && _isObject(value)) {
          expandedValue = _expandLanguageMap(value);
        } else if (container === '@index' && _isObject(value)) {
          expandedValue = (function _expandIndexMap(activeProperty) {
            var rval = [];
            var keys = Object.keys(value).sort();
            for (var ki = 0; ki < keys.length; ++ki) {
              var key = keys[ki];
              var val = value[key];
              if (!_isArray(val)) {
                val = [val];
              }
              val = self.expand(activeCtx, activeProperty, val, options, false);
              for (var vi = 0; vi < val.length; ++vi) {
                var item = val[vi];
                if (!('@index' in item)) {
                  item['@index'] = key;
                }
                rval.push(item);
              }
            }
            return rval;
          })(key);
        } else {
          var isList = (expandedProperty === '@list');
          if (isList || expandedProperty === '@set') {
            var nextActiveProperty = activeProperty;
            if (isList && expandedActiveProperty === '@graph') {
              nextActiveProperty = null;
            }
            expandedValue = self.expand(activeCtx, nextActiveProperty, value, options, isList);
            if (isList && _isList(expandedValue)) {
              throw new JsonLdError('Invalid JSON-LD syntax; lists of lists are not permitted.', 'jsonld.SyntaxError', {code: 'list of lists'});
            }
          } else {
            expandedValue = self.expand(activeCtx, key, value, options, false);
          }
        }
        if (expandedValue === null && expandedProperty !== '@value') {
          continue;
        }
        if (expandedProperty !== '@list' && !_isList(expandedValue) && container === '@list') {
          expandedValue = (_isArray(expandedValue) ? expandedValue : [expandedValue]);
          expandedValue = {'@list': expandedValue};
        }
        if (activeCtx.mappings[key] && activeCtx.mappings[key].reverse) {
          var reverseMap = rval['@reverse'] = rval['@reverse'] || {};
          if (!_isArray(expandedValue)) {
            expandedValue = [expandedValue];
          }
          for (var ii = 0; ii < expandedValue.length; ++ii) {
            var item = expandedValue[ii];
            if (_isValue(item) || _isList(item)) {
              throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
                code: 'invalid reverse property value',
                value: expandedValue
              });
            }
            jsonld.addValue(reverseMap, expandedProperty, item, {propertyIsArray: true});
          }
          continue;
        }
        var useArray = ['@index', '@id', '@type', '@value', '@language'].indexOf(expandedProperty) === -1;
        jsonld.addValue(rval, expandedProperty, expandedValue, {propertyIsArray: useArray});
      }
      keys = Object.keys(rval);
      var count = keys.length;
      if ('@value' in rval) {
        if ('@type' in rval && '@language' in rval) {
          throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may not ' + 'contain both "@type" and "@language".', 'jsonld.SyntaxError', {
            code: 'invalid value object',
            element: rval
          });
        }
        var validCount = count - 1;
        if ('@type' in rval) {
          validCount -= 1;
        }
        if ('@index' in rval) {
          validCount -= 1;
        }
        if ('@language' in rval) {
          validCount -= 1;
        }
        if (validCount !== 0) {
          throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may only ' + 'have an "@index" property and at most one other property ' + 'which can be "@type" or "@language".', 'jsonld.SyntaxError', {
            code: 'invalid value object',
            element: rval
          });
        }
        if (rval['@value'] === null) {
          rval = null;
        } else if ('@language' in rval && !_isString(rval['@value'])) {
          throw new JsonLdError('Invalid JSON-LD syntax; only strings may be language-tagged.', 'jsonld.SyntaxError', {
            code: 'invalid language-tagged value',
            element: rval
          });
        } else if ('@type' in rval && (!_isAbsoluteIri(rval['@type']) || rval['@type'].indexOf('_:') === 0)) {
          throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" and "@type" ' + 'must have an absolute IRI for the value of "@type".', 'jsonld.SyntaxError', {
            code: 'invalid typed value',
            element: rval
          });
        }
      } else if ('@type' in rval && !_isArray(rval['@type'])) {
        rval['@type'] = [rval['@type']];
      } else if ('@set' in rval || '@list' in rval) {
        if (count > 1 && !(count === 2 && '@index' in rval)) {
          throw new JsonLdError('Invalid JSON-LD syntax; if an element has the property "@set" ' + 'or "@list", then it can have at most one other property that is ' + '"@index".', 'jsonld.SyntaxError', {
            code: 'invalid set or list object',
            element: rval
          });
        }
        if ('@set' in rval) {
          rval = rval['@set'];
          keys = Object.keys(rval);
          count = keys.length;
        }
      } else if (count === 1 && '@language' in rval) {
        rval = null;
      }
      if (_isObject(rval) && !options.keepFreeFloatingNodes && !insideList && (activeProperty === null || expandedActiveProperty === '@graph')) {
        if (count === 0 || '@value' in rval || '@list' in rval || (count === 1 && '@id' in rval)) {
          rval = null;
        }
      }
      return rval;
    };
    Processor.prototype.createNodeMap = function(input, options) {
      options = options || {};
      var issuer = options.namer || options.issuer || new IdentifierIssuer('_:b');
      var graphs = {'@default': {}};
      _createNodeMap(input, graphs, '@default', issuer);
      return _mergeNodeMaps(graphs);
    };
    Processor.prototype.flatten = function(input) {
      var defaultGraph = this.createNodeMap(input);
      var flattened = [];
      var keys = Object.keys(defaultGraph).sort();
      for (var ki = 0; ki < keys.length; ++ki) {
        var node = defaultGraph[keys[ki]];
        if (!_isSubjectReference(node)) {
          flattened.push(node);
        }
      }
      return flattened;
    };
    Processor.prototype.frame = function(input, frame, options) {
      var state = {
        options: options,
        graphs: {
          '@default': {},
          '@merged': {}
        },
        subjectStack: [],
        link: {}
      };
      var issuer = new IdentifierIssuer('_:b');
      _createNodeMap(input, state.graphs, '@merged', issuer);
      state.subjects = state.graphs['@merged'];
      var framed = [];
      _frame(state, Object.keys(state.subjects).sort(), frame, framed, null);
      return framed;
    };
    Processor.prototype.normalize = function(dataset, options, callback) {
      if (options.algorithm === 'URDNA2015') {
        return new URDNA2015(options).main(dataset, callback);
      }
      if (options.algorithm === 'URGNA2012') {
        return new URGNA2012(options).main(dataset, callback);
      }
      callback(new Error('Invalid RDF Dataset Normalization algorithm: ' + options.algorithm));
    };
    Processor.prototype.fromRDF = function(dataset, options, callback) {
      var defaultGraph = {};
      var graphMap = {'@default': defaultGraph};
      var referencedOnce = {};
      for (var name in dataset) {
        var graph = dataset[name];
        if (!(name in graphMap)) {
          graphMap[name] = {};
        }
        if (name !== '@default' && !(name in defaultGraph)) {
          defaultGraph[name] = {'@id': name};
        }
        var nodeMap = graphMap[name];
        for (var ti = 0; ti < graph.length; ++ti) {
          var triple = graph[ti];
          var s = triple.subject.value;
          var p = triple.predicate.value;
          var o = triple.object;
          if (!(s in nodeMap)) {
            nodeMap[s] = {'@id': s};
          }
          var node = nodeMap[s];
          var objectIsId = (o.type === 'IRI' || o.type === 'blank node');
          if (objectIsId && !(o.value in nodeMap)) {
            nodeMap[o.value] = {'@id': o.value};
          }
          if (p === RDF_TYPE && !options.useRdfType && objectIsId) {
            jsonld.addValue(node, '@type', o.value, {propertyIsArray: true});
            continue;
          }
          var value = _RDFToObject(o, options.useNativeTypes);
          jsonld.addValue(node, p, value, {propertyIsArray: true});
          if (objectIsId) {
            if (o.value === RDF_NIL) {
              var object = nodeMap[o.value];
              if (!('usages' in object)) {
                object.usages = [];
              }
              object.usages.push({
                node: node,
                property: p,
                value: value
              });
            } else if (o.value in referencedOnce) {
              referencedOnce[o.value] = false;
            } else {
              referencedOnce[o.value] = {
                node: node,
                property: p,
                value: value
              };
            }
          }
        }
      }
      for (var name in graphMap) {
        var graphObject = graphMap[name];
        if (!(RDF_NIL in graphObject)) {
          continue;
        }
        var nil = graphObject[RDF_NIL];
        for (var i = 0; i < nil.usages.length; ++i) {
          var usage = nil.usages[i];
          var node = usage.node;
          var property = usage.property;
          var head = usage.value;
          var list = [];
          var listNodes = [];
          var nodeKeyCount = Object.keys(node).length;
          while (property === RDF_REST && _isObject(referencedOnce[node['@id']]) && _isArray(node[RDF_FIRST]) && node[RDF_FIRST].length === 1 && _isArray(node[RDF_REST]) && node[RDF_REST].length === 1 && (nodeKeyCount === 3 || (nodeKeyCount === 4 && _isArray(node['@type']) && node['@type'].length === 1 && node['@type'][0] === RDF_LIST))) {
            list.push(node[RDF_FIRST][0]);
            listNodes.push(node['@id']);
            usage = referencedOnce[node['@id']];
            node = usage.node;
            property = usage.property;
            head = usage.value;
            nodeKeyCount = Object.keys(node).length;
            if (node['@id'].indexOf('_:') !== 0) {
              break;
            }
          }
          if (property === RDF_FIRST) {
            if (node['@id'] === RDF_NIL) {
              continue;
            }
            head = graphObject[head['@id']][RDF_REST][0];
            list.pop();
            listNodes.pop();
          }
          delete head['@id'];
          head['@list'] = list.reverse();
          for (var j = 0; j < listNodes.length; ++j) {
            delete graphObject[listNodes[j]];
          }
        }
        delete nil.usages;
      }
      var result = [];
      var subjects = Object.keys(defaultGraph).sort();
      for (var i = 0; i < subjects.length; ++i) {
        var subject = subjects[i];
        var node = defaultGraph[subject];
        if (subject in graphMap) {
          var graph = node['@graph'] = [];
          var graphObject = graphMap[subject];
          var subjects_ = Object.keys(graphObject).sort();
          for (var si = 0; si < subjects_.length; ++si) {
            var node_ = graphObject[subjects_[si]];
            if (!_isSubjectReference(node_)) {
              graph.push(node_);
            }
          }
        }
        if (!_isSubjectReference(node)) {
          result.push(node);
        }
      }
      callback(null, result);
    };
    Processor.prototype.toRDF = function(input, options) {
      var issuer = new IdentifierIssuer('_:b');
      var nodeMap = {'@default': {}};
      _createNodeMap(input, nodeMap, '@default', issuer);
      var dataset = {};
      var graphNames = Object.keys(nodeMap).sort();
      for (var i = 0; i < graphNames.length; ++i) {
        var graphName = graphNames[i];
        if (graphName === '@default' || _isAbsoluteIri(graphName)) {
          dataset[graphName] = _graphToRDF(nodeMap[graphName], issuer, options);
        }
      }
      return dataset;
    };
    Processor.prototype.processContext = function(activeCtx, localCtx, options) {
      if (_isObject(localCtx) && '@context' in localCtx && _isArray(localCtx['@context'])) {
        localCtx = localCtx['@context'];
      }
      var ctxs = _isArray(localCtx) ? localCtx : [localCtx];
      if (ctxs.length === 0) {
        return activeCtx.clone();
      }
      var rval = activeCtx;
      for (var i = 0; i < ctxs.length; ++i) {
        var ctx = ctxs[i];
        if (ctx === null) {
          rval = activeCtx = _getInitialContext(options);
          continue;
        }
        if (_isObject(ctx) && '@context' in ctx) {
          ctx = ctx['@context'];
        }
        if (!_isObject(ctx)) {
          throw new JsonLdError('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', {
            code: 'invalid local context',
            context: ctx
          });
        }
        if (jsonld.cache.activeCtx) {
          var cached = jsonld.cache.activeCtx.get(activeCtx, ctx);
          if (cached) {
            rval = activeCtx = cached;
            continue;
          }
        }
        activeCtx = rval;
        rval = rval.clone();
        var defined = {};
        if ('@base' in ctx) {
          var base = ctx['@base'];
          if (base === null) {
            base = null;
          } else if (!_isString(base)) {
            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@base" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
              code: 'invalid base IRI',
              context: ctx
            });
          } else if (base !== '' && !_isAbsoluteIri(base)) {
            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@base" in a ' + '@context must be an absolute IRI or the empty string.', 'jsonld.SyntaxError', {
              code: 'invalid base IRI',
              context: ctx
            });
          }
          if (base !== null) {
            base = jsonld.url.parse(base || '');
          }
          rval['@base'] = base;
          defined['@base'] = true;
        }
        if ('@vocab' in ctx) {
          var value = ctx['@vocab'];
          if (value === null) {
            delete rval['@vocab'];
          } else if (!_isString(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
              code: 'invalid vocab mapping',
              context: ctx
            });
          } else if (!_isAbsoluteIri(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be an absolute IRI.', 'jsonld.SyntaxError', {
              code: 'invalid vocab mapping',
              context: ctx
            });
          } else {
            rval['@vocab'] = value;
          }
          defined['@vocab'] = true;
        }
        if ('@language' in ctx) {
          var value = ctx['@language'];
          if (value === null) {
            delete rval['@language'];
          } else if (!_isString(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@language" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
              code: 'invalid default language',
              context: ctx
            });
          } else {
            rval['@language'] = value.toLowerCase();
          }
          defined['@language'] = true;
        }
        for (var key in ctx) {
          _createTermDefinition(rval, ctx, key, defined);
        }
        if (jsonld.cache.activeCtx) {
          jsonld.cache.activeCtx.set(activeCtx, ctx, rval);
        }
      }
      return rval;
    };
    function _expandLanguageMap(languageMap) {
      var rval = [];
      var keys = Object.keys(languageMap).sort();
      for (var ki = 0; ki < keys.length; ++ki) {
        var key = keys[ki];
        var val = languageMap[key];
        if (!_isArray(val)) {
          val = [val];
        }
        for (var vi = 0; vi < val.length; ++vi) {
          var item = val[vi];
          if (item === null) {
            continue;
          }
          if (!_isString(item)) {
            throw new JsonLdError('Invalid JSON-LD syntax; language map values must be strings.', 'jsonld.SyntaxError', {
              code: 'invalid language map value',
              languageMap: languageMap
            });
          }
          rval.push({
            '@value': item,
            '@language': key.toLowerCase()
          });
        }
      }
      return rval;
    }
    function _labelBlankNodes(issuer, element) {
      if (_isArray(element)) {
        for (var i = 0; i < element.length; ++i) {
          element[i] = _labelBlankNodes(issuer, element[i]);
        }
      } else if (_isList(element)) {
        element['@list'] = _labelBlankNodes(issuer, element['@list']);
      } else if (_isObject(element)) {
        if (_isBlankNode(element)) {
          element['@id'] = issuer.getId(element['@id']);
        }
        var keys = Object.keys(element).sort();
        for (var ki = 0; ki < keys.length; ++ki) {
          var key = keys[ki];
          if (key !== '@id') {
            element[key] = _labelBlankNodes(issuer, element[key]);
          }
        }
      }
      return element;
    }
    function _expandValue(activeCtx, activeProperty, value) {
      if (value === null || value === undefined) {
        return null;
      }
      var expandedProperty = _expandIri(activeCtx, activeProperty, {vocab: true});
      if (expandedProperty === '@id') {
        return _expandIri(activeCtx, value, {base: true});
      } else if (expandedProperty === '@type') {
        return _expandIri(activeCtx, value, {
          vocab: true,
          base: true
        });
      }
      var type = jsonld.getContextValue(activeCtx, activeProperty, '@type');
      if (type === '@id' || (expandedProperty === '@graph' && _isString(value))) {
        return {'@id': _expandIri(activeCtx, value, {base: true})};
      }
      if (type === '@vocab') {
        return {'@id': _expandIri(activeCtx, value, {
            vocab: true,
            base: true
          })};
      }
      if (_isKeyword(expandedProperty)) {
        return value;
      }
      var rval = {};
      if (type !== null) {
        rval['@type'] = type;
      } else if (_isString(value)) {
        var language = jsonld.getContextValue(activeCtx, activeProperty, '@language');
        if (language !== null) {
          rval['@language'] = language;
        }
      }
      if (['boolean', 'number', 'string'].indexOf(typeof value) === -1) {
        value = value.toString();
      }
      rval['@value'] = value;
      return rval;
    }
    function _graphToRDF(graph, issuer, options) {
      var rval = [];
      var ids = Object.keys(graph).sort();
      for (var i = 0; i < ids.length; ++i) {
        var id = ids[i];
        var node = graph[id];
        var properties = Object.keys(node).sort();
        for (var pi = 0; pi < properties.length; ++pi) {
          var property = properties[pi];
          var items = node[property];
          if (property === '@type') {
            property = RDF_TYPE;
          } else if (_isKeyword(property)) {
            continue;
          }
          for (var ii = 0; ii < items.length; ++ii) {
            var item = items[ii];
            var subject = {};
            subject.type = (id.indexOf('_:') === 0) ? 'blank node' : 'IRI';
            subject.value = id;
            if (!_isAbsoluteIri(id)) {
              continue;
            }
            var predicate = {};
            predicate.type = (property.indexOf('_:') === 0) ? 'blank node' : 'IRI';
            predicate.value = property;
            if (!_isAbsoluteIri(property)) {
              continue;
            }
            if (predicate.type === 'blank node' && !options.produceGeneralizedRdf) {
              continue;
            }
            if (_isList(item)) {
              _listToRDF(item['@list'], issuer, subject, predicate, rval);
            } else {
              var object = _objectToRDF(item);
              if (object) {
                rval.push({
                  subject: subject,
                  predicate: predicate,
                  object: object
                });
              }
            }
          }
        }
      }
      return rval;
    }
    function _listToRDF(list, issuer, subject, predicate, triples) {
      var first = {
        type: 'IRI',
        value: RDF_FIRST
      };
      var rest = {
        type: 'IRI',
        value: RDF_REST
      };
      var nil = {
        type: 'IRI',
        value: RDF_NIL
      };
      for (var i = 0; i < list.length; ++i) {
        var item = list[i];
        var blankNode = {
          type: 'blank node',
          value: issuer.getId()
        };
        triples.push({
          subject: subject,
          predicate: predicate,
          object: blankNode
        });
        subject = blankNode;
        predicate = first;
        var object = _objectToRDF(item);
        if (object) {
          triples.push({
            subject: subject,
            predicate: predicate,
            object: object
          });
        }
        predicate = rest;
      }
      triples.push({
        subject: subject,
        predicate: predicate,
        object: nil
      });
    }
    function _objectToRDF(item) {
      var object = {};
      if (_isValue(item)) {
        object.type = 'literal';
        var value = item['@value'];
        var datatype = item['@type'] || null;
        if (_isBoolean(value)) {
          object.value = value.toString();
          object.datatype = datatype || XSD_BOOLEAN;
        } else if (_isDouble(value) || datatype === XSD_DOUBLE) {
          if (!_isDouble(value)) {
            value = parseFloat(value);
          }
          object.value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');
          object.datatype = datatype || XSD_DOUBLE;
        } else if (_isNumber(value)) {
          object.value = value.toFixed(0);
          object.datatype = datatype || XSD_INTEGER;
        } else if ('@language' in item) {
          object.value = value;
          object.datatype = datatype || RDF_LANGSTRING;
          object.language = item['@language'];
        } else {
          object.value = value;
          object.datatype = datatype || XSD_STRING;
        }
      } else {
        var id = _isObject(item) ? item['@id'] : item;
        object.type = (id.indexOf('_:') === 0) ? 'blank node' : 'IRI';
        object.value = id;
      }
      if (object.type === 'IRI' && !_isAbsoluteIri(object.value)) {
        return null;
      }
      return object;
    }
    function _RDFToObject(o, useNativeTypes) {
      if (o.type === 'IRI' || o.type === 'blank node') {
        return {'@id': o.value};
      }
      var rval = {'@value': o.value};
      if (o.language) {
        rval['@language'] = o.language;
      } else {
        var type = o.datatype;
        if (!type) {
          type = XSD_STRING;
        }
        if (useNativeTypes) {
          if (type === XSD_BOOLEAN) {
            if (rval['@value'] === 'true') {
              rval['@value'] = true;
            } else if (rval['@value'] === 'false') {
              rval['@value'] = false;
            }
          } else if (_isNumeric(rval['@value'])) {
            if (type === XSD_INTEGER) {
              var i = parseInt(rval['@value'], 10);
              if (i.toFixed(0) === rval['@value']) {
                rval['@value'] = i;
              }
            } else if (type === XSD_DOUBLE) {
              rval['@value'] = parseFloat(rval['@value']);
            }
          }
          if ([XSD_BOOLEAN, XSD_INTEGER, XSD_DOUBLE, XSD_STRING].indexOf(type) === -1) {
            rval['@type'] = type;
          }
        } else if (type !== XSD_STRING) {
          rval['@type'] = type;
        }
      }
      return rval;
    }
    function _compareRDFTriples(t1, t2) {
      var attrs = ['subject', 'predicate', 'object'];
      for (var i = 0; i < attrs.length; ++i) {
        var attr = attrs[i];
        if (t1[attr].type !== t2[attr].type || t1[attr].value !== t2[attr].value) {
          return false;
        }
      }
      if (t1.object.language !== t2.object.language) {
        return false;
      }
      if (t1.object.datatype !== t2.object.datatype) {
        return false;
      }
      return true;
    }
    var URDNA2015 = (function() {
      var POSITIONS = {
        'subject': 's',
        'object': 'o',
        'name': 'g'
      };
      var Normalize = function(options) {
        options = options || {};
        this.name = 'URDNA2015';
        this.options = options;
        this.blankNodeInfo = {};
        this.hashToBlankNodes = {};
        this.canonicalIssuer = new IdentifierIssuer('_:c14n');
        this.quads = [];
        this.schedule = {};
        if ('maxCallStackDepth' in options) {
          this.schedule.MAX_DEPTH = options.maxCallStackDepth;
        } else {
          this.schedule.MAX_DEPTH = 500;
        }
        if ('maxTotalCallStackDepth' in options) {
          this.schedule.MAX_TOTAL_DEPTH = options.maxCallStackDepth;
        } else {
          this.schedule.MAX_TOTAL_DEPTH = 0xFFFFFFFF;
        }
        this.schedule.depth = 0;
        this.schedule.totalDepth = 0;
        if ('timeSlice' in options) {
          this.schedule.timeSlice = options.timeSlice;
        } else {
          this.schedule.timeSlice = 10;
        }
      };
      Normalize.prototype.doWork = function(fn, callback) {
        var schedule = this.schedule;
        if (schedule.totalDepth >= schedule.MAX_TOTAL_DEPTH) {
          return callback(new Error('Maximum total call stack depth exceeded; normalization aborting.'));
        }
        (function work() {
          if (schedule.depth === schedule.MAX_DEPTH) {
            schedule.depth = 0;
            schedule.running = false;
            return jsonld.nextTick(work);
          }
          var now = new Date().getTime();
          if (!schedule.running) {
            schedule.start = new Date().getTime();
            schedule.deadline = schedule.start + schedule.timeSlice;
          }
          if (now < schedule.deadline) {
            schedule.running = true;
            schedule.depth++;
            schedule.totalDepth++;
            return fn(function(err, result) {
              schedule.depth--;
              schedule.totalDepth--;
              callback(err, result);
            });
          }
          schedule.depth = 0;
          schedule.running = false;
          jsonld.setImmediate(work);
        })();
      };
      Normalize.prototype.forEach = function(iterable, fn, callback) {
        var self = this;
        var iterator;
        var idx = 0;
        var length;
        if (_isArray(iterable)) {
          length = iterable.length;
          iterator = function() {
            if (idx === length) {
              return false;
            }
            iterator.value = iterable[idx++];
            iterator.key = idx;
            return true;
          };
        } else {
          var keys = Object.keys(iterable);
          length = keys.length;
          iterator = function() {
            if (idx === length) {
              return false;
            }
            iterator.key = keys[idx++];
            iterator.value = iterable[iterator.key];
            return true;
          };
        }
        (function iterate(err, result) {
          if (err) {
            return callback(err);
          }
          if (iterator()) {
            return self.doWork(function() {
              fn(iterator.value, iterator.key, iterate);
            });
          }
          callback();
        })();
      };
      Normalize.prototype.waterfall = function(fns, callback) {
        var self = this;
        self.forEach(fns, function(fn, idx, callback) {
          self.doWork(fn, callback);
        }, callback);
      };
      Normalize.prototype.whilst = function(condition, fn, callback) {
        var self = this;
        (function loop(err) {
          if (err) {
            return callback(err);
          }
          if (!condition()) {
            return callback();
          }
          self.doWork(fn, loop);
        })();
      };
      Normalize.prototype.main = function(dataset, callback) {
        var self = this;
        self.schedule.start = new Date().getTime();
        var result;
        if (self.options.format) {
          if (self.options.format !== 'application/nquads') {
            return callback(new JsonLdError('Unknown output format.', 'jsonld.UnknownFormat', {format: self.options.format}));
          }
        }
        var nonNormalized = {};
        self.waterfall([function(callback) {
          self.forEach(dataset, function(triples, graphName, callback) {
            if (graphName === '@default') {
              graphName = null;
            }
            self.forEach(triples, function(quad, idx, callback) {
              if (graphName !== null) {
                if (graphName.indexOf('_:') === 0) {
                  quad.name = {
                    type: 'blank node',
                    value: graphName
                  };
                } else {
                  quad.name = {
                    type: 'IRI',
                    value: graphName
                  };
                }
              }
              self.quads.push(quad);
              self.forEachComponent(quad, function(component) {
                if (component.type !== 'blank node') {
                  return;
                }
                var id = component.value;
                if (id in self.blankNodeInfo) {
                  self.blankNodeInfo[id].quads.push(quad);
                } else {
                  nonNormalized[id] = true;
                  self.blankNodeInfo[id] = {quads: [quad]};
                }
              });
              callback();
            }, callback);
          }, callback);
        }, function(callback) {
          var simple = true;
          self.whilst(function() {
            return simple;
          }, function(callback) {
            simple = false;
            self.hashToBlankNodes = {};
            self.waterfall([function(callback) {
              self.forEach(nonNormalized, function(value, id, callback) {
                self.hashFirstDegreeQuads(id, function(err, hash) {
                  if (err) {
                    return callback(err);
                  }
                  if (hash in self.hashToBlankNodes) {
                    self.hashToBlankNodes[hash].push(id);
                  } else {
                    self.hashToBlankNodes[hash] = [id];
                  }
                  callback();
                });
              }, callback);
            }, function(callback) {
              var hashes = Object.keys(self.hashToBlankNodes).sort();
              self.forEach(hashes, function(hash, i, callback) {
                var idList = self.hashToBlankNodes[hash];
                if (idList.length > 1) {
                  return callback();
                }
                var id = idList[0];
                self.canonicalIssuer.getId(id);
                delete nonNormalized[id];
                delete self.hashToBlankNodes[hash];
                simple = true;
                callback();
              }, callback);
            }], callback);
          }, callback);
        }, function(callback) {
          var hashes = Object.keys(self.hashToBlankNodes).sort();
          self.forEach(hashes, function(hash, idx, callback) {
            var hashPathList = [];
            var idList = self.hashToBlankNodes[hash];
            self.waterfall([function(callback) {
              self.forEach(idList, function(id, idx, callback) {
                if (self.canonicalIssuer.hasId(id)) {
                  return callback();
                }
                var issuer = new IdentifierIssuer('_:b');
                issuer.getId(id);
                self.hashNDegreeQuads(id, issuer, function(err, result) {
                  if (err) {
                    return callback(err);
                  }
                  hashPathList.push(result);
                  callback();
                });
              }, callback);
            }, function(callback) {
              hashPathList.sort(function(a, b) {
                return (a.hash < b.hash) ? -1 : ((a.hash > b.hash) ? 1 : 0);
              });
              self.forEach(hashPathList, function(result, idx, callback) {
                for (var existing in result.issuer.existing) {
                  self.canonicalIssuer.getId(existing);
                }
                callback();
              }, callback);
            }], callback);
          }, callback);
        }, function(callback) {
          var normalized = [];
          self.waterfall([function(callback) {
            self.forEach(self.quads, function(quad, idx, callback) {
              self.forEachComponent(quad, function(component) {
                if (component.type === 'blank node' && component.value.indexOf(self.canonicalIssuer.prefix) !== 0) {
                  component.value = self.canonicalIssuer.getId(component.value);
                }
              });
              normalized.push(_toNQuad(quad));
              callback();
            }, callback);
          }, function(callback) {
            normalized.sort();
            if (self.options.format === 'application/nquads') {
              result = normalized.join('');
              return callback();
            }
            result = _parseNQuads(normalized.join(''));
            callback();
          }], callback);
        }], function(err) {
          callback(err, result);
        });
      };
      Normalize.prototype.hashFirstDegreeQuads = function(id, callback) {
        var self = this;
        var info = self.blankNodeInfo[id];
        if ('hash' in info) {
          return callback(null, info.hash);
        }
        var nquads = [];
        var quads = info.quads;
        self.forEach(quads, function(quad, idx, callback) {
          var copy = {predicate: quad.predicate};
          self.forEachComponent(quad, function(component, key) {
            copy[key] = self.modifyFirstDegreeComponent(id, component, key);
          });
          nquads.push(_toNQuad(copy));
          callback();
        }, function(err) {
          if (err) {
            return callback(err);
          }
          nquads.sort();
          info.hash = NormalizeHash.hashNQuads(self.name, nquads);
          callback(null, info.hash);
        });
      };
      Normalize.prototype.modifyFirstDegreeComponent = function(id, component) {
        if (component.type !== 'blank node') {
          return component;
        }
        component = _clone(component);
        component.value = (component.value === id ? '_:a' : '_:z');
        return component;
      };
      Normalize.prototype.hashRelatedBlankNode = function(related, quad, issuer, position, callback) {
        var self = this;
        var id;
        self.waterfall([function(callback) {
          if (self.canonicalIssuer.hasId(related)) {
            id = self.canonicalIssuer.getId(related);
            return callback();
          }
          if (issuer.hasId(related)) {
            id = issuer.getId(related);
            return callback();
          }
          self.hashFirstDegreeQuads(related, function(err, hash) {
            if (err) {
              return callback(err);
            }
            id = hash;
            callback();
          });
        }], function(err) {
          if (err) {
            return callback(err);
          }
          var md = new NormalizeHash(self.name);
          md.update(position);
          if (position !== 'g') {
            md.update(self.getRelatedPredicate(quad));
          }
          md.update(id);
          return callback(null, md.digest());
        });
      };
      Normalize.prototype.getRelatedPredicate = function(quad) {
        return '<' + quad.predicate.value + '>';
      };
      Normalize.prototype.hashNDegreeQuads = function(id, issuer, callback) {
        var self = this;
        var hashToRelated;
        var md = new NormalizeHash(self.name);
        self.waterfall([function(callback) {
          self.createHashToRelated(id, issuer, function(err, result) {
            if (err) {
              return callback(err);
            }
            hashToRelated = result;
            callback();
          });
        }, function(callback) {
          var hashes = Object.keys(hashToRelated).sort();
          self.forEach(hashes, function(hash, idx, callback) {
            md.update(hash);
            var chosenPath = '';
            var chosenIssuer;
            var permutator = new Permutator(hashToRelated[hash]);
            self.whilst(function() {
              return permutator.hasNext();
            }, function(nextPermutation) {
              var permutation = permutator.next();
              var issuerCopy = issuer.clone();
              var path = '';
              var recursionList = [];
              self.waterfall([function(callback) {
                self.forEach(permutation, function(related, idx, callback) {
                  if (self.canonicalIssuer.hasId(related)) {
                    path += self.canonicalIssuer.getId(related);
                  } else {
                    if (!issuerCopy.hasId(related)) {
                      recursionList.push(related);
                    }
                    path += issuerCopy.getId(related);
                  }
                  if (chosenPath.length !== 0 && path.length >= chosenPath.length && path > chosenPath) {
                    return nextPermutation();
                  }
                  callback();
                }, callback);
              }, function(callback) {
                self.forEach(recursionList, function(related, idx, callback) {
                  self.hashNDegreeQuads(related, issuerCopy, function(err, result) {
                    if (err) {
                      return callback(err);
                    }
                    path += issuerCopy.getId(related);
                    path += '<' + result.hash + '>';
                    issuerCopy = result.issuer;
                    if (chosenPath.length !== 0 && path.length >= chosenPath.length && path > chosenPath) {
                      return nextPermutation();
                    }
                    callback();
                  });
                }, callback);
              }, function(callback) {
                if (chosenPath.length === 0 || path < chosenPath) {
                  chosenPath = path;
                  chosenIssuer = issuerCopy;
                }
                callback();
              }], nextPermutation);
            }, function(err) {
              if (err) {
                return callback(err);
              }
              md.update(chosenPath);
              issuer = chosenIssuer;
              callback();
            });
          }, callback);
        }], function(err) {
          callback(err, {
            hash: md.digest(),
            issuer: issuer
          });
        });
      };
      Normalize.prototype.createHashToRelated = function(id, issuer, callback) {
        var self = this;
        var hashToRelated = {};
        var quads = self.blankNodeInfo[id].quads;
        self.forEach(quads, function(quad, idx, callback) {
          self.forEach(quad, function(component, key, callback) {
            if (key === 'predicate' || !(component.type === 'blank node' && component.value !== id)) {
              return callback();
            }
            var related = component.value;
            var position = POSITIONS[key];
            self.hashRelatedBlankNode(related, quad, issuer, position, function(err, hash) {
              if (err) {
                return callback(err);
              }
              if (hash in hashToRelated) {
                hashToRelated[hash].push(related);
              } else {
                hashToRelated[hash] = [related];
              }
              callback();
            });
          }, callback);
        }, function(err) {
          callback(err, hashToRelated);
        });
      };
      Normalize.prototype.forEachComponent = function(quad, op) {
        for (var key in quad) {
          if (key === 'predicate') {
            continue;
          }
          op(quad[key], key, quad);
        }
      };
      return Normalize;
    })();
    var URGNA2012 = (function() {
      var Normalize = function(options) {
        URDNA2015.call(this, options);
        this.name = 'URGNA2012';
      };
      Normalize.prototype = new URDNA2015();
      Normalize.prototype.modifyFirstDegreeComponent = function(id, component, key) {
        if (component.type !== 'blank node') {
          return component;
        }
        component = _clone(component);
        if (key === 'name') {
          component.value = '_:g';
        } else {
          component.value = (component.value === id ? '_:a' : '_:z');
        }
        return component;
      };
      Normalize.prototype.getRelatedPredicate = function(quad) {
        return quad.predicate.value;
      };
      Normalize.prototype.createHashToRelated = function(id, issuer, callback) {
        var self = this;
        var hashToRelated = {};
        var quads = self.blankNodeInfo[id].quads;
        self.forEach(quads, function(quad, idx, callback) {
          var position;
          var related;
          if (quad.subject.type === 'blank node' && quad.subject.value !== id) {
            related = quad.subject.value;
            position = 'p';
          } else if (quad.object.type === 'blank node' && quad.object.value !== id) {
            related = quad.object.value;
            position = 'r';
          } else {
            return callback();
          }
          self.hashRelatedBlankNode(related, quad, issuer, position, function(err, hash) {
            if (hash in hashToRelated) {
              hashToRelated[hash].push(related);
            } else {
              hashToRelated[hash] = [related];
            }
            callback();
          });
        }, function(err) {
          callback(err, hashToRelated);
        });
      };
      return Normalize;
    })();
    function _createNodeMap(input, graphs, graph, issuer, name, list) {
      if (_isArray(input)) {
        for (var i = 0; i < input.length; ++i) {
          _createNodeMap(input[i], graphs, graph, issuer, undefined, list);
        }
        return;
      }
      if (!_isObject(input)) {
        if (list) {
          list.push(input);
        }
        return;
      }
      if (_isValue(input)) {
        if ('@type' in input) {
          var type = input['@type'];
          if (type.indexOf('_:') === 0) {
            input['@type'] = type = issuer.getId(type);
          }
        }
        if (list) {
          list.push(input);
        }
        return;
      }
      if ('@type' in input) {
        var types = input['@type'];
        for (var i = 0; i < types.length; ++i) {
          var type = types[i];
          if (type.indexOf('_:') === 0) {
            issuer.getId(type);
          }
        }
      }
      if (_isUndefined(name)) {
        name = _isBlankNode(input) ? issuer.getId(input['@id']) : input['@id'];
      }
      if (list) {
        list.push({'@id': name});
      }
      var subjects = graphs[graph];
      var subject = subjects[name] = subjects[name] || {};
      subject['@id'] = name;
      var properties = Object.keys(input).sort();
      for (var pi = 0; pi < properties.length; ++pi) {
        var property = properties[pi];
        if (property === '@id') {
          continue;
        }
        if (property === '@reverse') {
          var referencedNode = {'@id': name};
          var reverseMap = input['@reverse'];
          for (var reverseProperty in reverseMap) {
            var items = reverseMap[reverseProperty];
            for (var ii = 0; ii < items.length; ++ii) {
              var item = items[ii];
              var itemName = item['@id'];
              if (_isBlankNode(item)) {
                itemName = issuer.getId(itemName);
              }
              _createNodeMap(item, graphs, graph, issuer, itemName);
              jsonld.addValue(subjects[itemName], reverseProperty, referencedNode, {
                propertyIsArray: true,
                allowDuplicate: false
              });
            }
          }
          continue;
        }
        if (property === '@graph') {
          if (!(name in graphs)) {
            graphs[name] = {};
          }
          var g = (graph === '@merged') ? graph : name;
          _createNodeMap(input[property], graphs, g, issuer);
          continue;
        }
        if (property !== '@type' && _isKeyword(property)) {
          if (property === '@index' && property in subject && (input[property] !== subject[property] || input[property]['@id'] !== subject[property]['@id'])) {
            throw new JsonLdError('Invalid JSON-LD syntax; conflicting @index property detected.', 'jsonld.SyntaxError', {
              code: 'conflicting indexes',
              subject: subject
            });
          }
          subject[property] = input[property];
          continue;
        }
        var objects = input[property];
        if (property.indexOf('_:') === 0) {
          property = issuer.getId(property);
        }
        if (objects.length === 0) {
          jsonld.addValue(subject, property, [], {propertyIsArray: true});
          continue;
        }
        for (var oi = 0; oi < objects.length; ++oi) {
          var o = objects[oi];
          if (property === '@type') {
            o = (o.indexOf('_:') === 0) ? issuer.getId(o) : o;
          }
          if (_isSubject(o) || _isSubjectReference(o)) {
            var id = _isBlankNode(o) ? issuer.getId(o['@id']) : o['@id'];
            jsonld.addValue(subject, property, {'@id': id}, {
              propertyIsArray: true,
              allowDuplicate: false
            });
            _createNodeMap(o, graphs, graph, issuer, id);
          } else if (_isList(o)) {
            var _list = [];
            _createNodeMap(o['@list'], graphs, graph, issuer, name, _list);
            o = {'@list': _list};
            jsonld.addValue(subject, property, o, {
              propertyIsArray: true,
              allowDuplicate: false
            });
          } else {
            _createNodeMap(o, graphs, graph, issuer, name);
            jsonld.addValue(subject, property, o, {
              propertyIsArray: true,
              allowDuplicate: false
            });
          }
        }
      }
    }
    function _mergeNodeMaps(graphs) {
      var defaultGraph = graphs['@default'];
      var graphNames = Object.keys(graphs).sort();
      for (var i = 0; i < graphNames.length; ++i) {
        var graphName = graphNames[i];
        if (graphName === '@default') {
          continue;
        }
        var nodeMap = graphs[graphName];
        var subject = defaultGraph[graphName];
        if (!subject) {
          defaultGraph[graphName] = subject = {
            '@id': graphName,
            '@graph': []
          };
        } else if (!('@graph' in subject)) {
          subject['@graph'] = [];
        }
        var graph = subject['@graph'];
        var ids = Object.keys(nodeMap).sort();
        for (var ii = 0; ii < ids.length; ++ii) {
          var node = nodeMap[ids[ii]];
          if (!_isSubjectReference(node)) {
            graph.push(node);
          }
        }
      }
      return defaultGraph;
    }
    function _frame(state, subjects, frame, parent, property) {
      _validateFrame(frame);
      frame = frame[0];
      var options = state.options;
      var flags = {
        embed: _getFrameFlag(frame, options, 'embed'),
        explicit: _getFrameFlag(frame, options, 'explicit'),
        requireAll: _getFrameFlag(frame, options, 'requireAll')
      };
      var matches = _filterSubjects(state, subjects, frame, flags);
      var ids = Object.keys(matches).sort();
      for (var idx = 0; idx < ids.length; ++idx) {
        var id = ids[idx];
        var subject = matches[id];
        if (flags.embed === '@link' && id in state.link) {
          _addFrameOutput(parent, property, state.link[id]);
          continue;
        }
        if (property === null) {
          state.uniqueEmbeds = {};
        }
        var output = {};
        output['@id'] = id;
        state.link[id] = output;
        if (flags.embed === '@never' || _createsCircularReference(subject, state.subjectStack)) {
          _addFrameOutput(parent, property, output);
          continue;
        }
        if (flags.embed === '@last') {
          if (id in state.uniqueEmbeds) {
            _removeEmbed(state, id);
          }
          state.uniqueEmbeds[id] = {
            parent: parent,
            property: property
          };
        }
        state.subjectStack.push(subject);
        var props = Object.keys(subject).sort();
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          if (_isKeyword(prop)) {
            output[prop] = _clone(subject[prop]);
            continue;
          }
          if (flags.explicit && !(prop in frame)) {
            continue;
          }
          var objects = subject[prop];
          for (var oi = 0; oi < objects.length; ++oi) {
            var o = objects[oi];
            if (_isList(o)) {
              var list = {'@list': []};
              _addFrameOutput(output, prop, list);
              var src = o['@list'];
              for (var n in src) {
                o = src[n];
                if (_isSubjectReference(o)) {
                  var subframe = (prop in frame ? frame[prop][0]['@list'] : _createImplicitFrame(flags));
                  _frame(state, [o['@id']], subframe, list, '@list');
                } else {
                  _addFrameOutput(list, '@list', _clone(o));
                }
              }
              continue;
            }
            if (_isSubjectReference(o)) {
              var subframe = (prop in frame ? frame[prop] : _createImplicitFrame(flags));
              _frame(state, [o['@id']], subframe, output, prop);
            } else {
              _addFrameOutput(output, prop, _clone(o));
            }
          }
        }
        var props = Object.keys(frame).sort();
        for (var i = 0; i < props.length; ++i) {
          var prop = props[i];
          if (_isKeyword(prop)) {
            continue;
          }
          var next = frame[prop][0];
          var omitDefaultOn = _getFrameFlag(next, options, 'omitDefault');
          if (!omitDefaultOn && !(prop in output)) {
            var preserve = '@null';
            if ('@default' in next) {
              preserve = _clone(next['@default']);
            }
            if (!_isArray(preserve)) {
              preserve = [preserve];
            }
            output[prop] = [{'@preserve': preserve}];
          }
        }
        _addFrameOutput(parent, property, output);
        state.subjectStack.pop();
      }
    }
    function _createImplicitFrame(flags) {
      var frame = {};
      for (var key in flags) {
        if (flags[key] !== undefined) {
          frame['@' + key] = [flags[key]];
        }
      }
      return [frame];
    }
    function _createsCircularReference(subjectToEmbed, subjectStack) {
      for (var i = subjectStack.length - 1; i >= 0; --i) {
        if (subjectStack[i]['@id'] === subjectToEmbed['@id']) {
          return true;
        }
      }
      return false;
    }
    function _getFrameFlag(frame, options, name) {
      var flag = '@' + name;
      var rval = (flag in frame ? frame[flag][0] : options[name]);
      if (name === 'embed') {
        if (rval === true) {
          rval = '@last';
        } else if (rval === false) {
          rval = '@never';
        } else if (rval !== '@always' && rval !== '@never' && rval !== '@link') {
          rval = '@last';
        }
      }
      return rval;
    }
    function _validateFrame(frame) {
      if (!_isArray(frame) || frame.length !== 1 || !_isObject(frame[0])) {
        throw new JsonLdError('Invalid JSON-LD syntax; a JSON-LD frame must be a single object.', 'jsonld.SyntaxError', {frame: frame});
      }
    }
    function _filterSubjects(state, subjects, frame, flags) {
      var rval = {};
      for (var i = 0; i < subjects.length; ++i) {
        var id = subjects[i];
        var subject = state.subjects[id];
        if (_filterSubject(subject, frame, flags)) {
          rval[id] = subject;
        }
      }
      return rval;
    }
    function _filterSubject(subject, frame, flags) {
      if ('@type' in frame && !(frame['@type'].length === 1 && _isObject(frame['@type'][0]))) {
        var types = frame['@type'];
        for (var i = 0; i < types.length; ++i) {
          if (jsonld.hasValue(subject, '@type', types[i])) {
            return true;
          }
        }
        return false;
      }
      var wildcard = true;
      var matchesSome = false;
      for (var key in frame) {
        if (_isKeyword(key)) {
          if (key !== '@id' && key !== '@type') {
            continue;
          }
          wildcard = false;
          if (key === '@id' && _isString(frame[key])) {
            if (subject[key] !== frame[key]) {
              return false;
            }
            matchesSome = true;
            continue;
          }
        }
        wildcard = false;
        if (key in subject) {
          if (_isArray(frame[key]) && frame[key].length === 0 && subject[key] !== undefined) {
            return false;
          }
          matchesSome = true;
          continue;
        }
        var hasDefault = (_isArray(frame[key]) && _isObject(frame[key][0]) && '@default' in frame[key][0]);
        if (flags.requireAll && !hasDefault) {
          return false;
        }
      }
      return wildcard || matchesSome;
    }
    function _removeEmbed(state, id) {
      var embeds = state.uniqueEmbeds;
      var embed = embeds[id];
      var parent = embed.parent;
      var property = embed.property;
      var subject = {'@id': id};
      if (_isArray(parent)) {
        for (var i = 0; i < parent.length; ++i) {
          if (jsonld.compareValues(parent[i], subject)) {
            parent[i] = subject;
            break;
          }
        }
      } else {
        var useArray = _isArray(parent[property]);
        jsonld.removeValue(parent, property, subject, {propertyIsArray: useArray});
        jsonld.addValue(parent, property, subject, {propertyIsArray: useArray});
      }
      var removeDependents = function(id) {
        var ids = Object.keys(embeds);
        for (var i = 0; i < ids.length; ++i) {
          var next = ids[i];
          if (next in embeds && _isObject(embeds[next].parent) && embeds[next].parent['@id'] === id) {
            delete embeds[next];
            removeDependents(next);
          }
        }
      };
      removeDependents(id);
    }
    function _addFrameOutput(parent, property, output) {
      if (_isObject(parent)) {
        jsonld.addValue(parent, property, output, {propertyIsArray: true});
      } else {
        parent.push(output);
      }
    }
    function _removePreserve(ctx, input, options) {
      if (_isArray(input)) {
        var output = [];
        for (var i = 0; i < input.length; ++i) {
          var result = _removePreserve(ctx, input[i], options);
          if (result !== null) {
            output.push(result);
          }
        }
        input = output;
      } else if (_isObject(input)) {
        if ('@preserve' in input) {
          if (input['@preserve'] === '@null') {
            return null;
          }
          return input['@preserve'];
        }
        if (_isValue(input)) {
          return input;
        }
        if (_isList(input)) {
          input['@list'] = _removePreserve(ctx, input['@list'], options);
          return input;
        }
        var idAlias = _compactIri(ctx, '@id');
        if (idAlias in input) {
          var id = input[idAlias];
          if (id in options.link) {
            var idx = options.link[id].indexOf(input);
            if (idx === -1) {
              options.link[id].push(input);
            } else {
              return options.link[id][idx];
            }
          } else {
            options.link[id] = [input];
          }
        }
        for (var prop in input) {
          var result = _removePreserve(ctx, input[prop], options);
          var container = jsonld.getContextValue(ctx, prop, '@container');
          if (options.compactArrays && _isArray(result) && result.length === 1 && container === null) {
            result = result[0];
          }
          input[prop] = result;
        }
      }
      return input;
    }
    function _compareShortestLeast(a, b) {
      if (a.length < b.length) {
        return -1;
      }
      if (b.length < a.length) {
        return 1;
      }
      if (a === b) {
        return 0;
      }
      return (a < b) ? -1 : 1;
    }
    function _selectTerm(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue) {
      if (typeOrLanguageValue === null) {
        typeOrLanguageValue = '@null';
      }
      var prefs = [];
      if ((typeOrLanguageValue === '@id' || typeOrLanguageValue === '@reverse') && _isSubjectReference(value)) {
        if (typeOrLanguageValue === '@reverse') {
          prefs.push('@reverse');
        }
        var term = _compactIri(activeCtx, value['@id'], null, {vocab: true});
        if (term in activeCtx.mappings && activeCtx.mappings[term] && activeCtx.mappings[term]['@id'] === value['@id']) {
          prefs.push.apply(prefs, ['@vocab', '@id']);
        } else {
          prefs.push.apply(prefs, ['@id', '@vocab']);
        }
      } else {
        prefs.push(typeOrLanguageValue);
      }
      prefs.push('@none');
      var containerMap = activeCtx.inverse[iri];
      for (var ci = 0; ci < containers.length; ++ci) {
        var container = containers[ci];
        if (!(container in containerMap)) {
          continue;
        }
        var typeOrLanguageValueMap = containerMap[container][typeOrLanguage];
        for (var pi = 0; pi < prefs.length; ++pi) {
          var pref = prefs[pi];
          if (!(pref in typeOrLanguageValueMap)) {
            continue;
          }
          return typeOrLanguageValueMap[pref];
        }
      }
      return null;
    }
    function _compactIri(activeCtx, iri, value, relativeTo, reverse) {
      if (iri === null) {
        return iri;
      }
      if (_isUndefined(value)) {
        value = null;
      }
      if (_isUndefined(reverse)) {
        reverse = false;
      }
      relativeTo = relativeTo || {};
      if (_isKeyword(iri)) {
        relativeTo.vocab = true;
      }
      if (relativeTo.vocab && iri in activeCtx.getInverse()) {
        var defaultLanguage = activeCtx['@language'] || '@none';
        var containers = [];
        if (_isObject(value) && '@index' in value) {
          containers.push('@index');
        }
        var typeOrLanguage = '@language';
        var typeOrLanguageValue = '@null';
        if (reverse) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = '@reverse';
          containers.push('@set');
        } else if (_isList(value)) {
          if (!('@index' in value)) {
            containers.push('@list');
          }
          var list = value['@list'];
          var commonLanguage = (list.length === 0) ? defaultLanguage : null;
          var commonType = null;
          for (var i = 0; i < list.length; ++i) {
            var item = list[i];
            var itemLanguage = '@none';
            var itemType = '@none';
            if (_isValue(item)) {
              if ('@language' in item) {
                itemLanguage = item['@language'];
              } else if ('@type' in item) {
                itemType = item['@type'];
              } else {
                itemLanguage = '@null';
              }
            } else {
              itemType = '@id';
            }
            if (commonLanguage === null) {
              commonLanguage = itemLanguage;
            } else if (itemLanguage !== commonLanguage && _isValue(item)) {
              commonLanguage = '@none';
            }
            if (commonType === null) {
              commonType = itemType;
            } else if (itemType !== commonType) {
              commonType = '@none';
            }
            if (commonLanguage === '@none' && commonType === '@none') {
              break;
            }
          }
          commonLanguage = commonLanguage || '@none';
          commonType = commonType || '@none';
          if (commonType !== '@none') {
            typeOrLanguage = '@type';
            typeOrLanguageValue = commonType;
          } else {
            typeOrLanguageValue = commonLanguage;
          }
        } else {
          if (_isValue(value)) {
            if ('@language' in value && !('@index' in value)) {
              containers.push('@language');
              typeOrLanguageValue = value['@language'];
            } else if ('@type' in value) {
              typeOrLanguage = '@type';
              typeOrLanguageValue = value['@type'];
            }
          } else {
            typeOrLanguage = '@type';
            typeOrLanguageValue = '@id';
          }
          containers.push('@set');
        }
        containers.push('@none');
        var term = _selectTerm(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue);
        if (term !== null) {
          return term;
        }
      }
      if (relativeTo.vocab) {
        if ('@vocab' in activeCtx) {
          var vocab = activeCtx['@vocab'];
          if (iri.indexOf(vocab) === 0 && iri !== vocab) {
            var suffix = iri.substr(vocab.length);
            if (!(suffix in activeCtx.mappings)) {
              return suffix;
            }
          }
        }
      }
      var choice = null;
      for (var term in activeCtx.mappings) {
        if (term.indexOf(':') !== -1) {
          continue;
        }
        var definition = activeCtx.mappings[term];
        if (!definition || definition['@id'] === iri || iri.indexOf(definition['@id']) !== 0) {
          continue;
        }
        var curie = term + ':' + iri.substr(definition['@id'].length);
        var isUsableCurie = (!(curie in activeCtx.mappings) || (value === null && activeCtx.mappings[curie] && activeCtx.mappings[curie]['@id'] === iri));
        if (isUsableCurie && (choice === null || _compareShortestLeast(curie, choice) < 0)) {
          choice = curie;
        }
      }
      if (choice !== null) {
        return choice;
      }
      if (!relativeTo.vocab) {
        return _removeBase(activeCtx['@base'], iri);
      }
      return iri;
    }
    function _compactValue(activeCtx, activeProperty, value) {
      if (_isValue(value)) {
        var type = jsonld.getContextValue(activeCtx, activeProperty, '@type');
        var language = jsonld.getContextValue(activeCtx, activeProperty, '@language');
        var container = jsonld.getContextValue(activeCtx, activeProperty, '@container');
        var preserveIndex = (('@index' in value) && container !== '@index');
        if (!preserveIndex) {
          if (value['@type'] === type || value['@language'] === language) {
            return value['@value'];
          }
        }
        var keyCount = Object.keys(value).length;
        var isValueOnlyKey = (keyCount === 1 || (keyCount === 2 && ('@index' in value) && !preserveIndex));
        var hasDefaultLanguage = ('@language' in activeCtx);
        var isValueString = _isString(value['@value']);
        var hasNullMapping = (activeCtx.mappings[activeProperty] && activeCtx.mappings[activeProperty]['@language'] === null);
        if (isValueOnlyKey && (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
          return value['@value'];
        }
        var rval = {};
        if (preserveIndex) {
          rval[_compactIri(activeCtx, '@index')] = value['@index'];
        }
        if ('@type' in value) {
          rval[_compactIri(activeCtx, '@type')] = _compactIri(activeCtx, value['@type'], null, {vocab: true});
        } else if ('@language' in value) {
          rval[_compactIri(activeCtx, '@language')] = value['@language'];
        }
        rval[_compactIri(activeCtx, '@value')] = value['@value'];
        return rval;
      }
      var expandedProperty = _expandIri(activeCtx, activeProperty, {vocab: true});
      var type = jsonld.getContextValue(activeCtx, activeProperty, '@type');
      var compacted = _compactIri(activeCtx, value['@id'], null, {vocab: type === '@vocab'});
      if (type === '@id' || type === '@vocab' || expandedProperty === '@graph') {
        return compacted;
      }
      var rval = {};
      rval[_compactIri(activeCtx, '@id')] = compacted;
      return rval;
    }
    function _createTermDefinition(activeCtx, localCtx, term, defined) {
      if (term in defined) {
        if (defined[term]) {
          return;
        }
        throw new JsonLdError('Cyclical context definition detected.', 'jsonld.CyclicalContext', {
          code: 'cyclic IRI mapping',
          context: localCtx,
          term: term
        });
      }
      defined[term] = false;
      if (_isKeyword(term)) {
        throw new JsonLdError('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
          code: 'keyword redefinition',
          context: localCtx,
          term: term
        });
      }
      if (term === '') {
        throw new JsonLdError('Invalid JSON-LD syntax; a term cannot be an empty string.', 'jsonld.SyntaxError', {
          code: 'invalid term definition',
          context: localCtx
        });
      }
      if (activeCtx.mappings[term]) {
        delete activeCtx.mappings[term];
      }
      var value = localCtx[term];
      if (value === null || (_isObject(value) && value['@id'] === null)) {
        activeCtx.mappings[term] = null;
        defined[term] = true;
        return;
      }
      if (_isString(value)) {
        value = {'@id': value};
      }
      if (!_isObject(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; @context property values must be ' + 'strings or objects.', 'jsonld.SyntaxError', {
          code: 'invalid term definition',
          context: localCtx
        });
      }
      var mapping = activeCtx.mappings[term] = {};
      mapping.reverse = false;
      if ('@reverse' in value) {
        if ('@id' in value) {
          throw new JsonLdError('Invalid JSON-LD syntax; a @reverse term definition must not ' + 'contain @id.', 'jsonld.SyntaxError', {
            code: 'invalid reverse property',
            context: localCtx
          });
        }
        var reverse = value['@reverse'];
        if (!_isString(reverse)) {
          throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be a string.', 'jsonld.SyntaxError', {
            code: 'invalid IRI mapping',
            context: localCtx
          });
        }
        var id = _expandIri(activeCtx, reverse, {
          vocab: true,
          base: false
        }, localCtx, defined);
        if (!_isAbsoluteIri(id)) {
          throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be an ' + 'absolute IRI or a blank node identifier.', 'jsonld.SyntaxError', {
            code: 'invalid IRI mapping',
            context: localCtx
          });
        }
        mapping['@id'] = id;
        mapping.reverse = true;
      } else if ('@id' in value) {
        var id = value['@id'];
        if (!_isString(id)) {
          throw new JsonLdError('Invalid JSON-LD syntax; a @context @id value must be an array ' + 'of strings or a string.', 'jsonld.SyntaxError', {
            code: 'invalid IRI mapping',
            context: localCtx
          });
        }
        if (id !== term) {
          id = _expandIri(activeCtx, id, {
            vocab: true,
            base: false
          }, localCtx, defined);
          if (!_isAbsoluteIri(id) && !_isKeyword(id)) {
            throw new JsonLdError('Invalid JSON-LD syntax; a @context @id value must be an ' + 'absolute IRI, a blank node identifier, or a keyword.', 'jsonld.SyntaxError', {
              code: 'invalid IRI mapping',
              context: localCtx
            });
          }
          mapping['@id'] = id;
        }
      }
      if (!('@id' in mapping)) {
        var colon = term.indexOf(':');
        if (colon !== -1) {
          var prefix = term.substr(0, colon);
          if (prefix in localCtx) {
            _createTermDefinition(activeCtx, localCtx, prefix, defined);
          }
          if (activeCtx.mappings[prefix]) {
            var suffix = term.substr(colon + 1);
            mapping['@id'] = activeCtx.mappings[prefix]['@id'] + suffix;
          } else {
            mapping['@id'] = term;
          }
        } else {
          if (!('@vocab' in activeCtx)) {
            throw new JsonLdError('Invalid JSON-LD syntax; @context terms must define an @id.', 'jsonld.SyntaxError', {
              code: 'invalid IRI mapping',
              context: localCtx,
              term: term
            });
          }
          mapping['@id'] = activeCtx['@vocab'] + term;
        }
      }
      defined[term] = true;
      if ('@type' in value) {
        var type = value['@type'];
        if (!_isString(type)) {
          throw new JsonLdError('Invalid JSON-LD syntax; an @context @type values must be a string.', 'jsonld.SyntaxError', {
            code: 'invalid type mapping',
            context: localCtx
          });
        }
        if (type !== '@id' && type !== '@vocab') {
          type = _expandIri(activeCtx, type, {
            vocab: true,
            base: false
          }, localCtx, defined);
          if (!_isAbsoluteIri(type)) {
            throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must be an ' + 'absolute IRI.', 'jsonld.SyntaxError', {
              code: 'invalid type mapping',
              context: localCtx
            });
          }
          if (type.indexOf('_:') === 0) {
            throw new JsonLdError('Invalid JSON-LD syntax; an @context @type values must be an IRI, ' + 'not a blank node identifier.', 'jsonld.SyntaxError', {
              code: 'invalid type mapping',
              context: localCtx
            });
          }
        }
        mapping['@type'] = type;
      }
      if ('@container' in value) {
        var container = value['@container'];
        if (container !== '@list' && container !== '@set' && container !== '@index' && container !== '@language') {
          throw new JsonLdError('Invalid JSON-LD syntax; @context @container value must be ' + 'one of the following: @list, @set, @index, or @language.', 'jsonld.SyntaxError', {
            code: 'invalid container mapping',
            context: localCtx
          });
        }
        if (mapping.reverse && container !== '@index' && container !== '@set' && container !== null) {
          throw new JsonLdError('Invalid JSON-LD syntax; @context @container value for a @reverse ' + 'type definition must be @index or @set.', 'jsonld.SyntaxError', {
            code: 'invalid reverse property',
            context: localCtx
          });
        }
        mapping['@container'] = container;
      }
      if ('@language' in value && !('@type' in value)) {
        var language = value['@language'];
        if (language !== null && !_isString(language)) {
          throw new JsonLdError('Invalid JSON-LD syntax; @context @language value must be ' + 'a string or null.', 'jsonld.SyntaxError', {
            code: 'invalid language mapping',
            context: localCtx
          });
        }
        if (language !== null) {
          language = language.toLowerCase();
        }
        mapping['@language'] = language;
      }
      var id = mapping['@id'];
      if (id === '@context' || id === '@preserve') {
        throw new JsonLdError('Invalid JSON-LD syntax; @context and @preserve cannot be aliased.', 'jsonld.SyntaxError', {
          code: 'invalid keyword alias',
          context: localCtx
        });
      }
    }
    function _expandIri(activeCtx, value, relativeTo, localCtx, defined) {
      if (value === null || _isKeyword(value)) {
        return value;
      }
      value = String(value);
      if (localCtx && value in localCtx && defined[value] !== true) {
        _createTermDefinition(activeCtx, localCtx, value, defined);
      }
      relativeTo = relativeTo || {};
      if (relativeTo.vocab) {
        var mapping = activeCtx.mappings[value];
        if (mapping === null) {
          return null;
        }
        if (mapping) {
          return mapping['@id'];
        }
      }
      var colon = value.indexOf(':');
      if (colon !== -1) {
        var prefix = value.substr(0, colon);
        var suffix = value.substr(colon + 1);
        if (prefix === '_' || suffix.indexOf('//') === 0) {
          return value;
        }
        if (localCtx && prefix in localCtx) {
          _createTermDefinition(activeCtx, localCtx, prefix, defined);
        }
        var mapping = activeCtx.mappings[prefix];
        if (mapping) {
          return mapping['@id'] + suffix;
        }
        return value;
      }
      if (relativeTo.vocab && '@vocab' in activeCtx) {
        return activeCtx['@vocab'] + value;
      }
      var rval = value;
      if (relativeTo.base) {
        rval = jsonld.prependBase(activeCtx['@base'], rval);
      }
      return rval;
    }
    function _prependBase(base, iri) {
      if (base === null) {
        return iri;
      }
      if (iri.indexOf(':') !== -1) {
        return iri;
      }
      if (_isString(base)) {
        base = jsonld.url.parse(base || '');
      }
      var rel = jsonld.url.parse(iri);
      var transform = {protocol: base.protocol || ''};
      if (rel.authority !== null) {
        transform.authority = rel.authority;
        transform.path = rel.path;
        transform.query = rel.query;
      } else {
        transform.authority = base.authority;
        if (rel.path === '') {
          transform.path = base.path;
          if (rel.query !== null) {
            transform.query = rel.query;
          } else {
            transform.query = base.query;
          }
        } else {
          if (rel.path.indexOf('/') === 0) {
            transform.path = rel.path;
          } else {
            var path = base.path;
            if (rel.path !== '') {
              path = path.substr(0, path.lastIndexOf('/') + 1);
              if (path.length > 0 && path.substr(-1) !== '/') {
                path += '/';
              }
              path += rel.path;
            }
            transform.path = path;
          }
          transform.query = rel.query;
        }
      }
      transform.path = _removeDotSegments(transform.path, !!transform.authority);
      var rval = transform.protocol;
      if (transform.authority !== null) {
        rval += '//' + transform.authority;
      }
      rval += transform.path;
      if (transform.query !== null) {
        rval += '?' + transform.query;
      }
      if (rel.fragment !== null) {
        rval += '#' + rel.fragment;
      }
      if (rval === '') {
        rval = './';
      }
      return rval;
    }
    function _removeBase(base, iri) {
      if (base === null) {
        return iri;
      }
      if (_isString(base)) {
        base = jsonld.url.parse(base || '');
      }
      var root = '';
      if (base.href !== '') {
        root += (base.protocol || '') + '//' + (base.authority || '');
      } else if (iri.indexOf('//')) {
        root += '//';
      }
      if (iri.indexOf(root) !== 0) {
        return iri;
      }
      var rel = jsonld.url.parse(iri.substr(root.length));
      var baseSegments = base.normalizedPath.split('/');
      var iriSegments = rel.normalizedPath.split('/');
      var last = (rel.fragment || rel.query) ? 0 : 1;
      while (baseSegments.length > 0 && iriSegments.length > last) {
        if (baseSegments[0] !== iriSegments[0]) {
          break;
        }
        baseSegments.shift();
        iriSegments.shift();
      }
      var rval = '';
      if (baseSegments.length > 0) {
        baseSegments.pop();
        for (var i = 0; i < baseSegments.length; ++i) {
          rval += '../';
        }
      }
      rval += iriSegments.join('/');
      if (rel.query !== null) {
        rval += '?' + rel.query;
      }
      if (rel.fragment !== null) {
        rval += '#' + rel.fragment;
      }
      if (rval === '') {
        rval = './';
      }
      return rval;
    }
    function _getInitialContext(options) {
      var base = jsonld.url.parse(options.base || '');
      return {
        '@base': base,
        mappings: {},
        inverse: null,
        getInverse: _createInverseContext,
        clone: _cloneActiveContext
      };
      function _createInverseContext() {
        var activeCtx = this;
        if (activeCtx.inverse) {
          return activeCtx.inverse;
        }
        var inverse = activeCtx.inverse = {};
        var defaultLanguage = activeCtx['@language'] || '@none';
        var mappings = activeCtx.mappings;
        var terms = Object.keys(mappings).sort(_compareShortestLeast);
        for (var i = 0; i < terms.length; ++i) {
          var term = terms[i];
          var mapping = mappings[term];
          if (mapping === null) {
            continue;
          }
          var container = mapping['@container'] || '@none';
          var ids = mapping['@id'];
          if (!_isArray(ids)) {
            ids = [ids];
          }
          for (var ii = 0; ii < ids.length; ++ii) {
            var iri = ids[ii];
            var entry = inverse[iri];
            if (!entry) {
              inverse[iri] = entry = {};
            }
            if (!entry[container]) {
              entry[container] = {
                '@language': {},
                '@type': {}
              };
            }
            entry = entry[container];
            if (mapping.reverse) {
              _addPreferredTerm(mapping, term, entry['@type'], '@reverse');
            } else if ('@type' in mapping) {
              _addPreferredTerm(mapping, term, entry['@type'], mapping['@type']);
            } else if ('@language' in mapping) {
              var language = mapping['@language'] || '@null';
              _addPreferredTerm(mapping, term, entry['@language'], language);
            } else {
              _addPreferredTerm(mapping, term, entry['@language'], defaultLanguage);
              _addPreferredTerm(mapping, term, entry['@type'], '@none');
              _addPreferredTerm(mapping, term, entry['@language'], '@none');
            }
          }
        }
        return inverse;
      }
      function _addPreferredTerm(mapping, term, entry, typeOrLanguageValue) {
        if (!(typeOrLanguageValue in entry)) {
          entry[typeOrLanguageValue] = term;
        }
      }
      function _cloneActiveContext() {
        var child = {};
        child['@base'] = this['@base'];
        child.mappings = _clone(this.mappings);
        child.clone = this.clone;
        child.inverse = null;
        child.getInverse = this.getInverse;
        if ('@language' in this) {
          child['@language'] = this['@language'];
        }
        if ('@vocab' in this) {
          child['@vocab'] = this['@vocab'];
        }
        return child;
      }
    }
    function _isKeyword(v) {
      if (!_isString(v)) {
        return false;
      }
      switch (v) {
        case '@base':
        case '@context':
        case '@container':
        case '@default':
        case '@embed':
        case '@explicit':
        case '@graph':
        case '@id':
        case '@index':
        case '@language':
        case '@list':
        case '@omitDefault':
        case '@preserve':
        case '@requireAll':
        case '@reverse':
        case '@set':
        case '@type':
        case '@value':
        case '@vocab':
          return true;
      }
      return false;
    }
    function _isObject(v) {
      return (Object.prototype.toString.call(v) === '[object Object]');
    }
    function _isEmptyObject(v) {
      return _isObject(v) && Object.keys(v).length === 0;
    }
    function _isArray(v) {
      return Array.isArray(v);
    }
    function _validateTypeValue(v) {
      if (_isString(v) || _isEmptyObject(v)) {
        return;
      }
      var isValid = false;
      if (_isArray(v)) {
        isValid = true;
        for (var i = 0; i < v.length; ++i) {
          if (!(_isString(v[i]))) {
            isValid = false;
            break;
          }
        }
      }
      if (!isValid) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@type" value must a string, an array of ' + 'strings, or an empty object.', 'jsonld.SyntaxError', {
          code: 'invalid type value',
          value: v
        });
      }
    }
    function _isString(v) {
      return (typeof v === 'string' || Object.prototype.toString.call(v) === '[object String]');
    }
    function _isNumber(v) {
      return (typeof v === 'number' || Object.prototype.toString.call(v) === '[object Number]');
    }
    function _isDouble(v) {
      return _isNumber(v) && String(v).indexOf('.') !== -1;
    }
    function _isNumeric(v) {
      return !isNaN(parseFloat(v)) && isFinite(v);
    }
    function _isBoolean(v) {
      return (typeof v === 'boolean' || Object.prototype.toString.call(v) === '[object Boolean]');
    }
    function _isUndefined(v) {
      return (typeof v === 'undefined');
    }
    function _isSubject(v) {
      var rval = false;
      if (_isObject(v) && !(('@value' in v) || ('@set' in v) || ('@list' in v))) {
        var keyCount = Object.keys(v).length;
        rval = (keyCount > 1 || !('@id' in v));
      }
      return rval;
    }
    function _isSubjectReference(v) {
      return (_isObject(v) && Object.keys(v).length === 1 && ('@id' in v));
    }
    function _isValue(v) {
      return _isObject(v) && ('@value' in v);
    }
    function _isList(v) {
      return _isObject(v) && ('@list' in v);
    }
    function _isBlankNode(v) {
      var rval = false;
      if (_isObject(v)) {
        if ('@id' in v) {
          rval = (v['@id'].indexOf('_:') === 0);
        } else {
          rval = (Object.keys(v).length === 0 || !(('@value' in v) || ('@set' in v) || ('@list' in v)));
        }
      }
      return rval;
    }
    function _isAbsoluteIri(v) {
      return _isString(v) && v.indexOf(':') !== -1;
    }
    function _clone(value) {
      if (value && typeof value === 'object') {
        var rval;
        if (_isArray(value)) {
          rval = [];
          for (var i = 0; i < value.length; ++i) {
            rval[i] = _clone(value[i]);
          }
        } else if (_isObject(value)) {
          rval = {};
          for (var key in value) {
            rval[key] = _clone(value[key]);
          }
        } else {
          rval = value.toString();
        }
        return rval;
      }
      return value;
    }
    function _findContextUrls(input, urls, replace, base) {
      var count = Object.keys(urls).length;
      if (_isArray(input)) {
        for (var i = 0; i < input.length; ++i) {
          _findContextUrls(input[i], urls, replace, base);
        }
        return (count < Object.keys(urls).length);
      } else if (_isObject(input)) {
        for (var key in input) {
          if (key !== '@context') {
            _findContextUrls(input[key], urls, replace, base);
            continue;
          }
          var ctx = input[key];
          if (_isArray(ctx)) {
            var length = ctx.length;
            for (var i = 0; i < length; ++i) {
              var _ctx = ctx[i];
              if (_isString(_ctx)) {
                _ctx = jsonld.prependBase(base, _ctx);
                if (replace) {
                  _ctx = urls[_ctx];
                  if (_isArray(_ctx)) {
                    Array.prototype.splice.apply(ctx, [i, 1].concat(_ctx));
                    i += _ctx.length - 1;
                    length = ctx.length;
                  } else {
                    ctx[i] = _ctx;
                  }
                } else if (!(_ctx in urls)) {
                  urls[_ctx] = false;
                }
              }
            }
          } else if (_isString(ctx)) {
            ctx = jsonld.prependBase(base, ctx);
            if (replace) {
              input[key] = urls[ctx];
            } else if (!(ctx in urls)) {
              urls[ctx] = false;
            }
          }
        }
        return (count < Object.keys(urls).length);
      }
      return false;
    }
    function _retrieveContextUrls(input, options, callback) {
      var error = null;
      var documentLoader = options.documentLoader;
      var retrieve = function(input, cycles, documentLoader, base, callback) {
        if (Object.keys(cycles).length > MAX_CONTEXT_URLS) {
          error = new JsonLdError('Maximum number of @context URLs exceeded.', 'jsonld.ContextUrlError', {
            code: 'loading remote context failed',
            max: MAX_CONTEXT_URLS
          });
          return callback(error);
        }
        var urls = {};
        var finished = function() {
          _findContextUrls(input, urls, true, base);
          callback(null, input);
        };
        if (!_findContextUrls(input, urls, false, base)) {
          finished();
        }
        var queue = [];
        for (var url in urls) {
          if (urls[url] === false) {
            queue.push(url);
          }
        }
        var count = queue.length;
        for (var i = 0; i < queue.length; ++i) {
          (function(url) {
            if (url in cycles) {
              error = new JsonLdError('Cyclical @context URLs detected.', 'jsonld.ContextUrlError', {
                code: 'recursive context inclusion',
                url: url
              });
              return callback(error);
            }
            var _cycles = _clone(cycles);
            _cycles[url] = true;
            var done = function(err, remoteDoc) {
              if (error) {
                return;
              }
              var ctx = remoteDoc ? remoteDoc.document : null;
              if (!err && _isString(ctx)) {
                try {
                  ctx = JSON.parse(ctx);
                } catch (ex) {
                  err = ex;
                }
              }
              if (err) {
                err = new JsonLdError('Dereferencing a URL did not result in a valid JSON-LD object. ' + 'Possible causes are an inaccessible URL perhaps due to ' + 'a same-origin policy (ensure the server uses CORS if you are ' + 'using client-side JavaScript), too many redirects, a ' + 'non-JSON response, or more than one HTTP Link Header was ' + 'provided for a remote context.', 'jsonld.InvalidUrl', {
                  code: 'loading remote context failed',
                  url: url,
                  cause: err
                });
              } else if (!_isObject(ctx)) {
                err = new JsonLdError('Dereferencing a URL did not result in a JSON object. The ' + 'response was valid JSON, but it was not a JSON object.', 'jsonld.InvalidUrl', {
                  code: 'invalid remote context',
                  url: url,
                  cause: err
                });
              }
              if (err) {
                error = err;
                return callback(error);
              }
              if (!('@context' in ctx)) {
                ctx = {'@context': {}};
              } else {
                ctx = {'@context': ctx['@context']};
              }
              if (remoteDoc.contextUrl) {
                if (!_isArray(ctx['@context'])) {
                  ctx['@context'] = [ctx['@context']];
                }
                ctx['@context'].push(remoteDoc.contextUrl);
              }
              retrieve(ctx, _cycles, documentLoader, url, function(err, ctx) {
                if (err) {
                  return callback(err);
                }
                urls[url] = ctx['@context'];
                count -= 1;
                if (count === 0) {
                  finished();
                }
              });
            };
            var promise = documentLoader(url, done);
            if (promise && 'then' in promise) {
              promise.then(done.bind(null, null), done);
            }
          }(queue[i]));
        }
      };
      retrieve(input, {}, documentLoader, options.base, callback);
    }
    if (!Object.keys) {
      Object.keys = function(o) {
        if (o !== Object(o)) {
          throw new TypeError('Object.keys called on non-object');
        }
        var rval = [];
        for (var p in o) {
          if (Object.prototype.hasOwnProperty.call(o, p)) {
            rval.push(p);
          }
        }
        return rval;
      };
    }
    function _parseNQuads(input) {
      var iri = '(?:<([^:]+:[^>]*)>)';
      var bnode = '(_:(?:[A-Za-z0-9]+))';
      var plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
      var datatype = '(?:\\^\\^' + iri + ')';
      var language = '(?:@([a-z]+(?:-[a-z0-9]+)*))';
      var literal = '(?:' + plain + '(?:' + datatype + '|' + language + ')?)';
      var comment = '(?:#.*)?';
      var ws = '[ \\t]+';
      var wso = '[ \\t]*';
      var eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
      var empty = new RegExp('^' + wso + comment + '$');
      var subject = '(?:' + iri + '|' + bnode + ')' + ws;
      var property = iri + ws;
      var object = '(?:' + iri + '|' + bnode + '|' + literal + ')' + wso;
      var graphName = '(?:\\.|(?:(?:' + iri + '|' + bnode + ')' + wso + '\\.))';
      var quad = new RegExp('^' + wso + subject + property + object + graphName + wso + comment + '$');
      var dataset = {};
      var lines = input.split(eoln);
      var lineNumber = 0;
      for (var li = 0; li < lines.length; ++li) {
        var line = lines[li];
        lineNumber++;
        if (empty.test(line)) {
          continue;
        }
        var match = line.match(quad);
        if (match === null) {
          throw new JsonLdError('Error while parsing N-Quads; invalid quad.', 'jsonld.ParseError', {line: lineNumber});
        }
        var triple = {};
        if (!_isUndefined(match[1])) {
          triple.subject = {
            type: 'IRI',
            value: match[1]
          };
        } else {
          triple.subject = {
            type: 'blank node',
            value: match[2]
          };
        }
        triple.predicate = {
          type: 'IRI',
          value: match[3]
        };
        if (!_isUndefined(match[4])) {
          triple.object = {
            type: 'IRI',
            value: match[4]
          };
        } else if (!_isUndefined(match[5])) {
          triple.object = {
            type: 'blank node',
            value: match[5]
          };
        } else {
          triple.object = {type: 'literal'};
          if (!_isUndefined(match[7])) {
            triple.object.datatype = match[7];
          } else if (!_isUndefined(match[8])) {
            triple.object.datatype = RDF_LANGSTRING;
            triple.object.language = match[8];
          } else {
            triple.object.datatype = XSD_STRING;
          }
          var unescaped = match[6].replace(/\\"/g, '"').replace(/\\t/g, '\t').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\\\/g, '\\');
          triple.object.value = unescaped;
        }
        var name = '@default';
        if (!_isUndefined(match[9])) {
          name = match[9];
        } else if (!_isUndefined(match[10])) {
          name = match[10];
        }
        if (!(name in dataset)) {
          dataset[name] = [triple];
        } else {
          var unique = true;
          var triples = dataset[name];
          for (var ti = 0; unique && ti < triples.length; ++ti) {
            if (_compareRDFTriples(triples[ti], triple)) {
              unique = false;
            }
          }
          if (unique) {
            triples.push(triple);
          }
        }
      }
      return dataset;
    }
    jsonld.registerRDFParser('application/nquads', _parseNQuads);
    function _toNQuads(dataset) {
      var quads = [];
      for (var graphName in dataset) {
        var triples = dataset[graphName];
        for (var ti = 0; ti < triples.length; ++ti) {
          var triple = triples[ti];
          if (graphName === '@default') {
            graphName = null;
          }
          quads.push(_toNQuad(triple, graphName));
        }
      }
      return quads.sort().join('');
    }
    function _toNQuad(triple, graphName) {
      var s = triple.subject;
      var p = triple.predicate;
      var o = triple.object;
      var g = graphName || null;
      if ('name' in triple && triple.name) {
        g = triple.name.value;
      }
      var quad = '';
      if (s.type === 'IRI') {
        quad += '<' + s.value + '>';
      } else {
        quad += s.value;
      }
      quad += ' ';
      if (p.type === 'IRI') {
        quad += '<' + p.value + '>';
      } else {
        quad += p.value;
      }
      quad += ' ';
      if (o.type === 'IRI') {
        quad += '<' + o.value + '>';
      } else if (o.type === 'blank node') {
        quad += o.value;
      } else {
        var escaped = o.value.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\"/g, '\\"');
        quad += '"' + escaped + '"';
        if (o.datatype === RDF_LANGSTRING) {
          if (o.language) {
            quad += '@' + o.language;
          }
        } else if (o.datatype !== XSD_STRING) {
          quad += '^^<' + o.datatype + '>';
        }
      }
      if (g !== null && g !== undefined) {
        if (g.indexOf('_:') !== 0) {
          quad += ' <' + g + '>';
        } else {
          quad += ' ' + g;
        }
      }
      quad += ' .\n';
      return quad;
    }
    function _parseRdfaApiData(data) {
      var dataset = {};
      dataset['@default'] = [];
      var subjects = data.getSubjects();
      for (var si = 0; si < subjects.length; ++si) {
        var subject = subjects[si];
        if (subject === null) {
          continue;
        }
        var triples = data.getSubjectTriples(subject);
        if (triples === null) {
          continue;
        }
        var predicates = triples.predicates;
        for (var predicate in predicates) {
          var objects = predicates[predicate].objects;
          for (var oi = 0; oi < objects.length; ++oi) {
            var object = objects[oi];
            var triple = {};
            if (subject.indexOf('_:') === 0) {
              triple.subject = {
                type: 'blank node',
                value: subject
              };
            } else {
              triple.subject = {
                type: 'IRI',
                value: subject
              };
            }
            if (predicate.indexOf('_:') === 0) {
              triple.predicate = {
                type: 'blank node',
                value: predicate
              };
            } else {
              triple.predicate = {
                type: 'IRI',
                value: predicate
              };
            }
            var value = object.value;
            if (object.type === RDF_XML_LITERAL) {
              if (!XMLSerializer) {
                _defineXMLSerializer();
              }
              var serializer = new XMLSerializer();
              value = '';
              for (var x = 0; x < object.value.length; x++) {
                if (object.value[x].nodeType === Node.ELEMENT_NODE) {
                  value += serializer.serializeToString(object.value[x]);
                } else if (object.value[x].nodeType === Node.TEXT_NODE) {
                  value += object.value[x].nodeValue;
                }
              }
            }
            triple.object = {};
            if (object.type === RDF_OBJECT) {
              if (object.value.indexOf('_:') === 0) {
                triple.object.type = 'blank node';
              } else {
                triple.object.type = 'IRI';
              }
            } else {
              triple.object.type = 'literal';
              if (object.type === RDF_PLAIN_LITERAL) {
                if (object.language) {
                  triple.object.datatype = RDF_LANGSTRING;
                  triple.object.language = object.language;
                } else {
                  triple.object.datatype = XSD_STRING;
                }
              } else {
                triple.object.datatype = object.type;
              }
            }
            triple.object.value = value;
            dataset['@default'].push(triple);
          }
        }
      }
      return dataset;
    }
    jsonld.registerRDFParser('rdfa-api', _parseRdfaApiData);
    function IdentifierIssuer(prefix) {
      this.prefix = prefix;
      this.counter = 0;
      this.existing = {};
    }
    jsonld.IdentifierIssuer = IdentifierIssuer;
    jsonld.UniqueNamer = IdentifierIssuer;
    IdentifierIssuer.prototype.clone = function() {
      var copy = new IdentifierIssuer(this.prefix);
      copy.counter = this.counter;
      copy.existing = _clone(this.existing);
      return copy;
    };
    IdentifierIssuer.prototype.getId = function(old) {
      if (old && old in this.existing) {
        return this.existing[old];
      }
      var identifier = this.prefix + this.counter;
      this.counter += 1;
      if (old) {
        this.existing[old] = identifier;
      }
      return identifier;
    };
    IdentifierIssuer.prototype.getName = IdentifierIssuer.prototype.getName;
    IdentifierIssuer.prototype.hasId = function(old) {
      return (old in this.existing);
    };
    IdentifierIssuer.prototype.isNamed = IdentifierIssuer.prototype.hasId;
    var Permutator = function(list) {
      this.list = list.sort();
      this.done = false;
      this.left = {};
      for (var i = 0; i < list.length; ++i) {
        this.left[list[i]] = true;
      }
    };
    Permutator.prototype.hasNext = function() {
      return !this.done;
    };
    Permutator.prototype.next = function() {
      var rval = this.list.slice();
      var k = null;
      var pos = 0;
      var length = this.list.length;
      for (var i = 0; i < length; ++i) {
        var element = this.list[i];
        var left = this.left[element];
        if ((k === null || element > k) && ((left && i > 0 && element > this.list[i - 1]) || (!left && i < (length - 1) && element > this.list[i + 1]))) {
          k = element;
          pos = i;
        }
      }
      if (k === null) {
        this.done = true;
      } else {
        var swap = this.left[k] ? pos - 1 : pos + 1;
        this.list[pos] = this.list[swap];
        this.list[swap] = k;
        for (var i = 0; i < length; ++i) {
          if (this.list[i] > k) {
            this.left[this.list[i]] = !this.left[this.list[i]];
          }
        }
      }
      return rval;
    };
    var NormalizeHash = function(algorithm) {
      if (!(this instanceof NormalizeHash)) {
        return new NormalizeHash(algorithm);
      }
      if (['URDNA2015', 'URGNA2012'].indexOf(algorithm) === -1) {
        throw new Error('Invalid RDF Dataset Normalization algorithm: ' + algorithm);
      }
      NormalizeHash._init.call(this, algorithm);
    };
    NormalizeHash.hashNQuads = function(algorithm, nquads) {
      var md = new NormalizeHash(algorithm);
      for (var i = 0; i < nquads.length; ++i) {
        md.update(nquads[i]);
      }
      return md.digest();
    };
    (function(_nodejs) {
      if (_nodejs) {
        var crypto = require('crypto');
        NormalizeHash._init = function(algorithm) {
          if (algorithm === 'URDNA2015') {
            algorithm = 'sha256';
          } else {
            algorithm = 'sha1';
          }
          this.md = crypto.createHash(algorithm);
        };
        NormalizeHash.prototype.update = function(msg) {
          return this.md.update(msg, 'utf8');
        };
        NormalizeHash.prototype.digest = function() {
          return this.md.digest('hex');
        };
        return;
      }
      NormalizeHash._init = function(algorithm) {
        if (algorithm === 'URDNA2015') {
          algorithm = new sha256.Algorithm();
        } else {
          algorithm = new sha1.Algorithm();
        }
        this.md = new MessageDigest(algorithm);
      };
      NormalizeHash.prototype.update = function(msg) {
        return this.md.update(msg);
      };
      NormalizeHash.prototype.digest = function() {
        return this.md.digest().toHex();
      };
      var MessageDigest = function(algorithm) {
        if (!(this instanceof MessageDigest)) {
          return new MessageDigest(algorithm);
        }
        this._algorithm = algorithm;
        if (!MessageDigest._padding || MessageDigest._padding.length < this._algorithm.blockSize) {
          MessageDigest._padding = String.fromCharCode(128);
          var c = String.fromCharCode(0x00);
          var n = 64;
          while (n > 0) {
            if (n & 1) {
              MessageDigest._padding += c;
            }
            n >>>= 1;
            if (n > 0) {
              c += c;
            }
          }
        }
        this.start();
      };
      MessageDigest.prototype.start = function() {
        this.messageLength = 0;
        this.fullMessageLength = [];
        var int32s = this._algorithm.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          this.fullMessageLength.push(0);
        }
        this._input = new MessageDigest.ByteBuffer();
        this.state = this._algorithm.start();
        return this;
      };
      MessageDigest.prototype.update = function(msg) {
        msg = new MessageDigest.ByteBuffer(unescape(encodeURIComponent(msg)));
        this.messageLength += msg.length();
        var len = msg.length();
        len = [(len / 0x100000000) >>> 0, len >>> 0];
        for (var i = this.fullMessageLength.length - 1; i >= 0; --i) {
          this.fullMessageLength[i] += len[1];
          len[1] = len[0] + ((this.fullMessageLength[i] / 0x100000000) >>> 0);
          this.fullMessageLength[i] = this.fullMessageLength[i] >>> 0;
          len[0] = ((len[1] / 0x100000000) >>> 0);
        }
        this._input.putBytes(msg.bytes());
        while (this._input.length() >= this._algorithm.blockSize) {
          this.state = this._algorithm.digest(this.state, this._input);
        }
        if (this._input.read > 2048 || this._input.length() === 0) {
          this._input.compact();
        }
        return this;
      };
      MessageDigest.prototype.digest = function() {
        var finalBlock = new MessageDigest.ByteBuffer();
        finalBlock.putBytes(this._input.bytes());
        var remaining = (this.fullMessageLength[this.fullMessageLength.length - 1] + this._algorithm.messageLengthSize);
        var overflow = remaining & (this._algorithm.blockSize - 1);
        finalBlock.putBytes(MessageDigest._padding.substr(0, this._algorithm.blockSize - overflow));
        var messageLength = new MessageDigest.ByteBuffer();
        for (var i = 0; i < this.fullMessageLength.length; ++i) {
          messageLength.putInt32((this.fullMessageLength[i] << 3) | (this.fullMessageLength[i + 1] >>> 28));
        }
        this._algorithm.writeMessageLength(finalBlock, messageLength);
        var state = this._algorithm.digest(this.state.copy(), finalBlock);
        var rval = new MessageDigest.ByteBuffer();
        state.write(rval);
        return rval;
      };
      MessageDigest.ByteBuffer = function(data) {
        if (typeof data === 'string') {
          this.data = data;
        } else {
          this.data = '';
        }
        this.read = 0;
      };
      MessageDigest.ByteBuffer.prototype.putInt32 = function(i) {
        this.data += (String.fromCharCode(i >> 24 & 0xFF) + String.fromCharCode(i >> 16 & 0xFF) + String.fromCharCode(i >> 8 & 0xFF) + String.fromCharCode(i & 0xFF));
      };
      MessageDigest.ByteBuffer.prototype.getInt32 = function() {
        var rval = (this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3));
        this.read += 4;
        return rval;
      };
      MessageDigest.ByteBuffer.prototype.putBytes = function(bytes) {
        this.data += bytes;
      };
      MessageDigest.ByteBuffer.prototype.bytes = function() {
        return this.data.slice(this.read);
      };
      MessageDigest.ByteBuffer.prototype.length = function() {
        return this.data.length - this.read;
      };
      MessageDigest.ByteBuffer.prototype.compact = function() {
        this.data = this.data.slice(this.read);
        this.read = 0;
      };
      MessageDigest.ByteBuffer.prototype.toHex = function() {
        var rval = '';
        for (var i = this.read; i < this.data.length; ++i) {
          var b = this.data.charCodeAt(i);
          if (b < 16) {
            rval += '0';
          }
          rval += b.toString(16);
        }
        return rval;
      };
      var sha1 = {_w: null};
      sha1.Algorithm = function() {
        this.name = 'sha1', this.blockSize = 64;
        this.digestLength = 20;
        this.messageLengthSize = 8;
      };
      sha1.Algorithm.prototype.start = function() {
        if (!sha1._w) {
          sha1._w = new Array(80);
        }
        return sha1._createState();
      };
      sha1.Algorithm.prototype.writeMessageLength = function(finalBlock, messageLength) {
        finalBlock.putBytes(messageLength.bytes());
      };
      sha1.Algorithm.prototype.digest = function(s, input) {
        var t,
            a,
            b,
            c,
            d,
            e,
            f,
            i;
        var len = input.length();
        var _w = sha1._w;
        while (len >= 64) {
          a = s.h0;
          b = s.h1;
          c = s.h2;
          d = s.h3;
          e = s.h4;
          for (i = 0; i < 16; ++i) {
            t = input.getInt32();
            _w[i] = t;
            f = d ^ (b & (c ^ d));
            t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
          }
          for (; i < 20; ++i) {
            t = (_w[i - 3] ^ _w[i - 8] ^ _w[i - 14] ^ _w[i - 16]);
            t = (t << 1) | (t >>> 31);
            _w[i] = t;
            f = d ^ (b & (c ^ d));
            t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
          }
          for (; i < 32; ++i) {
            t = (_w[i - 3] ^ _w[i - 8] ^ _w[i - 14] ^ _w[i - 16]);
            t = (t << 1) | (t >>> 31);
            _w[i] = t;
            f = b ^ c ^ d;
            t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
          }
          for (; i < 40; ++i) {
            t = (_w[i - 6] ^ _w[i - 16] ^ _w[i - 28] ^ _w[i - 32]);
            t = (t << 2) | (t >>> 30);
            _w[i] = t;
            f = b ^ c ^ d;
            t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
          }
          for (; i < 60; ++i) {
            t = (_w[i - 6] ^ _w[i - 16] ^ _w[i - 28] ^ _w[i - 32]);
            t = (t << 2) | (t >>> 30);
            _w[i] = t;
            f = (b & c) | (d & (b ^ c));
            t = ((a << 5) | (a >>> 27)) + f + e + 0x8F1BBCDC + t;
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
          }
          for (; i < 80; ++i) {
            t = (_w[i - 6] ^ _w[i - 16] ^ _w[i - 28] ^ _w[i - 32]);
            t = (t << 2) | (t >>> 30);
            _w[i] = t;
            f = b ^ c ^ d;
            t = ((a << 5) | (a >>> 27)) + f + e + 0xCA62C1D6 + t;
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = t;
          }
          s.h0 = (s.h0 + a) | 0;
          s.h1 = (s.h1 + b) | 0;
          s.h2 = (s.h2 + c) | 0;
          s.h3 = (s.h3 + d) | 0;
          s.h4 = (s.h4 + e) | 0;
          len -= 64;
        }
        return s;
      };
      sha1._createState = function() {
        var state = {
          h0: 0x67452301,
          h1: 0xEFCDAB89,
          h2: 0x98BADCFE,
          h3: 0x10325476,
          h4: 0xC3D2E1F0
        };
        state.copy = function() {
          var rval = sha1._createState();
          rval.h0 = state.h0;
          rval.h1 = state.h1;
          rval.h2 = state.h2;
          rval.h3 = state.h3;
          rval.h4 = state.h4;
          return rval;
        };
        state.write = function(buffer) {
          buffer.putInt32(state.h0);
          buffer.putInt32(state.h1);
          buffer.putInt32(state.h2);
          buffer.putInt32(state.h3);
          buffer.putInt32(state.h4);
        };
        return state;
      };
      var sha256 = {
        _k: null,
        _w: null
      };
      sha256.Algorithm = function() {
        this.name = 'sha256', this.blockSize = 64;
        this.digestLength = 32;
        this.messageLengthSize = 8;
      };
      sha256.Algorithm.prototype.start = function() {
        if (!sha256._k) {
          sha256._init();
        }
        return sha256._createState();
      };
      sha256.Algorithm.prototype.writeMessageLength = function(finalBlock, messageLength) {
        finalBlock.putBytes(messageLength.bytes());
      };
      sha256.Algorithm.prototype.digest = function(s, input) {
        var t1,
            t2,
            s0,
            s1,
            ch,
            maj,
            i,
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h;
        var len = input.length();
        var _k = sha256._k;
        var _w = sha256._w;
        while (len >= 64) {
          for (i = 0; i < 16; ++i) {
            _w[i] = input.getInt32();
          }
          for (; i < 64; ++i) {
            t1 = _w[i - 2];
            t1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
            t2 = _w[i - 15];
            t2 = ((t2 >>> 7) | (t2 << 25)) ^ ((t2 >>> 18) | (t2 << 14)) ^ (t2 >>> 3);
            _w[i] = (t1 + _w[i - 7] + t2 + _w[i - 16]) | 0;
          }
          a = s.h0;
          b = s.h1;
          c = s.h2;
          d = s.h3;
          e = s.h4;
          f = s.h5;
          g = s.h6;
          h = s.h7;
          for (i = 0; i < 64; ++i) {
            s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
            ch = g ^ (e & (f ^ g));
            s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
            maj = (a & b) | (c & (a ^ b));
            t1 = h + s1 + ch + _k[i] + _w[i];
            t2 = s0 + maj;
            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
          }
          s.h0 = (s.h0 + a) | 0;
          s.h1 = (s.h1 + b) | 0;
          s.h2 = (s.h2 + c) | 0;
          s.h3 = (s.h3 + d) | 0;
          s.h4 = (s.h4 + e) | 0;
          s.h5 = (s.h5 + f) | 0;
          s.h6 = (s.h6 + g) | 0;
          s.h7 = (s.h7 + h) | 0;
          len -= 64;
        }
        return s;
      };
      sha256._createState = function() {
        var state = {
          h0: 0x6A09E667,
          h1: 0xBB67AE85,
          h2: 0x3C6EF372,
          h3: 0xA54FF53A,
          h4: 0x510E527F,
          h5: 0x9B05688C,
          h6: 0x1F83D9AB,
          h7: 0x5BE0CD19
        };
        state.copy = function() {
          var rval = sha256._createState();
          rval.h0 = state.h0;
          rval.h1 = state.h1;
          rval.h2 = state.h2;
          rval.h3 = state.h3;
          rval.h4 = state.h4;
          rval.h5 = state.h5;
          rval.h6 = state.h6;
          rval.h7 = state.h7;
          return rval;
        };
        state.write = function(buffer) {
          buffer.putInt32(state.h0);
          buffer.putInt32(state.h1);
          buffer.putInt32(state.h2);
          buffer.putInt32(state.h3);
          buffer.putInt32(state.h4);
          buffer.putInt32(state.h5);
          buffer.putInt32(state.h6);
          buffer.putInt32(state.h7);
        };
        return state;
      };
      sha256._init = function() {
        sha256._k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
        sha256._w = new Array(64);
      };
    })(_nodejs);
    if (!XMLSerializer) {
      var _defineXMLSerializer = function() {
        XMLSerializer = require('xmldom').XMLSerializer;
      };
    }
    jsonld.url = {};
    jsonld.url.parsers = {
      simple: {
        keys: ['href', 'scheme', 'authority', 'path', 'query', 'fragment'],
        regex: /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/
      },
      full: {
        keys: ['href', 'protocol', 'scheme', 'authority', 'auth', 'user', 'password', 'hostname', 'port', 'path', 'directory', 'file', 'query', 'fragment'],
        regex: /^(([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:(((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    };
    jsonld.url.parse = function(str, parser) {
      var parsed = {};
      var o = jsonld.url.parsers[parser || 'full'];
      var m = o.regex.exec(str);
      var i = o.keys.length;
      while (i--) {
        parsed[o.keys[i]] = (m[i] === undefined) ? null : m[i];
      }
      parsed.normalizedPath = _removeDotSegments(parsed.path, !!parsed.authority);
      return parsed;
    };
    function _removeDotSegments(path, hasAuthority) {
      var rval = '';
      if (path.indexOf('/') === 0) {
        rval = '/';
      }
      var input = path.split('/');
      var output = [];
      while (input.length > 0) {
        if (input[0] === '.' || (input[0] === '' && input.length > 1)) {
          input.shift();
          continue;
        }
        if (input[0] === '..') {
          input.shift();
          if (hasAuthority || (output.length > 0 && output[output.length - 1] !== '..')) {
            output.pop();
          } else {
            output.push('..');
          }
          continue;
        }
        output.push(input.shift());
      }
      return rval + output.join('/');
    }
    if (_nodejs) {
      jsonld.useDocumentLoader('node');
    } else if (typeof XMLHttpRequest !== 'undefined') {
      jsonld.useDocumentLoader('xhr');
    }
    if (_nodejs) {
      jsonld.use = function(extension) {
        switch (extension) {
          case 'request':
            jsonld.request = require('jsonld-request');
            break;
          default:
            throw new JsonLdError('Unknown extension.', 'jsonld.UnknownExtension', {extension: extension});
        }
      };
      var _module = {
        exports: {},
        filename: __dirname
      };
      require('pkginfo')(_module, 'version');
      jsonld.version = _module.exports.version;
    }
    return jsonld;
  };
  var factory = function() {
    return wrapper(function() {
      return factory();
    });
  };
  if (!_nodejs && (typeof define === 'function' && define.amd)) {
    define("22", [], function() {
      wrapper(factory);
      return factory;
    });
  } else {
    wrapper(factory);
    if (typeof require === 'function' && typeof module !== 'undefined' && module.exports) {
      module.exports = factory;
    }
    if (_browser) {
      if (typeof jsonld === 'undefined') {
        jsonld = jsonldjs = factory;
      } else {
        jsonldjs = factory;
      }
    }
  }
  return factory;
})();

_removeDefine();
})();
/// <reference path="./../../typings/typings.d.ts" />
$__System.register("1e", [], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (body) {
                    return new Promise(function (resolve, reject) {
                        try {
                            resolve(JSON.parse(body));
                        }
                        catch (error) {
                            // TODO: Handle SyntaxError
                            reject(error);
                        }
                    });
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

/// <reference path="../../typings/typings.d.ts" />
$__System.register("31", ["22", "1e"], function(exports_1) {
    var jsonld, JSONParser_1;
    var Class;
    return {
        setters:[
            function (jsonld_1) {
                jsonld = jsonld_1;
            },
            function (JSONParser_1_1) {
                JSONParser_1 = JSONParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (input) {
                    var _this = this;
                    var jsonParser = new JSONParser_1.default();
                    return jsonParser.parse(input).then(function (parsedObject) {
                        return _this.expandJSON(parsedObject);
                    });
                };
                Class.prototype.expandJSON = function (parsedObject, options) {
                    return new Promise(function (resolve, reject) {
                        jsonld.expand(parsedObject, options, function (error, expanded) {
                            if (error) {
                                // TODO: Handle jsonld.expand error
                                reject(error);
                            }
                            parsedObject = expanded;
                            resolve(expanded);
                        });
                    });
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("32", [], function(exports_1) {
    return {
        setters:[],
        execute: function() {
        }
    }
});

$__System.register("33", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, BadRequestError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "BadRequestError";
            statusCode = 400;
            BadRequestError = (function (_super) {
                __extends(BadRequestError, _super);
                function BadRequestError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(BadRequestError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BadRequestError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return BadRequestError;
            })(HTTPError_1.default);
            exports_1("default",BadRequestError);
        }
    }
});

$__System.register("35", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, ConflictError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "ConflictError";
            statusCode = 409;
            ConflictError = (function (_super) {
                __extends(ConflictError, _super);
                function ConflictError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ConflictError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConflictError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return ConflictError;
            })(HTTPError_1.default);
            exports_1("default",ConflictError);
        }
    }
});

$__System.register("36", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, ForbiddenError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "ForbiddenError";
            statusCode = 403;
            ForbiddenError = (function (_super) {
                __extends(ForbiddenError, _super);
                function ForbiddenError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ForbiddenError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ForbiddenError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return ForbiddenError;
            })(HTTPError_1.default);
            exports_1("default",ForbiddenError);
        }
    }
});

$__System.register("37", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, MethodNotAllowedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "MethodNotAllowedError";
            statusCode = 405;
            MethodNotAllowedError = (function (_super) {
                __extends(MethodNotAllowedError, _super);
                function MethodNotAllowedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(MethodNotAllowedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MethodNotAllowedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return MethodNotAllowedError;
            })(HTTPError_1.default);
            exports_1("default",MethodNotAllowedError);
        }
    }
});

$__System.register("38", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, NotAcceptableError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "NotAcceptableError";
            statusCode = 406;
            NotAcceptableError = (function (_super) {
                __extends(NotAcceptableError, _super);
                function NotAcceptableError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(NotAcceptableError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotAcceptableError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return NotAcceptableError;
            })(HTTPError_1.default);
            exports_1("default",NotAcceptableError);
        }
    }
});

$__System.register("39", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, NotFoundError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "NotFoundError";
            statusCode = 404;
            NotFoundError = (function (_super) {
                __extends(NotFoundError, _super);
                function NotFoundError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(NotFoundError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotFoundError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return NotFoundError;
            })(HTTPError_1.default);
            exports_1("default",NotFoundError);
        }
    }
});

$__System.register("3a", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, PreconditionFailedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "PreconditionFailedError";
            statusCode = 412;
            PreconditionFailedError = (function (_super) {
                __extends(PreconditionFailedError, _super);
                function PreconditionFailedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(PreconditionFailedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PreconditionFailedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return PreconditionFailedError;
            })(HTTPError_1.default);
            exports_1("default",PreconditionFailedError);
        }
    }
});

$__System.register("3b", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, PreconditionRequiredError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "PreconditionRequiredError";
            statusCode = 428;
            PreconditionRequiredError = (function (_super) {
                __extends(PreconditionRequiredError, _super);
                function PreconditionRequiredError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(PreconditionRequiredError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PreconditionRequiredError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return PreconditionRequiredError;
            })(HTTPError_1.default);
            exports_1("default",PreconditionRequiredError);
        }
    }
});

$__System.register("3c", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, RequestEntityTooLargeError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "RequestEntityTooLargeError";
            statusCode = 413;
            RequestEntityTooLargeError = (function (_super) {
                __extends(RequestEntityTooLargeError, _super);
                function RequestEntityTooLargeError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(RequestEntityTooLargeError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RequestEntityTooLargeError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return RequestEntityTooLargeError;
            })(HTTPError_1.default);
            exports_1("default",RequestEntityTooLargeError);
        }
    }
});

$__System.register("3d", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, RequestHeaderFieldsTooLargeError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "RequestHeaderFieldsTooLargeError";
            statusCode = 431;
            RequestHeaderFieldsTooLargeError = (function (_super) {
                __extends(RequestHeaderFieldsTooLargeError, _super);
                function RequestHeaderFieldsTooLargeError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(RequestHeaderFieldsTooLargeError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RequestHeaderFieldsTooLargeError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return RequestHeaderFieldsTooLargeError;
            })(HTTPError_1.default);
            exports_1("default",RequestHeaderFieldsTooLargeError);
        }
    }
});

$__System.register("3e", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, RequestURITooLongError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "RequestURITooLongError";
            statusCode = 414;
            RequestURITooLongError = (function (_super) {
                __extends(RequestURITooLongError, _super);
                function RequestURITooLongError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(RequestURITooLongError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RequestURITooLongError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return RequestURITooLongError;
            })(HTTPError_1.default);
            exports_1("default",RequestURITooLongError);
        }
    }
});

$__System.register("3f", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, TooManyRequestsError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "TooManyRequestsError";
            statusCode = 429;
            TooManyRequestsError = (function (_super) {
                __extends(TooManyRequestsError, _super);
                function TooManyRequestsError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(TooManyRequestsError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TooManyRequestsError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return TooManyRequestsError;
            })(HTTPError_1.default);
            exports_1("default",TooManyRequestsError);
        }
    }
});

$__System.register("40", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, UnauthorizedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "UnauthorizedError";
            statusCode = 401;
            UnauthorizedError = (function (_super) {
                __extends(UnauthorizedError, _super);
                function UnauthorizedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(UnauthorizedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnauthorizedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return UnauthorizedError;
            })(HTTPError_1.default);
            exports_1("default",UnauthorizedError);
        }
    }
});

$__System.register("41", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, UnsupportedMediaTypeError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "UnsupportedMediaTypeError";
            statusCode = 415;
            UnsupportedMediaTypeError = (function (_super) {
                __extends(UnsupportedMediaTypeError, _super);
                function UnsupportedMediaTypeError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(UnsupportedMediaTypeError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnsupportedMediaTypeError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return UnsupportedMediaTypeError;
            })(HTTPError_1.default);
            exports_1("default",UnsupportedMediaTypeError);
        }
    }
});

$__System.register("42", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, Class;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "BadResponseError";
            statusCode = 0;
            Class = (function (_super) {
                __extends(Class, _super);
                function Class() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(Class, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return Class;
            })(HTTPError_1.default);
            exports_1("default",Class);
        }
    }
});

$__System.register("43", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, BadGatewayError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "BadGatewayError";
            statusCode = 502;
            BadGatewayError = (function (_super) {
                __extends(BadGatewayError, _super);
                function BadGatewayError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(BadGatewayError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BadGatewayError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return BadGatewayError;
            })(HTTPError_1.default);
            exports_1("default",BadGatewayError);
        }
    }
});

$__System.register("44", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, GatewayTimeoutError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "GatewayTimeoutError";
            statusCode = 504;
            GatewayTimeoutError = (function (_super) {
                __extends(GatewayTimeoutError, _super);
                function GatewayTimeoutError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(GatewayTimeoutError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GatewayTimeoutError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return GatewayTimeoutError;
            })(HTTPError_1.default);
            exports_1("default",GatewayTimeoutError);
        }
    }
});

$__System.register("45", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, HTTPVersionNotSupportedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "HTTPVersionNotSupportedError";
            statusCode = 505;
            HTTPVersionNotSupportedError = (function (_super) {
                __extends(HTTPVersionNotSupportedError, _super);
                function HTTPVersionNotSupportedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(HTTPVersionNotSupportedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HTTPVersionNotSupportedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return HTTPVersionNotSupportedError;
            })(HTTPError_1.default);
            exports_1("default",HTTPVersionNotSupportedError);
        }
    }
});

$__System.register("46", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, InternalServerErrorError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "InternalServerErrorError";
            statusCode = 500;
            InternalServerErrorError = (function (_super) {
                __extends(InternalServerErrorError, _super);
                function InternalServerErrorError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(InternalServerErrorError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InternalServerErrorError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return InternalServerErrorError;
            })(HTTPError_1.default);
            exports_1("default",InternalServerErrorError);
        }
    }
});

$__System.register("47", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, NotImplementedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "NotImplementedError";
            statusCode = 501;
            NotImplementedError = (function (_super) {
                __extends(NotImplementedError, _super);
                function NotImplementedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(NotImplementedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotImplementedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return NotImplementedError;
            })(HTTPError_1.default);
            exports_1("default",NotImplementedError);
        }
    }
});

$__System.register("48", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, ServiceUnavailableError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "ServiceUnavailableError";
            statusCode = 503;
            ServiceUnavailableError = (function (_super) {
                __extends(ServiceUnavailableError, _super);
                function ServiceUnavailableError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ServiceUnavailableError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ServiceUnavailableError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return ServiceUnavailableError;
            })(HTTPError_1.default);
            exports_1("default",ServiceUnavailableError);
        }
    }
});

$__System.register("34", ["49"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var HTTPError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            HTTPError = (function (_super) {
                __extends(HTTPError, _super);
                function HTTPError(message, response) {
                    _super.call(this, message);
                    this.response = response;
                }
                Object.defineProperty(HTTPError, "statusCode", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HTTPError.prototype, "name", {
                    get: function () { return "HTTPError"; },
                    enumerable: true,
                    configurable: true
                });
                return HTTPError;
            })(AbstractError_1.default);
            exports_1("default",HTTPError);
        }
    }
});

$__System.register("4a", ["34"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, UnknownError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "UnknownError";
            UnknownError = (function (_super) {
                __extends(UnknownError, _super);
                function UnknownError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(UnknownError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return UnknownError;
            })(HTTPError_1.default);
            exports_1("default",UnknownError);
        }
    }
});

$__System.register("4b", ["34", "33", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "4a"], function(exports_1) {
    var HTTPError_1, BadRequestError_1, ConflictError_1, ForbiddenError_1, MethodNotAllowedError_1, NotAcceptableError_1, NotFoundError_1, PreconditionFailedError_1, PreconditionRequiredError_1, RequestEntityTooLargeError_1, RequestHeaderFieldsTooLargeError_1, RequestURITooLongError_1, TooManyRequestsError_1, UnauthorizedError_1, UnsupportedMediaTypeError_1, BadResponseError_1, BadGatewayError_1, GatewayTimeoutError_1, HTTPVersionNotSupportedError_1, InternalServerErrorError_1, NotImplementedError_1, ServiceUnavailableError_1, UnknownError_1;
    var client, server, statusCodeMap;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            },
            function (BadRequestError_1_1) {
                BadRequestError_1 = BadRequestError_1_1;
            },
            function (ConflictError_1_1) {
                ConflictError_1 = ConflictError_1_1;
            },
            function (ForbiddenError_1_1) {
                ForbiddenError_1 = ForbiddenError_1_1;
            },
            function (MethodNotAllowedError_1_1) {
                MethodNotAllowedError_1 = MethodNotAllowedError_1_1;
            },
            function (NotAcceptableError_1_1) {
                NotAcceptableError_1 = NotAcceptableError_1_1;
            },
            function (NotFoundError_1_1) {
                NotFoundError_1 = NotFoundError_1_1;
            },
            function (PreconditionFailedError_1_1) {
                PreconditionFailedError_1 = PreconditionFailedError_1_1;
            },
            function (PreconditionRequiredError_1_1) {
                PreconditionRequiredError_1 = PreconditionRequiredError_1_1;
            },
            function (RequestEntityTooLargeError_1_1) {
                RequestEntityTooLargeError_1 = RequestEntityTooLargeError_1_1;
            },
            function (RequestHeaderFieldsTooLargeError_1_1) {
                RequestHeaderFieldsTooLargeError_1 = RequestHeaderFieldsTooLargeError_1_1;
            },
            function (RequestURITooLongError_1_1) {
                RequestURITooLongError_1 = RequestURITooLongError_1_1;
            },
            function (TooManyRequestsError_1_1) {
                TooManyRequestsError_1 = TooManyRequestsError_1_1;
            },
            function (UnauthorizedError_1_1) {
                UnauthorizedError_1 = UnauthorizedError_1_1;
            },
            function (UnsupportedMediaTypeError_1_1) {
                UnsupportedMediaTypeError_1 = UnsupportedMediaTypeError_1_1;
            },
            function (BadResponseError_1_1) {
                BadResponseError_1 = BadResponseError_1_1;
            },
            function (BadGatewayError_1_1) {
                BadGatewayError_1 = BadGatewayError_1_1;
            },
            function (GatewayTimeoutError_1_1) {
                GatewayTimeoutError_1 = GatewayTimeoutError_1_1;
            },
            function (HTTPVersionNotSupportedError_1_1) {
                HTTPVersionNotSupportedError_1 = HTTPVersionNotSupportedError_1_1;
            },
            function (InternalServerErrorError_1_1) {
                InternalServerErrorError_1 = InternalServerErrorError_1_1;
            },
            function (NotImplementedError_1_1) {
                NotImplementedError_1 = NotImplementedError_1_1;
            },
            function (ServiceUnavailableError_1_1) {
                ServiceUnavailableError_1 = ServiceUnavailableError_1_1;
            },
            function (UnknownError_1_1) {
                UnknownError_1 = UnknownError_1_1;
            }],
        execute: function() {
            client = [];
            client.push(BadRequestError_1.default);
            client.push(ConflictError_1.default);
            client.push(ForbiddenError_1.default);
            client.push(MethodNotAllowedError_1.default);
            client.push(NotAcceptableError_1.default);
            client.push(NotFoundError_1.default);
            client.push(PreconditionFailedError_1.default);
            client.push(PreconditionRequiredError_1.default);
            client.push(RequestEntityTooLargeError_1.default);
            client.push(RequestHeaderFieldsTooLargeError_1.default);
            client.push(RequestURITooLongError_1.default);
            client.push(TooManyRequestsError_1.default);
            client.push(UnauthorizedError_1.default);
            client.push(UnsupportedMediaTypeError_1.default);
            server = [];
            server.push(BadResponseError_1.default);
            server.push(BadGatewayError_1.default);
            server.push(GatewayTimeoutError_1.default);
            server.push(HTTPVersionNotSupportedError_1.default);
            server.push(InternalServerErrorError_1.default);
            server.push(NotImplementedError_1.default);
            server.push(ServiceUnavailableError_1.default);
            statusCodeMap = new Map();
            for (var i = 0, length = client.length; i < length; i++) {
                statusCodeMap.set(client[i].statusCode, client[i]);
            }
            for (var i = 0, length = server.length; i < length; i++) {
                statusCodeMap.set(server[i].statusCode, server[i]);
            }
            exports_1("Error", HTTPError_1.default);
            exports_1("BadRequestError", BadRequestError_1.default);
            exports_1("ConflictError", ConflictError_1.default);
            exports_1("ForbiddenError", ForbiddenError_1.default);
            exports_1("MethodNotAllowedError", MethodNotAllowedError_1.default);
            exports_1("NotAcceptableError", NotAcceptableError_1.default);
            exports_1("NotFoundError", NotFoundError_1.default);
            exports_1("PreconditionFailedError", PreconditionFailedError_1.default);
            exports_1("PreconditionRequiredError", PreconditionRequiredError_1.default);
            exports_1("RequestEntityTooLargeError", RequestEntityTooLargeError_1.default);
            exports_1("RequestHeaderFieldsTooLargeError", RequestHeaderFieldsTooLargeError_1.default);
            exports_1("RequestURITooLongError", RequestURITooLongError_1.default);
            exports_1("TooManyRequestsError", TooManyRequestsError_1.default);
            exports_1("UnauthorizedError", UnauthorizedError_1.default);
            exports_1("UnsupportedMediaTypeError", UnsupportedMediaTypeError_1.default);
            exports_1("BadResponseError", BadResponseError_1.default);
            exports_1("BadGatewayError", BadGatewayError_1.default);
            exports_1("GatewayTimeoutError", GatewayTimeoutError_1.default);
            exports_1("HTTPVersionNotSupportedError", HTTPVersionNotSupportedError_1.default);
            exports_1("InternalServerErrorError", InternalServerErrorError_1.default);
            exports_1("NotImplementedError", NotImplementedError_1.default);
            exports_1("ServiceUnavailableError", ServiceUnavailableError_1.default);
            exports_1("UnknownError", UnknownError_1.default);
            exports_1("client", client);
            exports_1("server", server);
            exports_1("statusCodeMap", statusCodeMap);
        }
    }
});

$__System.register("4c", [], function(exports_1) {
    var Method;
    return {
        setters:[],
        execute: function() {
            (function (Method) {
                Method[Method["OPTIONS"] = 0] = "OPTIONS";
                Method[Method["HEAD"] = 1] = "HEAD";
                Method[Method["GET"] = 2] = "GET";
                Method[Method["POST"] = 3] = "POST";
                Method[Method["PUT"] = 4] = "PUT";
                Method[Method["PATCH"] = 5] = "PATCH";
                Method[Method["DELETE"] = 6] = "DELETE";
            })(Method || (Method = {}));
            exports_1("default",Method);
        }
    }
});

/// <reference path="./../../typings/typings.d.ts" />
$__System.register("4d", ["4b", "4e", "4c", "4f", "6"], function(exports_1) {
    var Errors, Header, Method_1, Response_1, Utils;
    var Service, Util;
    function setHeaders(request, headers) {
        var namesIterator = headers.keys();
        var next = namesIterator.next();
        while (!next.done) {
            var name = next.value;
            var value = headers.get(name);
            request.setRequestHeader(name, value.toString());
            next = namesIterator.next();
        }
    }
    function onLoad(resolve, reject, request) {
        return function () {
            var response = new Response_1.default(request);
            if (request.status >= 200 && request.status <= 299) {
                resolve(response);
            }
            else {
                rejectRequest(reject, request);
            }
        };
    }
    function onError(reject, request) {
        return function () {
            rejectRequest(reject, request);
        };
    }
    function rejectRequest(reject, request) {
        var response = new Response_1.default(request);
        if (response.status >= 400 && response.status < 600) {
            if (Errors.statusCodeMap.has(response.status)) {
                var error = Errors.statusCodeMap.get(response.status);
                // TODO: Set error message
                reject(new error("", response));
            }
        }
        reject(new Errors.UnknownError("", response));
    }
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Header_1) {
                Header = Header_1;
            },
            function (Method_1_1) {
                Method_1 = Method_1_1;
            },
            function (Response_1_1) {
                Response_1 = Response_1_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Service = (function () {
                function Service() {
                }
                Service.send = function (method, url, bodyOrOptions, options, parser) {
                    if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
                    if (options === void 0) { options = Service.defaultOptions; }
                    if (parser === void 0) { parser = null; }
                    var body = bodyOrOptions && Utils.isString(bodyOrOptions) ? bodyOrOptions : null;
                    options = !bodyOrOptions || Utils.isString(bodyOrOptions) ? options : bodyOrOptions;
                    options = options ? options : {};
                    options = Utils.extend(options, Service.defaultOptions);
                    if (Utils.isNumber(method))
                        method = Method_1.default[method];
                    var requestPromise = new Promise(function (resolve, reject) {
                        var request = options.request ? options.request : new XMLHttpRequest();
                        request.open(method, url, true);
                        if (options.headers)
                            setHeaders(request, options.headers);
                        request.withCredentials = options.sendCredentialsOnCORS;
                        if (options.timeout)
                            request.timeout = options.timeout;
                        request.onload = onLoad(resolve, reject, request);
                        request.onerror = onError(reject, request);
                        if (body) {
                            request.send(body);
                        }
                        else {
                            request.send();
                        }
                    });
                    if (parser === null)
                        return requestPromise;
                    return requestPromise.then(function (response) {
                        return parser.parse(response.data).then(function (parsedBody) {
                            return [parsedBody, response];
                        });
                    });
                };
                Service.options = function (url, options) {
                    if (options === void 0) { options = Service.defaultOptions; }
                    return Service.send(Method_1.default.OPTIONS, url, options);
                };
                Service.head = function (url, options) {
                    if (options === void 0) { options = Service.defaultOptions; }
                    return Service.send(Method_1.default.HEAD, url, options);
                };
                Service.get = function (url, options, parser) {
                    if (options === void 0) { options = Service.defaultOptions; }
                    if (parser === void 0) { parser = null; }
                    return Service.send(Method_1.default.GET, url, null, options, parser);
                };
                Service.post = function (url, bodyOrOptions, options, parser) {
                    if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
                    if (options === void 0) { options = Service.defaultOptions; }
                    if (parser === void 0) { parser = null; }
                    return Service.send(Method_1.default.POST, url, bodyOrOptions, options, parser);
                };
                Service.put = function (url, bodyOrOptions, options, parser) {
                    if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
                    if (options === void 0) { options = Service.defaultOptions; }
                    if (parser === void 0) { parser = null; }
                    return Service.send(Method_1.default.PUT, url, bodyOrOptions, options, parser);
                };
                Service.patch = function (url, bodyOrOptions, options, parser) {
                    if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
                    if (options === void 0) { options = Service.defaultOptions; }
                    if (parser === void 0) { parser = null; }
                    return Service.send(Method_1.default.PATCH, url, bodyOrOptions, options, parser);
                };
                Service.delete = function (url, bodyOrOptions, options, parser) {
                    if (bodyOrOptions === void 0) { bodyOrOptions = Service.defaultOptions; }
                    if (options === void 0) { options = Service.defaultOptions; }
                    if (parser === void 0) { parser = null; }
                    return Service.send(Method_1.default.DELETE, url, bodyOrOptions, options, parser);
                };
                Service.defaultOptions = {
                    sendCredentialsOnCORS: true,
                };
                return Service;
            })();
            exports_1("Service", Service);
            Util = (function () {
                function Util() {
                }
                Util.getHeader = function (headerName, requestOptions, initialize) {
                    if (initialize === void 0) { initialize = false; }
                    if (initialize) {
                        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                        headers.set(headerName, new Header.Class());
                    }
                    if (!requestOptions.headers)
                        return undefined;
                    return requestOptions.headers.get(headerName);
                };
                Util.setAcceptHeader = function (accept, requestOptions) {
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    headers.set("Accept", new Header.Class(accept));
                    return requestOptions;
                };
                Util.setContentTypeHeader = function (contentType, requestOptions) {
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    headers.set("Content-Type", new Header.Class(contentType));
                    return requestOptions;
                };
                Util.setIfMatchHeader = function (etag, requestOptions) {
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    headers.set("If-Match", new Header.Class(etag));
                    return requestOptions;
                };
                Util.setPreferredInteractionModel = function (interactionModelURI, requestOptions) {
                    var prefer = Util.getHeader("Prefer", requestOptions, true);
                    prefer.values.push(new Header.Value(interactionModelURI + "; rel=interaction-model"));
                    return requestOptions;
                };
                Util.setContainerRetrievalPreferences = function (preferences, requestOptions) {
                    var prefer = Util.getHeader("Prefer", requestOptions, true);
                    var headerPieces = ["return=representation;"];
                    if ("include" in preferences && preferences.include.length > 0)
                        headerPieces.push('include="' + preferences.include.join(" ") + '"');
                    if ("omit" in preferences && preferences.omit.length > 0)
                        headerPieces.push('omit="' + preferences.omit.join(" ") + '"');
                    if (headerPieces.length === 1)
                        return requestOptions;
                    prefer.values.push(new Header.Value(headerPieces.join(" ")));
                    return requestOptions;
                };
                Util.setSlug = function (slug, requestOptions) {
                    var slugHeader = Util.getHeader("Slug", requestOptions, true);
                    slugHeader.values.push(new Header.Value(slug));
                    return requestOptions;
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

/// <reference path="../../typings/typings.d.ts" />
$__System.register("4e", [], function(exports_1) {
    var Class, Value, Util;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(valueOrValues) {
                    this.values = [];
                    if (!valueOrValues) {
                        return;
                    }
                    else if (Array.isArray(valueOrValues)) {
                        this.values = valueOrValues;
                    }
                    else {
                        this.setValues(valueOrValues);
                    }
                }
                Class.prototype.toString = function () {
                    return this.values.join(", ");
                };
                Class.prototype.setValues = function (valuesString) {
                    this.values = [];
                    var valueStrings = valuesString.split(",");
                    for (var i = 0, length = valueStrings.length; i < length; i++) {
                        var valueString = valueStrings[i].trim();
                        this.values.push(new Value(valueString));
                    }
                };
                return Class;
            })();
            exports_1("Class", Class);
            Value = (function () {
                function Value(value) {
                    this.value = value;
                }
                Value.prototype.toString = function () {
                    return this.value;
                };
                return Value;
            })();
            exports_1("Value", Value);
            Util = (function () {
                function Util() {
                }
                Util.parseHeaders = function (headersString) {
                    var headers = new Map();
                    var headerStrings = headersString.split(/\r?\n/);
                    for (var i = 0, length = headerStrings.length; i < length; i++) {
                        var headerString = headerStrings[i];
                        if (!headerString.trim())
                            continue;
                        var parts = headerString.split(":");
                        if (parts.length < 2)
                            throw new Error("ParseError: The header couldn't be parsed.");
                        if (parts.length > 2)
                            parts[1] = parts.slice(1).join(":");
                        var name = parts[0].trim();
                        var header = new Class(parts[1].trim());
                        if (headers.has(name)) {
                            var existingHeader = headers.get(name);
                            existingHeader.values.concat(header.values);
                        }
                        else
                            headers.set(name, header);
                    }
                    return headers;
                };
                return Util;
            })();
            exports_1("Util", Util);
            exports_1("default",Class);
        }
    }
});

$__System.register("4f", ["4e"], function(exports_1) {
    var Header;
    var Class, Util;
    return {
        setters:[
            function (Header_1) {
                Header = Header_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(request) {
                    this.status = request.status;
                    this.data = request.responseText;
                    this.setHeaders(request);
                    this.request = request;
                }
                Class.prototype.setHeaders = function (request) {
                    var headersString = request.getAllResponseHeaders();
                    if (headersString) {
                        this.headers = Header.Util.parseHeaders(headersString);
                    }
                    else {
                        this.headers = new Map();
                    }
                };
                return Class;
            })();
            exports_1("Class", Class);
            Util = (function () {
                function Util() {
                }
                Util.getETag = function (response) {
                    if (!response || !response.headers)
                        return null;
                    var etagHeader = response.headers.get("ETag");
                    if (!etagHeader)
                        return null;
                    if (!etagHeader.values.length)
                        return null;
                    if (etagHeader.values.length > 1)
                        console.warn("The response contains more than one ETag. Response: %o", response);
                    return etagHeader.values[0].toString();
                };
                return Util;
            })();
            exports_1("Util", Util);
            exports_1("default",Class);
        }
    }
});

$__System.register("50", [], function(exports_1) {
    var StatusCode;
    return {
        setters:[],
        execute: function() {
            (function (StatusCode) {
                StatusCode[StatusCode["CONTINUE"] = 100] = "CONTINUE";
                StatusCode[StatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
                StatusCode[StatusCode["OK"] = 200] = "OK";
                StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
                StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
                StatusCode[StatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
                StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
                StatusCode[StatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
                StatusCode[StatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
                StatusCode[StatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
                StatusCode[StatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
                StatusCode[StatusCode["FOUND"] = 302] = "FOUND";
                StatusCode[StatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
                StatusCode[StatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
                StatusCode[StatusCode["USE_PROXY"] = 305] = "USE_PROXY";
                StatusCode[StatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
                StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
                StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
                StatusCode[StatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
                StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
                StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
                StatusCode[StatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
                StatusCode[StatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
                StatusCode[StatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
                StatusCode[StatusCode["REQUEST_TIME_OUT"] = 408] = "REQUEST_TIME_OUT";
                StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
                StatusCode[StatusCode["GONE"] = 410] = "GONE";
                StatusCode[StatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
                StatusCode[StatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
                StatusCode[StatusCode["REQUEST_ENTITY_TOO_LARGE"] = 413] = "REQUEST_ENTITY_TOO_LARGE";
                StatusCode[StatusCode["REQUEST_URI_TOO_LARGE"] = 414] = "REQUEST_URI_TOO_LARGE";
                StatusCode[StatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
                StatusCode[StatusCode["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
                StatusCode[StatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
                StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
                StatusCode[StatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
                StatusCode[StatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
                StatusCode[StatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
                StatusCode[StatusCode["GATEWAY_TIME_OUT"] = 504] = "GATEWAY_TIME_OUT";
                StatusCode[StatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
            })(StatusCode || (StatusCode = {}));
            exports_1("default",StatusCode);
        }
    }
});

/// <reference path="./../../typings/typings.d.ts" />
$__System.register("51", [], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.parse = function (body) {
                    return new Promise(function (resolve, reject) {
                        resolve(body);
                    });
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("20", ["4b", "4e", "1e", "31", "4c", "32", "4d", "4f", "50", "51"], function(exports_1) {
    var Errors, Header, JSONParser, JSONLDParser, Method_1, Parser, Request, Response, StatusCode_1, StringParser;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Header_1) {
                Header = Header_1;
            },
            function (JSONParser_1) {
                JSONParser = JSONParser_1;
            },
            function (JSONLDParser_1) {
                JSONLDParser = JSONLDParser_1;
            },
            function (Method_1_1) {
                Method_1 = Method_1_1;
            },
            function (Parser_1) {
                Parser = Parser_1;
            },
            function (Request_1) {
                Request = Request_1;
            },
            function (Response_1) {
                Response = Response_1;
            },
            function (StatusCode_1_1) {
                StatusCode_1 = StatusCode_1_1;
            },
            function (StringParser_1) {
                StringParser = StringParser_1;
            }],
        execute: function() {
            exports_1("Errors", Errors);
            exports_1("Header", Header);
            exports_1("JSONParser", JSONParser);
            exports_1("JSONLDParser", JSONLDParser);
            exports_1("Method", Method_1.default);
            exports_1("Parser", Parser);
            exports_1("Request", Request);
            exports_1("Response", Response);
            exports_1("StatusCode", StatusCode_1.default);
            exports_1("StringParser", StringParser);
        }
    }
});

$__System.register("52", [], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(username, password) {
                    this._username = username;
                    this._password = password;
                }
                Object.defineProperty(Class.prototype, "username", {
                    get: function () { return this._username; },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Class.prototype, "password", {
                    get: function () { return this._password; },
                    enumerable: true,
                    configurable: true
                });
                ;
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("53", ["20", "14", "54", "52"], function(exports_1) {
    var HTTP, Errors, UsernameAndPasswordToken_1, UsernameAndPasswordCredentials;
    var Class;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (UsernameAndPasswordToken_1_1) {
                UsernameAndPasswordToken_1 = UsernameAndPasswordToken_1_1;
            },
            function (UsernameAndPasswordCredentials_1) {
                UsernameAndPasswordCredentials = UsernameAndPasswordCredentials_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.prototype.isAuthenticated = function () {
                    return !!this.credentials;
                };
                Class.prototype.authenticate = function (authenticationToken) {
                    var _this = this;
                    if (authenticationToken === null)
                        throw new Errors.IllegalArgumentError("The authenticationToken cannot be null.");
                    return new Promise(function (resolve, reject) {
                        if (!authenticationToken.username)
                            throw new Errors.IllegalArgumentError("The username cannot be empty.");
                        if (!authenticationToken.password)
                            throw new Errors.IllegalArgumentError("The password cannot be empty.");
                        _this.credentials = new UsernameAndPasswordCredentials.Class(authenticationToken.username, authenticationToken.password);
                        resolve(_this.credentials);
                    });
                };
                Class.prototype.addAuthentication = function (requestOptions) {
                    if (!this.isAuthenticated())
                        throw new Errors.IllegalStateError("The authenticator isn't authenticated.");
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    this.addBasicAuthenticationHeader(headers);
                    return requestOptions;
                };
                Class.prototype.clearAuthentication = function () {
                    this.credentials = null;
                };
                Class.prototype.supports = function (authenticationToken) {
                    return authenticationToken instanceof UsernameAndPasswordToken_1.default;
                };
                Class.prototype.addBasicAuthenticationHeader = function (headers) {
                    var header;
                    if (headers.has("Authorization")) {
                        header = headers.get("Authorization");
                    }
                    else {
                        header = new HTTP.Header.Class();
                        headers.set("Authorization", header);
                    }
                    var authorization = "Basic " + btoa(this.credentials.username + ":" + this.credentials.password);
                    header.values.push(new HTTP.Header.Value(authorization));
                    return headers;
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("55", [], function(exports_1) {
    var namespace, Class, Predicate;
    return {
        setters:[],
        execute: function() {
            exports_1("namespace", namespace = "https://carbonldp.com/ns/v1/platform#");
            Class = (function () {
                function Class() {
                }
                Object.defineProperty(Class, "AccessPoint", {
                    get: function () { return namespace + "AccessPoint"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "API", {
                    get: function () { return namespace + "API"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "NonReadableMembershipResourceTriples", {
                    get: function () { return namespace + "NonReadableMembershipResourceTriples"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferContainmentResources", {
                    get: function () { return namespace + "PreferContainmentResources"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferContainmentTriples", {
                    get: function () { return namespace + "PreferContainmentTriples"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferMembershipResources", {
                    get: function () { return namespace + "PreferMembershipResources"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferMembershipTriples", {
                    get: function () { return namespace + "PreferMembershipTriples"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "VolatileResource", {
                    get: function () { return namespace + "VolatileResource"; },
                    enumerable: true,
                    configurable: true
                });
                return Class;
            })();
            exports_1("Class", Class);
            Predicate = (function () {
                function Predicate() {
                }
                Object.defineProperty(Predicate, "accessPoint", {
                    get: function () { return namespace + "accessPoint"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "buildDate", {
                    get: function () { return namespace + "buildDate"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "created", {
                    get: function () { return namespace + "created"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "modified", {
                    get: function () { return namespace + "modified"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "version", {
                    get: function () { return namespace + "version"; },
                    enumerable: true,
                    configurable: true
                });
                return Predicate;
            })();
            exports_1("Predicate", Predicate);
        }
    }
});

$__System.register("56", [], function(exports_1) {
    var namespace, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "https://carbonldp.com/ns/v1/patch#";
            Predicate = (function () {
                function Predicate() {
                }
                Predicate.ADD_ACTION = namespace + "addAction";
                Predicate.SET_ACTION = namespace + "setAction";
                Predicate.DELETE_ACTION = namespace + "deleteAction";
                return Predicate;
            })();
            exports_1("namespace", namespace);
            exports_1("Predicate", Predicate);
        }
    }
});

$__System.register("7", [], function(exports_1) {
    var namespace, Class, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "https://carbonldp.com/ns/v1/security#";
            Class = (function () {
                function Class() {
                }
                Object.defineProperty(Class, "Application", {
                    get: function () { return namespace + "Application"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "Token", {
                    get: function () { return namespace + "Token"; },
                    enumerable: true,
                    configurable: true
                });
                return Class;
            })();
            Predicate = (function () {
                function Predicate() {
                }
                Object.defineProperty(Predicate, "rootContainer", {
                    get: function () { return namespace + "rootContainer"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "tokenKey", {
                    get: function () { return namespace + "tokenKey"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "expirationTime", {
                    get: function () { return namespace + "expirationTime"; },
                    enumerable: true,
                    configurable: true
                });
                return Predicate;
            })();
            exports_1("namespace", namespace);
            exports_1("Class", Class);
            exports_1("Predicate", Predicate);
        }
    }
});

$__System.register("23", [], function(exports_1) {
    var namespace, Class, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "http://www.w3.org/ns/ldp#";
            Class = (function () {
                function Class() {
                }
                Object.defineProperty(Class, "Resource", {
                    get: function () { return namespace + "Resource"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "RDFSource", {
                    get: function () { return namespace + "RDFSource"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "Container", {
                    get: function () { return namespace + "Container"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "BasicContainer", {
                    get: function () { return namespace + "BasicContainer"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "DirectContainer", {
                    get: function () { return namespace + "DirectContainer"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "IndirectContainer", {
                    get: function () { return namespace + "IndirectContainer"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "NonRDFSource", {
                    get: function () { return namespace + "NonRDFSource"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "MemberSubject", {
                    get: function () { return namespace + "MemberSubject"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferContainment", {
                    get: function () { return namespace + "PreferContainment"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferMembership", {
                    get: function () { return namespace + "PreferMembership"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferEmptyContainer", {
                    get: function () { return namespace + "PreferEmptyContainer"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PreferMinimalContainer", {
                    get: function () { return namespace + "PreferMinimalContainer"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "Page", {
                    get: function () { return namespace + "Page"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "PageSortCriterion", {
                    get: function () { return namespace + "PageSortCriterion"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "Ascending", {
                    get: function () { return namespace + "Ascending"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class, "Descending", {
                    get: function () { return namespace + "Descending"; },
                    enumerable: true,
                    configurable: true
                });
                return Class;
            })();
            Predicate = (function () {
                function Predicate() {
                }
                Object.defineProperty(Predicate, "contains", {
                    get: function () { return namespace + "contains"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "member", {
                    get: function () { return namespace + "member"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "hasMemberRelation", {
                    get: function () { return namespace + "hasMemberRelation"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "memberOfRelation", {
                    get: function () { return namespace + "memberOfRelation"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "membershipResource", {
                    get: function () { return namespace + "membershipResource"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "insertedContentRelation", {
                    get: function () { return namespace + "insertedContentRelation"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "constrainedBy", {
                    get: function () { return namespace + "constrainedBy"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "pageSortCriteria", {
                    get: function () { return namespace + "pageSortCriteria"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "pageSortOrder", {
                    get: function () { return namespace + "pageSortOrder"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "pageSortCollation", {
                    get: function () { return namespace + "pageSortCollation"; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Predicate, "pageSequence", {
                    get: function () { return namespace + "pageSequence"; },
                    enumerable: true,
                    configurable: true
                });
                return Predicate;
            })();
            exports_1("namespace", namespace);
            exports_1("Class", Class);
            exports_1("Predicate", Predicate);
        }
    }
});

$__System.register("57", [], function(exports_1) {
    var namespace, Predicate;
    return {
        setters:[],
        execute: function() {
            namespace = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
            Predicate = (function () {
                function Predicate() {
                }
                Predicate.type = namespace + "type";
                return Predicate;
            })();
            exports_1("namespace", namespace);
            exports_1("Predicate", Predicate);
        }
    }
});

$__System.register("2f", ["6"], function(exports_1) {
    var Utils;
    var namespace, DataType;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("namespace", namespace = "http://www.w3.org/2001/XMLSchema#");
            DataType = (function () {
                function DataType() {
                }
                DataType.date = namespace + "date";
                DataType.dateTime = namespace + "dateTime";
                DataType.duration = namespace + "duration";
                DataType.gDay = namespace + "gDay";
                DataType.gMonth = namespace + "gMonth";
                DataType.gMonthDay = namespace + "gMonthDay";
                DataType.gYear = namespace + "gYear";
                DataType.gYearMonth = namespace + "gYearMonth";
                DataType.time = namespace + "time";
                DataType.byte = namespace + "byte";
                DataType.decimal = namespace + "decimal";
                DataType.int = namespace + "int";
                DataType.integer = namespace + "integer";
                DataType.long = namespace + "long";
                DataType.negativeInteger = namespace + "negativeInteger";
                DataType.nonNegativeInteger = namespace + "nonNegativeInteger";
                DataType.nonPositiveInteger = namespace + "nonPositiveInteger";
                DataType.positiveInteger = namespace + "positiveInteger";
                DataType.short = namespace + "short";
                DataType.unsignedLong = namespace + "unsignedLong";
                DataType.unsignedInt = namespace + "unsignedInt";
                DataType.unsignedShort = namespace + "unsignedShort";
                DataType.unsignedByte = namespace + "unsignedByte";
                DataType.double = namespace + "double";
                DataType.float = namespace + "float";
                DataType.boolean = namespace + "boolean";
                DataType.string = namespace + "string";
                DataType.object = namespace + "object";
                return DataType;
            })();
            exports_1("DataType", DataType);
            Utils.forEachOwnProperty(DataType, function (key, value) {
                DataType[value] = key;
            });
        }
    }
});

$__System.register("9", ["55", "56", "7", "23", "57", "2f"], function(exports_1) {
    var C, CP, CS, LDP, RDF, XSD;
    return {
        setters:[
            function (C_1) {
                C = C_1;
            },
            function (CP_1) {
                CP = CP_1;
            },
            function (CS_1) {
                CS = CS_1;
            },
            function (LDP_1) {
                LDP = LDP_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (XSD_1) {
                XSD = XSD_1;
            }],
        execute: function() {
            exports_1("C", C);
            exports_1("CP", CP);
            exports_1("CS", CS);
            exports_1("LDP", LDP);
            exports_1("RDF", RDF);
            exports_1("XSD", XSD);
        }
    }
});

$__System.register("4", ["6"], function(exports_1) {
    var Utils;
    var Factory, Util;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (object) {
                    return !!(Utils.hasPropertyDefined(object, "_id") &&
                        Utils.hasPropertyDefined(object, "_resolved") &&
                        Utils.hasPropertyDefined(object, "id") &&
                        Utils.hasFunction(object, "isResolved") &&
                        Utils.hasPropertyDefined(object, "resolve"));
                };
                Factory.is = function (value) {
                    return !!(Utils.isObject(value) &&
                        Factory.hasClassProperties(value));
                };
                Factory.create = function (id) {
                    id = !!id ? id : "";
                    var pointer = Factory.decorate({});
                    pointer.id = id;
                    return pointer;
                };
                Factory.decorate = function (object) {
                    if (Factory.hasClassProperties(object))
                        return object;
                    Object.defineProperties(object, {
                        "_id": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: "",
                        },
                        "_resolved": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: false,
                        },
                        "id": {
                            enumerable: false,
                            configurable: true,
                            get: function () {
                                if (!this._id)
                                    return "";
                                return this._id;
                            },
                            set: function (value) {
                                this._id = value;
                            },
                        },
                        "isResolved": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: function () {
                                return this._resolved;
                            },
                        },
                        "resolve": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: function () {
                                var _this = this;
                                return new Promise(function (resolve, reject) {
                                    return _this;
                                });
                            },
                        },
                    });
                    return object;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.getIDs = function (pointers) {
                    var ids = [];
                    for (var _i = 0; _i < pointers.length; _i++) {
                        var pointer = pointers[_i];
                        ids.push(pointer.id);
                    }
                    return ids;
                };
                Util.resolveAll = function (pointers) {
                    var promises = pointers.map(function (pointer) { return pointer.resolve(); });
                    return Promise.all(promises).then(function (results) {
                        var resolvedPointers = results.map(function (result) { return result[0]; });
                        var responses = results.map(function (result) { return result[1]; });
                        return [resolvedPointers, responses];
                    });
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

$__System.register("58", ["9", "4", "6"], function(exports_1) {
    var NS, Pointer, Utils;
    var RDF_CLASS, CONTEXT, Factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.CS.Class.Token);
            exports_1("CONTEXT", CONTEXT = {
                "key": {
                    "@id": NS.CS.Predicate.tokenKey,
                    "@type": NS.XSD.DataType.string,
                },
                "expirationTime": {
                    "@id": NS.CS.Predicate.expirationTime,
                    "@type": NS.XSD.DataType.dateTime,
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (value) {
                    return (Utils.isObject(value) &&
                        Factory.hasClassProperties(value));
                };
                Factory.hasClassProperties = function (object) {
                    return (Utils.hasPropertyDefined(object, "key") &&
                        Utils.hasPropertyDefined(object, "expirationTime"));
                };
                Factory.decorate = function (object) {
                    if (this.hasClassProperties(object))
                        return object;
                    return object;
                };
                Factory.hasRDFClass = function (pointerOrExpandedObject) {
                    var types = [];
                    if ("@type" in pointerOrExpandedObject) {
                        types = pointerOrExpandedObject["@type"];
                    }
                    else if ("types" in pointerOrExpandedObject) {
                        // TODO: Use proper class
                        var resource = pointerOrExpandedObject;
                        types = Pointer.Util.getIDs(resource.types);
                    }
                    return types.indexOf(RDF_CLASS) !== -1;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

$__System.register("59", [], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(token) {
                    this._token = token;
                }
                Object.defineProperty(Class.prototype, "token", {
                    get: function () { return this._token; },
                    enumerable: true,
                    configurable: true
                });
                ;
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("5a", ["14", "20", "9", "5", "53", "54", "58", "59"], function(exports_1) {
    var Errors, HTTP, NS, RDF, BasicAuthenticator_1, UsernameAndPasswordToken_1, Token, TokenCredentials;
    var Class;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (BasicAuthenticator_1_1) {
                BasicAuthenticator_1 = BasicAuthenticator_1_1;
            },
            function (UsernameAndPasswordToken_1_1) {
                UsernameAndPasswordToken_1 = UsernameAndPasswordToken_1_1;
            },
            function (Token_1) {
                Token = Token_1;
            },
            function (TokenCredentials_1) {
                TokenCredentials = TokenCredentials_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(context) {
                    if (context === null)
                        throw new Errors.IllegalArgumentError("context cannot be null");
                    this.context = context;
                    this.basicAuthenticator = new BasicAuthenticator_1.default();
                }
                Class.prototype.isAuthenticated = function () {
                    return !!this.credentials && this.credentials.token.expirationTime > new Date();
                };
                Class.prototype.authenticate = function (authenticationToken) {
                    var _this = this;
                    return this.basicAuthenticator.authenticate(authenticationToken).then(function (credentials) {
                        return _this.createToken();
                    }).then(function (_a) {
                        var token = _a[0], response = _a[1];
                        _this.credentials = new TokenCredentials.Class(token);
                        _this.basicAuthenticator.clearAuthentication();
                        return _this.credentials;
                    });
                };
                Class.prototype.addAuthentication = function (requestOptions) {
                    var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
                    this.addTokenAuthenticationHeader(headers);
                    return requestOptions;
                };
                Class.prototype.clearAuthentication = function () {
                    this.credentials = null;
                };
                Class.prototype.supports = function (authenticationToken) {
                    return authenticationToken instanceof UsernameAndPasswordToken_1.default;
                };
                Class.prototype.createToken = function () {
                    var _this = this;
                    var uri = this.context.resolve(Class.TOKEN_CONTAINER);
                    var requestOptions = {};
                    this.basicAuthenticator.addAuthentication(requestOptions);
                    HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                    HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
                    return HTTP.Request.Service.post(uri, null, requestOptions, new HTTP.JSONLDParser.Class()).then(function (_a) {
                        var expandedResult = _a[0], response = _a[1];
                        var expandedNodes = RDF.Document.Util.getResources(expandedResult);
                        expandedNodes = expandedNodes.filter(Token.Factory.hasRDFClass);
                        if (expandedNodes.length === 0)
                            throw new HTTP.Errors.BadResponseError("No '" + Token.RDF_CLASS + "' was returned.", response);
                        if (expandedNodes.length > 1)
                            throw new HTTP.Errors.BadResponseError("Multiple '" + Token.RDF_CLASS + "' were returned. ", response);
                        var expandedToken = expandedNodes[0];
                        var token = Token.Factory.decorate({});
                        var digestedSchema = _this.context.documents.getSchemaFor(expandedToken);
                        _this.context.documents.jsonldConverter.compact(expandedToken, token, digestedSchema, _this.context.documents);
                        return [token, response];
                    });
                };
                Class.prototype.addTokenAuthenticationHeader = function (headers) {
                    var header;
                    if (headers.has("Authorization")) {
                        header = headers.get("Authorization");
                    }
                    else {
                        header = new HTTP.Header.Class();
                        headers.set("Authorization", header);
                    }
                    var authorization = "Token " + this.credentials.token.key;
                    header.values.push(new HTTP.Header.Value(authorization));
                    return headers;
                };
                Class.TOKEN_CONTAINER = "auth-tokens/";
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("54", [], function(exports_1) {
    var Class;
    return {
        setters:[],
        execute: function() {
            Class = (function () {
                function Class(username, password) {
                    this._username = username;
                    this._password = password;
                }
                Object.defineProperty(Class.prototype, "username", {
                    get: function () { return this._username; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Class.prototype, "password", {
                    get: function () { return this._password; },
                    enumerable: true,
                    configurable: true
                });
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("5b", ["49"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var IllegalStateError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            IllegalStateError = (function (_super) {
                __extends(IllegalStateError, _super);
                function IllegalStateError(message) {
                    if (message === void 0) { message = ""; }
                    _super.call(this, message);
                }
                Object.defineProperty(IllegalStateError.prototype, "name", {
                    get: function () { return "IllegalStateError"; },
                    enumerable: true,
                    configurable: true
                });
                return IllegalStateError;
            })(AbstractError_1.default);
            exports_1("default",IllegalStateError);
        }
    }
});

$__System.register("5c", ["49"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var IllegalArgumentError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            IllegalArgumentError = (function (_super) {
                __extends(IllegalArgumentError, _super);
                function IllegalArgumentError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(IllegalArgumentError.prototype, "name", {
                    get: function () { return "IllegalArgumentError"; },
                    enumerable: true,
                    configurable: true
                });
                return IllegalArgumentError;
            })(AbstractError_1.default);
            exports_1("default",IllegalArgumentError);
        }
    }
});

$__System.register("5d", ["49"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var IDAlreadyInUseError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            IDAlreadyInUseError = (function (_super) {
                __extends(IDAlreadyInUseError, _super);
                function IDAlreadyInUseError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(IDAlreadyInUseError.prototype, "name", {
                    get: function () { return "IDAlreadyInUseError"; },
                    enumerable: true,
                    configurable: true
                });
                return IDAlreadyInUseError;
            })(AbstractError_1.default);
            exports_1("default",IDAlreadyInUseError);
        }
    }
});

$__System.register("49", [], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError;
    return {
        setters:[],
        execute: function() {
            AbstractError = (function (_super) {
                __extends(AbstractError, _super);
                function AbstractError(message) {
                    _super.call(this, message);
                    this.message = message;
                }
                Object.defineProperty(AbstractError.prototype, "name", {
                    get: function () { return "AbstractError"; },
                    enumerable: true,
                    configurable: true
                });
                AbstractError.prototype.toString = function () {
                    return this.name + ": " + this.message;
                };
                return AbstractError;
            })(Error);
            exports_1("default",AbstractError);
        }
    }
});

$__System.register("5e", ["49"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var NotImplementedError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            NotImplementedError = (function (_super) {
                __extends(NotImplementedError, _super);
                function NotImplementedError(message) {
                    if (message === void 0) { message = ""; }
                    _super.call(this, message);
                }
                Object.defineProperty(NotImplementedError.prototype, "name", {
                    get: function () { return "NotImplementedError"; },
                    enumerable: true,
                    configurable: true
                });
                return NotImplementedError;
            })(AbstractError_1.default);
            exports_1("default",NotImplementedError);
        }
    }
});

$__System.register("14", ["5b", "5c", "5d", "5e"], function(exports_1) {
    var IllegalStateError_1, IllegalArgumentError_1, IDAlreadyInUseError_1, NotImplementedError_1;
    return {
        setters:[
            function (IllegalStateError_1_1) {
                IllegalStateError_1 = IllegalStateError_1_1;
            },
            function (IllegalArgumentError_1_1) {
                IllegalArgumentError_1 = IllegalArgumentError_1_1;
            },
            function (IDAlreadyInUseError_1_1) {
                IDAlreadyInUseError_1 = IDAlreadyInUseError_1_1;
            },
            function (NotImplementedError_1_1) {
                NotImplementedError_1 = NotImplementedError_1_1;
            }],
        execute: function() {
            exports_1("IllegalStateError", IllegalStateError_1.default);
            exports_1("IllegalArgumentError", IllegalArgumentError_1.default);
            exports_1("IDAlreadyInUseError", IDAlreadyInUseError_1.default);
            exports_1("NotImplementedError", NotImplementedError_1.default);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("12", ["24", "25", "53", "58", "5a", "54", "14", "6"], function(exports_1) {
    var AuthenticationToken_1, Authenticator_1, BasicAuthenticator_1, Token, TokenAuthenticator_1, UsernameAndPasswordToken_1, Errors, Utils;
    var Method, Class;
    return {
        setters:[
            function (AuthenticationToken_1_1) {
                AuthenticationToken_1 = AuthenticationToken_1_1;
            },
            function (Authenticator_1_1) {
                Authenticator_1 = Authenticator_1_1;
            },
            function (BasicAuthenticator_1_1) {
                BasicAuthenticator_1 = BasicAuthenticator_1_1;
            },
            function (Token_1) {
                Token = Token_1;
            },
            function (TokenAuthenticator_1_1) {
                TokenAuthenticator_1 = TokenAuthenticator_1_1;
            },
            function (UsernameAndPasswordToken_1_1) {
                UsernameAndPasswordToken_1 = UsernameAndPasswordToken_1_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("AuthenticationToken", AuthenticationToken_1.default);
            exports_1("Authenticator", Authenticator_1.default);
            exports_1("BasicAuthenticator", BasicAuthenticator_1.default);
            exports_1("Token", Token);
            exports_1("TokenAuthenticator", TokenAuthenticator_1.default);
            exports_1("UsernameAndPasswordToken", UsernameAndPasswordToken_1.default);
            (function (Method) {
                Method[Method["BASIC"] = 0] = "BASIC";
                Method[Method["TOKEN"] = 1] = "TOKEN";
            })(Method || (Method = {}));
            exports_1("Method", Method);
            Class = (function () {
                function Class(context) {
                    this.method = null;
                    this.context = context;
                    this.authenticators = [];
                    this.authenticators.push(new TokenAuthenticator_1.default(this.context));
                    this.authenticators.push(new BasicAuthenticator_1.default());
                }
                Class.prototype.isAuthenticated = function (askParent) {
                    if (askParent === void 0) { askParent = true; }
                    return ((this.authenticator && this.authenticator.isAuthenticated()) ||
                        (askParent && !!this.context.parentContext && this.context.parentContext.auth.isAuthenticated()));
                };
                Class.prototype.authenticate = function (usernameOrToken, password) {
                    var _this = this;
                    if (password === void 0) { password = null; }
                    return new Promise(function (resolve, reject) {
                        if (!usernameOrToken)
                            throw new Errors.IllegalArgumentError("Either a username or an authenticationToken are required.");
                        var authenticationToken;
                        if (Utils.isString(usernameOrToken)) {
                            var username = usernameOrToken;
                            if (!password)
                                throw new Errors.IllegalArgumentError("A password is required when providing a username.");
                            authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
                        }
                        else {
                            authenticationToken = usernameOrToken;
                        }
                        if (_this.authenticator)
                            _this.clearAuthentication();
                        _this.authenticator = _this.getAuthenticator(authenticationToken);
                        resolve(_this.authenticator.authenticate(authenticationToken));
                    });
                };
                Class.prototype.addAuthentication = function (requestOptions) {
                    if (this.isAuthenticated(false)) {
                        this.authenticator.addAuthentication(requestOptions);
                    }
                    else if (!!this.context.parentContext) {
                        this.context.parentContext.auth.addAuthentication(requestOptions);
                    }
                    else {
                        console.warn("There is no authentication to add to the request.");
                    }
                };
                Class.prototype.clearAuthentication = function () {
                    if (!this.authenticator)
                        return;
                    this.authenticator.clearAuthentication();
                    this.authenticator = null;
                };
                Class.prototype.getAuthenticator = function (authenticationToken) {
                    for (var _i = 0, _a = this.authenticators; _i < _a.length; _i++) {
                        var authenticator = _a[_i];
                        if (authenticator.supports(authenticationToken))
                            return authenticator;
                    }
                    throw new Errors.IllegalStateError("The configured authentication method isn\'t supported.");
                };
                return Class;
            })();
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

$__System.register("5f", ["12"], function(exports_1) {
    var Auth;
    var settings;
    return {
        setters:[
            function (Auth_1) {
                Auth = Auth_1;
            }],
        execute: function() {
            settings = {};
            settings["domain"] = "carbonldp.com";
            settings["http.ssl"] = true;
            settings["auth.method"] = Auth.Method.TOKEN;
            settings["platform.container"] = "platform/";
            settings["platform.apps.container"] = "apps/";
            exports_1("default",settings);
        }
    }
});

/// <reference path="./../typings/typings.d.ts" />
$__System.register("6", [], function(exports_1) {
    var S, A, M, UUID, P;
    function hasFunction(object, functionName) {
        return typeof object[functionName] === "function";
    }
    function hasProperty(object, property) {
        if (!object)
            return false;
        return "undefined" !== typeof object[property];
    }
    function hasPropertyDefined(object, property) {
        return !!Object.getOwnPropertyDescriptor(object, property);
    }
    function isNull(value) {
        return value === null;
    }
    function isArray(object) {
        return object instanceof Array;
    }
    function isString(value) {
        return typeof value === "string" || value instanceof String;
    }
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    function isNumber(value) {
        return typeof value === "number" || value instanceof Number;
    }
    function isInteger(value) {
        if (!isNumber(value))
            return false;
        return value % 1 === 0;
    }
    function isDouble(value) {
        if (!isNumber(value))
            return false;
        return value % 1 !== 0;
    }
    function isDate(date) {
        return typeof date === "date" || date instanceof Date;
    }
    function isObject(object) {
        return typeof object === "object" && (!!object);
    }
    function isFunction(value) {
        return typeof value === "function";
    }
    function isMap(value) {
        return (isObject(value) &&
            hasFunction(value, "get") &&
            hasFunction(value, "has") &&
            hasProperty(value, "size") &&
            hasFunction(value, "clear") &&
            hasFunction(value, "delete") &&
            hasFunction(value, "entries") &&
            hasFunction(value, "forEach") &&
            hasFunction(value, "get") &&
            hasFunction(value, "has") &&
            hasFunction(value, "keys") &&
            hasFunction(value, "set") &&
            hasFunction(value, "values"));
    }
    function parseBoolean(value) {
        if (!isString(value))
            return false;
        /* tslint:disable: no-switch-case-fall-through */
        switch (value.toLowerCase()) {
            case "true":
            case "yes":
            case "y":
            case "1":
                return true;
            case "false":
            case "no":
            case "n":
            case "0":
            default:
                return false;
        }
        /* tslint:enable: no-switch-case-fall-through */
    }
    function extend(target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (arguments.length <= 1)
            return target;
        for (var i = 0, length = arguments.length; i < length; i++) {
            var toMerge = objects[i];
            for (var name in toMerge) {
                if (toMerge.hasOwnProperty(name)) {
                    target[name] = toMerge[name];
                }
            }
        }
        return target;
    }
    function forEachOwnProperty(object, action) {
        if (!(isObject(object) || isFunction(object)))
            throw new Error("IllegalArgument");
        for (var name in object) {
            if (object.hasOwnProperty(name)) {
                if (action(name, object[name]) === false)
                    break;
            }
        }
    }
    return {
        setters:[],
        execute: function() {
            S = (function () {
                function S() {
                }
                S.startsWith = function (str, substring) {
                    return str.lastIndexOf(substring, 0) === 0;
                };
                S.endsWith = function (str, substring) {
                    return str.indexOf(substring, str.length - substring.length) !== -1;
                };
                S.contains = function (str, substring) {
                    return str.indexOf(substring) !== -1;
                };
                return S;
            })();
            A = (function () {
                function A() {
                }
                A.from = function (iterator) {
                    var array = [];
                    var next = iterator.next();
                    while (!next.done) {
                        array.push(next.value);
                        next = iterator.next();
                    }
                    return array;
                };
                A.joinWithoutDuplicates = function () {
                    var arrays = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arrays[_i - 0] = arguments[_i];
                    }
                    var result = arrays[0].slice();
                    for (var i = 1, length = arrays.length; i < length; i++) {
                        result = result.concat(arrays[i].filter(function (item) {
                            return result.indexOf(item) < 0;
                        }));
                    }
                    return result;
                };
                return A;
            })();
            M = (function () {
                function M() {
                }
                M.from = function (object) {
                    var map = new Map();
                    forEachOwnProperty(object, function (name, value) {
                        map.set(name, value);
                    });
                    return map;
                };
                M.extend = function (toExtend) {
                    var extenders = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        extenders[_i - 1] = arguments[_i];
                    }
                    for (var i = 0, length = extenders.length; i < length; i++) {
                        var extender = extenders[i];
                        var values = extender.entries();
                        var next = values.next();
                        while (!next.done) {
                            var entry = next.value;
                            var key = entry[0];
                            var value = entry[1];
                            if (!toExtend.has(key))
                                toExtend.set(key, value);
                            next = values.next();
                        }
                    }
                    return toExtend;
                };
                return M;
            })();
            UUID = (function () {
                function UUID() {
                }
                UUID.is = function (uuid) {
                    return UUID.regExp.test(uuid);
                };
                UUID.generate = function () {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0;
                        var v = c === "x" ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                };
                UUID.regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                return UUID;
            })();
            P = (function () {
                function P() {
                }
                P.createRejectedPromise = function (error) {
                    return new Promise(function (resolve, reject) {
                        reject(error);
                    });
                };
                return P;
            })();
            exports_1("hasFunction", hasFunction);
            exports_1("hasProperty", hasProperty);
            exports_1("hasPropertyDefined", hasPropertyDefined);
            exports_1("isNull", isNull);
            exports_1("isArray", isArray);
            exports_1("isString", isString);
            exports_1("isBoolean", isBoolean);
            exports_1("isNumber", isNumber);
            exports_1("isInteger", isInteger);
            exports_1("isDouble", isDouble);
            exports_1("isDate", isDate);
            exports_1("isObject", isObject);
            exports_1("isFunction", isFunction);
            exports_1("isMap", isMap);
            exports_1("parseBoolean", parseBoolean);
            exports_1("extend", extend);
            exports_1("forEachOwnProperty", forEachOwnProperty);
            exports_1("S", S);
            exports_1("A", A);
            exports_1("M", M);
            exports_1("UUID", UUID);
            exports_1("P", P);
        }
    }
});

/// <reference path="../typings/typings.d.ts" />
$__System.register("60", ["2", "12", "8", "1a", "13", "20", "5", "5f", "6"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Apps_1, Auth, AbstractContext_1, Document, Documents_1, HTTP, RDF, settings_1, Utils;
    var Carbon;
    return {
        setters:[
            function (Apps_1_1) {
                Apps_1 = Apps_1_1;
            },
            function (Auth_1) {
                Auth = Auth_1;
            },
            function (AbstractContext_1_1) {
                AbstractContext_1 = AbstractContext_1_1;
            },
            function (Document_1) {
                Document = Document_1;
            },
            function (Documents_1_1) {
                Documents_1 = Documents_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Carbon = (function (_super) {
                __extends(Carbon, _super);
                function Carbon(settings) {
                    _super.call(this);
                    settings = settings ? settings : settings_1.default;
                    Utils.M.extend(this.settings, Utils.M.from(settings));
                    this.apps = new Apps_1.default(this);
                }
                Object.defineProperty(Carbon, "version", {
                    /* tslint:enable: variable-name */
                    get: function () { return "0.15.0-ALPHA"; },
                    enumerable: true,
                    configurable: true
                });
                Carbon.prototype.resolve = function (uri) {
                    if (RDF.URI.Util.isAbsolute(uri))
                        return uri;
                    var finalURI = this.settings.get("http.ssl") ? "https://" : "http://";
                    finalURI += this.settings.get("domain") + "/" + this.getSetting("platform.container");
                    return RDF.URI.Util.resolve(finalURI, uri);
                };
                Carbon.prototype.getAPIDescription = function () {
                    return this.documents.get("api/").then(function (_a) {
                        var description = _a[0], response = _a[1];
                        return description;
                    });
                };
                /* tslint:disable: variable-name */
                Carbon.Apps = Apps_1.default;
                Carbon.Auth = Auth;
                Carbon.Document = Document;
                Carbon.Documents = Documents_1.default;
                Carbon.HTTP = HTTP;
                Carbon.RDF = RDF;
                Carbon.Utils = Utils;
                return Carbon;
            })(AbstractContext_1.default);
            exports_1("default",Carbon);
        }
    }
});

$__System.registerDynamic("1", ["60"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Carbon = $__require('60');
  global.Carbon = Carbon.default;
  global.define = __define;
  return module.exports;
});

})
(function(factory) {
  factory();
});
//# sourceMappingURL=Carbon.sfx.js.map