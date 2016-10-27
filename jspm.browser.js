SystemJS.config({
  baseURL: "/base",
  paths: {
    "npm:": "test/jspm_packages/npm/",
    "github:": "test/jspm_packages/github/",
    "carbonldp/": "dist/"
  },
  packages: {
    "npm:tweetnacl@0.13.3": {
      "map": {
        "buffer/global": "@empty"
      }
    }
  }
});
