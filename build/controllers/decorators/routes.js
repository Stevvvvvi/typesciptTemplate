"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.GET);
exports.put = routeBinder(Methods_1.Methods.PUT);
exports.post = routeBinder(Methods_1.Methods.POST);
exports.del = routeBinder(Methods_1.Methods.PATCH);
