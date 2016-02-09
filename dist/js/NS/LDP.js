"use strict";

System.register([], function (_export, _context) {
    var _createClass, namespace, Class, Predicate;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("namespace", namespace = "http://www.w3.org/ns/ldp#");

            _export("Class", Class = function () {
                function Class() {
                    _classCallCheck(this, Class);
                }

                _createClass(Class, null, [{
                    key: "Resource",
                    get: function get() {
                        return namespace + "Resource";
                    }
                }, {
                    key: "RDFSource",
                    get: function get() {
                        return namespace + "RDFSource";
                    }
                }, {
                    key: "Container",
                    get: function get() {
                        return namespace + "Container";
                    }
                }, {
                    key: "BasicContainer",
                    get: function get() {
                        return namespace + "BasicContainer";
                    }
                }, {
                    key: "DirectContainer",
                    get: function get() {
                        return namespace + "DirectContainer";
                    }
                }, {
                    key: "IndirectContainer",
                    get: function get() {
                        return namespace + "IndirectContainer";
                    }
                }, {
                    key: "NonRDFSource",
                    get: function get() {
                        return namespace + "NonRDFSource";
                    }
                }, {
                    key: "MemberSubject",
                    get: function get() {
                        return namespace + "MemberSubject";
                    }
                }, {
                    key: "PreferContainment",
                    get: function get() {
                        return namespace + "PreferContainment";
                    }
                }, {
                    key: "PreferMembership",
                    get: function get() {
                        return namespace + "PreferMembership";
                    }
                }, {
                    key: "PreferEmptyContainer",
                    get: function get() {
                        return namespace + "PreferEmptyContainer";
                    }
                }, {
                    key: "PreferMinimalContainer",
                    get: function get() {
                        return namespace + "PreferMinimalContainer";
                    }
                }, {
                    key: "Page",
                    get: function get() {
                        return namespace + "Page";
                    }
                }, {
                    key: "PageSortCriterion",
                    get: function get() {
                        return namespace + "PageSortCriterion";
                    }
                }, {
                    key: "Ascending",
                    get: function get() {
                        return namespace + "Ascending";
                    }
                }, {
                    key: "Descending",
                    get: function get() {
                        return namespace + "Descending";
                    }
                }]);

                return Class;
            }());

            _export("Predicate", Predicate = function () {
                function Predicate() {
                    _classCallCheck(this, Predicate);
                }

                _createClass(Predicate, null, [{
                    key: "contains",
                    get: function get() {
                        return namespace + "contains";
                    }
                }, {
                    key: "member",
                    get: function get() {
                        return namespace + "member";
                    }
                }, {
                    key: "hasMemberRelation",
                    get: function get() {
                        return namespace + "hasMemberRelation";
                    }
                }, {
                    key: "memberOfRelation",
                    get: function get() {
                        return namespace + "memberOfRelation";
                    }
                }, {
                    key: "membershipResource",
                    get: function get() {
                        return namespace + "membershipResource";
                    }
                }, {
                    key: "insertedContentRelation",
                    get: function get() {
                        return namespace + "insertedContentRelation";
                    }
                }, {
                    key: "constrainedBy",
                    get: function get() {
                        return namespace + "constrainedBy";
                    }
                }, {
                    key: "pageSortCriteria",
                    get: function get() {
                        return namespace + "pageSortCriteria";
                    }
                }, {
                    key: "pageSortOrder",
                    get: function get() {
                        return namespace + "pageSortOrder";
                    }
                }, {
                    key: "pageSortCollation",
                    get: function get() {
                        return namespace + "pageSortCollation";
                    }
                }, {
                    key: "pageSequence",
                    get: function get() {
                        return namespace + "pageSequence";
                    }
                }]);

                return Predicate;
            }());

            _export("namespace", namespace);

            _export("Class", Class);

            _export("Predicate", Predicate);
        }
    };
});
//# sourceMappingURL=LDP.js.map
