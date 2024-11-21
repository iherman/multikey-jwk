"use strict";
/**
 * Conversion to and from [Multikey format](https://www.w3.org/TR/controller-document/#multikey) from
 * JWK or WebCrypto for the three EC curves that are defined for Verifiable Credentials: [ECDSA with P-256 and P-384](https://www.w3.org/TR/vc-di-ecdsa/#multikey)
 * and [EDDSA](https://www.w3.org/TR/vc-di-eddsa/#multikey).
 *
 * @package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.multikeyToJWK = multikeyToJWK;
exports.multikeyToCrypto = multikeyToCrypto;
exports.JWKToMultikey = JWKToMultikey;
exports.cryptoToMultikey = cryptoToMultikey;
const convert = require("./lib/convert");
// This type guard function is reused at two different places, better factor it out...
function isMultikeyPair(obj) {
    return obj.publicKeyMultibase !== undefined;
}
function multikeyToJWK(keys) {
    const input = isMultikeyPair(keys) ? keys : { publicKeyMultibase: keys };
    const jwk_keys = convert.multikeyToJWK(input);
    if (isMultikeyPair(keys)) {
        return jwk_keys;
    }
    else {
        return jwk_keys.publicKey;
    }
}
// Implementation of the overloaded functions
async function multikeyToCrypto(keys) {
    const input = isMultikeyPair(keys) ? keys : { publicKeyMultibase: keys };
    const jwkPair = multikeyToJWK(input);
    const algorithm = { name: "" };
    // We have to establish what the algorithm type is from the public jwk
    switch (jwkPair.publicKey.kty) {
        case 'EC':
            algorithm.name = "ECDSA";
            algorithm.namedCurve = jwkPair.publicKey.crv;
            break;
        case 'OKP':
            algorithm.name = "Ed25519";
            break;
        default:
            // In fact, this does not happen; the JWK comes from our own
            // generation, that raises an error earlier in this case.
            // But this keeps the typescript code checker happy...
            throw new Error("Unknown kty value for the JWK key");
    }
    const output = {
        publicKey: await crypto.subtle.importKey("jwk", jwkPair.publicKey, algorithm, true, ["verify"]),
        privateKey: undefined,
    };
    if (jwkPair.privateKey != undefined) {
        output.privateKey = await crypto.subtle.importKey("jwk", jwkPair.privateKey, algorithm, true, ["sign"]);
    }
    // Got the return, the type depends on the overloaded input type
    if (isMultikeyPair(keys)) {
        return output;
    }
    else {
        return output.publicKey;
    }
}
// Implementation of the overloaded functions
function JWKToMultikey(keys) {
    function isJWKKeyPair(obj) {
        return obj.publicKey !== undefined;
    }
    const input = isJWKKeyPair(keys) ? keys : { publicKey: keys };
    const m_keys = convert.JWKToMultikey(input);
    if (isJWKKeyPair(keys)) {
        return m_keys;
    }
    else {
        return m_keys.publicKeyMultibase;
    }
}
// Implementation of the overloaded functions
async function cryptoToMultikey(keys) {
    function isCryptoKeyPair(obj) {
        return obj.publicKey !== undefined;
    }
    const isPair = isCryptoKeyPair(keys);
    const input = isPair ? keys : { publicKey: keys, privateKey: undefined };
    // Generate the JWK version of the cryptokeys: 
    const jwkKeyPair = {
        publicKey: await crypto.subtle.exportKey("jwk", input.publicKey),
    };
    if (isPair && input.privateKey !== undefined) {
        jwkKeyPair.privateKey = await crypto.subtle.exportKey("jwk", input.privateKey);
    }
    // Ready for conversion
    const output = JWKToMultikey(jwkKeyPair);
    // Return the right version
    if (isPair) {
        return output;
    }
    else {
        return output.publicKeyMultibase;
    }
}
