/**
 * CarbonLDP JavaScript SDK v0.8.2-ALPHA
 *
 * @license BSD-3-Clause
 * Copyright (c) 2015-present, Base22 Technology Group, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * see: https://github.com/CarbonLDP/CarbonLDP-JS-SDK
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        var exports = factory();
        root.carbon = exports.carbon;
        root.Carbon = exports.Carbon;
    }
}(this, function () {