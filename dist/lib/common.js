"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECDSACurves = exports.classToEncoder = exports.classToDecoder = exports.classToPreamble = exports.Ecdsa384Preambles = exports.Ecdsa256Preambles = exports.EddsaPreambles = exports.CryptoKeyTypes = exports.CryptoCurves = void 0;
exports.isJWKKeyPair = isJWKKeyPair;
exports.isMultikeyPair = isMultikeyPair;
exports.preambleToCryptoData = preambleToCryptoData;
const eddsa = require("./eddsa");
const ecdsa = require("./ecdsa");
/**
 * Typeguard for JWK Key Pair.
 * It is not really elaborate, it only tries to differentiate between a JWK Single Key and a Key Pair.
 *
 * @param obj
 * @returns is it a JWKKeyPair?
 */
// deno-lint-ignore no-explicit-any
function isJWKKeyPair(obj) {
    return obj.public !== undefined;
}
/**
 * Typeguard for a Multikey Pair.
 * It is not really elaborate, it only tries to differentiate between a single Multikey and a Key Pair.
 *
 * @param obj
 * @returns is it a MultikeyPair?
 */
// deno-lint-ignore no-explicit-any
function isMultikeyPair(obj) {
    return obj.publicKeyMultibase !== undefined;
}
/************************************************************************* */
/* Values to handle the various preamble bytes for the different key types */
/************************************************************************* */
/**
 * Names for the various crypto curves
 */
var CryptoCurves;
(function (CryptoCurves) {
    CryptoCurves["ECDSA_384"] = "secp384r1";
    CryptoCurves["ECDSA_256"] = "secp256r1";
    CryptoCurves["EDDSA"] = "ed25519";
})(CryptoCurves || (exports.CryptoCurves = CryptoCurves = {}));
/**
 * Names for the key types
 */
var CryptoKeyTypes;
(function (CryptoKeyTypes) {
    CryptoKeyTypes["PUBLIC"] = "public";
    CryptoKeyTypes["SECRET"] = "secret";
})(CryptoKeyTypes || (exports.CryptoKeyTypes = CryptoKeyTypes = {}));
/**
 * Preamble value for ECDSA, a.k.a. ed25519 curve
 */
exports.EddsaPreambles = {
    public: [0xed, 0x01],
    secret: [0x80, 0x26],
};
/**
 * Preamble for ECDSA P-256, a.k.a. secp256r1 curve
 */
exports.Ecdsa256Preambles = {
    public: [0x80, 0x24],
    secret: [0x86, 0x26],
};
/**
 * Preamble for ECDSA P-256, a.k.a. secp384r1 curve
 */
exports.Ecdsa384Preambles = {
    public: [0x81, 0x24],
    secret: [0x87, 0x26],
};
/**
 * What preambles must be used for a Curve (data)?
 */
exports.classToPreamble = {
    [CryptoCurves.EDDSA]: exports.EddsaPreambles,
    [CryptoCurves.ECDSA_256]: exports.Ecdsa256Preambles,
    [CryptoCurves.ECDSA_384]: exports.Ecdsa384Preambles,
};
/**
 * hat coder function must be used to convert from Multikey to JWK (data)?
 */
exports.classToDecoder = {
    [CryptoCurves.EDDSA]: eddsa.multikeyBinaryToJWK,
    [CryptoCurves.ECDSA_256]: ecdsa.multikeyBinaryToJWK,
    [CryptoCurves.ECDSA_384]: ecdsa.multikeyBinaryToJWK,
};
/**
 * What coder function must be used to convert from JWK to Multikey (data)?
 */
exports.classToEncoder = {
    [CryptoCurves.EDDSA]: eddsa.JWKToMultikeyBinary,
    [CryptoCurves.ECDSA_256]: ecdsa.JWKToMultikeyBinary,
    [CryptoCurves.ECDSA_384]: ecdsa.JWKToMultikeyBinary,
};
/**
 * List of possible ECDSA Curves. Having this here declaratively may make it easier if
 * in the future, a new curve is added to the family (P-512)?
 */
exports.ECDSACurves = [CryptoCurves.ECDSA_256, CryptoCurves.ECDSA_384];
/**
 * Classify the crypto key based on the multikey preamble characters that are at the start of the code.
 * These are two binary numbers, signalling the crypto class (ecdsa or eddsa) and, in the former case,
 * the hash function.
 *
 * @param preamble
 * @returns
 */
function preambleToCryptoData(preamble) {
    // Ugly but effective and simple trick to compare two arrays
    const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    if (preamble.length !== 2) {
        throw new Error(`${preamble} is not valid, it should have a size of exactly 2.`);
    }
    // The real classification...
    if (eq(preamble, exports.Ecdsa256Preambles.secret)) {
        return {
            crCurve: CryptoCurves.ECDSA_256,
            crType: CryptoKeyTypes.SECRET,
        };
    }
    else if (eq(preamble, exports.Ecdsa256Preambles.public)) {
        return {
            crCurve: CryptoCurves.ECDSA_256,
            crType: CryptoKeyTypes.PUBLIC,
        };
    }
    else if (eq(preamble, exports.Ecdsa384Preambles.secret)) {
        return {
            crCurve: CryptoCurves.ECDSA_384,
            crType: CryptoKeyTypes.SECRET,
        };
    }
    else if (eq(preamble, exports.Ecdsa384Preambles.public)) {
        return {
            crCurve: CryptoCurves.ECDSA_384,
            crType: CryptoKeyTypes.PUBLIC,
        };
    }
    else if (eq(preamble, exports.EddsaPreambles.secret)) {
        return {
            crCurve: CryptoCurves.EDDSA,
            crType: CryptoKeyTypes.SECRET,
        };
    }
    else if (eq(preamble, exports.EddsaPreambles.public)) {
        return {
            crCurve: CryptoCurves.EDDSA,
            crType: CryptoKeyTypes.PUBLIC,
        };
    }
    else {
        throw new Error(`${preamble} is unknown. Should refer to secret or private eddsa or ecdsa (the latter with P-256 or P-384)`);
    }
}
