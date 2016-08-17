SystemJS.config({
  baseURL: "/base",
  paths: {
    "carbonldp/": "dist/"
  },
  packages: {
    "npm:tweetnacl@0.13.3": {
      "map": {
        "buffer/global": "@empty"
      }
    },
    "npm:jsonld@0.4.11": {
      "map": {
        "es6-promise": "npm:es6-promise@2.3.0",
        "node-pkginfo": "npm:pkginfo@0.4.0",
        "node-request": "@empty",
        "node-xmldom": "npm:xmldom@0.1.19",
        "pkginfo": "@empty",
        "request": "@empty",
        "xmldom": "npm:xmldom@0.1.19"
      }
    }
  }
});
