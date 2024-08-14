"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
/**
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
const baseN_js_1 = require("./baseN.js");
// base58 characters (Bitcoin alphabet)
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function encode(input, maxline) {
    return (0, baseN_js_1.encode)(input, alphabet, maxline);
}
function decode(input) {
    return (0, baseN_js_1.decode)(input, alphabet);
}
