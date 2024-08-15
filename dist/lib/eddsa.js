"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWKToMultikeyBinary = JWKToMultikeyBinary;
exports.multikeyBinaryToJWK = multikeyBinaryToJWK;
const base64 = require("./encodings/base64");
/**
 * Convert the Crypto values from JWK to the equivalent Multikey Pairs' binary data.
 * The final encoding, with preambles, are done in the general level.
 *
 * For EDDSA, this is essentially, an empty function, which simply returns the `x` and `d` values. The
 * interface is there to be reused by the ECDSA equivalent, which must do some extra processing.
 *
 * @param _curve - unused in this function, just a placeholder
 * @param x - x value for the elliptical curve, as extracted from JWK
 * @param d - d (private) value for the elliptical curve, as extracted from JWK
 * @param _y - unused in this function, just a placeholder
 * @returns
 */
function JWKToMultikeyBinary(_curve, x, d, _y) {
    return {
        public: x,
        secret: d,
    };
}
/**
 * Convert the multikey values to their JWK equivalents. The final `x` and `d` values are encoded
 * in base64 and then the relevant JWK structure are created
 *
 * For EDDSA, this is a very straightforward operation by just encoding the values and plugging them into a
 * constant JWK structure. The interface is there to be reused by the ECDSA equivalent, which must
 * do some extra processing.
 *
 * @param _curve - unused in this function, just a placeholder
 * @param xb - binary version of the x value for the elliptical curve
 * @param db - binary version of the d value for the elliptical curve
 * @returns
 */
function multikeyBinaryToJWK(_curve, xb, db) {
    const x = base64.encode(xb);
    const output = {
        public: {
            kty: "OKP",
            crv: "Ed25519",
            x,
            key_ops: [
                "verify"
            ],
            ext: true
        }
    };
    if (db !== undefined) {
        output.secret = {
            kty: "OKP",
            crv: "Ed25519",
            x,
            d: base64.encode(db),
            key_ops: [
                "sign"
            ],
            ext: true
        };
    }
    return output;
}
