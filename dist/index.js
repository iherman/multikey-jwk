"use strict";
/**
 * Conversion to and from [Multikey format](https://www.w3.org/TR/controller-document/#multikey) from
 * JWK for the three EC curves that are defined for Verifiable Credentials: [ECDSA with P-256 and P-384](https://www.w3.org/TR/vc-di-ecdsa/#multikey)
 * and [EDDSA](https://www.w3.org/TR/vc-di-eddsa/#multikey).
 *
 * @package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.multikeyToJWK = multikeyToJWK;
exports.JWKToMultikey = JWKToMultikey;
const convert = require("./lib/convert");
const common_1 = require("./lib/common");
function multikeyToJWK(keys) {
    const input = (0, common_1.isMultikeyPair)(keys) ? keys : { publicKeyMultibase: keys };
    const jwk_keys = convert.multikeyToJWK(input);
    if ((0, common_1.isMultikeyPair)(keys)) {
        return jwk_keys;
    }
    else {
        return jwk_keys.public;
    }
}
function JWKToMultikey(keys) {
    const input = (0, common_1.isJWKKeyPair)(keys) ? keys : { public: keys };
    const m_keys = convert.JWKToMultikey(input);
    if ((0, common_1.isJWKKeyPair)(keys)) {
        return m_keys;
    }
    else {
        return m_keys.publicKeyMultibase;
    }
}
