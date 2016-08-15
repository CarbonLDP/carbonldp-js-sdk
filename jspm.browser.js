SystemJS.config({
  baseURL: "/base",
  paths: {
    "github:": "test/jspm_packages/github/",
    "npm:": "test/jspm_packages/npm/",
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
