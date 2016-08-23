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
    }
  }
});
