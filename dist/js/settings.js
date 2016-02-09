"use strict";

System.register(["./Auth"], function (_export, _context) {
  var Auth, settings;
  return {
    setters: [function (_Auth) {
      Auth = _Auth;
    }],
    execute: function () {
      settings = {};
      settings["domain"] = "carbonldp.com";
      settings["http.ssl"] = true;
      settings["auth.method"] = Auth.Method.TOKEN;
      settings["platform.container"] = "platform/";
      settings["platform.apps.container"] = "apps/";

      _export("default", settings);
    }
  };
});
//# sourceMappingURL=settings.js.map
