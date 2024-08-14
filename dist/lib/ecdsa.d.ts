/**
 * Base conversion functions for ECDSA. The Multikey definition requires the usage of a compressed public key
 * which must be compressed when creating the Multikey representation, and decompressed for the JWK conversion.
 *
 * The two exported functions, used by the rest of the package, just branch out to the internal functions that do the
 * key (de)compression itself.
 *
 * @module
 */
import { JWKKeyPair, MultikeyPairBinary, CryptoCurves } from "./common";
/**
 * Convert the Crypto values from JWK to the equivalent Multikey Pairs' binary data.
 * The final encoding, with preambles, are done in the general level.
 *
 * For ECDSA, the compressed form must be calculated, by adding an extra byte signaling which of the
 * two possible 'y' values are used.
 *
 * (The y value is set as optional in the signature but that is only to make TypeScript happy. A missing
 * value generates an error)
 *
 * @param cl - choice between P-256 and P-384
 * @param x - x value for the elliptical curve
 * @param d - d (private) value for the elliptical curve
 * @param y - y value for the elliptical curve
 * @returns
 */
export declare function JWKToMultikeyBinary(cl: CryptoCurves, x: Uint8Array, d: Uint8Array | undefined, y?: Uint8Array): MultikeyPairBinary;
/**
 * Convert the multikey values to their JWK equivalents. The final `x` and `d` values are encoded
 * in base64 and then the relevant JWK structure are created
 *
 * For EDDSA, this is a very straightforward operation by just encoding the values and plugging them into a
 * constant JWK structure. The interface is there to be reused by the ECDSA equivalent, which must
 * do some extra processing.
 *
 * @param cl - choice between P-256 and P-384
 * @param xb - binary version of the x value for the elliptical curve
 * @param db - binary version of the d value for the elliptical curve
 * @returns
 */
export declare function multikeyBinaryToJWK(cl: CryptoCurves, xb: Uint8Array, db?: Uint8Array): JWKKeyPair;
